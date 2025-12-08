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
          
          {/* TOP SECTION: Intro Text */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
              Get in Touch
            </h2>
            <p className="text-slate-600 text-lg">
              Visit our campus or contact us via phone or email. Our administration team is ready to assist you.
            </p>
          </div>

          {/* MIDDLE SECTION: 3-Column Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Phone Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-blue-900/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Phone Support</h3>
              <p className="text-slate-500 mb-4 text-sm">Mon-Fri from 9am to 6pm</p>
              <a href="tel:07753253801" className="text-lg font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-2">
                07753-253801
              </a>
            </div>

            {/* Email Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-blue-900/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Email Us</h3>
              <p className="text-slate-500 mb-4 text-sm">For general inquiries & admissions</p>
              <a href="mailto:info@cvru.ac.in" className="text-lg font-semibold text-blue-700 hover:text-blue-900">
                info@cvru.ac.in
              </a>
            </div>

            {/* Address Card */}
            <div className="group bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-blue-900/20 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Campus Address</h3>
              <p className="text-slate-600 leading-relaxed">
                Dr. C.V. Raman University, <br />
                Kargi Road, Kota, Bilaspur (C.G) – 495113
              </p>
            </div>

          </div>

          {/* BOTTOM SECTION: Full Width Map */}
          <div className="w-full">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative bg-slate-100 h-[400px] md:h-[500px]">
              <iframe
                title="CVRU Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                // Using a slightly larger map view for the full-width layout
                src="https://maps.google.com/maps?q=Dr.%20C.V.%20Raman%20University%2C%20Kota%2C%20Bilaspur&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
              
              {/* Optional: Floating 'Get Directions' Badge */}
              <div className="absolute bottom-6 left-6 bg-white py-3 px-5 rounded-lg shadow-xl hidden md:flex flex-col border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Locate Us</span>
                <span className="font-bold text-blue-950">University Campus</span>
              </div>
            </div>
          </div>

        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />
      </section>
    </>
  );
}