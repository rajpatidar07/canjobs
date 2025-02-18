/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const StyledDropdown = ({
    options,
    value,
    onChange,
    width,
    status_name,
    name
}) => {
    const [isOpen, setIsOpen] = useState(false);
    // We'll store either top or bottom positioning
    const [dropdownPosition, setDropdownPosition] = useState({ left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        const handleResize = () => {
            if (isOpen) {
                updateDropdownPosition();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("scroll", handleScroll, true);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("resize", handleResize);
        };
    }, [isOpen]);

    const updateDropdownPosition = () => {
        if (!buttonRef.current) return;

        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        const dropdownWidth = Math.min(width || buttonRect.width, viewportWidth - 20);
        const dropdownHeight = Math.min(options.length * 45 + 16, 400);

        let left = buttonRect.left;
        let top = buttonRect.bottom + 5;

        const spaceBelow = viewportHeight - buttonRect.bottom - 5;
        if (spaceBelow < dropdownHeight) {

            const bottom = viewportHeight - buttonRect.top + 5;
            setDropdownPosition({
                left: left,
                bottom: bottom,
                width: dropdownWidth,
            });
        } else {

            if (left + dropdownWidth > viewportWidth) {
                left = viewportWidth - dropdownWidth - 10;
            }
            if (left < 0) {
                left = 10;
            }
            setDropdownPosition({
                left: left,
                top: top,
                width: dropdownWidth,
            });
        }
    };

    const handleOpenDropdown = (e) => {
        e.stopPropagation();
        updateDropdownPosition();
        setIsOpen((prev) => !prev);
    };
    const highlightColors = [
        "#ff5733", "#33ff57", "#5733ff", "#ff33a8", "#33a8ff",
        "#ffd700", "#ff8c00", "#00ced1", "#dc143c", "#32cd32"
    ];

    const getColor = (option) => {
        let hash = 0;
        for (let i = 0; i < option.length; i++) {
            hash = (hash * 31 + option.charCodeAt(i)) % highlightColors.length;
        }
        return highlightColors[hash] || "gray";
    };

    const renderDropdown = () => {
        if (!isOpen) return null;

        // Determine whether we are using top or bottom positioning
        const positionStyle = dropdownPosition.top !== undefined
            ? { top: dropdownPosition.top }
            : { bottom: dropdownPosition.bottom };

        return createPortal(
            <div
                ref={dropdownRef}
                style={{
                    position: "fixed",
                    left: dropdownPosition.left,
                    width: dropdownPosition.width,
                    background: "#fff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    borderRadius: "8px",
                    padding: "8px",
                    zIndex: 99999,
                    maxHeight: "400px",
                    overflowY: "auto",
                    ...positionStyle,
                    animation:
                        positionStyle.top !== undefined
                            ? "dropdownFadeInDown 0.2s ease-out"
                            : "dropdownFadeInUp 0.2s ease-out",
                }}
            >

                {/* Animation styles */}
                <style>
                    {`
            @keyframes dropdownFadeInDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes dropdownFadeInUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
                </style>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
                        gap: "5px",
                    }}
                >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onChange) {
                                    onChange({
                                        target: {
                                            name: name,
                                            value: option.id
                                        }
                                    });
                                }
                                setIsOpen(false);
                            }}
                            className="rounded-md-3 font-bold text-center"
                            style={{
                                padding: "10px",
                                backgroundColor: getColor(option.value),
                                color: "white",
                                transition: "transform 0.1s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            {option.value}
                        </div>
                    ))}
                </div>
            </div>,
            document.body
        );
    };

    return (
        <div className="w-full" style={{ position: "static" }}>
            <div
                ref={buttonRef}
                className="rounded-md  font-bold text-center"
                onClick={handleOpenDropdown}
                style={{
                    backgroundColor: value
                        ? getColor(value)
                        : "gray",
                    color: "white",
                    padding: "10px",
                    position: "relative",
                    cursor: "pointer",
                }}
            >
                {(options && options.find((item) => item.id === value)?.value) || `Select ${status_name}`}
            </div>
            {renderDropdown()}
        </div>
    );
};

export default StyledDropdown;