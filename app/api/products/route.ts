import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find().sort({ createdAt: -1 });

  return Response.json({
    success: true,
    products,
  });
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  // Extract all fields with safety checks
  const productData = {
    name: body.name || "",
    category: body.category || "",
    price: Number(body.price) || 0,
    description: body.description || "",
    tags: Array.isArray(body.tags) ? body.tags : [],
    features: Array.isArray(body.features) ? body.features : [],
    images: Array.isArray(body.images) ? body.images : [],
    stock: Number(body.stock) || 0,
  };

  const product = await Product.create(productData);

  return Response.json({
    success: true,
    message: "Product created successfully",
    product,
  });
}
