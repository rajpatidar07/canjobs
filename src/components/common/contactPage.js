import React, { /*useEffect,*/ useState } from "react";
import useValidation from "./useValidation";
import { SendEmail } from "../../api/api";
import { toast } from "react-toastify";
export default function ContactPage(props) {
  const [loading, setLoading] = useState(false);

  /*Render function to get the Response*/
  // useEffect(() => {
  // }, []);

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    subject: "",
    description: "",
    email: props.email,
  };

  /*Validation */
  let validators = {
    subject: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Subject is required"
          : /[-]?\d+(\.\d+)?/.test(value)
          ? "Subject can not have a number."
          : value.length < 2
          ? "Subject should have 2 or more letters"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : "",
    ],
    description: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Description is required"
          : // : /[-]?\d+(\.\d+)?/.test(value)
          // ? "Description can not have a number."
          value.length < 5
          ? "Description should have 2 or more letters"
          : // : /[^A-Za-z 0-9]/g.test(value)
            // ? "Cannot use special character "
            "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);

  /*Function to sent email*/
  const onContactusClick = async () => {
    if (validate()) {
      try {
        setLoading(true);
        let Response = await SendEmail(state);
        if (Response.message === "email sent successfully") {
          toast.success("Email sent successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          setState(initialFormState);
          setErrors("");
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };
  return (
    <div className="p-10 activity_container profile_id_card">
      <div className="row">
        <div className="col">
          <div className="card mx-auto">
            <h5 className="card-title text-center mt-2">LMIA Manager</h5>

            <div className="row no-gutters">
              <div className="col-md-4 ">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  className="card-img mx-2 mb-2"
                  alt="Profile"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title ">
                    John Doe
                    <small>(Web Developer)</small>
                  </h5>
                  <p className="card-text">
                    <b>Address</b>: 123 Main St, City, Country
                  </p>
                  <p className="card-text">
                    <b>Phone</b>: 123-456-7890
                  </p>
                  <p className="card-text">
                    <b>Email</b>: john.doe@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mx-auto">
            <h5 className="card-title text-center mt-2">Visa Manager</h5>

            <div className="row no-gutters">
              <div className="col-md-4 ">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  className="card-img mx-2 mb-2"
                  alt="Profile"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title ">
                    John Doe
                    <small>(Web Developer)</small>
                  </h5>
                  <p className="card-text">
                    <b>Address</b>: 123 Main St, City, Country
                  </p>
                  <p className="card-text">
                    <b>Phone</b>: 123-456-7890
                  </p>
                  <p className="card-text">
                    <b>Email</b>: john.doe@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <form className=" p-10">
            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="subject"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
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
                htmlFor="description"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Description: <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <div
                  className={
                    errors.description
                      ? "border border-danger rounded overflow-hidden"
                      : "border rounded overflow-hidden"
                  }
                >
                  <textarea
                    name="description"
                    value={state.description}
                    onChange={onInputChange}
                    rows={8}
                    style={{ height: "140px" }}
                    className={
                      errors.description
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="description"
                    placeholder="Add Note here"
                  ></textarea>
                </div>
                {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                {errors.description && (
                  <span
                    key={errors.description}
                    className="text-danger font-size-3"
                  >
                    {errors.description}
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
