import React from "react";
function Filterbox(props) {
  return (
    <div className="card job_filter_card">
      <div className="card-body row m-0">
        <h4 className="card-title text-dark text-left mb-7 w-100">
          {props.filterheading}
        </h4>
        {(props.filterjson || []).map((data, i) => {
          return (
            <button
              key={i}
              type="button"
              className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
            >
              {data}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Filterbox;
