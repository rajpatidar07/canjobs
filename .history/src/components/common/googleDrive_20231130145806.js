// GoogleDrive.js
import React, { useEffect } from "react";
import "annotator";
import "annotator/dist/css/annotator.min.css";

const GoogleDrive = () => {
  useEffect(() => {
    // Initialize AnnotatorJS
    const element = document.getElementById("annotator-container");
    const annotator = $(element).annotator();

    // Example: Add an annotation programmatically
    annotator.annotator("addPlugin", "Tags");
  }, []);

  return (
    <div>
      <h1>AnnotatorJS in React</h1>
      <div id="annotator-container">
        {/* Your content goes here */}
        <p>This is the content you want to annotate.</p>
      </div>
    </div>
  );
};

export default GoogleDrive;
