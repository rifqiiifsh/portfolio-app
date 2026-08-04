"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import AnonymousForm from "@/components/AnonymousForm";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  Terminal, Code2, Database, Award, GraduationCap, Briefcase, 
  Mail, Phone, Globe, Share2, Sparkles, CheckCircle2, Trophy, BookOpen, ExternalLink, ArrowDownRight 
} from "lucide-react";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  // Splash Screen Pembuka (Liquid Glass Opener)
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const hardSkills = ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Laravel", "Git", "Microsoft Office"];
  const softSkills = ["Kerja Tim", "Komunikasi", "Problem Solving", "Manajemen Waktu"];

  const projects = [
    {
      title: "Website Reservasi Villa",
      desc: "Platform booking villa online dengan sistem manajemen kamar real-time dan konfirmasi otomatis.",
      tech: ["Laravel", "Tailwind CSS", "MySQL"],
      role: "Fullstack Developer",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      demo: "#"
    },
    {
      title: "Marketplace Thrift",
      desc: "E-commerce barang second-hand dengan fitur keranjang belanja dan filter kategori interaktif.",
      tech: ["PHP Native", "JavaScript", "Bootstrap"],
      role: "Backend & Database Engineer",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
      demo: "#"
    },
    {
      title: "Chatbot WhatsApp AI",
      desc: "Asisten virtual otomatis terintegrasi API WhatsApp untuk layanan informasi sekolah/pelanggan.",
      tech: ["Node.js", "JavaScript", "Fonnte API"],
      role: "AI & Integration Developer",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80",
      demo: "#"
    },
    {
      title: "Aplikasi Android Keuangan",
      desc: "Aplikasi pencatatan pemasukan dan pengeluaran harian berbasis mobile dengan grafik laporan.",
      tech: ["React Native", "Expo", "SQLite"],
      role: "Mobile App Developer",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80",
      demo: "#"
    },
    {
      title: "Website Portofolio",
      desc: "Web portofolio pribadi interaktif dengan tema Neo-Brutalism & Liquid Glassmorphism.",
      tech: ["Next.js", "Tailwind CSS", "Supabase"],
      role: "UI/UX & Frontend Engineer",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80",
      demo: "#"
    },
  ];

  const certificates = [
    { issuer: "Dicoding Indonesia", title: "Belajar Dasar Pemrograman Web", year: "2025" },
    { issuer: "BNSP", title: "Sertifikasi Kompetensi Keahlian RPL", year: "2025" },
    { issuer: "Cisco Networking Academy", title: "Introduction to Cybersecurity", year: "2024" },
    { issuer: "MikroTik", title: "MTCNA (RouterOS Associate)", year: "2024" },
    { issuer: "Google Cloud", title: "Cloud Digital Leader Track", year: "2025" },
  ];

  const education = [
    { school: "SD Negeri XXX", period: "2016 – 2022" },
    { school: "SMP Negeri XXX", period: "2022 – 2025" },
    { school: "SMKN 1 Depok", major: "Rekayasa Perangkat Lunak (RPL)", period: "2025 – Sekarang" },
  ];

  const achievements = [
    { title: "Juara 2 Lomba Web Design Tingkat Kota", category: "Lomba / Prestasi" },
    { title: "Ketua Divisi Pemrograman OSIS", category: "Organisasi" },
    { title: "Penanggung Jawab IT Expo & Pentas Seni Sekolah", category: "Kepanitiaan" },
  ];

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-black font-sans selection:bg-yellow-300 overflow-x-hidden relative">
      
      {/* 1. SPLASH SCREEN (LIQUID GLASS 3D OPENER) */}
      <div className={`fixed inset-0 z-[100] bg-[#f3f0e8] flex flex-col items-center justify-center transition-all duration-1000 ${showSplash ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-full"}`} style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #d1d5db 31px, #d1d5db 32px)' }}>
        <div className="w-40 h-40 rounded-3xl border border-white/60 bg-white/20 backdrop-blur-2xl shadow-[8px_8px_0px_0px_#000,inset_0_0_30px_rgba(255,255,255,0.8)] flex items-center justify-center animate-[bounce_2s_infinite]">
          <span className="text-6xl font-black">R<span className="text-blue-500">.</span></span>
        </div>
        <h1 className="mt-8 text-2xl font-black uppercase tracking-[0.3em] bg-black text-white px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,0,1)]">
          LOADING PORTFOLIO...
        </h1>
      </div>

      {/* NOTEBOOK LINE BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-60" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #d1d5db 31px, #d1d5db 32px)' }} />

      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-5 pt-32 pb-24 space-y-32">
        
        {/* ================= 1. COVER SECTION ================= */}
        <section id="top" className="min-h-[75vh] flex flex-col items-center justify-center text-center relative perspective-[1200px]">
          <ScrollReveal>
            <div className="inline-block bg-white border-4 border-black px-4 py-1 font-mono font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] mb-6 rotate-2">
              PORTFOLIO UTAMA ✦ SMK REKAYASA PERANGKAT LUNAK
            </div>
            
            {/* Foto / Avatar placeholder */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-2xl border-4 border-black bg-yellow-200 shadow-[6px_6px_0px_0px_#000] overflow-hidden rotate-[-3deg] hover:rotate-0 transition-transform">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rifqi" alt="Avatar" className="w-full h-full object-cover" />
            </div>

            <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              [Nama Lu]<span className="text-blue-600">.</span>
            </h1>
            <p className="text-2xl font-bold bg-green-200 border-4 border-black px-6 py-2 inline-block shadow-[6px_6px_0px_0px_#000] mb-6">
              SMKN 1 Depok &middot; Jurusan Rekayasa Perangkat Lunak (RPL)
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl border-2 border-white/60 bg-white/30 backdrop-blur-xl shadow-[4px_4px_0px_0px_#000,inset_0_0_15px_rgba(255,255,255,0.8)] font-bold text-sm uppercase flex items-center gap-2 hover:bg-white/50 transition-all">
                <Share2 className="w-4 h-4" /> LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl border-2 border-white/60 bg-white/30 backdrop-blur-xl shadow-[4px_4px_0px_0px_#000,inset_0_0_15px_rgba(255,255,255,0.8)] font-bold text-sm uppercase flex items-center gap-2 hover:bg-white/50 transition-all">
                <Globe className="w-4 h-4" /> GitHub
              </a>
              <a href="mailto:email@example.com" className="px-5 py-2.5 rounded-xl border-2 border-white/60 bg-white/30 backdrop-blur-xl shadow-[4px_4px_0px_0px_#000,inset_0_0_15px_rgba(255,255,255,0.8)] font-bold text-sm uppercase flex items-center gap-2 hover:bg-white/50 transition-all">
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </ScrollReveal>
        </section>

        {/* ================= 2. TENTANG DIRI ================= */}
        <section id="about">
          <ScrollReveal>
            <div className="inline-block px-4 py-2 border-4 border-black bg-pink-300 font-black text-xl uppercase shadow-[6px_6px_0px_0px_#000] mb-8 rotate-[-1deg]">
              TENTANG DIRI
            </div>
            <div className="bg-yellow-100 p-8 sm:p-10 border-4 border-black shadow-[10px_10px_0px_0px_#000] relative">
              <p className="text-lg sm:text-xl font-medium font-mono leading-relaxed mb-6">
                Halo! Saya adalah siswa aktif di SMKN 1 Depok jurusan Rekayasa Perangkat Lunak yang memiliki ketertarikan tinggi pada dunia pengembangan perangkat lunak modern. Saya terbiasa mengeksplorasi teknologi web, membangun antarmuka interaktif, serta merancang database yang efisien. Minat utama saya berada di bidang Fullstack Development dan UI/UX Design. Tujuan karier saya adalah menjadi Software Engineer profesional yang mampu menghadirkan solusi digital berdampak besar bagi masyarakat.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ================= 3. SKILL ================= */}
        <section>
          <ScrollReveal>
            <div className="inline-block px-4 py-2 border-4 border-black bg-blue-300 font-black text-xl uppercase shadow-[6px_6px_0px_0px_#000] mb-8 rotate-1">
              KEAHLIAN / SKILL
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Hard Skills */}
              <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-blue-600" /> Hard Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hardSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 border-2 border-black font-bold text-sm bg-yellow-200 shadow-[3px_3px_0px_0px_#000]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-pink-600" /> Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {softSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 border-2 border-black font-bold text-sm bg-green-200 shadow-[3px_3px_0px_0px_#000]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ================= 4. PROYEK (FEATURED WORKS) ================= */}
        <section id="projects">
          <ScrollReveal>
            <div className="inline-block px-4 py-2 border-4 border-black bg-green-300 font-black text-xl uppercase shadow-[6px_6px_0px_0px_#000] mb-8 rotate-[-1deg]">
              PROYEK UNGGULAN
            </div>
            <p className="font-mono font-bold mb-8 text-gray-700">Berikut adalah beberapa proyek latihan dan aplikasi nyata yang pernah dikembangkan:</p>
            
            <div className="space-y-12">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-black text-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-10 flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    <span className="bg-yellow-400 text-black px-3 py-1 font-black text-xs uppercase border-2 border-black">
                      PROJECT 0{idx + 1} &bull; {proj.role}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black uppercase">{proj.title}</h3>
                    <p className="font-mono text-gray-300 text-sm sm:text-base leading-relaxed">{proj.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.tech.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 bg-transparent border-2 border-white text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <a href={proj.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/50 bg-white/20 backdrop-blur-xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.4)] font-black text-xs uppercase text-white hover:bg-white/40 transition-all">
                        Live Demo / GitHub <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div className="w-full md:w-5/12 border-4 border-white bg-gray-800 h-56 overflow-hidden relative">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ================= 5. PKL / MAGANG ================= */}
        <section>
          <ScrollReveal>
            <div className="inline-block px-4 py-2 border-4 border-black bg-purple-300 font-black text-xl uppercase shadow-[6px_6px_0px_0px_#000] mb-8 rotate-1">
              PENGALAMAN PKL / MAGANG
            </div>
            <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_#000] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-4">
                <h3 className="text-2xl font-black uppercase">PT. Tekno Solusi Nusantara</h3>
                <span className="font-mono font-bold text-sm bg-yellow-200 px-3 py-1 border-2 border-black inline-block mt-2 sm:mt-0">Juli – Oktober 2025</span>
              </div>
              <p className="font-bold text-lg text-blue-600">Posisi: Junior Frontend Developer Intern</p>
              <div className="font-mono space-y-2 text-sm">
                <p><strong>Tugas yang dikerjakan:</strong> Membantu tim developer membuat antarmuka web klien, melakukan debugging komponen React, serta mengintegrasikan API backend.</p>
                <p><strong>Skill yang didapat:</strong> Pengalaman kerja tim profesional menggunakan Git workflow, pemahaman manajemen project dengan Agile/Scrum, serta peningkatan skill code optimization.</p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ================= 6. SERTIFIKAT ================= */}
        <section>
          <ScrollReveal>
            <div className="inline-block px-4 py-2 border-4 border-black bg-yellow-200 font-black text-xl uppercase shadow-[6px_6px_0px_0px_#000] mb-8 rotate-[-1deg]">
              SERTIFIKASI & PELATIHAN
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certificates.map((cert, i) => (
                <div key={i} className="bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] flex items-start gap-4">
                  <div className="p-3 bg-blue-200 border-2 border-black shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg uppercase">{cert.title}</h4>
                    <p className="font-mono text-xs text-gray-600 mt-1">{cert.issuer} &bull; {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ================= 7. PENDIDIKAN ================= */}
        <section>
          <ScrollReveal>
            <div className="inline-block px-4 py-2 border-4 border-black bg-pink-200 font-black text-xl uppercase shadow-[6px_6px_0px_0px_#000] mb-8 rotate-1">
              PERJALANAN PENDIDIKAN
            </div>
            <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_#000] space-y-6">
              {education.map((edu, i) => (
                <div key={i} className="flex items-start gap-4 border-b-2 border-dashed border-gray-300 pb-4 last:border-none last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-green-200 border-2 border-black flex items-center justify-center shrink-0 font-black">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-black text-xl uppercase">{edu.school}</h4>
                    {edu.major && <p className="font-bold text-sm text-blue-600">{edu.major}</p>}
                    <p className="font-mono text-xs text-gray-500 mt-0.5">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ================= 8. PRESTASI & ORGANISASI ================= */}
        <section>
          <ScrollReveal>
            <div className="inline-block px-4 py-2 border-4 border-black bg-green-200 font-black text-xl uppercase shadow-[6px_6px_0px_0px_#000] mb-8 rotate-[-1deg]">
              PRESTASI & ORGANISASI
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((item, i) => (
                <div key={i} className="bg-yellow-50 p-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase inline-block">
                      {item.category}
                    </span>
                    <h4 className="font-black text-lg uppercase">{item.title}</h4>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-600 mt-4" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* ================= 9. KONTAK & PESAN ANONIM ================= */}
        <section id="pesan" className="flex flex-col items-center pt-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-5xl font-black uppercase mb-4 bg-yellow-300 px-6 py-2 border-4 border-black shadow-[8px_8px_0px_0px_#000] inline-block rotate-1">
                KONTAK & PESAN
              </h2>
              <p className="font-mono text-base font-bold mt-4">
                Hubungi langsung atau kirim pesan anonim yang masuk ke WhatsApp.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <span className="px-4 py-2 bg-white border-2 border-black font-bold text-sm shadow-[3px_3px_0px_0px_#000] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" /> email@example.com
                </span>
                <span className="px-4 py-2 bg-white border-2 border-black font-bold text-sm shadow-[3px_3px_0px_0px_#000] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" /> +62 812-3456-7890
                </span>
              </div>
            </div>

            <div className="w-full max-w-2xl">
              <AnonymousForm />
            </div>
          </ScrollReveal>
        </section>

      </div>

      <footer className="border-t-4 border-black py-10 bg-white text-center font-bold">
        <p>© {new Date().getFullYear()} [Nama Lu] &middot; SMKN 1 Depok RPL. All rights reserved.</p>
      </footer>
    </main>
  );
}