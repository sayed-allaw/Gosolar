import React from "react";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GoSolar" },
    {
      name: "description",
      content:
        "Learn about GoSolar, Egypt's leading solar energy provider. Discover our mission, values, expertise, and commitment to sustainable energy solutions since our founding.",
    },
    {
      property: "og:title",
      content:
        "About GoSolar - Our Story and Mission | Leading Solar Energy Provider in Egypt",
    },
    {
      property: "og:description",
      content:
        "Learn about GoSolar, Egypt's leading solar energy provider. Discover our mission, values, expertise, and commitment to sustainable energy solutions.",
    },
    {
      property: "og:url",
      content: "https://gosolar.eg/about",
    },
    {
      name: "keywords",
      content:
        "about GoSolar, solar company Egypt, solar energy mission, sustainable energy, renewable energy experts, solar team, solar company history",
    },
    {
      name: "canonical",
      content: "https://gosolar.eg/about",
    },
  ];
}

export default function AboutPage() {
  return (
    <main style={{ padding: "5rem 2rem", minHeight: "60vh" }}>
      <h1>About Us</h1>
      <p>This is the About page content. Replace this later.</p>
      {/* أضف محتوى صفحة About هنا */}
    </main>
  );
}
