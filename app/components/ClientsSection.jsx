"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import "./ClientsSection.css";

// Import client image (example)
import clientImage from "../assets/clinet.jpg";

// Rating stars component
const RatingStars = ({ rating = 5 }) => {
  return (
    <div className="rating-stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({
  name,
  company,
  image,
  quote,
  rating = 5,
  isActive,
}) => (
  <div className={`testimonial-card ${isActive ? "active" : ""}`}>
    <div className="testimonial-content">
      <div className="quote-icon">❝</div>

      {/* Client information at the top */}
      <div className="testimonial-author">
        <img src={image} alt={name} className="testimonial-avatar" />
        <div className="author-info">
          <h4>{name}</h4>
          <p>{company}</p>
        </div>
      </div>

      {/* Review text in Arabic remains unchanged */}
      <p className="testimonial-quote">{quote}</p>

      {/* Stars at the bottom */}
      <RatingStars rating={rating} />
    </div>
  </div>
);

const ClientsSection = () => {
  // Testimonials data with ratings
  const testimonials = [
    {
      name: "Mohammed Ahmed",
      company: "Sun Energy Co.",
      image: clientImage,
      rating: 5,
      quote:
        "عملنا مع شركة أونا كان تجربة رائعة. المشروع اكتمل قبل الموعد المحدد وأدى إلى توفير كبير في فواتير الكهرباء.",
    },
    {
      name: "Layla Khalid",
      company: "Hope Foundation",
      image: clientImage,
      rating: 5,
      quote:
        "الفريق الفني محترف للغاية والتركيب كان دقيقًا وسريعًا. نتائج المشروع فاقت توقعاتنا ونوصي بهذه الشركة.",
    },
    {
      name: "Omar Sami",
      company: "Palm Hotel",
      image: clientImage,
      rating: 4,
      quote:
        "استثمارنا في الطاقة الشمسية كان القرار الأمثل. وفّرنا أكثر من 40% من فواتير الكهرباء خلال العام الأول فقط.",
    },
    {
      name: "Sarah Mahmoud",
      company: "Mercy Hospital",
      image: clientImage,
      rating: 5,
      quote:
        "جودة المنتجات والخدمات التي قدمتها شركة أونا تستحق كل تقدير. الألواح الشمسية تعمل بكفاءة عالية.",
    },
    {
      name: "Kareem Fouad",
      company: "Light Factory",
      image: clientImage,
      rating: 5,
      quote:
        "تمكنا من تقليل انبعاثات الكربون وتوفير تكاليف الطاقة بشكل كبير. شركاء موثوقون في التحول نحو الطاقة النظيفة.",
    },
  ];

  // State for the current active slide and auto-play control
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  // Function to go to next slide
  const nextSlide = useCallback(() => {
    setPrevIndex(activeIndex);
    setDirection("right");
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  }, [activeIndex, testimonials.length]);

  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    setPrevIndex(activeIndex);
    setDirection("left");
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }, [activeIndex, testimonials.length]);

  // Setup intersection observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-advance slides when visible and not paused
  useEffect(() => {
    if (isVisible && !isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 6000); // Change slide every 6 seconds
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, isPaused, nextSlide]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isVisible) return;

      if (e.key === "ArrowLeft") {
        nextSlide(); // For RTL direction (Arabic)
      } else if (e.key === "ArrowRight") {
        prevSlide(); // For RTL direction (Arabic)
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, nextSlide, prevSlide]);

  // Get slide class based on index and active state
  const getSlideClass = (index) => {
    if (index === activeIndex) return "active";
    if (prevIndex === null) return "";

    if (
      direction === "right" &&
      (index === prevIndex ||
        (prevIndex === testimonials.length - 1 && index === 0))
    )
      return "prev-slide";

    if (
      direction === "left" &&
      (index === prevIndex ||
        (prevIndex === 0 && index === testimonials.length - 1))
    )
      return "next-slide";

    return "";
  };

  return (
    <section className="clients-section" ref={sectionRef}>
      <div className="testimonial-container">
        <h2>Client Testimonials</h2>
        <p className="section-intro">
          We're proud of what our clients say about their experience with us
        </p>

        <div
          className="custom-slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="slider-arrow prev-arrow"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ❮
          </button>

          <div className="testimonial-wrapper">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-slide ${getSlideClass(index)}`}
                aria-hidden={index !== activeIndex}
              >
                <TestimonialCard
                  name={testimonial.name}
                  company={testimonial.company}
                  image={testimonial.image}
                  quote={testimonial.quote}
                  rating={testimonial.rating}
                  isActive={index === activeIndex}
                />
              </div>
            ))}
          </div>

          <button
            className="slider-arrow next-arrow"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ❯
          </button>
        </div>

        <div className="slider-dots" role="tablist">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                setPrevIndex(activeIndex);
                setDirection(index > activeIndex ? "right" : "left");
                setActiveIndex(index);
              }}
              aria-label={`Slide ${index + 1}`}
              aria-selected={index === activeIndex}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
