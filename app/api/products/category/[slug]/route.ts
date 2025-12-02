import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(request: Request, context: any) {
  await connectDB();

  const params = await context.params; // FIX for Next.js 16
  const slug = params.slug;

  const products = await Product.find({ category: slug });

  return Response.json({
    success: true,
    products,
  });
}
