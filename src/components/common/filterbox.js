import React from "react";
import { useNavigate } from "react-router-dom";
function Filterbox(props) {
  const user_type = localStorage.getItem("userType");
  console.log(props.filterheading, user_type);

  let navigate = useNavigate();
  let OnFIlterClick = (data) => {
    // console.log("Hello");
    if (user_type === "user") {
      if (props.filterheading === " Jobs by Location") {
        console.log("Location");
        navigate(`/jobs?country=${data}`);
      } else if (props.filterheading === " Jobs by Category") {
        console.log("Category");
        navigate(`/jobs?category=${data}`);
      }
    } else {
      if (props.filterheading === " Jobs by Location") {
        console.log("Location");
        navigate(`/managejobs?country=${data}`);
      } else if (props.filterheading === " Jobs by Category") {
        console.log("Category");
        navigate(`/managejobs?category=${data}`);
      }
    }
  };
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
