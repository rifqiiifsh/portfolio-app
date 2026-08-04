"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Plus, MessageSquare, FolderKanban, LogOut, BarChart3, Activity } from "lucide-react";

interface Message { id: string; content: string; created_at: string; }
interface Project { id: string; title: string; description: string; image_url: string; tags: string[]; }

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "messages" | "projects">("overview");

  const [title, setTitle] = useState(""); const [desc, setDesc] = useState(""); const [imageUrl, setImageUrl] = useState(""); const [tags, setTags] = useState("");
  const ADMIN_PASS = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) { setAuthenticated(true); fetchData(); } else alert("WRONG PASSWORD!");
  };

  const fetchData = async () => {
    const { data: msgData } = await supabase.from("anonymous_messages").select("*").order("created_at", { ascending: false });
    if (msgData) setMessages(msgData);
    const { data: projData } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (projData) setProjects(projData);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("projects").insert([{ title, description: desc, image_url: imageUrl, tags: tags.split(",").map(t => t.trim()) }]).select();
    if (!error && data) { setProjects([data[0], ...projects]); setTitle(""); setDesc(""); setImageUrl(""); setTags(""); alert("SAVED!"); }
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm("DELETE THIS?")) return;
    await supabase.from(table).delete().eq("id", id);
    if (table === "projects") setProjects(projects.filter(p => p.id !== id)); else setMessages(messages.filter(m => m.id !== id));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)' }}>
        <div className="bg-yellow-100 border-4 border-black p-10 shadow-[16px_16px_0px_0px_#000] w-full max-w-md rotate-[-2deg]">
          <h2 className="text-4xl font-black uppercase mb-8 text-center border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_#000]">ADMIN LOGIN</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" placeholder="ENTER PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_#000] focus:outline-none text-xl" />
            <button type="submit" className="w-full py-4 rounded-xl border-[3px] border-black bg-blue-400/50 backdrop-blur-xl shadow-[6px_6px_0px_0px_#000,inset_0_0_20px_rgba(255,255,255,0.7)] text-black font-black text-2xl uppercase hover:bg-blue-500/70 transition-all">
              ACCESS SYSTEM
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-black" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)' }}>
      {/* TOPBAR */}
      <header className="bg-white border-b-4 border-black p-5 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-3xl font-black uppercase">SYSTEM ADMIN</h1>
        <button onClick={() => setAuthenticated(false)} className="px-6 py-2 rounded-xl border-[3px] border-black bg-red-400/50 backdrop-blur-xl shadow-[4px_4px_0px_0px_#000,inset_0_0_10px_rgba(255,255,255,0.6)] font-black hover:bg-red-500/70 flex items-center gap-2">
          <LogOut className="w-5 h-5" /> EXIT
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col md:flex-row gap-10">
        {/* SIDEBAR */}
        <div className="w-full md:w-64 flex flex-col gap-4">
          {[
            { id: "overview", label: "OVERVIEW", icon: BarChart3, color: "bg-blue-300" },
            { id: "messages", label: "INBOX", icon: MessageSquare, color: "bg-yellow-300" },
            { id: "projects", label: "PROJECTS", icon: FolderKanban, color: "bg-green-300" },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-3 p-4 border-4 border-black font-black text-lg uppercase transition-all ${activeTab === tab.id ? `${tab.color} translate-x-3 shadow-[6px_6px_0px_0px_#000]` : "bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_#000]"}`}>
              <tab.icon className="w-6 h-6" /> {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 space-y-10">
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-yellow-100 p-8 border-4 border-black shadow-[10px_10px_0px_0px_#000]">
                  <h3 className="font-black text-xl uppercase mb-4">Total Inbox</h3><p className="text-7xl font-black">{messages.length}</p>
                </div>
                <div className="bg-green-200 p-8 border-4 border-black shadow-[10px_10px_0px_0px_#000]">
                  <h3 className="font-black text-xl uppercase mb-4">Live Projects</h3><p className="text-7xl font-black">{projects.length}</p>
                </div>
              </div>
              <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_#000]">
                <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2"><Activity /> SYSTEM LOGS</h3>
                <div className="space-y-4 font-mono font-bold text-lg"><p className="p-3 bg-gray-100 border-2 border-black">[OK] Connection secure.</p><p className="p-3 bg-blue-100 border-2 border-black">[API] Fonnte WA Service Active.</p></div>
              </div>
            </>
          )}

          {activeTab === "messages" && (
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase mb-8 bg-yellow-300 inline-block px-6 py-2 border-4 border-black shadow-[6px_6px_0px_0px_#000]">INBOX</h2>
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#000] flex justify-between items-start">
                  <div>
                    <span className="bg-black text-white px-3 py-1 font-bold mb-4 inline-block">{new Date(msg.created_at).toLocaleString("id-ID")}</span>
                    <p className="font-bold text-2xl font-mono">{msg.content}</p>
                  </div>
                  <button onClick={() => handleDelete("anonymous_messages", msg.id)} className="p-3 rounded-xl border-[3px] border-black bg-red-400/50 backdrop-blur-xl shadow-[4px_4px_0px_0px_#000,inset_0_0_10px_rgba(255,255,255,0.6)] hover:bg-red-500/70"><Trash2 className="w-6 h-6" /></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-10">
              <form onSubmit={handleAddProject} className="bg-blue-100 p-8 border-4 border-black shadow-[10px_10px_0px_0px_#000] space-y-6">
                <h3 className="text-2xl font-black uppercase flex items-center gap-2 mb-6"><Plus className="w-8 h-8" /> ADD PROJECT</h3>
                <div className="grid grid-cols-2 gap-6">
                  <input placeholder="TITLE" value={title} onChange={(e) => setTitle(e.target.value)} required className="p-4 border-4 border-black font-bold uppercase shadow-[4px_4px_0px_0px_#000] focus:outline-none col-span-2 sm:col-span-1 text-lg" />
                  <input placeholder="TAGS (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="p-4 border-4 border-black font-bold uppercase shadow-[4px_4px_0px_0px_#000] focus:outline-none col-span-2 sm:col-span-1 text-lg" />
                  <input placeholder="IMAGE URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="p-4 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] focus:outline-none col-span-2 text-lg" />
                  <textarea placeholder="DESCRIPTION" value={desc} onChange={(e) => setDesc(e.target.value)} required className="p-4 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] focus:outline-none col-span-2 resize-none h-32 text-lg" />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl border-[3px] border-black bg-green-400/50 backdrop-blur-xl shadow-[6px_6px_0px_0px_#000,inset_0_0_20px_rgba(255,255,255,0.7)] text-black font-black text-2xl uppercase hover:bg-green-500/70 transition-all">
                  SAVE PROJECT
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}