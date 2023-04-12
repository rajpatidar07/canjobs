import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValidation from "../common/useValidation";
export default function CompanyLogin(props) {
  let [showCompanyForgotPassword, setShowCompanyForgotPassword] = useState(
    false
  );
  /*----USER LOGIN VALIDATION----*/
  const initialFormState = {
    email: "",
    companypassword: "",
    tandr: "",
  };
  /*----VALIDATION CONTENT----*/
  const validators = {
    email: [
      (value) =>
        value === null || value.trim() === ""
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
          : "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    tandr: [
      (value) =>
        value ? null : "Please accept terms and conditions to continue",
    ],
  };
  /*----LOGIN ONCHANGE FUNCTION----*/
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  /*----LOGIN SUBMIT FUNCTION----*/
  const onCompanyLoginClick = (event) => {
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
                    {showCompanyForgotPassword === false ? (
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
                    className={
                      showCompanyForgotPassword === false ? "row" : "d-none"
                    }
                  >
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
                  <div
                    className={
                      showCompanyForgotPassword === false
                        ? "or-devider"
                        : "d-none"
                    }
                  >
                    <span className="font-size-3 line-height-reset ">Or</span>
                  </div>
                  {/* company login form */}
                  <form
                    className={
                      showCompanyForgotPassword === false ? "" : "d-none"
                    }
                    onSubmit={onCompanyLoginClick}
                  >
                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={onInputChange}
                        className={
                          errors.email
                            ? "form-control border border-danger"
                            : "form-control"
                        }
                        placeholder="example@gmail.com"
                        id="email"
                      />
                      {/*----ERROR MESSAGE FOR EMAIL----*/}
                      {errors.email && (
                        <span>
                          {errors.email.map((error) => (
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
                        htmlFor="companypassword"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Password
                      </label>
                      <div className="position-relative">
                        <input
                          name="companypassword"
                          type="password"
                          value={state.companypassword}
                          onChange={onInputChange}
                          className={
                            errors.companypassword
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          placeholder="Enter password"
                          id="companypassword"
                        />{" "}
                        {/*----ERROR MESSAGE FOR PASSWORD----*/}
                        {errors.companypassword && (
                          <span>
                            {errors.companypassword.map((error) => (
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
                    </div>
                    <div className=" d-flex flex-wrap justify-content-between mb-5 col-md-12 ">
                      <label htmlFor="tandr" className="mb-0 d-flex  mr-3">
                        <input
                          type="checkbox"
                          id="tandr"
                          name="tandr"
                          onChange={onInputChange}
                          className="text-black-2 pt-5 mr-5"
                        />
                        <span className="font-size-3 mb-1 line-height-reset d-block">
                          Remember password
                        </span>
                      </label>

                      <Link
                        to="/"
                        className="font-size-3 text-dodger line-height-reset"
                        onClick={() => setShowCompanyForgotPassword(true)}
                      >
                        Forget Password
                      </Link>
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

                    <div className="form-group mb-8">
                      <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
                        Log in{" "}
                      </button>
                    </div>
                    <p className="font-size-4 text-center heading-default-color">
                      Don’t have an account?{" "}
                      <Link
                        className="text-primary"
                        to={""}
                        onClick={props.CompanySignUpClick}
                      >
                        Create a free account
                      </Link>
                    </p>
                  </form>
                  {/* end company login form */}

                  {/* FORGOT PASSWORD FORM */}
                  <form
                    className={
                      showCompanyForgotPassword === true ? "" : "d-none"
                    }
                  >
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
                    <div className="form-group d-flex flex-wrap justify-content-between mb-1">
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
                          <Link to={""} className="text-primary">
                            Terms & Conditions
                          </Link>
                        </span>
                      </label>
                    </div>
                    <div className="form-group text-center">
                      <button
                        className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    <p className="font-size-4 text-center heading-default-color">
                      Already have an account?{" "}
                      <Link
                        to=""
                        className="text-primary"
                        onClick={() => setShowCompanyForgotPassword(false)}
                      >
                        Login
                      </Link>
                    </p>
                  </form>
                  {/*END  FORGOT PASSWORD FORM */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
