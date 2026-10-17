import { NextRequest, NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, event, dodgeCount } = body;

    const userAgent = req.headers.get("user-agent") || undefined;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    let telegramText = "";

    switch (event) {
      case "opened":
        telegramText = "🌸 <b>Yangi tashrif!</b>\nFoydalanuvchi maxsus taklifnomani ochdi.";
        break;

      case "trust_yes":
        telegramText = `💖 <b>Ishonch savoliga javob berildi:</b>\n<i>"Yes, I do"</i> bosildi! ✨`;
        if (dodgeCount && dodgeCount > 0) {
          telegramText += `\n🏃‍♀️ <i>("No" tugmasini ${dodgeCount} marta bosmoqchi bo'lib qochirdi 😂)</i>`;
        }
        break;

      case "status_free":
        telegramText = `💌 <b>Status savoliga javob:</b>\n<i>"Yo'q, bo'sh"</i> tanlandi! (5A bosqichga o'tildi)`;
        break;

      case "status_busy":
        telegramText = `🕊️ <b>Status savoliga javob:</b>\n<i>"Ha, band"</i> tanlandi. (5B muloyim xayrlashuvga o'tildi)`;
        break;

      default:
        telegramText = `🔔 <b>Harakat kuzatildi:</b> <code>${event}</code>`;
    }

    // Send Telegram alert in background
    await sendTelegramNotification(telegramText, { token, userAgent, ip });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[API track] Error:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
