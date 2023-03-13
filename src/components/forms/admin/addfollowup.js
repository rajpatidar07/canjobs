import React from "react";
import useValidation from "../../common/useValidation";
import { Modal } from "react-bootstrap";
function Addfollowup(props) {
  // USER FOLLOW UP PROFILE UPDATE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    dis: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    dis: [
      (value) =>
        value === "" || value.trim() === "" ? "Discription required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  // USER FOLLOW UP PROFILE UPDATE SUBMIT BUTTON
  const onAminFollowClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END USER FOLLOW UP PROFILE UPDATE VALIDATION
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
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <h5 className="text-center pt-2">Add Follow Up</h5>
          <form onSubmit={onAminFollowClick} className="pt-5">
            <div className="col mb-5 pb-5">
              <div className="card w-100 mb-1">
                <div className="card-body">
                  <h6 className="">
                    02-03-2023
                    <small className="float-right text-danger">10:15 Am</small>
                  </h6>
                  <p className="card-text">Talked with the react intern</p>
                </div>
              </div>
              <div className="card w-100 mb-1">
                <div className="card-body">
                  <h6 className="">
                    02-03-2023
                    <small className="float-right text-danger">10:15 Am</small>
                  </h6>
                  <p className="card-text">Talked with the react intern</p>
                </div>
              </div>
              <div className="card w-100 mb-1">
                <div className="card-body">
                  <h6 className="">
                    02-03-2023
                    <small className="float-right text-danger">10:15 Am</small>
                  </h6>
                  <p className="card-text">Talked with the react intern</p>
                </div>
              </div>
              <div className="card w-100 mb-1">
                <div className="card-body">
                  <h6 className="">
                    02-03-2023
                    <small className="float-right text-danger">10:15 Am</small>
                  </h6>
                  <p className="card-text">Talked with the react intern</p>
                </div>
              </div>
            </div>
            <div className="form-group col w-100">
              <label
                htmlFor="dis"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Description : <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  type={"text"}
                  className={
                    errors.dis
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  value={state.dis}
                  onChange={onInputChange}
                  id="dis"
                  name="dis"
                  placeholder="Discription"
                />
                {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                {errors.dis && (
                  <span key={errors.dis} className="text-danger font-size-3">
                    {errors.dis}
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
        </div>
      </Modal>
    </>
  );
}

export default Addfollowup;
