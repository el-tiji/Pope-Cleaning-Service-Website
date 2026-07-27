import { useState, useRef, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Sparkles, X, Send, Loader2, Copy, Check, BookOpen,
  ArrowRightCircle, StickyNote, Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { streamChat, type ChatCitation, type ChatProposal } from "@/lib/chat-stream";
import { STATUS_META } from "@/lib/quote-utils";

interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
  error?: boolean;
  citations?: ChatCitation[];
  proposals?: ProposalState[];
  toolActivity?: string | null;
}

interface ProposalState extends ChatProposal {
  localId: string;
  state: "pending" | "confirmed" | "dismissed" | "working";
}

const CASE_ACTIONS = [
  "Summarize this case",
  "Draft a WhatsApp reply",
  "Draft an email reply",
  "What info is missing?",
  "Suggest the next action",
];

const GENERAL_ACTIONS = [
  "List today's new quote requests",
  "How should I price a vacate clean?",
  "Draft a follow-up message for a quote with no reply",
  "What's our re-clean guarantee process?",
];

const TOOL_LABELS: Record<string, string> = {
  search_internal_knowledge: "Searching knowledge base…",
  get_quote_request: "Loading quote request…",
  search_quote_requests: "Searching quote requests…",
  propose_status_update: "Preparing status proposal…",
  propose_internal_note: "Preparing note proposal…",
  escalate_case: "Recording escalation…",
};

export function AdminCopilot({ quoteReference }: { quoteReference?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const { toast } = useToast();

  // New case context → fresh conversation.
  useEffect(() => {
    setSessionId(undefined);
    setMessages([]);
  }, [quoteReference]);

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const updateMessage = useCallback(
    (id: string, patch: Partial<CopilotMessage> | ((m: CopilotMessage) => Partial<CopilotMessage>)) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...(typeof patch === "function" ? patch(m) : patch) } : m)),
      );
    },
    [],
  );

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    const userId = `u-${Date.now()}`;
    const botId = `a-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: trimmed },
      { id: botId, role: "assistant", content: "", streaming: true, toolActivity: null },
    ]);
    setInput("");
    setIsStreaming(true);

    const abort = new AbortController();
    abortRef.current = abort;

    await streamChat(
      "/api/admin/chat",
      { message: trimmed, sessionId, quoteReference },
      {
        onSession: (id) => setSessionId(id),
        onToken: (delta) => updateMessage(botId, (m) => ({ content: m.content + delta, toolActivity: null })),
        onTool: ({ name, status }) =>
          updateMessage(botId, {
            toolActivity: status === "running" ? TOOL_LABELS[name] || "Working…" : null,
          }),
        onCitations: (citations) => updateMessage(botId, { citations }),
        onProposal: (proposal) =>
          updateMessage(botId, (m) => ({
            proposals: [
              ...(m.proposals ?? []),
              { ...proposal, localId: `p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, state: "pending" },
            ],
          })),
        onDone: () => updateMessage(botId, { streaming: false, toolActivity: null }),
        onError: (message) =>
          updateMessage(botId, (m) => ({
            streaming: false,
            error: true,
            toolActivity: null,
            content: m.content || message,
          })),
      },
      abort.signal,
    );
    setIsStreaming(false);
  };

  const confirmProposal = useMutation({
    mutationFn: async (proposal: ProposalState) => {
      if (proposal.kind === "status_update") {
        await apiRequest("PATCH", `/api/admin/quotes/${proposal.quoteId}/status`, {
          status: proposal.newStatus,
        });
      } else {
        await apiRequest("POST", `/api/admin/quotes/${proposal.quoteId}/notes`, {
          text: proposal.note,
        });
      }
      return proposal;
    },
    onSuccess: (proposal) => {
      setProposalState(proposal.localId, "confirmed");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quotes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: proposal.kind === "status_update" ? "Status updated" : "Note saved",
        description:
          proposal.kind === "status_update"
            ? `${proposal.reference} → ${STATUS_META[proposal.newStatus || ""]?.label || proposal.newStatus}`
            : `Internal note added to ${proposal.reference}`,
      });
    },
    onError: (err, proposal) => {
      setProposalState(proposal.localId, "pending");
      toast({ title: "Could not apply the change", description: (err as Error).message, variant: "destructive" });
    },
  });

  function setProposalState(localId: string, state: ProposalState["state"]) {
    setMessages((prev) =>
      prev.map((m) =>
        m.proposals?.some((p) => p.localId === localId)
          ? { ...m, proposals: m.proposals!.map((p) => (p.localId === localId ? { ...p, state } : p)) }
          : m,
      ),
    );
  }

  const copyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  };

  const actions = quoteReference ? CASE_ACTIONS : GENERAL_ACTIONS;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 h-12 pl-4 pr-5 rounded-full bg-[#00275F] text-white shadow-xl shadow-[#00275F]/30 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-[#2F7FD1]",
          isOpen && "scale-0 opacity-0 pointer-events-none",
        )}
        data-testid="button-open-copilot"
      >
        <Sparkles className="w-5 h-5 text-[#7FB5F0]" />
        <span className="font-bold text-sm">Copilot</span>
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white border-l border-border shadow-2xl flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="p-4 bg-[#00275F] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#7FB5F0]" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-none">Staff Copilot</h3>
              <p className="text-xs text-white/60 mt-1">
                {quoteReference ? `Case context: ${quoteReference}` : "Internal assistant · staff only"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            data-testid="button-close-copilot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 bg-[#F5F8FC]" ref={scrollRef}>
          <div className="p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center pt-8 pb-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00275F]/5 border border-[#00275F]/10 flex items-center justify-center mb-3">
                  <Sparkles className="w-7 h-7 text-[#2F7FD1]" />
                </div>
                <p className="font-bold text-[#00275F]">How can I help?</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[280px] mx-auto">
                  I can summarise cases, draft replies, search internal docs and propose updates — you confirm every change.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[92%] space-y-2", msg.role === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm whitespace-pre-wrap break-words",
                      msg.role === "user"
                        ? "bg-[#2F7FD1] text-white rounded-br-none"
                        : "bg-white border border-border text-secondary rounded-bl-none",
                      msg.error && "border-red-200 bg-red-50",
                    )}
                    data-testid={`copilot-message-${msg.role}`}
                  >
                    {msg.streaming && !msg.content ? (
                      <div className="flex items-center gap-2 text-muted-foreground h-5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span className="text-xs">{msg.toolActivity || "Thinking…"}</span>
                      </div>
                    ) : (
                      <>
                        {renderInline(msg.content)}
                        {msg.streaming && (
                          <span className="inline-block w-1.5 h-4 ml-0.5 align-middle bg-[#2F7FD1]/60 animate-pulse rounded-sm" />
                        )}
                      </>
                    )}
                  </div>

                  {msg.streaming && msg.content && msg.toolActivity && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground pl-1">
                      <Wrench className="w-3 h-3 animate-pulse" />
                      {msg.toolActivity}
                    </div>
                  )}

                  {/* Proposals */}
                  {msg.proposals?.map((p) => (
                    <div
                      key={p.localId}
                      className="border border-[#2F7FD1]/30 bg-[#EAF5FF] rounded-xl p-3 space-y-2"
                      data-testid={`proposal-${p.kind}`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-[#00275F] uppercase tracking-wide">
                        {p.kind === "status_update" ? (
                          <ArrowRightCircle className="w-3.5 h-3.5 text-[#2F7FD1]" />
                        ) : (
                          <StickyNote className="w-3.5 h-3.5 text-[#2F7FD1]" />
                        )}
                        {p.kind === "status_update" ? "Proposed status update" : "Proposed internal note"}
                      </div>
                      <div className="text-sm text-secondary">
                        {p.kind === "status_update" ? (
                          <>
                            <span className="font-bold">{p.reference}</span> →{" "}
                            <span className="font-bold">{STATUS_META[p.newStatus || ""]?.label || p.newStatus}</span>
                            {p.reason && <p className="text-xs text-muted-foreground mt-1">{p.reason}</p>}
                          </>
                        ) : (
                          <>
                            <span className="font-bold">{p.reference}</span>
                            <p className="text-xs mt-1 whitespace-pre-wrap">{p.note}</p>
                          </>
                        )}
                      </div>
                      {p.state === "confirmed" ? (
                        <div className="flex items-center gap-1.5 text-green-700 text-xs font-bold">
                          <Check className="w-3.5 h-3.5" /> Applied
                        </div>
                      ) : p.state === "dismissed" ? (
                        <div className="text-xs text-muted-foreground">Dismissed</div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="h-8 bg-[#2F7FD1] hover:bg-[#00275F] text-white font-bold"
                            disabled={p.state === "working"}
                            onClick={() => {
                              setProposalState(p.localId, "working");
                              confirmProposal.mutate(p);
                            }}
                            data-testid="button-confirm-proposal"
                          >
                            {p.state === "working" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Confirm"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8"
                            disabled={p.state === "working"}
                            onClick={() => setProposalState(p.localId, "dismissed")}
                            data-testid="button-dismiss-proposal"
                          >
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Citations + copy */}
                  {msg.role === "assistant" && !msg.streaming && msg.content && (
                    <div className="flex flex-wrap items-center gap-1.5 pl-1">
                      {msg.citations?.map((c) => (
                        <span
                          key={c.slug}
                          className={cn(
                            "inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border",
                            c.visibility === "internal"
                              ? "bg-amber-50 border-amber-200 text-amber-800"
                              : "bg-white border-border text-muted-foreground",
                          )}
                          title={c.slug}
                        >
                          <BookOpen className="w-2.5 h-2.5" />
                          {c.title}
                        </span>
                      ))}
                      <button
                        onClick={() => copyText(msg.id, msg.content)}
                        className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border bg-white border-border text-muted-foreground hover:text-[#00275F] hover:border-[#2F7FD1]/40 transition-colors"
                        data-testid="button-copy-message"
                      >
                        {copiedId === msg.id ? <Check className="w-2.5 h-2.5 text-green-600" /> : <Copy className="w-2.5 h-2.5" />}
                        {copiedId === msg.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick actions */}
        <div className="px-4 py-2 border-t border-border bg-white shrink-0">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {actions.map((action) => (
              <button
                key={action}
                onClick={() => send(action)}
                disabled={isStreaming}
                className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-[#2F7FD1]/30 text-[#2F7FD1] bg-[#EAF5FF]/50 hover:bg-[#EAF5FF] transition-colors disabled:opacity-50"
                data-testid="button-copilot-action"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border bg-white shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder={quoteReference ? `Ask about ${quoteReference}…` : "Ask the copilot…"}
              className="min-h-[44px] max-h-[120px] resize-none bg-muted/30 text-sm"
              disabled={isStreaming}
              maxLength={2000}
              data-testid="input-copilot-message"
            />
            <Button
              type="submit"
              size="icon"
              className="h-11 w-11 rounded-xl bg-[#2F7FD1] hover:bg-[#00275F] shrink-0"
              disabled={!input.trim() || isStreaming}
              data-testid="button-send-copilot"
            >
              {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
            Internal AI copilot — verify before sending anything to customers. Changes require your confirmation.
          </p>
        </div>
      </div>
    </>
  );
}

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
