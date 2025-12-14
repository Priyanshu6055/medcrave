"use client";

import Image from "next/image";

const PRIMARY = "#7A3283";      // Medcrave Purple
const SECONDARY = "#85CD7C";    // Complementary Accent

export default function EventCard({
  image,
  title,
  category,
}: {
  image: string;
  title: string;
  category?: string;
}) {
  return (
    <div
      className="
        w-full max-w-60
        h-[350px]
        bg-white rounded-2xl
        shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        hover:shadow-[0_12px_35px_rgba(122,50,131,0.15)]
        hover:-translate-y-1
        border border-slate-100
        transition-all duration-300
        overflow-hidden
        flex flex-col
        group
      "
    >
      {/* IMAGE SECTION */}
      <div className="relative w-full h-[160px]">
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-contain
            p-4
            transition-transform duration-500 
            group-hover:scale-[1.08]
          "
        />

        {/* ⭐ Premium Badge — Purple */}
        <div
          className="
            absolute top-3 right-3 
            text-white text-[9px] uppercase tracking-widest font-bold
            px-2.5 py-[4px] rounded-md shadow-lg
          "
          style={{ backgroundColor: PRIMARY }}
        >
          Premium
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1 space-y-3">
          {/* ⭐ Title (purple hover) */}
          <h2
            className="
              text-[15px] font-bold text-slate-800 
              transition-colors leading-snug line-clamp-2
              group-hover:text-[var(--primary)]
            "
            style={{ ["--primary" as any]: PRIMARY }}
          >
            {title}
          </h2>

          {category && (
            <div
              className="
                rounded-r-lg p-2.5 text-[11px]
                border-l-2 
              "
              style={{
                backgroundColor: SECONDARY + "15",
                borderColor: SECONDARY,
              }}
            >
              {/* Label */}
              <p className="text-slate-600">
                <span
                  className="font-bold uppercase text-[9px] block mb-0.5"
                  style={{ color: SECONDARY }}
                >
                  Category
                </span>
                {category}
              </p>
            </div>
          )}
        </div>

        {/* ⭐ View Button — Purple */}
        <a href="/products">
          <button
            className="
              w-full py-2.5 mt-4
              text-[11px] font-extrabold uppercase tracking-widest
              rounded-xl text-white transition-all duration-300 active:scale-95
              shadow-lg
            "
            style={{
              backgroundColor: PRIMARY,
              boxShadow: `0 8px 20px ${PRIMARY}33`,
            }}
          >
            View Details
          </button>
        </a>
      </div>
    </div>
  );
}
