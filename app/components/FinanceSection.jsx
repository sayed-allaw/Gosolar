import React from "react";
import "./FinanceSection.css";

const PartnersSection = () => {
  // Facebook page link
  const facebookPageUrl =
    "https://www.facebook.com/people/Go-Solar/100063821541998/?mibextid=LQQJ4d";

  // Partners data
  const partners = [
    {
      name: "El Asr Company",
      description: "Strategic partner in solar energy solutions",
      logoColor: "#e74c3c",
    },
    {
      name: "Iris Energy",
      description: "Specialized in renewable energy systems",
      logoColor: "#3498db",
    },
    {
      name: "Lotus Power",
      description: "Leading expertise in sustainable energy",
      logoColor: "#f39c12",
    },
  ];

  return (
    <section className="partners-section">
      <div className="section-header">
        <h2>Our Partners</h2>
        <p>
          We are proud to collaborate with the best companies in the renewable
          energy sector
        </p>
      </div>

      <div className="partners-container">
        {partners.map((partner, index) => (
          <div key={index} className="partner-card">
            <div className="partner-logo">
              <div
                className="partner-circle"
                style={{
                  background: `linear-gradient(135deg, ${partner.logoColor}, #ffffff)`,
                }}
              >
                {partner.name.split(" ")[0].charAt(0)}
                {partner.name.split(" ")[1]?.charAt(0) || ""}
              </div>
            </div>
            <h3 className="partner-name">{partner.name}</h3>
            <p className="partner-description">{partner.description}</p>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-link"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;
