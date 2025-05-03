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
          background: "linear-gradient(135deg, #298204, #25a244, #00b09b)",
          color: "white",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animation elements */}
        <div className="animated-bg-elements">
          <div
            className="animated-circle"
            style={{
              position: "absolute",
              top: "-50px",
              left: "10%",
              width: "180px",
              height: "180px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              animation: "float 8s infinite ease-in-out",
            }}
          ></div>
          <div
            className="animated-circle"
            style={{
              position: "absolute",
              bottom: "-80px",
              right: "15%",
              width: "220px",
              height: "220px",
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "50%",
              animation: "float 7s infinite ease-in-out 1s",
            }}
          ></div>
          <div
            className="animated-line"
            style={{
              position: "absolute",
              top: "60%",
              left: "0",
              width: "100%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              animation: "pulse 4s infinite",
            }}
          ></div>
        </div>

        <h1
          style={{
            fontSize: "2.8rem",
            marginBottom: "1rem",
            position: "relative",
            zIndex: 2,
            animation: "fadeInDown 1s ease-out",
          }}
        >
          Our Solar Stations
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
            animation: "fadeInUp 1s ease-out 0.3s",
            animationFillMode: "both",
          }}
        >
          Explore our successful solar energy stations and renewable energy
          solutions implemented across various sectors
        </p>
      </div>
      <ProjectsSection />
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
