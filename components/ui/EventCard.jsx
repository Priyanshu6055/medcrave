"use client";

import Image from "next/image";

export default function EventCard({
  image,
  title,
  model,
  category,
  warranty,
}) {
  return (
    <div
      className="
        w-full max-w-[240px]
        h-[330px]                     /* 🌟 FIXED HEIGHT */
        bg-white rounded-2xl
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        border border-[#E6F7FB]
        transition-all duration-300
        overflow-hidden
        flex flex-col                /* Ensures content stays aligned */
        group
      "
    >
      {/* IMAGE SECTION */}
      <div className="relative w-full h-[150px] bg-white">  {/* FIXED HEIGHT */}
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-contain            /* Better clarity for equipment */
            p-2
            transition-all duration-300 
            group-hover:scale-[1.04]
          "
        />

        {/* Cyan badge */}
        <div
          className="
            absolute top-2 right-2 
            bg-[#05BFDB] text-white
            text-[10px] font-semibold
            px-2 py-[3px] rounded-full shadow
          "
        >
          Premium
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-3 flex-1 flex flex-col justify-end">
        <div className="space-y-2">
          {/* TITLE */}
          <h2 className="text-[15px] font-bold text-[#0A4D68] leading-snug line-clamp-2">
            {title}
          </h2>

          {/* DETAILS BOX */}
          <div
            className="
              bg-[#F2FCFF]
              border border-[#05BFDB]/30
              rounded-xl p-3 
              space-y-1.5
              shadow-inner
              text-[12px]
            "
          >
            {model && (
              <p className="text-[#0A4D68]/80">
                <span className="font-semibold text-[#0A4D68]">Model:</span> {model}
              </p>
            )}
            {category && (
              <p className="text-[#0A4D68]/80">
                <span className="font-semibold">Category:</span> {category}
              </p>
            )}
            {warranty && (
              <p className="text-[#0A4D68]/80">
                <span className="font-semibold">Warranty:</span> {warranty}
              </p>
            )}
          </div>
        </div>

        {/* CTA BUTTON */}
        <a href="/products">
        <button
          className="
            w-full py-2 mt-3
            text-[12px] font-semibold
            rounded-lg
            bg-[#0A4D68] text-white
            shadow-[0_3px_12px_rgba(10,77,104,0.25)]
            hover:bg-[#06354A]
            hover:shadow-[0_4px_16px_rgba(10,77,104,0.35)]
            transition-all duration-300
          "
        >
          View Details
        </button>
        </a>
      </div>
    </div>
  );
}
