import React from "react";
import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GoSolar" },
    {
      name: "description",
      content:
        "Contact GoSolar today for a free consultation on solar energy solutions for your home or business in Egypt. Our experts are ready to help you reduce electricity bills and switch to clean energy.",
    },
    {
      property: "og:title",
      content: "Contact GoSolar - Get a Free Solar Energy Consultation | Egypt",
    },
    {
      property: "og:description",
      content:
        "Contact our solar energy experts for a free consultation. We provide customized solar solutions for homes and businesses across Egypt.",
    },
    {
      property: "og:url",
      content: "https://gosolar.eg/contact",
    },
    {
      name: "keywords",
      content:
        "contact GoSolar, solar energy consultation, solar panel installation Egypt, free solar quote, solar energy experts, solar company contact",
    },
    {
      name: "canonical",
      content: "https://gosolar.eg/contact",
    },
  ];
}

export default function ContactPage() {
  return (
    <main style={{ padding: "5rem 2rem", minHeight: "60vh" }}>
      <h1>Contact Us</h1>
      <p>This is the Contact page content. Replace this later.</p>
      {/* أضف محتوى صفحة Contact هنا (ربما نموذج اتصال أكبر) */}
    </main>
  );
}
