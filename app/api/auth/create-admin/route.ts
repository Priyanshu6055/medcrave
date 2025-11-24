import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function GET() {
  await connectDB();

  const adminExists = await Admin.findOne({ email: "admin@example.com" });
  if (adminExists) {
    return Response.json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    name: "Super Admin",
    email: "admin@example.com",
    password: hashedPassword,
  });

  return Response.json({
    message: "Admin created successfully",
    email: "admin@example.com",
    password: "admin123",
  });
}
