import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  GetAdminrSetting,
  AddAdminPermission,
  GeEmailAuthenticationData,
  GetSharePointData,
  RefreshPointData
} from "../../../api/api";
import { toast } from "react-toastify";
import ParentSetting from "../../common/parentSetting";
function AdminSetting(props) {
  const [apiCall, setApiCall] = useState(false);
  const [openAdminSettings, setopenAdminSettings] = useState(false);
  const [email, setEmail] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
    new_user_registered: 0,
  });
  const [notification, setNotiication] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
  });
  let [emailAauthenticationLink, setEmailAuthenticationLink] = useState("");
  let [sharePointData, setSharePointData] = useState("");
  /*Function to get the permision data */
  const GetPermissionData = async () => {
    try {
      let Response = await GetAdminrSetting();
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
  /*Function get email Authentication Data */
  async function GeEmailAuthData() {
    try {
      let response = await GeEmailAuthenticationData();
      if (response.status === 1 || "1") {
        setEmailAuthenticationLink(response);
      }
    } catch (err) {
      console.log(err);
    }
    try {
      let response = await GetSharePointData()
      if (response.status === 1 || "1") {
        setSharePointData(response);
      }
    } catch (err) {
      console.log(err);
    }
  }
  /*Render method */
  useEffect(() => {
    GeEmailAuthData();
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
            ? notification?.lmia === 0
              ? 1
              : 0
            : notification?.lmia,
        visa:
          permissionName === "notification_visa"
            ? notification?.visa === 0
              ? 1
              : 0
            : notification?.visa,
        interview:
          permissionName === "notification_interview"
            ? notification?.interview === 0
              ? 1
              : 0
            : notification?.interview,
        job:
          permissionName === "notification_job"
            ? notification?.job === 0
              ? 1
              : 0
            : notification?.job,
      },
      email_permission: {
        lmia:
          permissionName === "lmia" ? (email?.lmia === 0 ? 1 : 0) : email?.lmia,
        visa:
          permissionName === "visa" ? (email?.visa === 0 ? 1 : 0) : email?.visa,
        interview:
          permissionName === "interview"
            ? email?.interview === 0
              ? 1
              : 0
            : email?.interview,
        job: permissionName === "job" ? (email?.job === 0 ? 1 : 0) : email?.job,
        new_user_registered: permissionName === "new_user_registered" ? (email?.new_user_registered === 0 ? 1 : 0) : email?.new_user_registered,
      },
    };

    try {
      let Response = await AddAdminPermission(updatedPermissions);
      // conditions for the reponse toaster message
      if (
        Response.message === "successfully" &&
        (permissionName === "notification_lmia"
          ? updatedPermissions.notification_permission.lmia === 1
          : permissionName === "lmia"
            ? updatedPermissions.email_permission.lmia === 1
            : permissionName === "notification_visa"
              ? updatedPermissions.notification_permission.visa === 1
              : permissionName === "visa"
                ? updatedPermissions.email_permission.visa === 1
                : permissionName === "notification_interview"
                  ? updatedPermissions.notification_permission.interview === 1
                  : permissionName === "interview"
                    ? updatedPermissions.email_permission.interview === 1
                    : permissionName === "notification_job"
                      ? updatedPermissions.notification_permission.job === 1
                      : permissionName === "new_user_registered"
                        ? updatedPermissions.email_permission.new_user_registered === 1
                        : updatedPermissions.email_permission.job === 1)
      ) {
        toast.success("Permission granted successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApiCall(true);
      }
      if (
        Response.message === "successfully" &&
        (permissionName === "notification_lmia"
          ? updatedPermissions.notification_permission.lmia === 0
          : permissionName === "lmia"
            ? updatedPermissions.email_permission.lmia === 0
            : permissionName === "notification_visa"
              ? updatedPermissions.notification_permission.visa === 0
              : permissionName === "visa"
                ? updatedPermissions.email_permission.visa === 0
                : permissionName === "notification_interview"
                  ? updatedPermissions.notification_permission.interview === 0
                  : permissionName === "interview"
                    ? updatedPermissions.email_permission.interview === 0
                    : permissionName === "notification_job"
                      ? updatedPermissions.notification_permission.job === 0
                      : permissionName === "new_user_registered"
                        ? updatedPermissions.email_permission.new_user_registered === 0
                        : updatedPermissions.email_permission.job === 0)
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

            <div className="mb-3">
              <ParentSetting setopenAdminSettings={setopenAdminSettings} setApiCall={setApiCall} />
            </div>
            <div className={openAdminSettings ? "" : "d-none"}>
              <h6 className="text-start mt-4 text-grey">
                Admin's Email Preferences
              </h6>
              <ul className="list-unstyled row">
                <li className="mb-3 col-6">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch1"
                      checked={email?.lmia === 0 ? false : true}
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
                      checked={email?.visa === 0 ? false : true}
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
                      checked={email?.interview === 0 ? false : true}
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
                      checked={email?.job === 0 ? false : true}
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
                <li className="mb-3 col-6">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch10"
                      checked={email?.new_user_registered === 0 ? false : true}
                      onChange={() => togglePermission("new_user_registered")}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customSwitch10"
                    >
                      Applicant's Registration mail
                    </label>
                  </div>
                </li>
              </ul>
              <h6 className="text-start mt-4 text-grey">
                Admin's Notification Preferences
              </h6>
              <ul className="list-unstyled row">
                <li className="mb-3 col-6">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch6"
                      checked={notification?.lmia === 0 ? false : true}
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
                      checked={notification?.visa === 0 ? false : true}
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
                      checked={notification?.interview === 0 ? false : true}
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
                      checked={notification?.job === 0 ? false : true}
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
            </div>
            <div>
              <div className="mb-3">
                {
                  emailAauthenticationLink.is_already_authorized === "yes" ? (
                    <div>
                      <h4 style={{ color: "#5be15b" }}>
                        Mail already authorized !
                      </h4>
                    </div>
                  ) :
                    (
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          window.open(
                            emailAauthenticationLink.data,
                            "_blank",
                            "height=500,width=500%"
                          );
                          props.close();
                        }}
                      >
                        Authenticate Mail
                      </button>
                    )}
              </div>
              <div className="mb-3">

                {
                  sharePointData.is_already_authorized === "yes" ? (
                    <div>
                      <h4 style={{ color: "#5be15b" }}>
                        Share Point already authorized !
                      </h4>
                    </div>
                  ) :
                    (
                      <button
                        className="btn btn-secondary"
                        onClick={async () => {
                          try {
                            let res = await RefreshPointData()
                            if (res.messsage === "Success") {
                              toast.success("Authoized successfully", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 1000,
                              });
                              setApiCall(true)
                            }
                          } catch (err) {
                            console.log(err)
                          }
                        }}
                      >
                        Authenticate Share point
                      </button>
                    )}
              </div>
            </div>
            <Link
              to=""
              onClick={() => {
                props.setShowChangePass(true);
                props.close();
              }}
              className="btn btn-primary d-flex align-items-center mb-8"
            >
              <RiLockPasswordFill className="mr-2" /> Change Password
            </Link>
          </div>

        </div>
      </Modal>
    </>
  );
}

export default AdminSetting;
