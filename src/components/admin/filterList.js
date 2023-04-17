import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
// import AddCategory from "../forms/admin/category";
import { GetFilter } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
// import FilterJson from "../json/filterjson";
import AddFilter from "../forms/admin/FilterForm";
import { getByDisplayValue } from "@testing-library/react";
function FilterList() {
  let [showAddFilterModal, setShowAddFilterModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  // const [CategoryId, setCategoryId] = useState([]);
  /*delete states */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Filter and search state */
  // const [categoryTypeFilterValue, setCategoryTypeFilterValue] = useState("");
  // const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  /*Shorting states */
  // const [columnName, setcolumnName] = useState("job_category_id");
  // const [sortOrder, setSortOrder] = useState("DESC");
  // const [clicksort, setClicksort] = useState(0);

  /* Function to get the filter data*/
  const FilterData = async () => {
    let Data = await GetFilter();
    setFilterData(Data.data);

    console.log(Data.data);
  };
  console.log(filterData);

  /*Render function to get the filter data*/
  useEffect(() => {
    FilterData();
  }, []);

  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    console.log(e);
    // setDeleteID(e.job_category_id);
    // setDeleteName(e.category_name);
    // setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteFilter(e) {
    // const responseData = await DeleteJobCategory(e);
    // if (responseData.message === "job category has been deleted") {
    //   toast.error("Category deleted Successfully", {
    //     position: toast.POSITION.TOP_RIGHT,
    //     autoClose: 1000,
    //   });
    //   setDeleteAlert(false);
    // }
  }
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function by name */
  // let sortByNameClick = () => {
  //   if (
  //     clicksort === 0 ||
  //     sortOrder === "DESC" ||
  //     columnName === "job_category_id"
  //   ) {
  //     setcolumnName("category_name");
  //     setSortOrder("ASC");
  //     setClicksort(1);
  //   } else {
  //     setcolumnName("category_name");
  //     setSortOrder("DESC");
  //     setClicksort(0);
  //   }
  // };
  /*Sorting Function by type */
  // let sortBytypeClick = () => {
  //   if (
  //     clicksort === 0 ||
  //     sortOrder === "DESC" ||
  //     columnName === "job_category_id"
  //   ) {
  //     setcolumnName("category_type");
  //     setSortOrder("ASC");
  //     setClicksort(1);
  //   } else {
  //     setcolumnName("category_type");
  //     setSortOrder("DESC");
  //     setClicksort(0);
  //   }
  // };
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
        <AddFilter
          close={() => setShowAddFilterModal(false)}
          show={showAddFilterModal}
        />
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
                <div className="row align-items-center">
                  {/* <div className="col-xl-3 col-md-6 form_control mb-5 mt-4">
                    <p className="input_label">Search by name:</p>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder={"Search Category"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  <div className="col-xl-3 col-md-6 form_control mb-5 mt-4">
                    <p className="input_label">Filter by Type:</p>
                    <div className="select_div">
                      <select
                        name="category"
                        value={categoryTypeFilterValue}
                        id="category"
                        onChange={onCategoryTypeFilterChange}
                        className="form-control nice-select pl-7 h-100 arrow-3 arrow-3-black w-100 text-black-2"
                      >
                        <option value={""}>Select category type</option>
                        {(FilterJson.category || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div> */}
                  <div className="text-end px-6 col-xl-12">
                    <div className="float-md-right">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => setShowAddFilterModal(true)}
                      >
                        Add Filter
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5 ">
                <div className="row">
                  <div className="col-6">
                    <div className="card job_filter_card">
                      <div className="card-body row m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Industry
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
                                      {console.log(
                                        Object.entries(JSON.parse(data.json))
                                      )}
                                      <li
                                        className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                        key={value[0]}
                                      >
                                        {value[1]}
                                        <Link
                                          onClick={() => ShowDeleteAlert(value)}
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
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card job_filter_card">
                      <div className="card-body row m-0">
                        <h4 className="card-title text-dark text-left mb-7 w-100">
                          Location
                        </h4>
                        {totalData === 0 ? (
                          <tr>
                            <th className="bg-white"></th>
                            <th className="bg-white">No Data Found</th>
                            <th className="bg-white"></th>
                          </tr>
                        ) : (
                          (filterData || []).map((data) =>
                            data.item_name === "Location"
                              ? Object.entries(JSON.parse(data.json)).map(
                                  (value) => (
                                    <>
                                      <li
                                        className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                        key={value[0]}
                                      >
                                        {value[1]}
                                        <Link
                                          onClick={() => ShowDeleteAlert(value)}
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
            onConfirm={() => deleteFilter(deleteId)}
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
