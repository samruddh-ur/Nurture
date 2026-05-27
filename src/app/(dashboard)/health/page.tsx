"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
  Sparkles, Send, ThumbsUp, ThumbsDown, AlertCircle,
  RefreshCw, Stethoscope, Thermometer, Pill, Syringe,
  Baby, Brain, Shield, Phone
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi Sarah! 👋 I'm BabyGPT, your AI parenting companion. I'm here to help you with questions about Aria's health, development, nutrition, and daily care.\n\nI have access to Aria's profile including her age (14 months), weight, and peanut allergy. How can I help you today?",
    time: "Just now",
  },
];

const quickQuestions = [
  { icon: "🤒", text: "Aria has a fever of 38.5°C — what should I do?" },
  { icon: "🍲", text: "What foods should I introduce this month?" },
  { icon: "😴", text: "How many hours should a 14-month-old sleep?" },
  { icon: "💊", text: "What's the right paracetamol dose for Aria's weight?" },
  { icon: "📏", text: "Is Aria's height and weight on track?" },
  { icon: "🗣️", text: "When should Aria start saying words?" },
];

const topics = [
  { icon: Thermometer, label: "Fever & Illness", color: "text-red-500 bg-red-50" },
  { icon: Pill, label: "Medications", color: "text-blue-500 bg-blue-50" },
  { icon: Syringe, label: "Vaccines", color: "text-violet-500 bg-violet-50" },
  { icon: Baby, label: "Development", color: "text-pink-500 bg-pink-50" },
  { icon: Brain, label: "Milestones", color: "text-amber-500 bg-amber-50" },
  { icon: Shield, label: "Safety Tips", color: "text-green-500 bg-green-50" },
];

const mockResponses: Record<string, string> = {
  fever: `Based on Aria's age (14 months), here's what to do for a 38.5°C fever:

**Immediate steps:**
• Give infant paracetamol (acetaminophen) — at Aria's weight of 10.1 kg, the dose is **150–200 mg** every 4–6 hours
• Keep her well hydrated with breast milk, formula, or water
• Dress her lightly — avoid over-bundling
• Monitor the temperature every 2 hours

**When to see a doctor urgently:**
🔴 Fever goes above 39.5°C
🔴 Fever lasts more than 48 hours
🔴 She's unusually lethargic, won't feed, or develops a rash
🔴 She has difficulty breathing

**Comforting tips:**
• A lukewarm (not cold) bath can help if she's uncomfortable
• Keep the room cool and ventilated

⚠️ *This is informational guidance only and does not replace professional medical advice. When in doubt, always contact your pediatrician.*`,

  food: `At 14 months, Aria can transition to more textured and varied foods. Here's what to introduce this month:

**Great foods for this stage:**
• 🥩 **Soft meats** — finely minced chicken, beef, or turkey
• 🐟 **Fish** — salmon or white fish (check for bones!)
• 🥚 **Whole eggs** — scrambled or soft boiled
• 🫐 **Berries** — halved blueberries, strawberries
• 🧀 **Cheese** — small cubes of mild cheddar or cottage cheese
• 🫘 **Legumes** — mashed beans, lentil dhal

**⚠️ Note for Aria:** I see she has a peanut allergy. Always check ingredient labels and avoid hidden peanut traces. When introducing tree nuts, do so one at a time under supervision.

**Texture tip:** Move toward more lumpy/mashed textures rather than fully pureed — it helps develop chewing skills.

⚠️ *Always introduce one new food at a time and wait 2–3 days to check for reactions.*`,

  default: `That's a great question! Let me look at Aria's profile to give you a personalized answer.

Based on her current age (14 months), weight (10.1 kg), and health history, here's what I can share:

For 14-month-old babies, typical milestones and health patterns include strong curiosity, improved gross motor skills, and growing vocabulary. Every child develops at their own pace, but I'm always here to help you navigate what's normal and when to check in with your pediatrician.

Would you like me to look into anything more specific?

⚠️ *This is informational guidance only and does not replace professional medical advice.*`,
};

function getResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("fever") || q.includes("temperature") || q.includes("38")) return mockResponses.fever;
  if (q.includes("food") || q.includes("introduce") || q.includes("eat")) return mockResponses.food;
  return mockResponses.default;
}

function MessageBubble({ msg }: { msg: Message }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end gap-3">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-[#7c6af7] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
            {msg.content}
          </div>
          <p className="text-[10px] text-[#c0c0c0] mt-1 text-right">{msg.time}</p>
        </div>
        <Avatar name="Sarah Johnson" size="sm" />
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c6af7] to-[#e879a8] flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="max-w-lg flex-1">
        <div className="bg-white border border-[#e8e8e0] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#1a1a2e] leading-relaxed whitespace-pre-line">
          {msg.content}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <p className="text-[10px] text-[#c0c0c0]">{msg.time}</p>
          <button className="p-0.5 rounded hover:bg-[#f0f0ea] text-[#c0c0c0] hover:text-emerald-500 transition-colors">
            <ThumbsUp className="w-3 h-3" />
          </button>
          <button className="p-0.5 rounded hover:bg-[#f0f0ea] text-[#c0c0c0] hover:text-red-400 transition-colors">
            <ThumbsDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HealthPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      time: "Just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponse(text),
        time: "Just now",
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Important:</strong> BabyGPT provides informational guidance only and does not replace professional medical advice. Always consult your pediatrician for medical concerns, emergencies, or before changing treatment plans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Topics sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card padding="sm">
            <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wide mb-3">Topics</p>
            <div className="space-y-1">
              {topics.map((topic) => (
                <button
                  key={topic.label}
                  onClick={() => send(`Tell me about ${topic.label.toLowerCase()} for a 14-month-old`)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-[#f5f5f0] transition-colors"
                >
                  <div className={`p-1.5 rounded-lg ${topic.color.split(" ")[1]}`}>
                    <topic.icon className={`w-3.5 h-3.5 ${topic.color.split(" ")[0]}`} />
                  </div>
                  <span className="text-xs font-medium text-[#1a1a2e]">{topic.label}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card padding="sm">
            <p className="text-xs font-semibold text-[#a0a0b8] uppercase tracking-wide mb-3">Emergency</p>
            <a href="tel:911" className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 hover:bg-red-100 transition-colors">
              <div className="p-1.5 bg-red-100 rounded-lg">
                <Phone className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-red-700">Call Emergency</p>
                <p className="text-[10px] text-red-500">911 · 24/7</p>
              </div>
            </a>
          </Card>
        </div>

        {/* Chat window */}
        <Card padding="none" className="lg:col-span-3 flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
          {/* Chat header */}
          <div className="flex items-center gap-3 p-4 border-b border-[#f0f0ea]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c6af7] to-[#e879a8] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1a1a2e]">BabyGPT</p>
              <p className="text-xs text-[#a0a0b8]">AI Parenting Companion · Aria&apos;s profile loaded</p>
            </div>
            <Badge variant="success" dot>Online</Badge>
            <button
              onClick={() => setMessages(initialMessages)}
              className="p-2 rounded-lg hover:bg-[#f5f5f0] text-[#a0a0b8]"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c6af7] to-[#e879a8] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-[#e8e8e0] rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1 items-center h-5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#7c6af7]"
                        style={{ animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-[#a0a0b8] mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 3).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => send(q.text)}
                    className="text-xs px-3 py-1.5 rounded-full border border-[#e8e8e0] bg-white hover:border-[#7c6af7] hover:text-[#7c6af7] transition-all"
                  >
                    {q.icon} {q.text.slice(0, 40)}...
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-[#f0f0ea]">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
                placeholder="Ask anything about Aria's health, nutrition, or development..."
                className="flex-1 h-11 rounded-xl bg-[#f5f5f0] border border-transparent px-4 text-sm text-[#1a1a2e] placeholder:text-[#a0a0b8] focus:outline-none focus:bg-white focus:border-[#7c6af7] focus:ring-2 focus:ring-[#7c6af7]/15 transition-all"
              />
              <Button onClick={() => send(input)} disabled={!input.trim() || loading} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
