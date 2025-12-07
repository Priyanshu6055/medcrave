"use client";

import Image from "next/image";

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
        hover:shadow-[0_12px_35px_rgba(26,86,219,0.12)]
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

        {/* ⭐ Premium Badge: Royal Blue */}
        <div
          className="
            absolute top-3 right-3 
            bg-[#1A56DB] text-white
            text-[9px] uppercase tracking-widest font-bold
            px-2.5 py-[4px] rounded-md shadow-lg
          "
        >
          Premium
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1 space-y-3">
          {/* ⭐ Title: Royal Blue hover effect */}
          <h2 className="text-[15px] font-bold text-slate-800 group-hover:text-[#1A56DB] transition-colors leading-snug line-clamp-2">
            {title}
          </h2>

          {category && (
            <div
              className="
                bg-blue-50/50
                border-l-2 border-[#ee9e26]
                rounded-r-lg p-2.5
                text-[11px]
              "
            >
              {/* ⭐ Detail: Amber accent used here */}
              <p className="text-slate-600">
                <span className="font-bold text-[#ee9e26] uppercase text-[9px] block mb-0.5">Category</span> 
                {category}
              </p>
            </div>
          )}
        </div>

        {/* ⭐ View Details Button: Royal Blue Theme */}
        <a href="/products">
          <button
            className="
              w-full py-2.5 mt-4
              text-[11px] font-extrabold uppercase tracking-widest
              rounded-xl
              bg-[#1A56DB] text-white
              shadow-lg shadow-blue-200
              hover:bg-[#1E429F]
              hover:shadow-blue-300
              transition-all duration-300
              active:scale-95
            "
          >
            View Details
          </button>
        </a>
      </div>
    </div>
  );
}