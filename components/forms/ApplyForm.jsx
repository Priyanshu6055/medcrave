"use client";

import { useState } from "react";
import { submitApplyForm } from "../../api/apply.api.js";

export default function ApplyForm() {
  const [form, setForm] = useState({
    founderName: "",
    startupName: "",
    email: "",
    contact: "",
    city: "",
    stage: "",
    category: "",
    sectors: [],
    website: "",
    description: "",
    referral: "",
    file: null,
  });

  const sectorsList = [
    "Agriculture","Blockchain","FinTech","Media","Technology",
    "AR/VR/MR/XR","Software","Consumer","FMCG","Robotics",
    "Tools Education","AI/ML","Developer","Other","Hardware",
    "SAAS","Transportation","B2B","Drones","Healthcare",
  ];

  const toggleSector = (sector) => {
    setForm((prev) => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter((s) => s !== sector)
        : [...prev.sectors, sector],
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: name === "file" ? files[0] : value });
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-md border border-[#e8f7fa] p-4 md:p-5 text-[10px]">
      
      {/* Heading */}
      <h2 className="text-lg md:text-xl font-bold text-[#0b1220] mb-3">
        Apply <span className="text-[#00d2ef]">Form</span>
      </h2>

      <p className="text-gray-600 mb-4 text-[10px] max-w-xs">
        Submit your startup details to be considered.
      </p>

      {/* FORM */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

        <FormInput
          label="Founder Name *"
          name="founderName"
          value={form.founderName}
          placeholder="Founder Name"
          onChange={handleChange}
        />

        <FormInput
          label="Startup Name *"
          name="startupName"
          value={form.startupName}
          placeholder="Startup Name"
          onChange={handleChange}
        />

        <FormInput
          label="Email *"
          name="email"
          type="email"
          value={form.email}
          placeholder="email@example.com"
          onChange={handleChange}
        />

        <FormInput
          label="Contact *"
          name="contact"
          value={form.contact}
          placeholder="9999999999"
          onChange={handleChange}
        />

        <FormInput
          label="City *"
          name="city"
          value={form.city}
          placeholder="City"
          onChange={handleChange}
        />

        <SelectBox
          label="Stage *"
          name="stage"
          value={form.stage}
          options={["Ideation","Prototype","Early Stage","Growth Stage","Established"]}
          onChange={handleChange}
        />

        <SelectBox
          label="Category *"
          name="category"
          value={form.category}
          options={["SC","ST","OBC","GENERAL"]}
          onChange={handleChange}
        />

        {/* Sectors */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-800 text-[10px]">Sectors *</label>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1">
            {sectorsList.map((sector) => (
              <label
                key={sector}
                className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[9px] cursor-pointer 
                  ${
                    form.sectors.includes(sector)
                      ? "border-[#00d2ef] bg-[#e6fbff]"
                      : "border-gray-200 bg-white"
                  }`}
              >
                <input
                  type="checkbox"
                  checked={form.sectors.includes(sector)}
                  onChange={() => toggleSector(sector)}
                  className="accent-[#00d2ef] w-3 h-3"
                />
                {sector}
              </label>
            ))}
          </div>
        </div>

        <FormInput
          label="Website"
          name="website"
          value={form.website}
          placeholder="http://startup.com"
          onChange={handleChange}
          full
        />

        {/* Description */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-800 text-[10px]">Description *</label>
          <textarea
            name="description"
            rows={2}
            placeholder="About your startup..."
            value={form.description}
            onChange={handleChange}
            className="w-full mt-1 px-2 py-1 text-[10px] bg-[#f8fdff] border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-[#00d2ef]"
          />
        </div>

        {/* File Upload */}
        <div className="md:col-span-2">
          <label className="font-semibold text-gray-800 text-[10px]">Upload Presentation *</label>
          <input
            type="file"
            accept=".ppt,.pptx,.pdf"
            onChange={handleChange}
            className="mt-1 bg-white px-2 py-1 border rounded-md text-[9px] 
            file:bg-[#00d2ef] file:text-white file:px-2 file:py-1 file:rounded-md"
          />
        </div>

        <FormInput
          label="Referral *"
          name="referral"
          value={form.referral}
          placeholder="Facebook, Instagram"
          onChange={handleChange}
          full
        />

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-2 text-[10px] rounded-md font-bold bg-[#00d2ef] text-white hover:bg-[#00b5d6]"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------- Reusable INPUT COMPONENTS ---------------- */

function FormInput({ label, name, value, onChange, placeholder, type="text", full }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="font-semibold text-gray-800 text-[10px]">{label}</label>
      <input
        type={type}
        name={name}
        required
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full mt-1 px-2 py-1 text-[10px] bg-[#f8fdff] border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-[#00d2ef]"
      />
    </div>
  );
}

function SelectBox({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="font-semibold text-gray-800 text-[10px]">{label}</label>
      <select
        name={name}
        value={value}
        required
        onChange={onChange}
        className="w-full mt-1 px-2 py-1 text-[10px] bg-[#f8fdff] border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-[#00d2ef]"
      >
        <option value="">--Select--</option>
        {options.map((op) => <option key={op}>{op}</option>)}
      </select>
    </div>
  );
}
