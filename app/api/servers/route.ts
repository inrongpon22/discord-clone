/** @format */

import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, image_url } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profile_id: profile.id,
        name,
        image_url,
        invite_code: uuidv4(),
        channels: {
          create: [{ name: "general", profile_id: profile.id }],
        },
        members: {
          create: [{ profile_id: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server)
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
