import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddCategory from "../forms/admin/category";
import { DeleteJobCategory, getAllJobsCategory } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";
import FilterJson from "../json/filterjson";
function Category() {
  let [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [CategoryId, setCategoryId] = useState([]);
  /*delete states */
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  /*Filter and search state */
  const [categoryTypeFilterValue, setCategoryTypeFilterValue] = useState("");
  const [search, setSearch] = useState("");
  /*Pagination states */
  const [totalData, setTotalData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  /*Shorting states */
  const [columnName, setcolumnName] = useState("job_category_id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [clicksort, setClicksort] = useState(0);

  /* Function to get the job category data*/
  const CategoryData = async () => {
    const userData = await getAllJobsCategory(
      categoryTypeFilterValue,
      search,
      currentPage,
      recordsPerPage,
      columnName,
      sortOrder
    );
    setCategoryData(userData.data);
    setTotalData(userData.total_rows);
  };

  /*Render function to get the job category*/
  useEffect(() => {
    CategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryTypeFilterValue,
    search,
    currentPage,
    showAddCategoryModal,
    deleteAlert,
    columnName,
    sortOrder,
  ]);

  /* Function to show the single data to update job category*/
  const editJobCategory = (e) => {
    // e.preventDefault();
    setShowAddCategoryModal(true);
    setCategoryId(e);
  };
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.job_category_id);
    setDeleteName(e.category_name);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteCategory(e) {
    const responseData = await DeleteJobCategory(e);
    if (responseData.message === "job category has been deleted") {
      toast.error("Category deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setDeleteAlert(false);
    }
  }
  /*Category Type Onchange function to filter the data */
  let onCategoryTypeFilterChange = (e) => {
    setCategoryTypeFilterValue(e.target.value);
  };
  /*Search Onchange function to filter the data */
  let onSearch = (e) => {
    setSearch(e.target.value);
  };
  /*Pagination Calculation */
  const nPages = Math.ceil(totalData / recordsPerPage);

  /*Sorting Function by name */
  let sortByNameClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "job_category_id"
    ) {
      setcolumnName("category_name");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("category_name");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Sorting Function by type */
  let sortBytypeClick = () => {
    if (
      clicksort === 0 ||
      sortOrder === "DESC" ||
      columnName === "job_category_id"
    ) {
      setcolumnName("category_type");
      setSortOrder("ASC");
      setClicksort(1);
    } else {
      setcolumnName("category_type");
      setSortOrder("DESC");
      setClicksort(0);
    }
  };
  /*Category type array to filter*/
  // const CategoryType = categoryData.filter(
  //   (thing, index, self) =>
  //     index === self.findIndex((t) => t.category_type === thing.category_type)
  // );

  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader heading={"Manage Category"} />
        {/* <!-- navbar- --> */}
        <AdminSidebar heading={"Manage Category"} />
        <div>
          <ToastContainer />
          <AddCategory
            show={showAddCategoryModal}
            jobCategoryData={CategoryId}
            close={() => setShowAddCategoryModal(false)}
          />
        </div>
        <div className="dashboard-main-container mt-20" id="dashboard-body">
          <div className="container">
            <div className="mb-18">
              <div className="mb-8 align-items-center">
                <div className="page___heading">
                  <h3 className="font-size-6 mb-0">Category</h3>
                </div>
                <div className="row align-items-center">
                  <div className="col-xl-3 col-md-6 form_control mb-5 mt-4">
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
                  </div>
                  <div className="text-end px-6 col-xl-6">
                    <div className="float-md-right">
                      <CustomButton
                        className="font-size-3 rounded-3 btn btn-primary border-0"
                        onClick={() => editJobCategory("0")}
                      >
                        Add category
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 datatable_div  pt-7 rounded pb-9 px-5">
                <div className="table-responsive ">
                  <table className="table table-striped main_data_table">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortByNameClick}
                            className="text-gray"
                          >
                            Name
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <Link
                            to={""}
                            onClick={sortBytypeClick}
                            className="text-gray"
                          >
                            Category Type
                          </Link>
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map function to show the data in the list*/}
                      {totalData === 0 ? (
                        <tr>
                          <th className="bg-white"></th>
                          <th className="bg-white">No Data Found</th>
                          <th className="bg-white"></th>
                        </tr>
                      ) : (
                        (categoryData || []).map((catdata) =>
                          catdata.is_deleted === "1" ||
                          catdata.category_name === null ? null : (
                            <tr className="" key={catdata.job_category_id}>
                              <th scope="row" className="py-5 ">
                                <div className="font-size-3 mb-0 font-weight-semibold text-black-2">
                                  {catdata.category_name}
                                </div>
                              </th>
                              <th className=" py-5">
                                <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                  {catdata.category_type}
                                </h3>
                              </th>
                              <th className="py-5 min-width-px-100">
                                <div
                                  className="btn-group button_group"
                                  role="group"
                                >
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() => editJobCategory(catdata)}
                                  >
                                    <span className=" fas fa-edit text-gray">
                                      {" "}
                                    </span>
                                  </button>
                                  <button
                                    className="btn btn-outline-info action_btn"
                                    onClick={() => ShowDeleteAlert(catdata)}
                                  >
                                    <span className=" text-danger">
                                      {" "}
                                      <i className="fa fa-trash"></i>
                                    </span>
                                  </button>
                                </div>
                              </th>
                            </tr>
                          )
                        )
                      )}
                    </tbody>
                  </table>
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
            onConfirm={() => deleteCategory(deleteId)}
            showCancelButton={true}
            onCancel={CancelDelete}
          />
        </div>
      </div>
      ;
    </>
  );
}

export default Category;
