"use client";

import { motion } from "framer-motion";

export function ChatBubble({
  role,
  content,
  typing = false,
}: {
  role: "user" | "assistant";
  content: string;
  typing?: boolean;
}) {
  const isUser = role === "user";
  const showDots = !isUser && typing && content === "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
          isUser
            ? "rounded-br-sm bg-ocean-mid text-neutral-white"
            : "rounded-bl-sm bg-neutral-white text-neutral-dark"
        }`}
      >
        {showDots ? (
          <span
            className="inline-flex items-center gap-1.5 py-1"
            aria-label="AugustoBot está escribiendo"
          >
            <span className="h-2 w-2 animate-bounce rounded-full bg-ocean-mid [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-ocean-mid [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-ocean-mid" />
          </span>
        ) : (
          content
        )}
      </div>
    </motion.div>
  );
}
