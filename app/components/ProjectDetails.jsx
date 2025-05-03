import React from "react";
import "./ProjectDetails.css";
import imgMainFallback from "../assets/main.png"; // استيراد صورة main.png البديلة

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

        // العديد من الأشكال البديلة لنفس الرابط في حالة فشل أحدها
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

const ProjectDetails = ({ project, onClose, allProjects }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [alternateUrl, setAlternateUrl] = React.useState(null);

  if (!project) return null;

  // Get the main image source
  const mainImage = createDirectImageUrl(project.image || project.imageSrc);

  // إضافة لوج للتأكد من الرابط الذي يتم استخدامه
  console.log("Project image URL:", mainImage);

  // Create a style object for the background image
  const imageStyle = {
    backgroundImage: imageError
      ? `url("${imgMainFallback}")`
      : `url("${alternateUrl || mainImage}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    width: "100%",
  };

  // استخدام React.useEffect لمراقبة تحميل الصورة ومحاولة استخدام URL بديل في حالة الفشل
  React.useEffect(() => {
    if (mainImage) {
      const img = new Image();
      img.onload = () => {
        console.log("Image loaded successfully:", mainImage);
        setImageLoaded(true);
      };
      img.onerror = (e) => {
        console.error("Error loading image:", e, mainImage);
        // محاولة استخدام رابط بديل
        if (isGoogleDriveUrl(mainImage)) {
          try {
            const fileIdMatch = mainImage.match(/id=([^&]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
              const fileId = fileIdMatch[1];
              // تجربة شكل رابط بديل
              const newUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
              console.log("Trying alternate URL:", newUrl);
              setAlternateUrl(newUrl);
              return;
            }
          } catch (error) {
            console.error("Error creating alternate image URL:", error);
          }
        }
        setImageError(true);
      };
      img.src = mainImage;
    }
  }, [mainImage]);

  // محاولة ثانية مع الرابط البديل إذا تم تعيينه
  React.useEffect(() => {
    if (alternateUrl) {
      const img = new Image();
      img.onload = () => {
        console.log("Alternate image loaded successfully:", alternateUrl);
        setImageLoaded(true);
      };
      img.onerror = () => {
        console.error("Error loading alternate image:", alternateUrl);
        // تجربة شكل رابط آخر
        if (isGoogleDriveUrl(mainImage)) {
          try {
            const fileIdMatch = mainImage.match(/id=([^&]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
              const fileId = fileIdMatch[1];
              const thirdUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
              console.log("Trying third URL format:", thirdUrl);

              // محاولة ثالثة للتحميل
              const thirdImg = new Image();
              thirdImg.onload = () => {
                console.log("Third URL format loaded successfully:", thirdUrl);
                setAlternateUrl(thirdUrl);
                setImageLoaded(true);
              };
              thirdImg.onerror = () => {
                console.error(
                  "All URL formats failed, using main.png fallback"
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
  }, [alternateUrl, mainImage]);

  const handleImageError = () => {
    console.log(`Fallback to direct img for ${project.name}`);
    setImageError(true);
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
            aria-label="Previous Project"
          >
            &#10094;
          </button>
        )}

        {hasNext && (
          <button
            className="nav-btn next-btn"
            onClick={handleNextProject}
            aria-label="Next Project"
          >
            &#10095;
          </button>
        )}

        <div className="project-details-content">
          <div className="project-details-gallery">
            {imageError ? (
              // استخدام عنصر img كبديل عندما يفشل استخدام background-image
              <img
                src={mainImage}
                alt={project.name || "Solar Station"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={handleImageError}
                className="project-details-main-image"
              />
            ) : (
              <div
                style={imageStyle}
                role="img"
                aria-label={project.name || "Solar Station"}
                className="project-details-main-image"
              ></div>
            )}
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
