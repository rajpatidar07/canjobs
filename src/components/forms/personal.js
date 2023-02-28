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
            <div className="row pt-5">
              {" "}
              <div className="form-group col-md-4">
                <label
                  htmlFor="Full_Name"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  id="Full_Name"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="email"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Email Id :
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  id="email"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="Mobile_Number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Mobile Number :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Mobile Number"
                  id="Mobile_Number"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-4">
                <label
                  htmlFor="DOB"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Date Of Birth :
                </label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date Of Birth "
                  id="DOB"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="Gender"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Gender :
                </label>
                <select className="form-control">
                  <option value={""}>Select Gender</option>
                  <option value={""}>Male</option>
                  <option value={""}>Female</option>
                  <option value={""}>Other</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="maritial_status"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Maritial status :
                </label>{" "}
                <select className="form-control">
                  <option value={""}>Select Status</option>
                  <option value={""}>Single</option>
                  <option value={""}>Merried</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="Nationality"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Nationality / Citizenship :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nationality / Citizenship"
                  id="Nationality"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="Current_location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Current Location :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Maritial status"
                  id="Current_location"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="Currently_Located_Country"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Currently Located Country :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Currently Located Country"
                  id="Currently_Located_Country"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4">
                <label
                  htmlFor="langauages"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Languages Known (Max 3) :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Languages Known (Max 3)"
                  id="langauages"
                />
              </div>
              <div className="form-group col-md-4">
                <label
                  htmlFor="Religion"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Religion :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Religion"
                  id="Religion"
                />
              </div>
            </div>
            <div className="form-group text-center">
              <button className="btn btn-primary btn-small w-25 rounded-5 text-uppercase">
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
