"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Send,
  CheckCircle2,
  Loader2,
  MessageCircleHeart,
  ShieldAlert,
} from "lucide-react";

const MAX_LENGTH = 500;

export default function AnonymousForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);

    const { error } = await supabase
      .from("anonymous_messages")
      .insert([{ content: message }]);

    setLoading(false);

    if (error) {
      alert("Gagal mengirim pesan: " + error.message);
    } else {
      setSent(true);
      const currentMsg = message;
      setMessage("");

      fetch("/api/send-wa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageContent: currentMsg }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Hasil kirim WA:", data))
        .catch((err) => console.error("Error trigger WA:", err));

      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto perspective-[1000px]">
      <div className="relative liquid-glass rounded-3xl p-8 sm:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.7)] transform transition-transform duration-500 hover:rotate-x-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 border-b border-[#d99153]/20 pb-6">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d99153] to-[#8b4513] shadow-[0_5px_15px_rgba(217,145,83,0.4)] shrink-0 animate-pulse">
            <MessageCircleHeart className="w-7 h-7 text-[#0a0503]" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#fbe6d4] tracking-wide">
              Direct Secure Message
            </h3>
            <p className="text-sm text-[#a3836b] mt-1">
              Kirim keluh kesah, *feedback*, atau ngajak collab tanpa ninggalin jejak IP atau Identitas.
            </p>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center gap-3 p-10 rounded-2xl bg-[#d99153]/10 border border-[#d99153]/40 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-[#d99153]/20 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-8 h-8 text-[#d99153]" />
            </div>
            <p className="text-xl font-bold text-[#fbe6d4]">
              Data Terenkripsi & Terkirim
            </p>
            <p className="text-sm text-[#a3836b]">
              Pesan lu udah meluncur ke WhatsApp gua!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ketik rahasia atau pesan lu di sini..."
                maxLength={MAX_LENGTH}
                required
                className="w-full min-h-[160px] resize-none rounded-2xl px-6 py-5 text-base text-[#fbe6d4] placeholder:text-[#a3836b] bg-[#0a0503]/50 backdrop-blur-md border border-[#d99153]/20 focus:outline-none focus:ring-4 focus:ring-[#d99153]/20 focus:border-[#d99153]/70 transition-all duration-300 shadow-inner"
              />
              <div className="absolute bottom-4 right-4 text-xs font-mono text-[#d99153] bg-[#0a0503]/80 px-2 py-1 rounded-md">
                {message.length}/{MAX_LENGTH}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-xs text-[#a3836b]">
                <ShieldAlert className="w-4 h-4 text-[#d99153]" />
                *Fully Anonymous & End-to-End Handled*
              </span>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto relative overflow-hidden liquid-glass px-8 py-4 rounded-xl text-[#fbe6d4] font-bold tracking-widest uppercase hover:bg-[#d99153]/20 transition-all duration-300 group flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Send Protocol</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}