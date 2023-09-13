import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChangePassword from "./changepassword";
import { RiLockPasswordFill } from "react-icons/ri"

export default function Setting(props) {
  const [showChangePass, setShowChangePass] = useState(false);

  return (
    <Modal
      show={props.show}
      size="sm"
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
      <div className="bg-white rounded h-100 px-11 pt-5">
        <h5 className="text-center">Settings</h5>
        <ul className="list-unstyled">
          <li className="px-2 py-3 font-size-4 font-weight-light flex-y-center">
            <div className="custom-control custom-switch">
              <label className="custom-control-label" for="customSwitch1">Email notification</label>
              <input type="checkbox" className="custom-control-input" id="customSwitch1" />
            </div>  
          </li>
          <li className="px-2 py-3 font-size-4 font-weight-light flex-y-center">
            <Link to=""
              onClick={() => {
                setShowChangePass(true)
                props.close()
              }} className="text-gray">
              <RiLockPasswordFill /> Change Password</Link>
            {showChangePass && <ChangePassword
              show={showChangePass}
              close={() => setShowChangePass(false)}
            />}
          </li>
        </ul>
      </div>
    </Modal>
  );
}
