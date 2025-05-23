import React, { useState, useEffect } from "react";
import ConvertTime from "./Common function/ConvertTime";

const TableInput = ({ value, onChange, name, type, className = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleClick = () => {
    if (!isEditing) {
      setIsTransitioning(true);
      // Add delay before showing input
      setTimeout(() => {
        setIsEditing(true);
        setIsTransitioning(false);
      }, 150); // 150ms delay for smooth transition
    }
  };

  const handleBlur = () => {
    setIsTransitioning(true);
    // Add delay before hiding input
    setTimeout(() => {
      setIsEditing(false);
      setIsTransitioning(false);
      onChange({
        target: {
          name: name,
          value: inputValue,
        },
      });
    }, 10);
  };

  return (
    <div
      className={`editable-input ${className}`}
      onClick={handleClick}
      style={{
        cursor: "pointer",
        minWidth: "150px",
        position: "relative",
        overflow:"hidden"
      }}
    >
      <div
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 150ms ease-in-out",
        }}
      >
        {isEditing ? (
          <input
            type={type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="form-control p-0 outline-0 border-0"
            style={{
              //   border: "2px solid #007bff",
              //   borderRadius: "5px",
              outline: "none",
              width: "100%",
              animation: "inputFadeIn 150ms ease-in-out",
              lineHeight: 1,
              height: "auto",
            }}
          />
        ) : (
          <span
            style={{
              display: "block",
              animation: "textFadeIn 150ms ease-in-out",
            }}
          >
            {type === "date" ? <ConvertTime _date={inputValue} format={"DD/MM/YYYY"} /> : inputValue || "Click to Add"}
          </span>
        )}
      </div>
    </div>
  );
};

export default TableInput;
