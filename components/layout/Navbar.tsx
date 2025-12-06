"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";

interface NavLink {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const [categories, setCategories] = useState<string[]>([]);

  const { scrollYProgress } = useScroll();
  const shadowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.25]);

  // 🌊 Navy Glow Shadow
  const boxShadow = useTransform(
    shadowOpacity,
    (v) => `0 6px 18px rgba(10, 77, 104, ${v})`
  );

  /* Fetch categories */
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setCategories(data.categories);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Navigation Links */
  const links: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },

    {
      name: "Products",
      subLinks: [
        { name: "All Products", href: "/products" },
        ...categories.map((cat) => ({
          name: cat,
          href: `/products/category/${cat}`,
        })),
      ],
    },

    {
      name: "Facility",
      subLinks: [{ name: "Facilities", href: "/facility" }],
    },

    { name: "Contact Us", href: "/contact" },
  ];

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 180);
    setHoverTimeout(timeout);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ boxShadow }}
      className={`fixed top-3 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-white border-b border-[#0A4D68]/40 py-1.5 md:py-1"
          : "backdrop-blur-lg bg-white border-b border-[#0A4D68]/20 py-3 md:py-2"
      }`}
    >
      <div className="container-global px-4 flex justify-between items-center">
        
        {/* LOGO */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="relative flex items-center select-none">
            <div className="h-10 md:h-20 flex items-center">
              <motion.img
                src="/logos/medcrave-logo.jpgj"
                alt="Medcrave Logo"
                className="max-h-full w-auto object-contain"
                animate={scrolled ? { scale: 0.92 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </Link>
        </motion.div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center space-x-8 text-[0.8rem] font-normal text-gray-900">
          {links.map((link) =>
            link.subLinks ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.button
                  whileHover={{ color: "#05BFDB" }}
                  className="flex items-center gap-1 text-[0.8rem]"
                >
                  {link.name}
                  <motion.div
                    animate={{
                      rotate: openDropdown === link.name ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={12} />
                  </motion.div>
                </motion.button>

                {/* DROPDOWN MENU */}
                <AnimatePresence>
                  {openDropdown === link.name && (
                    <motion.ul
                      key={link.name}
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 mt-2 w-56 bg-white rounded-xl border border-gray-200 
                                 p-2 shadow-lg max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
                    >
                      {link.subLinks.map((sub) => (
                        <motion.li key={sub.name} whileHover={{ x: 6 }}>
                          <Link
                            href={sub.href}
                            className="block px-3 py-2 text-[0.75rem] text-gray-700 
                                       hover:bg-[#05BFDB]/20 hover:text-[#0A4D68] rounded-lg transition-all"
                          >
                            {sub.name}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div key={link.name} whileHover={{ color: "#05BFDB" }}>
                <Link href={link.href!} className="relative text-[0.8rem]">
                  {link.name}
                  <motion.span
                    className="absolute left-0 bottom-[-3px] h-[2px] bg-[#05BFDB] rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            )
          )}
        </nav>

        {/* MOBILE MENU ICON */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700"
          whileTap={{ scale: 0.9 }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 backdrop-blur-xl px-6 py-5 space-y-4 border-t border-[#0A4D68]/20"
          >
            {links.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  <details>
                    <summary className="font-semibold text-[0.85rem] text-gray-800 py-1 cursor-pointer flex justify-between">
                      {link.name}
                    </summary>

                    <ul className="pl-3 space-y-1 max-h-60 overflow-y-auto">
                      {link.subLinks.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            className="block text-gray-600 py-1 text-[0.75rem] hover:text-[#05BFDB]"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={link.href!}
                    className="block font-semibold text-gray-800 text-[0.85rem] hover:text-[#05BFDB]"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
