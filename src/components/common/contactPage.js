import React, { /*useEffect,*/ useState } from "react";
import useValidation from "./useValidation";
import { Link } from "react-router-dom";
import {TestEmail} from "../../api/api"
export default function ContactPage(props) {
  const [loading ,setLoading] = useState(false);

  /*Render function to get the Response*/
  // useEffect(() => {
  // }, []);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    subject: "",
    description: "",
    email_id: props.email,
    email_template_id: "1",
  };

  let validators = {};
  // CUSTOM VALIDATIONS IMPORT
  const {
    state /*, setState*/,
    onInputChange,
    errors /* setErrors, validate */,
  } = useValidation(initialFormState, validators);

  const onContactusClick =async () => {
    let Response =await TestEmail(state)
    console.log(Response);
    if(Response){
      setLoading(false)
    }
  };
  return (
    <div className="p-10 activity_container">
      <div className="row">
        <div className="col">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title text-center">Visa Manager</h5>
              <p className="card-text">
                <b>Name:</b> Jhon Thomas
              </p>
              <p className="card-text ">
                <b>Email:</b> <Link className="text-dark">Jhon@gmail.com</Link>
              </p>
              <p className="card-text ">
                <b>Contact no.:</b>
                <Link className="text-dark">9658741230</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col">
        <div className="card ">
            <div className="card-body">
              <h5 className="card-title text-center">LMIA Manager</h5>
              <p className="card-text">
                <b>Name:</b> Jhon Thomas
              </p>
              <p className="card-text ">
                <b>Email:</b> <Link className="text-dark">Jhon@gmail.com</Link>
              </p>
              <p className="card-text ">
                <b>Contact no.:</b>
                <Link className="text-dark">9658741230</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <form className=" p-10">
            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="subject"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0">
                Subject: <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  maxLength={20}
                  name="subject"
                  value={state.subject || ""}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.subject
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="subject"
                  id="subject"
                />
              </div>
              {/*----ERROR MESSAGE FOR name----*/}
              {errors.subject && (
                <span key={errors.subject} className="text-danger font-size-3">
                  {errors.subject}
                </span>
              )}
            </div>
            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="remark"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Description: <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <div
                  className={
                    errors.remark
                      ? "border border-danger rounded overflow-hidden"
                      : "border rounded overflow-hidden"
                  }
                >
                  <textarea
                    name="remark"
                    value={state.remark}
                    onChange={onInputChange}
                    rows={8}
                    style={{ height: "140px" }}
                    className={
                      errors.remark
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="remark"
                    placeholder="Add Note here"
                  ></textarea>
                </div>
                {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                {errors.remark && (
                  <span key={errors.remark} className="text-danger font-size-3">
                    {errors.remark}
                  </span>
                )}
              </div>
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
              ) : (
                <button
                  onClick={(e) => onContactusClick(e)}
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
