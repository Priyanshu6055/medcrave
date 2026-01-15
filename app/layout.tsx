import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import SmoothScrollProvider from "./lenis";
import LoadingLayoutWrapper from "@/components/layout/LoadingLayoutWrapper";

export const metadata = {
  title: "Medcrave Biomedicals | Medical Equipment Supplier, Diagnostics Devices supplier, Laboratory Hospital Devices, Point of Care Devices",
  description:
    "Medical Equipment Supplier, Diagnostics Devices supplier, Laboratory Hospital Devices, Point of Care Devices",

  keywords: [
    "Medcrave Biomedicals",
    "Herbal extracts manufacturer India",
    "Nutraceutical ingredients supplier",
    "Pharmaceutical raw materials",
    "Ayurvedic extracts wholesale",
    "Biomedical solutions India",
    "Pharma-grade herbal extracts",
    "Natural ingredients for nutraceuticals",
    "GMP certified herbal manufacturer",
    "Pharmaceutical API supplier",
    "Medcrave products",
    "Medicinal plant extracts",
    "Herbal and botanical extracts company",
    "Nutraceutical manufacturing India",
    "Organic herbal extracts supplier",
  ],

  openGraph: {
    title: "Medcrave Biomedicals | Medical Equipment Supplier, Diagnostics Devices supplier, Laboratory Hospital Devices, Point of Care Devices",
    description:
      "Medical Equipment Supplier, Diagnostics Devices supplier, Laboratory Hospital Devices, Point of Care Devices",
    url: "https://www.medcravebiomedicals.com/",
    siteName: "Medcrave Biomedicals",
    images: [
      {
        url: "/logos/medcrave-og.jpg",
        width: 1200,
        height: 630,
        alt: "Medcrave Biomedicals",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Medcrave Biomedicals",
    description:
      "Medical Equipment Supplier, Diagnostics Devices supplier, Laboratory Hospital Devices, Point of Care Devices",
    images: ["/logos/medcrave-og.jpg"],
  },

  alternates: {
    canonical: "https://www.medcravebiomedicals.com/",
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

          {/* <LoadingLayoutWrapper> */}
            <main className="flex-grow">{children}</main>
          {/* </LoadingLayoutWrapper> */}

          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

