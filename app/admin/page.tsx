"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Trash2, Plus, MessageSquare, FolderKanban, LogOut, 
  BarChart3, Activity, Loader2, Edit3, Eye, Users, ShieldAlert, Image as ImageIcon 
} from "lucide-react";

interface Message { 
  id: string; 
  content: string; 
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
  created_at?: string; 
}

interface VisitorLog {
  id: string;
  ip_address: string;
  user_agent: string;
  visited_at: string;
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "messages" | "projects" | "visitors">("overview");
  const [loadingAction, setLoadingAction] = useState(false);

  // State untuk Edit Project (Mode Edit vs Create)
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State Project (Termasuk kolom gambar/thumbnail)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [tags, setTags] = useState("");

  const ADMIN_PASS = "admin123"; // Bisa diganti sesuai keinginan

  // 1. Catat pengunjung otomatis ke database tanpa login saat halaman admin / web diakses
  useEffect(() => {
    async function logVisitor() {
      try {
        const userAgent = navigator.userAgent;
        // Simulasi pencatatan log pengunjung anonim ke tabel 'visitors'
        await supabase.from("visitors").insert([
          { user_agent: userAgent, ip_address: "Visitor-Anonym" }
        ]);
      } catch (err) {
        console.error("Gagal mencatat log visitor:", err);
      }
    }
    logVisitor();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setAuthenticated(true);
      fetchData();
    } else {
      alert("WRONG PASSWORD!");
    }
  };

  const fetchData = async () => {
    try {
      // Ambil Pesan Anonim
      const { data: msgData } = await supabase
        .from("anonymous_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (msgData) setMessages(msgData);

      // Ambil Data Proyek
      const { data: projData } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (projData) setProjects(projData);

      // Ambil Log Pengunjung (Monitoring Siapa yang Masuk)
      const { data: visitorData } = await supabase
        .from("visitors")
        .select("*")
        .order("visited_at", { ascending: false })
        .limit(50);
      if (visitorData) setVisitors(visitorData);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Fungsi Tambah atau Update Proyek (CRUD: Create & Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAction(true);

    const tagArray = tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [];
    if (editingId) {
      // Update Project yang sudah ada
      const { error } = await supabase
        .from("projects")
        .update({
          title,
          description: desc,
          image_url: imageUrl,
          project_url: projectUrl,
          github_url: githubUrl,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean)
        })
        .eq("id", editingId);

      setLoadingAction(false);
      if (error) {
        alert("GAGAL UPDATE: " + error.message);
      } else {
        alert("PROJECT BERHASIL DIPERBARUI!");
        resetForm();
        fetchData();
      }
    } else {
      // Insert Project Baru
      const { error } = await supabase
        .from("projects")
        .insert([{
          title,
          description: desc,
          image_url: imageUrl,
          project_url: projectUrl,
          github_url: githubUrl,
          tags: tags.split(",").map(t => t.trim()).filter(Boolean)
        }]);

      setLoadingAction(false);
      if (error) {
        alert("GAGAL MENYIMPAN: " + error.message);
      } else {
        alert("PROJECT BARU BERHASIL DITAMBAHKAN!");
        resetForm();
        fetchData();
      }
    }
  };

  // Isi form dengan data yang mau diedit
  const handleEditClick = (proj: Project) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setDesc(proj.description);
    setImageUrl(proj.image_url || "");
    setProjectUrl(proj.project_url || "");
    setGithubUrl(proj.github_url || "");
    setTags(proj.tags ? proj.tags.join(", ") : "");
    setActiveTab("projects");
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDesc("");
    setImageUrl("");
    setProjectUrl("");
    setGithubUrl("");
    setTags("");
  };

  // Fungsi Hapus (CRUD: Delete)
  const handleDelete = async (table: string, id: string) => {
    if (!confirm("YAKIN MAU DIHAPUS?")) return;

    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
      return;
    }

    if (table === "projects") {
      setProjects(projects.filter(p => p.id !== id));
    } else {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 font-sans" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)' }}>
        <div className="bg-yellow-100 border-4 border-black p-10 shadow-[16px_16px_0px_0px_#000] w-full max-w-md rotate-[-2deg]">
          <h2 className="text-4xl font-black uppercase mb-8 text-center border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_#000]">ADMIN LOGIN</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="ENTER PASSWORD (admin123)" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-4 border-4 border-black font-black uppercase shadow-[6px_6px_0px_0px_#000] focus:outline-none text-xl bg-white" 
            />
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
        <h1 className="text-3xl font-black uppercase flex items-center gap-2">
          <span className="w-4 h-4 bg-green-400 border-2 border-black inline-block animate-pulse" />
          SYSTEM ADMIN PORTAL
        </h1>
        <button onClick={() => setAuthenticated(false)} className="px-6 py-2 rounded-xl border-[3px] border-black bg-red-400/50 backdrop-blur-xl shadow-[4px_4px_0px_0px_#000,inset_0_0_10px_rgba(255,255,255,0.6)] font-black hover:bg-red-500/70 flex items-center gap-2">
          <LogOut className="w-5 h-5" /> EXIT
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col md:flex-row gap-10">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="w-full md:w-64 flex flex-col gap-4">
          {[
            { id: "overview", label: "OVERVIEW", icon: BarChart3, color: "bg-blue-300" },
            { id: "messages", label: `INBOX (${messages.length})`, icon: MessageSquare, color: "bg-yellow-300" },
            { id: "projects", label: `PROJECTS (${projects.length})`, icon: FolderKanban, color: "bg-green-300" },
            { id: "visitors", label: `VISITORS (${visitors.length})`, icon: Users, color: "bg-pink-300" },
          ].map((tab) => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as any)} 
              className={`flex items-center gap-3 p-4 border-4 border-black font-black text-lg uppercase transition-all ${activeTab === tab.id ? `${tab.color} translate-x-3 shadow-[6px_6px_0px_0px_#000]` : "bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_#000]"}`}
            >
              <tab.icon className="w-6 h-6" /> {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 space-y-10">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-yellow-100 p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                  <h3 className="font-black text-lg uppercase mb-2">Total Inbox</h3>
                  <p className="text-5xl font-black">{messages.length}</p>
                </div>
                <div className="bg-green-200 p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                  <h3 className="font-black text-lg uppercase mb-2">Live Projects</h3>
                  <p className="text-5xl font-black">{projects.length}</p>
                </div>
                <div className="bg-pink-200 p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000]">
                  <h3 className="font-black text-lg uppercase mb-2">Total Visitors</h3>
                  <p className="text-5xl font-black">{visitors.length}</p>
                </div>
              </div>
              <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_#000]">
                <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2"><Activity /> SYSTEM LOGS</h3>
                <div className="space-y-4 font-mono font-bold text-sm">
                  <p className="p-3 bg-gray-100 border-2 border-black">[OK] Database Supabase Connected.</p>
                  <p className="p-3 bg-blue-100 border-2 border-black">[TRACKER] Live visitor monitoring active (Anonymously tracked).</p>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: INBOX PESAN ANONIM */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase mb-8 bg-yellow-300 inline-block px-6 py-2 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                INBOX ({messages.length})
              </h2>
              {messages.length === 0 ? (
                <div className="bg-white p-8 border-4 border-black font-bold text-xl uppercase shadow-[6px_6px_0px_0px_#000]">
                  Belum ada pesan masuk.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000] flex justify-between items-start gap-4">
                    <div>
                      <span className="bg-black text-white px-3 py-1 font-bold mb-3 inline-block text-xs">
                        {new Date(msg.created_at).toLocaleString("id-ID")}
                      </span>
                      <p className="font-bold text-xl font-mono whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete("anonymous_messages", msg.id)} 
                      className="p-3 rounded-xl border-[3px] border-black bg-red-400/50 backdrop-blur-xl shadow-[4px_4px_0px_0px_#000] hover:bg-red-500/70 shrink-0"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: PROJECTS (CRUD LENGKAP + KOLOM GAMBAR/THUMBNAIL) */}
          {activeTab === "projects" && (
            <div className="space-y-10">
              <form onSubmit={handleSaveProject} className="bg-blue-100 p-8 border-4 border-black shadow-[10px_10px_0px_0px_#000] space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black uppercase flex items-center gap-2">
                    <Plus className="w-8 h-8" /> {editingId ? "EDIT PROJECT" : "ADD NEW PROJECT"}
                  </h3>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="px-4 py-1 bg-white border-2 border-black font-bold text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input 
                    placeholder="TITLE PROYEK" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    className="p-4 border-4 border-black font-bold uppercase shadow-[4px_4px_0px_0px_#000] focus:outline-none text-lg bg-white" 
                  />
                  <input 
                    placeholder="TAGS (pisahkan koma: Laravel, Tailwind)" 
                    value={tags} 
                    onChange={(e) => setTags(e.target.value)} 
                    className="p-4 border-4 border-black font-bold uppercase shadow-[4px_4px_0px_0px_#000] focus:outline-none text-lg bg-white" 
                  />
                  
                  {/* Kolom Khusus Gambar / Thumbnail */}
                  <div className="col-span-full space-y-2">
                    <label className="font-black text-sm uppercase flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" /> Link Gambar / Thumbnail Proyek (URL)
                    </label>
                    <input 
                      placeholder="https://images.unsplash.com/... (atau link gambar kamu)" 
                      value={imageUrl} 
                      onChange={(e) => setImageUrl(e.target.value)} 
                      className="w-full p-4 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] focus:outline-none text-lg bg-white" 
                    />
                  </div>

                  <input 
                    placeholder="LIVE DEMO URL (opsional)" 
                    value={projectUrl} 
                    onChange={(e) => setProjectUrl(e.target.value)} 
                    className="p-4 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] focus:outline-none text-lg bg-white" 
                  />
                  <input 
                    placeholder="GITHUB REPO URL (opsional)" 
                    value={githubUrl} 
                    onChange={(e) => setGithubUrl(e.target.value)} 
                    className="p-4 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] focus:outline-none text-lg bg-white" 
                  />
                  <textarea 
                    placeholder="DESKRIPSI PROYEK" 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} 
                    required 
                    className="p-4 border-4 border-black font-bold shadow-[4px_4px_0px_0px_#000] focus:outline-none col-span-full resize-none h-32 text-lg bg-white" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loadingAction}
                  className="w-full py-4 rounded-xl border-[3px] border-black bg-green-400/50 backdrop-blur-xl shadow-[6px_6px_0px_0px_#000,inset_0_0_20px_rgba(255,255,255,0.7)] text-black font-black text-2xl uppercase hover:bg-green-500/70 transition-all flex items-center justify-center gap-2"
                >
                  {loadingAction ? <Loader2 className="w-6 h-6 animate-spin" /> : (editingId ? "UPDATE PROJECT" : "SAVE PROJECT TO DATABASE")}
                </button>
              </form>

              {/* LIST PROJECT TERPASANG (DENGAN TOMBOL EDIT & DELETE) */}
              <div className="space-y-6">
                <h3 className="text-3xl font-black uppercase bg-green-300 inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_#000]">
                  DAFTAR PROJECT TERPASANG ({projects.length})
                </h3>
                
                {projects.length === 0 ? (
                  <div className="bg-white p-6 border-4 border-black font-bold uppercase shadow-[6px_6px_0px_0px_#000]">
                    Belum ada project di database.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {projects.map((proj) => (
                      <div key={proj.id} className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col justify-between gap-4">
                        <div className="space-y-3">
                          {proj.image_url && (
                            <div className="w-full h-40 border-2 border-black overflow-hidden bg-gray-100">
                              <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <h4 className="font-black text-xl uppercase">{proj.title}</h4>
                          <p className="text-xs font-mono text-gray-600 line-clamp-2">{proj.description}</p>
                          {proj.tags && proj.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {proj.tags.map((t, i) => (
                                <span key={i} className="text-[10px] font-bold border-2 border-black px-2 py-0.5 bg-yellow-100">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 pt-2 border-t-2 border-black">
                          <button 
                            onClick={() => handleEditClick(proj)} 
                            className="flex-1 py-2 rounded-lg border-2 border-black bg-blue-300 font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] hover:bg-blue-400 flex justify-center items-center gap-1"
                          >
                            <Edit3 className="w-4 h-4" /> EDIT
                          </button>
                          <button 
                            onClick={() => handleDelete("projects", proj.id)} 
                            className="flex-1 py-2 rounded-lg border-2 border-black bg-red-300 font-black uppercase text-xs shadow-[3px_3px_0px_0px_#000] hover:bg-red-400 flex justify-center items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" /> DELETE
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: VISITOR MONITORING (Melihat Siapa yang Masuk Tanpa Login) */}
          {activeTab === "visitors" && (
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase mb-4 bg-pink-300 inline-block px-6 py-2 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                VISITOR LOGS ({visitors.length})
              </h2>
              <p className="font-mono text-sm text-gray-700 bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                Catatan otomatis perangkat / pengunjung yang mengakses situs ini secara real-time tanpa perlu login terlebih dahulu.
              </p>

              {visitors.length === 0 ? (
                <div className="bg-white p-6 border-4 border-black font-bold uppercase shadow-[6px_6px_0px_0px_#000]">
                  Belum ada log pengunjung tercatat.
                </div>
              ) : (
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] overflow-x-auto">
                  <table className="w-full text-left border-collapse font-mono text-sm">
                    <thead>
                      <tr className="bg-yellow-200 border-b-4 border-black">
                        <th className="p-4 border-r-2 border-black">Waktu Kunjungan</th>
                        <th className="p-4 border-r-2 border-black">Status User</th>
                        <th className="p-4">Informasi Browser / Perangkat (User Agent)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitors.map((v, index) => (
                        <tr key={v.id || index} className="border-b-2 border-black hover:bg-gray-50">
                          <td className="p-4 border-r-2 border-black text-xs font-bold">
                            {new Date(v.visited_at).toLocaleString("id-ID")}
                          </td>
                          <td className="p-4 border-r-2 border-black">
                            <span className="px-2 py-1 bg-green-200 border border-black text-[10px] font-black uppercase">
                              Anonim / Tanpa Login
                            </span>
                          </td>
                          <td className="p-4 text-xs text-gray-600 break-all">
                            {v.user_agent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}