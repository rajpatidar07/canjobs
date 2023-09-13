import React,{useState} from "react";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import ChangePassword from "./changepassword";
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
          <li>
            <Form>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Email notification"
              />
            </Form>
          </li>
          <li>
            <Link ></Link>Change Password
          <ChangePassword
                    show={showChangePass}
                    close={() => setShowChangePass(false)}
                  />
          </li>
        </ul>
      </div>
    </Modal>
  );
}
