import moment from "moment";
import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";

function KycComplianceDetails(props) {
  // COMPANY KYC DETAIL VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    panname: "",
    pincode: "",
    panno: "",
    pandate: "",
    address: "",
    city: "",
    state: "",
    country: "",
    gstin: "",
    tanno: "",
    docupload: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    panname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Pan name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    pincode: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Pincode is required"
          : value.length > 6 || value.length < 6
          ? "Pincode should be of 10 digits"
          : null,
    ],
    panno: [
      (value) =>
        value === ""
          ? "Pan no is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    pandate: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Pan card date is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    address: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Address is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    city: [
      (value) =>
        value === ""
          ? "City is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    state: [
      (value) =>
        value === "" || value.trim() === ""
          ? "State is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    gstin: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Gstin is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    tanno: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Tan no is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    country: [
      (value) =>
        value === "" || value.trim() === "" ? "Country is required" : null,
    ],
    docupload: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Document Upload is required"
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // COMPANY KYC DETAIL SUBMIT BUTTON
  const onKycInfoClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END COMPANY KYC DETAIL VALIDATION
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
          <form onSubmit={onKycInfoClick}>
            <h5 className="text-center pt-2 mb-7">KYC Compliance Details</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="panno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  PAN Number :<span className="text-danger"> *</span> :
                </label>
                <input
                  type="number"
                  placeholder="PAN_Number"
                  id="panno"
                  name="panno"
                  value={state.panno}
                  onChange={onInputChange}
                  className={
                    errors.panno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR panno----*/}
                {errors.panno && (
                  <span key={errors.panno} className="text-danger font-size-3">
                    {errors.panno}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="panname"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Name on PAN Card :<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="Name on PAN Card"
                  id="panname"
                  name="panname"
                  value={state.panname}
                  onChange={onInputChange}
                  className={
                    errors.panname
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR panname----*/}
                {errors.panname && (
                  <span
                    key={errors.panname}
                    className="text-danger font-size-3"
                  >
                    {errors.panname}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="pandate"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Date on PAN Card :<span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="date"
                    placeholder="Date_on_PAN_Card"
                    id="pandate"
                    name="pandate"
                    max={moment().format("YYYY-MM-DD")}
                    value={state.pandate}
                    onChange={onInputChange}
                    className={
                      errors.pandate
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                  />
                  {/*----ERROR MESSAGE FOR pandate----*/}
                  {errors.pandate && (
                    <span
                      key={errors.pandate}
                      className="text-danger font-size-3"
                    >
                      {errors.pandate}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="address"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Address<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  id="address"
                  name="address"
                  value={state.address}
                  onChange={onInputChange}
                  className={
                    errors.address
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR address----*/}
                {errors.address && (
                  <span
                    key={errors.address}
                    className="text-danger font-size-3"
                  >
                    {errors.address}
                  </span>
                )}
              </div>
            </div>

            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="pincode"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Pincode<span className="text-danger"> *</span> :
                </label>
                <input
                  type="number"
                  placeholder="Pincode"
                  id="pincode"
                  name="pincode"
                  value={state.pincode}
                  onChange={onInputChange}
                  className={
                    errors.pincode
                      ? "form-control border border-danger"
                      : "form-control"
                  }
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
              </div>
            </div>
            <div className="row">
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
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="gstin"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  GSTIN:
                </label>
                <input
                  type="number"
                  placeholder="GSTIN"
                  id="gstin"
                  name="gstin"
                  value={state.gstin}
                  onChange={onInputChange}
                  className={
                    errors.gstin
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR gstin----*/}
                {errors.gstin && (
                  <span key={errors.gstin} className="text-danger font-size-3">
                    {errors.gstin}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="faxno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Fax Number :
                </label>
                <input
                  type="number"
                  placeholder="Fax Number"
                  id="faxno"
                  name="faxno"
                  value={state.faxno}
                  onChange={onInputChange}
                  className={
                    errors.faxno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR faxno----*/}
                {errors.faxno && (
                  <span key={errors.faxno} className="text-danger font-size-3">
                    {errors.faxno}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="tanno"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  TAN Number :
                </label>
                <input
                  type="number"
                  placeholder="TAN Number"
                  id="tanno"
                  name="tanno"
                  value={state.tanno}
                  onChange={onInputChange}
                  className={
                    errors.tanno
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR tanno----*/}
                {errors.tanno && (
                  <span key={errors.tanno} className="text-danger font-size-3">
                    {errors.tanno}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="docupload"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Document Upload :
                </label>
                <input
                  type="file"
                  id="docupload"
                  name="docupload"
                  value={state.docupload}
                  onChange={onInputChange}
                  className={
                    errors.docupload
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR docupload----*/}
                {errors.docupload && (
                  <span
                    key={errors.docupload}
                    className="text-danger font-size-3"
                  >
                    {errors.docupload}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group mb-8">
              <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
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

export default KycComplianceDetails;
