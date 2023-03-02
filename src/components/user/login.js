import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValidation from "../common/useValidation";

export default function EmployeeLoginModal(props) {
  let [showForgotPassword, setShowForgotPassword] = useState(false);

  /*----USER LOGIN VALIDATION----*/
  const initialFormState = {
    useremail: "",
    userpassword: "",
  };
  /*----VALIDATION CONTENT----*/
  const validators = {
    useremail: [
      (value) =>
        value === null || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    userpassword: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
  };
  /*----LOGIN ONCHANGE FUNCTION----*/
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  /*----LOGIN SUBMIT FUNCTION----*/
  const onUserLoginClick = (event) => {
    event.preventDefault();

    if (validate()) {
      // handle form submission
    }
  };
  // END USER LOGIN VALIDATION

  return (
    <>
      {/* <!-- Login Modal --> */}
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="modal-dialog max-width-px-840 position-relative">
          <button
            type="button"
            className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
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
                      Welcome Back
                    </h3>
                    {showForgotPassword === false ? (
                      <p className="mb-0 font-size-4 text-white">
                        Log in to continue your account and explore new jobs.
                      </p>
                    ) : (
                      <p className="mb-0 font-size-4 text-white">
                        Enter the email to continue.
                      </p>
                    )}
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
                  <div
                    className={showForgotPassword === false ? "row" : "d-none"}
                  >
                    <div className="col-4 col-xs-12">
                      <a
                        href="http://localhost:3000/"
                        className="font-size-4 font-weight-semibold position-relative text-white bg-allports h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-linkedin pos-xs-abs-cl font-size-7 ml-xs-2"></i>{" "}
                        <span className="d-none d-xs-block mx-5 px-4">
                          Log in with LinkedIn
                        </span>
                      </a>
                    </div>
                    <div className="col-4 col-xs-12">
                      <a
                        href="http://localhost:3000/"
                        className="font-size-4 font-weight-semibold position-relative text-white bg-poppy h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-google pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                        <span className="d-none d-xs-block mx-5 px-4">
                          Log in with Google
                        </span>
                      </a>
                    </div>
                    <div className="col-4 col-xs-12">
                      <a
                        href="http://localhost:3000/"
                        className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                      >
                        <i className="fab fa-facebook-square pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                        <span className="d-none d-xs-block mx-5 px-4">
                          Log in with Facebook
                        </span>
                      </a>
                    </div>
                  </div>
                  <div
                    className={
                      showForgotPassword === false ? "or-devider" : "d-none"
                    }
                  >
                    <span className="font-size-3 line-height-reset ">Or</span>
                  </div>
                  <form
                    onSubmit={onUserLoginClick}
                    className={showForgotPassword === false ? "" : "d-none"}
                  >
                    <div className="form-group">
                      <label
                        htmlFor="useremail"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="useremail"
                        value={state.useremail}
                        onChange={onInputChange}
                        className={
                          errors.useremail
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        placeholder="example@gmail.com"
                        id="useremail"
                      />
                      {/*----ERROR MESSAGE FOR EMAIL----*/}
                      {errors.useremail && (
                        <span>
                          {errors.useremail.map((error) => (
                            <span
                              key={error}
                              className="text-danger font-size-3"
                            >
                              {error}
                            </span>
                          ))}
                        </span>
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
                          type="password"
                          value={state.userpassword}
                          onChange={onInputChange}
                          className={
                            errors.userpassword
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          placeholder="Enter password"
                          id="userpassword"
                        />{" "}
                        {/*----ERROR MESSAGE FOR PASSWORD----*/}
                        {errors.userpassword && (
                          <span>
                            {errors.userpassword.map((error) => (
                              <span
                                key={error}
                                className="text-danger font-size-3"
                              >
                                {error}
                              </span>
                            ))}
                          </span>
                        )}
                        {/* <a
                          href="http://localhost:3000/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password"
                        ></a> */}
                      </div>
                    </div>
                    <div className="d-flex flex-wrap justify-content-between">
                      <label
                        htmlFor="terms-check"
                        className="gr-check-input d-flex  mr-3"
                      >
                        <input
                          className="d-none"
                          type="checkbox"
                          id="terms-check"
                        />
                        <span className="checkbox mr-5"></span>
                        <span className="font-size-3 mb-0 line-height-reset mb-1 d-block">
                          Remember password
                        </span>
                      </label>
                      <Link
                        to={""}
                        className="font-size-3 text-dodger line-height-reset mb-3"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forget Password
                      </Link>
                    </div>
                    <div className="form-group mb-8">
                      <button
                        className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                        type="submit"
                      >
                        Log in{" "}
                      </button>
                    </div>
                    <p className="font-size-4 text-center heading-default-color">
                      Don’t have an account?{" "}
                      <Link
                        className="text-primary"
                        to={""}
                        onClick={props.singUpClick}
                      >
                        Create a free account
                      </Link>
                    </p>
                  </form>

                  <form className={showForgotPassword === true ? "" : "d-none"}>
                    <div className="form-group">
                      <label
                        htmlFor="email2"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@gmail.com"
                        id="email2"
                      />
                    </div>
                    <div className="form-group mb-8">
                      <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
                        Sent email{" "}
                      </button>
                    </div>
                    <p className="font-size-4 text-center heading-default-color">
                      Already have an account?{" "}
                      <Link
                        to=""
                        className="text-primary"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Login
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
