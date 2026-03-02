import { ASSETS } from "@/lib/assets";
import { Play } from "lucide-react";

export function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-secondary text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-wider text-accent uppercase mb-3">Real Results</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">See the difference we make</h3>
          <p className="text-lg text-white/70">
            Don't just take our word for it. Look at these dramatic transformations and hear from our happy clients across Perth.
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="max-w-4xl mx-auto mb-20 relative group cursor-pointer">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-video shadow-2xl">
            <img 
              src={ASSETS.videoPlaceholder.src} 
              alt={ASSETS.videoPlaceholder.alt} 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30 group-hover:bg-primary group-hover:border-primary transition-all duration-300 transform group-hover:scale-110">
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 inline-block">
                <h4 className="font-bold text-lg">Carpet & Tile Transformation</h4>
                <p className="text-sm text-white/70">Watch how we restored this Perth home in 40 seconds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Before / After Slider (Static Mockup) */}
        <div className="max-w-4xl mx-auto mb-24 bg-white/5 rounded-3xl p-6 md:p-10 border border-white/10">
          <h4 className="text-2xl font-bold mb-8 text-center">Drag to compare</h4>
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

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
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
          ].map((review, i) => (
            <div key={i} className="bg-white text-secondary rounded-3xl p-8 shadow-xl relative">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-secondary">{review.name}</h5>
                  <p className="text-xs text-muted-foreground font-medium">{review.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}