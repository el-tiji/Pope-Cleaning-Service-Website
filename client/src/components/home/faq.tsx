import { ASSETS } from "@/lib/assets";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to be home during the clean?",
    answer: "No, you do not need to be home. Many of our clients provide us with a key, a door code, or let us in before they leave for work. Our team is fully insured, police-cleared, and highly trustworthy."
  },
  {
    question: "Do you provide your own cleaning supplies and equipment?",
    answer: "Yes, we bring all of our own professional-grade equipment and premium cleaning products. If you have specific products you prefer us to use, just let us know!"
  },
  {
    question: "How do I pay for the service?",
    answer: "We accept all major credit cards, bank transfers, and cash. Payment is typically due upon completion of the service. We also offer automated billing for regular clients."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We understand that plans change. We ask for at least 24 hours notice if you need to cancel or reschedule to avoid any cancellation fees."
  },
  {
    question: "Do you offer a satisfaction guarantee?",
    answer: "Absolutely. If you are not completely satisfied with any area we cleaned, let us know within 24 hours and we will return to re-clean it at no additional cost."
  }
];

const highlights = [
  { icon: ASSETS.faq.guarantee, title: "100% Guarantee", desc: "We re-clean if not satisfied" },
  { icon: ASSETS.faq.areas, title: "All Perth Areas", desc: "Metro and surrounding suburbs" },
  { icon: ASSETS.faq.eco, title: "Eco-Friendly", desc: "Safe products for family & pets" },
  { icon: ASSETS.faq.payment, title: "Easy Payments", desc: "Card, transfer or cash accepted" }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold tracking-wider text-primary uppercase mb-3 text-[18px]">Questions?</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Frequently Asked Questions</h3>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our services, process, and guarantees.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {highlights.map((item, i) => (
                <RevealOnScroll key={i} delay={i * 0.1}>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border">
                    <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center p-2 shrink-0">
                      <img src={item.icon.src} alt={item.icon.alt} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <RevealOnScroll delay={0.2}>
              <div className="bg-background rounded-3xl p-6 md:p-8 border border-border">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b border-border last:border-0">
                      <AccordionTrigger className="text-left text-lg font-semibold text-secondary hover:text-primary py-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}