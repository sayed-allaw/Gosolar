import React from "react";
import "./ServicesSection.css";

// Import service images
import imgOnGrid from "../assets/ON GRID SYSTEM.jpg";
import imgOffGrid from "../assets/OFF GRID SYSTEM.jpg";
import imgPumping from "../assets/solar pump.jpg";

const serviceImages = [imgOnGrid, imgOffGrid, imgPumping];

const ServiceCard = ({
  title,
  description,
  imageSrc,
  serviceType,
  facebookLink,
}) => (
  <div className="service-card">
    <img src={imageSrc} alt={title} className="service-card-image" />
    <div className="service-card-content">
      <h4>{title}</h4>
      <p>{description}</p>
      <a
        href={facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-service"
      >
        <span className="btn-text">Learn More</span>
        <span className="btn-icon">→</span>
      </a>
    </div>
  </div>
);

const ServicesSection = () => {
  // رابط صفحة فيسبوك GoSolar
  const facebookPageUrl =
    "https://www.facebook.com/people/Go-Solar/100063821541998/?mibextid=LQQJ4d";

  const services = [
    {
      title: "ON GRID SYSTEM",
      description:
        "Grid-tied solar systems that connect to your utility power and reduce your electricity bills.",
      serviceType: "on-grid",
    },
    {
      title: "OFF GRID SYSTEM",
      description:
        "Standalone solar systems with battery storage for areas without reliable grid access.",
      serviceType: "off-grid",
    },
    {
      title: "PUMPING SYSTEM",
      description:
        "Solar-powered pumping solutions for agriculture, water supply and irrigation with reliable performance.",
      serviceType: "pumping",
    },
  ];

  return (
    <section className="services-section" id="services-section">
      <div className="section-header">
        <h2>Our Services</h2>
        <p>
          GoSolar offers comprehensive renewable energy solutions tailored to
          your specific needs
        </p>
      </div>
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            serviceType={service.serviceType}
            imageSrc={serviceImages[index]}
            facebookLink={facebookPageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
