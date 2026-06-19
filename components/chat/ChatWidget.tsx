"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SESSION_KEY = "augustotours_chat_session";
const HISTORY_KEY = "augustotours_chat_history";

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! 👋 Soy AugustoBot, tu asistente virtual en Río de Janeiro. ¿En qué te puedo ayudar? Puedo contarte sobre los tours, precios, itinerarios o ayudarte a reservar.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string>("");

  useEffect(() => {
    let id = typeof window !== "undefined" ? sessionStorage.getItem(SESSION_KEY) : null;
    if (!id) {
      id = `s_${Math.random().toString(36).slice(2)}_${Date.now()}`;
      sessionStorage.setItem(SESSION_KEY, id);
    }
    sessionId.current = id;

    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed: Msg[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-20)));
      }
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    const next: Msg[] = [
      ...messages,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ];
    setMessages(next);
    setStreaming(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId.current,
          message: text,
          history: next
            .filter((m) => m.role !== "assistant" || m.content !== WELCOME.content)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Sin respuesta del chat");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const obj = JSON.parse(payload);
            if (obj.text) {
              acc += obj.text;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant" && last.content === "") {
          copy[copy.length - 1] = {
            role: "assistant",
            content:
              "Disculpá, tuve un problema para conectarme. ¿Podés intentar de nuevo en unos segundos?",
          };
        } else {
          copy.push({
            role: "assistant",
            content:
              "Disculpá, tuve un problema para conectarme. ¿Podés intentar de nuevo en unos segundos?",
          });
        }
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ocean-mid text-neutral-white shadow-chat transition hover:bg-ocean-deep md:bottom-6 md:right-6"
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-3 z-50 flex h-[min(75vh,640px)] w-[min(95vw,380px)] flex-col overflow-hidden rounded-2xl bg-neutral-white shadow-chat md:bottom-28 md:right-6"
          >
            <div className="flex items-center justify-between gap-3 bg-ocean-deep px-4 py-3 text-neutral-white">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sunset-orange text-neutral-white">
                  <MessageCircle size={18} />
                </div>
                <div className="leading-tight">
                  <p className="font-semibold">AugustoBot</p>
                  <p className="text-[11px] text-ocean-pale">
                    En línea · responde en segundos
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-ocean-pale hover:bg-ocean-mid/30"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-neutral-light p-4"
            >
              {messages.map((m, i) => {
                const isLast = i === messages.length - 1;
                const typing = streaming && isLast && m.role === "assistant" && m.content === "";
                return (
                  <ChatBubble
                    key={i}
                    role={m.role}
                    content={m.content}
                    typing={typing}
                  />
                );
              })}
            </div>

            <ChatInput
              value={input}
              onChange={setInput}
              onSubmit={send}
              disabled={streaming}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
