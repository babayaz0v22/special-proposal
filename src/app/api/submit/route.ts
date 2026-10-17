import { NextRequest, NextResponse } from "next/server";
import { invalidateToken } from "@/lib/tokenStore";
import { sendTelegramNotification } from "@/lib/telegram";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, type, addressOrCafe, contact, dodgeCount, igAccept } = body;

    const userAgent = req.headers.get("user-agent") || undefined;
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    let telegramText = "";

    if (type === "success_5A") {
      telegramText = `🎉 <b>MAXSUS JAVOB YUBORILDI!</b> 💌\n\n` +
        `📸 <b>Instagram Request:</b> <i>${igAccept || "Tanlanmadi"}</i>\n\n` +
        `📍 <b>Uy manzili / Javob:</b>\n<i>${addressOrCafe || "Kiritilmadi"}</i>\n\n` +
        `📞 <b>Aloqa (Telegram/Tel/IG):</b>\n<code>${contact || "Kiritilmadi"}</code>\n\n` +
        `✨ <i>Bu ajoyib xushxabar! Onangiz bilan birga tashrif buyurishingiz mumkin.</i>`;

      if (dodgeCount && dodgeCount > 0) {
        telegramText += `\n\n<i>Eslatma: Boshida "No" tugmasini ${dodgeCount} marta qochirgan edi 😉</i>`;
      }
    } else if (type === "exit_5B") {
      telegramText = `🕊️ <b>Samimiy javob olindi (Band):</b>\n` +
        `Foydalanuvchi yuragi band ekanligini aytdi va 5B muloyim xayrlashuv qadamini ko'rdi.`;
    }

    // 1. Invalidate token permanently
    if (token) {
      await invalidateToken(token, {
        type,
        addressOrCafe,
        contact,
        ip,
        userAgent,
      });
    }

    // 2. Send Telegram Notification
    await sendTelegramNotification(telegramText, { token, userAgent, ip });

    const response = NextResponse.json({ success: true });

    // 3. Also set a secure cookie to lock this browser immediately
    if (token) {
      response.cookies.set(`consumed_${token}`, "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: false,
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("[API submit] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
