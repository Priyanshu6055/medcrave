"use client";

import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { TbPlus } from "react-icons/tb";

const footerLinks = {
  products: [
    { label: "Medical Equipments", href: "/products" },
    { label: "Medical Devices", href: "/products" },
    { label: "POCT Products", href: "/products" },
    { label: "Laboratory & Diagnostic Products", href: "/products" },
  ],
  company: [
    { label: "About Medcrave", href: "/about" },
    { label: "Quality & Compliance", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Certifications", href: "/about" },
    { label: "Research & Insights", href: "/about" },
    { label: "Support", href: "/contact" },
  ],
};

const socialIcons = [
  { Icon: FaFacebookF, href: "https://www.facebook.com/medcravebiomedicals/" },
  { Icon: FaTwitter, href: "#" },
  { Icon: FaInstagram, href: "https://www.instagram.com/medcravebiomedicals/" },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/medcrave-biomedicals-85223b398" },
];

export default function Footer() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 20 });
  const sy = useSpring(y, { stiffness: 180, damping: 20 });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <footer
      onMouseMove={handleMouseMove}
      className="relative border-t border-[#DFE6EE] text-[#102030] pt-14 pb-10 overflow-hidden bg-[url('/bg/footer-bg.png')] bg-cover bg-center bg-fixed"
    >
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none absolute w-24 h-24 border border-[#102030]/30 rounded-[26px] opacity-70"
      />

      <div className="pointer-events-none absolute inset-0 opacity-[0.55]">
        <div className="absolute inset-x-0 top-0 h-px bg-[#102030]/5" />
        <div className="absolute inset-y-0 left-0 w-px bg-[#102030]/10" />
        <div className="absolute inset-y-0 right-0 w-px bg-[#102030]/10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:items-start"
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="rounded-2xl bg-white border border-[#102030]/10 shadow-[0_0_0_1px_rgba(16,32,48,0.03)] px-3 py-3 backdrop-blur-sm"
            >
              <Image
                src="/logos/medcrave-logo-croped.jpg"
                alt="Medcrave Biomedicals"
                width={80}
                height={80}
                className="h-16 w-16 object-contain"
              />
            </motion.div>
            <div className="max-w-xs text-center sm:text-left">
              <p className="text-sm text-[#102030]/70 leading-relaxed">
                Medcrave Biomedicals delivered high accuracy, diagnostic monitoring solutions
                and instrument equipment for global healthcare brands.
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#102030]/40">
                Precision • Accuracy • Consistency
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-3 lg:max-w-2xl"
          >
            <FooterColumn title="Products" links={footerLinks.products} />
            <FooterColumn title="Company" links={footerLinks.company} />
            <FooterColumn title="Resources" links={footerLinks.resources} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-col gap-6 border-t border-[#102030]/10 pt-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-1 text-xs text-[#102030]/60">
            <p>
              Phone: <span className="text-[#102030]/80">+91 72089 29089</span>
            </p>
            <p>
              Email:{" "}
              <span className="text-[#102030]/80">
                contact@medcravebiomedicals.in
              </span>
            </p>
            <p>
              Time: <span className="text-[#102030]/80">9:30 AM – 6:30 PM</span>
            </p>
            <p>
              Address:{" "}
              <span className="text-[#102030]/80">
                Head Office: 106, Mahalaxmi Square, near Tata Power Signal,
                Kalyan Shill Road, Dombivli East – 421203
              </span>
            </p>
            <p>
              <span className="text-[#102030]/80">
                Branch Office: 10, Om Sai Residency, Near Nilje Station,
                Lodha Heaven, Nilje, Dombivli East – 421204
              </span>
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.18em] text-[#102030]/40">
                Stay informed
              </span>
              <TbPlus className="h-3.5 w-3.5 text-[#C8A55B]" />
            </div>

            <form className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-[#102030]/15 bg-white/70 px-3 py-2 text-xs backdrop-blur-lg">
              <input
                type="email"
                placeholder="Business email"
                className="h-8 flex-1 bg-transparent text-[#102030] placeholder:text-[#102030]/40 focus:outline-none"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1 rounded-lg bg-[#102030] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white"
              >
                Join
                <TbPlus className="h-3 w-3" />
              </motion.button>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col gap-4 border-t border-[#102030]/10 pt-5 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-[11px] text-[#102030]/45">
            © {new Date().getFullYear()} Medcrave Biomedicals. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {socialIcons.map(({ Icon, href }, index) => (
                <SocialIcon key={index} Icon={Icon} href={href} />
              ))}
            </div>

            <div className="hidden items-center gap-1 text-[11px] text-[#102030]/50 md:flex">
              <TbPlus className="h-3 w-3 text-[#C8A55B]" />
              <span>Precision biomedical standard</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: any[] }) {
  return (
    <div className="space-y-3 text-sm">
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#102030]/60">
        {title}
      </h4>

      <ul className="space-y-1.5 text-[13px] text-[#102030]/65">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="inline-flex items-center gap-1 hover:text-[#102030]/100 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ Icon, href }: { Icon: any; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2, scale: 1.05 }}
      className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#102030]/12 bg-white text-[#102030]/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="pointer-events-none absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#C8A55B]"
      >
        <TbPlus className="h-2.5 w-2.5 text-white/95" />
      </motion.div>
      <Icon size={15} />
    </motion.a>
  );
}
