import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

interface ServicePreviewPopoverProps {
  serviceName: string;
  images: { src: string; alt: string }[];
  children: React.ReactNode;
}

export function ServicePreviewPopover({ serviceName, images, children }: ServicePreviewPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [align, setAlign] = useState<'top' | 'bottom'>('top');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateCoords = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    
    // Position slightly above the trigger text area
    const popoverHeight = 260; 
    let top = rect.top - popoverHeight - 15;
    let newAlign: 'top' | 'bottom' = 'top';
    
    // If not enough space above, position it over the trigger, lower down
    if (top < 10) {
      top = rect.top + 20; 
      newAlign = 'bottom';
    }
    
    setCoords({
      top: top,
      left: rect.left + (rect.width / 2)
    });
    setAlign(newAlign);
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updateCoords();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleTouch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isMobile) return;
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  // Helper for image fallback to realistic Unsplash if local placeholder is missing
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (!target.src.includes('unsplash.com')) {
      target.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80";
    }
  };

  const PopoverContent = () => {
    if (!isOpen) return null;
    
    return (
      <AnimatePresence>
        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: align === 'top' ? 10 : -10, scale: 0.98, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: align === 'top' ? 10 : -10, scale: 0.98, x: '-50%' }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ position: 'fixed', top: coords.top, left: coords.left, zIndex: 9999 }}
            className="bg-white rounded-2xl shadow-2xl border border-border overflow-hidden w-64 pointer-events-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="p-3 border-b border-border bg-primary/5 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-bold text-secondary truncate">{serviceName} Gallery</h4>
            </div>
            <div className="relative aspect-[4/3] bg-black group/carousel">
              <img 
                src={images[currentIdx]?.src} 
                alt={images[currentIdx]?.alt} 
                onError={handleImageError}
                className="w-full h-full object-cover" 
              />
              {images.length > 1 && (
                <>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
                    <button onClick={prevImg} className="w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary transition-colors backdrop-blur-sm"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={nextImg} className="w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary transition-colors backdrop-blur-sm"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                  <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                    {images.map((_, i) => (<div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIdx ? 'bg-primary' : 'bg-white/50'}`} />))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-border bg-primary/5">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h4 className="font-bold text-secondary">{serviceName} Gallery</h4>
                </div>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }} className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-muted-foreground hover:text-secondary hover:bg-muted transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="relative aspect-[4/3] bg-black">
                <img 
                  src={images[currentIdx]?.src} 
                  alt={images[currentIdx]?.alt} 
                  onError={handleImageError}
                  className="w-full h-full object-cover" 
                />
                {images.length > 1 && (
                  <>
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3">
                      <button onClick={prevImg} className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary transition-colors backdrop-blur-sm shadow-lg"><ChevronLeft className="w-6 h-6" /></button>
                      <button onClick={nextImg} className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-primary transition-colors backdrop-blur-sm shadow-lg"><ChevronRight className="w-6 h-6" /></button>
                    </div>
                    <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                      {images.map((_, i) => (<div key={i} className={`w-2 h-2 rounded-full ${i === currentIdx ? 'bg-primary' : 'bg-white/50'}`} />))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <div 
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative"
      >
        <div className="w-full h-full relative z-10 cursor-pointer" onClick={isMobile ? handleTouch : undefined}>
          {children}
        </div>
      </div>
      {typeof window !== 'undefined' && createPortal(<PopoverContent />, document.body)}
    </>
  );
}