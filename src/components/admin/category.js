import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddCategory from "../forms/admin/category";
import { DeleteJobCategory, getAllJobsCategory } from "../../api/api";
import filterjson from "../json/filterjson";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SAlert from "../common/sweetAlert";
import Pagination from "../common/pagination";

function Category() {
  let [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [CategoryId, setCategoryId] = useState([]);
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
  const [columnName, setcolumnName] = useState("");
  const [sortOrder, setSortOrder] = useState("");

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
  /*Searcg Onchange function to filter the data */
  let onSearch = (e) => {
    setSearch(e.target.value);
  };
  /*<-----Pagination Calculator----> */
  const nPages = Math.ceil(totalData / recordsPerPage);
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <div className="dashboard-main-container mt-24" id="dashboard-body">
          <div className="container">
            <div className="mb-18">
              <div className="row mb-8 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">Category</h3>
                </div>
                <div className="col-lg-6">
                  <div>
                    <ToastContainer />
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end pb-2">
                    <input
                      required
                      type="text"
                      className="form-control col-6"
                      placeholder={"Search Category"}
                      value={search}
                      name={"category_name"}
                      onChange={(e) => onSearch(e)}
                    />
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">
                      Filter by Type:
                    </p>
                    <div className="h-px-48">
                      <select
                        name="category"
                        value={categoryTypeFilterValue}
                        id="category"
                        onChange={onCategoryTypeFilterChange}
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value={""}>Select category type</option>
                        {(filterjson.category || []).map((data, i) => {
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="float-md-right mt-6">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => editJobCategory("0")}
                    >
                      Add category
                    </CustomButton>
                    <AddCategory
                      show={showAddCategoryModal}
                      jobCategoryData={CategoryId}
                      close={() => setShowAddCategoryModal(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
                <div className="table-responsive ">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Name</span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("category_name");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("category_name");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          <span className="col-8">Category Type</span>
                          <span className="col-1">
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("category_type");
                                setSortOrder("ASC");
                              }}
                            >
                              <i className="fas fa-chevron-up"></i>
                            </Link>
                            <Link
                              to={""}
                              className="row"
                              onClick={() => {
                                setcolumnName("category_type");
                                setSortOrder("DESC");
                              }}
                            >
                              <i className="fas fa-chevron-down"></i>
                            </Link>
                          </span>{" "}
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
                      {(categoryData || []).map((catdata) =>
                        catdata.is_deleted === "1" ? null : (
                          <tr
                            className="border border-color-2"
                            key={catdata.job_category_id}
                          >
                            <th scope="row" className=" border-0 py-7 ">
                              <div className="">
                                <Link
                                  to={""}
                                  className="font-size-3 mb-0 font-weight-semibold text-black-2"
                                >
                                  {catdata.category_name}
                                </Link>
                              </div>
                            </th>
                            <th className=" py-7">
                              <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                                {catdata.category_type}
                              </h3>
                            </th>
                            <th className=" py-7 min-width-px-100">
                              <Link
                                to=""
                                onClick={() => editJobCategory(catdata)}
                              >
                                <span className=" fas fa-edit text-gray px-5">
                                  {" "}
                                </span>
                              </Link>
                              <Link
                                to=""
                                onClick={() => ShowDeleteAlert(catdata)}
                              >
                                <span className=" text-danger">
                                  {" "}
                                  <i className="fa fa-trash"></i>
                                </span>
                              </Link>
                            </th>
                          </tr>
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
