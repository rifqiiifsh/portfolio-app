import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messageContent } = await req.json();

    const targetNumber = process.env.ADMIN_WA_NUMBER;
    const fonnteToken = process.env.FONNTE_TOKEN;

    if (!fonnteToken || !targetNumber) {
      return NextResponse.json({ error: "Token atau Nomor WA belum diset" }, { status: 500 });
    }

    // Format pesan WA yang dikirim ke HP lu
    const waText = `🚨 *PESAN ANONIM BARU MASUK!* 🚨\n\n💬 *Isi Pesan:*\n"${messageContent}"\n\n⏰ *Waktu:* ${new Date().toLocaleString("id-ID")}\n\n👉 *Buka Dashboard Admin:* https://website-lu.vercel.app/admin`;

    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: fonnteToken,
      },
      body: new URLSearchParams({
        target: targetNumber,
        message: waText,
      }),
    });

    const result = await response.json();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengirim notif WA" }, { status: 500 });
  }
}