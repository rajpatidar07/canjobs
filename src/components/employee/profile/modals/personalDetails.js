import React from "react";
import { Modal } from "react-bootstrap";

function PersonalDetails(props) {
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
          <form>
            <h5 className="text-center pt-2">Personal Details</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Gender"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Gender
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Gender"
                  id="Gender"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Marital_Status"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Marital Status :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Marital Status "
                  id="Marital_Status"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Date_of_Birth"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Date of Birth :
                </label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date of Birth"
                  id="Date_of_Birth"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Disabled"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Are you Differently Abled ?
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Are you Differently Abled?"
                  id="Disabled"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Break"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Have you taken a Career Break?
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Break"
                    placeholder="Have you taken a Career Break?"
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Work_Permit_for_USA"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Work Permit for USA :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Work Permit for USA"
                  id="Work_Permit_for_USA"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Work_Permit_for_Other_Countries"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Work Permit for Other Countries :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Work Permit for Other Countries"
                  id="Work_Permit_for_Other_Countries"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Hometown"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Hometown :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Hometown"
                  id="Hometown"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Pincode"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Pincode :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Pincode"
                  id="Pincode"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Languages"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Languages :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Languages"
                  id="Languages"
                />
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

export default PersonalDetails;
