import { ASSETS } from "@/lib/assets";
import { Play, Star, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

interface Review {
  name: string;
  sub: string;
  text: string;
  rating: number;
}

export function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      name: "Sarah M.",
      sub: "Residential Client",
      text: "Absolutely incredible service. They managed to get stains out of my carpet that have been there for years. The team was punctual, polite, and very thorough.",
      rating: 5
    },
    {
      name: "James T.",
      sub: "Office Manager",
      text: "We switched to Pope Cleaning for our corporate office and the difference is night and day. The place smells fresh every morning and the attention to detail is outstanding.",
      rating: 5
    },
    {
      name: "Elena W.",
      sub: "End of Lease",
      text: "Booked them for a vacate clean and got my full bond back without any issues. The real estate agent even asked for their details! Highly recommended.",
      rating: 5
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    serviceType: "",
    rating: 5,
    text: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videoCarousel = [
    { src: ASSETS.videoPlaceholder.src, title: "Carpet & Tile Transformation", desc: "Watch how we restored this Perth home in 40 seconds." },
    { src: "/assets/placeholders/video-cover-1.png", title: "Deep Kitchen Clean", desc: "Grease and grime removal in a modern kitchen." },
    { src: "/assets/placeholders/video-cover-2.png", title: "End of Lease Guarantee", desc: "Securing the bond back for a 3-bedroom apartment." },
    { src: "/assets/placeholders/video-cover-3.png", title: "Commercial Office Reset", desc: "Preparing an office space for a busy work week." },
    { src: "/assets/placeholders/video-cover-4.png", title: "Exterior Pressure Washing", desc: "Removing years of grime from a driveway and patio." },
  ];

  const nextVideo = () => setCurrentVideoIndex((prev) => (prev + 1) % videoCarousel.length);
  const prevVideo = () => setCurrentVideoIndex((prev) => (prev - 1 + videoCarousel.length) % videoCarousel.length);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.serviceType && formData.text) {
      const newReview: Review = {
        name: formData.name,
        sub: formData.serviceType,
        text: formData.text,
        rating: formData.rating
      };
      setReviews(prev => [newReview, ...prev]);
      setFormData({ name: "", serviceType: "", rating: 5, text: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section id="reviews" className="py-24 text-white relative" style={{ background: 'linear-gradient(135deg, var(--brand-navy-deep) 0%, var(--brand-navy) 100%)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold tracking-wider text-accent uppercase mb-3 text-[18px]">Trusted by Local Perth Clients</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-[#ffffff]">Why clients choose Pope Cleaning</h3>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Our commitment to quality and family values speaks for itself. Look at these dramatic transformations and hear from our happy clients across Perth who trust our team.
            </p>
          </div>
        </RevealOnScroll>

        {/* Video Placeholder Carousel */}
        <RevealOnScroll delay={0.2}>
          <div className="max-w-4xl mx-auto mb-20 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-video shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full" 
                style={{ transform: `translateX(-${currentVideoIndex * 100}%)` }}
              >
                {videoCarousel.map((video, idx) => (
                  <div key={idx} className="min-w-full h-full relative cursor-pointer group/video">
                    <img 
                      src={video.src} 
                      alt={`Video thumbnail: ${video.title}`} 
                      className="w-full h-full object-cover opacity-80 group-hover/video:scale-105 transition-transform duration-700"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30 group-hover/video:bg-primary group-hover/video:border-primary transition-all duration-300 transform group-hover/video:scale-110">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
                      <div className="bg-black/60 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 inline-block transform translate-y-2 opacity-0 group-hover/video:translate-y-0 group-hover/video:opacity-100 transition-all duration-300">
                        <h4 className="font-bold text-lg">{video.title}</h4>
                        <p className="text-sm text-white/70">{video.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Carousel Controls */}
              <div className="absolute bottom-4 right-6 flex items-center gap-4 z-20">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                  {videoCarousel.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentVideoIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === currentVideoIndex ? 'bg-primary w-4' : 'bg-white/30 hover:bg-white/60'}`}
                    />
                  ))}
                </div>
              </div>

              <button 
                onClick={prevVideo}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur shadow-md flex items-center justify-center text-white border border-white/10 hover:bg-primary hover:border-primary transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextVideo}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur shadow-md flex items-center justify-center text-white border border-white/10 hover:bg-primary hover:border-primary transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Before / After Slider (Static Mockup) */}
        <RevealOnScroll delay={0.3}>
          <div className="max-w-4xl mx-auto mb-24 bg-white/5 rounded-3xl p-6 md:p-10 border border-white/10">
            <h4 className="font-bold mb-8 text-center text-[#ffffff] text-[20px]">Drag to compare</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                <img src={ASSETS.reviews.beforeCarpet.src} alt={ASSETS.reviews.beforeCarpet.alt} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">Before</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                <img src={ASSETS.reviews.afterCarpet.src} alt={ASSETS.reviews.afterCarpet.alt} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">After</div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Testimonials and New Review Form */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* New Review Form */}
          <div className="lg:col-span-1 h-fit sticky top-32">
            <RevealOnScroll>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                <h4 className="text-xl font-bold mb-4 text-[#ffffff]">Share Your Experience</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-white/70">Your Name</Label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-accent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-white/70">Service Used</Label>
                    <Input 
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      placeholder="Residential Cleaning" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-accent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-white/70">Rating</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="transition-all"
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              star <= formData.rating 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-white/30"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-white/70">Review</Label>
                    <Textarea 
                      name="text"
                      value={formData.text}
                      onChange={handleInputChange}
                      placeholder="Share your experience with Pope Cleaning..." 
                      className="min-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-accent resize-none text-sm"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={!formData.name || !formData.serviceType || !formData.text}
                  >
                    <Send className="w-4 h-4" />
                    Post Review
                  </Button>
                  
                  {submitted && (
                    <div className="bg-green-500/20 border border-green-500/50 text-white text-xs p-3 rounded-lg text-center animate-in fade-in duration-300">
                      ¡Gracias! Tu reseña ha sido publicada.
                    </div>
                  )}
                </form>
              </div>
            </RevealOnScroll>
          </div>
          
          {/* Reviews List */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className={`bg-white text-secondary rounded-3xl p-6 shadow-xl relative transition-all duration-500 h-full`}>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(review.rating)].map((_, idx) => (
                      <svg key={idx} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed text-sm">"{review.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-secondary text-sm">{review.name}</h5>
                      <p className="text-xs text-muted-foreground font-medium">{review.sub}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}