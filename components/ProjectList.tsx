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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden animate-pulse"
          >
            <div className="w-full h-48 bg-slate-800" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-800 rounded w-full" />
              <div className="h-3 bg-slate-800 rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 text-center py-14 px-6 bg-slate-900/40 rounded-2xl border-2 border-dashed border-slate-800">
        <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center">
          <FolderOpen className="w-7 h-7 text-purple-400" />
        </div>
        <p className="font-semibold text-white">Belum ada project</p>
        <p className="text-sm text-slate-400 max-w-xs">
          Belum ada project yang ditambahkan. Nanti bisa disi lewat Dashboard Admin!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map((item) => (
        <div
          key={item.id}
          className="group bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
        >
          {item.image_url && (
            <div className="relative overflow-hidden">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Chip tag pertama di pojok gambar */}
              {item.tags?.[0] && (
                <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-md bg-slate-950/70 backdrop-blur-sm border border-slate-700 text-slate-200">
                  {item.tags[0]}
                </span>
              )}

              {/* Overlay hover untuk desktop: quick-action buttons */}
              {(item.project_url || item.github_url) && (
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300">
                  {item.project_url && (
                    <a
                      href={item.project_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live Demo"
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {item.github_url && (
                    <a
                      href={item.github_url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Source Code"
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all"
                    >
                      <Code2 className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="p-5 space-y-2">
            <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
            {item.tags?.[1] && (
              <p className="text-xs font-medium text-purple-400">{item.tags[1]}</p>
            )}
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
              {item.description}
            </p>

            {/* Tautan cadangan untuk HP (overlay hover nggak kepakai di touchscreen) */}
            <div className="flex items-center gap-4 pt-2 text-xs sm:hidden">
              {item.project_url && (
                <a
                  href={item.project_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-purple-400 font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
              {item.github_url && (
                <a
                  href={item.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-slate-400 font-medium"
                >
                  <Code2 className="w-3.5 h-3.5" /> Source
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
