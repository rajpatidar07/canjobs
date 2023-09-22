import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  GetEmployeeSetting,
  GetEmployerSetting,
  AddEmployeePermission,
  AddEmployerPermission,
} from "../../api/api";
import ChangePassword from "./changepassword";
import { toast } from "react-toastify";
function Setting(props) {
  const [apiCall, setApiCall] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [email, setEmail] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
  });
  const [notification, setNotiication] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
  });
  let userType = localStorage.getItem("userType");
  /*Function to get the permision data */
  const GetPermissionData = async () => {
    try {
      let Response;
      if (userType === "user") {
        Response = await GetEmployeeSetting();
      } else {
        Response = await GetEmployerSetting();
      }
      const email_permissions = JSON.parse(Response.data.email_permission);
      const notification_permission = JSON.parse(
        Response.data.notification_permission
      );
      setEmail(email_permissions);
      setNotiication(notification_permission);
    } catch (err) {
      console.log(err);
    }
  };
  /*Render method */
  useEffect(() => {
    GetPermissionData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall]);

  /*Function to grant the permission */
  const togglePermission = async (permissionName) => {
    //condition to switch the button accordingly
    const updatedPermissions = {
      notification_permission: {
        lmia:
          permissionName === "notification_lmia"
            ? notification.lmia === 0
              ? 1
              : 0
            : notification.lmia,
        visa:
          permissionName === "notification_visa"
            ? notification.visa === 0
              ? 1
              : 0
            : notification.visa,
        interview:
          permissionName === "notification_interview"
            ? notification.interview === 0
              ? 1
              : 0
            : notification.interview,
        job:
          permissionName === "notification_job"
            ? notification.job === 0
              ? 1
              : 0
            : notification.job,
      },
      email_permission: {
        lmia:
          permissionName === "lmia" ? (email.lmia === 0 ? 1 : 0) : email.lmia,
        visa:
          permissionName === "visa" ? (email.visa === 0 ? 1 : 0) : email.visa,
        interview:
          permissionName === "interview"
            ? email.interview === 0
              ? 1
              : 0
            : email.interview,
        job: permissionName === "job" ? (email.job === 0 ? 1 : 0) : email.job,
      },
    };

    try {
      let Response;
      if (userType === "user") {
        Response = await AddEmployeePermission(updatedPermissions);
      } else {
        Response = await AddEmployerPermission(updatedPermissions);
      }
      console.log(Response);
      // conditions for the reponse toaster message
      if (
        Response.message === "successfully" &&
        (permissionName === "notification_lmia" || permissionName === "lmia"
          ? (updatedPermissions.notification_permission.lmia ||
              updatedPermissions.email_permission.lmia) === 1
          : permissionName === "notification_visa" || permissionName === "visa"
          ? (updatedPermissions.notification_permission.visa ||
              updatedPermissions.email_permission.visa) === 1
          : permissionName === "notification_interview" ||
            permissionName === "interview"
          ? (updatedPermissions.notification_permission.interview ||
              updatedPermissions.email_permission.interview) === 1
          : (updatedPermissions.notification_permission.job ||
              updatedPermissions.email_permission.job) === 1)
      ) {
        toast.success("Permission granted successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
      if (
        Response.message === "successfully" &&
        (permissionName === "notification_lmia" || permissionName === "lmia"
          ? (updatedPermissions.notification_permission.lmia ||
              updatedPermissions.email_permission.lmia) === 0
          : permissionName === "notification_visa" || permissionName === "visa"
          ? (updatedPermissions.notification_permission.visa ||
              updatedPermissions.email_permission.visa) === 0
          : permissionName === "notification_interview" ||
            permissionName === "interview"
          ? (updatedPermissions.notification_permission.interview ||
              updatedPermissions.email_permission.interview) === 0
          : (updatedPermissions.notification_permission.job ||
              updatedPermissions.email_permission.job) === 0)
      ) {
        toast.error("Permission Denay successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <div className="bg-white rounded h-100 px-11 pt-10">
          <h3 className="text-center">Settings</h3>
          <div>
            <h6 className="text-start mt-4 text-grey">
              {userType === "user" ? "Employee's" : "Employer's"} Email
              Preferences
            </h6>
            <ul className="list-unstyled row">
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                    checked={email.lmia === 0 ? false : true}
                    onChange={() => togglePermission("lmia")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch1"
                  >
                    Lmia
                  </label>
                </div>
              </li>
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch2"
                    checked={email.visa === 0 ? false : true}
                    onChange={() => togglePermission("visa")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch2"
                  >
                    Visa
                  </label>
                </div>
              </li>
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch3"
                    checked={email.interview === 0 ? false : true}
                    onChange={() => togglePermission("interview")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch3"
                  >
                    Interview
                  </label>
                </div>
              </li>
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch4"
                    checked={email.job === 0 ? false : true}
                    onChange={() => togglePermission("job")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch4"
                  >
                    Job
                  </label>
                </div>
              </li>
            </ul>
            <h6 className="text-start mt-4 text-grey">
              {userType === "user" ? "Employee's" : "Employer's"} Notification
              Preferences
            </h6>
            <ul className="list-unstyled row">
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch6"
                    checked={notification.lmia === 0 ? false : true}
                    onChange={() => togglePermission("notification_lmia")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch6"
                  >
                    Lmia
                  </label>
                </div>
              </li>
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch7"
                    checked={notification.visa === 0 ? false : true}
                    onChange={() => togglePermission("notification_visa")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch7"
                  >
                    Visa
                  </label>
                </div>
              </li>
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch8"
                    checked={notification.interview === 0 ? false : true}
                    onChange={() => togglePermission("notification_interview")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch8"
                  >
                    Interview
                  </label>
                </div>
              </li>
              <li className="mb-3 col-6">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch9"
                    checked={notification.job === 0 ? false : true}
                    onChange={() => togglePermission("notification_job")}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch9"
                  >
                    Job
                  </label>
                </div>
              </li>
            </ul>
            <div className="mb-3">
              <Link
                to=""
                onClick={() => setShowChangePass(true)}
                className="btn btn-primary  d-flex align-items-center"
              >
                <RiLockPasswordFill className="mr-2" /> Change Password
              </Link>
              {showChangePass && (
                <ChangePassword
                  show={showChangePass}
                  close={() => setShowChangePass(false)}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Setting;
