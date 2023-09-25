import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ChangePassword from "./changepassword";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  GetEmployeeSetting,
  GetEmployerSetting,
  AddEmployeePermission,
  AddEmployerPermission,
} from "../../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export default function Setting(props) {
  const [showChangePass, setShowChangePass] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [lmia, setLmia] = useState(0);
  const [visa, setVisa] = useState(0);
  const [interview, setInterview] = useState(0);
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
      const permissions = JSON.parse(Response.data.email_permission);
      setLmia(permissions.lmia);
      setVisa(permissions.visa);
      setInterview(permissions.interview);
    } catch (err) {
      console.log(err);
    }
  };

  /*Render method */
  useEffect(() => {
    GetPermissionData();
    if (apiCall) {
      setApiCall(false);
    }
  }, [apiCall]);

  /*Function to grant the permission */
  const togglePermission = async (permissionName) => {
    //condition to switch the button accordingly
    const updatedPermissions = {
      lmia: permissionName === "lmia" ? (lmia === 0 ? 1 : 0) : lmia,
      visa: permissionName === "visa" ? (visa === 0 ? 1 : 0) : visa,
      interview:
        permissionName === "interview" ? (interview === 0 ? 1 : 0) : interview,
    };

    try {
      let Response;
      if (userType === "user") {
        Response = await AddEmployeePermission(updatedPermissions);
      } else {
        Response = await AddEmployerPermission(updatedPermissions);
      }
      // conditions for the reponse toaster message
      if (
        Response.message === "successfully" &&
        (permissionName === "lmia"
          ? updatedPermissions.lmia === 1
          : permissionName === "visa"
          ? updatedPermissions.visa === 1
          : updatedPermissions.interview === 1)
      ) {
        toast.success("Permission granted successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
      if (
        Response.message === "successfully" &&
        (permissionName === "lmia"
          ? updatedPermissions.lmia === 0
          : permissionName === "visa"
          ? updatedPermissions.visa === 0
          : updatedPermissions.interview === 0)
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
    <Modal show={props.show} size="md" centered>
      <Button
        variant="light"
        className="bg-white circle-32 btn-reset pos-abs-tr mt-md-n6 mr-lg-n6 z-index-supper"
        onClick={props.close}
      >
        <i className="fas fa-times"></i>
      </Button>
      <div className="bg-white rounded p-5">
        <h4 className="text-center mb-4">Settings</h4>
        <h6 className="text-start mt-4 text-grey">Email Preferences</h6>
        <ul className="list-unstyled">
          <li className="mb-3">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
                checked={lmia === 0 ? false : true}
                onChange={() => togglePermission("lmia")}
              />
              <label className="custom-control-label" htmlFor="customSwitch1">
                Lmia notification
              </label>
            </div>
          </li>
          <li className="mb-3">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch2"
                checked={visa === 0 ? false : true}
                onChange={() => togglePermission("visa")}
              />
              <label className="custom-control-label" htmlFor="customSwitch2">
                Visa notification
              </label>
            </div>
          </li>
          <li className="mb-3">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch3"
                checked={interview === 0 ? false : true}
                onChange={() => togglePermission("interview")}
              />
              <label className="custom-control-label" htmlFor="customSwitch3">
                Interview notification
              </label>
            </div>
          </li>
          <li>
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
          </li>
        </ul>
      </div>
    </Modal>
  );
}