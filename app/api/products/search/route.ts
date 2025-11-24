import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const skip = (page - 1) * limit;

  const filter = q.trim()
    ? {
        $or: [
          { name: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
          { tags: { $regex: q, $options: "i" } },
          { features: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);

  return Response.json({
    success: true,
    page,
    totalPages: Math.ceil(total / limit),
    products,
  });
}
