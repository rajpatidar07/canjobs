import React from "react";
import { Modal } from "react-bootstrap";

function AccountDetails(props) {
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
          <form>
            <h5 className="text-center pt-2">Account detail</h5>
            <div className="form-group">
              <label
                htmlFor="Username"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Name :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Username Name"
                id="Username"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="acc_number"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Account Number :
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Account Number"
                id="acc_number"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="ifsc_code"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                IFSC_code :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="IFSC code "
                id="ifsc_code"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="bank_name"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Bank Name :
              </label>
              <select className="form-control">
                <option value={""}>Select bank</option>
                <option value={""}>PNB</option>
                <option value={""}>Cenera</option>
                <option value={""}>BOI</option>
                <option value={""}>SBI</option>
              </select>
            </div>
            <div className="form-group">
              <label
                htmlFor="branch_name"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Branch Name :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=" Branch Name"
                id="branch_name"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="City"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                City :
              </label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  id="City"
                  placeholder="Enter City "
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

export default AccountDetails;
