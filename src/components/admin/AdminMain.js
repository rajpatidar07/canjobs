import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
// import AdminSidebar from "./sidebar";
import AdminHeader from "./headerNew";
import AdminSidebar from "./sidebarNew";
import { LiaGripLinesSolid } from "react-icons/lia";

export default function AdminMain() {
  const [pageHeading, setPageHeading] = useState("Dashboard");
  const [sidebarWidth, setSidebarWidth] = useState(200);
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
      <div
        style={{
          width: sidebarWidth,
          backgroundColor: "#992b32",
          color: "white",
          // padding: "16px",
          boxSizing: "border-box",
          maxWidth: 400,
        }}
      >
        <AdminSidebar heading={pageHeading} setPageHeading={setPageHeading} />
      </div>
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
          // gap: 2,
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
      <div
        style={{
          flex: 1,
          // backgroundColor: "#f4f4f4",
          // padding: "16px",
          boxSizing: "border-box",
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <AdminHeader heading={pageHeading} />
        <Outlet />
      </div>
    </div>
  );
}
