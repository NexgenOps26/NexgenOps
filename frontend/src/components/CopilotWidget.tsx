import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import api from "../api/axios";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi, I'm the NexgenOps Copilot. Ask me anything about your company, sites, or workforce data.",
};

const MOCK_REPLY =
  "This is a frontend preview — I'm not wired up to live data yet. Once connected, I'll answer this using NexgenOps' records.";

export function CopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, isOpen]);

  async function handleSend() {
    const text = draft.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setDraft("");
    setIsTyping(true);

    try {
      const response = await api.post("/assistant/query/", { query: text });
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-assistant`, role: "assistant", text: response.data.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-assistant`, role: "assistant", text: "Something went wrong. Try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans sm:bottom-8 sm:right-8">
      {isOpen ? (
        <div className="flex h-[32rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-enterprise-button sm:w-96">
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-navy-950 to-navy-850 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-electric-500/20 text-electric-300">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  NexgenOps Copilot
                </p>
                <p className="text-xs text-slate-300">
                  Ask about your workspace
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close copilot"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4 wizard-form-scroll"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-sm bg-electric-500 text-white"
                      : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-end gap-2 border-t border-slate-200 bg-white px-3 py-3">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Copilot..."
              rows={1}
              className="max-h-24 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-electric-400 focus:bg-white"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!draft.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-electric-500 text-white transition hover:bg-electric-400 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close copilot" : "Open copilot"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-navy-900 text-white shadow-enterprise-button transition hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
