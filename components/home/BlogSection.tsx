import BlogSlider from "@/components/ui/BlogSlider";

export default function BoxSection() {
  return (
    <section className="py-12 bg-[#f4f8fb]">
      <div className="container-global">
        {/* CARD WRAPPER LIKE THE LOWER SECTION */}
        <div
          className="
            relative 
            rounded-2xl 
            p-6 md:p-10 
            bg-white/70 
            backdrop-blur-xl 
            border border-gray-200/40 
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          "
        >
          {/* Optional background image inside the card */}
          <div
            className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-10 bg-[#2e43b8]"
            style={{
              backgroundImage: "url('/bg/video-section-bg.jpg')",
            }}
          />

          {/* CONTENT */}
          <div className="relative z-10">
            <BlogSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
