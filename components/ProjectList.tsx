"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ExternalLink, Code2, FolderOpen } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url?: string;
  github_url?: string;
  tags: string[];
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-3xl overflow-hidden liquid-glass animate-pulse border border-[#d99153]/20">
            <div className="w-full h-56 bg-[#2d160b]/40" />
            <div className="p-6 space-y-4">
              <div className="h-6 bg-[#2d160b]/60 rounded-lg w-2/3" />
              <div className="h-4 bg-[#2d160b]/60 rounded-lg w-full" />
              <div className="h-4 bg-[#2d160b]/60 rounded-lg w-4/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="liquid-glass flex flex-col items-center gap-4 text-center py-20 px-8 rounded-3xl border-2 border-dashed border-[#d99153]/30">
        <div className="w-20 h-20 rounded-full bg-[#d99153]/10 flex items-center justify-center animate-pulse">
          <FolderOpen className="w-10 h-10 text-[#d99153]" />
        </div>
        <p className="text-2xl font-bold text-[#fbe6d4]">Database Kosong</p>
        <p className="text-base text-[#a3836b] max-w-md">
          Belum ada portofolio yang di-upload. Tunggu update karya terbaik selanjutnya via Dashboard Admin.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((item) => (
        <div
          key={item.id}
          className="group liquid-glass rounded-3xl overflow-hidden hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(217,145,83,0.2)] transition-all duration-500 perspective-[1000px]"
        >
          {item.image_url && (
            <div className="relative overflow-hidden h-60">
              {/* Overlay Gradient Brown */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0503] opacity-60 z-10" />
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700"
              />

              {item.tags?.[0] && (
                <span className="absolute top-4 left-4 z-20 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl bg-[#0a0503]/80 backdrop-blur-md border border-[#d99153]/50 text-[#d99153] shadow-lg">
                  {item.tags[0]}
                </span>
              )}

              {/* Tombol Aksi Liquid Glass Hover */}
              {(item.project_url || item.github_url) && (
                <div className="absolute inset-0 z-30 bg-[#0a0503]/20 group-hover:bg-[#0a0503]/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-all duration-500 backdrop-blur-sm">
                  {item.project_url && (
                    <a
                      href={item.project_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-14 h-14 rounded-2xl liquid-glass flex items-center justify-center text-[#fbe6d4] hover:text-[#0a0503] hover:bg-[#d99153] hover:scale-110 transition-all duration-300"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  )}
                  {item.github_url && (
                    <a
                      href={item.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-14 h-14 rounded-2xl liquid-glass flex items-center justify-center text-[#fbe6d4] hover:text-[#0a0503] hover:bg-[#d99153] hover:scale-110 transition-all duration-300"
                    >
                      <Code2 className="w-6 h-6" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="p-8 space-y-4">
            <h3 className="text-2xl font-bold text-[#fbe6d4] group-hover:text-[#d99153] transition-colors">
              {item.title}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {item.tags?.slice(1).map((tag, idx) => (
                <span key={idx} className="text-xs font-semibold px-2 py-1 bg-[#d99153]/10 text-[#d99153] rounded-lg border border-[#d99153]/20">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-base text-[#a3836b] leading-relaxed line-clamp-3">
              {item.description}
            </p>

            {/* Mobile Actions */}
            <div className="flex items-center gap-6 pt-4 text-sm md:hidden">
              {item.project_url && (
                <a href={item.project_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#d99153] font-bold">
                  <ExternalLink className="w-4 h-4" /> Preview Web
                </a>
              )}
              {item.github_url && (
                <a href={item.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#a3836b] hover:text-[#fbe6d4] font-bold">
                  <Code2 className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}