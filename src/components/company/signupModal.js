import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValidation from "../common/useValidation";
import { EmployerSignUp, SendOtp } from "../../api/api";
import { toast } from "react-toastify";
export default function CompanySignUp(props) {
  let [loading, setLoading] = useState(false);
  let [otpBox, setOtpBox] = useState(false);
  const [SingUpSuccess, setSingUpSuccess] = useState("");
  const [otpErr, setotperr] = useState("");
  /*Function to close he modal */
  const close = () => {
    setErrors("");
    setState(initialFormState);
    setOtpBox(false);
    props.close();
  }; // USER SIGNUP VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    email: "",
    password: "",
    contact_no: "",
    term_and_condition: "",
    otp: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    email: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    password: [
      (value) =>
        value === ""
          ? "Password is required"
          : /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
              value
            )
          ? null
          : "Password must contain digit, one uppercase letter, one special character, no space, and it must be 8-16 characters long",
    ],
    contact_no: [
      (value) =>
        otpBox === false
          ? ""
          : value === "" || value === null
          ? "Contact no is required"
          : value.length < 10 || value.length > 11
          ? "Contact no should be of 10 digits"
          : "",
    ],
    term_and_condition: [
      (value) =>
        otpBox === false
          ? ""
          : value === null || value === "" || value === false
          ? "Please accept terms and conditions continue"
          : "",
    ],
    otp: [
      (value) =>
        otpBox
          ? value === null || value === ""
            ? "Otp is requried"
            : otpErr === "Invalid Otp"
            ? "Invalid Otp"
            : ""
          : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  // USER SIGNUP SUBMIT BUTTON
  const onCompanySignUpClick = async (event) => {
    // // console.log(state);
    // if(state.term_and_condition ? setErrors({...errors , term_and_condition : ""}) : errors.term_and_condition)
    event.preventDefault();
    if (validate() && state.otp && state.term_and_condition) {
      /*Api to signup */

      let Response = await EmployerSignUp(state);
      if (Response.message === "Employer has been registered") {
        toast.success("Registered Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setErrors("");
        setState(initialFormState);
        setOtpBox(false);
        setSingUpSuccess("success");
      } else if (Response.message === " incorrect otp ") {
        setLoading(false);
        setotperr("Invalid Otp");
        setErrors({ ...errors, term_and_condition: "" });
        setErrors({ ...errors, contact_no: "" });
      } else if (Response.message === "Email already exists") {
        setErrors({ ...errors, email: ["Email already exists"] });
        setState(initialFormState);
        setOtpBox(false);
      }
    } else if (otpBox === false) {
      /*Api to get otp */
      setLoading(true);
      const updatedTodo = await SendOtp(state);
      if (updatedTodo.message === "successful") {
        toast.success("Otp sent Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setOtpBox(true);
        setLoading(false);
      }
    }
  };
  // END USER SIGNUP VALIDATION
  console.log(loading);
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
            onClick={close}
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
                {SingUpSuccess === "success" ? (
                  <div className="bg-white-2 h-100 px-11 pt-11 pb-7 login_Modal_box">
                    Congratulations! <br />
                    You have successfully registered your account. Please login
                    to continue
                    <br />
                    <Link
                      to=""
                      className="btn btn-primary mt-12"
                      onClick={props.loginClick}
                    >
                      Login
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white-2 h-100 px-11 pt-11 pb-7 login_Modal_box">
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
                          name="email"
                          value={"" || state.email}
                          onChange={onInputChange}
                          className={
                            errors.email
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          placeholder="example@gmail.com"
                          id="email"
                        />
                        {/* ERROR MSG FOR Company EMAIL */}
                        {errors.email && (
                          <span
                            key={errors.email}
                            className="text-danger font-size-3"
                          >
                            {errors.email}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="contact_no"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          Contact Number
                        </label>
                        <input
                          type="number"
                          name="contact_no"
                          value={"" || state.contact_no}
                          onChange={onInputChange}
                          className={
                            errors.contact_no
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          placeholder="Contact Number"
                          id="contact_no"
                        />
                        {/* ERROR MSG FOR Company no */}
                        {errors.contact_no && (
                          <span
                            key={errors.contact_no}
                            className="text-danger font-size-3"
                          >
                            {errors.contact_no}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="password"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          Password
                        </label>
                        <div className="position-relative">
                          <input
                            name="password"
                            value={"" || state.password}
                            onChange={onInputChange}
                            type="password"
                            className={
                              errors.password
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            id="password"
                            placeholder="Enter password"
                          />
                          {/* ERROR MSG FOR PASSWORD */}
                          {errors.password && (
                            <span
                              key={errors.password}
                              className="text-danger font-size-3"
                            >
                              {errors.password}
                            </span>
                          )}
                        </div>
                      </div>
                      {otpBox ? (
                        <div className="form-group">
                          <label
                            htmlFor="otp"
                            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                          >
                            Enter Otp
                          </label>
                          <div className="position-relative">
                            <input
                              type="number"
                              value={"" || state.otp}
                              onChange={onInputChange}
                              maxLength={6}
                              name="otp"
                              id="otp"
                              className={
                                errors.otp
                                  ? "form-control border border-danger"
                                  : "form-control"
                              }
                              placeholder="Otp"
                            />
                            {errors.otp && (
                              <span
                                key={errors.otp}
                                className="text-danger font-size-3"
                              >
                                {errors.otp}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : null}
                      {/* END FORM FIELDS  */}
                      <div className=" d-flex flex-wrap justify-content-between mb-1 col-md-12 ">
                        <label
                          htmlFor="term_and_condition"
                          className="gr-check-input d-flex  mr-3"
                        >
                          <input
                            type="checkbox"
                            id="term_and_condition"
                            name="term_and_condition"
                            onChange={(event) =>
                              setState({
                                ...state,
                                term_and_condition: event.target.checked,
                              })
                            }
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
                        {errors.term_and_condition && (
                          <span
                            key={errors.term_and_condition}
                            className="text-danger font-size-3"
                          >
                            {errors.term_and_condition}
                          </span>
                        )}
                      </div>
                      <div className="form-group text-center">
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
                        ) : otpBox ? (
                          <button
                            className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                            type="submit"
                          >
                            Sign Up
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                            type="submit"
                          >
                            Send otp
                          </button>
                        )}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
