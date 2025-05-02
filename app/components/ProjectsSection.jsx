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

const fallbackImages = [
  imgIndustrial,
  imgAgriculture,
  imgCommercial,
  imgResidential,
  imgSolar,
  imgProject1,
];

// Helper function to check if a URL is from Google Drive
const isGoogleDriveUrl = (url) => {
  return url && typeof url === "string" && url.includes("drive.google.com");
};

// Create a direct URL for use in background-image style instead of img src
const createDirectImageUrl = (url) => {
  if (!url) return null;

  // For Google Drive URLs, create a sanitized URL
  if (isGoogleDriveUrl(url)) {
    try {
      // Extract the file ID
      const fileIdMatch = url.match(/id=([^&]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        // Return the direct URL
        return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
      }
    } catch (error) {
      console.error("Error creating direct image URL:", error);
    }
  }

  // Return the original URL for non-Google Drive URLs
  return url;
};

const ProjectCard = ({ project, onViewProject }) => {
  // Get the image URL, preferring image over imageSrc, falling back to a random fallback
  const imageUrl =
    createDirectImageUrl(project.image || project.imageSrc) ||
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  // Create a style object for the background image
  const imageStyle = {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    width: "100%",
  };

  return (
    <div className="project-card">
      <div className="project-card-image-container">
        <div
          style={imageStyle}
          role="img"
          aria-label={project.name || "Solar Station"}
        ></div>
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

  // Fetch newstations from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

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
            console.log(
              "No newstations found in Firestore, using fallback data"
            );
            setProjects(getStaticProjects());
          }
        } catch (firebaseErr) {
          console.error("Error with Firebase:", firebaseErr);
          console.log("Using fallback data due to Firebase error");
          setProjects(getStaticProjects());
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching newstations:", err);
        setError("Failed to load solar stations. Please try again later.");
        setLoading(false);
        setProjects(getStaticProjects());
      }
    };

    fetchProjects();
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
        image: fallbackImages[0],
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
        image: fallbackImages[1],
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
        image: fallbackImages[2],
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
        image: fallbackImages[3],
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
        image: fallbackImages[4],
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
        image: fallbackImages[5],
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
    setVisibleProjects((prev) => prev + 6);
  };

  return (
    <section className="projects-section">
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
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      ) : (
        <>
          <div className="projects-grid">
            {projects.slice(0, visibleProjects).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewProject={handleViewProject}
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
              <button className="load-more-btn" onClick={loadMoreProjects}>
                Load More Stations
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
