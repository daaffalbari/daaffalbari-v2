"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  Trash2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "abel_chat_history";

const suggestedQuestions = [
  "Tell me about Daffa!",
  "What cool stuff does he build?",
  "Any fun projects?",
  "How can I reach him?",
];

// Parse markdown-like formatting in messages
const parseMessage = (content: string): string => {
  let parsed = content;

  // Escape HTML first to prevent XSS
  parsed = parsed
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Convert **bold** to <strong>
  parsed = parsed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');

  // Convert *italic* to <em>
  parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert URLs in angle brackets like &lt;https://...&gt; to clickable links
  parsed = parsed.replace(
    /&lt;(https?:\/\/[^\s&]+)&gt;/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="lnk break-all">$1</a>'
  );

  // Convert markdown links [text](url)
  parsed = parsed.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="lnk">$1</a>'
  );

  // Convert plain URLs to clickable links (that aren't already in anchor tags)
  parsed = parsed.replace(
    /(?<!href="|>)(https?:\/\/[^\s<]+)(?![^<]*<\/a>)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="lnk break-all">$1</a>'
  );

  // Convert newlines to <br>
  parsed = parsed.replace(/\n/g, '<br>');

  return parsed;
};

interface ChatbotProps {
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
}

export function Chatbot({ externalOpen, onExternalOpenChange }: ChatbotProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Use external control if provided, otherwise use internal state
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = (open: boolean) => {
    if (onExternalOpenChange) {
      onExternalOpenChange(open);
    } else {
      setInternalOpen(open);
    }
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
    setIsInitialized(true);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (e) {
        console.error("Failed to save chat history:", e);
      }
    }
  }, [messages, isInitialized]);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    // Add placeholder for assistant message
    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: fullContent } : m
                  )
                );
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "Sorry, I encountered an error. Please try again later.",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Chat Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        aria-label="Ask my agent"
        className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-[var(--space-2xs)] border border-[var(--color-ink)] bg-[var(--color-paper)] px-4 py-2 text-sm transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] ${isOpen ? "hidden" : ""}`}
        style={{ fontFamily: "var(--font-body)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
        Ask my agent
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden border-[var(--color-ink)] bg-[var(--color-paper)] sm:bottom-6 sm:right-6 sm:h-[480px] sm:w-[360px] sm:border"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between border-b border-[var(--color-rule)] px-[var(--space-md)] py-[var(--space-sm)]">
              <div>
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                  Abel · the agent
                </p>
                <h3 className="font-[var(--font-display)] text-lg font-medium tracking-tight text-[var(--color-ink)]">
                  Ask anything about Daffa
                </h3>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="inline-flex h-8 w-8 items-center justify-center text-[var(--color-ink-3)] transition-colors hover:text-[var(--color-ink)]"
                    title="Clear chat"
                    aria-label="Clear chat"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center text-[var(--color-ink-3)] transition-colors hover:text-[var(--color-ink)]"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div
              ref={messagesContainerRef}
              className="chatbot-messages flex-1 p-[var(--space-md)]"
              data-lenis-prevent
            >
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-start justify-center text-left">
                  <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]">
                    Start anywhere
                  </p>
                  <h4 className="mt-[var(--space-xs)] font-[var(--font-display)] text-xl font-medium leading-tight tracking-tight text-[var(--color-ink)]">
                    Abel has read everything about Daffa &mdash; the work, the writing, the wins.
                  </h4>
                  <p className="mt-[var(--space-sm)] text-sm text-[var(--color-ink-2)]">
                    Try a suggested question, or write your own.
                  </p>
                  <ul className="mt-[var(--space-lg)] grid w-full gap-[var(--space-2xs)]">
                    {suggestedQuestions.map((question) => (
                      <li key={question}>
                        <button
                          onClick={() => sendMessage(question)}
                          className="group flex w-full items-baseline justify-between gap-[var(--space-sm)] border-t border-[var(--color-rule)] py-[var(--space-2xs)] text-left text-sm text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-ink)]"
                        >
                          <span>{question}</span>
                          <span
                            aria-hidden
                            className="font-[var(--font-mono)] text-[10px] text-[var(--color-ink-3)] transition-transform group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-[var(--space-md)]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="grid grid-cols-[3rem_1fr] gap-[var(--space-sm)]"
                    >
                      <p
                        className="pt-[0.15em] font-[var(--font-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-3)]"
                      >
                        {message.role === "user" ? "You" : "Abel"}
                      </p>
                      <div className="text-sm leading-relaxed text-[var(--color-ink)]">
                        {message.content ? (
                          message.role === "user" ? (
                            message.content
                          ) : (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: parseMessage(message.content),
                              }}
                            />
                          )
                        ) : (
                          <Loader2
                            className="h-3.5 w-3.5 animate-spin text-[var(--color-ink-3)]"
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-[var(--color-rule)] p-[var(--space-md)]"
            >
              <div className="flex items-center gap-[var(--space-sm)] border-b border-[var(--color-rule)] pb-[var(--space-2xs)] focus-within:border-[var(--color-ink)]">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Abel about Daffa…"
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-3)] outline-none"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send"
                  className="inline-flex h-7 w-7 items-center justify-center text-[var(--color-ink-3)] transition-colors hover:text-[var(--color-ink)] disabled:opacity-40"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  ) : (
                    <Send className="h-4 w-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
