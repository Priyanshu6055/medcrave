import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import SmoothScrollProvider from "./lenis";
import LoadingLayoutWrapper from "@/components/layout/LoadingLayoutWrapper";

export const metadata = {

  title: "CVRU iTBi Foundation | Best Incubation Center in Bilaspur",
  description:
    "CVRU i-TBI Foundation is Bilaspur’s leading Technology Business Incubator (TBI), empowering startups with incubation support, mentorship, funding access, legal guidance, events, modern workspaces, and entrepreneurship development programs in Chhattisgarh.",
  keywords: [
    "Best Incubation Center in Bilaspur",
    "Bilaspur Startup Incubation",
    "CVRU iTBi",
    "Chhattisgarh Incubation Center",
    "Startup Support Bilaspur",
    "Entrepreneurship Development Bilaspur",
    "Business Incubator Chhattisgarh",
    "Innovation Hub Bilaspur",
    "Startup Funding Support",
    "Mentorship for Startups",
    "TBI Bilaspur",
    "Technology Business Incubator CG",
    "CVRU Incubation Center",
    "Startup Events Bilaspur",
    "Incubation Programs Chhattisgarh"
  ],

  // 🔥 Social & Search Engine Preview
  openGraph: {
    title: "CVRU iTBi | Innovation & Startup Incubation Hub",
    description:
      "Discover an ecosystem that helps startups build, launch & scale. Access workspaces, training, mentors, funding & events.",
    url: "https://www.cvruitbi.com/",
    siteName: "CVRU iTBi Foundation",
    images: [
      {
        url: "/cvru-logo.webp",
        width: 1200,
        height: 630,
        alt: "CVRU iTBi Foundation",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // 🔥 Twitter Card SEO
  twitter: {
    card: "summary_large_image",
    title: "CVRU iTBi",
    description:
      "Empowering startups through incubation, mentoring, funding & innovation programs.",
    images: ["/cvru-logo.webp"],
  },

  // Canonical URL (Important for Google)
  alternates: {
    canonical: "https://www.cvruitbi.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="min-h-screen flex flex-col font-[Poppins] bg-white text-gray-900">
        <SmoothScrollProvider>
          <Navbar />

          <LoadingLayoutWrapper>
            <main className="flex-grow">{children}</main>
          </LoadingLayoutWrapper>

          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

