"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle2, Loader2, MessageCircleHeart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MAX_LENGTH = 500;

export default function AnonymousForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);

    // 1. Kirim pesan ke database Supabase
    const { error } = await supabase
      .from("anonymous_messages")
      .insert([{ content: message }]);

    setLoading(false);

    if (error) {
      alert("Gagal mengirim pesan: " + error.message);
    } else {
      setSent(true);
      const currentMessage = message; // Simpan teks untuk dikirim ke notif
      setMessage("");

      // 2. SINKRONISASI FASE 4: Trigger Push Notification ke HP via OneSignal
      fetch("https://onesignal.com/api/v1/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Pastikan nanti ganti ini dengan REST API Key dari OneSignal Dashboard
          "Authorization": "Basic GANTI_DENGAN_REST_API_KEY_ONESIGNAL_LU" 
        },
        body: JSON.stringify({
          app_id: "GANTI_DENGAN_ONESIGNAL_APP_ID_LU", // Ganti dengan App ID OneSignal lu
          included_segments: ["All"], 
          headings: { en: "💬 Pesan Anonim Baru!" },
          contents: { en: currentMessage },
          url: "http://localhost:3000/admin" // Pas production ganti ke domain Vercel lu
        })
      }).catch((err) => console.log("Push Notification Error:", err));

      setTimeout(() => setSent(false), 4000); // Reset status sukses setelah 4 detik
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow dekoratif */}
      <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-[2rem] blur-2xl pointer-events-none" />

      <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-xl shadow-purple-500/5 p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-md shadow-purple-500/30 shrink-0">
            <MessageCircleHeart className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-purple-400 uppercase">
              Ruang Aman
            </p>
            <h3 className="text-lg font-bold text-white leading-tight">
              Kirim Pesan Anonim
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-400 mb-4 mt-2">
          Kritik, saran, atau sekadar curhat? Tulis di sini tanpa takut ketahuan identitas lu.
        </p>

        {sent ? (
          <div className="flex flex-col items-center text-center gap-2 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-emerald-400">
              Pesan lu udah terkirim secara anonim!
            </p>
            <p className="text-xs text-emerald-400/70">
              Makasih udah percaya buat cerita di sini.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pesan rahasia lu di sini..."
              maxLength={MAX_LENGTH}
              className="bg-slate-950/50 border-slate-800 text-slate-100 placeholder:text-slate-500 min-h-[100px] focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none rounded-xl"
              required
            />
            <div className="flex items-center justify-between px-0.5">
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Identitas lu nggak disimpan
              </span>
              <span className="text-[11px] text-slate-500">
                {message.length}/{MAX_LENGTH}
              </span>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 rounded-xl transition-all shadow-md shadow-purple-500/30 hover:shadow-lg hover:shadow-purple-500/40 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
              Kirim Anonim
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}