import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
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

  // IMPORTANT FIX — use "await cookies()" not "cookies()"
  const cookieStore = await cookies();

  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return Response.json({
    success: true,
    message: "Login successful",
  });
}
