import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  type: "bot" | "user";
  content: string;
  options?: string[];
  isTyping?: boolean;
};

const COMPANY_INFO = {
  name: "Pope Cleaning Services",
  whatsapp1: "+61 423 258 795",
  whatsapp2: "+61 431 450 293",
};

// Simplified chat logic for frontend mockup
const generateBotResponse = (userText: string, step: number): { text: string; options?: string[] } => {
  const lowerText = userText.toLowerCase();
  
  if (lowerText.includes("whatsapp") || lowerText.includes("contact") || lowerText.includes("talk to a person")) {
    return {
      text: `You can contact us directly on WhatsApp at ${COMPANY_INFO.whatsapp1} or ${COMPANY_INFO.whatsapp2} for personalized advice!`,
      options: ["Get a free quote", "Learn about services"]
    };
  }

  if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("how much")) {
    return {
      text: "Prices depend on the size and condition of the property and the services you need. I can take some details to organise a free, no-obligation quote, or you can message us on WhatsApp for a quick estimate.",
      options: ["Get a free quote", "Talk on WhatsApp"]
    };
  }

  if (step === 0 || lowerText.includes("services")) {
    return {
      text: "We offer several premium cleaning services:\n• Residential Cleaning\n• Commercial & Office\n• Vacate / End of Lease\n• Carpet & Upholstery\n• Tile & Grout\n• Pressure Cleaning",
      options: ["Get a free quote", "Vacate Cleaning details", "Talk on WhatsApp"]
    };
  }

  if (lowerText.includes("vacate") || lowerText.includes("end of lease")) {
    return {
      text: "Our Vacate Clean focuses on getting your property inspection and bond-ready. It includes a full kitchen clean (oven/stove), deep bathroom clean, all surfaces/skirting boards, and internal windows. Would you like a quote for this?",
      options: ["Yes, get a quote", "Do you guarantee bond back?"]
    };
  }

  if (lowerText.includes("bond")) {
    return {
      text: "We follow real-estate standards and offer a satisfaction/re-clean guarantee (we return to fix it at no extra cost if needed), but we cannot control every agent's final decision.",
      options: ["Get a free quote", "Talk on WhatsApp"]
    };
  }

  if (lowerText.includes("quote") || lowerText.includes("yes")) {
    return {
      text: "Great! Let's get started. Are you looking for Residential, Commercial, or Vacate cleaning?",
      options: ["Residential", "Commercial", "Vacate"]
    };
  }

  if (["residential", "commercial", "vacate"].some(s => lowerText.includes(s)) && step > 0) {
    return {
      text: "Thanks! What is your property type (e.g., House, Unit) and how many bedrooms/bathrooms?",
    };
  }

  if (step > 2 && (lowerText.includes("bed") || lowerText.includes("bath") || /[0-9]/.test(lowerText))) {
     return {
      text: "Perfect. Which suburb in Perth are you located in?",
    };
  }
  
  if (step > 3) {
    return {
      text: `Thank you! We'll review your details and get back to you with a tailored quote. For faster assistance, you can also message us on WhatsApp at ${COMPANY_INFO.whatsapp1}.`,
      options: ["Start over", "Talk on WhatsApp"]
    };
  }

  return {
    text: "I'm here to help with your cleaning needs in Perth! How can I assist you today?",
    options: ["Get a free quote", "Learn about services", "Book a clean", "Talk on WhatsApp"]
  };
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [interactionStep, setInteractionStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "1",
          type: "bot",
          content: "Hi! I'm the Pope Cleaning Services assistant. We're a family-owned cleaning company in Perth. How can I help you today?",
          options: [
            "Get a free quote",
            "Learn about our services",
            "Check availability / book",
            "Talk to us on WhatsApp"
          ]
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { id: userMsgId, type: "user", content: text }]);
    setInputValue("");
    setInteractionStep(prev => prev + 1);

    // Add typing indicator
    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: typingId, type: "bot", content: "", isTyping: true }]);

    // Simulate network delay based on text length
    const delay = Math.min(Math.max(text.length * 20, 800), 2000);
    
    setTimeout(() => {
      const response = generateBotResponse(text, interactionStep);
      
      setMessages(prev => prev.map(msg => 
        msg.id === typingId 
          ? { 
              id: typingId, 
              type: "bot", 
              content: response.text, 
              options: response.options,
              isTyping: false 
            } 
          : msg
      ));
    }, delay);
  };

  const renderMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-primary/60",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
        aria-label="Open chat"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[85vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-secondary p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-secondary"></div>
            </div>
            <div>
              <h3 className="font-bold text-sm leading-none">Pope Cleaning Assistant</h3>
              <p className="text-xs text-white/70 mt-1">Typically replies instantly</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
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
              <div key={msg.id} className={cn("flex w-full", msg.type === "user" ? "justify-end" : "justify-start")}>
                
                <div className={cn("flex gap-2 max-w-[85%]", msg.type === "user" ? "flex-row-reverse" : "flex-row")}>
                  {/* Avatar */}
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto",
                    msg.type === "user" ? "bg-primary text-white" : "bg-secondary text-white"
                  )}>
                    {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className={cn(
                    "p-3 rounded-2xl text-sm shadow-sm",
                    msg.type === "user" 
                      ? "bg-primary text-white rounded-br-none" 
                      : "bg-white border border-border text-secondary rounded-bl-none"
                  )}>
                    {msg.isTyping ? (
                      <div className="flex gap-1 items-center h-5 px-1">
                        <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      </div>
                    ) : (
                      renderMessageText(msg.content)
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Quick Options */}
            {messages.length > 0 && !messages[messages.length - 1].isTyping && messages[messages.length - 1].options && (
              <div className="flex flex-col gap-2 pl-10 pr-4 mt-2">
                {messages[messages.length - 1].options?.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(option)}
                    className="text-left bg-white border border-primary/20 hover:border-primary text-primary text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm flex items-center justify-between group"
                  >
                    <span className="font-medium">{option}</span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-3 border-t border-border bg-white">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
            className="flex items-center gap-2 relative"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="pr-12 rounded-full border-border bg-muted/30 focus-visible:ring-primary"
              disabled={messages.length > 0 && messages[messages.length - 1].isTyping}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 w-8 h-8 rounded-full"
              disabled={!inputValue.trim() || (messages.length > 0 && messages[messages.length - 1].isTyping)}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-muted-foreground">Or reach us on WhatsApp at <b>{COMPANY_INFO.whatsapp1}</b></span>
          </div>
        </div>
      </div>
    </>
  );
}