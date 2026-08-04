"use client";

import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek transparan berubah jadi liquid glass saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#top" },
    { name: "Portofolio", href: "#projects" },
    { name: "Pesan Rahasia", href: "#pesan" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0503]/60 backdrop-blur-xl border-b border-[#d99153]/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        
        {/* LOGO & BRAND */}
        <a
          href="#top"
          className="flex items-center gap-2 group relative z-50"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d99153]/80 to-[#8b4513]/80 border border-[#d99153]/50 flex items-center justify-center shadow-[0_0_15px_rgba(217,145,83,0.4)] group-hover:scale-110 transition-transform duration-300">
            <Terminal className="w-5 h-5 text-[#0a0503]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-[#fbe6d4] tracking-wider group-hover:text-[#d99153] transition-colors">
              RIFQI<span className="text-[#d99153]">.</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#a3836b] uppercase -mt-1">
              RPL System
            </span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8 bg-[#2d160b]/30 backdrop-blur-md px-8 py-2.5 rounded-full border border-[#d99153]/20 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-[#a3836b] hover:text-[#d99153] hover:drop-shadow-[0_0_10px_rgba(217,145,83,0.8)] transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* ADMIN BUTTON (DESKTOP) */}
        <div className="hidden md:flex">
          <a
            href="/admin"
            className="relative overflow-hidden group bg-transparent border border-[#d99153]/50 px-5 py-2 rounded-xl text-xs font-bold text-[#d99153] tracking-widest uppercase hover:bg-[#d99153]/10 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            Admin Panel
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 w-10 h-10 rounded-xl bg-[#2d160b]/50 border border-[#d99153]/30 backdrop-blur-md flex items-center justify-center text-[#d99153] hover:bg-[#d99153]/20 transition-all"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full h-screen bg-[#0a0503]/95 backdrop-blur-3xl border-b border-[#d99153]/30 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-black text-[#fbe6d4] hover:text-[#d99153] tracking-wide transition-colors"
          >
            {link.name}
          </a>
        ))}
        <div className="w-16 h-px bg-[#d99153]/30 my-4" />
        <a
          href="/admin"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 text-sm font-bold text-[#d99153] tracking-widest uppercase border border-[#d99153]/50 px-6 py-3 rounded-xl bg-[#d99153]/10"
        >
          <Terminal className="w-4 h-4" /> Admin Panel
        </a>
      </div>
    </nav>
  );
}