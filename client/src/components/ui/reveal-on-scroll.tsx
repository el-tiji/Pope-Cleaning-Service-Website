import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type VariantType = "rise" | "fade" | "slide-left" | "slide-right" | "zoom" | "slide-up";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  variant?: VariantType;
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  yOffset = 24,
  variant = "rise"
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    rise: {
      initial: { opacity: 0, y: yOffset, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    "slide-left": {
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0 }
    },
    "slide-right": {
      initial: { opacity: 0, x: -24 },
      animate: { opacity: 1, x: 0 }
    },
    "slide-up": {
      initial: { opacity: 0, y: yOffset * 2 },
      animate: { opacity: 1, y: 0 }
    },
    zoom: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className, isInView && "is-visible")}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  );
}
