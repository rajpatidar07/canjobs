import React from "react";
import { Modal } from "react-bootstrap";

function KycComplianceDetails(props) {
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
            <h5 className="text-center pt-2">KYC Compliance Details</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="KYC_Status"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  KYC Status :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="KYC Status"
                  id="KYC_Status"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="PAN_Number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  PAN Number :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="PAN_Number"
                  id="PAN Number"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Name_on_PAN_Card"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Name on PAN Card :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name on PAN Card"
                  id="Name_on_PAN_Card"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Date_on_PAN_Card"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Date on PAN Card :
                </label>
                <div className="position-relative">
                  <input
                    type="date"
                    className="form-control"
                    id="Date on PAN Card"
                    placeholder="Date_on_PAN_Card"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Address_Label"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Address Label :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address Label"
                  id="Address_Label"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Address"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Address<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  id="Address"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="State"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  State<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  id="State"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="City"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  City<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  id="City"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Pincode"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Pincode<span className="text-danger"> *</span> :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Pincode"
                  id="Pincode"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="GSTIN"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  GSTIN:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="GSTIN"
                  id="GSTIN"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Fax_Number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Fax Number :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Fax Number"
                  id="Fax_Number"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="TAN_Number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  TAN Number :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="TAN Number"
                  id="TAN_Number"
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

export default KycComplianceDetails;
