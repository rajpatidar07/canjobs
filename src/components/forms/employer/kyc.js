import moment from "moment";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { EmployerDetails, AddKyc } from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KycComplianceDetails(props) {
  let close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
  };
  // COMPANY KYC DETAIL VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    name: "",
    pincode: "",
    pan_no: "",
    pan_date: "",
    address: "",
    city: "",
    state: "",
    country: "",
    gstin: "",
    tan_number: "",
    document: "",
    fax_number: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    name: [
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
          ? "Pincode should be of 6 digits"
          : null,
    ],
    pan_no: [
      (value) =>
        value === ""
          ? "Pan no is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    pan_date: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Pan card date is required"
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
        value === "" || value.trim() === "" ? "Gstin is required" : null,
    ],
    tan_number: [
      (value) =>
        value === "" || value.trim() === "" ? "Tan no is required" : null,
    ],
    country: [
      (value) =>
        value === "" || value.trim() === "" ? "Country is required" : null,
    ],
    // document: [
    //   (value) =>
    //     value === "" || value.trim() === ""
    //       ? "Document Upload is required"
    //       : null,
    // ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setErrors, setState, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);
  // API CALL
  const EmployerData = async () => {
    let userData = await EmployerDetails(props.employerId);
    if (
      userData.data.kyc_detail[0].pan_no !== undefined ||
      userData.data.kyc_detail !== "0"
    ) {
      setState(userData.data.kyc_detail[0]);
    }
  };
  useEffect(() => {
    props.employerId === undefined
      ? setState(initialFormState)
      : EmployerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  // COMPANY KYC DETAIL SUBMIT BUTTON
  const onKycInfoClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      let responseData = await AddKyc(state, props.employerId);
      if (responseData.message === "Employee data inserted successfully") {
        toast.success("Kyc Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
      if (responseData.message === "Employee data updated successfully") {
        toast.success("Kyc Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
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
          onClick={close}
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
                  htmlFor="pan_no"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  PAN Number :<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="PAN_Number"
                  id="pan_no"
                  name="pan_no"
                  value={state.pan_no}
                  onChange={onInputChange}
                  className={
                    errors.pan_no
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR pan_no----*/}
                {errors.pan_no && (
                  <span key={errors.pan_no} className="text-danger font-size-3">
                    {errors.pan_no}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Name on PAN Card :<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  placeholder="Name on PAN Card"
                  id="name"
                  name="name"
                  value={state.name}
                  onChange={onInputChange}
                  className={
                    errors.name
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR name----*/}
                {errors.name && (
                  <span key={errors.name} className="text-danger font-size-3">
                    {errors.name}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="pan_date"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Date on PAN Card :<span className="text-danger"> *</span> :
                </label>
                <div className="position-relative">
                  <input
                    type="date"
                    placeholder="Date_on_PAN_Card"
                    id="pan_date"
                    name="pan_date"
                    max={moment().format("YYYY-MM-DD")}
                    value={state.pan_date}
                    onChange={onInputChange}
                    className={
                      errors.pan_date
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                  />
                  {/*----ERROR MESSAGE FOR pan_date----*/}
                  {errors.pan_date && (
                    <span
                      key={errors.pan_date}
                      className="text-danger font-size-3"
                    >
                      {errors.pan_date}
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
                  htmlFor="fax_number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Fax Number :
                </label>
                <input
                  type="number"
                  placeholder="Fax Number"
                  id="fax_number"
                  name="fax_number"
                  value={state.fax_number}
                  onChange={onInputChange}
                  className={
                    errors.fax_number
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR fax_number----*/}
                {errors.fax_number && (
                  <span
                    key={errors.fax_number}
                    className="text-danger font-size-3"
                  >
                    {errors.fax_number}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="tan_number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  TAN Number :
                </label>
                <input
                  type="number"
                  placeholder="TAN Number"
                  id="tan_number"
                  name="tan_number"
                  value={state.tan_number}
                  onChange={onInputChange}
                  className={
                    errors.tan_number
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR tan_number----*/}
                {errors.tan_number && (
                  <span
                    key={errors.tan_number}
                    className="text-danger font-size-3"
                  >
                    {errors.tan_number}
                  </span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="document"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Document Upload :
                </label>
                <input
                  type="file"
                  id="document"
                  name="document"
                  // value={state.document}
                  // onChange={onInputChange}
                  className={
                    errors.document
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                />
                {/*----ERROR MESSAGE FOR document----*/}
                {errors.document && (
                  <span
                    key={errors.document}
                    className="text-danger font-size-3"
                  >
                    {errors.document}
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
