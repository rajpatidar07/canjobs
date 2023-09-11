import React from "react";
import { Modal } from "react-bootstrap";
import AdminTable from "../../common/adminTable";

export default function ManagerListModal(props) {
  return (
    <Modal
      show={props.show}
      size="lg"
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
        <h5 className="text-center mt-5">Manager List</h5>

        <div>
          <AdminTable
            data={props.data}
            isLoading={props.isLoading}
            handleSort={props.handleSort}
            nPages={props.nPages}
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage}
            totalData={props.totalData}
            page={"manager list"}
          />
        </div>
      </div>
    </Modal>
  );
}
