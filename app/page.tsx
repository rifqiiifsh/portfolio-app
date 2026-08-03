"use client";

import { useState } from "react";
import AnonymousForm from "../components/AnonymousForm";
import ProjectList from "../components/ProjectList";
import {
  Mail,
  Share2,
  Code2,
  Menu,
  X,
  Download,
  Palette,
  Smartphone,
  Sparkles,
  Heart,
  Briefcase,
  Clock,
  Trophy,
  Award,
  Medal,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  MapPin,
  User,
  Zap,
  GraduationCap,
} from "lucide-react";

const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#tentang", label: "Tentang" },
  { href: "#pendidikan", label: "Pendidikan" },
  { href: "#prestasi", label: "Prestasi" },
  { href: "#projects", label: "Portfolio" },
  { href: "#pesan", label: "Kontak" },
];

const QUICK_FACTS = [
  { icon: User, label: "Nama", value: "[Nama Lengkap Lu]" },
  { icon: MapPin, label: "Lokasi", value: "[Kota, Negara]" },
  { icon: Sparkles, label: "Fokus", value: "[Web / Mobile Development]" },
  { icon: Zap, label: "Status", value: "Terbuka untuk kolaborasi" },
];

const EDUCATION = [
  {
    level: "SD",
    school: "[Nama SD Lu]",
    period: "[20XX — 20XX]",
    desc: "[Kegiatan atau pencapaian singkat di masa ini]",
  },
  {
    level: "SMP",
    school: "[Nama SMP Lu]",
    period: "[20XX — 20XX]",
    desc: "[Kegiatan atau pencapaian singkat di masa ini]",
  },
  {
    level: "SMA / SMK",
    school: "[Nama SMA Lu]",
    period: "[20XX — 20XX]",
    desc: "[Jurusan, ekstrakurikuler, atau pencapaian]",
  },
  {
    level: "Kuliah",
    school: "[Nama Universitas, Jurusan]",
    period: "[20XX — Sekarang]",
    desc: "[Fokus studi, organisasi, atau proyek kampus]",
  },
];

const ACHIEVEMENTS = [
  { icon: Trophy, title: "[Nama Prestasi 1]", meta: "[Penyelenggara • Tahun]" },
  { icon: Award, title: "[Nama Prestasi 2]", meta: "[Penyelenggara • Tahun]" },
  { icon: Medal, title: "[Nama Prestasi 3]", meta: "[Penyelenggara • Tahun]" },
  { icon: Star, title: "[Nama Prestasi 4]", meta: "[Penyelenggara • Tahun]" },
];

const SERVICES = [
  {
    icon: Palette,
    gradient: "from-purple-500 to-pink-500",
    title: "UI/UX Design",
    desc: "Merancang pengalaman yang intuitif dan enak dipakai.",
  },
  {
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    title: "Web Development",
    desc: "Bikin website modern, cepat, dan responsif.",
  },
  {
    icon: Smartphone,
    gradient: "from-fuchsia-500 to-purple-600",
    title: "Mobile Design",
    desc: "Desain aplikasi mobile yang rapi dan mudah dipakai.",
  },
  {
    icon: Sparkles,
    gradient: "from-indigo-500 to-blue-500",
    title: "Brand Identity",
    desc: "Membangun identitas visual yang gampang diingat.",
  },
];

// Diambil dari stack yang beneran kepake di kode (Supabase, Tailwind, dst) — bukan asal tebak
const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "shadcn/ui",
  "Lucide Icons",
  "Git",
];

const STATS = [
  { icon: Heart, value: "[80]+", label: "Klien Puas" },
  { icon: Briefcase, value: "[120]+", label: "Project Selesai" },
  { icon: Clock, value: "[5]+", label: "Tahun Pengalaman" },
  { icon: Trophy, value: "[15]+", label: "Penghargaan" },
];

const TESTIMONIALS = [
  {
    text: "Kerja sama sama dia enak banget, komunikasinya lancar dan hasilnya lebih dari ekspektasi.",
    name: "[Nama Klien 1]",
    role: "[Jabatan, Perusahaan]",
  },
  {
    text: "Profesional, kreatif, dan ngerti banget apa yang gua butuhin. Pasti bakal kerja bareng lagi.",
    name: "[Nama Klien 2]",
    role: "[Jabatan, Perusahaan]",
  },
  {
    text: "Detail-oriented dan selalu update progress. Recommended banget buat yang butuh developer.",
    name: "[Nama Klien 3]",
    role: "[Jabatan, Perusahaan]",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const year = new Date().getFullYear();

  const prevTestimonial = () =>
    setActiveTestimonial((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () =>
    setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length);

  const SocialIcons = () => (
    <div className="flex items-center gap-2">
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition-colors"
      >
        <Code2 className="w-4 h-4" />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noreferrer"
        className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition-colors"
      >
        <Share2 className="w-4 h-4" />
      </a>
      <a
        href="mailto:email@example.com"
        className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition-colors"
      >
        <Mail className="w-4 h-4" />
      </a>
    </div>
  );

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Background glow */}
      <div className="fixed -top-24 -left-24 w-72 h-72 md:w-[420px] md:h-[420px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed top-1/3 -right-32 w-72 h-72 md:w-[380px] md:h-[380px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-1/3 w-72 h-72 md:w-[400px] md:h-[400px] bg-pink-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
            <span className="text-sm font-bold text-white">[Nama Lu]</span>
          </a>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="mailto:email@example.com"
              className="hidden md:inline-flex text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-4 py-2 rounded-lg shadow-md shadow-purple-500/30 transition-all"
            >
              Hubungi Aku
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              className="md:hidden p-2 rounded-lg border border-slate-800 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* DRAWER — mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[80%] bg-slate-950 border-l border-slate-800 px-5 py-6 flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-bold text-white">[Nama Lu]</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup menu"
                className="p-1.5 rounded-lg border border-slate-800 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="space-y-1">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
            <a
              href="mailto:email@example.com"
              className="mt-4 text-center text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 py-2.5 rounded-lg"
            >
              Hubungi Aku
            </a>
            <div className="mt-auto pt-6 space-y-3">
              <p className="text-[11px] font-semibold tracking-widest text-slate-600 uppercase">
                Follow Me
              </p>
              <SocialIcons />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div id="top" className="max-w-5xl mx-auto px-5 sm:px-8 py-14 md:py-20 space-y-20 md:space-y-28">
        {/* HERO */}
        <section className="relative flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-10">
          <div className="space-y-5 max-w-xl text-center md:text-left mx-auto md:mx-0">
            <span className="inline-block text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Hello, I&apos;m
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              [Nama Lu]{" "}
              <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Developer &amp; Creator
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              Fokus bikin aplikasi web modern yang cepat, responsif, dan estetik. Suka bereksperimen dengan teknologi web terbaru.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 pt-1 flex-wrap">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-5 py-2.5 rounded-xl shadow-md shadow-purple-500/30 hover:shadow-lg hover:shadow-purple-500/40 transition-all"
              >
                Lihat Project
              </a>
              <a
                href="#pesan"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 border border-slate-700 hover:border-slate-500 px-5 py-2.5 rounded-xl transition-all"
              >
                Kirim Pesan
              </a>
            </div>

            <div className="pt-2">
              <SocialIcons />
            </div>
          </div>

          {/* Foto profil — ganti isi lingkaran dengan <img src="/foto-lu.jpg" /> kalau ada foto */}
          <div className="relative shrink-0 mx-auto md:mx-0">
            <div className="absolute -inset-8 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-blue-600/30 rounded-full blur-3xl" />
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 shadow-xl shadow-purple-500/30">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <span className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-500">
                  JD
                </span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-2 md:-right-6 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl shadow-lg">
              <span className="text-lg font-bold text-white">[5]+</span>
              <span className="text-[10px] text-slate-400 whitespace-nowrap">Years of Experience</span>
            </div>
          </div>
        </section>

        {/* TENTANG KITA */}
        <section id="tentang" className="space-y-8 scroll-mt-20">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Get to Know Me
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Tentang Kita</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Bio + quick facts */}
            <div className="md:col-span-3 space-y-6">
              <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                [Tulis cerita singkat tentang diri lu di sini — siapa lu, apa yang lu suka pelajari,
                dan kenapa lu tertarik di dunia development. Dua sampai tiga kalimat udah cukup buat
                ngenalin diri lu ke pengunjung.]
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {QUICK_FACTS.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-medium text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Freelance card + CV + social */}
            <div className="md:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 flex flex-col">
              <p className="text-sm font-semibold text-white mb-1">Terbuka untuk Kolaborasi</p>
              <p className="text-xs text-slate-400 mb-4">Yuk bikin sesuatu yang keren bareng.</p>
              <a
                href="mailto:email@example.com"
                className="text-center text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 py-2.5 rounded-lg transition-all mb-3"
              >
                Hubungi Gua
              </a>
              {/* Ganti href dengan file CV asli lu */}
              <a
                href="#"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-700/60 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition-colors mb-4"
              >
                Download CV
                <Download className="w-3.5 h-3.5" />
              </a>
              <p className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase mb-2">
                Follow Me
              </p>
              <SocialIcons />
            </div>
          </div>
        </section>

        {/* PERJALANAN PENDIDIKAN */}
        <section id="pendidikan" className="space-y-8 scroll-mt-20">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              My Journey
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Perjalanan Pendidikan</h2>
          </div>

          <div className="relative border-l-2 border-slate-800 pl-7 space-y-10 max-w-2xl">
            {EDUCATION.map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[33px] top-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 ring-4 ring-slate-950 flex items-center justify-center">
                  <GraduationCap className="w-2.5 h-2.5 text-white" />
                </span>
                <p className="text-xs font-semibold text-purple-400 uppercase tracking-wide">
                  {item.level} • {item.period}
                </p>
                <h3 className="text-base font-bold text-white mt-1">{item.school}</h3>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRESTASI */}
        <section id="prestasi" className="space-y-8 scroll-mt-20">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Achievements
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Prestasi</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map(({ icon: Icon, title, meta }, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-md">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                <p className="text-xs text-slate-400">{meta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="space-y-6">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              What I Do
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Services I Offer</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(({ icon: Icon, gradient, title, desc }) => (
              <div
                key={title}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-md`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="space-y-6 scroll-mt-20">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Tech Stack
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-purple-500/40 hover:text-white transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* PESAN ANONIM */}
        <section id="pesan" className="space-y-6 scroll-mt-20">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Kotak Cerita
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Kotak Pesan Rahasia</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Pesan lu bakal langsung masuk ke HP gua secara real-time.
            </p>
          </div>
          <AnonymousForm />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="space-y-8 scroll-mt-20">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              My Work
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Project yang Sudah Selesai</h2>
            <p className="text-slate-400 text-sm">
              Beberapa karya dan project yang pernah gua bikin dari awal sampai kelar.
            </p>
          </div>
          <ProjectList />
        </section>

        {/* STATS BAR */}
        <section className="rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-white/90 shrink-0" />
                <div>
                  <p className="text-xl font-bold text-white leading-tight">{value}</p>
                  <p className="text-[11px] text-white/80">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS — carousel aktif */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase">
              Testimonials
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What Clients Say</h2>
          </div>

          <div className="relative max-w-xl mx-auto">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4 min-h-[200px] flex flex-col items-center justify-center animate-in fade-in duration-300">
              <Quote className="w-6 h-6 text-purple-400" />
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {TESTIMONIALS[activeTestimonial].text}
              </p>
              <div>
                <p className="text-sm font-semibold text-white">
                  {TESTIMONIALS[activeTestimonial].name}
                </p>
                <p className="text-xs text-slate-500">{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              aria-label="Testimoni sebelumnya"
              className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Testimoni berikutnya"
              className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 mt-5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Lihat testimoni ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === activeTestimonial ? "w-6 bg-purple-500" : "w-2 bg-slate-700 hover:bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 mt-4 py-8 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-slate-500">
            © {year} [Nama Lu]. Dibuat dengan Next.js &amp; Supabase.
          </p>
          <div className="flex items-center gap-4">
            <SocialIcons />
          </div>
          <a href="#top" className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Kembali ke atas ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
