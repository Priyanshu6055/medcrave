"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    tags: [] as string[],
    features: [] as string[],
    images: [] as string[],
  });

  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 border border-white/20 rounded-2xl shadow-2xl max-w-xl space-y-6"
      >
        {/* Product Name */}
        <Field
          label="Product Name"
          placeholder="Enter product name"
          onChange={(e: any) => setForm({ ...form, name: e.target.value })}
        />

        {/* Category */}
        <Field
          label="Category"
          placeholder="Enter category"
          onChange={(e: any) => setForm({ ...form, category: e.target.value })}
        />

        {/* Price */}
        <Field
          label="Price"
          type="number"
          placeholder="Enter product price"
          onChange={(e: any) => setForm({ ...form, price: e.target.value })}
        />

        {/* Stock */}
        <Field
          label="Stock"
          type="number"
          placeholder="Enter stock quantity"
          onChange={(e: any) => setForm({ ...form, stock: e.target.value })}
        />

        {/* Description */}
        <TextArea
          label="Description"
          placeholder="Enter product description"
          onChange={(e: any) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Tags */}
        <div>
          <Label text="Tags" />

          <div className="flex space-x-2 mt-2">
            <input
              value={tagInput}
              placeholder="Add tag"
              className="flex-1 p-3 bg-white/20 text-white placeholder-gray-300
                       border border-white/30 rounded-lg focus:ring-2 
                       focus:ring-blue-400 outline-none transition"
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (tagInput.trim() === "") return;
                setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
                setTagInput("");
              }}
              className="px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
            >
              Add
            </button>
          </div>

          {/* Tag Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {form.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-500/30 text-blue-200 py-1 px-3 rounded-full text-sm flex items-center gap-2 backdrop-blur"
              >
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      tags: form.tags.filter((_, i) => i !== index),
                    })
                  }
                  className="text-red-300 hover:text-red-400"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <Label text="Features" />

          <div className="flex space-x-2 mt-2">
            <input
              value={featureInput}
              placeholder="Add a feature"
              className="flex-1 p-3 bg-white/20 text-white placeholder-gray-300
                       border border-white/30 rounded-lg focus:ring-2 
                       focus:ring-blue-400 outline-none transition"
              onChange={(e) => setFeatureInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (featureInput.trim() === "") return;
                setForm({
                  ...form,
                  features: [...form.features, featureInput.trim()],
                });
                setFeatureInput("");
              }}
              className="px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
            >
              Add
            </button>
          </div>

          {/* Feature List */}
          <ul className="mt-3 space-y-2">
            {form.features.map((feat, index) => (
              <li
                key={index}
                className="bg-white/10 text-white p-3 rounded-lg flex justify-between items-center"
              >
                {feat}
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      features: form.features.filter((_, i) => i !== index),
                    })
                  }
                  className="text-red-300 hover:text-red-400"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Images */}
        <div>
          <Label text="Product Images (URLs)" />

          <div className="flex space-x-2 mt-2">
            <input
              value={imageInput}
              placeholder="https://image-url.com"
              className="flex-1 p-3 bg-white/20 text-white placeholder-gray-300
                       border border-white/30 rounded-lg focus:ring-2 
                       focus:ring-blue-400 outline-none transition"
              onChange={(e) => setImageInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (!imageInput.startsWith("http")) return;
                setForm({
                  ...form,
                  images: [...form.images, imageInput.trim()],
                });
                setImageInput("");
              }}
              className="px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
            >
              Add
            </button>
          </div>

          {/* Image URLs */}
          <ul className="mt-3 space-y-2">
            {form.images.map((img, index) => (
              <li
                key={index}
                className="bg-white/10 text-white p-3 rounded-lg flex justify-between items-center"
              >
                <span className="truncate">{img}</span>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      images: form.images.filter((_, i) => i !== index),
                    })
                  }
                  className="text-red-300 hover:text-red-400"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-500 transition text-white 
                     font-semibold py-3 rounded-lg shadow-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

/* ===== Reusable Components ===== */

function Field({ label, placeholder, type = "text", onChange }: any) {
  return (
    <div>
      <Label text={label} />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-2 p-3 bg-white/20 text-white placeholder-gray-300 
                   border border-white/30 rounded-lg focus:ring-2 
                   focus:ring-blue-400 outline-none transition"
        onChange={onChange}
      />
    </div>
  );
}

function TextArea({ label, placeholder, onChange }: any) {
  return (
    <div>
      <Label text={label} />
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full mt-2 p-3 bg-white/20 text-white placeholder-gray-300 
                   border border-white/30 rounded-lg focus:ring-2 
                   focus:ring-blue-400 outline-none transition"
        onChange={onChange}
      />
    </div>
  );
}

function Label({ text }: any) {
  return <label className="text-gray-200 text-sm font-medium">{text}</label>;
}
