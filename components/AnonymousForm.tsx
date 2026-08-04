"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Send } from "lucide-react";

export default function AnonymousForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("anonymous_messages").insert([{ content: message }]);
    setLoading(false);
    if (error) { alert("Error: " + error.message); } 
    else {
      setSent(true);
      fetch("/api/send-wa", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messageContent: message }) }).catch(console.error);
      setMessage(""); setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <div className="relative transform-style-3d hover:rotate-y-6 hover:-rotate-x-2 transition-transform duration-700">
      <div className="bg-[#fef08a] border-4 border-black p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        {sent ? (
          <div className="py-20 text-center font-black text-4xl uppercase border-4 border-black border-dashed bg-green-300">
            MESSAGE SENT!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-black text-2xl uppercase bg-white border-4 border-black inline-block px-4 py-2 shadow-[4px_4px_0px_0px_#000]">CONTACT FORM</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full min-h-[200px] p-6 bg-white border-4 border-black focus:outline-none focus:ring-0 font-mono font-bold text-xl shadow-[8px_8px_0px_0px_#000] resize-none"
              placeholder="Type your anonymous message here..."
            />
            {/* LIQUID GLASS BUTTON (Black Border Edition) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-xl border-[3px] border-black bg-blue-300/50 backdrop-blur-xl shadow-[6px_6px_0px_0px_#000,inset_0_0_20px_rgba(255,255,255,0.7)] text-black font-black text-2xl uppercase tracking-widest hover:bg-blue-400/70 transition-all flex justify-center items-center gap-3"
            >
              {loading ? "SENDING PROTOCOL..." : <><Send className="w-6 h-6" /> FIRE MESSAGE</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}