"use client";

import { useState } from "react";
// import { sendContactForm } from "../../api/contact.api";

export default function ContactForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await sendContactForm(data);
      setSuccessMsg("Your message has been submitted successfully 🎉");

      setData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSuccessMsg("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-[#eaf5f7] p-5 w-full max-w-md">
      <h3 className="text-xl font-bold text-[#0b1220] mb-4">
        Get in <span className="text-[#00d2ef]">Touch</span>
      </h3>

      {successMsg && (
        <p className="mb-3 p-2 rounded-lg text-center text-xs font-semibold
          bg-[#e6fafd] text-[#008ea0] border border-[#c8f0f7]">
          {successMsg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">

        {/* Name */}
        <div>
          <label className="text-gray-700 font-medium text-xs">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={data.name}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 bg-[#f8fdff] border text-xs border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#00d2ef]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-700 font-medium text-xs">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            value={data.email}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 bg-[#f8fdff] border text-xs border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#00d2ef]"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="text-gray-700 font-medium text-xs">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Message subject"
            value={data.subject}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 bg-[#f8fdff] border text-xs border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#00d2ef]"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-gray-700 font-medium text-xs">Message</label>
          <textarea
            name="message"
            rows={3}
            placeholder="Write your message..."
            value={data.message}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 bg-[#f8fdff] border text-xs border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#00d2ef]"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 text-sm rounded-lg font-medium text-white shadow-md transition-all
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#00d2ef] hover:bg-[#00b5d6]"}`}
        >
          {loading ? "Submitting..." : "Submit Message"}
        </button>
      </form>
    </div>
  );
}
