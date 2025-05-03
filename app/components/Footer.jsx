import React, { useState, useRef } from "react";
import "./Footer.css";
// إضافة مكتبة أيقونات فونت أوسوم
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faBuilding,
  faPaperPlane,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
// استيراد صورة الشعار للفوتر
import footerLogo from "../../public/footer_logo.png";
// استيراد مكتبة emailjs
import emailjs from "@emailjs/browser";

const Footer = () => {
  const form = useRef();
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // تحديث حالة النموذج مع الحفاظ على أسماء الحقول الخاصة بـ EmailJS
    let formField = name;
    if (name === "user_name") formField = "name";
    if (name === "user_email") formField = "email";
    if (name === "user_phone") formField = "phone";

    setFormData((prevData) => ({ ...prevData, [formField]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus({
      submitting: true,
      submitted: false,
      error: false,
      message: "",
    });

    try {
      // استخدام emailjs لإرسال الرسالة إلى بريدك الإلكتروني
      const result = await emailjs.sendForm(
        "service_4g0dszh", // قم بتغيير هذا برقم الخدمة الخاص بك من emailjs
        "template_mrceqda", // قم بتغيير هذا برقم القالب الخاص بك من emailjs
        form.current,
        "qPppjI3bsP7G-KO-r" // قم بتغيير هذا بمفتاح API الخاص بك من emailjs
      );

      if (result.text === "OK") {
        // نجاح
        setFormStatus({
          submitting: false,
          submitted: true,
          error: false,
          message:
            "Your message has been sent successfully. We'll get back to you soon!",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        // خطأ في الاستجابة
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message:
          "Failed to send your message. Please try again later or contact us directly.",
      });
    }
  };

  // رابط صفحة فيسبوك GoSolar
  const facebookPageUrl =
    "https://www.facebook.com/people/Go-Solar/100063821541998/?mibextid=LQQJ4d";

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#298204"
            fillOpacity="0.2"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-contact">
          <div className="footer-logo">
            <img
              src={footerLogo}
              alt="GoSolar Logo"
              className="footer-logo-img"
            />
          </div>
          <h4 className="contact-title">Contact Information</h4>
          <div className="contact-item">
            <FontAwesomeIcon icon={faBuilding} className="contact-icon" />
            <p>Company Gosolar Energy </p>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
            <p>Ninth Neighborhood , Obour City , Egypt</p>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faPhone} className="contact-icon" />
            <p>Phone +201001777342</p>
          </div>
          <div className="contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <p>santaallaw@gmail.com</p>
          </div>

          <h5 className="social-title">Follow Us</h5>
          <div className="social-links">
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        <div className="footer-form" id="contact-section">
          <h4 className="form-title">Send an Inquiry</h4>

          {formStatus.submitted ? (
            <div className="form-success">
              <FontAwesomeIcon
                icon={faCheckCircle}
                size="3x"
                className="success-icon"
              />
              <h3>Thank you for your message!</h3>
              <p>{formStatus.message}</p>
              <button
                onClick={() =>
                  setFormStatus({
                    submitting: false,
                    submitted: false,
                    error: false,
                    message: "",
                  })
                }
                className="btn btn-submit"
              >
                Send Another Message
              </button>
            </div>
          ) : formStatus.error ? (
            <div className="form-error">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                size="3x"
                className="error-icon"
              />
              <h3>Message not sent</h3>
              <p>{formStatus.message}</p>
              <p>
                You can also reach us directly at:{" "}
                <strong>santaallaw@gmail.com</strong>
              </p>
              <button
                onClick={() =>
                  setFormStatus({
                    submitting: false,
                    submitted: false,
                    error: false,
                    message: "",
                  })
                }
                className="btn btn-submit"
              >
                Try Again
              </button>
            </div>
          ) : (
            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="user_email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="user_phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-submit"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="fa-spin btn-icon"
                    />{" "}
                    Sending...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} className="btn-icon" />{" "}
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Gosolar  . All Rights
          Reserved.
        </p>
        <div className="footer-links">
          <p>
          Designed & Developed by{" "}
            <a
              href="https://www.facebook.com/sayed.allaw.54/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#4caf50",
                fontWeight: "bold",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#45a049")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#4caf50")}
            >
              Sayed Allaw
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
