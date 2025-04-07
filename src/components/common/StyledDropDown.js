/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { AddFIlter } from "../../api/api";
import { Link } from "react-router-dom";

const StyledDropdown = ({
    options,
    value,
    onChange,
    width,
    status_name,
    name,
    filterItemID,
    setFilterListApiCall
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [addStatusFieldOpen, setAddStatusFieldOpen] = useState(false);
    const [showUpdateDropDown, setShowUpdateDropDown] = useState("");
    const [updateStatusData, setUpdateStatusData] = useState();
    const [newStatus, setNewStatus] = useState("");
    const [statusErrors, setStatusErrors] = useState("");

    // We'll store either top or bottom positioning
    const [dropdownPosition, setDropdownPosition] = useState({ left: 0 });
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);
    let closeStatusFieldStates = () => {
        setNewStatus("");
        setStatusErrors("");
        setAddStatusFieldOpen(false)
        setUpdateStatusData()
        setShowUpdateDropDown("")
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                closeStatusFieldStates()
            }
        };

        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
                closeStatusFieldStates()
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
        setStatusErrors("")
        setNewStatus("")
    };
    const highlightColors = [
        "#ff5733", "#33ff57", "#5733ff", "#ff33a8", "#33a8ff",
        "#ffd700", "#ff8c00", "#00ced1", "#dc143c", "#32cd32"
    ];

    const handleRightClick = (e, option) => {
        e.preventDefault();
        setUpdateStatusData(option); // Set the status to be updated
        setNewStatus(option.value); // Prefill input with existing status value
        setAddStatusFieldOpen(true);
    };
    const getColor = (option) => {
        let hash = 0;
        for (let i = 0; i < option.length; i++) {
            hash = (hash * 31 + option.charCodeAt(i)) % highlightColors.length;
        }
        return highlightColors[hash] || "gray";
    };
    const onAddStatusBlur = async (event) => {
        event.preventDefault();

        if (newStatus) {
            let data = {
                json_item: newStatus,
                item_id: updateStatusData ? updateStatusData?.id : ""
            };
            try {
                const responseData = await AddFIlter(data, filterItemID);
                if (responseData.message === "item already exist !") {
                    setStatusErrors(`${status_name} already exist !`);
                    setNewStatus("");
                }
                if (responseData.message === "filter item added successfully") {
                    toast.success(`${status_name} added successfully `, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                    });
                    setFilterListApiCall(true);
                    closeStatusFieldStates();
                }
            } catch (err) {
                console.log(err);
                setStatusErrors("");
            }
        } else {
            setIsOpen(false);
            closeStatusFieldStates()
        }
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
                                if (showUpdateDropDown !== option.id) {
                                    if (onChange) {
                                        onChange({
                                            target: {
                                                name: name,
                                                value: option.id
                                            }
                                        });
                                    }
                                    setIsOpen(false);
                                    closeStatusFieldStates()
                                }
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
                            onContextMenu={(e) => {
                                e.preventDefault();
                                if (filterItemID) { setShowUpdateDropDown(option.id) }
                            }}

                        >
                            {showUpdateDropDown === option.id && (
                                <ul className="list-group position-absolute z-index-1 bg-white shadow-sm">
                                    <li className="list-group-item">
                                        <Link
                                            className="text-decoration-none"
                                            onClick={(e) => {
                                                handleRightClick(e, option)
                                            }}
                                        >
                                            Update  {status_name}
                                        </Link>
                                    </li></ul>
                            )}
                            {option.value}
                        </div>
                    ))}
                </div>
                {addStatusFieldOpen ?
                    <div className="border-top text-center mt-2 form-group">
                        <label
                            htmlFor="status"
                            className="font-size-4 text-black-2 mt-3 line-height-reset"
                        >{updateStatusData ? "Update" : "Add new"} {status_name}</label>
                        <div className="d-flex"> <input
                            id="status"
                            name="status"
                            className="form-control mt-3"
                            value={newStatus}
                            onFocus={addStatusFieldOpen}
                            onChange={(e) => setNewStatus(e.target.value)}
                            onBlur={(e) => onAddStatusBlur(e)}
                            onKeyDown={(e) => e.key === "Enter" && onAddStatusBlur(e)}
                        />

                            <button className=" btn-sm btn-primary mt-4 mx-2" onClick={(e) => onAddStatusBlur(e)}>
                                +
                            </button>
                        </div>
                        <small className="text-danger ">{statusErrors}</small>
                    </div>
                    : <div className={filterItemID ? "border-top text-center mt-2" : "d-non"}>
                        <button className="btn btn-light mt-2" onClick={() => setAddStatusFieldOpen(true)}>+ Add new {status_name}</button></div>}
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
                    backgroundColor: (options && options.find((item) => item.id === parseInt(value))?.value)
                        ? getColor(value)
                        : "gray",
                    color: "white",
                    padding: "10px",
                    position: "relative",
                    cursor: "pointer",
                }}
            >
                {(options && options.find((item) => item.id === parseInt(value))?.value) || `Select ${status_name}`}
            </div>
            {renderDropdown()}
        </div>
    );
};

export default StyledDropdown;