import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { useChatWidget } from "./ChatWidgetContext";

/**
 * ChatWidget
 * Mount ONCE at the root of your app (e.g. inside App.jsx, wrapped in
 * <ChatWidgetProvider>). It renders:
 *  - a floating round trigger button (bottom-right), shown when closed
 *  - the chat panel, shown when open
 * Both the floating button AND your Topbar's "AI Advisor" button open the
 * same panel via the shared ChatWidgetContext (openChat()).
 *
 * ⚠️ IMPORTANT — READ BEFORE DEPLOYING:
 * This calls the AI provider's API directly from the browser using an API
 * key read from a VITE_* env var. Vite inlines VITE_* variables into the
 * shipped JS bundle at build time — anyone can open devtools/view-source
 * and read your key, then use it on your bill. This is fine for local
 * testing, but before going to production you should instead:
 *   1. Create a tiny backend route (e.g. POST /api/chat) that holds the
 *      real API key server-side (env var without the VITE_ prefix).
 *   2. Have this component fetch("/api/chat", { ... }) instead of the
 *      provider's API directly.
 * Say the word and I can build that proxy route for you — it's a small
 * change once you have a backend endpoint available.
 *
 * Requires: lucide-react
 */

/* ---------------- Configuration ---------------- */

// "anthropic" | "openai"
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || "anthropic";

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const ANTHROPIC_MODEL = import.meta.env.VITE_AI_MODEL || "claude-sonnet-4-5";
const OPENAI_MODEL = import.meta.env.VITE_AI_MODEL || "gpt-4o-mini";

// Customize this to describe your services / tone / what the bot should know.
const SYSTEM_PROMPT = `You are the AI advisor on WP Hridoy's web development portfolio site.
You help visitors with questions about services (WordPress development, custom web
applications, e-commerce, website cloning & migration, bug fixing, AI integration),
rough pricing, and the process of working together. Be concise, friendly, and helpful.
If asked something outside web development/this site, politely redirect to the contact form.`;

async function sendToAnthropic(messages) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      // Required to allow direct browser calls — see security warning above.
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API error: ${res.status}`);
  const data = await res.json();
  return data?.content?.[0]?.text || "Sorry, I couldn't generate a response.";
}

async function sendToOpenAI(messages) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      max_tokens: 512,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  });

  if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);
  const data = await res.json();
  return (
    data?.choices?.[0]?.message?.content ||
    "Sorry, I couldn't generate a response."
  );
}

async function sendToAI(messages) {
  return AI_PROVIDER === "openai"
    ? sendToOpenAI(messages)
    : sendToAnthropic(messages);
}

/* ---------------- UI ---------------- */

const initialMessages = [
  {
    role: "assistant",
    content:
      "Hi! 👋 I'm your AI advisor. Ask me about services, pricing, or how we can work together.",
  },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const { isOpen, openChat, closeChat } = useChatWidget();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const reply = await sendToAI(nextMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong reaching the AI service. Please try again in a moment.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={openChat}
          aria-label="Open AI advisor"
          className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[#04342C] shadow-[0_10px_30px_-8px_rgba(16,185,129,0.6)] transition-transform duration-300 hover:scale-110"
        >
          <Bot className="h-6 w-6" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-300" />
          </span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[90] flex h-[520px] w-[92vw] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#091424] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">AI Advisor</p>
                <p className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={closeChat}
              aria-label="Close chat"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-[#04342C]"
                      : "rounded-bl-sm bg-white/[0.06] text-slate-200"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <TypingDots />
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-white/[0.06] p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-emerald-400/30"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-[#04342C] transition-opacity disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
