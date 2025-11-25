import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { EmployerDetails, AddContact } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactInfo(props) {
  const [loading, setLoading] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);

  // INITIAL STATE
  const initialFormState = {
    contact_person_name: "",
    email: "",
    contact_no: "",
    contact_no_other: "",
    address: "",
    pin_code: "",
    city: "",
    state: "",
    country: "",
    designation: "",
    // secondary details
    secondary_contact_person_name: "",
    secondary_email: "",
    secondary_contact_no: "",
    secondary_contact_no_other: "",
    secondary_address: "",
    secondary_pin_code: "",
    secondary_city: "",
    secondary_state: "",
    secondary_country: "",
    secondary_designation: "",
  };

  // VALIDATORS
  const baseValidators = {
    contact_person_name: [
      (v) =>
        !v || v.trim() === ""
          ? "Company name is required"
          : /[^A-Za-z 0-9]/g.test(v)
            ? "Cannot use special character"
            : v.length < 2
              ? "Company name should have 2 or more letters"
              : "",
    ],
    email: [
      (v) =>
        !v || v.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(v)
            ? null
            : "Email is invalid",
    ],
    contact_no: [
      (v) =>
        !v || v.trim() === ""
          ? "Phone no is required"
          : "",
    ],
    designation: [
      (v) =>
        !v || v.trim() === ""
          ? "Designation is required"
          : v.length < 2
            ? "Designation should have 2 or more letters"
            : "",
    ],
    pin_code: [
      (v) =>
        !v
          ? ""
          : v.length !== 6
            ? "Pincode should be of 6 digits"
            : "",
    ],
  };

  // Secondary validators (applied only if showSecondary is true)
  const secondaryValidators = {
    secondary_contact_person_name: [
      (v) =>
        !v || v.trim() === ""
          ? "Contact name is required"
          : v.length < 2
            ? "Name should have 2 or more letters"
            : "",
    ],
    secondary_email: [
      (v) =>
        !v || v.trim() === ""
          ? "Email is required"
          : !/\S+@\S+\.\S+/.test(v)
            ? "Email is invalid"
            : v === state.email
              ? "The secondary email is the same as the primary email."
              : null
    ],
    secondary_contact_no: [
      (v) =>
        !v || v.trim() === ""
          ? "Phone no is required"
          : "",
    ],
    secondary_designation: [
      (v) =>
        !v || v.trim() === ""
          ? "Designation is required"
          : v.length < 2
            ? "Designation should have 2 or more letters"
            : "",
    ],
    secondary_pin_code: [
      (v) =>
        !v
          ? ""
          : v.length !== 6
            ? "Pincode should be of 6 digits"
            : "",
    ],
  };

  const validators = showSecondary
    ? { ...baseValidators, ...secondaryValidators }
    : baseValidators;

  // USE VALIDATION HOOK
  const { state, setState, onInputChange, errors, setErrors, validate } =
    useValidation(initialFormState, validators);

  // CLOSE MODAL
  const close = () => {
    setState(initialFormState);
    setErrors("");
    setLoading(false);
    setShowSecondary(false);
    props.close();
  };

  // FETCH EMPLOYER DATA
  const EmployerData = async () => {
    try {
      let userData = await EmployerDetails(props.employerId);
      if (
        !userData.data.company_detail ||
        userData.data.company_detail.length === 0
      ) {
        setState(initialFormState);
      } else {
        setState(userData.data.company_detail[0]);
        if (userData.data.company_detail[0]?.secondary_contact_person_name) {
          setShowSecondary(true)
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    props.employerId === undefined || props.employerId === "0"
      ? setState(initialFormState)
      : EmployerData();
    // eslint-disable-next-line
  }, [props]);

  // SUBMIT HANDLER
  const onCompanyContactClick = async (event) => {
    event.preventDefault();
    // console.log(validate, errors, state)
    if (validate()) {
      setLoading(true);
      try {
        let responseData = await AddContact(state);
        if (responseData.message === "contact data updated successfully") {
          toast.success("Contact Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          return close();
        }
        if (responseData.message === "Email already exists") {
          toast.error("Email already exists", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setErrors({ ...errors, email: "Email already exists" });
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  return (
    <Modal show={props.show} size="lg" centered>
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        onClick={close}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="bg-white rounded h-100 px-11 pt-7">
        <form onSubmit={onCompanyContactClick}>
          <h5 className="text-center pt-2 mb-7">Contact Detail</h5>

          {/* Primary Contact */}
          {renderPrimaryFields(state, errors, onInputChange)}

          {/* Toggle Button */}
          <div className=" mb-4">
            <button
              type="button"
              className={`btn ${showSecondary ? "btn-outline-gray" : "btn-outline-primary"} btn-sm rounded-5 mb-3`}
              onClick={() => setShowSecondary(!showSecondary)}
            >
              {showSecondary ? "x" : "Add Secondary Details"}
            </button>
          </div>

          {/* Secondary Contact */}
          {showSecondary && renderSecondaryFields(state, errors, onInputChange)}

          {/* Submit Button */}
          <div className="form-group text-center">
            {loading ? (
              <button
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}

/* -------------------------------
   RENDER HELPERS FOR FORM FIELDS
--------------------------------*/
function renderPrimaryFields(state, errors, onInputChange) {
  return (
    <>
      <h6>Primary Details</h6>
      {/* --- keep your existing primary form fields --- */}
      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="contact_person_name"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Contact Person Name:<span className="text-danger">*</span>
          </label>
          <input
            maxLength={60}
            name="contact_person_name"
            value={state.contact_person_name || ""}
            onChange={onInputChange}
            type="text"
            className={
              errors.contact_person_name
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="Contact person Name"
            id="contact_person_name"
          />
          {/*----ERROR MESSAGE FOR CONTACT PERSON NAME----*/}
          {errors.contact_person_name && (
            <span
              key={errors.contact_person_name}
              className="text-danger font-size-3"
            >
              {errors.contact_person_name}
            </span>
          )}
        </div>
        <div className="form-group col-md-6">
          <label
            htmlFor="email"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Email: <span className="text-danger"> *</span>
          </label>
          <input
            maxLength={60}
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
          {/*----ERROR MESSAGE FOR EMAIL----*/}
          {errors.email && (
            <span key={errors.email} className="text-danger font-size-3">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="contact_no"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Contact No: <span className="text-danger">*</span>
            <small>Add mobile no. with country code without +</small>
          </label>
          <input
            maxLength={13}
            name="contact_no"
            value={state.contact_no || ""}
            onChange={onInputChange}
            type="number"
            min={0}
            className={
              errors.contact_no
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="Contact No"
            id="contact_no"
          />
          {/*----ERROR MESSAGE FOR CONTACT NO----*/}
          {errors.contact_no && (
            <span
              key={errors.contact_no}
              className="text-danger font-size-3"
            >
              {errors.contact_no}
            </span>
          )}
        </div>
        <div className="form-group col-md-6">
          <label
            htmlFor="contact_no_other"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Other Contact No:
             <small>Add mobile no. with country code without +</small>
          </label>
          <input
            maxLength={13}
            name="contact_no_other"
            value={state.contact_no_other || ""}
            onChange={onInputChange}
            type="number"
            min={0}
            className={"form-control"}
            placeholder="Other Contact No"
            id="contact_no_other"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="address"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Address:
          </label>
          <input
            // maxLength={60}
            type="text"
            name="address"
            value={state.address || ""}
            onChange={onInputChange}
            className={
              errors.address
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="Address"
            id="address"
          />
          {/*----ERROR MESSAGE FOR ADDRESS----*/}
          {errors.address && (
            <span
              key={errors.address}
              className="text-danger font-size-3"
            >
              {errors.address}
            </span>
          )}
        </div>
        <div className="form-group col-md-6">
          <label
            htmlFor="pin_code"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Pin code:
          </label>
          <input
            name="pin_code"
            value={state.pin_code || ""}
            onChange={onInputChange}
            type="text"
            // min={0}
            className={
              errors.pin_code
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="Pincode"
            id="pin_code"
          />
          {/*----ERROR MESSAGE FOR PINCODE----*/}
          {errors.pin_code && (
            <span
              key={errors.pin_code}
              className="text-danger font-size-3"
            >
              {errors.pin_code}
            </span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="country"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Country:
          </label>
          <input
            type="text"
            placeholder="Country"
            id="country"
            name="country"
            maxLength={60}
            value={state.country || ""}
            onChange={onInputChange}
            className={
              errors.country
                ? "form-control border border-danger"
                : "form-control"
            }
          />
          {/*----ERROR MESSAGE FOR COUNTRY----*/}
          {errors.country && (
            <span
              key={errors.country}
              className="text-danger font-size-3"
            >
              {errors.country}
            </span>
          )}
        </div>
        <div className="form-group col-md-6">
          <label
            htmlFor="state"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Province :
          </label>
          <input
            type="text"
            placeholder="State"
            id="state"
            name="state"
            value={state.state || ""}
            onChange={onInputChange}
            className={
              errors.state
                ? "form-control border border-danger"
                : "form-control"
            }
          />
          {/*----ERROR MESSAGE FOR STATE----*/}
          {errors.state && (
            <span key={errors.state} className="text-danger font-size-3">
              {errors.state}
            </span>
          )}
        </div>

      </div>

      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="city"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            City:
          </label>
          <input
            maxLength={60}
            type="text"
            placeholder="City"
            id="city"
            name="city"
            value={state.city || ""}
            onChange={onInputChange}
            className={
              errors.city
                ? "form-control border border-danger"
                : "form-control"
            }
          />
          {/*----ERROR MESSAGE FOR CITY----*/}
          {errors.city && (
            <span key={errors.city} className="text-danger font-size-3">
              {errors.city}
            </span>
          )}
        </div>

        <div className="form-group col-md-6">
          <label
            htmlFor="designation"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Your Designation: <span className="text-danger"> *</span>
          </label>
          <div className="position-relative">
            <input
              maxLength={60}
              name="designation"
              value={state.designation || ""}
              onChange={onInputChange}
              type="text"
              className={
                errors.designation
                  ? "form-control border border-danger"
                  : "form-control"
              }
              placeholder="Designation"
              id="designation"
            />
            {/*----ERROR MESSAGE FOR DESIGNATION----*/}
            {errors.designation && (
              <span
                key={errors.designation}
                className="text-danger font-size-3"
              >
                {errors.designation}
              </span>
            )}
          </div>
        </div>
      </div>    </>
  );
}

function renderSecondaryFields(state, errors, onInputChange) {
  return (
    <>
      <h6>Secondary Details</h6>
      {/* --- put your secondary fields design here --- */}
      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_contact_person_name"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Contact Person Name:<span className="text-danger">*</span>
          </label>
          <input
            maxLength={60}
            name="secondary_contact_person_name"
            value={state.secondary_contact_person_name || ""}
            onChange={onInputChange}
            type="text"
            className={
              errors.secondary_contact_person_name
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="Contact person Name"
            id="secondary_contact_person_name"
          />
          {/*----ERROR MESSAGE FOR CONTACT PERSON NAME----*/}
          {errors.secondary_contact_person_name && (
            <span
              key={errors.secondary_contact_person_name}
              className="text-danger font-size-3"
            >
              {errors.secondary_contact_person_name}
            </span>
          )}
        </div>
        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_email"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Email: <span className="text-danger"> *</span>
          </label>
          <input
            maxLength={60}
            name="secondary_email"
            value={state.secondary_email || ""}
            onChange={onInputChange}
            type="email"
            className={
              errors.secondary_email
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="example@gmail.com"
            id="secondary_email"
          />
          {/*----ERROR MESSAGE FOR EMAIL----*/}
          {errors.secondary_email && (
            <span key={errors.secondary_email} className="text-danger font-size-3">
              {errors.secondary_email}
            </span>
          )}
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_contact_no"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Contact No: <span className="text-danger">*</span>
            <small>Add mobile no. with country code without +</small>
          </label>
          <input
            maxLength={13}
            name="secondary_contact_no"
            value={state.secondary_contact_no || ""}
            onChange={onInputChange}
            type="number"
            min={0}
            className={
              errors.secondary_contact_no
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="Contact No"
            id="secondary_contact_no"
          />
          {/*----ERROR MESSAGE FOR CONTACT NO----*/}
          {errors.secondary_contact_no && (
            <span
              key={errors.secondary_contact_no}
              className="text-danger font-size-3"
            >
              {errors.secondary_contact_no}
            </span>
          )}
        </div>
        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_contact_no_other"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Other Contact No:
          </label>
          <input
            maxLength={13}
            name="secondary_contact_no_other"
            value={state.secondary_contact_no_other || ""}
            onChange={onInputChange}
            type="number"
            min={0}
            className={"form-control"}
            placeholder="Other Contact No"
            id="secondary_contact_no_other"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_address"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Address:
          </label>
          <input
            // maxLength={60}
            type="text"
            name="secondary_address"
            value={state.secondary_address || ""}
            onChange={onInputChange}
            className={
              errors.secondary_address
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="Address"
            id="secondary_address"
          />
          {/*----ERROR MESSAGE FOR ADDRESS----*/}
          {errors.secondary_address && (
            <span
              key={errors.secondary_address}
              className="text-danger font-size-3"
            >
              {errors.secondary_address}
            </span>
          )}
        </div>
        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_pin_code"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Pin code:
          </label>
          <input
            name="secondary_pin_code"
            value={state.secondary_pin_code || ""}
            onChange={onInputChange}
            type="text"
            // min={0}
            className={
              errors.secondary_pin_code
                ? "form-control border border-danger"
                : "form-control"
            }
            placeholder="Pincode"
            id="secondary_pin_code"
          />
          {/*----ERROR MESSAGE FOR PINCODE----*/}
          {errors.secondary_pin_code && (
            <span
              key={errors.secondary_pin_code}
              className="text-danger font-size-3"
            >
              {errors.secondary_pin_code}
            </span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_country"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Country:
          </label>
          <input
            type="text"
            placeholder="Country"
            id="secondary_country"
            name="secondary_country"
            maxLength={60}
            value={state.secondary_country || ""}
            onChange={onInputChange}
            className={
              errors.secondary_country
                ? "form-control border border-danger"
                : "form-control"
            }
          />
          {/*----ERROR MESSAGE FOR COUNTRY----*/}
          {errors.secondary_country && (
            <span
              key={errors.secondary_country}
              className="text-danger font-size-3"
            >
              {errors.secondary_country}
            </span>
          )}
        </div>

        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_state"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Province :
          </label>
          <input
            type="text"
            placeholder="State"
            id="secondary_state"
            name="secondary_state"
            value={state.secondary_state || ""}
            onChange={onInputChange}
            className={
              errors.secondary_state
                ? "form-control border border-danger"
                : "form-control"
            }
          />
          {/*----ERROR MESSAGE FOR STATE----*/}
          {errors.secondary_state && (
            <span key={errors.secondary_state} className="text-danger font-size-3">
              {errors.secondary_state}
            </span>
          )}
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_city"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            City:
          </label>
          <input
            maxLength={60}
            type="text"
            placeholder="City"
            id="secondary_city"
            name="secondary_city"
            value={state.secondary_city || ""}
            onChange={onInputChange}
            className={
              errors.secondary_city
                ? "form-control border border-danger"
                : "form-control"
            }
          />
          {/*----ERROR MESSAGE FOR CITY----*/}
          {errors.secondary_city && (
            <span key={errors.secondary_city} className="text-danger font-size-3">
              {errors.secondary_city}
            </span>
          )}
        </div>
        <div className="form-group col-md-6">
          <label
            htmlFor="secondary_designation"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Your Designation: <span className="text-danger"> *</span>
          </label>
          <div className="position-relative">
            <input
              maxLength={60}
              name="secondary_designation"
              value={state.secondary_designation || ""}
              onChange={onInputChange}
              type="text"
              className={
                errors.secondary_designation
                  ? "form-control border border-danger"
                  : "form-control"
              }
              placeholder="Designation"
              id="secondary_designation"
            />
            {/*----ERROR MESSAGE FOR DESIGNTION----*/}
            {errors.secondary_designation && (
              <span
                key={errors.secondary_designation}
                className="text-danger font-size-3"
              >
                {errors.secondary_designation}
              </span>
            )}
          </div>
        </div>
      </div>    </>
  );
}

export default ContactInfo;
