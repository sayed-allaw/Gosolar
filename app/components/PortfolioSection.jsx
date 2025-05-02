import React, { useState, useEffect, useRef } from "react";
import CountUpNumber from "./CountUpNumber";
import "./PortfolioSection.css";

const StatItem = ({ value, unit, description, isInView }) => (
  <div className="stat-item">
    <CountUpNumber end={value} duration={2000} isInView={isInView} />
    <span className="stat-unit">{unit}</span>
    <p className="stat-description">{description}</p>
  </div>
);

const PortfolioSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { value: 12100, unit: "acres", description: "of trees planted per year" },
    { value: 10000, unit: "homes", description: "powered each year" },
    { value: 11200, unit: "cars", description: "off the roads" },
    {
      value: 4991050000,
      unit: "Kg",
      description: "of CO2 avoidance each year",
    }, // Adjusted based on original site text
    { value: 4145640, unit: "gallons", description: "of gas saved annually" }, // Adjusted based on original site text
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      className="portfolio-section"
      ref={sectionRef}
      id="portfolio-section"
    >
      <h2>Portfolio</h2>
      <p className="portfolio-intro">
        We are very proud to reach providing solar solutions for our
        customers...
        {/* Full text from original site can be added here */}
      </p>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            value={stat.value}
            unit={stat.unit}
            description={stat.description}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
