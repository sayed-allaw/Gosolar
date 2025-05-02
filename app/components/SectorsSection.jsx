import React from "react";
import "./SectorsSection.css";

// استيراد صور القطاعات
import imgIndustrial from "../assets/Industrial.jpg";
import imgAgriculture from "../assets/agriculture.jpg";
import imgCommercial from "../assets/commerical.jpg";
import imgResidential from "../assets/resdential.jpg";

const sectorImages = [
  imgIndustrial,
  imgAgriculture,
  imgCommercial,
  imgResidential,
];

const SectorCard = ({
  title,
  description,
  buttonText,
  imageSrc,
  facebookLink,
}) => (
  <div className="sector-card">
    <img src={imageSrc} alt={title} className="sector-card-image" />
    <h4>{title}</h4>
    <p>{description}</p>
    <a
      href={facebookLink}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-sector"
    >
      {buttonText}
    </a>
  </div>
);

const SectorsSection = () => {
  // رابط صفحة فيسبوك GoSolar
  const facebookPageUrl =
    "https://www.facebook.com/people/Go-Solar/100063821541998/?mibextid=LQQJ4d";

  const sectors = [
    {
      title: "Industrial",
      description: "Factories, Warehouses, Workshops, etc.",
      buttonText: "ask for our industrial offers",
    },
    {
      title: "agriculture",
      description: "Crop Farms, Poultry Farms, Dairy Farms, etc.",
      buttonText: "ask for our agriculture offers",
    },
    {
      title: "commerical",
      description: "Administrative Buildings, Hospitals, Schools, etc.",
      buttonText: "ask for our commercial offers",
    },
    {
      title: "resdential",
      description: "Villas, Twin and Town Houses, Buildings, etc.",
      buttonText: "ask for our residential offers",
    },
  ];

  return (
    <section className="sectors-section">
      <div className="section-header">
        <h2>Sectors we cover</h2>
        <p>
          We have expertise in deploying solar energy solutions across different
          sectors, from industrial complexes to residential properties.
      </p>
      </div>
      <div className="sectors-grid">
        {sectors.map((sector, index) => (
          <SectorCard
            key={index}
            title={sector.title}
            description={sector.description}
            buttonText={sector.buttonText}
            imageSrc={sectorImages[index]}
            facebookLink={facebookPageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default SectorsSection;
 