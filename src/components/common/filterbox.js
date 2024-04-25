import React from "react";
import { useNavigate } from "react-router-dom";
function Filterbox(props) {
  const user_type = localStorage.getItem("userType");

  let navigate = useNavigate();
  let OnFIlterClick = (data) => {
    if (user_type === " ") {
      if (props.filterheading === "Jobs by Location") {
        navigate(`/managejobs?country=${data}`);
      } else if (props.filterheading === "Jobs by Category") {
        navigate(`/managejobs?category=${data}`);
      }
    } else {
      if (props.filterheading === " Jobs by Location") {
        navigate(`/jobs?country=${data}`);
      } else if (props.filterheading === " Jobs by Category") {
        navigate(`/jobs?category=${data}`);
      }
    }
  };
  return (
    <div className="job_filter_card job_filter_card_home">
      <div className="card-body row m-0 p-2">
        <h6 className="card-title text-dark text-left mb-4 w-100 ">
          {props.filterheading}
        </h6>
        {props.type === "category"
          ? (props.filterjson || []).map((data, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4 text-capitalize"
                  onClick={() => OnFIlterClick(data.id)}
                >
                  {data.value}
                </button>
              );
            })
          : (props.filterjson || []).map((data, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4 text-capitalize"
                  onClick={() => OnFIlterClick(data)}
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
