import React, { useState, useEffect } from "react";
import { FaFlag } from "react-icons/fa";

/**
 * Component for text annotation and image annotation.
 */
const Annotation = () => {
  // Text Annotation State
  const [selectedText, setSelectedText] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  // Image Annotation State
  const [imageAnnotations, setImageAnnotations] = useState([]);
  const [comments, setComments] = useState({});
  const [currentAnnotation, setCurrentAnnotation] = useState({ x: 0, y: 0 });
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [isAnnotationMode, setAnnotationMode] = useState(false);

  // Handle text selection for annotation
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
      setSelectedText(selectedText);
      setShowAnnotation(true);
    } else {
      setShowAnnotation(false);
    }
  };

  // Handle annotation change for text annotation
  const handleAnnotationChange = (e) => {
    setAnnotation(e.target.value);
  };

  // Save text annotation
  const saveAnnotation = () => {
    if (selectedText && annotation) {
      setAnnotations((prevAnnotations) => [
        ...prevAnnotations,
        { text: selectedText, annotation },
      ]);
      setSelectedText("");
      setAnnotation("");
      setShowAnnotation(false);
    }
  };

  // Handle mouse down event to set current annotation for image annotation
  const handleMouseDown = (e) => {
    if (isAnnotationMode) {
      const imageRect = e.target.getBoundingClientRect();
      setCurrentAnnotation({
        x: e.clientX - imageRect.left,
        y: e.clientY - imageRect.top,
      });
    }
  };

  // Handle mouse up event to save the current annotation for image annotation
  const handleMouseUp = () => {
    if (isAnnotationMode) {
      setImageAnnotations([...imageAnnotations, currentAnnotation]);
      setCurrentAnnotation({ x: 0, y: 0 });
    }
  };

  // Toggle annotation mode for image annotation
  const toggleAnnotationMode = () => {
    setAnnotationMode(!isAnnotationMode);
    setSelectedAnnotation(null);
  };

  // Handle flag click to select the annotation and toggle the form visibility for image annotation
  const handleFlagClick = (annotation) => {
    if (
      selectedAnnotation &&
      selectedAnnotation.x === annotation.x &&
      selectedAnnotation.y === annotation.y
    ) {
      setSelectedAnnotation(null);
    } else {
      setSelectedAnnotation(annotation);
    }
  };

  // Generate a list of comments from the state for image annotation
  const getCommentsList = () => {
    const commentsList = [];
    for (const key in comments) {
      if (comments.hasOwnProperty(key)) {
        commentsList.push({ coordinates: key, comment: comments[key] });
      }
    }
    return commentsList;
  };

  // Effect to add the current annotation to the annotations array for image annotation
  useEffect(() => {
    if (currentAnnotation.x !== 0 && currentAnnotation.y !== 0) {
      setImageAnnotations([...imageAnnotations, currentAnnotation]);
      setCurrentAnnotation({ x: 0, y: 0 });
    }
  }, [currentAnnotation]);

  return (
    <div>
      {/* Annotation */}
      <div style={{ position: "relative", overflow: "scroll" }}>
        <img
          src="https://image.slidesharecdn.com/nextgenerationofdatascientist-220221085037/75/next-generation-of-data-scientist-4-2048.jpg?cb=1668057843"
          alt="Annotated Image"
          style={{ height: "50%", width: "50%" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />

        {imageAnnotations.map((annotation, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: annotation.x - 5,
              top: annotation.y - 5,
              cursor: "pointer",
            }}
            onClick={() => handleFlagClick(annotation)}
          >
            <FaFlag
              style={{
                color:
                  selectedAnnotation &&
                  selectedAnnotation.x === annotation.x &&
                  selectedAnnotation.y === annotation.y
                    ? "pink"
                    : "red",
              }}
            />
          </div>
        ))}

        {selectedAnnotation && (
          <div
            style={{
              position: "absolute",
              left: selectedAnnotation.x + 10,
              top: selectedAnnotation.y + 20,
              zIndex: 1,
            }}
          >
            <form>
              <input
                type="text"
                value={
                  comments[`${selectedAnnotation.x}-${selectedAnnotation.y}`] ||
                  ""
                }
                onChange={(e) =>
                  setComments({
                    ...comments,
                    [`${selectedAnnotation.x}-${selectedAnnotation.y}`]:
                      e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedAnnotation(null);
                }}
              >
                Save Comment
              </button>
            </form>
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <button onClick={toggleAnnotationMode}>
            {isAnnotationMode ? "Finish Annotation" : "Start Annotation"}
          </button>
          <h2>List of Comments:</h2>
          <ul>
            {getCommentsList().map((commentItem, index) => (
              <li key={index} className="text-break">
                <strong>{commentItem.coordinates}:</strong>{" "}
                {commentItem.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Annotation;
