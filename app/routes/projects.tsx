import React from "react";
import { useRouteError } from "react-router-dom";
import ProjectsSection from "../components/ProjectsSection";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Error Occurred!</h1>
      <p>There was a problem loading the solar stations page</p>
      <pre>{error.message || "Unknown error"}</pre>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main>
      <div
        className="page-header"
        style={{
          padding: "120px 2rem 80px",
          background: "linear-gradient(to left, #004a99, #298204)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
          Our Solar Stations
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto" }}>
          Explore our successful solar energy stations and renewable energy
          solutions implemented across various sectors
        </p>
      </div>
      <ProjectsSection />
    </main>
  );
}
