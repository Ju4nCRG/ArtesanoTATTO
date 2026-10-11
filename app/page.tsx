"use client";
import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// ==========================================
// ICONOS SVG NATIVOS (Seguros para Vercel)
// ==========================================
const Icons = {
  Menu: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>),
  X: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>),
  ArrowRight: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>),
  MapPin: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>),
  ShieldCheck: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 8-2 2 1 6 2 8 2a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>),
  CheckCircle2: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>),
  CreditCard: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>),
  Sparkles: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>),
  Droplet: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>),
  Focus: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"/><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>),
  Aperture: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m14.31 8 5.74 9.94"/><path d="M9.69 8h11.48"/><path d="m7.38 12 5.74-9.94"/><path d="M9.69 16 3.95 6.06"/><path d="M14.31 16H2.83"/><path d="m16.62 12-5.74 9.94"/></svg>),
  MessageCircle: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>),
  Video: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>),
  Star: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  ChevronDown: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>),
  Instagram: ({ size = 16, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>),
  TikTok: ({ size = 16, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.242V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002-.001a2.895 2.895 0 0 1 3.144-4.53v-3.49a6.341 6.341 0 0 0-5.932 7.16 6.343 6.343 0 0 0 6.678 5.618 6.341 6.341 0 0 0 5.864-4.048V8.685a8.212 8.212 0 0 0 4.256 1.18V6.435a4.814 4.814 0 0 1-1.602.251z"/></svg>),
  WhatsApp: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>),
  Volume: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>),
  VolumeX: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="1" x2="1" y2="23"/></svg>),
  Globe: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  Camera: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>),
  Image: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>),
  Sliders: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="21" y2="14"/><line x1="4" x2="20" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="17" x2="17" y1="21" y2="16"/><line x1="17" x2="17" y1="12" y2="3"/><line x1="7" x2="7" y1="21" y2="16"/><line x1="7" x2="7" y1="12" y2="3"/></svg>),
  DollarSign: ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>)
};

// ==========================================
// DICCIONARIO DE TRADUCCIONES (i18n)
// ==========================================
const translations = {
  es: {
    nav: { studio: "Estudio", artists: "Artistas", portfolio: "Portafolio", book: "Agendar Cita" },
    hero: {
      title1: "El arte, ",
      title2: "hecho a mano.",
      subtitle: "Proyectos personalizados adaptados a ti. Experiencia, criterio artístico y atención premium en Laureles, Medellín.",
      btn1: "Valorar mi idea",
      btn2: "Ver trabajos"
    },
    features: {
      title: "El Criterio Artesano.",
      subtitle: "Nuestros pilares para entregarte un resultado verdaderamente profesional y duradero.",
      items: [
        { title: "Criterio Artístico", desc: "Diseñamos proyectos adaptados a tu anatomía y estilo para un resultado armónico." },
        { title: "Cobro por Proyecto", desc: "Transparencia total. Valoramos tu idea como un trabajo integral, no cobramos por hora." },
        { title: "Láser Picosegundo", desc: "Tecnología de última generación para borrado con máxima efectividad y cuidado." },
        { title: "Titanio Implante", desc: "Joyería de la más alta calidad internacional para la salud de tu perforación." },
        { title: "Bioseguridad", desc: "Agujas americanas y protocolos de asepsia clínica estricta en todo momento." },
        { title: "Experiencia Premium", desc: "Espacios limpios y confortables diseñados para tu tranquilidad y bienestar total." }
      ]
    },
    studio: {
      title1: "La experiencia",
      title2: "Artesano.",
      desc: "No se trata solo de la máquina. Es el profesionalismo, la higiene, la atención personalizada y la tranquilidad lo que define nuestro espacio. Un estudio en Medellín pensado para tu bienestar.",
      locationTitle: "Ubicación Premium",
      locationDesc: "Calle 36 #81A-17, Simón Bolívar. Laureles, Medellín, Colombia.",
      laserTitle1: "El arte de la",
      laserTitle2: "Transformación.",
      laserDesc: "Contamos con tecnología láser Picosegundo de última generación. Efectiva en pigmentos negros, logrando aclarar tatuajes antiguos para darle una nueva oportunidad a tu piel.",
      laserL1: "Valoración previa sin costo.",
      laserL2: "Ideal para Cover Ups complejos.",
      laserL3: "Paquetes según tamaño.",
      laserLink: "Agendar Valoración Láser",
      before: "Antes",
      after: "Después"
    },
    artists: {
      title: "Nuestro Equipo",
      subtitle: "Profesionales dedicados a perfeccionar su oficio, aportando técnica y criterio.",
      team: [
        { name: "Christian Marín", role: "Fundador & Tatuador", desc: "Realismo Black & Grey y proyectos de gran formato.", ig: "christianmg.art" },
        { name: "Valentina Barbosa", role: "Cofundadora & Piercer", desc: "Piercings, titanio implante y Borrado Láser picosegundo.", ig: "everbeauty.col" },
        { name: "Jhonatan Florez", role: "Tatuador Senior", desc: "Full Color, realismo a color y Fine Line.", ig: "jhonatanf_tattoo" },
        { name: "Osqui", role: "Director Gráfico", desc: "Encargado de la planificación visual y documentación.", ig: "osqui_tattoo" }
      ]
    },
    portfolio: {
      title: "Trabajo Reciente",
      subtitle: "Explora nuestros estilos, procesos y reels.",
      items: [
        { type: "Black & Grey", author: "@christianmg.art" },
        { type: "Piercing Titanio", author: "@everbeauty.col" },
        { type: "Full Color", author: "@jhonatanf_tattoo" },
        { type: "Borrado Láser", author: "@everbeauty.col" },
        { type: "Fine Line", author: "@jhonatanf_tattoo" }
      ]
    },
    extra: {
      flashTitle: "Flash Tattoos",
      flashSub: "Diseños exclusivos listos para tatuar hoy. Citas express.",
      flashViewAll: "Ver todos",
      flashDesign: "Diseño Único",
      guideTitle: "Guía de Cuidados",
      guideTabs: ["Tatuajes", "Piercings", "Borrado Láser"],
      guideContent: [
        "Lava con jabón neutro 2 veces al día. Seca a toques. Aplica una capa muy fina de humectante cuando empiece la descamación. No rascar, no piscina, no sol directo por 15 días.",
        "Limpia 2 veces al día con solución salina estéril. No utilices alcohol ni agua oxigenada. No duermas sobre la perforación. Asiste a revisión a los 2 meses (Downsize).",
        "Aplica compresas frías las primeras 24 horas. Evita el sol por completo. Usa protector solar estricto. Mantén hidratado con Cicaplast Baume B5+. Es normal presentar enrojecimiento."
      ]
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Información transparente antes de iniciar tu proyecto.",
      items: [
        { q: "¿Cuál es el valor mínimo de un tatuaje?", a: "Nuestro valor mínimo para tatuajes pequeños es de $200.000 COP. Proyectos mayores se cotizan valorando la idea, diseño y anatomía." },
        { q: "¿Cuánto tarda en sanar un piercing?", a: "Tomamos como referencia 2 meses para evaluar un cambio de joyería. La cicatrización total varía en cada cuerpo. Usamos titanio grado implante." },
        { q: "¿El borrado láser elimina 100% el tatuaje?", a: "Es altamente efectiva, especialmente con negros. Sin embargo, el resultado depende de factores como la antigüedad y profundidad. Valoramos tu caso antes de iniciar." },
        { q: "¿Realizan todo tipo de piercings?", a: "No. Por motivos anatómicos y de bioseguridad, NO realizamos perforaciones en la lengua, industriales, surface ni genitales. Nos enfocamos en zonas seguras." }
      ]
    },
    booking: {
      title: "Inicia tu Proyecto",
      subtitle: "Asesoría transparente. Cotiza, visualiza en AR o reserva aquí.",
      step1Title: "¿Qué servicio estás buscando?",
      sTattoo: "Tatuaje", sTattooDesc: "Diseño personalizado",
      sPiercing: "Piercing", sPiercingDesc: "Titanio implante",
      sLaser: "Borrado Láser", sLaserDesc: "Tecnología Picosegundo",
      step2Title: "Detalles del proyecto",
      arBtn: "Visualizar en AR",
      lblName: "Tu nombre completo", phName: "Ej. Juan Pérez",
      lblIdea: "Cuéntanos tu idea", phIdea: "Quiero un diseño enfocado en...",
      lblZone: "Zona del cuerpo", phZone: "Ej. Antebrazo interno",
      lblSize: "Tamaño en centímetros",
      estInv: "Inversión Estimada:",
      estNote: "*Valor referencial. Proyectos reales se cotizan valorando la complejidad.",
      lblPiercing: "¿Qué piercing deseas realizarte?", phPiercing: "Ej. Nostril, Helix...",
      piercingNote: "* No realizamos: lengua, industrial, surface ni genitales.",
      lblLaserZone: "Zona y tamaño aprox.", phLaserZone: "Ej. Brazo, 10x10cm",
      lblLaserAge: "Antigüedad del tatuaje", phLaserAge: "Ej. 2 años",
      btnBack: "Atrás", btnNext: "Continuar",
      step3Title: "Perfecto",
      step3Desc: "Enviaremos esta info a WhatsApp para darte el valor oficial. Recuerda que para agendar se requiere abono.",
      policyTitle: "Políticas de Reserva",
      policy1: "• Piercings: Abono de $50.000 COP.",
      policy2: "• Borrado Láser: 20% del valor del paquete.",
      policy3: "• Tatuajes: Valor a acordar tras valoración.",
      btnWhatsapp: "Enviar a WhatsApp",
      btnPay: "Ya acordé el precio, quiero abonar con Bold",
      step4Title: "Pago de Abono",
      payData: "Datos (Simulación segura)",
      btnPaySubmit: "Pagar",
      successTitle: "¡Abono Exitoso!",
      successDesc: "Tu pago ha sido procesado. Por favor, envía el comprobante al WhatsApp del estudio.",
      btnSuccess: "Ir a WhatsApp"
    },
    footer: {
      desc: "Arte, precisión y profesionalismo. Un estudio pensado para tu tranquilidad y un tatuaje para toda la vida.",
      studio: "Estudio",
      artists: "Artistas"
    },
    ar: {
      title: "Visualizador AR",
      upload: "Sube una foto de tu piel (ej. antebrazo) para simular la proporción del tatuaje.",
      drag: "Arrastrar esq.",
      changeBtn: "Cambiar foto"
    },
    general: {
      pending: "IMAGEN PENDIENTE\nDE CLIENTE"
    }
  },
  en: {
    nav: { studio: "Studio", artists: "Artists", portfolio: "Portfolio", book: "Book Now" },
    hero: {
      title1: "Art, ",
      title2: "crafted by hand.",
      subtitle: "Custom projects tailored to you. Experience, artistic criteria, and premium care in Laureles, Medellin.",
      btn1: "Quote my idea",
      btn2: "View portfolio"
    },
    features: {
      title: "The Artesano Criteria.",
      subtitle: "Our pillars to deliver a truly professional and lasting result.",
      items: [
        { title: "Artistic Criteria", desc: "We design projects adapted to your anatomy and style for a harmonious result." },
        { title: "Per-Project Pricing", desc: "Total transparency. We value your idea as a complete project, we don't charge hourly." },
        { title: "Picosecond Laser", desc: "Next-generation technology for tattoo removal with maximum effectiveness and care." },
        { title: "Implant Titanium", desc: "Highest international quality jewelry for the health of your piercing." },
        { title: "Biosecurity", desc: "American needles and strict clinical asepsis protocols at all times." },
        { title: "Premium Experience", desc: "Clean and comfortable spaces designed for your total peace of mind and well-being." }
      ]
    },
    studio: {
      title1: "The Artesano",
      title2: "Experience.",
      desc: "It's not just about the machine. It's the professionalism, hygiene, personalized attention, and peace of mind that define our space. A studio in Medellin designed for your well-being.",
      locationTitle: "Premium Location",
      locationDesc: "36th Street #81A-17, Simon Bolivar. Laureles, Medellin, Colombia.",
      laserTitle1: "The art of",
      laserTitle2: "Transformation.",
      laserDesc: "We have state-of-sart Picosecond laser technology. Highly effective on black pigments, managing to lighten old tattoos to give your skin a new chance.",
      laserL1: "Free prior assessment.",
      laserL2: "Ideal for complex Cover Ups.",
      laserL3: "Packages according to size.",
      laserLink: "Schedule Laser Assessment",
      before: "Before",
      after: "After"
    },
    artists: {
      title: "Our Team",
      subtitle: "Professionals dedicated to perfecting their craft, providing technique and criteria.",
      team: [
        { name: "Christian Marín", role: "Founder & Tattoo Artist", desc: "Black & Grey realism and large format projects.", ig: "christianmg.art" },
        { name: "Valentina Barbosa", role: "Co-founder & Piercer", desc: "Piercings, implant titanium and Picosecond Laser Removal.", ig: "everbeauty.col" },
        { name: "Jhonatan Florez", role: "Senior Tattoo Artist", desc: "Full Color, color realism and Fine Line.", ig: "jhonatanf_tattoo" },
        { name: "Osqui", role: "Art Director", desc: "In charge of visual planning and documentation.", ig: "osqui_tattoo" }
      ]
    },
    portfolio: {
      title: "Recent Work",
      subtitle: "Explore our styles, processes, and reels.",
      items: [
        { type: "Black & Grey", author: "@christianmg.art" },
        { type: "Titanium Piercing", author: "@everbeauty.col" },
        { type: "Full Color", author: "@jhonatanf_tattoo" },
        { type: "Laser Removal", author: "@everbeauty.col" },
        { type: "Fine Line", author: "@jhonatanf_tattoo" }
      ]
    },
    extra: {
      flashTitle: "Flash Tattoos",
      flashSub: "Exclusive designs ready to tattoo today. Express appointments.",
      flashViewAll: "View all",
      flashDesign: "Unique Design",
      guideTitle: "Aftercare Guide",
      guideTabs: ["Tattoos", "Piercings", "Laser Removal"],
      guideContent: [
        "Wash with neutral soap twice a day. Pat dry. Apply a very thin layer of moisturizer when peeling begins. No scratching, no pools, no direct sun for 15 days.",
        "Clean twice a day with sterile saline solution. Do not use alcohol or hydrogen peroxide. Do not sleep on the piercing. Attend a check-up at 2 months (Downsize).",
        "Apply cold compresses for the first 24 hours. Avoid the sun completely. Use strict sunscreen. Keep hydrated with Cicaplast Baume B5+. Redness is normal."
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Transparent information before starting your project.",
      items: [
        { q: "What is the minimum value for a tattoo?", a: "Our minimum value for small tattoos is $200,000 COP. Larger projects are quoted by assessing the idea, design, and anatomy." },
        { q: "How long does a piercing take to heal?", a: "We take 2 months as a reference to evaluate an initial jewelry change. Total healing varies in each body. We use implant-grade titanium." },
        { q: "Does laser removal eliminate 100% of the tattoo?", a: "It is highly effective, especially with blacks. However, the final result depends on factors like age and depth. We professionally assess your case before starting." },
        { q: "Do you do all types of piercings?", a: "No. For anatomical and biosecurity reasons, we DO NOT perform tongue, industrial, surface, or genital piercings. We focus on the safest areas." }
      ]
    },
    booking: {
      title: "Start Your Project",
      subtitle: "Transparent advice. Quote, visualize in AR or book here.",
      step1Title: "What service are you looking for?",
      sTattoo: "Tattoo", sTattooDesc: "Custom design",
      sPiercing: "Piercing", sPiercingDesc: "Implant titanium",
      sLaser: "Laser Removal", sLaserDesc: "Picosecond technology",
      step2Title: "Project details",
      arBtn: "View in AR",
      lblName: "Your full name", phName: "E.g. John Doe",
      lblIdea: "Tell us your idea", phIdea: "I want a design focused on...",
      lblZone: "Body zone", phZone: "E.g. Inner forearm",
      lblSize: "Size in centimeters",
      estInv: "Estimated Investment:",
      estNote: "*Reference value. Real projects are quoted assessing complexity.",
      lblPiercing: "What piercing do you want?", phPiercing: "E.g. Nostril, Helix...",
      piercingNote: "* We do not do: tongue, industrial, surface or genitals.",
      lblLaserZone: "Zone and approx size.", phLaserZone: "E.g. Arm, 10x10cm",
      lblLaserAge: "Age of the tattoo", phLaserAge: "E.g. 2 years",
      btnBack: "Back", btnNext: "Continue",
      step3Title: "Perfect",
      step3Desc: "We will send this info to WhatsApp to give you the official value. Remember that a deposit is required to book.",
      policyTitle: "Booking Policies",
      policy1: "• Piercings: Deposit of $50,000 COP.",
      policy2: "• Laser Removal: 20% of the package value.",
      policy3: "• Tattoos: Value to be agreed upon after assessment.",
      btnWhatsapp: "Send to WhatsApp",
      btnPay: "I already agreed on the price, I want to pay with Bold",
      step4Title: "Deposit Payment",
      payData: "Data (Secure simulation)",
      btnPaySubmit: "Pay",
      successTitle: "Successful Deposit!",
      successDesc: "Your payment has been processed. Please send the receipt to the studio's WhatsApp.",
      btnSuccess: "Go to WhatsApp"
    },
    footer: {
      desc: "Art, precision and professionalism. A studio designed for your peace of mind and a tattoo for a lifetime.",
      studio: "Studio",
      artists: "Artists"
    },
    ar: {
      title: "AR Visualizer",
      upload: "Upload a photo of your skin (e.g. forearm) to simulate the proportion.",
      drag: "Drag corner",
      changeBtn: "Change photo"
    },
    general: {
      pending: "IMAGE PENDING\nFROM CLIENT"
    }
  }
};

// ==========================================
// CONTEXTO GLOBAL (Idioma, Moneda, TRM)
// ==========================================
const AppContext = createContext<any>(null);

// ==========================================
// ESTILOS GLOBALES PREMIUM
// ==========================================
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

  /* Scrollbars Ultra Premium (macOS Style) */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg-base); }
  ::-webkit-scrollbar-thumb { background: #262626; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #404040; }

  /* Elementos de Input Customizados */
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
  .premium-input::placeholder { color: #444; }

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
    background-color: #111;
    border: 1px solid rgba(255,255,255,0.05);
    transition: transform 0.3s ease, border-color 0.3s ease;
    white-space: normal;
  }
  .carousel-item:hover {
    transform: scale(0.98);
    border-color: rgba(255,255,255,0.2);
  }

  /* Slider Antes/Despues */
  .clip-slider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    border-right: 2px solid var(--accent-gold);
  }
  .range-slider {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
  }
  .range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--accent-gold);
    border-radius: 50%;
    cursor: ew-resize;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }

  /* Modo Inmersivo (Vignette) */
  .immersive-vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 40;
    box-shadow: inset 0 0 250px rgba(0,0,0,0.98);
    transition: box-shadow 1s ease;
  }
  
  /* Animación AR Scancode */
  @keyframes scanline {
    0% { transform: translateY(0); }
    100% { transform: translateY(100%); }
  }
  .ar-scanline {
    position: absolute;
    width: 100%;
    height: 2px;
    background: rgba(212, 175, 55, 0.5);
    box-shadow: 0 0 10px var(--accent-gold);
    animation: scanline 2s linear infinite;
  }
`;

// ==========================================
// COMPONENTES CORE & UI
// ==========================================

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
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].general;

  if (!src || src === "") {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#0a0a0a] border border-white/5 ${className} w-full h-full`}>
         <Icons.Focus size={28} className="text-[#a1a1aa] opacity-40 mb-3" />
         <span className="text-[11px] font-serif uppercase tracking-widest text-[#a1a1aa] text-center px-4 leading-relaxed opacity-70 whitespace-pre-line">
           {t.pending}
         </span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

const BeforeAfterSlider = () => {
  const [sliderVal, setSliderVal] = useState(50);
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].studio;
  
  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#111] border border-white/10 group cursor-ew-resize">
      <ImageWithFallback src="" alt={t.after} className="absolute inset-0 object-cover w-full h-full" />
      <div className="clip-slider" style={{ width: `${sliderVal}%` }}>
        <ImageWithFallback src="" alt={t.before} className="absolute inset-0 object-cover w-full h-full" />
        <span className="absolute top-4 left-4 bg-black/60 backdrop-blur text-[10px] text-white px-2 py-1 rounded uppercase tracking-widest border border-white/10">{t.before}</span>
      </div>
      <span className="absolute top-4 right-4 bg-black/60 backdrop-blur text-[10px] text-white px-2 py-1 rounded uppercase tracking-widest border border-white/10">{t.after}</span>
      <input 
        type="range" min="0" max="100" value={sliderVal} 
        onChange={(e) => setSliderVal(Number(e.target.value))}
        className="range-slider absolute inset-0 w-full h-full z-20 opacity-0"
      />
      <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none z-10 transition-transform group-hover:scale-110" style={{ left: `calc(${sliderVal}% - 16px)` }}>
        <Icons.Sliders size={16} className="text-black" />
      </div>
    </div>
  );
};

const ARSimulatorModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].ar;
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="text-white font-serif flex items-center gap-2"><Icons.Focus size={18} className="text-[var(--accent-gold)]"/> {t.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><Icons.X size={20}/></button>
        </div>
        <div className="p-6">
          {!bgImage ? (
             <div className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center bg-[#111] hover:border-[var(--accent-gold)] transition-colors cursor-pointer group relative">
               <Icons.Camera size={32} className="text-gray-500 mb-3 group-hover:text-[var(--accent-gold)] transition-colors"/>
               <p className="text-sm text-gray-400 font-light text-center px-8">{t.upload}</p>
               <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => {
                 if(e.target.files && e.target.files[0]) setBgImage(URL.createObjectURL(e.target.files[0]))
               }} />
             </div>
          ) : (
             <div className="w-full aspect-[3/4] relative rounded-2xl overflow-hidden bg-black group">
                <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt="Background" />
                <div className="ar-scanline hidden group-hover:block"></div>
                <div className="absolute top-1/4 left-1/4 p-2 border border-white/30 bg-black/20 backdrop-blur-sm border-dashed resize overflow-auto w-32 h-32 flex flex-col items-center justify-center touch-none">
                  <Icons.Star size={40} className="text-black opacity-80" />
                  <span className="absolute bottom-1 right-1 text-[8px] text-white bg-black/50 px-1 rounded">{t.drag}</span>
                </div>
                <button onClick={()=>setBgImage(null)} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full border border-white/20 backdrop-blur">{t.changeBtn}</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};


// ==========================================
// SECCIONES DE LA LANDING PAGE
// ==========================================

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, currency, setCurrency, immersive, setImmersive } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].nav;
  
  const logoUrl = "https://p16-common-sign.tiktokcdn.com/tos-maliva-avt-0068/36310458a4d57b32c711d55a017273dd~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=d009979b&x-expires=1791910800&x-signature=tAgSpITbitQ3fogqnku6CpRh6lA%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my";

  return (
    <nav className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <img src={logoUrl} alt="Artesano Logo" className="w-10 h-10 rounded-full object-cover border border-white/10 group-hover:border-[var(--accent-gold)] transition-colors" />
            <span className="font-serif text-xl tracking-wider text-white">ARTESANO</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#estudio" className="text-sm text-gray-400 hover:text-white transition-colors">{t.studio}</a>
            <a href="#artistas" className="text-sm text-gray-400 hover:text-white transition-colors">{t.artists}</a>
            <a href="#portafolio" className="text-sm text-gray-400 hover:text-white transition-colors">{t.portfolio}</a>
            
            {/* Toggles Globales */}
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              {/* Idioma */}
              <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-gray-400 hover:text-white flex items-center gap-1 text-xs uppercase tracking-widest transition-colors">
                <Icons.Globe size={14}/> {lang}
              </button>
              {/* Moneda */}
              <button onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')} className="text-gray-400 hover:text-white flex items-center gap-1 text-xs uppercase tracking-widest transition-colors">
                <Icons.DollarSign size={14}/> {currency}
              </button>
              {/* ASMR / Audio */}
              <button onClick={() => setImmersive(!immersive)} className={`${immersive?'text-[var(--accent-gold)]':'text-gray-400'} hover:text-white transition-colors`} title="Modo Inmersivo (Audio)">
                {immersive ? <Icons.Volume size={18}/> : <Icons.VolumeX size={18}/>}
              </button>
              
              <a href="#reservas" className="btn-primary px-6 py-2.5 rounded-full text-sm font-medium ml-2">
                {t.book}
              </a>
            </div>
          </div>
          
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#050505] border-b border-white/10 px-6 py-6 absolute w-full shadow-2xl">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="text-white flex items-center gap-2 text-sm uppercase"><Icons.Globe size={16}/> {lang === 'es' ? 'English' : 'Español'}</button>
              <button onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')} className="text-white flex items-center gap-2 text-sm uppercase"><Icons.DollarSign size={16}/> {currency === 'COP' ? 'USD' : 'COP'}</button>
              <button onClick={() => setImmersive(!immersive)} className={`${immersive?'text-[var(--accent-gold)]':'text-white'} flex items-center gap-2 text-sm`}><Icons.Volume size={16}/> ASMR</button>
            </div>
            <a href="#estudio" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-serif">{t.studio}</a>
            <a href="#artistas" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-serif">{t.artists}</a>
            <a href="#portafolio" onClick={() => setIsOpen(false)} className="text-gray-300 text-lg font-serif">{t.portfolio}</a>
            <a href="#reservas" onClick={() => setIsOpen(false)} className="text-[var(--accent-gold)] text-lg font-serif">{t.book}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].hero;
  const heroImgUrl = "https://i.pinimg.com/474x/b5/77/3b/b5773b23ce7e259c2f9d1e509fbbf131.jpg";
  
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#050505] z-0"></div>
      
      <div className="absolute inset-0 z-10 opacity-30">
        <img src={heroImgUrl} alt="Artesano Tattoo" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/70 to-[#050505]"></div>
      </div>
      
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6 pt-20">
        <h1 className="animate-fade-up text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-[1.1]">
          {t.title1}<br className="hidden md:block"/><span className="italic text-[#a1a1aa] font-light">{t.title2}</span>
        </h1>
        
        <p className="animate-fade-up text-lg md:text-xl text-[#a1a1aa] font-light max-w-2xl mx-auto mb-10 leading-relaxed" style={{ animationDelay: '200ms' }}>
          {t.subtitle}
        </p>
        
        <div className="animate-fade-up flex flex-col sm:flex-row justify-center items-center gap-4" style={{ animationDelay: '400ms' }}>
          <a href="#reservas" className="btn-primary px-8 py-4 rounded-full text-[15px] font-medium flex items-center justify-center gap-2 w-full sm:w-auto">
            {t.btn1} <Icons.ArrowRight size={16} />
          </a>
          <a href="#portafolio" className="px-8 py-4 rounded-full text-[15px] font-medium text-white border border-white/20 hover:border-white/50 transition-colors w-full sm:w-auto text-center">
            {t.btn2}
          </a>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].features;

  const pros = [
    { icon: <Icons.Sparkles size={24} />, title: t.items[0].title, desc: t.items[0].desc },
    { icon: <Icons.Star size={24} />, title: t.items[1].title, desc: t.items[1].desc },
    { icon: <Icons.Aperture size={24} />, title: t.items[2].title, desc: t.items[2].desc },
    { icon: <Icons.Droplet size={24} />, title: t.items[3].title, desc: t.items[3].desc },
    { icon: <Icons.ShieldCheck size={24} />, title: t.items[4].title, desc: t.items[4].desc },
    { icon: <Icons.Focus size={24} />, title: t.items[5].title, desc: t.items[5].desc }
  ];

  return (
    <section className="py-24 relative z-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">{t.title}</h2>
            <p className="text-[#a1a1aa] text-lg font-light max-w-2xl">{t.subtitle}</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pros.map((pro, i) => (
            <ScrollReveal key={i}>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:border-[var(--accent-gold)] transition-colors duration-300 group h-full flex flex-col">
                <div className="w-12 h-12 bg-[#111] rounded-full flex items-center justify-center text-white mb-6 group-hover:text-[var(--accent-gold)] transition-colors">
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
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].studio;

  return (
    <section id="estudio" className="py-24 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <ScrollReveal>
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">{t.title1}<br/><span className="italic text-gray-400">{t.title2}</span></h2>
              <p className="text-[#a1a1aa] text-lg leading-relaxed mb-8 font-light">{t.desc}</p>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 inline-flex flex-col gap-2 hover:border-[var(--accent-gold)] transition-colors">
                <div className="flex items-start gap-4">
                  <Icons.MapPin className="text-[var(--accent-gold)] mt-1" size={24} />
                  <div>
                    <p className="text-white font-medium mb-1">{t.locationTitle}</p>
                    <p className="text-sm text-[#a1a1aa]">{t.locationDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-[#0a0a0a] border border-white/5 p-2 rounded-2xl overflow-hidden aspect-[4/3]">
              <ImageWithFallback src="" alt="Interior Estudio" className="w-full h-full object-cover rounded-xl" />
            </div>
          </ScrollReveal>
        </div>

        {/* Sección Transformación (Láser y Cover Ups) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="order-2 lg:order-1">
              <BeforeAfterSlider />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">{t.laserTitle1}<br/><span className="italic text-[var(--accent-gold)]">{t.laserTitle2}</span></h2>
              <p className="text-[#a1a1aa] text-lg leading-relaxed mb-6 font-light">{t.laserDesc}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[#a1a1aa] text-sm"><Icons.CheckCircle2 size={16} className="text-[var(--accent-gold)]"/> {t.laserL1}</li>
                <li className="flex items-center gap-3 text-[#a1a1aa] text-sm"><Icons.CheckCircle2 size={16} className="text-[var(--accent-gold)]"/> {t.laserL2}</li>
                <li className="flex items-center gap-3 text-[#a1a1aa] text-sm"><Icons.CheckCircle2 size={16} className="text-[var(--accent-gold)]"/> {t.laserL3}</li>
              </ul>
              <a href="#reservas" className="text-white uppercase tracking-widest text-xs font-semibold border-b border-[var(--accent-gold)] pb-1 hover:text-[var(--accent-gold)] transition-colors">{t.laserLink}</a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const Artists = () => {
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].artists;

  return (
    <section id="artistas" className="py-24 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">{t.title}</h2>
            <p className="text-[#a1a1aa] text-lg font-light max-w-2xl">{t.subtitle}</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.team.map((artist: any, idx: number) => (
            <ScrollReveal key={idx}>
              <div className="bg-[#111] border border-white/5 rounded-2xl p-8 flex flex-col h-full group hover:border-white/20 transition-colors">
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-white/10 mb-4 flex items-center justify-center overflow-hidden">
                  <Icons.Image size={24} className="text-[#444]"/>
                </div>
                <h3 className="text-xl font-serif text-white mb-1">{artist.name}</h3>
                <p className="text-xs text-[var(--accent-gold)] uppercase tracking-wider mb-4 font-medium">{artist.role}</p>
                <p className="text-[#a1a1aa] text-sm font-light leading-relaxed mb-8 flex-grow">{artist.desc}</p>
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
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].portfolio;

  const works = [
    { type: t.items[0].type, author: t.items[0].author, isVideo: true, img: "" },
    { type: t.items[1].type, author: t.items[1].author, isVideo: false, img: "" },
    { type: t.items[2].type, author: t.items[2].author, isVideo: true, img: "" },
    { type: t.items[3].type, author: t.items[3].author, isVideo: true, img: "" },
    { type: t.items[4].type, author: t.items[4].author, isVideo: false, img: "" },
  ];
  const carouselItems = [...works, ...works, ...works];

  return (
    <section id="portafolio" className="py-24 border-t border-white/5 overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <ScrollReveal>
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">{t.title}</h2>
            <p className="text-[#a1a1aa] text-lg font-light">{t.subtitle}</p>
          </div>
        </ScrollReveal>
      </div>

      <div className="carousel-container">
        <div className="carousel-track">
          {carouselItems.map((work, idx) => (
            <div key={idx} className="carousel-item group relative">
              <ImageWithFallback src={work.img} alt={work.type} className="w-full h-full object-cover" />
              {work.isVideo && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 z-10 transition-transform group-hover:scale-110">
                  <Icons.Video size={14} />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 z-10 pointer-events-none">
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

const ExtraSections = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { lang, formatPrice } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].extra;

  return (
    <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Flash Tattoos */}
        <div className="mb-32">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{t.flashTitle}</h2>
                <p className="text-[#a1a1aa] text-lg font-light">{t.flashSub}</p>
              </div>
              <a href="#reservas" className="hidden md:block text-[var(--accent-gold)] text-sm font-medium border-b border-[var(--accent-gold)] pb-1">{t.flashViewAll}</a>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[1,2,3,4].map(num=>(
               <ScrollReveal key={num}>
                 <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden group">
                   <div className="aspect-square bg-[#050505] relative p-4 flex items-center justify-center">
                     <Icons.Image size={32} className="text-[#333]"/>
                     <span className="absolute top-2 right-2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded">Flash {num}</span>
                   </div>
                   <div className="p-4 flex justify-between items-center border-t border-white/5">
                     <div><p className="text-white text-sm font-medium">{t.flashDesign}</p><p className="text-[#a1a1aa] text-xs">{formatPrice(350000)}</p></div>
                     <a href="#reservas" className="text-[var(--accent-gold)] hover:text-white transition-colors"><Icons.ArrowRight size={18}/></a>
                   </div>
                 </div>
               </ScrollReveal>
             ))}
          </div>
        </div>

        {/* Guía de Cuidados */}
        <ScrollReveal>
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Icons.ShieldCheck size={200}/></div>
             <h2 className="text-3xl font-serif text-white mb-8 relative z-10">{t.guideTitle}</h2>
             <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
               {t.guideTabs.map((tab: string, idx: number) => (
                 <button key={idx} onClick={()=>setActiveTab(idx)} className={`pb-2 whitespace-nowrap transition-colors ${activeTab===idx?'text-[var(--accent-gold)] font-medium':'text-gray-500 hover:text-white'}`}>{tab}</button>
               ))}
             </div>
             <div className="min-h-[100px] relative z-10">
               <p className="text-[#a1a1aa] font-light leading-relaxed animate-fade-up" key={activeTab}>{t.guideContent[activeTab]}</p>
             </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].faq;

  return (
    <section className="py-24 border-t border-white/5 bg-[#050505]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">{t.title}</h2>
            <p className="text-[#a1a1aa] text-lg font-light">{t.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {t.items.map((faq: any, idx: number) => (
            <ScrollReveal key={idx}>
              <div 
                className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-colors hover:border-[var(--accent-gold)]"
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
    nombre: '', idea: '', zona: '', tamanoNum: 10, piercingType: '', laserAntiguedad: ''
  });
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showAR, setShowAR] = useState(false);

  const { lang, formatPrice } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].booking;

  const estimatedPrice = 200000 + (Math.max(0, formData.tamanoNum - 5) * 15000);

  const getWhatsAppLink = () => {
    const phone = "573176817316";
    let text = `Hola Artesano! Soy ${formData.nombre}. Me interesa agendar un servicio de *${service.toUpperCase()}*.\n\n`;
    if (service === 'tatuaje') text += `*Idea:* ${formData.idea}\n*Zona:* ${formData.zona}\n*Tamaño:* ${formData.tamanoNum}cm\n*(Vi estimado web)*`;
    else if (service === 'piercing') text += `*Tipo de perforación:* ${formData.piercingType}`;
    else if (service === 'laser') text += `*Zona:* ${formData.zona}\n*Antigüedad:* ${formData.laserAntiguedad}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="reservas" className="py-24 border-t border-white/5 bg-[#050505]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">{t.title}</h2>
            <p className="text-[#a1a1aa] text-lg font-light">{t.subtitle}</p>
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
                <h3 className="text-2xl font-serif text-white mb-8">{t.step1Title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => { setService('tatuaje'); setStep(2); }} className="premium-input p-6 rounded-2xl text-left group">
                    <Icons.Sparkles size={24} className="mb-4 text-white group-hover:text-[var(--accent-gold)] transition-colors" />
                    <p className="font-serif text-white text-lg mb-1">{t.sTattoo}</p>
                    <p className="text-sm text-[#a1a1aa] font-light">{t.sTattooDesc}</p>
                  </button>
                  <button onClick={() => { setService('piercing'); setStep(2); }} className="premium-input p-6 rounded-2xl text-left group">
                    <Icons.Droplet size={24} className="mb-4 text-white group-hover:text-[var(--accent-gold)] transition-colors" />
                    <p className="font-serif text-white text-lg mb-1">{t.sPiercing}</p>
                    <p className="text-sm text-[#a1a1aa] font-light">{t.sPiercingDesc}</p>
                  </button>
                  <button onClick={() => { setService('laser'); setStep(2); }} className="premium-input p-6 rounded-2xl text-left group">
                    <Icons.Aperture size={24} className="mb-4 text-white group-hover:text-[var(--accent-gold)] transition-colors" />
                    <p className="font-serif text-white text-lg mb-1">{t.sLaser}</p>
                    <p className="text-sm text-[#a1a1aa] font-light">{t.sLaserDesc}</p>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={e => { e.preventDefault(); setStep(3); }} className="animate-fade-up space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif text-white">{t.step2Title}</h3>
                  {service === 'tatuaje' && (
                    <button type="button" onClick={()=>setShowAR(true)} className="flex items-center gap-2 text-xs bg-white/10 text-white px-3 py-1.5 rounded-full hover:bg-[var(--accent-gold)] hover:text-black transition-colors">
                      <Icons.Focus size={14}/> {t.arBtn}
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-[#a1a1aa] mb-2">{t.lblName}</label>
                  <input required type="text" value={formData.nombre} onChange={e=>setFormData({...formData, nombre: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder={t.phName} />
                </div>

                {service === 'tatuaje' && (
                  <>
                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">{t.lblIdea}</label>
                      <textarea required rows={3} value={formData.idea} onChange={e=>setFormData({...formData, idea: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light resize-none scroll-smooth" placeholder={t.phIdea}></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">{t.lblZone}</label>
                      <input required type="text" value={formData.zona} onChange={e=>setFormData({...formData, zona: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder={t.phZone} />
                    </div>
                    <div className="bg-[#111] p-5 rounded-xl border border-white/5">
                      <label className="flex justify-between text-sm text-white mb-4"><span>{t.lblSize}</span> <span>{formData.tamanoNum} cm</span></label>
                      <input type="range" min="5" max="40" value={formData.tamanoNum} onChange={e=>setFormData({...formData, tamanoNum: Number(e.target.value)})} className="w-full accent-[var(--accent-gold)] cursor-ew-resize mb-4"/>
                      <div className="flex justify-between items-center border-t border-white/5 pt-3">
                        <span className="text-xs text-[#a1a1aa]">{t.estInv}</span>
                        <span className="text-lg font-serif text-[var(--accent-gold)]">{formatPrice(estimatedPrice)}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2">{t.estNote}</p>
                    </div>
                  </>
                )}

                {service === 'piercing' && (
                  <div>
                    <label className="block text-sm text-[#a1a1aa] mb-2">{t.lblPiercing}</label>
                    <input required type="text" value={formData.piercingType} onChange={e=>setFormData({...formData, piercingType: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder={t.phPiercing} />
                    <p className="text-xs text-[#E41F35] mt-2">{t.piercingNote}</p>
                  </div>
                )}

                {service === 'laser' && (
                  <>
                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">{t.lblLaserZone}</label>
                      <input required type="text" value={formData.zona} onChange={e=>setFormData({...formData, zona: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder={t.phLaserZone} />
                    </div>
                    <div>
                      <label className="block text-sm text-[#a1a1aa] mb-2">{t.lblLaserAge}</label>
                      <input required type="text" value={formData.laserAntiguedad} onChange={e=>setFormData({...formData, laserAntiguedad: e.target.value})} className="w-full premium-input rounded-xl p-4 text-sm font-light" placeholder={t.phLaserAge} />
                    </div>
                  </>
                )}

                <div className="pt-6 flex gap-3">
                  <button type="button" onClick={()=>setStep(1)} className="px-6 py-4 rounded-xl text-sm font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">{t.btnBack}</button>
                  <button type="submit" className="flex-1 btn-primary rounded-xl py-4 text-sm font-medium">{t.btnNext}</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="animate-fade-up">
                <h3 className="text-2xl font-serif text-white mb-2">{t.step3Title}, {formData.nombre.split(' ')[0]}</h3>
                <p className="text-[#a1a1aa] text-sm font-light leading-relaxed mb-8">{t.step3Desc}</p>
                
                <div className="bg-[#111] border border-white/10 rounded-xl p-5 mb-8">
                  <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                    <Icons.CheckCircle2 size={16} className="text-[var(--accent-gold)]"/> {t.policyTitle}
                  </h4>
                  <ul className="text-sm text-[#a1a1aa] space-y-2 font-light">
                    <li>{t.policy1}</li>
                    <li>{t.policy2}</li>
                    <li>{t.policy3}</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="w-full btn-primary p-4 rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:-translate-y-1 transition-transform">
                    <Icons.MessageCircle size={18} /> {t.btnWhatsapp}
                  </a>
                  <button onClick={() => setStep(4)} className="w-full text-center text-sm text-[#a1a1aa] hover:text-white py-2 transition-colors font-light">
                    {t.btnPay}
                  </button>
                </div>
              </div>
            )}

            {step === 4 && !paymentSuccess && (
              <div className="animate-fade-up">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-serif text-white">{t.step4Title}</h3>
                  <div className="bg-[#111] border border-[#E41F35] text-[#E41F35] text-xs font-bold px-3 py-1.5 rounded tracking-widest uppercase flex items-center gap-1 shadow-[0_0_10px_rgba(228,31,53,0.1)]">
                    Bold
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="bg-[#111] border border-white/10 rounded-xl p-5 text-center">
                    <p className="text-[#a1a1aa] text-xs uppercase tracking-widest mb-2">Abono {service}</p>
                    <p className="text-3xl font-serif text-white">{formatPrice(service === 'piercing' ? 50000 : 200000)}</p>
                  </div>
                  
                  <div className="bg-[#111] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center gap-2 text-[#a1a1aa] mb-4 text-xs font-medium">
                      <Icons.CreditCard size={16} /> <span>{t.payData}</span>
                    </div>
                    <input type="text" className="w-full premium-input rounded-lg p-3 text-sm mb-3 font-mono" placeholder="0000 0000 0000 0000" disabled />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" className="w-full premium-input rounded-lg p-3 text-sm font-mono" placeholder="MM/AA" disabled />
                      <input type="text" className="w-full premium-input rounded-lg p-3 text-sm font-mono" placeholder="CVC" disabled />
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button onClick={() => setStep(3)} className="px-6 py-4 rounded-xl text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">{t.btnBack}</button>
                    <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setPaymentSuccess(true); }, 2000); }} className="flex-1 btn-primary rounded-xl p-4 text-sm font-medium flex items-center justify-center">
                      {loading ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : t.btnPaySubmit}
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
                <h3 className="text-3xl font-serif text-white mb-3">{t.successTitle}</h3>
                <p className="text-[#a1a1aa] text-sm mb-10 font-light">{t.successDesc}</p>
                <button onClick={() => { setStep(1); setPaymentSuccess(false); window.open("https://wa.me/573176817316", "_blank"); }} className="btn-primary px-8 py-3 rounded-full text-sm font-medium">{t.btnSuccess}</button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* AR Modal */}
      <ARSimulatorModal isOpen={showAR} onClose={()=>setShowAR(false)} />
    </section>
  );
};

const Footer = () => {
  const { lang } = useContext(AppContext);
  const t = translations[lang as keyof typeof translations].footer;
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
            <p className="text-[#a1a1aa] text-sm max-w-sm leading-relaxed font-light mb-6">{t.desc}</p>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-6">{t.studio}</h4>
            <ul className="text-[#a1a1aa] text-sm space-y-3 font-light">
              <li>Calle 36 #81A-17, Simón Bolívar</li>
              <li>Laureles, Medellín, Colombia</li>
              <li className="pt-2 text-white font-medium">+57 317 6817316</li>
              <li className="pt-2"><a href="https://www.instagram.com/artesano.tattoostudio" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-gold)] flex items-center gap-2 transition-colors"><Icons.Instagram size={14}/> @artesano.tattoostudio</a></li>
              <li><a href="https://www.tiktok.com/@artesano_tattoo_studio?_r=1&_t=ZS-9ATGXZr2Wcp" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-gold)] flex items-center gap-2 transition-colors"><Icons.TikTok size={14}/> @artesano_tattoo_studio</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-serif text-lg mb-6">{t.artists}</h4>
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

// ==========================================
// APLICACIÓN PRINCIPAL (Root)
// ==========================================

export default function App() {
  const [lang, setLang] = useState('es');
  const [currency, setCurrency] = useState('COP');
  const [immersive, setImmersive] = useState(false);
  const [trm, setTrm] = useState(4000); // TRM base por defecto
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cargar TRM Actualizada desde API libre
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if(data && data.rates && data.rates.COP) setTrm(data.rates.COP);
      })
      .catch(() => console.log("Usando TRM de respaldo"));
  }, []);

  // Inicialización de Audio ASMR (Sonido de lluvia suave / estudio relajante)
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
    return () => { audioRef.current?.pause(); };
  }, []);

  useEffect(() => {
    if (immersive && audioRef.current) {
      audioRef.current.play().catch(() => console.log("El navegador bloqueó el autoplay."));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [immersive]);

  // Formateador dinámico de precios (COP / USD)
  const formatPrice = (copValue: number) => {
    if (currency === 'COP') {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(copValue);
    } else {
      const usdValue = copValue / trm;
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usdValue);
    }
  };

  return (
    <AppContext.Provider value={{ lang, setLang, currency, setCurrency, trm, formatPrice, immersive, setImmersive }}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {/* Capa Vignette Inmersiva */}
      {immersive && <div className="immersive-vignette pointer-events-none"></div>}
      
      <Navbar />
      <Hero />
      <Features />
      <StudioInfo />
      <Artists />
      <PortfolioCarousel />
      <ExtraSections />
      <FaqSection />
      <BookingFlow />
      <Footer />

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/573176817316" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] z-[60] hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <Icons.WhatsApp size={28} />
        <span className="absolute right-16 bg-black text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
          {lang === 'es' ? '¿Tienes dudas? ¡Escríbenos!' : 'Any questions? Chat with us!'}
        </span>
      </a>
    </AppContext.Provider>
  );
}
