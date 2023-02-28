import React from "react";
import { Modal } from "react-bootstrap";

function Skills(props) {
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
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
          data-dismiss="modal"
          onClick={props.close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form>
            <h5 className="text-center pt-2 pb-5">Add It Skills </h5>{" "}
            <div className="form-group ">
              <label
                htmlFor="Skill_Name"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Skill / Software Name <span className="text-danger">*</span> :
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Skill / Software Name"
                id="Skill_Name"
              />
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

export default Skills;
