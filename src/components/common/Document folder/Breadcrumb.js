import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ data, setFolderID }) => {
  const length = data?.length || 0;
  const getName = (item, index) => (index === 0 ? "Home" : item.name.replaceAll("_", " "));
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb" style={{ padding: 5, margin: 0, borderRadius: 3 }}>
        {(data || []).map((item, index) => (
          <li key={index} className={`breadcrumb-item ${index === length - 1 ? "active" : ""}`}>
            {index === length - 1 ? (
              <span>{getName(item, index)}</span>
            ) : (
              <Link onClick={() => setFolderID(item.id)}>{getName(item, index)}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
