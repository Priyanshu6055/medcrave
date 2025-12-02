import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  const categories = await Product.distinct("category");

  return Response.json({
    success: true,
    categories,
  });
}
