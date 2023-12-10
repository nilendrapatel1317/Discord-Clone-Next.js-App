import { NextResponse } from "next/server";

import { currentProfile } from "../../../lib/currentProfile";
import { db } from "../../../lib/db";

export async function GET(req) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const channelId = searchParams.get("channelId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const messages = await db.message.findMany({
      where: {
        channelId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      items: messages,
    });
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
