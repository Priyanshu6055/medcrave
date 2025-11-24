"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {
  const router = useRouter();
  const params: any = useParams(); // FIXED
  const id = params.id; // FIXED

  const [form, setForm] = useState<any>(null);

  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          ...data.product,
          tags: data.product.tags || [],
          features: data.product.features || [],
          images: data.product.images || [],
        });
      });
  }, [id]); // FIXED: dependency added

  if (!form)
    return (
      <p className="text-gray-300 text-xl p-10 bg-gray-900 min-h-screen">
        Loading...
      </p>
    );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 border border-white/20 rounded-2xl shadow-2xl max-w-xl space-y-6"
      >
        {/* Product Name */}
        <Field
          label="Product Name"
          value={form.name}
          onChange={(e: any) => setForm({ ...form, name: e.target.value })}
        />

        {/* Category */}
        <Field
          label="Category"
          value={form.category}
          onChange={(e: any) => setForm({ ...form, category: e.target.value })}
        />

        {/* Price */}
        <Field
          label="Price"
          type="number"
          value={form.price}
          onChange={(e: any) => setForm({ ...form, price: e.target.value })}
        />

        {/* Stock */}
        <Field
          label="Stock"
          type="number"
          value={form.stock}
          onChange={(e: any) => setForm({ ...form, stock: e.target.value })}
        />

        {/* Description */}
        <TextArea
          label="Description"
          value={form.description}
          onChange={(e: any) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* TAGS */}
        <TagsSection
          form={form}
          tagInput={tagInput}
          setTagInput={setTagInput}
          setForm={setForm}
        />

        {/* FEATURES */}
        <FeaturesSection
          form={form}
          featureInput={featureInput}
          setFeatureInput={setFeatureInput}
          setForm={setForm}
        />

        {/* IMAGES */}
        <ImagesSection
          form={form}
          imageInput={imageInput}
          setImageInput={setImageInput}
          setForm={setForm}
        />

        {/* Submit Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-500 transition text-white font-semibold py-3 rounded-lg shadow-lg">
          Update Product
        </button>
      </form>
    </div>
  );
}

/* =============== REUSABLE COMPONENTS =============== */

function Field({ label, value, onChange, type = "text" }: any) {
  return (
    <div>
      <Label text={label} />
      <input
        type={type}
        value={value}
        className="w-full mt-2 p-3 bg-white/20 text-white placeholder-gray-300
                   border border-white/30 rounded-lg focus:ring-2 
                   focus:ring-blue-400 outline-none transition"
        onChange={onChange}
      />
    </div>
  );
}

function TextArea({ label, value, onChange }: any) {
  return (
    <div>
      <Label text={label} />
      <textarea
        value={value}
        rows={4}
        className="w-full mt-2 p-3 bg-white/20 text-white placeholder-gray-300
                   border border-white/30 rounded-lg focus:ring-2 
                   focus:ring-blue-400 outline-none transition"
        onChange={onChange}
      />
    </div>
  );
}

function Label({ text }: any) {
  return (
    <label className="text-gray-200 text-sm font-medium">{text}</label>
  );
}

/* =============== TAGS SECTION =============== */

function TagsSection({ form, tagInput, setTagInput, setForm }: any) {
  return (
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
            if (!tagInput.trim()) return;
            setForm({ ...form, tags: [...form.tags, tagInput] });
            setTagInput("");
          }}
          className="px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {form.tags.map((tag: any, index: number) => (
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
                  tags: form.tags.filter((_: any, i: number) => i !== index),
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
  );
}

/* =============== FEATURES SECTION =============== */

function FeaturesSection({ form, featureInput, setFeatureInput, setForm }: any) {
  return (
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
            if (!featureInput.trim()) return;
            setForm({
              ...form,
              features: [...form.features, featureInput],
            });
            setFeatureInput("");
          }}
          className="px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
        >
          Add
        </button>
      </div>

      <ul className="mt-3 space-y-2">
        {form.features.map((feat: any, index: number) => (
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
                  features: form.features.filter(
                    (_: any, i: number) => i !== index
                  ),
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
  );
}

/* =============== IMAGES SECTION =============== */

function ImagesSection({ form, imageInput, setImageInput, setForm }: any) {
  return (
    <div>
      <Label text="Image URLs" />

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
            if (!imageInput.trim()) return;
            setForm({
              ...form,
              images: [...form.images, imageInput],
            });
            setImageInput("");
          }}
          className="px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-500"
        >
          Add
        </button>
      </div>

      <ul className="mt-3 space-y-2">
        {form.images.map((img: any, index: number) => (
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
                  images: form.images.filter(
                    (_: any, i: number) => i !== index
                  ),
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
  );
}
