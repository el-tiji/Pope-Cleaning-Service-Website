import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle, X, Send, Bot, User, CheckCircle2, ChevronRight,
  ThumbsUp, ThumbsDown, RotateCcw, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { streamChat, type ChatCitation } from "@/lib/chat-stream";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
  streaming?: boolean;
  error?: boolean;
  messageId?: string;
  citations?: ChatCitation[];
  feedback?: "up" | "down";
};

const COMPANY_INFO = {
  whatsappDisplay: "+61 423 258 795",
  whatsappLink: "https://wa.me/61423258795",
};

const GREETING =
  "Hi! I'm the Pope Cleaning Services assistant. We're a family-owned cleaning company in Perth. Ask me about our services, guarantees or how quoting works — how can I help?";

const STARTERS = [
  "What services do you offer?",
  "How does pricing work?",
  "Do you guarantee bond back for vacate cleans?",
  "What suburbs do you cover?",
];

const SESSION_KEY = "pope-chat-session-id";
const VISITOR_KEY = "pope-visitor-id";

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = `v-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: "greeting", role: "assistant", content: GREETING }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const updateMessage = useCallback((id: string, patch: Partial<Message> | ((m: Message) => Partial<Message>)) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...(typeof patch === "function" ? patch(m) : patch) } : m)),
    );
  }, []);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const userId = `u-${Date.now()}`;
    const botId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: trimmed },
      { id: botId, role: "assistant", content: "", streaming: true },
    ]);
    setInputValue("");
    setIsStreaming(true);

    const abort = new AbortController();
    abortRef.current = abort;

    await streamChat(
      "/api/chat",
      {
        message: trimmed,
        sessionId: sessionStorage.getItem(SESSION_KEY) || undefined,
        visitorId: getVisitorId(),
      },
      {
        onSession: (sessionId) => sessionStorage.setItem(SESSION_KEY, sessionId),
        onToken: (delta) => updateMessage(botId, (m) => ({ content: m.content + delta })),
        onCitations: (citations) =>
          updateMessage(botId, { citations: citations.filter((c) => c.visibility === "public") }),
        onDone: ({ messageId }) => updateMessage(botId, { streaming: false, messageId }),
        onError: (message) =>
          updateMessage(botId, (m) => ({
            streaming: false,
            error: true,
            content: m.content || message,
          })),
      },
      abort.signal,
    );
    setIsStreaming(false);
  };

  const handleFeedback = async (msg: Message, rating: "up" | "down") => {
    if (msg.feedback || !msg.messageId) return;
    updateMessage(msg.id, { feedback: rating });
    const sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) return;
    try {
      await fetch("/api/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, messageId: msg.messageId, rating }),
        credentials: "include",
      });
    } catch {
      /* non-critical */
    }
  };

  const handleReset = () => {
    abortRef.current?.abort();
    sessionStorage.removeItem(SESSION_KEY);
    setIsStreaming(false);
    setMessages([{ id: "greeting", role: "assistant", content: GREETING }]);
  };

  const showStarters = messages.length <= 1 && !isStreaming;

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-primary/60",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100",
        )}
        aria-label="Open chat"
        data-testid="button-open-chatbot"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[85vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between text-white" style={{ backgroundColor: "var(--brand-navy-deep)" }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-secondary"></div>
            </div>
            <div>
              <h3 className="font-bold text-sm leading-none">Pope Cleaning Assistant</h3>
              <p className="text-xs text-white/70 mt-1">AI assistant · replies instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              title="Start a new conversation"
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              data-testid="button-reset-chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              data-testid="button-close-chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-accent/10 px-4 py-2 flex items-center gap-2 border-b border-border/50">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-secondary">Family-owned in Perth, WA</span>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4 bg-muted/20" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("flex gap-2 max-w-[85%]", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto",
                      msg.role === "user" ? "bg-primary text-white" : "text-white",
                    )}
                    style={msg.role !== "user" ? { backgroundColor: "var(--brand-navy-deep)" } : undefined}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div
                      className={cn(
                        "p-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap break-words",
                        msg.role === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-white border border-border text-secondary rounded-bl-none",
                        msg.error && "border-red-200 bg-red-50",
                      )}
                      data-testid={`chat-message-${msg.role}`}
                    >
                      {msg.streaming && !msg.content ? (
                        <div className="flex gap-1 items-center h-5 px-1">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                        </div>
                      ) : (
                        <>
                          {renderInline(msg.content)}
                          {msg.streaming && <span className="inline-block w-1.5 h-4 ml-0.5 align-middle bg-primary/60 animate-pulse rounded-sm" />}
                        </>
                      )}
                    </div>

                    {msg.role === "assistant" && !msg.streaming && msg.messageId && (
                      <div className="flex items-center gap-1 pl-1">
                        <button
                          onClick={() => handleFeedback(msg, "up")}
                          className={cn(
                            "p-1 rounded hover:bg-muted transition-colors",
                            msg.feedback === "up" ? "text-green-600" : "text-muted-foreground/50",
                          )}
                          title="Helpful"
                          data-testid="button-feedback-up"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(msg, "down")}
                          className={cn(
                            "p-1 rounded hover:bg-muted transition-colors",
                            msg.feedback === "down" ? "text-red-500" : "text-muted-foreground/50",
                          )}
                          title="Not helpful"
                          data-testid="button-feedback-down"
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {showStarters && (
              <div className="flex flex-col gap-2 pl-10 pr-4 mt-2">
                {STARTERS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSend(option)}
                    className="text-left bg-white border border-primary/20 hover:border-primary text-primary text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-between group"
                    data-testid="button-chat-starter"
                  >
                    <span className="font-medium">{option}</span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
                <a
                  href={COMPANY_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-left bg-green-50 border border-green-200 hover:border-green-400 text-green-700 text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-between group"
                >
                  <span className="font-medium">Talk to a person on WhatsApp</span>
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-3 border-t border-border bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex items-center gap-2 relative"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about services, quotes, areas…"
              className="pr-12 rounded-full border-border bg-muted/30 focus-visible:ring-primary"
              disabled={isStreaming}
              maxLength={2000}
              data-testid="input-chat-message"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 w-8 h-8 rounded-full"
              disabled={!inputValue.trim() || isStreaming}
              data-testid="button-send-chat"
            >
              {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-muted-foreground">
              AI assistant — may make mistakes. Prices are only confirmed by our team. WhatsApp:{" "}
              <a href={COMPANY_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">
                {COMPANY_INFO.whatsappDisplay}
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/** Renders **bold** spans and preserves line breaks (whitespace-pre-wrap handles \n). */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
