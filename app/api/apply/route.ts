import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { applySchema } from "@/lib/apply-schema";
import { saveApplication } from "@/lib/application-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = applySchema.parse(body);

    await saveApplication(payload);

    return NextResponse.json({
      ok: true,
      message: "Application received.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please check the highlighted fields.",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    console.error("Application submission failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "We could not submit your application. Please try again.",
      },
      { status: 500 },
    );
  }
}
