import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
function ContactInfo(props) {
  // COMPANY PERSONAL INFO VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    contactname: "",
    email: "",
    contactno: "",
    location: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    designation: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    contactname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Comapny name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    email: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Email is required"
          : /\S+@\S+\.\S+/.test(value)
          ? null
          : "Email is invalid",
    ],
    contactno: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Phone no is required"
          : value.length !== 10
          ? "Phone no should be of 10 digits"
          : null,
    ],
    location: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Address is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    pincode: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Pincode is required"
          : value.length > 10 || value.length < 10
          ? "Mobile no should be of 10 digits"
          : null,
    ],
    city: [
      (value) =>
        value === ""
          ? "City Name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    state: [
      (value) =>
        value === ""
          ? "State Name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    country: [
      (value) =>
        value === ""
          ? "Country Name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    designation: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Designation is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // COMPANY PERSONAL INFO SUBMIT BUTTON
  const onCompanyPersonalInfoClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END COMPANY PERSONAL INFO VALIDATION
  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form onSubmit={onCompanyPersonalInfoClick}>
            <h5 className="text-center pt-2 mb-7">Contact Detail</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="contactname"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Contact Person Name :
                </label>
                <input
                  maxLength={20}
                  name="contactname"
                  value={state.contactname}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.contactname
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Contact person Name"
                  id="contactname"
                />
                {/*----ERROR MESSAGE FOR contactname----*/}
                {errors.contactname && (
                  <span
                    key={errors.contactname}
                    className="text-danger font-size-3"
                  >
                    {errors.contactname}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="email"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Email :
                </label>
                <input
                  maxLength={30}
                  name="email"
                  value={state.email}
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
                {/*----ERROR MESSAGE FOR email----*/}
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
                  htmlFor="contactno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Contact No :
                </label>
                <input
                  maxLength={30}
                  name="contactno"
                  value={state.contactno}
                  onChange={onInputChange}
                  type="number"
                  className={
                    errors.contactno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Contact No"
                  id="contactno"
                />
                {/*----ERROR MESSAGE FOR contactno----*/}
                {errors.contactno && (
                  <span
                    key={errors.contactno}
                    className="text-danger font-size-3"
                  >
                    {errors.contactno}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="othercontactno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Other Contact No :
                </label>
                <input
                  maxLength={30}
                  name="othercontactno"
                  value={state.othercontactno}
                  onChange={onInputChange}
                  type="number"
                  className={"form-control"}
                  placeholder="Other Contact No"
                  id="othercontactno"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Address :
                </label>
                <input
                  maxLength={60}
                  type="text"
                  name="location"
                  value={state.location}
                  onChange={onInputChange}
                  className={
                    errors.location
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Address"
                  id="location"
                />
                {/*----ERROR MESSAGE FOR location----*/}
                {errors.location && (
                  <span
                    key={errors.location}
                    className="text-danger font-size-3"
                  >
                    {errors.location}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="pincode"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Pin code :
                </label>
                <input
                  name="pincode"
                  value={state.pincode}
                  onChange={onInputChange}
                  type="number"
                  className={
                    errors.pincode
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="Pincode"
                  id="pincode"
                />
                {/*----ERROR MESSAGE FOR pincode----*/}
                {errors.pincode && (
                  <span
                    key={errors.pincode}
                    className="text-danger font-size-3"
                  >
                    {errors.pincode}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="city"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  City<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="City"
                  id="city"
                  name="city"
                  value={state.city}
                  onChange={onInputChange}
                  className={
                    errors.city
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR city----*/}
                {errors.city && (
                  <span key={errors.city} className="text-danger font-size-3">
                    {errors.city}
                  </span>
                )}
              </div>{" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="state"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  State<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="State"
                  id="state"
                  name="state"
                  value={state.state}
                  onChange={onInputChange}
                  className={
                    errors.state
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR state----*/}
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
                  htmlFor="country"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Country<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="State"
                  id="country"
                  name="country"
                  value={state.country}
                  onChange={onInputChange}
                  className={
                    errors.country
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR country----*/}
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
                  htmlFor="designation"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Your designation :
                </label>
                <div className="position-relative">
                  <input
                    maxLength={30}
                    name="designation"
                    value={state.designation}
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
                  {/*----ERROR MESSAGE FOR designation----*/}
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
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}

export default ContactInfo;
