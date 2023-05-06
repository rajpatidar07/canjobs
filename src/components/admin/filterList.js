import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import CustomButton from "../common/button";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
// import AddCategory from "../forms/admin/category";
// import { DeleteFilter, GetFilter } from "../../api/api";
import { ToastContainer /*toast*/ } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SAlert from "../common/sweetAlert";
import AddFilter from "../forms/admin/FilterForm";
function FilterList() {
  /*States */
  let [apiCall,setApiCall] = useState(false);
  // const [filterData, setFilterData] = useState([]);
  /*delete states */
  // const [deleteAlert, setDeleteAlert] = useState(false);
  // const [deleteId, setDeleteID] = useState();
  // const [deleteChildId, setDeleteChildID] = useState();
  // const [deleteName, setDeleteName] = useState("");

  /* Function to get the filter data*/
  // const FilterData = async () => {
  //   let Data = await GetFilter();
  //   if (Data.data.length === 0) {
  //     setFilterData([]);
  //   } else {
  //     setTotalData(Data.data);
  //     setFilterData(Data.data);
  //     setApiCall(false);
  //   }
  //   console.log(Data);
  // };

  /*Render function to get the filter data*/
  // useEffect(() => {
  //   FilterData();
  // }, [apiCall]);

  /*To Show the delete alert box */
  // const ShowDeleteAlert = (e, f) => {
  //   setDeleteID(f.id);
  //   setDeleteChildID(e[0]);
  //   setDeleteName(e[1]);
  //   setDeleteAlert(true);
  // };

  /*To cancel the delete alert box */
  // const CancelDelete = () => {
  //   setDeleteAlert(false);
  // };
  /*To call Api to delete category */
  // async function deleteFilter(e, f) {
  //   // console.log(e, f);

  //   /*Function to delete the filter */
  //   const responseData = await DeleteFilter(e, f);
  //   if (responseData.message === "List item has been deleted") {
  //     toast.error("Filter deleted Successfully", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       autoClose: 1000,
  //     });
  //     setApiCall(true)
  //     setDeleteAlert(false);
  //   }
  // }

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Filter List"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Filter List"} />

        <div>
          <ToastContainer />
        </div>
        <div className="dashboard-main-container mt-16" id="dashboard-body">
          <div className="container">
            <div className="mb-18">
              <div className="mb-4 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Filter</h3>
                </div>
              </div>
              <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5 ">
                <div className="row">
                  {/* <!-- Skill Filter List --> */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Skill
                        </h4>
                        <AddFilter apiCall={apiCall} setApiCall={setApiCall} id={1} />
                        {/*  <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData || []).map((data) =>
                              data.item_name === "Skill"
                                ? Object.entries(JSON.parse(data.json)).map(
                                    (value, index) => (
                                      <>
                                        <li
                                          className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                          key={index}
                                        >
                                          {value[1]}
                                          <Link
                                            onClick={() =>
                                              ShowDeleteAlert(value, data)
                                            }
                                            title="Delete"
                                          >
                                            <i
                                              className="px-3 fa fa-times-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Link>
                                        </li>
                                      </>
                                    )
                                  )
                                : null
                            )
                          )}
                        </ul> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- Industry Filter List --> */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Industry
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={4} />
                        {/* <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData || []).map((data) =>
                              data.item_name === "Industry"
                                ? Object.entries(JSON.parse(data.json)).map(
                                    (value, index) => (
                                      <>
                                        <li
                                          className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                          key={index}
                                        >
                                          {value[1]}
                                          <Link
                                            onClick={() =>
                                              ShowDeleteAlert(value, data)
                                            }
                                            title="Delete"
                                          >
                                            <i
                                              className="px-3 fa fa-times-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Link>
                                        </li>
                                      </>
                                    )
                                  )
                                : null
                            )
                          )}
                        </ul> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- Education Filter List --> */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Education
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={5} />
                        {/*<ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData || []).map((data) =>
                              data.item_name === "Education"
                                ? Object.entries(JSON.parse(data.json)).map(
                                    (value, index) => (
                                      <>
                                        <li
                                          className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                          key={index}
                                        >
                                          {value[1]}
                                          <Link
                                            onClick={() =>
                                              ShowDeleteAlert(value, data)
                                            }
                                            title="Delete"
                                          >
                                            <i
                                              className="px-3 fa fa-times-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Link>
                                        </li>
                                      </>
                                    )
                                  )
                                : null
                            )
                          )}
                        </ul> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Category
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={2} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData || []).map((data) =>
                              data.item_name === "Category"
                                ? Object.entries(JSON.parse(data.json)).map(
                                    (value,index) => (
                                      <>
                                        <li
                                          className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                          key={index}
                                        >
                                          {value[1]}
                                          <Link
                                            onClick={() =>
                                              ShowDeleteAlert(value, data)
                                            }
                                            title="Delete"
                                          >
                                            <i
                                              className="px-3 fa fa-times-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Link>
                                        </li>
                                      </>
                                    )
                                  )
                                : null
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Location
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={3} />
                        <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData || []).map((data) =>
                              data.item_name === "Location"
                                ? Object.entries(JSON.parse(data.json)).map(
                                    (value,index) => (
                                      <>
                                        <li
                                          className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                          key={index}
                                        >
                                          {value[1]}
                                          <Link
                                            onClick={() =>
                                              ShowDeleteAlert(value, data)
                                            }
                                            title="Delete"
                                          >
                                            <i
                                              className="px-3 fa fa-times-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Link>
                                        </li>
                                      </>
                                    )
                                  )
                                : null
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                  {/* <!-- Corporation Filter List --> */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Corporation
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={6} />
                        {/* <ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData || []).map((data) =>
                              data.item_name === "Corporation "
                                ? Object.entries(JSON.parse(data.json)).map(
                                    (value, index) => (
                                      <>
                                        <li
                                          className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                          key={index}
                                        >
                                          {value[1]}
                                          <Link
                                            onClick={() =>
                                              ShowDeleteAlert(value, data)
                                            }
                                            title="Delete"
                                          >
                                            <i
                                              className="px-3 fa fa-times-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Link>
                                        </li>
                                      </>
                                    )
                                  )
                                : null
                            )
                          )}
                        </ul> */}
                      </div>
                    </div>
                  </div>
                  {/* <!-- Language Filter List --> */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Language
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={7} />
                        {/*<ul className="row m-0 p-0">
                          {filterData.length === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData || []).map((data) =>
                              data.item_name === "Language"
                                ? Object.entries(JSON.parse(data.json)).map(
                                    (value, index) => (
                                      <>
                                        <li
                                          className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                          key={index}
                                        >
                                          {value[1]}
                                          <Link
                                            onClick={() =>
                                              ShowDeleteAlert(value, data)
                                            }
                                            title="Delete"
                                          >
                                            <i
                                              className="px-3 fa fa-times-circle"
                                              aria-hidden="true"
                                            ></i>
                                          </Link>
                                        </li>
                                      </>
                                    )
                                  )
                                : null
                            )
                          )}
                        </ul> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Delete filter sweet alert- --> */}
          {/* <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteFilter(deleteId, deleteChildId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          /> */}
        </div>
      </div>
      ;
    </>
  );
}

export default FilterList;
