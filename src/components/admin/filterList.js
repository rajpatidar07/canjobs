import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CustomButton from "../common/button";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
// import AddCategory from "../forms/admin/category";
import { DeleteFilter, GetFilter } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
// import FilterJson from "../json/filterjson";
import AddFilter from "../forms/admin/FilterForm";
function FilterList() {
  let [apiCall, setApiCall] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [id, setId] = useState();
  /*delete states */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteChildId, setDeleteChildID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Filter and search state */
  // const [categoryTypeFilterValue, setCategoryTypeFilterValue] = useState("");
  // const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData /*setTotalData*/] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  /*Shorting states */
  // const [columnName, setcolumnName] = useState("job_category_id");
  // const [sortOrder, setSortOrder] = useState("DESC");
  // const [clicksort, setClicksort] = useState(0);

  /* Function to get the filter data*/
  const FilterData = async () => {
    let Data = await GetFilter();
    setFilterData(Data.data);
    setApiCall(false);
    // console.log(Data.data);
  };
  console.log(filterData);

  /*Render function to get the filter data*/
  useEffect(() => {
    FilterData();
  }, [deleteAlert, apiCall]);

  /*To Show the delete alert box */
  const ShowDeleteAlert = (e, f) => {
    setDeleteID(f.id);
    setDeleteChildID(e[0]);
    setDeleteName(e[1]);
    setDeleteAlert(true);
  };

  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteFilter(e, f) {
    console.log(e, f);

    const responseData = await DeleteFilter(e, f);
    if (responseData.message === "List item has been deleted") {
      toast.error("Filter deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setDeleteAlert(false);
    }
  }
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Category type array to filter*/
  // const CategoryType = categoryData.filter(
  //   (thing, index, self) =>
  //     index === self.findIndex((t) => t.category_type === thing.category_type)
  // );

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
        <div className="dashboard-main-container mt-20" id="dashboard-body">
          <div className="container">
            <div className="mb-18">
              <div className="mb-8 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Filter</h3>
                </div>
              </div>
              <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5 ">
                <div className="row">
                  <div className="col-6">
                    <div className="card job_filter_card">
                      <div className="card-body  m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Skill
                        </h4>
                        <AddFilter setApiCall={() => setApiCall(true)} id={1} />
                        <ul className="row m-0 p-0">
                          {totalData === 0 ? (
                            <p> No Data Found</p>
                          ) : (
                            (filterData || []).map((data) =>
                              data.item_name === "Skill"
                                ? Object.entries(JSON.parse(data.json)).map(
                                    (value) => (
                                      <>
                                        <li
                                          className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                          key={value[0]}
                                        >
                                          {value[1]}
                                          <Link
                                            onClick={() =>
                                              ShowDeleteAlert(value, data)
                                            }
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
                        {/* <div className="float-md-right">
                          <i
                            className="font-size-3  fa fa-plus"
                            onClick={() => {
                              const hasSkillFilter = filterData
                                .map((data) => data.item_name === "Skill")
                                .includes(true);
                              if (hasSkillFilter) {
                                setId("1");
                                setShowAddFilterModal(true);
                              }
                            }}
                          ></i>
                        </div> */}
                      </div>
                    </div>{" "}
                  </div>
                  <div className="col-6">
                    <div className="card job_filter_card">
                      <div className="card-body row m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Industry{" "}
                        </h4>
                        {totalData === 0 ? (
                          <tr>
                            <th className="bg-white"></th>
                            <th className="bg-white">No Data Found</th>
                            <th className="bg-white"></th>
                          </tr>
                        ) : (
                          (filterData || []).map((data) =>
                            data.item_name === "Industry"
                              ? Object.entries(JSON.parse(data.json)).map(
                                  (value) => (
                                    <>
                                      <li
                                        className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                        key={value[0]}
                                      >
                                        {value[1]}
                                        <Link
                                          onClick={() =>
                                            ShowDeleteAlert(value, data)
                                          }
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
                        {/* <div className="float-md-right">
                          <i
                            className="font-size-3  fa fa-plus"
                            onClick={() => {
                              const hasSkillFilter = filterData
                                .map((data) => data.item_name === "Location")
                                .includes(true);
                              if (hasSkillFilter) {
                                setId("4");
                                setShowAddFilterModal(true);
                              }
                            }}
                          ></i>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
          <SAlert
            show={deleteAlert}
            title={deleteName}
            text="Are you Sure you want to delete !"
            onConfirm={() => deleteFilter(deleteId, deleteChildId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          />
        </div>
      </div>
      ;
    </>
  );
}

export default FilterList;
