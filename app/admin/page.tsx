"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Trash2, Plus, MessageSquare, FolderKanban, LogOut, Send, Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

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

  // Password Rahasia Admin (Silakan ubah sesuai keinginan lu)
  const ADMIN_PASS = "admin123"; 

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
    // Fetch Messages
    const { data: msgData } = await supabase
      .from("anonymous_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (msgData) setMessages(msgData);

    // Fetch Projects
    const { data: projData } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (projData) setProjects(projData);
  };

  // Real-time Subscription untuk Pesan Anonim Masuk
  useEffect(() => {
    if (!authenticated) return;

    const channel = supabase
      .channel("realtime-messages")
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

  // Tambah Project Baru (CRUD - Create)
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
      alert("Gagal menambah project: " + error.message);
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

  // Hapus Project (CRUD - Delete)
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Yakin mau hapus project ini?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) {
      setProjects(projects.filter((p) => p.id !== id));
    } else {
      alert("Gagal hapus: " + error.message);
    }
  };

  // Hapus Pesan Anonim
  const handleDeleteMessage = async (id: string) => {
    const { error } = await supabase.from("anonymous_messages").delete().eq("id", id);
    if (!error) {
      setMessages(messages.filter((m) => m.id !== id));
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-sm w-full space-y-4">
          <h2 className="text-xl font-bold text-white text-center">Login Admin</h2>
          <Input
            type="password"
            placeholder="Masukkan Password Admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-950 border-slate-800 text-white"
          />
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Masuk
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-5xl mx-auto space-y-8">
      {/* Header Dashboard */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
          <p className="text-xs text-slate-400">Kelola pesan anonim & portofolio lu secara real-time</p>
        </div>
        <Button onClick={() => setAuthenticated(false)} variant="outline" className="border-slate-800 text-slate-300">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      {/* Navigasi Tab */}
      <div className="flex gap-4 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 pb-2 px-3 font-medium transition-all ${
            activeTab === "messages" ? "border-b-2 border-indigo-500 text-indigo-400" : "text-slate-500"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Inbox Anonim ({messages.length})
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 pb-2 px-3 font-medium transition-all ${
            activeTab === "projects" ? "border-b-2 border-indigo-500 text-indigo-400" : "text-slate-500"
          }`}
        >
          <FolderKanban className="w-4 h-4" /> Kelola Portofolio ({projects.length})
        </button>
      </div>

      {/* TAB 1: INBOX PESAN ANONIM (REALTIME) */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
              Belum ada pesan anonim yang masuk.
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-xs text-indigo-400 font-mono">
                    {new Date(msg.created_at).toLocaleString("id-ID")}
                  </span>
                  <p className="text-slate-200 text-base leading-relaxed">{msg.content}</p>
                </div>
                <Button onClick={() => handleDeleteMessage(msg.id)} size="icon" variant="ghost" className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 shrink-0">
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
          {/* Form Tambah Project */}
          <form onSubmit={handleAddProject} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" /> Tambah Project Baru
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Judul Project" value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-slate-950 border-slate-800 text-white" />
              <Input placeholder="Tags (pisah koma: React, Tailwind)" value={tags} onChange={(e) => setTags(e.target.value)} className="bg-slate-950 border-slate-800 text-white" />
              <Input placeholder="URL Gambar Thumbnail" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="bg-slate-950 border-slate-800 text-white" />
              <Input placeholder="URL Live Demo (opsional)" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} className="bg-slate-950 border-slate-800 text-white" />
              <Input placeholder="URL Github Repo (opsional)" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="bg-slate-950 border-slate-800 text-white" />
            </div>
            <Textarea placeholder="Deskripsi Singkat Project" value={desc} onChange={(e) => setDesc(e.target.value)} required className="bg-slate-950 border-slate-800 text-white min-h-[80px]" />
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Simpan ke Portofolio
            </Button>
          </form>

          {/* List Project */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Daftar Project Terpasang</h3>
            {projects.length === 0 ? (
              <p className="text-slate-500 text-sm">Belum ada project. Tambahkan lewat form di atas!</p>
            ) : (
              projects.map((proj) => (
                <div key={proj.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-white">{proj.title}</h4>
                    <p className="text-xs text-slate-400">{proj.description}</p>
                  </div>
                  <Button onClick={() => handleDeleteProject(proj.id)} size="icon" variant="ghost" className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}