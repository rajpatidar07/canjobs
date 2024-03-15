import React from "react";
// import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function GlobalSearchCard(props) {
  return (
    <Link
      className="py-1 border-bottom w-100"
      to={props.to}
      onClick={() => localStorage.setItem("company_id", props.id)}
    >
      <div className="d-flex profile_box gx-2 justify-content-between">
        <div className=" mb-0">
          <span className="m-0 font-size-4 font-weight-bold text-capitalize">
            {props.name}
          </span>
          {props.company === ("" || undefined) ? (
            ""
          ) : (
            <p className="m-0 font-size-2 font-weight-bold text-uppercase">
              {props.company}
            </p>
          )}
          {/* <p className="text-gray font-size-3 m-0 text-capitalize">
            M(married, 25Y)
          </p> */}
          <p className="m-0 font-size-3">{props.mobile}</p>
          <p className="m-0 font-size-3">{props.email}</p>
        </div>
        {/* <div className="contact_div text-right">
          <p className="m-0 font-size-3">1234567890</p>
          <p className="m-0 font-size-3">email@email.com</p>
        </div> */}
      </div>
    </Link>
  );
}

export default GlobalSearchCard;
