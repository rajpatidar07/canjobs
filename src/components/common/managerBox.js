import React from "react";
import AssignedJobTable from "./assignedJobTable";
export default function ManegerBox({
  data,
  isLoading,
  handleSort,
  nPages,
  currentPage,
  setCurrentPage,
  totalData,
  allData
}) {
  return (
    <div className="col-md-6">
    <div className="card mb-4 p-4">
      <div className="col form_group ">
        <div className="d-flex executive_box gx-2">
          <div className="media  align-items-center">
            <div className="circle-40 mx-auto overflow-hidden">
              {/* {empdata.profile_photo === null ? ( */}
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt=""
                className="w-100"
              />
              {/* ) : (
                                  <img
                                    src={empdata.profile_photo}
                                    alt=""
                                    className="w-100"
                                  />
                                )} */}
            </div>
          </div>

          <div className=" mb-0">
            {/* {empdata.name === null ||
                              empdata.name === undefined ||
                              empdata.name === "undefined" ||
                              empdata.name === "" ? (
                                <p className="font-size-3  mb-0">Unavailable</p>
                              ) : ( */}
            <h5 className="m-0 text-black-3 font-weight-bold text-capitalize">
              {data.name}{" "}
              <small className="text-gray font-size-3 m-0 text-capitalize">
                ({data.admin_type})
              </small>
            </h5>
            {/* )} */}
            {/* {empdata.email || empdata.contact_no ? ( */}
            <p className="text-gray font-size-3 m-0 text-capitalize">
              {data.email}
            </p>
            <p className="text-gray font-size-3 m-0 text-capitalize">
              {data.contact_no}
            </p>
            {/* ) : null} */}
          </div>
        </div>
      </div>
      
      {/* <!--Assigned Job Table --> */}
      <AssignedJobTable
        heading={"Assigned Job's"}
        data={allData}
        isLoading={isLoading}
        handleSort={handleSort}
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalData={totalData}
      />
    </div>
    </div>
  );
}
