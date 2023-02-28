import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValidation from "../common/useValidation";

export default function EmployeeSignupModal(props) {
  // USER SIGNUP VALIDATION
  const initialFormState = {
    useremail: "",
    userpassword: "",
    confirmpassword: "",
  };

  const validators = {
    useremail: [
      (value) => (value ? null : "Email is required"),
      (value) => (/\S+@\S+\.\S+/.test(value) ? null : "Email is invalid"),
    ],
    userpassword: [
      (value) => (value ? null : "Password is required"),
      (value) =>
        value && value.length >= 8
          ? null
          : "Password must be at least 8 characters",
    ],
    confirmpassword: [
      (value) => (value ? null : "Confirm Password is required"),
      (value) =>
        value === state.userpassword
          ? null
          : "Confirm Password must be Same as Password",
    ],
  };

  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  const onUserSignUpClick = (event) => {
    event.preventDefault();

    if (validate()) {
      // handle form submission
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
            className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10"
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
                      <a
                        href="http://localhost:3000/"
                        className="font-size-4 font-weight-semibold position-relative text-white bg-allports h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-linkedin pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                        <span className="d-none d-xs-block mx-5 px-3">
                          Import from LinkedIn
                        </span>
                      </a>
                    </div>
                    <div className="col-4 col-xs-12">
                      <a
                        href="http://localhost:3000/"
                        className="font-size-4 font-weight-semibold position-relative text-white bg-poppy h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-google pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                        <span className="d-none d-xs-block mx-5 px-3">
                          Import from Google
                        </span>
                      </a>
                    </div>
                    <div className="col-4 col-xs-12">
                      <a
                        href="http://localhost:3000/"
                        className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-facebook-square pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                        <span className="d-none d-xs-block mx-5 px-3">
                          Import from Facebook
                        </span>
                      </a>
                    </div>
                  </div>
                  {/* END SOCIAL MEDIA LINK BUTTONS */}
                  <div className="or-devider">
                    <span className="font-size-3 line-height-reset">Or</span>
                  </div>

                  {/* SIGNUP FORM */}
                  <form onSubmit={onUserSignUpClick}>
                    <div className="form-group">
                      <label
                        htmlFor="useremail"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        E-mail
                      </label>
                      <input
                        name="useremail"
                        value={state.useremail}
                        onChange={onInputChange}
                        type="email"
                        className={
                          errors.useremail
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        placeholder="example@gmail.com"
                        id="useremail"
                      />
                      {errors.useremail && (
                        <ul>
                          {errors.useremail.map((error) => (
                            <li key={error} className="text-danger">
                              {error}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="userpassword"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Password
                      </label>
                      <div className="position-relative">
                        <input
                          name="userpassword"
                          value={state.userpassword}
                          onChange={onInputChange}
                          type="password"
                          className={
                            errors.userpassword
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          id="userpassword"
                          placeholder="Enter password"
                        />
                        {errors.userpassword && (
                          <ul>
                            {errors.userpassword.map((error) => (
                              <li key={error} className="text-danger">
                                {error}
                              </li>
                            ))}
                          </ul>
                        )}
                        {/* <a
                          href="http://localhost:3000/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password2"
                        ></a> */}
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="confirmpassword"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Confirm Password
                      </label>
                      <div className="position-relative">
                        <input
                          name="confirmpassword"
                          value={state.confirmpassword}
                          onChange={onInputChange}
                          type="password"
                          className={
                            errors.confirmpassword
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          id="confirmpassword"
                          placeholder="Enter password"
                        />
                        {errors.confirmpassword && (
                          <ul>
                            {errors.confirmpassword.map((error) => (
                              <li key={error} className="text-danger">
                                {error}
                              </li>
                            ))}
                          </ul>
                        )}
                        {/* <a
                          href="http://localhost:3000/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password23"
                        ></a> */}
                      </div>
                    </div>
                    <div className=" d-flex flex-wrap justify-content-between mb-1">
                      <label
                        htmlFor="terms-check2"
                        className="gr-check-input d-flex  mr-3"
                      >
                        <input
                          className="d-none"
                          type="checkbox"
                          id="terms-check2"
                        />
                        <span className="checkbox mr-5"></span>
                        <span className="font-size-3 mb-0 line-height-reset d-block">
                          Agree to the{" "}
                          <a
                            href="http://localhost:3000/"
                            className="text-primary"
                          >
                            Terms & Conditions
                          </a>
                        </span>
                      </label>
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                        type="submit"
                      >
                        Sign Up{" "}
                      </button>
                    </div>
                    <p className="font-size-4 text-center heading-default-color">
                      Already have an account?{" "}
                      <Link
                        to=""
                        className="text-primary"
                        onClick={props.loginClick}
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
