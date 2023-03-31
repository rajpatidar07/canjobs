import React, { useState, useEffect } from "react";
import { CKEditor } from "ckeditor4-react";
import useValidation from "../../common/useValidation";
import { Modal } from "react-bootstrap";
import { getSingleFollowup } from "../../../api/api";
import moment from "moment";
function Addfollowup(props) {
  let [response, setResponseData] = useState([]);

  // USER FOLLOW UP PROFILE UPDATE VALIDATION

  /* Function to get the Response data*/
  const ResponseData = async () => {
    const userData = await getSingleFollowup();
    setResponseData(userData.data);
    console.log(response);
  };

  /*Render function to get the Response*/
  useEffect(() => {
    ResponseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

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
            <div className=" col px-0 pr-3 pb-5 mb-5">
              {(response || []).map((res) => (
                <div className="d-flex justify-content-between" key={res.id}>
                  {moment(res.created_at).format("YYYY-MM-DD")}
                  <ul>
                    <li>{res.remark}</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="dis"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Description : <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <div
                  sm="6"
                  className={
                    errors.dis
                      ? "border border-danger rounded overflow-hidden"
                      : "border rounded overflow-hidden"
                  }
                >
                  <CKEditor
                    type={"classic"}
                    name={"dis"}
                    id={"dis"}
                    data={state.dis}
                    value={"state.dis"}
                    onChange={onInputChange}
                    initData="Add Discription"
                  />
                </div>
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
