import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ data, setFolderID }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol
        className="breadcrumb"
        style={{ padding: 5, margin: 0, borderRadius: 3 }}
      >
        {(data || []).map((item, index) => (
          <li
            key={item.id}
            className={`breadcrumb-item ${
              index === data.length - 1 ? "active" : ""
            }`}
          >
            {index === data.length - 1 ? (
              <span>{index === 0 ? "Home" : item.name.replaceAll("_", " ")}</span>
            ) : (
              <Link onClick={() => setFolderID(item.id)}>
                {index === 0 ? "Home" : item.name.replaceAll("_", " ")}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
