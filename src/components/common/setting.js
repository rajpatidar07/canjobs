import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ChangePassword from "./changepassword";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  GetEmployeeSetting,
  GetEmployerSetting,
  AddEmployeePermission,
  AddEmployerPermission,
} from "../../api/api";
import { toast } from "react-toastify";

export default function Setting(props) {
  const [showChangePass, setShowChangePass] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [lmia, setLmia] = useState(0);
  const [visa, setVisa] = useState(0);
  const [interview, setInterview] = useState(0);
  let userType = localStorage.getItem("userType");

  const GetPermissionData = async () => {
    try {
      let Response;
      if (userType === "user") {
        Response = await GetEmployeeSetting();
      } else {
        Response = await GetEmployerSetting();
      }
      setLmia(JSON.parse(Response.data.email_permission).lmia);
      setVisa(JSON.parse(Response.data.email_permission).visa);
      setInterview(JSON.parse(Response.data.email_permission).interview);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetPermissionData();
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [apiCall]);

  let Data = {
    lmia: lmia,
    visa: visa,
    interview: interview,
  };

  const AllowPermission = async () => {
    try {
      let Response;
      if (userType === "user") {
        Response = await AddEmployeePermission(Data);
      } else {
        Response = await AddEmployerPermission(Data);
      }
      if (Response.message === "successfully") {
        toast.success("Permission granted successfully", {
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
          <li className="px-2 py-3 font-size-3 font-weight-light ">
            <div className="custom-control custom-switch">
              <label
                className="custom-control-label"
                htmlFor="customSwitch1"
                onClick={() => {
                  AllowPermission();
                  setLmia((prevLmia) => (prevLmia === 0 ? 1 : 0));
                }}
              >
                Lmia notification {lmia}
              </label>
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
                checked={lmia === 1||lmia === '1'}
                onChange={() => {}}
              />
            </div>
          </li>
          <li className="px-2 py-3 font-size-3 font-weight-light ">
            <div className="custom-control custom-switch">
              <label
                className="custom-control-label"
                htmlFor="customSwitch2"
                onClick={() => {
                  AllowPermission();
                  setVisa((prevVisa) => (prevVisa === 0 ? 1 : 0));
                }}
              >
                Visa notification {visa}
              </label>
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch2"
                checked={visa === 1||visa === '1'}
                onChange={() => {}}
              />
            </div>
          </li>
          <li className="px-2 py-3 font-size-3 font-weight-light ">
            <div className="custom-control custom-switch">
              <label
                className="custom-control-label"
                htmlFor="customSwitch3"
                onClick={() => {
                  AllowPermission();
                  setInterview((prevInterview) =>
                    prevInterview === 0 ? 1 : 0
                  );
                }}
              >
                Interview notification {interview}
              </label>
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch3"
                checked={interview === 1||interview === '1'}
                onChange={() => {}}
              />
            </div>
          </li>
          <li className="px-2 py-3 font-size-4 font-weight-light flex-y-center">
            <Link
              to=""
              onClick={() => {
                setShowChangePass(true);
              }}
              className="text-gray"
            >
              <RiLockPasswordFill /> Change Password
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
