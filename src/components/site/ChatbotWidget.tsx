"use client";

import * as React from "react";
import { Bot, X, Send, Sparkles, Moon } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface BotConfig {
  active: boolean;
  welcome?: { en: string; id: string };
  offline?: { en: string; id: string };
}

export function ChatbotWidget() {
  const { t, lang } = useLanguage();
  const [config, setConfig] = React.useState<BotConfig | null>(null);
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isId = lang === "id";

  // Fetch bot config (schedule + welcome) on mount.
  React.useEffect(() => {
    let active = true;
    fetch("/api/chatbot/config")
      .then((r) => r.json())
      .then((d) => {
        if (active && d.ok) setConfig(d);
      })
      .catch(() => {
        if (active)
          setConfig({
            active: false,
            offline: {
              en: "🌙 Our virtual assistant is available from 10 PM to 8 AM (Bali time).",
              id: "🌙 Asisten virtual kami tersedia pukul 22.00 – 08.00 waktu Bali.",
            },
          });
      });
    return () => {
      active = false;
    };
  }, []);

  // Auto-scroll to bottom on new message.
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Seed welcome message when panel opens.
  React.useEffect(() => {
    if (open && messages.length === 0 && config) {
      const welcome = config.active
        ? config.welcome?.[isId ? "id" : "en"] || ""
        : config.offline?.[isId ? "id" : "en"] || "";
      if (welcome) setMessages([{ role: "assistant", content: welcome }]);
    }
  }, [open, config, messages.length, isId]);

  const active = config?.active ?? false;

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history, lang: isId ? "id" : "en" }),
      });
      const data = await res.json();
      const reply =
        data.ok && data.reply
          ? data.reply
          : data.offline
            ? config?.offline?.[isId ? "id" : "en"] || "Offline"
            : t.chatbot.error;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t.chatbot.error }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const suggestions = [
    t.chatbot.suggestion1,
    t.chatbot.suggestion2,
    t.chatbot.suggestion3,
    t.chatbot.suggestion4,
  ];

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.chatbot.close : t.chatbot.open}
        className={cn(
          "fixed bottom-5 left-5 z-40 flex size-14 items-center justify-center rounded-full shadow-[0_12px_32px_-10px_rgba(28,26,23,0.5)] transition-all duration-300 hover:scale-105 sm:bottom-7 sm:left-7",
          active
            ? "bg-charcoal text-ivory"
            : "bg-charcoal/80 text-ivory"
        )}
      >
        {open ? (
          <X className="size-6" />
        ) : (
          <div className="relative">
            <Bot className="size-6" />
            {/* Status dot */}
            <span
              className={cn(
                "absolute -right-1 -top-1 size-3 rounded-full border-2 border-charcoal",
                active ? "bg-tropical" : "bg-bronze"
              )}
              aria-hidden
            />
          </div>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 left-3 z-40 flex h-[32rem] w-[calc(100vw-1.5rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-stone/70 bg-card shadow-[0_30px_80px_-30px_rgba(28,26,23,0.6)] sm:bottom-28 sm:left-7">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone/70 bg-charcoal px-4 py-3 text-ivory">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-tropical/25 text-bronze-light">
                <Bot className="size-5" />
              </span>
              <div>
                <p className="font-serif-display text-base font-medium leading-tight">
                  {t.chatbot.title}
                </p>
                <p className="flex items-center gap-1 text-[0.65rem] text-ivory/60">
                  {active ? (
                    <>
                      <span className="size-1.5 rounded-full bg-tropical" /> {t.chatbot.online}
                    </>
                  ) : (
                    <>
                      <Moon className="size-2.5" /> {t.chatbot.offline}
                    </>
                  )}
                  <span className="text-ivory/40">· {t.chatbot.subtitle}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.chatbot.close}
              className="rounded-full p-1.5 text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-sand/20 p-4 slim-scroll"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-charcoal text-ivory"
                      : "bg-card border border-stone/70 text-charcoal"
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-stone/70 bg-card px-3.5 py-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 animate-bounce rounded-full bg-tropical [animation-delay:-0.3s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-tropical [animation-delay:-0.15s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-tropical" />
                    <span className="ml-1 text-[0.7rem]">{t.chatbot.typing}</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestion chips (only when few messages) */}
          {messages.length <= 1 && !loading && active && (
            <div className="flex flex-wrap gap-1.5 border-t border-stone/70 bg-sand/10 px-3 py-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-stone/70 bg-card px-2.5 py-1 text-[0.7rem] font-medium text-muted-foreground transition-colors hover:border-tropical/40 hover:text-tropical"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-stone/70 bg-card p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              className="h-10 flex-1 rounded-full border border-stone/70 bg-sand/30 px-4 text-sm text-charcoal placeholder:text-muted-foreground/60 focus:border-tropical focus:outline-none focus:ring-1 focus:ring-tropical"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label={t.chatbot.send}
              className="inline-flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-tropical text-white transition-colors hover:bg-tropical-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Sparkles className="size-4 animate-pulse" />
              ) : (
                <Send className="size-4" />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
