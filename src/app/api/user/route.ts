import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface UserRequest {
  userId: string;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId } = (await request.json()) as UserRequest;
    if (!userId) {
      return NextResponse.json(
        {
          message: "Invalid user ID",
        },
        { status: 400 }
      );
    }
    let user = await prisma.user.findUnique({
      where: { userId: userId },
    });
    if (!user) {
      user = await prisma.user.create({
        data: { userId: userId },
      });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
