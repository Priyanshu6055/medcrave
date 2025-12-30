"use client";

import BannerWrapper from "@/components/about/AboutBannerWrapper";
import { MapPin, Phone, Mail } from "lucide-react";

const PRIMARY = "#7A3283";     // Purple  
const SECONDARY = "#85CD7C";   // Green

export default function ContactPage() {
  return (
    <>
      <BannerWrapper
        heading="Contact Us"
        subtitle="We’d love to hear from you. Reach out for support, queries, or collaborations."
        pathname="/contact"
      />

      <section className="relative bg-white py-16 lg:py-24 text-slate-800">
        <div className="container-global px-4 md:px-6">

          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: PRIMARY }}>
              Get in Touch
            </h2>
            <p className="text-slate-600 text-lg">
              We are happy to respond to your business inquiries. Reach us anytime!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

            {/* Phone */}
            <div
              className="group bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                         border transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: `${PRIMARY}22` }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all"
                style={{
                  backgroundColor: `${SECONDARY}33`,
                  color: PRIMARY,
                }}
              >
                <Phone className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-3" style={{ color: PRIMARY }}>
                Phone Support
              </h3>

              <p className="text-slate-500 mb-4 text-sm">
                Mon–Sat from 9.30 am to 6.30 pm
              </p>

              <a
                href="tel:+91 7208929089"
                className="text-lg font-semibold flex items-center gap-2 transition-all"
                style={{ color: SECONDARY }}
              >
                +91 7208929089
              </a>
            </div>

            {/* Email */}
            <div
              className="group bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                         border transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: `${PRIMARY}22` }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all"
                style={{
                  backgroundColor: `${SECONDARY}33`,
                  color: PRIMARY,
                }}
              >
                <Mail className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-3" style={{ color: PRIMARY }}>
                Email Us
              </h3>

              <p className="text-slate-500 mb-4 text-sm">
                For inquiries & support
              </p>

              <a
                href="mailto:contact@medcravebiomedicals.in"
                className="text-base md:text-lg font-semibold break-all transition-all"
                style={{ color: SECONDARY }}
              >
                contact@medcravebiomedicals.in
              </a>
            </div>

            {/* Address */}
            <div
              className="group bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                         border transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: `${PRIMARY}22` }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all"
                style={{
                  backgroundColor: `${SECONDARY}33`,
                  color: PRIMARY,
                }}
              >
                <MapPin className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-3" style={{ color: PRIMARY }}>
                Office Address
              </h3>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2">
                <span className="block">
                  <strong>Head Office:</strong> 106, Mahalaxmi Square, near Tata Power Signal,
                  Kalyan Shill Road, Dombivli East – 421203
                </span>
                <span className="block">
                  <strong>Branch Office:</strong> 10, Om Sai Residency, Near Nilje Station,
                  Lodha Heaven, Nilje, Dombivli East – 421204
                </span>
              </p>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full">
            <div
              className="rounded-2xl overflow-hidden shadow-lg relative h-[400px] md:h-[500px]"
              style={{ border: `1px solid ${PRIMARY}22`, backgroundColor: "#f8fafc" }}
            >
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3767.5271344210805!2d73.11458967520893!3d19.215845082017733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDEyJzU3LjAiTiA3M8KwMDcnMDEuOCJF!5e0!3m2!1sen!2sin!4v1765370537498!5m2!1sen!2sin"
              />

              <div
                className="absolute bottom-6 left-6 bg-white py-3 px-5 rounded-lg shadow-xl border"
                style={{ borderColor: `${PRIMARY}22` }}
              >
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Locate Us
                </span>
                <span className="font-bold" style={{ color: PRIMARY }}>
                  Medcrave Biomedicals
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Soft Green Background Glow */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 -z-10"
          style={{
            background: `linear-gradient(to bottom, ${SECONDARY}22, transparent)`
          }}
        />
      </section>
    </>
  );
}
