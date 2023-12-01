import React, { useState } from "react";

const GoogleDrive = () => {
  const [selectedText, setSelectedText] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [annotations, setAnnotations] = useState([]);

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

  const handleAnnotationChange = (e) => {
    setAnnotation(e.target.value);
  };

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

  return (
    <div>
      <p onMouseUp={handleTextSelection}>
        For the open-source mobile application framework, see React Native.
        React Original author(s) Jordan Walke Developer(s) Meta and community
        Initial release May 29, 2013; 10 years ago[1] Stable release 18.2.0[2]
        Edit this on Wikidata / 14 June 2022; 17 months ago Repository
        github.com/facebook/react Edit this at Wikidata Written in JavaScript
        Platform Web platform Type JavaScript library License MIT License
        Website react.dev React (also known as React.js or ReactJS) is a free
        and open-source front-end JavaScript library[3][4] for building user
        interfaces based on components. It is maintained by Meta (formerly
        Facebook) and a community of individual developers and
        companies.[5][6][7] React can be used to develop single-page, mobile, or
        server-rendered applications with frameworks like Next.js. Because React
        is only concerned with the user interface and rendering components to
        the DOM, React applications often rely on libraries for routing and
        other client-side functionality.
      </p>
      {showAnnotation && (
        <div>
          <p>Selected Text: {selectedText}</p>
          <textarea
            placeholder="Add comment"
            value={annotation}
            onChange={handleAnnotationChange}
          />
          <button onClick={saveAnnotation} className="btn btn-primary">
            Save
          </button>
        </div>
      )}
      <div>
        <h2>Annotations</h2>
        <ul>
          {annotations.map((item, index) => (
            <li key={index}>
              <strong>{item.text}:</strong> {item.annotation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GoogleDrive;
