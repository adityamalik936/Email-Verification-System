import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodel";
import {connect} from "@/dbconfig/dbconfig";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email } = body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const token = Math.random().toString(36).substring(2);

    user.forgotPasswordToken = token;

    user.forgotPasswordTokenExpiry = Date.now() + 3600000;

    await user.save();

    return NextResponse.json({
      message: "Token Generated",
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
