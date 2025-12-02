"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

/* ==== Product Type ==== */
interface ProductForm {
  name: string;
  category: string;
  price: string;
  description: string;
  advantages: string;
  uses: string;
  stock: string;
  tags: string[];
  features: string[];
  images: string[]; // Cloudinary URLs
}

export default function AddProduct() {
  const router = useRouter();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    category: "",
    price: "",
    description: "",
    advantages: "",
    uses: "",
    stock: "",
    tags: [],
    features: [],
    images: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [uploading, setUploading] = useState(false);

  /* ==================================================
     IMAGE UPLOAD WITH REMOVE OPTION
  ================================================== */
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (data.success && data.url) {
        uploadedUrls.push(data.url);
      }
    }

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls],
    }));

    setUploading(false);
  };

  /* ==================================================
     SUBMIT FORM
  ================================================== */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/products");
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">Add Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 border border-white/20 rounded-2xl shadow-2xl max-w-4xl space-y-8"
      >
        {/* 2 COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Product Name"
            placeholder="Enter product name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Field
            label="Category"
            placeholder="Enter category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <Field
            label="Price"
            type="number"
            placeholder="Enter product price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <Field
            label="Stock"
            type="number"
            placeholder="Enter stock quantity"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          <TextArea
            label="Description"
            placeholder="Enter product description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <TextArea
            label="Advantages"
            placeholder="Enter product advantages"
            onChange={(e) => setForm({ ...form, advantages: e.target.value })}
          />

          <TextArea
            label="Uses"
            placeholder="Enter product uses"
            onChange={(e) => setForm({ ...form, uses: e.target.value })}
          />
        </div>

        {/* ==================================================
            IMAGE UPLOAD + DELETE (DESELECT FEATURE)
        ================================================== */}
        <Section label="Upload Images">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-lg"
          />

          {uploading && <p className="text-blue-300 mt-2">Uploading...</p>}

          {/* Image Preview with DELETE BUTTON */}
          <div className="flex flex-wrap gap-4 mt-4">
            {form.images.map((img, i) => (
              <div
                key={i}
                className="relative w-28 h-28 bg-black/30 border border-white/20 rounded-lg overflow-hidden"
              >
                <img src={img} className="w-full h-full object-cover" />

                {/* DELETE BUTTON */}
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded"
                  onClick={() =>
                    setForm({
                      ...form,
                      images: form.images.filter((_, idx) => idx !== i),
                    })
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* ==== TAGS ==== */}
        <Section label="Tags">
          <InputAddList
            value={tagInput}
            onChange={setTagInput}
            onAdd={() => {
              if (!tagInput.trim()) return;
              setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
              setTagInput("");
            }}
          />

          <Chips
            items={form.tags}
            onRemove={(i) =>
              setForm({ ...form, tags: form.tags.filter((_, idx) => idx !== i) })
            }
          />
        </Section>

        {/* ==== FEATURES ==== */}
        <Section label="Features">
          <InputAddList
            value={featureInput}
            onChange={setFeatureInput}
            onAdd={() => {
              if (!featureInput.trim()) return;
              setForm({
                ...form,
                features: [...form.features, featureInput.trim()],
              });
              setFeatureInput("");
            }}
          />

          <List
            items={form.features}
            onRemove={(i) =>
              setForm({
                ...form,
                features: form.features.filter((_, idx) => idx !== i),
              })
            }
          />
        </Section>

        {/* SUBMIT BUTTON */}
        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-lg">
          Add Product
        </button>
      </form>
    </div>
  );
}

/* ============================================================
   REUSABLE COMPONENTS — TYPE SAFE
============================================================ */

interface FieldProps {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Field({ label, placeholder, type = "text", onChange }: FieldProps) {
  return (
    <div>
      <label className="text-sm text-gray-200">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full mt-2 p-3 bg-white/20 text-white placeholder-gray-400 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

interface TextAreaProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ label, placeholder, onChange }: TextAreaProps) {
  return (
    <div>
      <label className="text-sm text-gray-200">{label}</label>
      <textarea
        rows={4}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full mt-2 p-3 bg-white/20 text-white placeholder-gray-400 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-gray-200 text-sm font-medium mb-2">{label}</h3>
      {children}
    </div>
  );
}

function InputAddList({
  value,
  onChange,
  onAdd,
}: {
  value: string;
  onChange: (val: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex space-x-2">
      <input
        value={value}
        placeholder="Type and add..."
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-3 bg-white/20 text-white placeholder-gray-400 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="button"
        className="px-4 bg-blue-600 rounded-lg hover:bg-blue-500"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}

function Chips({
  items,
  onRemove,
}: {
  items: string[];
  onRemove: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((item, index) => (
        <span
          key={index}
          className="bg-blue-500/30 text-blue-200 py-1 px-3 rounded-full text-sm flex items-center gap-2"
        >
          {item}
          <button
            className="text-red-300 hover:text-red-400"
            onClick={() => onRemove(index)}
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  );
}

function List({
  items,
  onRemove,
}: {
  items: string[];
  onRemove: (index: number) => void;
}) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="bg-white/10 text-white p-3 rounded-lg flex justify-between items-center"
        >
          {item}
          <button
            className="text-red-300 hover:text-red-400"
            onClick={() => onRemove(index)}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
