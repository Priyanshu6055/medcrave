"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";

interface ProductForm {
  name: string;
  category: string;
  price: number;
  description: string;
  advantages: string;
  uses: string;
  stock: number;
  tags: string[];
  features: string[];
  images: string[];
}

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [form, setForm] = useState<ProductForm | null>(null);

  /* Tag / Feature Inputs */
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  /* Image Upload */
  const [uploading, setUploading] = useState(false);

  /* ===========================
          LOAD PRODUCT
  ============================ */
  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      if (!data.product) {
        console.error("No product found");
        return;
      }

      const p = data.product;

      setForm({
        name: p.name || "",
        category: p.category || "",
        price: p.price || 0,
        description: p.description || "",
        advantages: p.advantages || "",
        uses: p.uses || "",
        stock: p.stock || 0,
        tags: Array.isArray(p.tags) ? p.tags : [],
        features: Array.isArray(p.features) ? p.features : [],
        images: Array.isArray(p.images) ? p.images : [],
      });
    };

    loadProduct();
  }, [id]);

  if (!form)
    return (
      <p className="text-gray-300 text-xl p-10 bg-gray-900 min-h-screen">
        Loading...
      </p>
    );

  /* ===========================
        IMAGE UPLOAD (CLOUDINARY)
  ============================ */
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

      if (data.success && data.url) uploadedUrls.push(data.url);
    }

    setForm((prev) =>
      prev ? { ...prev, images: [...prev.images, ...uploadedUrls] } : prev
    );

    setUploading(false);
  };

  /* ===========================
        SUBMIT UPDATE
  ============================ */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/products");
  };

  /* ===========================
            UI
  ============================ */
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <h1 className="text-4xl font-extrabold text-white mb-8">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-8 border border-white/20 rounded-2xl shadow-xl max-w-4xl space-y-6"
      >
        {/* 2 Column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Field
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <Field
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />

          <Field
            label="Stock"
            type="number"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: Number(e.target.value) })
            }
          />

          <TextArea
            label="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <TextArea
            label="Advantages"
            value={form.advantages}
            onChange={(e) =>
              setForm({ ...form, advantages: e.target.value })
            }
          />

          <TextArea
            label="Uses"
            value={form.uses}
            onChange={(e) => setForm({ ...form, uses: e.target.value })}
          />
        </div>

        {/* IMAGE UPLOAD SECTION */}
        <ImageUploadSection form={form} setForm={setForm} uploading={uploading} onUpload={handleImageUpload} />

        {/* TAGS */}
        <TagsSection
          form={form}
          setForm={setForm}
          tagInput={tagInput}
          setTagInput={setTagInput}
        />

        {/* FEATURES */}
        <FeaturesSection
          form={form}
          setForm={setForm}
          featureInput={featureInput}
          setFeatureInput={setFeatureInput}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg shadow-lg">
          Update Product
        </button>
      </form>
    </div>
  );
}

/* =======================================================
    REUSABLE COMPONENTS
======================================================= */

function Field({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: string | number;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Label text={label} />
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full mt-2 p-3 bg-white/20 text-white border border-white/30 rounded-lg"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <Label text={label} />
      <textarea
        value={value}
        rows={4}
        onChange={onChange}
        className="w-full mt-2 p-3 bg-white/20 text-white border border-white/30 rounded-lg"
      />
    </div>
  );
}

const Label = ({ text }: { text: string }) => (
  <label className="text-gray-200 text-sm font-medium">{text}</label>
);

/* =======================================================
    IMAGE UPLOAD SECTION
======================================================= */

function ImageUploadSection({
  form,
  setForm,
  uploading,
  onUpload,
}: {
  form: ProductForm;
  setForm: React.Dispatch<React.SetStateAction<ProductForm | null>>;
  uploading: boolean;
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Label text="Images (Upload New)" />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onUpload}
        className="w-full p-3 bg-white/20 text-white border border-white/30 rounded-lg mt-2"
      />

      {uploading && <p className="text-blue-300 mt-2">Uploading images...</p>}

      {/* Preview Grid */}
      <div className="flex flex-wrap gap-4 mt-4">
        {form.images.map((img, index) => (
          <div
            key={index}
            className="relative w-28 h-28 border border-white/20 rounded-lg overflow-hidden"
          >
            <img src={img} className="w-full h-full object-cover" />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              onClick={() =>
                setForm((prev) =>
                  prev
                    ? {
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }
                    : prev
                )
              }
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =======================================================
    TAGS
======================================================= */

function TagsSection({
  form,
  setForm,
  tagInput,
  setTagInput,
}: {
  form: ProductForm;
  setForm: React.Dispatch<React.SetStateAction<ProductForm | null>>;
  tagInput: string;
  setTagInput: (v: string) => void;
}) {
  return (
    <div>
      <Label text="Tags" />

      <div className="flex space-x-2 mt-2">
        <input
          value={tagInput}
          placeholder="Add tag"
          className="flex-1 p-3 bg-white/20 text-white border border-white/30 rounded-lg"
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button
          type="button"
          className="px-4 bg-blue-600 text-white rounded-lg"
          onClick={() => {
            if (!tagInput.trim()) return;
            setForm((prev) =>
              prev ? { ...prev, tags: [...prev.tags, tagInput.trim()] } : prev
            );
            setTagInput("");
          }}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {form.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full flex gap-2"
          >
            {tag}
            <button
              className="text-red-300"
              onClick={() =>
                setForm((prev) =>
                  prev
                    ? {
                        ...prev,
                        tags: prev.tags.filter((_, i) => i !== index),
                      }
                    : prev
                )
              }
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

/* =======================================================
    FEATURES
======================================================= */

function FeaturesSection({
  form,
  setForm,
  featureInput,
  setFeatureInput,
}: {
  form: ProductForm;
  setForm: React.Dispatch<React.SetStateAction<ProductForm | null>>;
  featureInput: string;
  setFeatureInput: (v: string) => void;
}) {
  return (
    <div>
      <Label text="Features" />

      <div className="flex space-x-2 mt-2">
        <input
          value={featureInput}
          placeholder="Add a feature"
          className="flex-1 p-3 bg-white/20 text-white border border-white/30 rounded-lg"
          onChange={(e) => setFeatureInput(e.target.value)}
        />
        <button
          type="button"
          className="px-4 bg-blue-600 text-white rounded-lg"
          onClick={() => {
            if (!featureInput.trim()) return;

            setForm((prev) =>
              prev
                ? {
                    ...prev,
                    features: [...prev.features, featureInput.trim()],
                  }
                : prev
            );

            setFeatureInput("");
          }}
        >
          Add
        </button>
      </div>

      <ul className="mt-3 space-y-2">
        {form.features.map((feat, index) => (
          <li
            key={index}
            className="bg-white/10 text-white p-3 rounded-lg flex justify-between"
          >
            {feat}
            <button
              className="text-red-300"
              onClick={() =>
                setForm((prev) =>
                  prev
                    ? {
                        ...prev,
                        features: prev.features.filter((_, i) => i !== index),
                      }
                    : prev
                )
              }
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
