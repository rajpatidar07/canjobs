import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import AddCategory from "../forms/admin/category";

function Category() {
  let [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
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
                  <div className="d-flex flex-wrap align-items-center justify-content-lg-end">
                    <p className="font-size-4 mb-0 mr-6 py-2">Filter by Job:</p>
                    <div className="h-px-48">
                      <select
                        name="country"
                        id="country"
                        className=" nice-select pl-7 h-100 arrow-3 arrow-3-black min-width-px-273 font-weight-semibold text-black-2"
                      >
                        <option value="" data-display="Product Designer">
                          Software Engineer
                        </option>
                        <option value="">MBA</option>
                        <option value="">BE</option>
                      </select>
                    </div>
                  </div>
                  <div className="float-md-right mt-6">
                    <CustomButton
                      className="font-size-3 rounded-3 btn btn-primary border-0"
                      onClick={() => setShowAddCategoryModal(true)}
                    >
                      Add category
                    </CustomButton>
                    <AddCategory
                      show={showAddCategoryModal}
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
                          #
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className=" border-0 font-size-4 font-weight-normal"
                        >
                          Category Type
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
                      <tr className="border border-color-2">
                        <th className=" border-0 py-7">1</th>
                        <th scope="row" className=" border-0 py-7 ">
                          <div className="">
                            <Link
                              to=""
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              Senior Project Manager
                            </Link>
                          </div>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            Software Engineer
                          </h3>
                        </th>
                        <th className="min-width-px-100 py-7 ">
                          <Link
                            onClick={() => setShowAddCategoryModal(true)}
                            to=""
                          >
                            <span className=" fas fa-edit text-gray px-5"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th className=" border-0 py-7">2</th>
                        <th scope="row" className=" border-0 py-7 ">
                          <div className="">
                            <a
                              href="jobdetails.html"
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              UI Designer
                            </a>
                          </div>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            Software Engineer
                          </h3>
                        </th>
                        <th className="min-width-px-100 py-7 ">
                          <Link
                            onClick={() => setShowAddCategoryModal(true)}
                            to=""
                          >
                            <span className=" fas fa-edit text-gray px-5"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th className=" border-0 py-7">3</th>
                        <th scope="row" className=" border-0 py-7 ">
                          <div className="">
                            <a
                              href="jobdetails.html"
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              Head of Marketing
                            </a>
                          </div>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            BE
                          </h3>
                        </th>
                        <th className="min-width-px-100 py-7 ">
                          <Link
                            onClick={() => setShowAddCategoryModal(true)}
                            to=""
                          >
                            <span className=" fas fa-edit text-gray px-5"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                      <tr className="border border-color-2">
                        <th className=" border-0 py-7">4</th>
                        <th scope="row" className=" border-0 py-7 ">
                          <div className="">
                            <a
                              href="jobdetails.html"
                              className="font-size-4 mb-0 font-weight-semibold text-black-2"
                            >
                              Full-Stack Developer
                            </a>
                          </div>
                        </th>
                        <th className=" py-7">
                          <h3 className="font-size-3 font-weight-normal text-black-2 mb-0">
                            BE
                          </h3>
                        </th>
                        <th className="min-width-px-100 py-7 ">
                          <Link
                            onClick={() => setShowAddCategoryModal(true)}
                            to=""
                          >
                            <span className=" fas fa-edit text-gray px-5"></span>
                          </Link>
                          <Link to="">
                            <span className=" text-danger">
                              <i className="fa fa-trash"></i>
                            </span>
                          </Link>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="pt-2">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-hover-primary rounded-0 ml-n2">
                      <li className="page-item rounded-0 flex-all-center">
                        <Link
                          to={""}
                          className="page-link rounded-0 border-0 px-3active"
                          aria-label="Previous"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item disabled">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          ...
                        </Link>
                      </li>
                      <li className="page-item ">
                        <Link
                          to={""}
                          className="page-link border-0 font-size-3 font-weight-semibold px-3"
                        >
                          7
                        </Link>
                      </li>
                      <li className="page-item rounded-0 flex-all-center">
                        <Link
                          to={""}
                          className="page-link rounded-0 border-0 px-3"
                          aria-label="Next"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Category;
