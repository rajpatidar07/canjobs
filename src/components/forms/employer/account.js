import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";

function Account(props) {
  // COMPANY Account INFO VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    companyname: "",
    accounno: "",
    ifsccode: "",
    bankname: "",
    branchname: "",
    city: "",
    state: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    companyname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Comapny name is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],

    accounno: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Account no is required"
          : value.length > 20 || value.length < 20
          ? "Account no should be of 20 digits"
          : null,
    ],
    ifsccode: [
      (value) =>
        value === ""
          ? "Ifsc code is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    bankname: [
      (value) =>
        value === "" || value.trim() === "" ? "Bank name is required" : null,
    ],
    branchname: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Branch name  is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
    city: [
      (value) =>
        value === ""
          ? "City name is required"
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
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // COMPANY Account INFO SUBMIT BUTTON
  const onCompanyAccountInfoClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END COMPANY Account INFO VALIDATION
  return (
    <>
      <Modal
        show={props.show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <button
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <form onSubmit={onCompanyAccountInfoClick}>
            <h5 className="text-center pt-2">Account detail</h5>
            <div className="form-group">
              <label
                htmlFor="companyname"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Name :
              </label>
              <input
                maxLength={20}
                name="companyname"
                value={state.companyname}
                onChange={onInputChange}
                type="text"
                className={
                  errors.companyname
                    ? "form-control border border-danger"
                    : "form-control"
                }
                placeholder="Company Name"
                id="companyname"
              />
              {/*----ERROR MESSAGE FOR companyname----*/}
              {errors.companyname && (
                <span
                  key={errors.companyname}
                  className="text-danger font-size-3"
                >
                  {errors.companyname}
                </span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="accounno"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Account Number :
              </label>
              <input
                type="number"
                placeholder="Account Number"
                maxLength={20}
                name="accounno"
                value={state.accounno}
                onChange={onInputChange}
                className={
                  errors.accounno
                    ? "form-control border border-danger"
                    : "form-control"
                }
                id="accounno"
              />
              {/*----ERROR MESSAGE FOR accounno----*/}
              {errors.accounno && (
                <span key={errors.accounno} className="text-danger font-size-3">
                  {errors.accounno}
                </span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="ifsccode"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                IFSC_code :
              </label>
              <input
                type="text"
                placeholder="IFSC code "
                maxLength={20}
                name="ifsccode"
                value={state.ifsccode}
                onChange={onInputChange}
                className={
                  errors.ifsccode
                    ? "form-control border border-danger"
                    : "form-control"
                }
                id="ifsccode"
              />
              {/*----ERROR MESSAGE FOR ifsccode----*/}
              {errors.ifsccode && (
                <span key={errors.ifsccode} className="text-danger font-size-3">
                  {errors.ifsccode}
                </span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="bankname"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Bank Name :
              </label>
              <select
                name="bankname"
                value={state.bankname}
                onChange={onInputChange}
                className={
                  errors.bankname
                    ? "form-control border border-danger"
                    : "form-control"
                }
                id="bankname"
              >
                <option value={""}>Select bank</option>
                <option value={"pnb"}>PNB</option>
                <option value={"cenera"}>Cenera</option>
              </select>
              {/*----ERROR MESSAGE FOR bank name----*/}
              {errors.bankname && (
                <span key={errors.bankname} className="text-danger font-size-3">
                  {errors.bankname}
                </span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="branchname"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Branch Name :
              </label>
              <input
                type="text"
                placeholder=" Branch Name"
                name="branchname"
                value={state.branchname}
                onChange={onInputChange}
                className={
                  errors.branchname
                    ? "form-control border border-danger"
                    : "form-control"
                }
                id="branchname"
              />
              {/*----ERROR MESSAGE FOR branchname----*/}
              {errors.branchname && (
                <span
                  key={errors.branchname}
                  className="text-danger font-size-3"
                >
                  {errors.branchname}
                </span>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="city"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                City :
              </label>
              <div className="position-relative">
                <input
                  placeholder="Enter City "
                  type="text"
                  maxLength={20}
                  name="city"
                  value={state.city}
                  onChange={onInputChange}
                  className={
                    errors.city
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="city"
                />
                {/*----ERROR MESSAGE FOR city----*/}
                {errors.city && (
                  <span key={errors.city} className="text-danger font-size-3">
                    {errors.city}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="state"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                City :
              </label>
              <div className="position-relative">
                <input
                  placeholder="Enter City "
                  type="text"
                  maxLength={20}
                  name="state"
                  value={state.state}
                  onChange={onInputChange}
                  className={
                    errors.state
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  id="state"
                />
                {/*----ERROR MESSAGE FOR STATE----*/}
                {errors.state && (
                  <span key={errors.state} className="text-danger font-size-3">
                    {errors.state}
                  </span>
                )}
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

export default Account;
