"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Trash2,
  Plus,
  MessageSquare,
  FolderKanban,
  LogOut,
  Sparkles,
  Inbox,
  Lock,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  reply?: string;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url?: string;
  github_url?: string;
  tags: string[];
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"messages" | "projects">("messages");

  // Form State Tambah Project
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [tags, setTags] = useState("");

  const ADMIN_PASS = "354313"; // Ganti password admin lu di sini

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setAuthenticated(true);
      fetchData();
    } else {
      alert("Password Admin Salah!");
    }
  };

  const fetchData = async () => {
    const { data: msgData } = await supabase
      .from("anonymous_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (msgData) setMessages(msgData);

    const { data: projData } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (projData) setProjects(projData);
  };

  // Realtime listener
  useEffect(() => {
    if (!authenticated) return;
    const channel = supabase
      .channel("realtime-admin-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "anonymous_messages" },
        (payload) => {
          setMessages((prev) => [payload.new as Message, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authenticated]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = tags.split(",").map((t) => t.trim()).filter(Boolean);

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description: desc,
          image_url: imageUrl,
          project_url: projectUrl,
          github_url: githubUrl,
          tags: tagArray,
        },
      ])
      .select();

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else if (data) {
      setProjects([data[0], ...projects]);
      setTitle("");
      setDesc("");
      setImageUrl("");
      setProjectUrl("");
      setGithubUrl("");
      setTags("");
      alert("Project berhasil ditambahkan!");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Yakin mau hapus project ini?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) setProjects(projects.filter((p) => p.id !== id));
  };

  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from("anonymous_messages").delete().eq("id", id);
    if (!error) setMessages(messages.filter((m) => m.id !== id));
  };

  // Halaman Login Admin jika belum authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#150E08] flex items-center justify-center p-4 selection:bg-[#E8B368] selection:text-[#1B120B] relative overflow-hidden">
        <div className="pointer-events-none fixed -top-24 -left-24 w-72 h-72 bg-[#C9773D]/15 rounded-full blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-20 [mask-image:linear-gradient(to_top,black,transparent)]">
          <div
            className="retro-grid absolute inset-0"
            style={{ transform: "perspective(500px) rotateX(60deg)" }}
          />
        </div>

        <div className="relative w-full max-w-md glass-card p-8 rounded-3xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E8B368] to-[#C9773D] rounded-2xl flex items-center justify-center mx-auto shadow-[0_4px_0_0_#7A4A22]">
              <Lock className="w-6 h-6 text-[#1B120B]" />
            </div>
            <h2 className="text-2xl font-bold text-[#F3E4D2] tracking-tight font-display">
              Admin Portal
            </h2>
            <p className="text-xs text-[#B99A7C]">
              Masukkan kata sandi rahasia untuk masuk dashboard
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-center rounded-xl px-4 py-2.5 text-sm text-[#F3E4D2] placeholder:text-[#8A6F55] bg-[#1B120B]/60 border border-[#E8B368]/15 focus:outline-none focus:ring-2 focus:ring-[#E8B368]/50 focus:border-[#E8B368]/40 transition-all"
            />
            <button type="submit" className="liquid-btn-primary w-full justify-center py-2.5">
              Buka Control Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#150E08] text-[#F3E4D2] p-4 sm:p-8 max-w-6xl mx-auto space-y-8 selection:bg-[#E8B368] selection:text-[#1B120B]">
      {/* Background Ambient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[#C9773D]/10 blur-[140px] pointer-events-none -z-10" />

      {/* HEADER BAR */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E8B368] to-[#C9773D] flex items-center justify-center text-[#1B120B] font-bold shadow-[0_3px_0_0_#7A4A22]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#F3E4D2] font-display">
              Dashboard Control Panel
            </h1>
            <p className="text-xs text-[#B99A7C]">Notifikasi WA Aktif &middot; Real-time Sync</p>
          </div>
        </div>
        <button
          onClick={() => setAuthenticated(false)}
          className="liquid-btn-outline"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </header>

      {/* STATS OVERVIEW BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 glass-card rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E8B368]/10 border border-[#E8B368]/20 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#E8B368]" />
          </div>
          <div>
            <p className="text-xs text-[#B99A7C] uppercase tracking-wider font-medium">
              Total Pesan Anonim
            </p>
            <p className="text-2xl font-bold text-[#F3E4D2]">{messages.length}</p>
          </div>
        </div>
        <div className="p-5 glass-card rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#C9773D]/10 border border-[#C9773D]/25 flex items-center justify-center">
            <FolderKanban className="w-6 h-6 text-[#C9773D]" />
          </div>
          <div>
            <p className="text-xs text-[#B99A7C] uppercase tracking-wider font-medium">
              Project Portofolio
            </p>
            <p className="text-2xl font-bold text-[#F3E4D2]">{projects.length}</p>
          </div>
        </div>
        <div className="p-5 glass-card rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#8FBF8A]/10 border border-[#8FBF8A]/25 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-[#8FBF8A]" />
          </div>
          <div>
            <p className="text-xs text-[#B99A7C] uppercase tracking-wider font-medium">
              Status Server
            </p>
            <p className="text-sm font-bold text-[#8FBF8A]">Online & WA Connected</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex gap-2 border-b border-[#E8B368]/10 pb-3">
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "messages"
              ? "liquid-btn-primary !py-2.5"
              : "text-[#B99A7C] hover:text-[#F3E4D2] hover:bg-[#E8B368]/10"
          }`}
        >
          <Inbox className="w-4 h-4" /> Pesan Anonim ({messages.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "projects"
              ? "liquid-btn-primary !py-2.5"
              : "text-[#B99A7C] hover:text-[#F3E4D2] hover:bg-[#E8B368]/10"
          }`}
        >
          <FolderKanban className="w-4 h-4" /> Kelola Portofolio ({projects.length})
        </button>
      </div>

      {/* TAB 1: INBOX PESAN ANONIM */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-16 rounded-3xl border border-dashed border-[#E8B368]/20 bg-[#2B1B10]/30 space-y-2">
              <Inbox className="w-10 h-10 text-[#8A6F55] mx-auto" />
              <p className="text-[#B99A7C] font-medium">Kotak pesan anonim masih kosong.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="group p-6 glass-card hover:border-[#E8B368]/30 rounded-2xl transition-all duration-200 flex flex-col sm:flex-row items-start justify-between gap-4"
              >
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono-retro font-medium px-2.5 py-1 rounded-full bg-[#E8B368]/10 text-[#E8B368] border border-[#E8B368]/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.created_at).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-[#F3E4D2] text-base leading-relaxed bg-[#1B120B]/50 p-4 rounded-xl border border-[#E8B368]/10">
                    &ldquo;{msg.content}&rdquo;
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  aria-label="Hapus pesan"
                  className="text-[#B99A7C] hover:text-[#D9776B] hover:bg-[#D9776B]/10 rounded-xl shrink-0 p-2.5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: KELOLA PORTOFOLIO (CRUD) */}
      {activeTab === "projects" && (
        <div className="space-y-8">
          <form
            onSubmit={handleAddProject}
            className="p-6 glass-card rounded-3xl space-y-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
          >
            <h3 className="text-lg font-bold text-[#F3E4D2] flex items-center gap-2 font-display">
              <Plus className="w-5 h-5 text-[#E8B368]" /> Tambah Project Baru
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="Judul Project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-[#1B120B]/60 border border-[#E8B368]/15 text-[#F3E4D2] placeholder:text-[#8A6F55] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B368]/50 focus:border-[#E8B368]/40 transition-all"
              />
              <input
                placeholder="Tags (pisahkan koma: Next.js, Tailwind)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-[#1B120B]/60 border border-[#E8B368]/15 text-[#F3E4D2] placeholder:text-[#8A6F55] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B368]/50 focus:border-[#E8B368]/40 transition-all"
              />
              <input
                placeholder="URL Gambar Thumbnail"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-[#1B120B]/60 border border-[#E8B368]/15 text-[#F3E4D2] placeholder:text-[#8A6F55] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B368]/50 focus:border-[#E8B368]/40 transition-all"
              />
              <input
                placeholder="URL Live Demo (opsional)"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className="bg-[#1B120B]/60 border border-[#E8B368]/15 text-[#F3E4D2] placeholder:text-[#8A6F55] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B368]/50 focus:border-[#E8B368]/40 transition-all"
              />
              <input
                placeholder="URL Github Repo (opsional)"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="bg-[#1B120B]/60 border border-[#E8B368]/15 text-[#F3E4D2] placeholder:text-[#8A6F55] rounded-xl px-4 py-2.5 text-sm sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#E8B368]/50 focus:border-[#E8B368]/40 transition-all"
              />
            </div>
            <textarea
              placeholder="Deskripsi Singkat Project"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="w-full min-h-[90px] resize-none bg-[#1B120B]/60 border border-[#E8B368]/15 text-[#F3E4D2] placeholder:text-[#8A6F55] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B368]/50 focus:border-[#E8B368]/40 transition-all"
            />
            <button type="submit" className="liquid-btn-primary">
              Simpan Project
            </button>
          </form>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#F3E4D2] font-display">
              Daftar Project Terpasang
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 glass-card rounded-2xl flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#F3E4D2]">{proj.title}</h4>
                    <p className="text-xs text-[#B99A7C] line-clamp-2">{proj.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    aria-label="Hapus project"
                    className="text-[#B99A7C] hover:text-[#D9776B] hover:bg-[#D9776B]/10 rounded-xl shrink-0 p-2.5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}