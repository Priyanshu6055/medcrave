"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Menu, X, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

// ----------------------------
//      TYPES
// ----------------------------
interface SubLink {
  name: string;
  href: string;
}

interface NavLink {
  name: string;
  href?: string;
  subLinks?: SubLink[];
}

interface CategoriesAPI {
  success: boolean;
  categories: string[];
}

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // ✔ Correct typing for setTimeout
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const [categories, setCategories] = useState<string[]>([]);

  // ⭐ MEDCRAVE THEME COLORS (TYPE SAFE)
  const primary = "#7A3283";
  const secondary = "#85CD7C";

  const { scrollYProgress } = useScroll();
  const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.25]);
  const boxShadow = useTransform(
    shadowOpacity,
    (v) => `0 6px 18px rgba(122, 50, 131, ${v})`
  );

  // ----------------------------
  //  FETCH CATEGORIES (Typed)
  // ----------------------------
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: CategoriesAPI) => {
        if (data.success) setCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Products",
      subLinks: [
        { name: "All Products", href: "/products" },
        ...categories.map((cat): SubLink => ({
          name: cat,
          href: `/products/category/${cat}`,
        })),
      ],
    },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 200);
    setHoverTimeout(timeout);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ boxShadow }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 mt-2 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 py-1 shadow-sm"
          : "bg-white border-b border-transparent py-2"
      }`}
    >
      <div className="container-global px-6 flex justify-between items-center max-w-7xl mx-auto">
        
        {/* LOGO */}
        <Link href="/" className="relative flex items-center group">
          <div className="h-10 md:h-25 overflow-hidden rounded-lg">
            <motion.img
              src="/logos/medcrave-logo.png"
              alt="Medcrave Logo"
              className="h-full w-auto object-contain"
              animate={scrolled ? { scale: 0.95 } : { scale: 1 }}
            />
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center space-x-1 font-medium">
          {links.map((link) =>
            link.subLinks ? (
              <div
                key={link.name}
                className="relative px-2"
                onMouseEnter={() => handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1.5 py-2 px-4 rounded-full transition-colors text-sm hover:bg-slate-50 ${
                    openDropdown === link.name ? `text-[${primary}]` : "text-slate-700"
                  }`}
                >
                  {link.name}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${
                      openDropdown === link.name ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-3 w-[650px] bg-white rounded-3xl border border-slate-200 p-6 shadow-2xl"
                    >
                      <div className="mb-4 flex items-center gap-2 pb-3 border-b border-slate-50">
                        <LayoutGrid size={16} className={`text-[${primary}]`} />
                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                          Our Collections
                        </span>
                      </div>

                      <ul className="grid grid-cols-4 gap-x-2 gap-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {link.subLinks.map((sub, idx) => (
                          <motion.li
                            key={sub.href}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.01 }}
                          >
                            <Link
                              href={sub.href}
                              className={`block p-2 text-[11px] text-slate-600 hover:bg-[#F2E8F5] hover:text-[${primary}] rounded-lg transition-all truncate`}
                            >
                              {sub.name}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div key={link.name} className="px-2">
                <Link
                  href={link.href!}
                  className={`text-sm py-2 px-4 transition-colors ${
                    pathname === link.href
                      ? `text-[${primary}]`
                      : `text-slate-700 hover:text-[${primary}]`
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            )
          )}
        </nav>

        {/* INQUIRY BUTTON */}
        <div className="hidden md:flex items-center ml-4">
          <Link href="/contact">
            <Button
              className="rounded-xl"
            >
              Enquiry
            </Button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          style={{ color: primary }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-4 shadow-xl"
          >
            {links.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  <div className="space-y-2">
                    <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span
                        className="w-1 h-3 rounded-full"
                        style={{ backgroundColor: primary }}
                      ></span>
                      {link.name}
                    </p>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-1 text-xs text-slate-500"
                          style={{ color: primary }}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href!}
                    onClick={() => setMobileOpen(false)}
                    className="block font-bold text-slate-900 text-sm"
                    style={{ color: primary }}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            <div>
              <Link href="/contact">
                <Button
                  className="rounded-xl"
                >
                  Inquiry
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${primary};
        }
      `}</style>
    </motion.header>
  );
}
