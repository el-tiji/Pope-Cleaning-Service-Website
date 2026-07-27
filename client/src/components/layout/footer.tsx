import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Link } from "wouter";
import { businessInfo } from "@/config/businessInfo";

// TikTok icon custom SVG component since it's not natively in lucide-react yet
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[var(--brand-navy-deep)] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <span className="flex items-center gap-2 mb-6 group cursor-pointer">
                <div className="h-14 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/assets/brand/pope-cleaning-logo-white.png" 
                    alt="Pope Cleaning Services logo" 
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden h-full aspect-square bg-primary flex items-center justify-center text-primary-foreground rounded-xl">
                    <span className="font-display font-bold text-2xl">P</span>
                  </div>
                </div>
              </span>
            </Link>
            <p className="text-[#D8E9FF] text-sm mb-6 max-w-xs">
              Premium residential and commercial cleaning services across the {businessInfo.location} area. We bring the sparkle back to your space.
            </p>
            <div className="flex items-center gap-4">
              <a href={businessInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--brand-blue-bright)] transition-colors hover:scale-110 transform duration-300">
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services#service-residential"><span className="text-[#B7D4F5] hover:text-[var(--brand-blue-light)] transition-colors text-sm cursor-pointer">Residential Cleaning</span></Link></li>
              <li><Link href="/services#service-office"><span className="text-[#B7D4F5] hover:text-[var(--brand-blue-light)] transition-colors text-sm cursor-pointer">Commercial Cleaning</span></Link></li>
              <li><Link href="/services#service-vacate"><span className="text-[#B7D4F5] hover:text-[var(--brand-blue-light)] transition-colors text-sm cursor-pointer">Vacate Cleaning</span></Link></li>
              <li><Link href="/services#service-carpet"><span className="text-[#B7D4F5] hover:text-[var(--brand-blue-light)] transition-colors text-sm cursor-pointer">Carpet & Upholstery</span></Link></li>
              <li><Link href="/services#service-tile"><span className="text-[#B7D4F5] hover:text-[var(--brand-blue-light)] transition-colors text-sm cursor-pointer">Tile & Grout</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-[#B7D4F5] hover:text-[var(--brand-blue-light)] transition-colors text-sm cursor-pointer">About Us</span></Link></li>
              <li><a href="/#reviews" className="text-[#B7D4F5] hover:text-[var(--brand-blue-light)] transition-colors text-sm">Testimonials</a></li>
              <li><a href="/#faq" className="text-[#B7D4F5] hover:text-[var(--brand-blue-light)] transition-colors text-sm">FAQ</a></li>
              <li><Link href="/privacy"><span className="text-[#B7D4F5] hover:text-[var(--brand-blue-light)] transition-colors text-sm cursor-pointer">Privacy Policy</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#B7D4F5] text-sm">
                <Phone className="w-5 h-5 text-[var(--brand-blue-light)] shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${businessInfo.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{businessInfo.phonePrimary}</a>
                  <a href={`tel:${businessInfo.phoneSecondary.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{businessInfo.phoneSecondary}</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-[#B7D4F5] text-sm">
                <Mail className="w-5 h-5 text-[var(--brand-blue-light)] shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white transition-colors">{businessInfo.email}</a>
              </li>
              <li className="flex items-start gap-3 text-[#B7D4F5] text-sm">
                <MapPin className="w-5 h-5 text-[var(--brand-blue-light)] shrink-0" />
                <span>{businessInfo.serviceArea}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#B7D4F5]">
          <p>&copy; {new Date().getFullYear()} {businessInfo.businessName}. ABN: {businessInfo.abn}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-[#7EC8FF]">Crafted for Perth with care.</p>
        </div>
      </div>
    </footer>
  );
}