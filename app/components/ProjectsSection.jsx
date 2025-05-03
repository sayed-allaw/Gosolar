import React, { useState, useEffect } from "react";
import "./ProjectsSection.css";
import ProjectDetails from "./ProjectDetails";

// Import fallback images
import imgIndustrial from "../assets/Industrial.jpg";
import imgCommercial from "../assets/commerical.jpg";
import imgAgriculture from "../assets/agriculture.jpg";
import imgResidential from "../assets/resdential.jpg";
import imgSolar from "../assets/Solar for Your Business.jpg";
import imgProject1 from "../assets/project1.jpg";
import imgMainFallback from "../assets/main.png";

const fallbackImages = [
  imgIndustrial,
  imgAgriculture,
  imgCommercial,
  imgResidential,
  imgSolar,
  imgProject1,
];

// ثابت للصورة البديلة الافتراضية
const DEFAULT_FALLBACK_IMAGE = imgMainFallback;

// Helper function to check if a URL is from Google Drive
const isGoogleDriveUrl = (url) => {
  return url && typeof url === "string" && url.includes("drive.google.com");
};

// Create a direct URL for use in background-image style instead of img src
const createDirectImageUrl = (url) => {
  if (!url) return null;

  // Decode the URL first to handle encoded characters like &amp;
  const decodedUrl = decodeURIComponent(url.replace(/&amp;/g, "&"));

  // For Google Drive URLs, create a sanitized URL
  if (isGoogleDriveUrl(decodedUrl)) {
    try {
      // Extract the file ID
      const fileIdMatch = decodedUrl.match(/id=([^&]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];

        // استخدام صيغة الرابط الأكثر موثوقية
        return `https://drive.google.com/uc?export=view&id=${fileId}`;

        // يمكن تجربة هذه الروابط البديلة إذا استمرت المشكلة:
        // return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
        // return `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    } catch (error) {
      console.error("Error creating direct image URL:", error);
    }
  }

  // Return the decoded URL for non-Google Drive URLs
  return decodedUrl;
};

const ProjectCard = ({ project, onViewProject, style }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [alternateUrl, setAlternateUrl] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef(null);

  // Get the image URL, preferring image over imageSrc, falling back to a random fallback
  const initialImageUrl = createDirectImageUrl(
    project.image || project.imageSrc
  );

  // استخدام الرابط البديل إذا كان متاحًا
  const imageUrl = alternateUrl || initialImageUrl;

  // Intersection Observer to only load images when they come into view
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" } // Start loading when within 200px of viewport
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // قم بإنشاء صورة مؤقتة للتحقق من صحة تحميل الصورة
  React.useEffect(() => {
    if (isVisible && initialImageUrl) {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.onerror = (error) => {
        console.error(`Error loading image for ${project.name}:`, error);

        // محاولة استخدام رابط بديل
        if (isGoogleDriveUrl(initialImageUrl)) {
          try {
            const fileIdMatch = initialImageUrl.match(/id=([^&]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
              const fileId = fileIdMatch[1];
              // تجربة شكل رابط بديل
              const newUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
              setAlternateUrl(newUrl);
              return;
            }
          } catch (error) {
            console.error("Error creating alternate image URL:", error);
          }
        }
        setImageError(true);
      };
      img.src = initialImageUrl;
    }
  }, [isVisible, initialImageUrl, project.name]);

  // محاولة ثانية مع الرابط البديل إذا تم تعيينه
  React.useEffect(() => {
    if (isVisible && alternateUrl) {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.onerror = () => {
        // تجربة شكل رابط آخر
        if (isGoogleDriveUrl(initialImageUrl)) {
          try {
            const fileIdMatch = initialImageUrl.match(/id=([^&]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
              const fileId = fileIdMatch[1];
              const thirdUrl = `https://lh3.googleusercontent.com/d/${fileId}`;

              // محاولة ثالثة للتحميل
              const thirdImg = new Image();
              thirdImg.onload = () => {
                setAlternateUrl(thirdUrl);
                setImageLoaded(true);
              };
              thirdImg.onerror = () => {
                // إذا فشلت كل المحاولات، سنستخدم الصورة البديلة main.png
                console.log(
                  `All load attempts failed for ${project.name}, using main.png fallback`
                );
                setImageError(true);
              };
              thirdImg.src = thirdUrl;
              return;
            }
          } catch (error) {
            console.error("Error creating third image URL:", error);
          }
        }
        setImageError(true);
      };
      img.src = alternateUrl;
    }
  }, [isVisible, alternateUrl, initialImageUrl, project.name]);

  // Create a style object for the background image
  const imageStyle = {
    backgroundImage: imageLoaded ? `url("${imageUrl}")` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    width: "100%",
  };

  const placeholderStyle = {
    height: "100%",
    width: "100%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="project-card" style={style} ref={cardRef}>
      <div className="project-card-image-container">
        {!isVisible || (!imageLoaded && !imageError) ? (
          // Show subtle loading placeholder
          <div style={placeholderStyle} className="image-placeholder">
            <div className="placeholder-pulse"></div>
          </div>
        ) : imageError ? (
          // عرض رسالة خطأ بدلاً من الصورة البديلة
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f8f8f8",
              color: "#d32f2f",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "24px", marginBottom: "10px" }}>⚠️</span>
            <p style={{ margin: "0", fontWeight: "bold" }}>
              خطأ في تحميل الصورة
            </p>
            <p style={{ margin: "5px 0 0", fontSize: "0.8rem" }}>
              يرجى التحقق من اتصال الإنترنت
            </p>
          </div>
        ) : (
          <div
            style={imageStyle}
            role="img"
            aria-label={project.name || "Solar Station"}
          ></div>
        )}
        <div className="project-card-overlay">
          <button
            className="btn-view-project"
            onClick={() => onViewProject(project)}
          >
            View Project
          </button>
        </div>
      </div>
      <div className="project-card-content">
        <h3 className="project-title">{project.name || "Solar Station"}</h3>
        <div className="project-meta">
          <span className="project-location">
            {project.location || "Egypt"}
          </span>
          <span className="project-capacity">
            {project.station_capacity || "N/A"}
          </span>
        </div>
        <p className="project-description">
          {project.details || "Solar energy station"}
        </p>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch newstations from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        // التحقق من الاتصال بالإنترنت
        if (!navigator.onLine) {
          setError(
            "No internet connection. Please check your connection and try again."
          );
          setLoading(false);
          return;
        }

        // Try to import Firebase if it exists
        try {
          const { db } = await import("../firebase/firebaseConfig");
          const { collection, getDocs } = await import("firebase/firestore");

          console.log("Fetching newstations from Firestore...");

          // Fetch data from the 'newstations' collection
          const projectsCollection = collection(db, "newstations");
          const projectsSnapshot = await getDocs(projectsCollection);

          // Map document data to project objects
          const projectsData = projectsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log(
            "Loaded",
            projectsData.length,
            "newstations from Firestore"
          );

          if (projectsData.length > 0) {
            setProjects(projectsData);
          } else {
            setError("No projects found. Please try again later.");
          }
        } catch (firebaseErr) {
          console.error("Error with Firebase:", firebaseErr);
          setError(
            "Could not connect to the database. Please check your internet connection and try again."
          );
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching newstations:", err);
        setError(
          "Failed to load projects. Please check your internet connection and try again."
        );
        setLoading(false);
      }
    };

    // إضافة مستمع للتغيرات في حالة الاتصال بالإنترنت
    const handleOnlineStatusChange = () => {
      if (!navigator.onLine) {
        setError(
          "Internet connection lost. Please check your connection and try again."
        );
      } else {
        // إذا عاد الاتصال، حاول إعادة تحميل المشاريع
        fetchProjects();
      }
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    fetchProjects();

    // تنظيف المستمعين عند تفكيك المكون
    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  // Update document title
  useEffect(() => {
    document.title = "GoSolar - Our Solar Stations";
  }, []);

  // Fallback data in case Firestore fails
  const getStaticProjects = () => {
    return [
      {
        id: "1",
        name: "Solar Energy for Food Factory",
        location: "Industrial Zone, Cairo",
        station_capacity: "250 kW",
        details:
          "Grid-connected solar system installation for a large food factory, saving 40% of annual energy consumption.",
        cables: "Premium quality cables",
        Inverter: "High-efficiency inverter",
      },
      {
        id: "2",
        name: "Poultry Farm Solar Solution",
        location: "Beheira, Egypt",
        station_capacity: "180 kW",
        details:
          "Solar-diesel hybrid solution for a poultry farm, reducing energy costs by 60%.",
        cables: "Weather-resistant cables",
        Inverter: "Hybrid inverter system",
      },
      {
        id: "3",
        name: "Hospital Solar Power System",
        location: "Alexandria, Egypt",
        station_capacity: "320 kW",
        details:
          "Integrated solar system for a private hospital with battery storage for emergency backup.",
        cables: "Medical-grade cables",
        Inverter: "Backup-enabled inverter",
      },
      {
        id: "4",
        name: "Residential Compound Clean Energy",
        location: "New Cairo, Egypt",
        station_capacity: "500 kW",
        details:
          "Equipping an entire residential compound with rooftop solar systems to power common areas.",
        cables: "Residential-grade cables",
        Inverter: "Multi-unit inverter system",
      },
      {
        id: "5",
        name: "Shopping Mall Solar Installation",
        location: "Sheikh Zayed, Egypt",
        station_capacity: "420 kW",
        details:
          "Grid-connected solar system with energy efficiency solutions for a large shopping mall.",
        cables: "Commercial-grade cables",
        Inverter: "High-capacity inverter",
      },
      {
        id: "6",
        name: "Eco-friendly Textile Factory",
        location: "Borg El Arab, Alexandria",
        station_capacity: "350 kW",
        details:
          "Comprehensive solar solution for a textile factory with advanced energy management technologies.",
        cables: "Industrial-grade cables",
        Inverter: "Smart grid inverter",
      },
    ];
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    // Prevent scrolling on background
    document.body.style.overflow = "hidden";
  };

  const handleCloseProjectDetails = (nextProject = null) => {
    if (nextProject) {
      // If we're navigating to another project, show that one
      setSelectedProject(nextProject);
    } else {
      // Otherwise close the modal
      setSelectedProject(null);
      // Re-enable scrolling
      document.body.style.overflow = "auto";
    }
  };

  const loadMoreProjects = () => {
    // Show loading state
    setLoadingMore(true);

    // Use setTimeout to allow browser to paint and prevent UI freeze
    setTimeout(() => {
      // Pre-calculate the new visible projects count
      const newCount = Math.min(visibleProjects + 6, projects.length);

      // Pre-load images
      const newProjects = projects.slice(visibleProjects, newCount);
      const preloadPromises = newProjects.map((project) => {
        return new Promise((resolve) => {
          // المحاولة الأولى باستخدام الرابط الأصلي
          const url = createDirectImageUrl(project.image || project.imageSrc);

          if (!url) {
            // إذا لم يكن هناك رابط، قم بتحميل الصورة البديلة
            const fallbackImg = new Image();
            fallbackImg.onload = resolve;
            fallbackImg.onerror = resolve;
            fallbackImg.src = DEFAULT_FALLBACK_IMAGE;
            return;
          }

          const img = new Image();
          img.onload = resolve;
          img.onerror = () => {
            // في حالة الفشل، قم بتحميل الصورة البديلة
            console.log(
              `Preloading fallback image for ${project.name || "Project"}`
            );
            const fallbackImg = new Image();
            fallbackImg.onload = resolve;
            fallbackImg.onerror = resolve;
            fallbackImg.src = DEFAULT_FALLBACK_IMAGE;
          };
          img.src = url;
        });
      });

      // When all images are preloaded (or at least attempted)
      Promise.all(preloadPromises)
        .then(() => {
          setVisibleProjects(newCount);
          setLoadingMore(false);
        })
        .catch(() => {
          // If any errors, still show the projects
          setVisibleProjects(newCount);
          setLoadingMore(false);
        });
    }, 100); // Small delay to allow UI to update
  };

  return (
    <section className="projects-section">
      {/* Animated background elements */}
      <div className="bg-animated-circle"></div>
      <div className="bg-animated-circle"></div>
      <div className="bg-animated-circle"></div>

      <div className="projects-header">
        <h2>Our Solar Stations</h2>
        <p>
          We're proud to have successfully implemented numerous solar stations
          across different sectors. Discover some of our outstanding work in the
          field of solar energy.
        </p>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading solar stations...</p>
        </div>
      ) : error ? (
        <div
          className="error-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "70px 40px",
            background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
            borderRadius: "16px",
            textAlign: "center",
            margin: "60px auto",
            maxWidth: "720px",
            boxShadow: "rgba(17, 12, 46, 0.08) 0px 48px 100px 0px",
            color: "#1a202c",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background decorative elements */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "8px",
              background: "linear-gradient(90deg, #4caf50, #8bc34a, #2e7d32)",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(229,239,255,0.7) 0%, rgba(249,250,252,0) 70%)",
              zIndex: 0,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(229,239,255,0.6) 0%, rgba(249,250,252,0) 65%)",
              zIndex: 0,
            }}
          ></div>

          {/* Error icon */}
          <div
            style={{
              marginBottom: "35px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(239, 255, 244, 0.8)",
                boxShadow: "rgba(76, 175, 80, 0.15) 0px 8px 24px",
              }}
            >
              <svg
                width="55"
                height="55"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="#4caf50"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V13"
                  stroke="#4caf50"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="16" r="1.25" fill="#4caf50" />
                <path
                  opacity="0.2"
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  fill="#4caf50"
                />
              </svg>
            </div>
          </div>

          {/* Error messages */}
          <h2
            style={{
              margin: "0 0 18px 0",
              color: "#1a202c",
              fontSize: "2.2rem",
              fontWeight: "700",
              letterSpacing: "-0.03em",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
              position: "relative",
              zIndex: 2,
            }}
          >
            Connection Error
          </h2>

          <p
            className="error-message"
            style={{
              fontSize: "1.25rem",
              margin: "0 0 35px 0",
              lineHeight: "1.6",
              color: "#4a5568",
              maxWidth: "540px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
              position: "relative",
              zIndex: 2,
            }}
          >
            {error}
          </p>

          {/* Action button */}
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              padding: "16px 36px",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "600",
              transition: "all 0.25s ease",
              boxShadow: "rgba(76, 175, 80, 0.35) 0px 10px 30px -10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 2,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "rgba(76, 175, 80, 0.5) 0px 20px 30px -10px";
              e.currentTarget.style.backgroundColor = "#43a047";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "rgba(76, 175, 80, 0.35) 0px 10px 30px -10px";
              e.currentTarget.style.backgroundColor = "#4caf50";
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: "8px" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4V10H7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.51 15C4.15839 16.8404 5.38734 18.4202 7.01166 19.5014C8.63598 20.5826 10.5677 21.1066 12.5157 20.9945C14.4637 20.8824 16.3226 20.1402 17.8121 18.8798C19.3017 17.6193 20.3413 15.909 20.7742 14.0064C21.2072 12.1037 21.0101 10.1119 20.2126 8.33111C19.4152 6.55033 18.0605 5.0768 16.3528 4.13277C14.6451 3.18874 12.6769 2.82527 10.7447 3.09712C8.81245 3.36897 7.02091 4.26142 5.64 5.64L1 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="projects-grid">
            {projects.slice(0, visibleProjects).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewProject={handleViewProject}
                style={{ "--card-index": index % 6 }} // Reset index for each new batch
              />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="no-projects">
              <p>No solar stations available</p>
            </div>
          )}

          {projects.length > visibleProjects && (
            <div className="load-more-container">
              <button
                className={`load-more-btn ${loadingMore ? "loading" : ""}`}
                onClick={loadMoreProjects}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More Stations"}
              </button>
            </div>
          )}
        </>
      )}

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={handleCloseProjectDetails}
          allProjects={projects}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
