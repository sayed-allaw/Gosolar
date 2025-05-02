import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // سنقوم بإنشاء هذا الملف لاحقًا للتنسيقات
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
// استيراد صورة الشعار
import footerLogo from "../../public/footer_logo.png";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const lastScrollY = useRef(0);

  // الانتقال السلس إلى قسم معين
  const scrollToSection = (sectionId) => {
    console.log(`Attempting to scroll to ${sectionId}`);
    const section = document.getElementById(sectionId);
    console.log("Section found:", section);

    if (section) {
      // Give a little delay to ensure the section is fully rendered
      setTimeout(() => {
        const headerHeight =
          document.querySelector(".header")?.offsetHeight || 80;
        const sectionPosition =
          section.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: sectionPosition - headerHeight,
          behavior: "smooth",
        });

        console.log(
          `Scrolled to ${sectionId} at position ${
            sectionPosition - headerHeight
          }`
        );
      }, 100);
    } else {
      console.log(`Section ${sectionId} not found`);
      // If the section is not found, we might be on a different page
      // Save the section ID to localStorage and redirect to home
      localStorage.setItem("scrollToSection", sectionId);
      window.location.href = "/";
    }

    setMobileMenuOpen(false);
  };

  // Check for saved scroll positions on page load
  useEffect(() => {
    const savedSection = localStorage.getItem("scrollToSection");
    if (savedSection) {
      localStorage.removeItem("scrollToSection");

      // Wait for the page to load fully before scrolling
      setTimeout(() => {
        scrollToSection(savedSection);
      }, 500);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsTop(currentScrollY === 0);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // If closing the menu, also close any open dropdowns
    if (mobileMenuOpen) {
      setActiveMobileDropdown(null);
    }
  };

  const toggleMobileDropdown = (name) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  return (
    <header
      className={`
        header
        ${!isVisible ? "header--hidden" : ""}
        ${!isTop ? "header--scrolled" : ""}
        ${mobileMenuOpen ? "mobile-menu-open" : ""}
      `}
    >
      <div className="logo">
        <Link to="/">
          <img src={footerLogo} alt="GoSolar Logo" className="main-logo" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a
              href="#portfolio-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("portfolio-section");
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#products-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("products-section");
              }}
            >
              Service
            </a>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <a
              href="#contact-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact-section");
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${mobileMenuOpen ? "is-open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <a
              href="#portfolio-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("portfolio-section");
                setMobileMenuOpen(false);
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#products-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("products-section");
                setMobileMenuOpen(false);
              }}
            >
              Service
            </a>
          </li>
          <li>
            <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <a
              href="#contact-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact-section");
                setMobileMenuOpen(false);
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
