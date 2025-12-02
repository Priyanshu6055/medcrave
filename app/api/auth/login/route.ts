import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return Response.json({ success: false, message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return Response.json({ success: false, message: "Wrong password" });
    }

    const token = generateToken(admin._id.toString());

    // 🍪 NEXT.JS 16 FIX — async cookies
    const cookieStore = await cookies();
    await cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({
      success: true,
      message: "Login successful",
    });

  } catch (e: any) {
    console.error("LOGIN API ERROR:", e);
    return Response.json(
      { success: false, message: "Server crashed", error: e.message },
      { status: 500 }
    );
  }
}
