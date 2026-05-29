import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Weight, Ruler, Syringe, Sparkles, TrendingUp,
  Utensils, Moon, ArrowRight, Clock,
  AlertCircle, CheckCircle2, Baby, Heart, Plus, User
} from "lucide-react";
import Link from "next/link";
import { WeightChart } from "@/components/dashboard/weight-chart";

function getAgeString(dob: string): string {
  const birth = new Date(dob);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (months < 24) return `${months} month${months !== 1 ? "s" : ""} old`;
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} old`;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage() {
  const supabase = await createClient();

  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch children
  const { data: children } = await supabase
    .from("children")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  const child = children?.[0] ?? null;

  // Fetch latest growth record
  const { data: growthRecords } = child
    ? await supabase
        .from("growth_records")
        .select("*")
        .eq("child_id", child.id)
        .order("recorded_at", { ascending: false })
        .limit(6)
    : { data: null };

  const latestGrowth = growthRecords?.[0] ?? null;

  // Fetch today's nutrition logs
  const today = new Date().toISOString().split("T")[0];
  const { data: todayMeals } = child
    ? await supabase
        .from("nutrition_logs")
        .select("*")
        .eq("child_id", child.id)
        .eq("logged_at", today)
        .order("meal_type")
    : { data: null };

  // Fetch upcoming vaccinations
  const { data: vaccinations } = child
    ? await supabase
        .from("vaccinations")
        .select("*")
        .eq("child_id", child.id)
        .is("administered_date", null)
        .order("due_date", { ascending: true })
        .limit(3)
    : { data: null };

  const firstName = profile?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "there";
  const weightChartData = growthRecords
    ? [...growthRecords].reverse().map((r) => ({ m: r.recorded_at?.slice(5, 7), v: r.weight_kg }))
    : [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">{getGreeting()}, {firstName} 👋</h1>
        <p className="text-sm text-[#737373]">
          {child ? `Here's what's happening with ${child.name} today` : "Let's set up your child's profile"}
        </p>
      </div>

      {/* Child hero card */}
      {child ? (
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#7c6af7] via-[#9b8ff9] to-[#e879a8] p-6 text-white shadow-lg">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-4xl">
                👶
              </div>
              <span className="absolute -bottom-1 -right-1 bg-green-400 border-2 border-white w-4 h-4 rounded-full" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{child.name}</h2>
                <Badge className="bg-white/20 text-white border-0 text-xs capitalize">{profile?.plan ?? "free"}</Badge>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-white/80">
                <span className="flex items-center gap-1"><Baby className="w-3.5 h-3.5" /> {getAgeString(child.date_of_birth)}</span>
                {child.blood_group && <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> Blood Group: {child.blood_group}</span>}
                {child.allergies?.length > 0 && <span className="flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {child.allergies.join(", ")}</span>}
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-2">
              <Link href="/children">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                  View profile <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-[#d0c8f8] bg-[#faf8ff] p-8 text-center">
          <div className="text-4xl mb-3">👶</div>
          <h3 className="font-bold text-[#1a1a2e] mb-1">Add your child's profile</h3>
          <p className="text-sm text-[#737373] mb-4">Start tracking growth, nutrition, and more</p>
          <Link href="/children">
            <Button>Add child <Plus className="w-4 h-4" /></Button>
          </Link>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Weight", icon: Weight, color: "text-violet-600", bg: "bg-violet-50",
            value: latestGrowth?.weight_kg ? `${latestGrowth.weight_kg} kg` : "—",
            sub: latestGrowth ? `Recorded ${latestGrowth.recorded_at}` : "No data yet",
          },
          {
            label: "Height", icon: Ruler, color: "text-blue-600", bg: "bg-blue-50",
            value: latestGrowth?.height_cm ? `${latestGrowth.height_cm} cm` : "—",
            sub: latestGrowth ? `Recorded ${latestGrowth.recorded_at}` : "No data yet",
          },
          {
            label: "Nutrition Score", icon: Utensils, color: "text-emerald-600", bg: "bg-emerald-50",
            value: todayMeals && todayMeals.length > 0 ? `${todayMeals.length * 20}/100` : "—",
            sub: todayMeals && todayMeals.length > 0 ? `${todayMeals.length} meals logged` : "No meals logged",
          },
          {
            label: "Vaccinations", icon: Syringe, color: "text-amber-600", bg: "bg-amber-50",
            value: vaccinations ? `${vaccinations.length}` : "—",
            sub: vaccinations && vaccinations.length > 0 ? "upcoming" : "All up to date",
          },
        ].map((stat) => (
          <Card key={stat.label} hover className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bg} rounded-bl-3xl opacity-50`} />
            <div className={`inline-flex p-2 rounded-xl ${stat.bg} mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-[#1a1a2e]">{stat.value}</p>
            <p className="text-xs text-[#a0a0b8] mt-0.5">{stat.label}</p>
            <p className="text-xs text-emerald-600 mt-1 font-medium">{stat.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Growth chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Growth Trend</CardTitle>
              <CardDescription>Weight over last 6 months</CardDescription>
            </div>
            <Link href="/growth">
              <Button variant="ghost" size="sm">View details <ArrowRight className="w-3 h-3" /></Button>
            </Link>
          </CardHeader>
          {weightChartData.length > 0 ? (
            <>
              <div className="flex gap-6 mb-4">
                <div>
                  <p className="text-xs text-[#a0a0b8]">Current weight</p>
                  <p className="text-xl font-bold text-[#1a1a2e]">{latestGrowth?.weight_kg} <span className="text-sm font-normal text-[#737373]">kg</span></p>
                </div>
              </div>
              <div className="h-36">
                <WeightChart data={weightChartData} />
              </div>
            </>
          ) : (
            <div className="h-36 flex flex-col items-center justify-center text-center gap-2">
              <TrendingUp className="w-8 h-8 text-[#d0c8f8]" />
              <p className="text-sm text-[#a0a0b8]">No growth data yet</p>
              <Link href="/growth"><Button size="sm" variant="soft">Log first measurement</Button></Link>
            </div>
          )}
        </Card>

        {/* Today's meals */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Meals</CardTitle>
            {todayMeals && todayMeals.length > 0 && <Badge variant="purple">{todayMeals.length * 20} / 100</Badge>}
          </CardHeader>
          {todayMeals && todayMeals.length > 0 ? (
            <div className="space-y-2.5">
              {todayMeals.map((meal, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#f0fdf4]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1a1a2e] capitalize">{meal.meal_type}</p>
                    <p className="text-xs text-[#a0a0b8] truncate">
                      {Array.isArray(meal.foods) ? meal.foods.map((f: { name: string }) => f.name).join(", ") : "Logged"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 gap-2 text-center">
              <Utensils className="w-8 h-8 text-[#d0c8f8]" />
              <p className="text-sm text-[#a0a0b8]">No meals logged today</p>
            </div>
          )}
          <Link href="/nutrition">
            <Button variant="soft" size="sm" className="w-full mt-4">
              <Utensils className="w-4 h-4" /> {todayMeals && todayMeals.length > 0 ? "Log more" : "Log first meal"}
            </Button>
          </Link>
        </Card>
      </div>

      {/* Upcoming vaccinations */}
      {vaccinations && vaccinations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Vaccinations</CardTitle>
            <Link href="/vaccinations">
              <button className="text-xs text-[#7c6af7] hover:underline">View all</button>
            </Link>
          </CardHeader>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {vaccinations.map((vax, i) => {
              const daysLeft = vax.due_date
                ? Math.ceil((new Date(vax.due_date).getTime() - Date.now()) / 86400000)
                : null;
              return (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-[#faf8ff] border border-[#ede9fe]">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${daysLeft && daysLeft <= 7 ? "bg-amber-50" : "bg-[#ede9fe]"}`}>
                    <Syringe className={`w-4 h-4 ${daysLeft && daysLeft <= 7 ? "text-amber-500" : "text-[#7c6af7]"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1a1a2e] leading-tight">{vax.vaccine_name}</p>
                    <p className="text-xs text-[#a0a0b8]">{vax.due_date ?? "No date set"}</p>
                  </div>
                  {daysLeft !== null && (
                    <Badge variant={daysLeft <= 7 ? "warning" : "purple"} className="flex-shrink-0 self-start">{daysLeft}d</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Quick log bar */}
      <Card className="bg-gradient-to-r from-[#fafaf8] to-[#f5f0ff] border-[#ede9fe]">
        <div className="flex flex-wrap gap-3 items-center">
          <p className="text-sm font-semibold text-[#1a1a2e] mr-2">Quick log:</p>
          {[
            { label: "Meal", icon: "🍼", href: "/nutrition" },
            { label: "Growth", icon: "📏", href: "/growth" },
            { label: "Vaccine", icon: "💉", href: "/vaccinations" },
            { label: "Health", icon: "🏥", href: "/health" },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e8e8e0] text-sm text-[#737373] hover:border-[#7c6af7] hover:text-[#7c6af7] transition-all shadow-sm">
                <span>{item.icon}</span>
                <span>{item.label}</span>
                <Plus className="w-3 h-3 ml-0.5" />
              </button>
            </Link>
          ))}
        </div>
      </Card>

    </div>
  );
}
