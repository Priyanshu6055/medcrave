import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    tags: [String],
    description: String,
    features: [String],
    images: [String],
    stock: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
