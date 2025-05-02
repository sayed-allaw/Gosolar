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
    { title: "GoSolar" }, // تحديث عنوان الصفحة
    {
      name: "description",
      content:
        "Professional solar energy solutions for homes and businesses. Reduce your electricity bills with our solar systems.", // تحديث وصف الصفحة
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
  ];
}

export default function Home() {
  return (
    <main>
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
