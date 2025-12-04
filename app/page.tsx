import HeroCarousel from "@/components/home/HeroCarousel";
import DownloadSection from "@/components/home/DownloadSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesSection from "@/components/home/ServicesSection";
import VisionSection from "@/components/home/VisionSection";
import EventSection from "@/components/home/EventSection";
import BlogSection from "@/components/home/BlogSection";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BlogSection/>
      {/* <DownloadSection /> */}
      <AboutPreview />
      <ServicesSection />
      {/* <VisionSection /> */}
      <EventSection />
    </>
  );
}
