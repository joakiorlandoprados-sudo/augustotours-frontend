"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}) {
  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="border-t border-neutral-light bg-neutral-white p-3">
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          placeholder="Escribí tu mensaje..."
          disabled={disabled}
          className="chat-scroll max-h-32 flex-1 resize-none rounded-2xl border border-neutral-light bg-neutral-light px-4 py-2.5 text-sm text-neutral-dark placeholder:text-neutral-mid focus:border-ocean-mid focus:bg-neutral-white focus:outline-none disabled:opacity-60"
        />
        <button
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-mid text-neutral-white transition hover:bg-ocean-deep disabled:opacity-50"
          aria-label="Enviar"
        >
          <Send size={16} />
        </button>
      </div>
      <p className="mt-2 text-center text-[10px] text-neutral-mid">
        AugustoBot puede cometer errores. Verificá info importante.
      </p>
    </div>
  );
}
