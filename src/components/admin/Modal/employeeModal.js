import React from "react";
import { Modal } from "react-bootstrap";
import Employee from "../employee";

export default function EmployeeModal(props) {
  return (
    <Modal
      show={props.show}
      size="xl"
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
      <div className="bg-white rounded h-100 px-11  overflow-y-hidden">
        <h5 className="text-center mt-5">Matching Candidates</h5>
        <Employee
          skill={"props.data.keyskill"}
          job_id={props.data.job_id}
          EmployeeCall={props.setApiCall}
        />
      </div>
    </Modal>
  );
}
