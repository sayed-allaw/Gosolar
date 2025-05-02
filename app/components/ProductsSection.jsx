import React from "react";
import "./ProductsSection.css";

// Import product images
import imgOnGrid from "../assets/ON GRID SYSTEM.jpg";
import imgOffGrid from "../assets/OFF GRID SYSTEM.jpg";
import imgPumping from "../assets/solar pump.jpg";

const productImages = [imgOnGrid, imgOffGrid, imgPumping];

const ProductCard = ({ title, description, imageSrc }) => (
  <div className="product-card">
    <img src={imageSrc} alt={title} className="product-card-image" />
    <div className="product-card-content">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </div>
);

const ProductsSection = () => {
  const products = [
    {
      title: "ON GRID SYSTEM",
      description:
        "For customers who have already an electricity line and wants to reduce their electricity bills during the coming 25 years through connecting a solar PV system to their electricity network and having a bi-directional meter instead.",
    },
    {
      title: "OFF GRID SYSTEM",
      description:
        "For customers without electricity line from the national electricity companies, and looking for a sustainable solution for their commercial buildings, farms, etc. The main two solutions on this system is a battery system or direct solar pumping.",
    },
    {
      title: "PUMPING SYSTEM",
      description:
        "Our solar-powered pumping systems provide a reliable and cost-effective solution for agriculture irrigation, water supply, and other pumping needs. These systems operate efficiently even in remote areas without grid access.",
    },
  ];

  return (
    <section className="products-section" id="products-section">
      <div className="section-header">
        <h2>Our Products</h2>
        <p>
          We provide high-quality solar energy products to meet diverse energy
          needs
        </p>
      </div>
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            description={product.description}
            imageSrc={productImages[index]}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
