import React from "react";
import { Modal } from "react-bootstrap";

function ItSkills(props) {
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
        <div className="bg-white-2 h-100 px-11 pt-7">
          <form>
            <h5 className="text-center pt-2">Add It Skills </h5>{" "}
            <div className="form-group">
              <label
                htmlFor="Skill_Name"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Skill / Software Name :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Skill / Software Name"
                id="Skill_Name"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Software_Version"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Software Version :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Software_Version"
                id="Software Version"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Last_Used"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Last Used :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Used"
                id="Last_Used"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Experience"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Experience :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Experience"
                id="Experience"
              />
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

export default ItSkills;
