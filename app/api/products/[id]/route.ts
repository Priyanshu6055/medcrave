import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// ===================== GET SINGLE PRODUCT ===================== //

export async function GET(req: Request, context: any) {
  await connectDB();

  const { id } = await context.params; // FIXED HERE

  const product = await Product.findById(id);

  return Response.json({
    success: true,
    product,
  });
}

// ===================== UPDATE PRODUCT ===================== //

export async function PUT(req: Request, context: any) {
  await connectDB();

  const { id } = await context.params; // FIXED HERE
  const body = await req.json();

  const updateData = {
    name: body.name,
    category: body.category,
    price: Number(body.price),
    description: body.description,
    advantages: body.advantages,
    uses: body.uses,
    tags: Array.isArray(body.tags) ? body.tags : [],
    features: Array.isArray(body.features) ? body.features : [],
    images: Array.isArray(body.images) ? body.images : [],
    stock: Number(body.stock) || 0,
  };

  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return Response.json({
    success: true,
    message: "Product updated successfully",
    product,
  });
}

// ===================== DELETE PRODUCT ===================== //

export async function DELETE(req: Request, context: any) {
  await connectDB();

  const { id } = await context.params; // FIXED HERE

  await Product.findByIdAndDelete(id);

  return Response.json({
    success: true,
    message: "Product deleted successfully",
  });
}
