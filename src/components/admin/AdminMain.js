import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
// import AdminSidebar from "./sidebar";
import AdminHeader from "./headerNew";
import AdminSidebar from "./sidebarNew";
// import { LiaGripLinesSolid } from "react-icons/lia";

export default function AdminMain() {
  const [pageHeading, setPageHeading] = useState(
    localStorage.getItem("admin_heading") || "Dashboard"
  );
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => (isDragging.current = true);
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const containerLeft =
      containerRef.current?.getBoundingClientRect().left || 0;
    const newWidth = e.clientX - containerLeft;
    setSidebarWidth(Math.max(0, newWidth));
  };
  const handleMouseUp = () => (isDragging.current = false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true); // Open sidebar on desktop by default
      }
    };
    // Set initial state based on current window size
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: window.innerWidth <= 768 ? (isSidebarOpen ? "250px" : "0") : sidebarWidth,
          backgroundColor: "#992b32",
          color: "white",
          boxSizing: "border-box",
          maxWidth: 500,
          position: window.innerWidth <= 768 ? "fixed" : "relative",
          top: 0,
          left: 0,
          height: "100vh",
          // zIndex: 1000,
          transition: "width 0.3s ease",
          overflow: "hidden",
        }}
      >
        <AdminSidebar heading={pageHeading} setPageHeading={setPageHeading} toggleSidebar={toggleSidebar} />
      </div>

      {/* Resizable divider - only on desktop */}
      {window.innerWidth > 768 && (
        <div
          onMouseDown={handleMouseDown}
          style={{
            width: "5px",
            backgroundColor: "#ccc",
            cursor: "col-resize",
            userSelect: "none",
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 1,
              height: "100%",
              backgroundColor: "#f5f5f5",
              margin: 1,
            }}
          ></div>
          <div
            style={{
              width: 1,
              height: "100%",
              backgroundColor: "#f5f5f5",
              margin: 1,
            }}
          ></div>
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          boxSizing: "border-box",
          position: "relative",
          width: "100%",
          overflow: "hidden",
          marginLeft: window.innerWidth <= 768 && isSidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        <AdminHeader
          heading={pageHeading}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <Outlet />
      </div>

      {/* Overlay for mobile */}
      {window.innerWidth <= 768 && isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
