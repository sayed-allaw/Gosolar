import React from "react";
import "./IntroSection.css";

// Import action card images
import imgBusiness from "../assets/Solar for Your Business.jpg";
import imgHome from "../assets/Solar for your Home.jpg";
import imgEngineering from "../assets/Solar Engineering.jpg";

const actionImages = [imgBusiness, imgHome, imgEngineering];

const ActionCard = ({
  title,
  description,
  linkText,
  imageSrc,
  facebookLink,
}) => (
  <div className="action-card">
    <img src={imageSrc} alt={title} className="action-card-image" />
    <div className="action-card-content">
      <h4>{title}</h4>
      <p>{description}</p>
      <a
        href={facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className="read-more"
      >
        {linkText}
      </a>
    </div>
  </div>
);

const IntroSection = () => {
  // رابط صفحة فيسبوك GoSolar
  const facebookPageUrl =
    "https://www.facebook.com/people/Go-Solar/100063821541998/?mibextid=LQQJ4d";

  const cards = [
    {
      title: "Solar for Your Business",
      description:
        "Looking for an economically attractive solution to reduce your energy price volatility? With GoSolar, Secure your electricity price for 25 years.",
      linkText: "read more",
    },
    {
      title: "Solar for your Home",
      description:
        "Usually Villas and Separate houses consumes much more energy than single apartment. With GoSolar Residential Solution, you can reach 100% saving your bills.",
      linkText: "read more",
    },
    {
      title: "Solar Engineering",
      description:
        "More experience in PV Operation and Maintenance Services than any company in Egypt. GoSolar PV plants produce significantly more energy in real conditions.",
      linkText: "read more",
    },
  ];

  return (
    <section className="intro-section">
      <div className="intro-text">
        <h2>Solar Energy is not an "tomorrow" technology.</h2>
        <h3>It's the energy choice of today.</h3>
        <p>
          More and more corporations are choosing to go solar worldwide because
          of what they "get back" financially, besides what they "give back"
          environmentally.
        </p>
      </div>
      <div className="action-cards-container">
        {cards.map((card, index) => (
          <ActionCard
            key={index}
            title={card.title}
            description={card.description}
            linkText={card.linkText}
            imageSrc={actionImages[index]}
            facebookLink={facebookPageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default IntroSection;
