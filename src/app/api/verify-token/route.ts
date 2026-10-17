import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/tokenStore";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token") || "";

    const result = await verifyToken(token);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[API verify-token] Error:", error);
    return NextResponse.json(
      { valid: false, consumed: false, message: "Server error" },
      { status: 500 }
    );
  }
}
