import type { Route } from "./+types/home";
// import { Welcome } from "../welcome/welcome"; // إزالة استيراد Welcome

// استيراد مكونات الصفحة الرئيسية
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import IntroSection from "../components/IntroSection";
import ProductsSection from "../components/ProductsSection";
import WhyUsSection from "../components/WhyUsSection";
import SectorsSection from "../components/SectorsSection";
// استيراد المكونات الجديدة
import PortfolioSection from "../components/PortfolioSection";
import ClientsSection from "../components/ClientsSection";
import PartnersSection from "../components/FinanceSection";
// ملاحظة: مكون Footer سيتم إضافته في root.tsx

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GoSolar" },
    {
      name: "description",
      content:
        "GoSolar provides professional solar energy solutions for homes and businesses in Egypt. Reduce your electricity bills by up to 100% with our high-quality solar systems. Get a free consultation today!",
    },
    {
      property: "og:title",
      content: "GoSolar - Leading Solar Energy Solutions in Egypt",
    },
    {
      property: "og:description",
      content:
        "Reduce your electricity bills by up to 100% with our high-quality solar systems. Professional installation for homes and businesses across Egypt.",
    },
    {
      property: "og:url",
      content: "https://gosolar.eg/",
    },
    {
      name: "keywords",
      content:
        "solar energy, solar panels, renewable energy, Egypt, electricity bills, solar power, green energy, sustainable energy, GoSolar",
    },
    // استخدام favicon.ico كأيقونة للموقع
    {
      rel: "icon",
      href: "/favicon.ico",
      type: "image/x-icon",
    },
    {
      rel: "shortcut icon",
      href: "/favicon.ico",
      type: "image/x-icon",
    },
    {
      name: "canonical",
      content: "https://gosolar.eg/",
    },
  ];
}

export default function Home() {
  // Schema.org structured data for LocalBusiness
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "GoSolar",
    description:
      "Professional solar energy solutions for homes and businesses in Egypt. Reduce your electricity bills with our high-quality solar systems.",
    url: "https://gosolar.eg",
    logo: "https://gosolar.eg/images/logo.png",
    image: "https://gosolar.eg/images/gosolar-building.jpg",
    telephone: "+20123456789",
    email: "info@gosolar.eg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Solar Street",
      addressLocality: "Cairo",
      addressRegion: "Cairo",
      postalCode: "12345",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.0444",
      longitude: "31.2357",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/people/Go-Solar/100063821541998/",
      "https://twitter.com/gosolar",
      "https://www.instagram.com/gosolar.eg/",
    ],
    priceRange: "$$",
    areaServed: "Egypt",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <HeroSection />
      <FeaturesSection />
      <IntroSection />
      <ProductsSection />
      <WhyUsSection />
      <SectorsSection />
      {/* إضافة المكونات الجديدة */}
      <PortfolioSection />
      <ClientsSection />
      <PartnersSection />
      {/* <Welcome /> */}
      {/* إزالة مكون Welcome */}
      {/* سنضيف الأقسام المتبقية هنا (Portfolio, Clients, Finance, Footer) */}
    </main>
  );
}
