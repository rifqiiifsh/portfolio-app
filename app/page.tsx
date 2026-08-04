"use client";

import AnonymousForm from "@/components/AnonymousForm";
import ProjectList from "@/components/ProjectList";
import Navbar from "@/components/Navbar"; // Pastikan Navbar lu udah di-update jadi glassmorphism juga
import ScrollReveal from "@/components/ScrollReveal";
import {
  Mail,
  Globe,
  Share2,
  Terminal,
  Code2,
  Palette,
  Smartphone,
  Sparkles,
  GraduationCap,
  Award,
  Database,
  Cpu,
  Layout,
} from "lucide-react";

const SKILLS = [
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Merancang antarmuka profesional bergaya modern (Glassmorphism, Retro 3D) dengan Figma.",
  },
  {
    icon: Code2,
    title: "Frontend Web Dev",
    desc: "Eksplorasi mendalam menggunakan Next.js, React, dan Tailwind CSS untuk performa tinggi.",
  },
  {
    icon: Database,
    title: "Backend & Database",
    desc: "Membangun sistem API dan manajemen database realtime menggunakan Supabase & PostgreSQL.",
  },
  {
    icon: Smartphone,
    title: "Responsive Architecture",
    desc: "Memastikan website tampil memukau dan proporsional dari layar HP hingga monitor Ultra-Wide.",
  },
  {
    icon: Cpu,
    title: "Logic & Algorithm",
    desc: "Pemahaman struktur data dan algoritma dasar standar industri perangkat lunak.",
  },
  {
    icon: Layout,
    title: "Version Control",
    desc: "Bekerja secara terstruktur menggunakan Git & GitHub untuk manajemen project.",
  },
];

const STATS = [
  { icon: Code2, value: "15+", label: "Project Praktikum" },
  { icon: Terminal, value: "5", label: "Bahasa Pemrograman" },
  { icon: Award, value: "3", label: "Sertifikat & Lomba" },
  { icon: GraduationCap, value: "XII", label: "Tingkat SMK RPL" },
];

function SocialIcons() {
  return (
    <div className="flex items-center gap-4">
      {[
        { icon: Globe, href: "https://github.com" },
        { icon: Share2, href: "https://linkedin.com" },
        { icon: Mail, href: "mailto:email@example.com" },
      ].map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="relative group w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-[#d99153]/30 shadow-[0_8px_32px_rgba(217,145,83,0.15)] hover:bg-[#d99153]/20 hover:border-[#d99153]/60 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <item.icon className="w-5 h-5 text-[#fbe6d4] group-hover:text-[#d99153] transition-colors" />
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main className="relative min-h-screen bg-[#0a0503] text-[#fbe6d4] overflow-x-hidden selection:bg-[#d99153] selection:text-[#0a0503]">
      
      {/* --- INLINE CSS UNTUK ANIMASI 3D & LIQUID GLASS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes grid-move {
          0% { transform: perspective(1000px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(1000px) rotateX(60deg) translateY(50px); }
        }
        @keyframes float-3d {
          0%, 100% { transform: translateY(0) rotateX(10deg) rotateY(10deg); }
          50% { transform: translateY(-20px) rotateX(-5deg) rotateY(-15deg); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .liquid-glass {
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(60, 25, 5, 0.4));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(217, 145, 83, 0.25);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(217, 145, 83, 0.05);
        }
      `}} />

      {/* Retro 3D Moving Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center items-end overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(217,145,83,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(217,145,83,0.2)_1px,transparent_1px)] bg-[length:50px_50px] w-[200vw] h-[200vh] origin-bottom animate-[grid-move_3s_linear_infinite]" style={{ bottom: '-50%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0a0503] to-[#0a0503]" />
      </div>

      {/* Ambient Glows */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#8b4513]/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#d99153]/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <Navbar />

      {/* HERO SECTION */}
      <section id="top" className="relative z-10 pt-40 pb-32 px-5 sm:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Kiri: Teks */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
          <ScrollReveal>
            <div className="liquid-glass inline-flex items-center gap-3 px-5 py-2 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d99153] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d99153]"></span>
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-[#d99153] uppercase">
                Welcome to My Space
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-5xl sm:text-7xl font-black leading-tight tracking-tighter">
              Halo, Gua <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d99153] via-[#e5b387] to-[#8b4513] drop-shadow-lg">
                [Nama Lu]
              </span>
            </h1>
            <h2 className="text-xl sm:text-3xl font-semibold mt-2 text-[#b08d71]">
              Software Engineer Enthusiast (SMK RPL)
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="max-w-xl text-[#a3836b] text-base sm:text-lg leading-relaxed">
              Membangun fondasi karir profesional dari bangku SMK. Berfokus pada pengembangan web berkinerja tinggi, desain antarmuka estetis, dan arsitektur sistem berbasis cloud.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a href="#projects" className="relative group overflow-hidden liquid-glass rounded-xl px-8 py-3.5 text-[#fbe6d4] font-bold tracking-wide hover:shadow-[0_0_30px_rgba(217,145,83,0.4)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b4513]/40 to-[#d99153]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">Jelajahi Project <Code2 className="w-4 h-4"/></span>
              </a>
              <a href="#pesan" className="relative group overflow-hidden bg-transparent border border-[#d99153]/50 rounded-xl px-8 py-3.5 text-[#d99153] font-bold tracking-wide hover:bg-[#d99153]/10 transition-all duration-300">
                Hubungi Gua
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <SocialIcons />
          </ScrollReveal>
        </div>

        {/* Kanan: 3D Object / Badge */}
        <ScrollReveal delay={200} className="hidden lg:flex flex-1 justify-center relative perspective-[1000px]">
          <div className="w-80 h-80 relative animate-[float-3d_6s_ease-in-out_infinite] transform-style-3d">
            <div className="absolute inset-0 rounded-3xl liquid-glass border-2 border-[#d99153]/40 flex items-center justify-center flex-col gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.8)] before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/5 before:to-transparent before:rounded-3xl">
              <Terminal className="w-16 h-16 text-[#d99153]" />
              <div className="text-2xl font-black tracking-widest text-[#fbe6d4]">RPL . 2026</div>
              <div className="text-sm font-mono text-[#d99153]/80">System.out.println("Hello");</div>
            </div>
            {/* Ornamen Melayang */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full liquid-glass flex items-center justify-center animate-pulse">
              <Database className="w-8 h-8 text-[#d99153]" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SKILLS SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <ScrollReveal>
          <div className="text-center space-y-4 mb-16">
            <span className="liquid-glass px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] text-[#d99153] uppercase">
              Kompetensi Keahlian
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#fbe6d4] to-[#a3836b]">
              Skill & Teknologi
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 100}>
              <div className="liquid-glass group rounded-3xl p-8 h-full hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(217,145,83,0.15)] hover:border-[#d99153]/50 transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b4513]/50 to-transparent border border-[#d99153]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-[#d99153]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#fbe6d4]">{title}</h3>
                <p className="text-sm text-[#a3836b] leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <ScrollReveal>
          <div className="text-center space-y-4 mb-16">
            <span className="liquid-glass px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] text-[#d99153] uppercase">
              Portofolio Digital
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#fbe6d4]">
              Karya & Tugas Sekolah
            </h2>
            <p className="text-[#a3836b] text-base max-w-2xl mx-auto">
              Kumpulan proyek nyata dari tugas sekolah, eksplorasi pribadi, hingga project *freelance* sederhana.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <ProjectList />
        </ScrollReveal>
      </section>

      {/* PESAN ANONIM */}
      <section id="pesan" className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <ScrollReveal>
          <div className="text-center space-y-4 mb-12">
            <span className="liquid-glass px-4 py-1.5 rounded-full text-[11px] tracking-[0.2em] text-[#d99153] uppercase">
              Secure Channel
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#fbe6d4]">
              Pesan Rahasia (Anonim)
            </h2>
            <p className="text-[#a3836b] text-base max-w-xl mx-auto">
              Beri masukan, kritik, atau sapaan. Sistem akan mengenkripsi pengirim, pesan langsung masuk ke notifikasi WhatsApp gua.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <AnonymousForm />
        </ScrollReveal>
      </section>

      {/* STATS 3D */}
      <section className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pb-24">
        <ScrollReveal>
          <div className="liquid-glass rounded-3xl p-8 sm:p-12 border-t border-[#d99153]/50">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-[#d99153]/20">
              {STATS.map(({ icon: Icon, value, label }, idx) => (
                <div key={label} className={`flex flex-col items-center justify-center text-center gap-2 ${idx === 0 ? '' : 'pl-4'}`}>
                  <div className="p-3 rounded-full bg-[#d99153]/10 mb-2">
                    <Icon className="w-8 h-8 text-[#d99153]" />
                  </div>
                  <p className="text-4xl font-black text-[#fbe6d4] drop-shadow-md">{value}</p>
                  <p className="text-sm text-[#a3836b] font-medium tracking-wide uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[#d99153]/20 bg-[#0a0503]/80 backdrop-blur-md py-10 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-[#a3836b]">
            © {year} <span className="text-[#d99153] font-bold">[Nama Lu]</span>. Built with Next.js, Supabase, & Liquid Glassmorphism.
          </p>
          <a href="#top" className="liquid-glass px-4 py-2 rounded-xl text-xs font-bold text-[#d99153] hover:text-[#fbe6d4] transition-all">
            SCROLL TO TOP ↑
          </a>
        </div>
      </footer>
    </main>
  );
}