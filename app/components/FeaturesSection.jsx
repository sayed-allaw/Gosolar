import React from "react";
import "./FeaturesSection.css";

// Import feature images
import imgVolatility from "../assets/Eliminate Energy Cost Volatility.jpg";
import imgIRR from "../assets/Attractive.jpg";
import imgLife from "../assets/long-term asset life.jpg";
import imgBenefits from "../assets/environmental benefits.jpg";

const featureImages = [imgVolatility, imgIRR, imgLife, imgBenefits];

const FeatureItem = ({ title, description, imageSrc }) => (
  <div className="feature-item">
    <img src={imageSrc} alt={title} className="feature-image" />
    <h5>{title}</h5>
    <p>{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      title: "Eliminate Energy Cost Volatility",
      description:
        "GoSolar PV solution is having a long-term predictable cashflow, due to proved expectation of the energy output, it drives the project's return is mitigating the electricity price volatility.",
    },
    {
      title: "Attractive IRR",
      description:
        "Our structured projects can provide outstanding IRRs, in excess of company's weighted average cost of capital, besides it provides rapid payback, which is attractive given its long-term asset life",
    },
    {
      title: "long-term asset life",
      description:
        "With more than 30 years lifetime. Net-Metering contract guarantees customers not to pay electricity fees for 25 years and consider the amount supposed to be paid to electricity bills is revenue for every year",
    },
    {
      title: "environmental benefits",
      description:
        "Each system of Solar Energy is equivalent to planting many of trees acres, taking thousands cars off the roads avoiding thousands Kgs of CO2 and saving billions of gallons of gas gallons annually.",
    },
  ];

  return (
    <section className="features-section">
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            title={feature.title}
            description={feature.description}
            imageSrc={featureImages[index]}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
