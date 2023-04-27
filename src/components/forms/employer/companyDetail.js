import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import { CKEditor } from "ckeditor4-react";
import { AddCompany, EmployerDetails } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterJson from "../../json/filterjson";

function CompanyDetails(props) {
  const [loading, setLoading] = useState(false);
  let encoded;
  /* Functionality to close the modal */

  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    props.close();
  };
  // COMPANY DETAIL VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    company_name: "",
    industry: "",
    corporation: "",
    alias: "",
    website_url: "",
    company_start_date: "",
    company_size: "",
    about: "",
    vacancy_for_post: "",
    franchise: "",
    logo: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    company_name: [
      (value) =>
        value === "" ||
        value === null ||
        value === undefined ||
        value.trim() === ""
          ? "Company name is required"
          : value.length < 2
          ? "Company Name should have 2 or more letters"
          : "",
    ],
    industry: [
      (value) =>
        value === "" || value === null || value === undefined
          ? "Industry is required"
          : "",
    ],
    corporation: [
      (value) =>
        value === "" ||
        value === null ||
        value === undefined ||
        value.trim() === ""
          ? "Corporation type is required"
          : null,
    ],
    company_start_date: [
      (value) =>
        value === "" ||
        value === null ||
        value === undefined ||
        value.trim() === ""
          ? "Start Date is required"
          : null,
    ],
    company_size: [
      (value) =>
        value === "" ||
        value === null ||
        value === undefined ||
        value.trim() === ""
          ? "Company Size is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : value === "0" || value === 0
          ? "Company Size can not be zero"
          : "",
    ],
    vacancy_for_post: [
      (value) =>
        value === "" ||
        value === null ||
        value === undefined ||
        value.trim() === ""
          ? "Vacancy is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Vacancy can not have a number."
          : value.length < 2
          ? "Vacancy should have 2 or more letters."
          : "",
    ],
    about: [
      (value) =>
        value === ""
          ? "Company Description is required"
          : value.length < 2
          ? "Company Description should have 2 or more letters."
          : "",
    ],

    website_url: [
      (value) =>
        value === "" || value === null
          ? ""
          : !/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi.test(
              value
            )
          ? "Write the correct URL"
          : "",
    ],
    franchise: [
      (value) =>
        value === ""
          ? ""
          : value.length < 2
          ? "Franchise have 2 or more letters"
          : "",
    ],
    // companylogo: [
    //   (value) =>
    //     value === "" || value === null||value===undefined|| value.trim() === "" ? "Company logo is required" : null,
    // ],
  };
  // API CALL
  const EmployerData = async () => {
    let userData = await EmployerDetails(props.employerId);
    if (
      userData === undefined ||
      props.employerId === "0" ||
      props.employerId === undefined ||
      props.employerId.length === 0 ||
      userData.data.company_detail.length === 0
    ) {
      setState(initialFormState);
    } else {
      setState(userData.data.company_detail[0]);
    }
  };
  useEffect(() => {
    EmployerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  // CUSTOM VALIDATIONS IMPORT
  const { state, setErrors, setState, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  /*Function to convert file to base64 */
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        resolve({ base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  /*Onchange function of profile */
  const handleFileChange = async (e) => {
    encoded = await convertToBase64(e.target.files[0]);
    let base64Name = encoded.base64;
    setState({ ...state, logo: base64Name });
  };
  // console.log(state.logo);
  // COMPANY DETAIL SUBMIT BUTTON
  const onCompanyDetailClick = async (event) => {
    // console.log(state);
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      let responseData = await AddCompany(state);
      if (responseData.message === "Employer data inserted successfully") {
        toast.success("Company Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }

      if (responseData.message === "Employer data updated successfully") {
        toast.success("Company Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
    } else {
      setLoading(false);
    }
  };
  // END COMPANY DETAIL VALIDATION
  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form onSubmit={onCompanyDetailClick}>
            <h5 className="text-center pt-2 mb-7"> Company Details</h5>
            <input type="hidden" value={state.company_id} />
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="company_name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Name (as per Kyc){" "}
                  <span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  maxLength={30}
                  name="company_name"
                  value={state.company_name}
                  onChange={onInputChange}
                  className={
                    errors.company_name
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Company Name"
                  id="company_name"
                />
                {/*----ERROR MESSAGE FOR company_name----*/}
                {errors.company_name && (
                  <span
                    key={errors.company_name}
                    className="text-danger font-size-3"
                  >
                    {errors.company_name}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="industry"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Industry<span className="text-danger"> *</span> :
                </label>
                <select
                  name="industry"
                  value={state.industry}
                  onChange={onInputChange}
                  className={
                    errors.industry
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="industry"
                >
                  <option value={""}>select industry</option>
                  {(FilterJson.industry || []).map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                {/*----ERROR MESSAGE FOR industry----*/}
                {errors.industry && (
                  <span
                    key={errors.industry}
                    className="text-danger font-size-3"
                  >
                    {errors.industry}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="contactperson"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Corporation<span className="text-danger"> *</span> :
                </label>
                <select
                  type="text"
                  placeholder="Contact Person "
                  maxLength={20}
                  name="corporation"
                  value={state.corporation}
                  onChange={onInputChange}
                  className={
                    errors.corporation
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="corporation"
                >
                  <option value={""}>Select corporation</option>
                  {(FilterJson.corporation || []).map((job_type) => (
                    <option key={job_type} value={job_type}>
                      {job_type}
                    </option>
                  ))}
                </select>
                {/*----ERROR MESSAGE FOR corporation----*/}
                {errors.corporation && (
                  <span
                    key={errors.corporation}
                    className="text-danger font-size-3"
                  >
                    {errors.corporation}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="alias"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Alias :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Alias"
                    maxLength={20}
                    name="alias"
                    value={state.alias}
                    onChange={onInputChange}
                    className={
                      errors.alias
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="alias"
                  />
                  {/*----ERROR MESSAGE FOR company_start_date----*/}
                  {errors.alias && (
                    <span
                      key={errors.alias}
                      className="text-danger font-size-3"
                    >
                      {errors.alias}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="company_start_date"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Start Date <span className="text-danger"> *</span> :
                </label>

                <input
                  max={moment().format("YYYY-MM-DD")}
                  type="date"
                  name="company_start_date"
                  value={moment(state.company_start_date).format("YYYY-MM-DD")}
                  onChange={onInputChange}
                  className={
                    errors.company_start_date
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="company_start_date"
                  id="company_start_date"
                />
                {/*----ERROR MESSAGE FOR company_start_date----*/}
                {errors.company_start_date && (
                  <span
                    key={errors.company_start_date}
                    className="text-danger font-size-3"
                  >
                    {errors.company_start_date}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="company_size"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Size <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    maxLength={30}
                    name="company_size"
                    value={state.company_size}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.company_size
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Company size"
                    id="company_size"
                  />
                  {/*----ERROR MESSAGE FOR company_size----*/}
                  {errors.company_size && (
                    <span
                      key={errors.company_size}
                      className="text-danger font-size-3"
                    >
                      {errors.company_size}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="website_url"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Website URL :
                </label>
                <input
                  type="text"
                  placeholder="Website Url"
                  maxLength={40}
                  name="website_url"
                  value={state.website_url}
                  onChange={onInputChange}
                  className={
                    errors.website_url
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="website_url"
                />
                {/*----ERROR MESSAGE FOR website_url----*/}
                {errors.website_url && (
                  <span
                    key={errors.website_url}
                    className="text-danger font-size-3"
                  >
                    {errors.website_url}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="vacancy_for_post"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Vacancy For Post <span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    maxLength={30}
                    name="vacancy_for_post"
                    value={state.vacancy_for_post}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.vacancy_for_post
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Vacancy For Post"
                    id="vacancy_for_post"
                  />
                  {/*----ERROR MESSAGE FOR vacancy_for_post----*/}
                  {errors.vacancy_for_post && (
                    <span
                      key={errors.vacancy_for_post}
                      className="text-danger font-size-3"
                    >
                      {errors.vacancy_for_post}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="franchise"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Franchise :
                </label>
                <div className="position-relative">
                  <input
                    maxLength={30}
                    name="franchise"
                    value={state.franchise}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.franchise
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="Franchise"
                    id="franchise"
                  />
                  {/*----ERROR MESSAGE FOR franchise----*/}
                  {errors.franchise && (
                    <span
                      key={errors.franchise}
                      className="text-danger font-size-3"
                    >
                      {errors.franchise}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-12">
                <label
                  htmlFor="about"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  About: <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    sm="12"
                    className={
                      errors.about
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    {/* <CKEditor
                      type={"classic"}
                      name={"about"}
                      id={"about"}
                      data={state.about}
                      value={state.about}
                      onChange={onInputChange}
                      initData="About Company"
                    /> */}
                    <textarea
                      name="about"
                      value={state.about}
                      onChange={onInputChange}
                      className={
                        errors.about
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="about"
                      placeholder="Company Description"
                    ></textarea>
                  </div>
                  {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                  {errors.about && (
                    <span
                      key={errors.about}
                      className="text-danger font-size-3"
                    >
                      {errors.about}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-12">
                <label
                  htmlFor="about"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Profile:
                </label>
                <div className="position-relative">
                  <input
                    type="file"
                    className="form-control"
                    accept=" image/png,image/jpeg,image/jpg,image/gif"
                    onChange={handleFileChange}
                  />
                </div>
                {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                {/* {errors.about && (
                  <span key={errors.about} className="text-danger font-size-3">
                    {errors.about}
                  </span>
                )} */}
              </div>
            </div>
            <div className="form-group mb-8 text-center">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Loading...</span>
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-medium w-25 rounded-5 text-uppercase"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}

export default CompanyDetails;
