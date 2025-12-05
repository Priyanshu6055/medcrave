import HeroCarousel from "@/components/home/HeroCarousel";
import DownloadSection from "@/components/home/DownloadSection";
import VisionSection from "@/components/home/VisionSection";
import EventSection from "@/components/home/EquipmentSection";
import BlogSection from "@/components/home/BlogSection";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BlogSection/>
      <DownloadSection />
      <VisionSection />
      <EventSection />
    </>
  );
}
