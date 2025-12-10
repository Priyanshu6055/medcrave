"use client";

import BannerWrapper from "@/components/about/AboutBannerWrapper";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <BannerWrapper
        heading="Contact Us"
        subtitle="We’d love to hear from you. Reach out for support, queries, or collaborations."
      />

      <section className="relative bg-white py-16 lg:py-24 text-slate-800">
        <div className="container-global px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Get in Touch
            </h2>
            <p className="text-slate-600 text-lg">
              We are happy to respond to your business inquiries. Reach us
              anytime!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-blue-900/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">
                Phone Support
              </h3>
              <p className="text-slate-500 mb-4 text-sm">
                Mon-Sat from 9am to 6pm
              </p>
              <a
                href="tel:+919354754756"
                className="text-lg font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-2"
              >
                +91 93547 54756
              </a>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-blue-900/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Email Us</h3>
              <p className="text-slate-500 mb-4 text-sm">
                For inquiries & support
              </p>
              <a
                href="mailto:info@medcravebiomedicals.com"
                className="text-lg font-semibold text-blue-700 hover:text-blue-900"
              >
                info@medcravebiomedicals.com
              </a>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-blue-900/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">
                Office Address
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Ambernath, Thane,
                <br />
                Maharashtra, India
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative bg-slate-100 h-[400px] md:h-[500px]">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3767.5271344210805!2d73.11458967520893!3d19.215845082017733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDEyJzU3LjAiTiA3M8KwMDcnMDEuOCJF!5e0!3m2!1sen!2sin!4v1765370537498!5m2!1sen!2sin"
              />

              <div className="absolute bottom-6 left-6 bg-white py-3 px-5 rounded-lg shadow-xl hidden md:flex flex-col border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Locate Us
                </span>
                <span className="font-bold text-blue-950">
                  Medcrave Biomedicals
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
      </section>
    </>
  );
}
