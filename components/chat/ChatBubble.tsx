"use client";

import { motion } from "framer-motion";

export function ChatBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
          isUser
            ? "rounded-br-sm bg-ocean-mid text-neutral-white"
            : "rounded-bl-sm bg-neutral-white text-neutral-dark"
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
}
