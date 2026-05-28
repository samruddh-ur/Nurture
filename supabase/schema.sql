-- ============================================================
-- NURTURA — Full Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. PROFILES (auto-created on signup via trigger)
create table public.profiles (
  id            uuid references auth.users on delete cascade primary key,
  full_name     text,
  avatar_url    text,
  plan          text not null default 'free' check (plan in ('free', 'premium', 'family_plus')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- 2. CHILDREN
create table public.children (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles(id) on delete cascade not null,
  name            text not null,
  date_of_birth   date not null,
  gender          text check (gender in ('male', 'female', 'other')),
  photo_url       text,
  allergies       text[],
  blood_group     text,
  created_at      timestamptz default now()
);

-- 3. GROWTH RECORDS
create table public.growth_records (
  id            uuid primary key default gen_random_uuid(),
  child_id      uuid references public.children(id) on delete cascade not null,
  recorded_at   date not null,
  weight_kg     numeric(5,2),
  height_cm     numeric(5,2),
  head_cm       numeric(5,2),
  notes         text,
  created_at    timestamptz default now()
);

-- 4. NUTRITION LOGS
create table public.nutrition_logs (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid references public.children(id) on delete cascade not null,
  logged_at       date not null,
  meal_type       text not null check (meal_type in ('breakfast', 'snack', 'lunch', 'dinner')),
  foods           jsonb not null default '[]',
  total_calories  int,
  notes           text,
  created_at      timestamptz default now()
);

-- 5. VACCINATIONS
create table public.vaccinations (
  id                  uuid primary key default gen_random_uuid(),
  child_id            uuid references public.children(id) on delete cascade not null,
  vaccine_name        text not null,
  due_date            date,
  administered_date   date,
  administered_by     text,
  batch_number        text,
  notes               text,
  created_at          timestamptz default now()
);

-- 6. HEALTH LOGS
create table public.health_logs (
  id            uuid primary key default gen_random_uuid(),
  child_id      uuid references public.children(id) on delete cascade not null,
  type          text not null check (type in ('illness', 'medication', 'doctor_visit', 'symptom')),
  title         text not null,
  description   text,
  severity      text check (severity in ('mild', 'moderate', 'severe')),
  logged_at     timestamptz default now(),
  resolved_at   timestamptz,
  created_at    timestamptz default now()
);

-- 7. DOCUMENTS (Baby Passport)
create table public.documents (
  id            uuid primary key default gen_random_uuid(),
  child_id      uuid references public.children(id) on delete cascade not null,
  uploaded_by   uuid references public.profiles(id) not null,
  name          text not null,
  type          text not null check (type in ('birth_cert', 'vaccination_cert', 'prescription', 'insurance', 'other')),
  file_url      text not null,
  file_size     int,
  created_at    timestamptz default now()
);

-- 8. FAMILY MEMBERS
create table public.family_members (
  id            uuid primary key default gen_random_uuid(),
  child_id      uuid references public.children(id) on delete cascade not null,
  invited_by    uuid references public.profiles(id) not null,
  user_id       uuid references public.profiles(id),
  email         text not null,
  role          text not null check (role in ('co_parent', 'grandparent', 'nanny', 'doctor')),
  status        text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at    timestamptz default now()
);

-- ============================================================
-- TRIGGER: auto-create profile on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles        enable row level security;
alter table public.children        enable row level security;
alter table public.growth_records  enable row level security;
alter table public.nutrition_logs  enable row level security;
alter table public.vaccinations    enable row level security;
alter table public.health_logs     enable row level security;
alter table public.documents       enable row level security;
alter table public.family_members  enable row level security;

-- Profiles: users can only read/update their own
create policy "Users can view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Children: owner can do everything; family members can read
create policy "Owner can manage children"    on public.children for all using (auth.uid() = user_id);
create policy "Family members can view"      on public.children for select using (
  exists (select 1 from public.family_members where child_id = children.id and user_id = auth.uid() and status = 'accepted')
);

-- Growth, Nutrition, Vaccinations, Health, Documents: owner access via child ownership
create policy "Owner accesses growth"        on public.growth_records  for all using (exists (select 1 from public.children where id = growth_records.child_id  and user_id = auth.uid()));
create policy "Owner accesses nutrition"     on public.nutrition_logs  for all using (exists (select 1 from public.children where id = nutrition_logs.child_id  and user_id = auth.uid()));
create policy "Owner accesses vaccinations"  on public.vaccinations    for all using (exists (select 1 from public.children where id = vaccinations.child_id    and user_id = auth.uid()));
create policy "Owner accesses health"        on public.health_logs     for all using (exists (select 1 from public.children where id = health_logs.child_id     and user_id = auth.uid()));
create policy "Owner accesses documents"     on public.documents       for all using (exists (select 1 from public.children where id = documents.child_id       and user_id = auth.uid()));

-- Family members: owner manages, members can read
create policy "Owner manages family"         on public.family_members for all    using (auth.uid() = invited_by);
create policy "Members can view own invite"  on public.family_members for select using (auth.uid() = user_id);
