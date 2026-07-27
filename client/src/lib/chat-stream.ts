export interface ChatCitation {
  slug: string;
  title: string;
  category: string | null;
  visibility: string;
}

export interface ChatProposal {
  kind: "status_update" | "internal_note";
  reference: string;
  quoteId: string;
  newStatus?: string;
  reason?: string;
  note?: string;
}

export interface StreamHandlers {
  onSession?: (sessionId: string) => void;
  onToken: (delta: string) => void;
  onTool?: (info: { name: string; status: "running" | "done" }) => void;
  onCitations?: (citations: ChatCitation[]) => void;
  onProposal?: (proposal: ChatProposal) => void;
  onDone?: (data: { sessionId: string; messageId: string }) => void;
  onError?: (message: string) => void;
}

/**
 * POSTs to an SSE chat endpoint and dispatches parsed events.
 * Returns when the stream closes.
 */
export async function streamChat(
  url: string,
  body: Record<string, unknown>,
  handlers: StreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
      signal,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") return;
    handlers.onError?.("Network error — please check your connection and try again.");
    return;
  }

  if (!response.ok || !response.body) {
    let message = "The assistant is unavailable right now. Please try again later.";
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      /* keep default */
    }
    handlers.onError?.(message);
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let sawDone = false;
  let sawError = false;

  const dispatch = (eventName: string, raw: string) => {
    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      return;
    }
    switch (eventName) {
      case "session":
        handlers.onSession?.(data.sessionId);
        break;
      case "token":
        handlers.onToken(data.delta ?? "");
        break;
      case "tool":
        handlers.onTool?.(data);
        break;
      case "citations":
        handlers.onCitations?.(data);
        break;
      case "proposal":
        handlers.onProposal?.(data);
        break;
      case "done":
        sawDone = true;
        handlers.onDone?.(data);
        break;
      case "error":
        sawError = true;
        handlers.onError?.(data.message ?? "Something went wrong.");
        break;
    }
  };

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let sep: number;
      while ((sep = buffer.indexOf("\n\n")) !== -1) {
        const block = buffer.slice(0, sep);
        buffer = buffer.slice(sep + 2);
        let eventName = "message";
        const dataLines: string[] = [];
        for (const line of block.split("\n")) {
          if (line.startsWith("event: ")) eventName = line.slice(7).trim();
          else if (line.startsWith("data: ")) dataLines.push(line.slice(6));
        }
        if (dataLines.length) dispatch(eventName, dataLines.join("\n"));
      }
    }
  } catch (err) {
    if ((err as Error).name !== "AbortError" && !sawError && !sawDone) {
      handlers.onError?.("Connection lost — please try again.");
    }
    return;
  }

  if (!sawDone && !sawError) {
    handlers.onError?.("The reply was cut off — please try again.");
  }
}
