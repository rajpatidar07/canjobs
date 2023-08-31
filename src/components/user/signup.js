import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { EmployeeSignUp, SendOtp, LinkedSignup, SocialLogin } from "../../api/api";
import useValidation from "../common/useValidation";
import { toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
// import { useLinkedIn , LinkedIn} from "react-linkedin-login-oauth2";
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
export default function EmployeeSignupModal(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [termsErr, settermsErr] = useState("");
  const [SingUpSuccess, setSingUpSuccess] = useState("");
  let [loading, setLoading] = useState(false);
  let [otpBox, setOtpBox] = useState(false);
  let [facebook, setFacebook] = useState(false);
  const [searchParams] = useSearchParams()
  let code = searchParams.get("code")
  let navigate = useNavigate();
  let i = 0;
  let encoded;
  if (props.show === true) {
    localStorage.setItem("linkedin", "employeeSignup");
  }
  const type = localStorage.getItem("linkedin");
  // USER SIGNUP VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    email: "",
    password: "",
    resume: "",
    otp: "",
  };
  // VALIDATION CONDITIONS termsErr
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
    resume: [
      (value) => (value === "" || value === null ? "Resume is required" : null),
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, setErrors, errors, validate } =
    useValidation(initialFormState, validators);

  // USER SIGNUP SUBMIT BUTTON
  const onUserSignUpClick = async (event) => {
    event.preventDefault();
    setLoading(false);
    if (validate() && state.otp) {
      /*Api to signup */
      if (isChecked) {
        settermsErr("");
        setLoading(true);
        try {
          const signUpData = await EmployeeSignUp(state);
          if (signUpData.message === "Employee has been registered") {
            setSingUpSuccess("success");
            setLoading(false);
          } else if (signUpData.message === "Email already exists") {
            setLoading(false);
            settermsErr("Email already exist");
          } else if (signUpData.message === " incorrect otp ") {
            setLoading(false);
            setErrors({ ...errors, otp: "Invalid Otp" });
          }
        } catch (err) {
         console.log(err) 
          setLoading(false)
        }
      } else {
        setLoading(false);
        settermsErr("Accept terms and conditions");
      }
    } else if (otpBox === false && validate()) {
      /*Api to get otp */
      setLoading(true);
      try {
        const updatedTodo = await SendOtp(state);
        if (updatedTodo.message === "successful") {
          toast.success("Otp sent Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setOtpBox(true);
          setLoading(false);
        }
      } catch (err) {
       console.log(err) 
        setLoading(false);
      }
    }
  };
  // END USER SIGNUP VALIDATION

  /*Function to Sign Up with google */
  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        let data = await axios("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${tokenResponse.access_token}`
          }
        });
        console.log(data.data);
        if (data.data.email_verified === true) {
          try {
            let res = await SocialLogin(data.data.sub, data.data.email, data.data.name, data.data.picture, "Google");
            console.log(res,);
            localStorage.setItem("token", res.token);
            localStorage.setItem("userType", "user");
            localStorage.setItem("employee_id", res.employee_id);
            localStorage.setItem("profile_photo", res.profile_photo);
            toast.success("Logged In Successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            props.close();
            navigate("/");
            window.location.reload();
          } catch (err) {
           console.log(err)
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

  /*Function to Sign Up with Linked in */
  /*Code to get access token */
  // axios.post(`https://www.linkedin.com/oauth/v2/accessToken?code=${code}&grant_type=authorization_code&client_id=78mhwjaumkvtbm&client_secret=ZoZKbJgORl0vYJFr&redirect_uri=${window.location.origin}`)
  // .then(response => {
  //   console.log('data', response.data);
  // })
  // .catch(error => {
  //   console.error('Error:', error.message);
  // });
  // console.log(i , "code =>" , code);
  const handleLinkedInLogin = () => {
    const clientId = '78mhwjaumkvtbm';
    const redirectUri = 'http://localhost:3000/';
    const scope = 'r_liteprofile r_emailaddress w_member_social profile email openid';

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;


  };
  // console.log(type,(code !== '' || code !== undefined || code !== "undefined" || code !== null) && i === 3 && type === "employeeSignup");
  useEffect(() => {
    i = i + 3
    if ((code !== '' || code !== undefined || code !== "undefined" || code !== null) && i === 3 && type === "employeeSignup") {
      const response = LinkedSignup(code, type);
      response.then((res) => {
        let decode = JSON.parse(res.data)
        if (res.data.email_verified === true) {
          try {
            let data = SocialLogin(res.data.sub, res.data.email, res.data.name, res.data.picture, "Linkedin");
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userType", "user");
            localStorage.setItem("employee_id", data.employee_id);
            localStorage.setItem("profile_photo", data.profile_photo);
            toast.success("Logged In Successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            props.close();
            navigate("/");
            window.location.reload();
          } catch (err) {
           console.log(err)
          }
        } if (res.data.message === "The token used in the request has been revoked by the user" || decode.error_description === "Unable to retrieve access token: appid/redirect uri/code verifier does not match authorization code. Or authorization code expired. Or external member binding exists") {
          toast.error("Token Expired", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          navigate("/");
        }
      }).catch((err) => {
        console.log(err.data);
      })
    }
  }, [])

  /*FUnctiom to Sign Up with facebook */
  const responseFacebook = async (response) => {
    console.log(response);
    if (response.graphDomain === "facebook") {
      try {
        let data = await SocialLogin(response.userID, response.email, response.name, response.picture.data.url, "Facebook");
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", "user");
        localStorage.setItem("employee_id", data.employee_id);
        localStorage.setItem("profile_photo", data.profile_photo);
        toast.success("Logged In Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        props.close();
        navigate("/");
        window.location.reload();
      } catch (err) {
       console.log(err) 
      }
    }
  }
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
  /*Onchange function of Resume */
  const handleUploadFile = async (e) => {
    encoded = await convertToBase64(e.target.files[0]);
    let base64Name = encoded.base64;
    let finalBase = base64Name.split(",")[1];
    setState({ ...state, resume: finalBase });
  };

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
            className="circle-32 btn-reset bg-white pos-abs-tr mt-n6 mr-lg-n6 focus-reset shadow-10 z-index-supper"
            data-dismiss="modal"
            onClick={() => {
              settermsErr("");
              setLoading(false);
              setState(initialFormState);
              setErrors("");
              props.close();
            }}
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

                        <button onClick={handleLinkedInLogin}
                          className="font-size-4 font-weight-semibold position-relative text-white bg-allports h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4 border-0"><i className="fab fa-linkedin pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                          <span className="d-none d-xs-block mx-5 px-3">
                            Import from LinkedIn
                          </span></button>
                      </div>
                      <div className="col-4 col-xs-12">
                        <Link
                          to="" onClick={GoogleLogin}
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
                          to="" onClick={() => setFacebook(true)}
                          className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                        >
                          <i className="fab fa-facebook-square pos-xs-abs-cl font-size-7 ml-xs-4"></i>{" "}
                          <span className="d-none d-xs-block mx-5 px-3">
                            Import from Facebook
                          </span>
                        </Link>
                        {facebook ?
                          <FacebookLogin
                            appId="2170088543184291"
                            autoLoad
                            callback={responseFacebook}
                            fields="name,email,picture"
                            scope="public_profile,user_friends,email,user_actions.books"
                            className="font-size-4 font-weight-semibold position-relative text-white bg-marino h-px-48 flex-all-center w-100 px-6 rounded-5 mb-4"
                            render={renderProps => (
                              <button onClick={renderProps.onClick} className="d-none">
                              </button>
                            )}
                          />
                          : null}
                      </div>
                    </div>
                    {/* END SOCIAL MEDIA LINK BUTTONS */}
                    <div className="or-devider">
                      <span className="font-size-3 line-height-reset">Or</span>
                    </div>

                    {/* SIGNUP FORM */}
                    <form onSubmit={onUserSignUpClick}>
                      {/* FORM FIELDS */}
                      <div className="form-group">
                        <label
                          htmlFor="email"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          E-mail<span className="text-danger"> *</span> :
                        </label>
                        <input
                          name="email"
                          value={state.email || ""}
                          onChange={onInputChange}
                          type="email"
                          className={
                            errors.email
                              ? "form-control border border-danger"
                              : "form-control"
                          }
                          placeholder="example@gmail.com"
                          id="email"
                        />
                        {/* ERROR MSG FOR email */}
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
                          htmlFor="password"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          Password<span className="text-danger"> *</span> :
                        </label>
                        <div className="position-relative">
                          <input
                            name="password"
                            value={state.password || ""}
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
                          {/* <Link
                          to="/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password2"
                        ></Link> */}
                        </div>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="resume"
                          className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                          Upload Resume
                        </label>
                        <div className="position-relative">
                          <input
                            name="resume"
                            onChange={handleUploadFile}
                            type="file"
                            accept=".pdf,application/pdf"
                            className={
                              errors.resume
                                ? "form-control border border-danger"
                                : "form-control"
                            }
                            id="resume"
                            placeholder="Enter password"
                          />
                          {errors.resume && (
                            <span
                              key={errors.resume}
                              className="text-danger font-size-3"
                            >
                              {errors.resume}
                            </span>
                          )}
                          {/* <Link
                          to="/"
                          className="show-password pos-abs-cr fas mr-6 text-black-2"
                          data-show-pass="password23"
                        ></Link> */}
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
                              value={state.otp || ""}
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
                          htmlFor="tandr"
                          className="gr-check-input d-flex  mr-3"
                        >
                          <input
                            type="checkbox"
                            id="tandr"
                            name="tandr"
                            onChange={(event) => {
                              setIsChecked(event.target.checked);
                            }}
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
                        <span
                          key={termsErr}
                          className="text-danger font-size-3"
                        >
                          {termsErr}
                        </span>
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
                          onClick={props.loginClick}
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
