import React from "react";
import { AdminLogin } from "../../api/api";
import useValidation from "../common/useValidation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function AdminLoginFrom() {
  let navigate = useNavigate();
  /*----USER LOGIN VALIDATION----*/
  const initialFormState = {
    email: "",
    password: "",
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
    password: [(value) => (value === "" ? "Password is required" : null)],
  };
  /*----LOGIN ONCHANGE FUNCTION----*/
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  /*----LOGIN SUBMIT FUNCTION----*/
  const onUserLoginClick = async (event) => {
    event.preventDefault();

    if (validate()) {
      // handle form submission
      const updatedTodo = await AdminLogin(state);
      if (
        updatedTodo.status ||
        updatedTodo.message === "Successfully Logged "
      ) {
        localStorage.setItem("token", updatedTodo.token);
        localStorage.setItem("userType", "admin");
        localStorage.setItem("admin_id", updatedTodo.admin_id);
        toast.success("Logged In Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
      return navigate("/dashboard");
    }
  };
  // END USER LOGIN VALIDATION

  return (
    <>
      {/* <!-- Login --> */}

      <div className="d-flex justify-content-center pt-21">
        <div className="bg-white rounded-8 overflow-hidden pt-21">
          <div className="bg-white-2 h-100 px-11 pt-11 pb-7 border">
            <div className="pb-5 mb-5 text-center">
              <img
                src="image/logo-main-black.png"
                className="img-fluid "
                height={200}
                width={200}
              />
            </div>
            {/* user login form */}
            <form onSubmit={onUserLoginClick}>
              <div className="form-group">
                <label
                  htmlFor="useremail"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
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
                      <span key={error} className="text-danger font-size-3">
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
                    name="password"
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
                        <span key={error} className="text-danger font-size-3">
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
              {/* <div className="d-flex flex-wrap justify-content-between">
                <label
                  htmlFor="terms-check"
                  className="gr-check-input d-flex  mr-3"
                >
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
                </label> */}

              {/* <Link
                  to={""}
                  className="font-size-3 text-dodger line-height-reset mb-3"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forget Password
                </Link> */}
              {/*----ERROR MESSAGE FOR terms----*/}
              {/* {errors.tandr && (
                  <span key={errors.tandr} className="text-danger font-size-3">
                    {errors.tandr}
                  </span>
                )} */}
              {/* </div> */}

              <div className="form-group mb-8">
                <button
                  className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                  type="submit"
                >
                  Log in{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
