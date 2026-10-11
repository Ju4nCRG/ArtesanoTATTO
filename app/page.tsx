"use client";
import React, { useState, useEffect, useRef } from 'react';

// Iconos SVG nativos actualizados y seguros
const Icons = {
  Menu: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  X: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  ArrowRight: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  MapPin: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  ShieldCheck: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 8-2 2 1 6 2 8 2a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  CheckCircle2: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  CreditCard: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
  ),
  Sparkles: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  ),
  Droplet: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
    </svg>
  ),
  Focus: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3"/><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
    </svg>
  ),
  Aperture: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><path d="m14.31 8 5.74 9.94"/><path d="M9.69 8h11.48"/><path d="m7.38 12 5.74-9.94"/><path d="M9.69 16 3.95 6.06"/><path d="M14.31 16H2.83"/><path d="m16.62 12-5.74 9.94"/>
    </svg>
  ),
  MessageCircle: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
  ),
  Video: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>
    </svg>
  ),
  Star: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  ChevronDown: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  Instagram: ({ size = 16, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
  TikTok: ({ size = 16, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.242V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002-.001a2.895 2.895 0 0 1 3.144-4.53v-3.49a6.341 6.341 0 0 0-5.932 7.16 6.343 6.343 0 0 0 6.678 5.618 6.341 6.341 0 0 0 5.864-4.048V8.685a8.212 8.212 0 0 0 4.256 1.18V6.435a4.814 4.814 0 0 1-1.602.251z"/>
    </svg>
  ),
  WhatsApp: ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  )
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
  
  :root {
    --bg-base: #050505;
    --bg-card: #0a0a0a;
    --text-primary: #f5f5f5;
    --text-secondary: #a1a1aa;
    --accent-gold: #D4AF37;
  }

  body, html {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-base);
    color: var(--text-primary);
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  h1, h2, h3, .font-serif {
    font-family: 'Playfair Display', serif;
  }

  /* Scrollbar Estético macOS Style */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #050505; }
  ::-webkit-scrollbar-thumb { background: #262626; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #404040; }

  .premium-input {
    background-color: #111;
    border: 1px solid rgba(255,255,255,0.08);
    color: #fff;
    transition: all 0.3s ease;
  }
  .premium-input:focus {
    outline: none;
    border-color: var(--accent-gold);
    background-color: #151515;
    box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.2);
  }
  .premium-input::placeholder { color: #555; }

  .btn-primary {
    background-color: #fff;
    color: #000;
    transition: all 0.3s ease;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    background-color: #f0f0f0;
    box-shadow: 0 4px 12px rgba(255,255,255,0.1);
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  .reveal-element {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-element.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes scrollLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - 12px)); }
  }

  .carousel-container {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    position: relative;
    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  }
  .carousel-track {
    display: inline-flex;
    gap: 24px;
    padding: 20px 0;
    animation: scrollLeft 35s linear infinite;
  }
  .carousel-track:hover { animation-play-state: paused; }
  .carousel-item {
    width: 300px;
    height: 420px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: #0a0a0a;
    border: 1px solid rgba(255,255,255,0.05);
    transition: transform 0.3s ease, border-color 0.3s ease;
    white-space: normal;
  }
  .carousel-item:hover {
    transform: scale(0.98);
    border-color: rgba(255,255,255,0.2);
  }
`;

const ScrollReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={domRef} className={`reveal-element ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

const ImageWithFallback: React.FC<{ src?: string; alt?: string; className?: string }> = ({ src = "", alt = "", className = "" }) => {
  if (!src || src === "") {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#0a0a0a] border border-white/5 ${className}`}>
         <Icons.Focus size={28} className="text-[#a1a1aa] opacity-40 mb-3" />
         <span className="text-[11px] font-serif uppercase tracking-widest text-[#a1a1aa] text-center px-4 leading-relaxed opacity-70">
           IMAGEN PENDIENTE<br/>DE CLIENTE
         </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logoUrl = "https://p16-common-sign.tiktokcdn.com/tos-maliva-avt-0068/36310458a4d57b32c711d55a017273dd~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=d009979b&x-expires=1791910800&x-signature=tAgSpITbitQ3fogqnku6CpRh6lA%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my";

  return (
    <nav className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <img src={logoUrl} alt="Artesano Logo" className="w-9 h-9 rounded-full object-cover border border-white/10 group-hover:border-[var(--accent-gold)] transition-colors" />
            <span className="font-serif text-xl tracking-wider text-white">ARTESANO</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#estudio" className="text-sm text-gray-400 hover:text-white transition-colors">Estudio</a>
            <a href="#artistas" className="text-sm text-gray-400 hover:text-white transition-colors">Artistas</a>
            <a href="#portafolio" className="text-sm text-gray-400 hover:text-white transition-colors">Portafolio</a>
            <a href="#reservas" className="btn-primary px-6 py-2.5 rounded-full text-sm font-medium">
              Agendar Cita
            </a>
          </div>
          
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#050505] border-b border-white/10 px-6 py-6 absolute w-full shadow-2xl">
          <div className="flex flex-col space-y-6">
            <a href="#estudio" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-serif">Estudio</a>
            <a href="#artistas" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-serif">Artistas</a>
            <a href="#portafolio" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-serif">Portafolio</a>
            <a href="#reservas" onClick={() => setIsOpen(false)} className="text-[var(--accent-gold)] text-lg font-serif">Agendar Cita</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const heroImgUrl = "https://i.pinimg.com/474x/b5/77/3b/b5773b23ce7e259c2f9d1e509fbbf131.jpg";
  
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#050505] z-0"></div>
      
      <div className="absolute inset-0 z-10 opacity-35">
        <img 
          src={heroImgUrl} 
          alt="Artesano Tattoo" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/70 to-[#050505]"></div>
      </div>
      
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6 pt-20">
        <h1 className="animate-fade-up text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-[1.1]">
          El arte, <br className="hidden md:block"/>
          <span className="italic text-gray-300">hecho a mano.</span>
        </h1>
        
        <p className="animate-fade-up text-lg md:text-xl text-[#a1a1aa] font-light max-w-2xl mx-auto mb-10 leading-relaxed" style={{ animationDelay: '200ms' }}>
          Proyectos personalizados adaptados a ti. Experiencia, criterio artístico y atención premium en Laureles, Medellín.
        </p>
        
        <div className="animate-fade-up flex flex-col sm:flex-row justify-center items-center gap-4" style={{ animationDelay: '400ms' }}>
          <a href="#reservas" className="btn-primary px-8 py-4 rounded-full text-[15px] font-medium flex items-center justify-center gap-2 w-full sm:w-auto">
            Valorar mi idea <Icons.ArrowRight size={16} />
          </a>
          <a href="#portafolio" className="px-8 py-4 rounded-full text-[15px] font-medium text-white border border-white/20 hover:border-white/50 transition-colors w-full sm:w-auto text-center">
            Ver trabajos
          </a>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const pros = [
    { icon: <Icons.Sparkles size={24} />, title: "Criterio Artístico", desc: "Diseñamos proyectos adaptados a tu anatomía y estilo para un resultado armónico." },
    { icon: <Icons.Star size={24} />, title: "Cobro por Proyecto", desc: "Transparencia total. Valoramos tu idea como un trabajo integral, no cobramos por hora." },
    { icon: <Icons.Aperture size={24} />, title: "Láser Picosegundo", desc: "Tecnología de última generación para borrado con máxima efectividad y cuidado." },
    { icon: <Icons.Droplet size={24} />, title: "Titanio Implante", desc: "Joyería de la más alta calidad internacional para la salud de tu perforación." },
    { icon: <Icons.ShieldCheck size={24} />, title: "Bioseguridad", desc: "Agujas americanas y protocolos de asepsia clínica estricta en todo momento." },
    { icon: <Icons.Focus size={24} />, title: "Experiencia Premium", desc: "Espacios limpios y confortables diseñados para tu tranquilidad y bienestar total." }
  ];

  return (
    <section className="py-24 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">El Criterio Artesano.</h2>
            <p className="text-[#a1a1aa] text-lg font-light max-w-2xl">
              Nuestros pilares para entregarte un resultado verdaderamente profesional y duradero.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pros.map((pro, i) => (
            <ScrollReveal key={i}>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-[var(--accent-gold)] transition-colors duration-300 group h-full flex flex-col">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white mb-6 group-hover:text-[var(--accent-gold)] transition-colors">
                  {pro.icon}
                </div>
                <h3 className="text-white font-serif text-xl mb-3">{pro.title}</h3>
                <p className="text-sm text-[#a1a1aa] font-light leading-relaxed">{pro.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const StudioInfo = () => {
  return (
    <section id="estudio" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">La experiencia<br/><span className="italic text-gray-400">Artesano.</span></h2>
              <p className="text-[#a1a1aa] text-lg leading-relaxed mb-8 font-light">
                No se trata solo de la máquina. Es el profesionalismo, la higiene, 
                la atención personalizada y la tranquilidad lo que define nuestro espacio. Un estudio en Medellín pensado para tu bienestar.
              </p>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 inline-flex flex-col gap-2">
                <div className="flex items-start gap-4">
                  <Icons.MapPin className="text-[var(--accent-gold)] mt-1" size={24} />
                  <div>
                    <p className="text-white font-medium mb-1">Ubicación Premium</p>
                    <p className="text-sm text-[#a1a1aa]">Calle 36 #81A-17, Simón Bolívar.<br/>Laureles, Medellín, Colombia.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div className="bg-[#0a0a0a] border border-white/5 p-2 rounded-2xl overflow-hidden aspect-[4/3]">
              <ImageWithFallback src="" alt="Interior del Estudio" className="w-full h-full object-cover rounded-xl" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const Artists = () => {
  const team = [
    { name: "Christian Marín", role: "Fundador & Tatuador", desc: "Especialista en Realismo Black & Grey y proyectos de gran formato.", ig: "christianmg.art" },
    { name: "Valentina Barbosa", role: "Cofundadora & Piercer", desc: "Piercings, titanio implante y Borrado Láser picosegundo.", ig: "everbeauty.col" },
    { name: "Jhonatan Florez", role: "Tatuador Senior", desc: "Especialista en Full Color, realismo a color y Fine Line.", ig: "jhonatanf_tattoo" },
    { name: "Osqui", role: "Director Gráfico", desc: "Encargado de la planificación visual y documentación.", ig: "osqui_tattoo" }
  ];

  return (
    <section id="artistas" className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Nuestro Equipo</h2>
            <p className="text-[#a1a1aa] text-lg font-light max-w-2xl">
              Profesionales dedicados a perfeccionar su oficio, aportando técnica y criterio.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((artist, idx) => (
            <ScrollReveal key={idx}>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 flex flex-col h-full group hover:border-white/20 transition-colors">
                <h3 className="text-xl font-serif text-white mb-1">{artist.name}</h3>
                <p className="text-xs text-[var(--accent-gold)] uppercase tracking-wider mb-4 font-medium">{artist.role}</p>
                <p className="text-[#a1a1aa] text-sm font-light leading-relaxed mb-8 flex-grow">
                  {artist.desc}
                </p>
                <a href={`https://www.instagram.com/${artist.ig}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-[var(--accent-gold)] transition-colors mt-auto w-max">
                  <Icons.Instagram size={16} /> @{artist.ig}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioCarousel = () => {
  const works = [
    { type: "Black & Grey", author: "@christianmg.art", isVideo: true, img: "" },
    { type: "Piercing Titanio", author: "@everbeauty.col", isVideo: false, img: "" },
    { type: "Full Color", author: "@jhonatanf_tattoo", isVideo: true, img: "" },
    { type: "Borrado Láser", author: "@everbeauty.col", isVideo: true, img: "" },
    { type: "Fine Line", author: "@jhonatanf_tattoo", isVideo: false, img: "" },
  ];

  const carouselItems = [...works, ...works, ...works];

  return (
    <section id="portafolio" className="py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <ScrollReveal>
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Trabajo Reciente</h2>
            <p className="text-[#a1a1aa] text-lg font-light">Explora nuestros estilos, procesos y reels.</p>
          </div>
        </ScrollReveal>
      </div>

      <div className="carousel-container">
        <div className="carousel-track">
          {carouselItems.map((work, idx) => (
            <div key={idx} className="carousel-item group bg-[#111]">
              <ImageWithFallback src={work.img} alt={work.type} className="w-full h-full object-cover z-1" />
              
              {work.isVideo && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 z-10">
                  <Icons.Video size={14} />
                </div>
              )}
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 z-10">
                <p className="text-white font-serif text-xl mb-1">{work.type}</p>
                <p className="text-sm text-gray-400 flex items-center gap-1.5 font-light">
                  <Icons.Instagram size={14} className="text-[var(--accent-gold)]" /> {work.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  const faqs = [
    { q: "¿Cuál es el valor mínimo de un tatuaje?", a: "Nuestro valor mínimo para tatuajes pequeños (minimalistas, una tinta, hasta 4x4cm) es de $200.000 COP. Proyectos mayores se cotizan valorando la idea, diseño y anatomía." },
    { q: "¿Cuánto tarda en sanar un piercing?", a: "Para evaluar un cambio de joyería inicial, tomamos como referencia 2 meses. Sin embargo, la cicatrización total varía en cada cuerpo y zona. Usamos titanio grado implante para asegurar el mejor proceso." },
    { q: "¿El borrado láser elimina 100% el tatuaje?", a: "Nuestra tecnología de picosegundo es altamente efectiva, especialmente con pigmentos negros. Sin embargo, el resultado depende de factores como la antigüedad, profundidad y tipo de piel. Valoramos tu caso antes de recomendar un paquete." },
    { q: "¿Realizan todo tipo de piercings?", a: "No. Por motivos anatómicos y de cicatrización, en Artesano NO realizamos perforaciones en la lengua, industriales, surface ni genitales. Nos enfocamos en las zonas más seguras y estéticas." }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Preguntas Frecuentes</h2>
            <p className="text-[#a1a1aa] text-lg font-light">Información transparente antes de iniciar tu proyecto.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <ScrollReveal key={idx}>
              <div 
                className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-colors hover:border-white/20"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <div className="p-6 flex justify-between items-center text-white">
                  <h3 className="font-serif text-lg">{faq.q}</h3>
                  <div className={`transform transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-[var(--accent-gold)]' : ''}`}>
                    <Icons.ChevronDown size={20} />
                  </div>
                </div>
                <div className={`px-6 text-[#a1a1aa] font-light text-sm overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.a}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [formData, setFormData] = useState({
    nombre: '', idea: '', zona: '', tamano: '', piercingType: '', laserAntiguedad: ''
  });
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const getWhatsAppLink = () => {
    const phone = "573176817316";
    let text = `Hola Artesano! Soy ${formData.nombre}. Me interesa agendar un servicio de *${service.toUpperCase()}*.\n\n`;
    if (service === 'tatuaje') text += `*Mi idea:* ${formData.idea}\n*Zona:* ${formData.zona}\n*Tamaño:* ${formData.tamano}`;
    else if (service === 'piercing') text += `*Tipo de perforación:* ${formData.piercingType}`;
    else if (service === 'laser') text += `*Zona/Tamaño:* ${formData.zona}\n*Antigüedad:* ${formData.laserAntiguedad}`;
    text += `\n\nQuedo atento para coordinar la cita. ¡Gracias!`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="reservas" className="py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Inicia tu Proyecto</h2>
            <p className="text-[#a1a1aa] text-lg font-light">Asesoría transparente. Cuéntanos qué buscas y te orientaremos.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <div className="flex gap-2 mb-10">
               {[1,2,3,4].map(num => (
                 <div key={num} className={`h-1 flex-1 rounded-full ${step >= num ? 'bg-[var(--accent-gold)]' : 'bg-white/10'} transition-colors duration-500`}></div>
               ))}
            </div>

            {step === 1 && (
              <div className="animate-fade-up">
                <h3 className="text-2xl font-serif text-white mb-8">¿Qué servicio estás buscando?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => { setService('tatuaje'); setStep(2); }} className="premium-input p-6 rounded-2xl text-left group">
                    <Icons.Sparkles size={24} className="mb-4 text-white group-hover:text-[var(--accent-gold)] transition-colors" />
                    <p className="font-serif text-white text-lg mb-1">Tatuaje</p>
                    <p className="text-sm text-[#a1a1aa] font-light">Diseño personalizado</p>
                  </button>
                  <button onClick={() => { setService('piercing'); setStep(2); }} className="premium-input p-6 rounded-2xl text-left group">
                    <Icons.Droplet size={24} className="mb-4 text-white group-hover:text-[var(--accent-gold)] transition-colors" />
                    <p className="font-serif text-white text-lg mb-1">Piercing</p>
                    <p className="text-sm text-[#a1a1aa] font-light">Titanio implante</p>
                  </button>
                  <button onClick={() => { setService('laser'); setStep(2); }} className="premium-input p-6 rounded-2xl text-left group">
                    <Icons.Aperture size={24} className="mb-4 text-white group-hover:text-[var(--accent-gold)] transition-colors" />
                    <p className="font-serif text-white text-lg mb-1">Borrado Láser</p>
                    <p className="text-sm text-[#a1a1aa] font-light">Tecnología Picosegundo</p>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={e => { e.preventDefault(); setStep(3); }} className="animate-fade-up space-y-6">
                <h3 className="text-2xl font-serif text-white mb-6">Detalles del proyecto</h3>
                <div>
                  <label className="block text-sm text-[#a1a1aa] mb-2">Tu nombre completo</label>
                  <input required type="text" value={formData.nombre} onChange={e=>setFormData({...formData, nombre: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder="Ej. Juan Pérez" />
                </div>

                {service === 'tatuaje' && (
                  <>
                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">Cuéntanos tu idea</label>
                      <textarea required rows={3} value={formData.idea} onChange={e=>setFormData({...formData, idea: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light resize-none scroll-smooth" placeholder="Quiero un diseño enfocado en..."></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Zona</label>
                        <input required type="text" value={formData.zona} onChange={e=>setFormData({...formData, zona: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder="Ej. Antebrazo" />
                      </div>
                      <div>
                        <label className="block text-sm text-[#a1a1aa] mb-2">Tamaño aprox.</label>
                        <input required type="text" value={formData.tamano} onChange={e=>setFormData({...formData, tamano: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder="Ej. 15cm" />
                      </div>
                    </div>
                  </>
                )}

                {service === 'piercing' && (
                  <div>
                    <label className="block text-sm text-[#a1a1aa] mb-2">¿Qué piercing deseas realizarte?</label>
                    <input required type="text" value={formData.piercingType} onChange={e=>setFormData({...formData, piercingType: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder="Ej. Nostril, Helix..." />
                    <p className="text-xs text-[var(--accent-gold)] mt-2">* No realizamos: lengua, industrial, surface ni genitales.</p>
                  </div>
                )}

                {service === 'laser' && (
                  <>
                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">Zona y tamaño aprox.</label>
                      <input required type="text" value={formData.zona} onChange={e=>setFormData({...formData, zona: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder="Ej. Brazo, 10x10cm" />
                    </div>
                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">Antigüedad del tatuaje</label>
                      <input required type="text" value={formData.laserAntiguedad} onChange={e=>setFormData({...formData, laserAntiguedad: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder="Ej. 2 años" />
                    </div>
                  </>
                )}

                <div className="pt-6 flex gap-3">
                  <button type="button" onClick={()=>setStep(1)} className="px-6 py-4 rounded-xl text-sm font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">Atrás</button>
                  <button type="submit" className="flex-1 btn-primary rounded-xl py-4 text-sm font-medium">Continuar</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="animate-fade-up">
                <h3 className="text-2xl font-serif text-white mb-2">Perfecto, {formData.nombre.split(' ')[0]}</h3>
                <p className="text-[#a1a1aa] text-sm font-light leading-relaxed mb-8">
                  Enviaremos esta info a WhatsApp para darte el valor oficial. Recuerda que para agendar se requiere abono.
                </p>
                
                <div className="bg-[#111] border border-white/10 rounded-xl p-5 mb-8">
                  <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                    <Icons.CheckCircle2 size={16} className="text-[var(--accent-gold)]"/> Políticas de Reserva
                  </h4>
                  <ul className="text-sm text-[#a1a1aa] space-y-2 font-light">
                    <li>• Piercings: Abono de $50.000 COP.</li>
                    <li>• Borrado Láser: 20% del valor del paquete.</li>
                    <li>• Tatuajes: Valor a acordar tras valoración.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="w-full btn-primary p-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:-translate-y-1 transition-transform">
                    <Icons.MessageCircle size={18} /> Enviar a WhatsApp
                  </a>
                  <button onClick={() => setStep(4)} className="w-full text-center text-sm text-[#a1a1aa] hover:text-white py-2 transition-colors font-light">
                    Ya acordé el precio, quiero abonar con Bold
                  </button>
                </div>
              </div>
            )}

            {step === 4 && !paymentSuccess && (
              <div className="animate-fade-up">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-serif text-white">Pago de Abono</h3>
                  <div className="bg-[#111] border border-[#E41F35] text-[#E41F35] text-xs font-bold px-3 py-1.5 rounded tracking-widest uppercase flex items-center gap-1 shadow-[0_0_10px_rgba(228,31,53,0.1)]">
                    Bold
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input type="number" defaultValue={service === 'piercing' ? 50000 : 0} className="w-full premium-input rounded-xl p-4 pl-8 text-white font-mono text-lg" placeholder="Monto (COP)" />
                  </div>
                  
                  <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-2 text-[#a1a1aa] mb-4 text-xs font-medium">
                      <Icons.CreditCard size={16} /> <span>Datos (Simulación segura)</span>
                    </div>
                    <input type="text" className="w-full premium-input rounded-lg p-3 text-sm mb-3 font-mono" placeholder="0000 0000 0000 0000" disabled />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" className="w-full premium-input rounded-lg p-3 text-sm font-mono" placeholder="MM/AA" disabled />
                      <input type="text" className="w-full premium-input rounded-lg p-3 text-sm font-mono" placeholder="CVC" disabled />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button onClick={() => setStep(3)} className="px-6 py-4 rounded-xl text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">Atrás</button>
                    <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setPaymentSuccess(true); }, 2000); }} className="flex-1 btn-primary rounded-xl p-4 text-sm font-medium flex items-center justify-center">
                      {loading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : "Pagar"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && paymentSuccess && (
              <div className="py-12 text-center animate-fade-up">
                <div className="w-20 h-20 bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icons.CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-serif text-white mb-3">¡Abono Exitoso!</h3>
                <p className="text-[#a1a1aa] text-sm mb-10 font-light">Tu pago ha sido procesado. Por favor, envía el comprobante al WhatsApp del estudio.</p>
                <button onClick={() => { setStep(1); setPaymentSuccess(false); window.open("https://wa.me/573176817316", "_blank"); }} className="btn-primary px-8 py-3 rounded-full text-sm font-medium">Ir a WhatsApp</button>
              </div>
            )}

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Footer = () => {
  const logoUrl = "https://p16-common-sign.tiktokcdn.com/tos-maliva-avt-0068/36310458a4d57b32c711d55a017273dd~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=d009979b&x-expires=1791910800&x-signature=tAgSpITbitQ3fogqnku6CpRh6lA%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my";
  
  return (
    <footer className="border-t border-white/5 pt-20 pb-10 bg-[#000]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoUrl} alt="Artesano Logo" className="w-8 h-8 rounded-full border border-white/10" />
              <span className="font-serif text-xl tracking-wider text-white">ARTESANO</span>
            </div>
            <p className="text-[#a1a1aa] text-sm max-w-sm leading-relaxed font-light mb-6">
              Arte, precisión y profesionalismo. Un estudio pensado para tu tranquilidad y un tatuaje para toda la vida.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Estudio</h4>
            <ul className="text-[#a1a1aa] text-sm space-y-3 font-light">
              <li>Calle 36 #81A-17, Simón Bolívar</li>
              <li>Laureles, Medellín, Colombia</li>
              <li className="pt-2 text-white font-medium">+57 317 6817316</li>
              <li className="pt-2">
                <a href="https://www.instagram.com/artesano.tattoostudio" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-gold)] flex items-center gap-2 transition-colors"><Icons.Instagram size={14}/> @artesano.tattoostudio</a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@artesano_tattoo_studio?_r=1&_t=ZS-9ATGXZr2Wcp" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-gold)] flex items-center gap-2 transition-colors"><Icons.TikTok size={14}/> @artesano_tattoo_studio</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-6">Artistas</h4>
            <ul className="text-[#a1a1aa] text-sm space-y-3 font-light">
              <li><a href="https://www.instagram.com/christianmg.art" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2 transition-colors"><Icons.Instagram size={14}/> @christianmg.art</a></li>
              <li><a href="https://www.instagram.com/everbeauty.col" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2 transition-colors"><Icons.Instagram size={14}/> @everbeauty.col</a></li>
              <li><a href="https://www.instagram.com/jhonatanf_tattoo" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2 transition-colors"><Icons.Instagram size={14}/> @jhonatanf_tattoo</a></li>
              <li><a href="https://www.instagram.com/osqui_tattoo" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2 transition-colors"><Icons.Instagram size={14}/> @osqui_tattoo</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-xs text-[#a1a1aa] font-light text-center">
          <p>© 2026 Artesano Tattoo Studio. Laureles, Medellín.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Navbar />
      <Hero />
      <Features />
      <StudioInfo />
      <Artists />
      <PortfolioCarousel />
      <FaqSection />
      <BookingFlow />
      <Footer />

      <a 
        href="https://wa.me/573176817316" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] z-50 hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <Icons.WhatsApp size={28} />
        <span className="absolute right-16 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ¿Tienes dudas? ¡Escríbenos!
        </span>
      </a>
    </>
  );
}