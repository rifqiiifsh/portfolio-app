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
  Send,
  Lock,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

  const ADMIN_PASS = "admin123"; // Ganti password admin lu di sini

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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-purple-500 selection:text-white">
        <div className="fixed -top-24 -left-24 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/30">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h2>
            <p className="text-xs text-slate-400">Masukkan kata sandi rahasia untuk masuk dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-950/80 border-slate-800 text-white text-center rounded-xl focus:ring-2 focus:ring-purple-500"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2.5 rounded-xl shadow-lg shadow-purple-500/25 transition-all"
            >
              Buka Control Panel
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 max-w-6xl mx-auto space-y-8 selection:bg-purple-500 selection:text-white">
      {/* Background Ambient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-600/10 blur-[140px] pointer-events-none -z-10" />

      {/* HEADER BAR */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard Control Panel</h1>
            <p className="text-xs text-slate-400">Notifikasi WA Aktif • Real-time Sync</p>
          </div>
        </div>
        <Button
          onClick={() => setAuthenticated(false)}
          variant="outline"
          className="border-slate-800 text-slate-300 hover:bg-slate-800/80 rounded-xl"
        >
          <LogOut className="w-4 h-4 mr-2" /> Keluar
        </Button>
      </header>

      {/* STATS OVERVIEW BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Total Pesan Anonim</p>
            <p className="text-2xl font-bold text-white">{messages.length}</p>
          </div>
        </div>
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
            <FolderKanban className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Project Portofolio</p>
            <p className="text-2xl font-bold text-white">{projects.length}</p>
          </div>
        </div>
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Status Server</p>
            <p className="text-sm font-bold text-emerald-400">Online & WA Connected</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "messages"
              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-purple-500/20"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <Inbox className="w-4 h-4" /> Pesan Anonim ({messages.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === "projects"
              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-purple-500/20"
              : "text-slate-400 hover:text-white hover:bg-slate-900"
          }`}
        >
          <FolderKanban className="w-4 h-4" /> Kelola Portofolio ({projects.length})
        </button>
      </div>

      {/* TAB 1: INBOX PESAN ANONIM */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl space-y-2">
              <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-slate-400 font-medium">Kotak pesan anonim masih kosong.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className="group p-6 bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 rounded-2xl transition-all duration-200 flex flex-col sm:flex-row items-start justify-between gap-4"
              >
                <div className="space-y-2 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.created_at).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-slate-200 text-base leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                    "{msg.content}"
                  </p>
                </div>
                <Button
                  onClick={() => handleDeleteMessage(msg.id)}
                  size="icon"
                  variant="ghost"
                  className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
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
            className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 shadow-xl"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-400" /> Tambah Project Baru
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Judul Project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-slate-950/80 border-slate-800 text-white rounded-xl"
              />
              <Input
                placeholder="Tags (pisahkan koma: Next.js, Tailwind)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-slate-950/80 border-slate-800 text-white rounded-xl"
              />
              <Input
                placeholder="URL Gambar Thumbnail"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-slate-950/80 border-slate-800 text-white rounded-xl"
              />
              <Input
                placeholder="URL Live Demo (opsional)"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className="bg-slate-950/80 border-slate-800 text-white rounded-xl"
              />
              <Input
                placeholder="URL Github Repo (opsional)"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="bg-slate-950/80 border-slate-800 text-white rounded-xl sm:col-span-2"
              />
            </div>
            <Textarea
              placeholder="Deskripsi Singkat Project"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              className="bg-slate-950/80 border-slate-800 text-white rounded-xl min-h-[90px]"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-md shadow-purple-500/20"
            >
              Simpan Project
            </Button>
          </form>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Daftar Project Terpasang</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-white">{proj.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>
                  </div>
                  <Button
                    onClick={() => handleDeleteProject(proj.id)}
                    size="icon"
                    variant="ghost"
                    className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}