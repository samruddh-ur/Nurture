export type UserRole = "parent" | "co-parent" | "grandparent" | "nanny" | "pediatrician" | "admin";

export interface Child {
  id: string;
  name: string;
  dob: string;
  gender: "male" | "female" | "other";
  bloodGroup?: string;
  allergies: string[];
  conditions: string[];
  photoUrl?: string;
  weight?: number; // kg
  height?: number; // cm
  headCircumference?: number; // cm
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  children: Child[];
  plan: "free" | "premium" | "family";
}

export interface Vaccination {
  id: string;
  childId: string;
  name: string;
  dueDate: string;
  givenDate?: string;
  status: "upcoming" | "due" | "completed" | "overdue";
  notes?: string;
}

export interface MealPlan {
  id: string;
  childId: string;
  date: string;
  meals: Meal[];
  nutritionScore: number;
}

export interface Meal {
  type: "breakfast" | "lunch" | "dinner" | "snack" | "breastfeed" | "formula";
  time: string;
  items: string[];
  calories?: number;
  notes?: string;
}

export interface GrowthRecord {
  date: string;
  weight?: number;
  height?: number;
  headCircumference?: number;
}

export interface Document {
  id: string;
  childId: string;
  name: string;
  type: "birth-cert" | "passport" | "medical" | "vaccination" | "insurance" | "prescription" | "school" | "other";
  uploadedAt: string;
  size: number;
  url?: string;
}

export interface FeedingLog {
  id: string;
  childId: string;
  type: "breast" | "formula" | "solid" | "water";
  time: string;
  amount?: number;
  duration?: number; // minutes for breast
  notes?: string;
}

export interface SleepLog {
  id: string;
  childId: string;
  startTime: string;
  endTime?: string;
  quality?: "good" | "fair" | "poor";
  notes?: string;
}

export interface Appointment {
  id: string;
  childId: string;
  title: string;
  doctor?: string;
  date: string;
  time: string;
  type: "checkup" | "vaccination" | "specialist" | "emergency" | "other";
  notes?: string;
  completed: boolean;
}

export interface Notification {
  id: string;
  type: "vaccination" | "appointment" | "meal" | "medication" | "milestone" | "growth";
  title: string;
  body: string;
  date: string;
  read: boolean;
  childId?: string;
}
