import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  Sparkles,
  Send,
  MessageSquarePlus,
  Bot,
  User,
  Loader2,
} from "lucide-react";

export default function AIConsultant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Welcome to Aegis Web Strategy Studio. I am your AI technical architect. Describe your business and I will recommend layouts, features, colors, and tech stack ideas.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const SUGGESTION_PROMPTS = [
    "Biotech website sitemap & modern grid colors",
    "High-converting landing page schema for legal firms",
    "Custom tech stack recommendations for a SaaS portal",
    "Interactive features that boost retention for SaaS",
  ];

  /* AUTO SCROLL */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  /* SEND MESSAGE */
  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now()}`;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const updatedMessages = [
      ...messages,
      {
        id: userMsgId,
        sender: "user",
        text,
        timestamp,
      },
    ];

    setMessages(updatedMessages);

    setInputText("");

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt: text,

          history: updatedMessages
            .map((m) => ({
              role: m.sender === "user" ? "user" : "model",

              parts: [
                {
                  text: m.text,
                },
              ],
            }))
            .slice(-6),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error(errorText);

        throw new Error("API request failed");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: "bot",
          text: data.response || "No response received.",

          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: "bot",
          text: "Failed to connect with AI server.",

          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestClick = (promptText) => {
    handleSendMessage(promptText);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* SIDEBAR */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 220,
            }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col justify-between border-l border-slate-100 bg-white shadow-2xl sm:max-w-md md:max-w-lg"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-slate-700 bg-slate-900 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-red-500/10">
                  <Sparkles className="h-4 w-4 text-red-500" />
                </div>

                <div>
                  <h3 className="text-sm font-bold">AI Strategy Advisor</h3>

                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    Powered by Gemini
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* CHAT AREA */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "user"
                      ? "ml-auto flex-row-reverse"
                      : "mr-auto"
                  }`}
                >
                  {/* AVATAR */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.sender === "user"
                        ? "bg-red-100 text-red-500"
                        : "bg-blue-100 text-blue-500"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>

                  {/* MESSAGE */}
                  <div className="space-y-1">
                    <div
                      className={`rounded-lg p-3 text-xs leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "rounded-tr-none bg-red-500 text-white"
                          : "rounded-tl-none border bg-white text-gray-800"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>

                    <p
                      className={`text-[9px] text-gray-400 ${
                        msg.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}

              {/* LOADING */}
              {isLoading && (
                <div className="mr-auto flex max-w-[80%] gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  </div>

                  <div className="flex items-center rounded-lg border bg-white p-3 text-xs italic text-slate-500 shadow-sm">
                    AI is thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* SUGGESTIONS */}
            <div className="space-y-2 border-t bg-white p-4">
              <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                <MessageSquarePlus className="h-3.5 w-3.5 text-red-500" />
                Common Prompts
              </p>

              <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto">
                {SUGGESTION_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestClick(prompt)}
                    className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap rounded border bg-slate-50 px-2.5 py-1.5 text-left text-[11px] text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* INPUT */}
            <div className="flex gap-2 border-t bg-slate-100 p-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(inputText);
                  }
                }}
                disabled={isLoading}
                placeholder="Describe your project..."
                className="flex-1 rounded border border-gray-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-blue-500"
              />

              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={isLoading || !inputText.trim()}
                className="flex shrink-0 items-center justify-center rounded bg-slate-900 p-2.5 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
