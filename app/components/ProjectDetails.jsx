import React from "react";
import "./ProjectDetails.css";

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

const ProjectDetails = ({ project, onClose, allProjects }) => {
  if (!project) return null;

  // Get the main image source
  const mainImage = createDirectImageUrl(project.image || project.imageSrc);

  // Create a style object for the background image
  const imageStyle = {
    backgroundImage: `url("${mainImage}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    width: "100%",
  };

  // Get completion year from Firestore or default to 2023
  const completionYear = project.completionYear || 2023;

  // Get system type from Firestore or default to "Grid Connected"
  const systemType = project.systemType || "Grid Connected";

  // Find current project index
  const currentIndex = allProjects
    ? allProjects.findIndex((p) => p.id === project.id)
    : -1;
  const hasNext = currentIndex !== -1 && currentIndex < allProjects.length - 1;
  const hasPrevious = currentIndex > 0;

  // Navigate to next project
  const handleNextProject = (e) => {
    e.stopPropagation();
    if (hasNext && allProjects) {
      onClose(allProjects[currentIndex + 1]);
    }
  };

  // Navigate to previous project
  const handlePreviousProject = (e) => {
    e.stopPropagation();
    if (hasPrevious && allProjects) {
      onClose(allProjects[currentIndex - 1]);
    }
  };

  return (
    <div
      className="project-details-overlay"
      onClick={(e) => {
        if (e.target.className === "project-details-overlay") {
          onClose();
        }
      }}
    >
      <div className="project-details-container">
        <button className="close-btn" onClick={() => onClose()}>
          &times;
        </button>

        {/* Navigation arrows */}
        {hasPrevious && (
          <button
            className="nav-btn prev-btn"
            onClick={handlePreviousProject}
            aria-label="Previous station"
          >
            &#10094;
          </button>
        )}

        {hasNext && (
          <button
            className="nav-btn next-btn"
            onClick={handleNextProject}
            aria-label="Next station"
          >
            &#10095;
          </button>
        )}

        <div className="project-details-content">
          <div className="project-details-gallery">
            <div
              style={imageStyle}
              role="img"
              aria-label={project.name || "Solar Station"}
              className="project-details-main-image"
            ></div>
            {project.category && (
              <div className="project-category-badge">{project.category}</div>
            )}
          </div>

          <div className="project-details-info">
            <h2>{project.name || "Solar Station"}</h2>

            <div className="project-info-grid">
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">
                  {project.location || "Egypt"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Capacity</span>
                <span className="info-value">
                  {project.station_capacity || "N/A"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Cables</span>
                <span className="info-value">
                  {project.cables || "Standard cables"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Inverter</span>
                <span className="info-value">
                  {project.Inverter || "Standard inverter"}
                </span>
              </div>
            </div>

            <div className="project-description-full">
              <h3>Project Description</h3>
              <p>{project.details || "Solar energy station project"}</p>
              {project.fullDescription && <p>{project.fullDescription}</p>}
            </div>

            {currentIndex !== -1 && allProjects && (
              <div className="project-navigation-small">
                <span>
                  Station {currentIndex + 1} of {allProjects.length}
                </span>
                <div className="small-nav-buttons">
                  {hasPrevious && (
                    <button onClick={handlePreviousProject}>Previous</button>
                  )}
                  {hasNext && <button onClick={handleNextProject}>Next</button>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
