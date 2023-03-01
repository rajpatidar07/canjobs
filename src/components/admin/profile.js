import React from "react";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { CKEditor } from "ckeditor4-react";

function Profile() {
  return (
    <>
      <div className="site-wrapper overflow-hidden bg-default-2">
        {/* <!-- Header Area --> */}
        <AdminHeader />
        {/* <!-- navbar- --> */}
        <AdminSidebar />
        <a
          className="sidebar-mobile-button"
          data-toggle="collapse"
          href="#sidebar"
          role="button"
          aria-expanded="false"
          aria-controls="sidebar"
        >
          <i className="icon icon-sidebar-2"></i>
        </a>
        <div className="dashboard-main-container mt-24" id="dashboard-body">
          <div className="container">
            <div className="mb-15 mb-lg-23">
              <div className="row">
                <div className="col-xxxl-9 px-lg-13 px-6">
                  <h5 className="font-size-6 font-weight-semibold mb-8">
                    Update Profile
                  </h5>
                  <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-1 pb-13">
                    <div className="upload-file mb-16 text-center">
                      {/* <!-- <img id="imgPrime" src="" alt="uploaded image placeholder" /> --> */}
                      {/* <!-- <input type="file" id="upfile"> --> */}
                    </div>
                    <form action="/">
                      <fieldset>
                        <div className="row mb-xl-1 mb-9">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                htmlFor="namedash"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="form-control h-px-48"
                                id="namedash"
                                placeholder="eg. Apple"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label
                                htmlFor="select2"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                E-mail
                              </label>
                              <input
                                type="email"
                                placeholder="Email12@gmail.com"
                                className="form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-8">
                          <div className="col-lg-6 mb-xl-0 mb-7">
                            <div className="form-group position-relative">
                              <label className="d-block text-black-2 font-size-4 font-weight-semibold mb-4">
                                Password
                              </label>
                              <input
                                type="password"
                                className="form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group position-relative">
                              <label
                                htmlFor="address"
                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                              >
                                Location
                              </label>
                              <input
                                type="text"
                                placeholder="Premises"
                                className="form-control nice-select pl-6 arrow-3 h-px-48 w-100 font-size-4"
                              />
                              <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6"></span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label className="d-block text-black-2 font-size-4 font-weight-semibold mb-4">
                                Admin Type
                              </label>
                              <div className="position-relative">
                                <select className="form-control col-6">
                                  <option value={""}>select type</option>
                                  <option value={""}>Manager</option>
                                  <option value={""}>Sub admin</option>
                                  <option value={""}>Admin</option>
                                  <option value={""}>Super admin</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
