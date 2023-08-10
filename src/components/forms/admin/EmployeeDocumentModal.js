import React from 'react'
import { Modal } from 'react-bootstrap'
import DocumrentContainer from '../../common/employeeDocumrentContainer'
import LmiaTime from '../../common/lmiaTime'
import { useLocation } from 'react-router-dom'
export default function DocumentModal(props) {
  let location = useLocation()
  let user_type = localStorage.getItem("userType")
  return (
    <Modal show={props.show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
        data-dismiss="modal"
        onClick={props.close}>
        <i className="fas fa-times"></i>
      </button>
      <div className="bg-white rounded h-100 px-11 overflow-y-hidden">
        {user_type === "admin" && location.pathname === "/lmia" ?
          <LmiaTime lmia={props.lmia}
            job={props.job}
            location={location.pathname}
            doc="yes" />
          : null}
        <DocumrentContainer employee_id={props.employee_id} />
      </div>
    </Modal>)
}
