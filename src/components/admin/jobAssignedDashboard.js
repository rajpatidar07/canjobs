import React, { useState, useEffect } from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { ToastContainer } from "react-toastify";
import { getallAdminData } from "../../api/api";
import Loader from "../common/loader";
import ManegerBox from "../common/managerBox";
export default function JobAssignedDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  let [adminData, setAdminData] = useState([]);
  const [search, setSearch] = useState("");
  const [searcherror, setSearchError] = useState("");
  /* Function to get the Amin data*/
  const AdminData = async () => {
    setIsLoading(true);
    try {
      const userData = await getallAdminData(
        "",
        search
        // currentPage,
        // recordsPerPage,
        // columnName,
        // sortOrder
      );
      if (userData.data.length === 0) {
        setAdminData([]);
        setIsLoading(false);
      } else {
        setAdminData(
          userData.data.filter((item) => item.admin_type === "manager")
        );
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  /*Render function to get the Admin*/
  useEffect(() => {
    AdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /*Function to Search employer */
  const onSearch = (e) => {
    setSearch(e.target.value);
    if (/[^a-zA-Z0-9]/g.test(search)) {
      setSearchError("Cannot use special character");
    } else if (search === "") {
      setSearchError("");
    }
  };
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Assigned Job's"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Assigned Job's"} />
        <ToastContainer />
        <div className={"dashboard-main-container mt-16"} id="dashboard-body">
          <div className="container-fluid">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Job Assigned Dashboard</h3>
                </div>
                {/* <!-- Manager Search and Filter --> */}
                <div className="row m-0 align-items-center">
                  <div className="col p-1 form_group mb-3">
                    <p className="input_label">Search:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Manger name"}
                      value={search}
                      name={"admin_type"}
                      onChange={(e) => onSearch(e)}
                      maxLength={30}
                    />
                  </div>
                </div>
                <small className="text-danger">{searcherror}</small>
              </div>
              <div className="row p-3">
                {isLoading ? (
                  <Loader />
                ) : (
                  (adminData || []).map((item, index) => {
                    return <ManegerBox data={item} key={index} />;
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
