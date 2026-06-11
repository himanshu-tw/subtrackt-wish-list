import { getDb } from "@/db";
import { waitlist } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    await getDb().insert(waitlist).values({ email });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";

    if (message.includes("unique") || message.includes("duplicate")) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 },
      );
    }

    console.error("Waitlist signup failed:", error);
    return NextResponse.json(
      { error: "Failed to join the waitlist. Please try again." },
      { status: 500 },
    );
  }
}
