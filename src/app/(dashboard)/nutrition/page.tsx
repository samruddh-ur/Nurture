"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles, ChefHat, ShoppingCart, Apple, Droplets,
  Milk, Wheat, Flame, ArrowRight, CheckCircle2, Plus,
  RefreshCw, Download, Clock
} from "lucide-react";

const macros = [
  { name: "Protein", value: 18, goal: 20, color: "blue" as const, unit: "g" },
  { name: "Carbs", value: 65, goal: 80, color: "amber" as const, unit: "g" },
  { name: "Fats", value: 28, goal: 35, color: "pink" as const, unit: "g" },
  { name: "Fiber", value: 9, goal: 12, color: "green" as const, unit: "g" },
];

const mealPlan = [
  {
    day: "Monday",
    date: "Jun 2",
    today: true,
    meals: [
      { type: "Breakfast", time: "7:30 AM", items: ["Oatmeal with mashed banana", "Whole milk formula", "Soft cooked egg"], cals: 280, done: true },
      { type: "Morning Snack", time: "10:00 AM", items: ["Yogurt with berry puree", "Water (60ml)"], cals: 120, done: true },
      { type: "Lunch", time: "12:30 PM", items: ["Sweet potato & lentil mash", "Steamed broccoli florets", "Apple juice (30ml)"], cals: 310, done: false },
      { type: "Afternoon Snack", time: "3:00 PM", items: ["Rice puffs", "Sliced soft pear"], cals: 90, done: false },
      { type: "Dinner", time: "6:00 PM", items: ["Chicken, carrot & potato puree", "Soft cooked peas"], cals: 350, done: false },
    ],
  },
  {
    day: "Tuesday",
    date: "Jun 3",
    today: false,
    meals: [
      { type: "Breakfast", time: "7:30 AM", items: ["Banana pancakes (egg-free)", "Formula"], cals: 300, done: false },
      { type: "Lunch", time: "12:30 PM", items: ["Salmon & vegetable medley", "Brown rice porridge"], cals: 340, done: false },
      { type: "Dinner", time: "6:00 PM", items: ["Lentil soup with soft bread", "Mashed avocado"], cals: 380, done: false },
    ],
  },
];

const recipes = [
  {
    name: "Sweet Potato & Apple Mash",
    emoji: "🍠",
    age: "6+ months",
    time: "15 min",
    allergens: [],
    tags: ["Iron-rich", "Vitamin A"],
    rating: 4.8,
  },
  {
    name: "Chicken & Veggie Puree",
    emoji: "🍗",
    age: "8+ months",
    time: "20 min",
    allergens: [],
    tags: ["Protein", "Zinc"],
    rating: 4.9,
  },
  {
    name: "Banana Oat Porridge",
    emoji: "🍌",
    age: "6+ months",
    time: "10 min",
    allergens: ["Gluten"],
    tags: ["Energy", "Potassium"],
    rating: 4.7,
  },
  {
    name: "Avocado & Pea Smash",
    emoji: "🥑",
    age: "7+ months",
    time: "5 min",
    allergens: [],
    tags: ["Healthy fats", "Folate"],
    rating: 4.6,
  },
];

const groceryList = [
  { category: "Fruits", items: ["Bananas (x6)", "Apples (x4)", "Pears (x3)", "Blueberries (1 cup)"] },
  { category: "Vegetables", items: ["Sweet potatoes (x3)", "Broccoli (1 head)", "Carrots (6)", "Peas (frozen, 200g)"] },
  { category: "Protein", items: ["Chicken breast (200g)", "Salmon fillet (150g)", "Red lentils (100g)", "Eggs (x6)"] },
  { category: "Dairy", items: ["Full-fat yogurt (500g)", "Whole milk (1L)", "Formula (1 tin)"] },
  { category: "Grains", items: ["Baby oats (250g)", "Brown rice (200g)", "Soft bread (1 loaf)"] },
];

const waterGoal = 600;
const waterCurrent = 380;

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "recipes" | "grocery" | "tracking">("plan");
  const [generating, setGenerating] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-[#ede9fe]">
              <Sparkles className="w-4 h-4 text-[#7c6af7]" />
            </div>
            <h2 className="text-xl font-bold text-[#1a1a2e]">AI Nutrition Plan</h2>
            <Badge variant="purple">Aria · 14 months</Badge>
          </div>
          <p className="text-sm text-[#737373]">Personalized for her age, weight, and known peanut allergy</p>
        </div>
        <Button onClick={handleGenerate} loading={generating}>
          <RefreshCw className="w-4 h-4" />
          {generating ? "Generating..." : "Regenerate Plan"}
        </Button>
      </div>

      {/* Nutrition summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Flame className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">1,150</p>
              <p className="text-xs text-[#a0a0b8]">kcal / day goal</p>
            </div>
          </div>
          <Progress value={780} max={1150} color="amber" showLabel />
          <p className="text-xs text-[#a0a0b8] mt-2">780 kcal logged today</p>
        </Card>

        {macros.map((m) => (
          <Card key={m.name}>
            <p className="text-xs text-[#a0a0b8] mb-2">{m.name}</p>
            <p className="text-xl font-bold text-[#1a1a2e]">{m.value}<span className="text-sm font-normal text-[#737373]"> / {m.goal}{m.unit}</span></p>
            <Progress value={m.value} max={m.goal} color={m.color} className="mt-2" />
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#f5f5f0] p-1 rounded-xl w-fit">
        {(["plan", "recipes", "grocery", "tracking"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? "bg-white text-[#7c6af7] shadow-sm" : "text-[#737373] hover:text-[#1a1a2e]"
            }`}
          >
            {tab === "plan" ? "Meal Plan" : tab === "grocery" ? "Grocery List" : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Meal Plan Tab */}
      {activeTab === "plan" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Day selector */}
          <Card padding="sm" className="lg:col-span-1">
            <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wide mb-3 px-2">This Week</p>
            <div className="space-y-1">
              {mealPlan.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                    selectedDay === i ? "bg-[#ede9fe] text-[#7c6af7]" : "hover:bg-[#f5f5f0] text-[#737373]"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                    selectedDay === i ? "bg-[#7c6af7] text-white" : "bg-[#f0f0ea] text-[#737373]"
                  }`}>
                    <span className="text-[9px] font-medium">{day.day.slice(0, 3).toUpperCase()}</span>
                    <span className="text-sm font-bold leading-none">{day.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${selectedDay === i ? "text-[#7c6af7]" : "text-[#1a1a2e]"}`}>{day.day}</p>
                    <p className="text-xs text-[#a0a0b8]">{day.meals.length} meals</p>
                  </div>
                  {day.today && <Badge variant="success" className="ml-auto text-[10px]">Today</Badge>}
                </button>
              ))}
            </div>
          </Card>

          {/* Meal details */}
          <div className="lg:col-span-2 space-y-3">
            {mealPlan[selectedDay].meals.map((meal, i) => (
              <Card key={i} padding="sm" className={`border-l-4 ${meal.done ? "border-l-emerald-400" : "border-l-[#e8e8e0]"}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${meal.done ? "bg-emerald-50" : "bg-[#f5f5f0]"}`}>
                    {meal.done
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      : <Clock className="w-4 h-4 text-[#a0a0b8]" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#1a1a2e]">{meal.type}</p>
                        <span className="text-xs text-[#a0a0b8]">· {meal.time}</span>
                      </div>
                      <Badge variant="soft" className="text-xs">{meal.cals} kcal</Badge>
                    </div>
                    <ul className="space-y-0.5">
                      {meal.items.map((item, j) => (
                        <li key={j} className="text-xs text-[#737373] flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#c0c0c0] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {!meal.done && (
                    <Button size="sm" variant="soft" className="flex-shrink-0">
                      Log
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Tab */}
      {activeTab === "recipes" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recipes.map((recipe, i) => (
            <Card key={i} hover>
              <div className="text-4xl mb-3">{recipe.emoji}</div>
              <h3 className="font-semibold text-[#1a1a2e] text-sm mb-1">{recipe.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="purple" className="text-[10px]">{recipe.age}</Badge>
                <span className="text-xs text-[#a0a0b8] flex items-center gap-1">
                  <Clock className="w-3 h-3" />{recipe.time}
                </span>
              </div>
              {recipe.allergens.length > 0 && (
                <div className="flex gap-1 mb-3">
                  {recipe.allergens.map((a) => (
                    <Badge key={a} variant="warning" className="text-[10px]">⚠️ {a}</Badge>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="success" className="text-[10px]">{tag}</Badge>
                ))}
              </div>
              <Button variant="soft" size="sm" className="w-full">
                <ChefHat className="w-3 h-3" /> View recipe
              </Button>
            </Card>
          ))}
          <Card hover className="border-dashed border-2 flex flex-col items-center justify-center gap-3 min-h-40 cursor-pointer hover:border-[#7c6af7] hover:bg-[#faf8ff]">
            <div className="p-3 rounded-xl bg-[#ede9fe]">
              <Sparkles className="w-5 h-5 text-[#7c6af7]" />
            </div>
            <p className="text-sm font-semibold text-[#7c6af7]">Generate new recipe</p>
            <p className="text-xs text-[#a0a0b8] text-center">AI-powered based on Aria&apos;s profile</p>
          </Card>
        </div>
      )}

      {/* Grocery Tab */}
      {activeTab === "grocery" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {groceryList.map((cat, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-sm">{cat.category}</CardTitle>
                  <Badge variant="soft">{cat.items.length} items</Badge>
                </CardHeader>
                <div className="space-y-2">
                  {cat.items.map((item, j) => (
                    <label key={j} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded accent-[#7c6af7]" />
                      <span className="text-sm text-[#737373] group-hover:text-[#1a1a2e] transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <Card className="h-fit">
            <CardTitle className="mb-4">Shopping Summary</CardTitle>
            <div className="space-y-3 mb-6">
              {groceryList.map((cat) => (
                <div key={cat.category} className="flex items-center justify-between text-sm">
                  <span className="text-[#737373]">{cat.category}</span>
                  <span className="font-medium text-[#1a1a2e]">{cat.items.length} items</span>
                </div>
              ))}
              <div className="border-t border-[#f0f0ea] pt-3 flex justify-between font-semibold">
                <span className="text-[#1a1a2e]">Total</span>
                <span className="text-[#7c6af7]">{groceryList.reduce((a, c) => a + c.items.length, 0)} items</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button className="w-full">
                <ShoppingCart className="w-4 h-4" /> Add to shopping app
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4" /> Export PDF
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Tracking Tab */}
      {activeTab === "tracking" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Water tracking */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Droplets className="w-5 h-5 text-blue-500" />
                </div>
                <CardTitle>Water Intake</CardTitle>
              </div>
              <Badge variant="info">{waterCurrent} / {waterGoal} ml</Badge>
            </CardHeader>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#eff6ff" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="#3b82f6" strokeWidth="3"
                    strokeDasharray={`${(waterCurrent / waterGoal) * 100} 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{Math.round((waterCurrent / waterGoal) * 100)}%</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <Progress value={waterCurrent} max={waterGoal} color="blue" showLabel />
                <p className="text-sm text-[#737373]">{waterGoal - waterCurrent} ml remaining</p>
                <Button variant="soft" size="sm">
                  <Plus className="w-4 h-4" /> Log water
                </Button>
              </div>
            </div>
          </Card>

          {/* Breastfeeding / Formula */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-pink-50 rounded-xl">
                  <Milk className="w-5 h-5 text-pink-500" />
                </div>
                <CardTitle>Feeding Log</CardTitle>
              </div>
              <Button size="sm" variant="soft">
                <Plus className="w-4 h-4" /> Add log
              </Button>
            </CardHeader>
            <div className="space-y-3">
              {[
                { type: "Formula", time: "7:15 AM", amount: "180ml", icon: "🍼" },
                { type: "Formula", time: "10:30 AM", amount: "150ml", icon: "🍼" },
                { type: "Breastfeed", time: "1:00 PM", amount: "12 min", icon: "🤱" },
                { type: "Formula", time: "4:00 PM", amount: "160ml", icon: "🍼" },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#fafaf8] hover:bg-[#f5f5f0] transition-colors">
                  <span className="text-lg">{log.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1a1a2e]">{log.type}</p>
                    <p className="text-xs text-[#a0a0b8]">{log.time}</p>
                  </div>
                  <Badge variant="soft">{log.amount}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
