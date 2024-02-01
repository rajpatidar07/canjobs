import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import GlobalSearchBox from "./globalSearchCard";

function GlobalSearch() {
  const [show, setshow] = useState(true);
  return (
    <div className="global_search_box">
      <i className="fas fa-search text-white" onClick={() => setshow(true)}></i>
      <div
        className={
          show
            ? "global_search_content position-fixed show"
            : "global_search_content position-fixed"
        }
      >
        <div className="global_search d-flex align-items-center p-3 px-5">
          <InputGroup className="search_box d-flex align-items-center position-relative">
            <Form.Control
              placeholder="Search"
              aria-describedby="basic-addon2"
            />
            <a
              href={undefined}
              style={{ position: "absolute", right: "5px" }}
              className="fas fa-search text-dark"
            ></a>
          </InputGroup>
          <i
            style={{ fontSize: "22px" }}
            className="fas fa-times text-dark ml-4"
            onClick={() => setshow(false)}
          ></i>
        </div>
        <div className="global_search_result px-5">
          <h5 className="font-size-2 font-weight-bold m-0 border-bottom">
            USER
          </h5>
          <GlobalSearchBox />
          <GlobalSearchBox />
          <GlobalSearchBox />
          <GlobalSearchBox />
          <GlobalSearchBox />
        </div>
      </div>
    </div>
  );
}

export default GlobalSearch;
