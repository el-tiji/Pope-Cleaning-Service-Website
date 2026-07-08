import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Heart, Star } from "lucide-react";
import teamVanMiniature from "@/assets/images/team-van-miniature.png";

export function WorkWithUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 translate-x-20 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">Work With Us</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Join the Pope Cleaning family. We're always looking for dedicated, detail-oriented professionals who take pride in their work and want to make a difference in Perth homes and offices.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.1}>
          <div className="relative w-full h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border-4 border-white">
            <img 
              src={teamVanMiniature} 
              alt="Pope Cleaning Services team and van in miniature style" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00275F]/80 to-transparent"></div>
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
              <span className="inline-block px-4 py-1.5 bg-[#2F7FD1] text-white text-sm font-bold rounded-full mb-3 shadow-lg">Our Team</span>
              <h3 className="text-2xl md:text-4xl font-bold text-white max-w-lg">Become part of the most meticulous team in Perth</h3>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <RevealOnScroll delay={0.1}>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Great Conditions</h3>
              <p className="text-muted-foreground">
                We offer competitive pay, flexible hours, and a supportive environment where your hard work is truly valued and rewarded.
              </p>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Family Culture</h3>
              <p className="text-muted-foreground">
                As a family-run business, we treat our team like family. We believe in open communication, mutual respect, and growing together.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Training & Growth</h3>
              <p className="text-muted-foreground">
                We provide comprehensive training on our standards and products, ensuring you have the skills and confidence to deliver exceptional results.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.4}>
          <div className="bg-[#00275F] rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Abstract shapes inside banner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2F7FD1]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your journey with us?</h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Send us your resume and a brief introduction about why you'd be a great fit for Pope Cleaning Services.
              </p>
              <a href="mailto:popecleaningservices@hotmail.com?subject=Job Application - Pope Cleaning Services">
                <Button size="lg" variant="secondary" className="gap-2 group">
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
