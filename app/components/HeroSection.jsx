import React, { useState, useEffect, useRef } from "react";
import "./HeroSection.css";
import heroBackground1 from "../assets/background.jpg";
import heroBackground2 from "../assets/background2.jpg";
import heroBackground3 from "../assets/background3.jpg";

const HeroSection = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [nextBgIndex, setNextBgIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  const backgrounds = [heroBackground1, heroBackground2, heroBackground3];

  const startTransition = (index) => {
    // إلغاء أي تأثير انتقالي حالي
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsTransitioning(true);
    setNextBgIndex(index);

    // تطبيق التغيير بعد فترة زمنية قصيرة للسماح بتأثير الانتقال
    timeoutRef.current = setTimeout(() => {
      setCurrentBgIndex(index);
      setIsTransitioning(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBgIndex + 1) % backgrounds.length;
      startTransition(nextIndex);
    }, 7000); // زيادة المدة إلى 7 ثوانٍ لتوفير مدة أطول لمشاهدة كل خلفية

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentBgIndex, backgrounds.length]);

  const handleIndicatorClick = (index) => {
    if (currentBgIndex !== index) {
      startTransition(index);
    }
  };

  return (
    <section className="hero-section">
      <div
        className={`hero-bg current-bg ${isTransitioning ? "fade-out" : ""}`}
        style={{ backgroundImage: `url(${backgrounds[currentBgIndex]})` }}
      ></div>
      <div
        className={`hero-bg next-bg ${isTransitioning ? "fade-in" : ""}`}
        style={{ backgroundImage: `url(${backgrounds[nextBgIndex]})` }}
      ></div>

      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="animated-title">
          Let <span className="highlight">SUN</span> pays your
          <br />
          electricity bills
        </h1>
        <div className="hero-description">
          <p>
            With GoSolar Net-Metering Solar Energy Solution, you can benefit
            from the sun to produce your electricity and have your own Solar
            System and get a <span className="highlight">FREE OF CHARGE</span>{" "}
            electricity bill up to 20 years.
          </p>
          <p>
            Or Reduce your Electricity bills up to{" "}
            <span className="highlight">15%</span> through buying electricity
            from us.
          </p>
        </div>
        <div className="hero-buttons">
          <a
            href="https://www.facebook.com/people/Go-Solar/100063821541998/?mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span className="btn-text">BUY SOLAR SYSTEM</span>
            <span className="btn-icon">→</span>
          </a>
          <a
            href="https://www.facebook.com/people/Go-Solar/100063821541998/?mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <span className="btn-text">BUY SOLAR ELECTRICITY</span>
            <span className="btn-icon">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
