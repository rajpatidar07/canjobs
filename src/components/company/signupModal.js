import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValidation from "../common/useValidation";

export default function CompanySignUp(props) {
  // USER SIGNUP VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    companyemail: "",
    companypassword: "",
    contactno: "",
    tandr: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    companyemail: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    companypassword: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    contactno: [
      (value) => (value ? null : "Contact no is required"),
      (value) => (value === 10 ? null : "Contact no should be of 10 digits"),
    ],
    tandr: [
      (value) =>
        value ? null : "Please accept terms and conditions o continue",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  // USER SIGNUP SUBMIT BUTTON
  const onCompanySignUpClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END USER SIGNUP VALIDATION
  return (
    <>
      {/* <!-- Sign Up Modal --> */}
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="modal-dialog max-width-px-840 position-relative">
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10  z-index-supper"
            data-dismiss="modal"
            onClick={props.close}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="login-modal-main bg-white rounded-8 overflow-hidden">
            <div className="row no-gutters">
              <div className="col-lg-5 col-md-6">
                <div className="pt-10 pb-6 pl-11 pr-12 bg-black-2 h-100 d-flex flex-column dark-mode-texts">
                  <div className="pb-9">
                    <h3 className="font-size-8 text-white line-height-reset pb-4 line-height-1p4">
                      Create a free account today
                    </h3>
                    <p className="mb-0 font-size-4 text-white">
                      Create your account to continue and explore new jobs.
                    </p>
                  </div>
                  <div className="border-top border-default-color-2 mt-auto">
                    <div className="d-flex mx-n9 pt-6 flex-xs-row flex-column">
                      <div className="pt-5 px-9">
                        <h3 className="font-size-7 text-white">295</h3>
                        <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                          New jobs posted today
                        </p>
                      </div>
                      <div className="pt-5 px-9">
                        <h3 className="font-size-7 text-white">14</h3>
                        <p className="font-size-3 text-white gr-opacity-5 line-height-1p4">
                          New companies registered
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-6">
                <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                  {/* SOCIAL MEDIA LINK BUTTONS */}
                  <div className="row">
                    <div className="col-4 col-xs-12">
                      <Link
                        to="/"
                        className="font-size-4 font-weight-semibold position-relative text-white bg-allports h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-linkedin pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                        <span className="d-none d-xs-block mx-5 px-3">
                          Import from LinkedIn
                        </span>
                      </Link>
                    </div>
                    <div className="col-4 col-xs-12">
                      <Link
                        to="/"
                        className="font-size-4 font-weight-semibold position-relative text-white bg-poppy h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-google pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                        <span className="d-none d-xs-block mx-5 px-3">
                          Import from Google
                        </span>
                      </Link>
                    </div>
                    <div className="col-4 col-xs-12">
                      <Link
                        to="/"
                        className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-facebook-square pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                        <span className="d-none d-xs-block mx-5 px-3">
                          Import from Facebook
                        </span>
                      </Link>
                    </div>
                  </div>
                  {/* END SOCIAL MEDIA LINK BUTTONS */}
                  <div className="or-devider">
                    <span className="font-size-3 line-height-reset">Or</span>
                  </div>
                  {/* SIGNUP FORM */}
                  <form onSubmit={onCompanySignUpClick}>
                    {/* FORM FIELDS */}
                    <div className="form-group">
                      <label
                        htmlFor="email2"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="companyemail"
                        value={state.companyemail}
                        onChange={onInputChange}
                        className={
                          errors.companyemail
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        placeholder="example@gmail.com"
                        id="companyemail"
                      />
                      {/* ERROR MSG FOR Company EMAIL */}
                      {errors.companyemail && (
                        <span
                          key={errors.companyemail}
                          className="text-danger font-size-3"
                        >
                          {errors.companyemail}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="contactno"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Contact Number
                      </label>
                      <input
                        type="number"
                        name="contactno"
                        value={state.contactno}
                        onChange={onInputChange}
                        className={
                          errors.contactno
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        placeholder="Contact Person Name"
                        id="contactno"
                      />
                      {/* ERROR MSG FOR Company no */}
                      {errors.contactno && (
                        <span
                          key={errors.contactno}
                          className="text-danger font-size-3"
                        >
                          {errors.contactno}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="companypassword"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Password
                      </label>
                      <div className="position-relative">
                        <input
                          name="companypassword"
                          value={state.companypassword}
                          onChange={onInputChange}
                          type="password"
                          className={
                            errors.companypassword
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          id="companypassword"
                          placeholder="Enter password"
                        />
                        {/* ERROR MSG FOR PASSWORD */}
                        {errors.companypassword && (
                          <span
                            key={errors.companypassword}
                            className="text-danger font-size-3"
                          >
                            {errors.companypassword}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* END FORM FIELDS  */}
                    <div className=" d-flex flex-wrap justify-content-between mb-1 col-md-12 ">
                      <label
                        htmlFor="tandr"
                        className="gr-check-input d-flex  mr-3"
                      >
                        <input
                          type="checkbox"
                          id="tandr"
                          name="tandr"
                          onChange={onInputChange}
                          className="text-black-2 pt-5 mr-5"
                        />
                        <span className="font-size-3 mb-0 line-height-reset d-block">
                          Agree to the{" "}
                          <Link to="" className="text-primary">
                            Terms & Conditions
                          </Link>
                        </span>
                      </label>
                      {/*----ERROR MESSAGE FOR terms----*/}
                      {errors.tandr && (
                        <span
                          key={errors.tandr}
                          className="text-danger font-size-3"
                        >
                          {errors.tandr}
                        </span>
                      )}
                    </div>
                    <div className="form-group text-center">
                      <button
                        className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </div>
                    <p className="font-size-4 text-center heading-default-color">
                      Already have an account?{" "}
                      <Link
                        to=""
                        className="text-primary"
                        onClick={props.CompanyLoginClick}
                      >
                        Login
                      </Link>
                    </p>
                  </form>
                  {/* END SIGNUP FORM */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
