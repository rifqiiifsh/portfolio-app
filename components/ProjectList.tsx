"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MoveRight } from "lucide-react";

interface Project { id: string; title: string; description: string; image_url: string; project_url?: string; github_url?: string; tags: string[]; }

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (data) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) return <div className="text-2xl font-black animate-pulse bg-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_#000]">LOADING PROJECTS...</div>;
  if (projects.length === 0) return <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_#000] font-black text-2xl uppercase">No projects yet.</div>;

  return (
    <div className="grid grid-cols-1 gap-16">
      {projects.map((item, idx) => (
        <div key={item.id} className="relative group perspective-[1000px]">
          
          {/* Card Layout like a huge folder */}
          <div className="bg-black text-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 flex flex-col md:flex-row gap-10 transform-style-3d hover:rotate-x-2 transition-transform duration-500 relative">
            
            {/* Folder Tab Faux */}
            <div className="absolute -top-10 left-0 bg-yellow-400 text-black border-4 border-b-0 border-black px-6 py-2 font-black text-xl uppercase shadow-[8px_0px_0px_0px_#000]">
              PROJECT 0{idx + 1}
            </div>

            {/* Left: Text & LIQUID BUTTONS */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-4xl sm:text-6xl font-black uppercase mb-4 text-white drop-shadow-[4px_4px_0px_rgba(255,255,0,1)]">{item.title}</h3>
                <p className="font-mono text-gray-300 text-lg leading-relaxed mb-6">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-transparent border-2 border-white text-white font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Liquid Glass Buttons Action */}
              <div className="flex gap-4">
                {item.project_url && (
                  <a href={item.project_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/50 bg-white/20 backdrop-blur-lg shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.4)] font-black uppercase text-white hover:bg-white/40 transition-all">
                    VIEW PROJECT <MoveRight className="w-5 h-5" />
                  </a>
                )}
                {item.github_url && (
                  <a href={item.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-white/50 bg-white/20 backdrop-blur-lg shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.4)] font-black uppercase text-white hover:bg-white/40 transition-all">
                    SOURCE
                  </a>
                )}
              </div>
            </div>

            {/* Right: Image */}
            {item.image_url && (
              <div className="w-full md:w-1/2">
                <div className="border-4 border-white bg-gray-200 h-64 sm:h-full relative overflow-hidden group-hover:shadow-[8px_8px_0px_0px_rgba(255,255,0,1)] transition-all">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}