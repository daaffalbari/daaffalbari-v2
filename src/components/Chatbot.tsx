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
  "Who is Daffa?",
  "What are his skills?",
  "Tell me about his projects",
  "How can I contact him?",
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
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover:underline break-all">$1</a>'
  );

  // Convert markdown links [text](url)
  parsed = parsed.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover:underline">$1</a>'
  );

  // Convert plain URLs to clickable links (that aren't already in anchor tags)
  parsed = parsed.replace(
    /(?<!href="|>)(https?:\/\/[^\s<]+)(?![^<]*<\/a>)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] hover:underline break-all">$1</a>'
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
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--background)] shadow-lg transition-transform hover:scale-105 ${isOpen ? "hidden" : ""}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <MessageCircle className="h-5 w-5" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden border-[var(--card-border)] bg-[var(--card)] shadow-2xl sm:bottom-6 sm:right-6 sm:h-[450px] sm:w-[340px] sm:rounded-xl sm:border"
            data-lenis-prevent
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--card-border)] bg-[var(--background-secondary)] px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/10">
                  <Bot className="h-4 w-4 text-[var(--accent)]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[var(--foreground)]">
                    Abel
                  </h3>
                  <p className="text-[10px] text-[var(--foreground-muted)]">
                    Daffa&apos;s AI Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="rounded-full p-1.5 text-[var(--foreground-muted)] transition-colors hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]"
                    title="Clear chat"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-[var(--foreground-muted)] transition-colors hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="chatbot-messages flex-1 p-3"
              data-lenis-prevent
            >
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10">
                    <Sparkles className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h4 className="mb-1.5 text-sm font-medium text-[var(--foreground)]">
                    Hi, I&apos;m Abel!
                  </h4>
                  <p className="mb-4 text-xs leading-relaxed text-[var(--foreground-muted)]">
                    I&apos;m here to help you learn about Daffa.
                    <br />
                    Ask me about his projects, skills, or experience!
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {suggestedQuestions.map((question) => (
                      <button
                        key={question}
                        onClick={() => sendMessage(question)}
                        className="rounded-full border border-[var(--card-border)] px-2.5 py-1 text-[10px] text-[var(--foreground-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          message.role === "user"
                            ? "bg-[var(--accent)]"
                            : "bg-[var(--accent)]/10"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-3 w-3 text-[var(--background)]" />
                        ) : (
                          <Bot className="h-3 w-3 text-[var(--accent)]" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                          message.role === "user"
                            ? "bg-[var(--accent)] text-[var(--background)]"
                            : "bg-[var(--background-secondary)] text-[var(--foreground)]"
                        }`}
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
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
                          <Loader2 className="h-3 w-3 animate-spin" />
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[var(--card-border)] p-3"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Daffa..."
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-[var(--card-border)] bg-[var(--background)] px-3 py-1.5 text-xs text-[var(--foreground)] placeholder-[var(--foreground-muted)] outline-none transition-colors focus:border-[var(--accent)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--background)] transition-opacity disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
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
