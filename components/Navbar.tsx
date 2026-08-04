"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "#top" },
    { name: "ABOUT", href: "#about" },
    { name: "WORKS", href: "#projects" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-[#fafafa]/90 backdrop-blur-md border-b-4 border-black font-sans">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Aesthetic Mac Buttons */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-red-500 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
          <div className="w-5 h-5 rounded-full bg-yellow-400 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
          <div className="w-5 h-5 rounded-full bg-green-500 border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
        </div>

        {/* DESKTOP NAV (LIQUID GLASS BUTTONS) */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-5 py-2 rounded-xl border-2 border-white/50 bg-white/30 backdrop-blur-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1),inset_0_0_15px_rgba(255,255,255,0.5)] font-black uppercase tracking-widest text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1),inset_0_0_15px_rgba(255,255,255,0.8)] transition-all"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#pesan"
            className="ml-4 px-6 py-2.5 rounded-xl border-2 border-white/50 bg-blue-400/50 backdrop-blur-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1),inset_0_0_20px_rgba(255,255,255,0.6)] font-black uppercase tracking-widest text-black hover:bg-blue-400/70 transition-all"
          >
            CONTACT ME
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-xl border-2 border-white/50 bg-white/30 backdrop-blur-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}