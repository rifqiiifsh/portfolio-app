"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProjectList from "@/components/ProjectList";
import AnonymousForm from "@/components/AnonymousForm";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowDownRight, Sparkles, Code2, PenTool, Database, MoveRight } from "lucide-react";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  // Splash Screen Logic
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-black font-sans selection:bg-yellow-300 overflow-x-hidden relative">
      
      {/* 1. SPLASH SCREEN (LIQUID GLASS 3D OPENER) */}
      <div className={`fixed inset-0 z-[100] bg-[#f3f0e8] flex flex-col items-center justify-center transition-all duration-1000 ${showSplash ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-full"}`} style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #d1d5db 31px, #d1d5db 32px)' }}>
        <div className="w-40 h-40 rounded-3xl border border-white/60 bg-white/20 backdrop-blur-2xl shadow-[8px_8px_0px_0px_#000,inset_0_0_30px_rgba(255,255,255,0.8)] flex items-center justify-center animate-[bounce_2s_infinite]">
          <span className="text-6xl font-black">R<span className="text-blue-500">.</span></span>
        </div>
        <h1 className="mt-8 text-2xl font-black uppercase tracking-[0.3em] bg-black text-white px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,0,1)]">
          INITIALIZING...
        </h1>
      </div>

      {/* BACKGROUND NOTEBOOK LINE */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #d1d5db 31px, #d1d5db 32px)' }} />

      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-5 pt-32 pb-24 space-y-40">
        
        {/* SECTION 1: HERO WITH 3D FLOATING ELEMENTS */}
        <section id="top" className="min-h-[80vh] flex flex-col items-center justify-center text-center relative perspective-[1200px]">
          {/* Floating Aesthetic Elements */}
          <div className="absolute top-10 left-0 lg:-left-10 px-4 py-2 bg-green-300 border-4 border-black font-bold uppercase shadow-[6px_6px_0px_0px_#000] rotate-[-12deg] animate-[spin_10s_linear_infinite]">
            <Sparkles className="inline w-5 h-5 mr-1" /> CREATE
          </div>
          <div className="absolute bottom-20 right-0 lg:-right-10 px-4 py-2 bg-pink-300 border-4 border-black font-bold uppercase shadow-[6px_6px_0px_0px_#000] rotate-[15deg] animate-[pulse_3s_infinite]">
            INNOVATE
          </div>

          <ScrollReveal>
            <div className="inline-block bg-white border-4 border-black px-4 py-1 font-mono font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] mb-6 rotate-2">
              MY NAME IS
            </div>
            <h1 className="text-7xl sm:text-[140px] font-black uppercase tracking-tighter leading-none mix-blend-multiply drop-shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
              RIFQI<span className="text-blue-500">.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-2xl sm:text-4xl font-bold mt-10 max-w-3xl mx-auto leading-relaxed bg-yellow-200 border-4 border-black p-4 shadow-[8px_8px_0px_0px_#000]">
              I design software that gets out of your way. ✦
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400} className="mt-12">
            <a href="#projects" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl border-2 border-white/60 bg-white/20 backdrop-blur-xl shadow-[6px_6px_0px_0px_#000,inset_0_0_20px_rgba(255,255,255,0.8)] font-black text-xl uppercase hover:bg-white/40 transition-all">
              SEE MY WORKS <ArrowDownRight className="w-8 h-8" />
            </a>
          </ScrollReveal>
        </section>

        {/* SECTION 2: JUST FOR FUN (COLLAGE GRID) */}
        <section className="perspective-[1000px]">
          <ScrollReveal>
            <h2 className="text-center text-4xl font-black uppercase mb-12">
              <span className="bg-black text-white px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,255,0,1)]">JUST FOR FUN</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80" className="w-full h-64 object-cover border-4 border-black shadow-[8px_8px_0px_0px_#000] rotate-[-4deg] hover:rotate-0 transition-transform" alt="Coding" />
              <img src="https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&q=80" className="w-full h-64 object-cover border-4 border-black shadow-[8px_8px_0px_0px_#000] rotate-[3deg] hover:rotate-0 transition-transform" alt="Setup" />
              <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&q=80" className="w-full h-64 object-cover border-4 border-black shadow-[8px_8px_0px_0px_#000] rotate-[-2deg] hover:rotate-0 transition-transform" alt="Design" />
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80" className="w-full h-64 object-cover border-4 border-black shadow-[8px_8px_0px_0px_#000] rotate-[5deg] hover:rotate-0 transition-transform" alt="Coffee" />
              
              {/* Floating Tape */}
              <div className="absolute -top-4 left-1/4 w-20 h-8 bg-white/60 backdrop-blur-sm border border-gray-300 rotate-12 shadow-sm z-10" />
              <div className="absolute -bottom-4 right-1/4 w-24 h-8 bg-red-200/60 backdrop-blur-sm border border-gray-300 rotate-[-10deg] shadow-sm z-10" />
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 3: ABOUT (SCRAPBOOK STYLE) */}
        <section id="about">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              
              {/* Polaroid Photo */}
              <div className="w-full lg:w-1/3 relative transform-style-3d hover:rotate-y-12 transition-transform duration-700">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 bg-yellow-200/80 backdrop-blur-md border border-yellow-400 rotate-[-5deg] z-20 shadow-sm" />
                <div className="bg-white p-5 border-4 border-black shadow-[12px_12px_0px_0px_#000] rotate-3 relative z-10">
                  <div className="aspect-[4/5] bg-gray-200 border-4 border-black overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay" />
                    <img src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=500&q=80" alt="Me" className="w-full h-full object-cover grayscale contrast-125" />
                  </div>
                  <h3 className="font-mono font-black text-2xl text-center mt-4">RIFQI</h3>
                  <p className="font-mono text-center text-sm">SMK RPL - 2026</p>
                </div>
              </div>

              {/* Text Information */}
              <div className="w-full lg:w-2/3 space-y-8">
                <div className="inline-block px-4 py-2 border-4 border-black bg-pink-300 shadow-[6px_6px_0px_0px_#000] rotate-[-2deg]">
                  <h2 className="text-4xl font-black uppercase">ABOUT ME</h2>
                </div>
                
                <div className="bg-yellow-100 p-8 border-4 border-black shadow-[10px_10px_0px_0px_#000] relative">
                  <p className="text-xl font-medium leading-relaxed font-mono">
                    I'm a student developer who gets a little too excited about making complicated things feel simple. I care about the small details, the edge cases everyone forgets, and shipping work that genuinely works flawlessly.
                  </p>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { text: "Interaction Design", color: "bg-blue-300", icon: PenTool },
                    { text: "Frontend Code", color: "bg-green-300", icon: Code2 },
                    { text: "Backend / Database", color: "bg-red-300", icon: Database },
                  ].map((skill, i) => (
                    <div key={i} className={`flex items-center gap-2 px-4 py-2 border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform ${skill.color}`}>
                      <skill.icon className="w-5 h-5" /> {skill.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 4: CASE STUDY / STATS (Like Reference Image) */}
        <section>
          <ScrollReveal>
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-50" />
              <h2 className="text-4xl font-black uppercase mb-8">The Results</h2>
              <p className="font-mono text-lg max-w-2xl mb-12">
                Every project I build is focused on performance and user engagement. Here are some dummy stats to show the layout from the reference design.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-blue-200 p-6 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                  <p className="text-6xl font-black mb-2">47%</p>
                  <p className="font-bold text-sm uppercase">Faster Load Time</p>
                </div>
                <div className="bg-yellow-200 p-6 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                  <p className="text-6xl font-black mb-2">-55%</p>
                  <p className="font-bold text-sm uppercase">Bounce Rate</p>
                </div>
                <div className="bg-green-200 p-6 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                  <p className="text-6xl font-black mb-2">10K+</p>
                  <p className="font-bold text-sm uppercase">Lines of Code</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 5: FEATURED WORKS */}
        <section id="projects">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16 border-b-8 border-black pb-4">
              <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tight">FEATURED WORKS</h2>
            </div>
            <ProjectList />
          </ScrollReveal>
        </section>

        {/* SECTION 6: CONTACT */}
        <section id="pesan" className="flex flex-col items-center pb-20">
          <ScrollReveal>
            <h2 className="text-6xl font-black uppercase mb-6 bg-yellow-300 px-6 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] rotate-2">
              LET'S TALK
            </h2>
            <p className="font-mono text-xl mb-16 text-center max-w-lg font-bold">
              Got a project, a weird problem, or just want to say hi? Send it over.
            </p>
            <div className="w-full max-w-3xl perspective-[1000px]">
              <AnonymousForm />
            </div>
          </ScrollReveal>
        </section>

      </div>
    </main>
  );
}