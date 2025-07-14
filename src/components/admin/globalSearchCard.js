import React from "react";
import { Link } from "react-router-dom";

function GlobalSearchCard(props) {
  const handleSearchClick = () => {
    if (props.title === "Client Details") {
      localStorage.setItem("company_id", props.id);
    } else if (props.title === "Partner Profile") {
      localStorage.setItem("agent_id", props.id);
    }
    props.close();
  };
  return (
    <Link
      className="py-1 border-bottom w-100"
      to={props.to}
      title={props.title}
      onClick={handleSearchClick}>
      <div className="d-flex profile_box gx-2 justify-content-between">
        <div className="mb-0">
          <span className="m-0 font-size-4 font-weight-bold text-capitalize text-break text-truncate" title={props.name}>
            {props.name}
          </span>
          {props.company === ("" || undefined) ? (
            ""
          ) : (
            <p className="m-0 font-size-2 font-weight-bold text-uppercase text-break">
              {props.company}
            </p>
          )}
          <p className="m-0 font-size-3 text-break">{props.mobile}</p>
          <p className="m-0 font-size-3 text-break">{props?.email?.replace(/,/g, " ")}</p>
        </div>
      </div>
    </Link>
  );
}

export default GlobalSearchCard;
