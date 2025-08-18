/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  GetAdminrSetting,
  AddAdminPermission,
  GeEmailAuthenticationData,
  GetSharePointData,
  RefreshPointData,
} from "../../../api/api";
import { toast } from "react-toastify";
import ParentSetting from "../../common/parentSetting";
/*List of email types for the admin */
const emailKeys = [
  "lmia",
  "visa",
  "interview",
  "job",
  "new_user_registered",
  "interview_schedule_admin",
  "task_created_by_admin_doc",
  "notes",
  "task_created_by_admin_task",
  "reply_on_admin_doc",
  "forget_password",
  "add_job_company",
  "apply_on_job",
  "add_job_admin",
  "rcic_signed_agreement",
]
const notificationKeys = ["lmia", "visa", "interview", "job"];

function AdminSetting({ show, close, setShowChangePass }) {
  const [apiCall, setApiCall] = useState(false);
  const [openAdminSettings, setOpenAdminSettings] = useState(false);
  const [email, setEmail] = useState(Object.fromEntries(emailKeys?.map(k => [k, 0])));
  const [notification, setNotification] = useState(Object.fromEntries(notificationKeys?.map(k => [k, 0])));
  const [emailAuthLink, setEmailAuthLink] = useState({});
  const [sharePointData, setSharePointData] = useState({});

  /*"Function to retrieve admin permission data related to the admin settings of the logged-in */
  const GetPermissionData = async () => {
    try {
      const res = await GetAdminrSetting();
      const emailPerm = JSON.parse(res.data.email_permission);
      const notificationPerm = JSON.parse(res.data.notification_permission);
      setEmail(emailPerm && typeof emailPerm === 'object' ? emailPerm : Object.fromEntries(emailKeys.map(k => [k, 0])));
      setNotification(notificationPerm && typeof notificationPerm === 'object' ? notificationPerm : Object.fromEntries(notificationKeys.map(k => [k, 0])));
    } catch (err) {
      console.error(err);
    }
  };

  /*Function to get the auth data of the logged admin */
  const GeEmailAuthData = async () => {
    try {
      const res1 = await GeEmailAuthenticationData();
      if (res1?.status == 1) setEmailAuthLink(res1);

      const res2 = await GetSharePointData();
      if (res2?.status == 1) setSharePointData(res2);
    } catch (err) {
      console.error(err);
    }
  };

  /*Render function to get the permission and the auth data */
  useEffect(() => {
    GeEmailAuthData();
    GetPermissionData();
    if (apiCall) setApiCall(false);
  }, [apiCall]);

  /*Function to grant permission for the type of email and notifications of the admin */
  const togglePermission = async (key) => {
    const isNotif = key.startsWith("notification_");
    const name = isNotif ? key.replace("notification_", "") : key;

    const updatedPermissions = {
      notification_permission: { ...notification },
      email_permission: { ...email },
    };

    const current = isNotif ? notification[name] : email[name];
    (isNotif ? updatedPermissions.notification_permission : updatedPermissions.email_permission)[name] = current ? 0 : 1;

    try {
      const res = await AddAdminPermission(updatedPermissions);
      if (res.message === "successfully") {
        toast[current ? "error" : "success"](
          current ? "Permission Denied" : "Permission Granted",
          { position: "top-right", autoClose: 1000 }
        );
        setApiCall(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /*Dynamic rending the types of the email and notification of the admin */
  const renderSwitches = (keys, data, prefix = "") =>
    keys?.map((key, i) => (
      <li key={key} className="mb-3 col-6">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id={`switch_${prefix}${i}`}
            checked={!!(data && data[key])}
            onChange={() => togglePermission(`${prefix}${key}`)}
          />
          <label className="custom-control-label text-capitalize" htmlFor={`switch_${prefix}${i}`}>
            {
              key === "new_user_registered"
                ? "Applicant's Registration mail"
                : key === "interview_schedule_admin"
                  ? "Interview Scheduled"
                  : key === "task_created_by_admin_doc"
                    ? "Task Created on Document"
                    : key === "task_created_by_admin_task"
                      ? "Comments Mail"
                      : key === "reply_on_admin_doc"
                        ? "Reply mail"
                        : key === "forget_password"
                          ? "Forget Password"
                          : key === "add_job_company"
                            ? "Add Job by company"
                            : key
                              .replaceAll("_", " ") // replaces all underscores with spaces
                              .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()) // capitalizes each word
            }
          </label>
        </div>
      </li>
    ));

  return (
    <Modal show={show} size="md" centered>
      <button type="button" className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 z-index-supper" onClick={close}>
        <i className="fas fa-times"></i>
      </button>
      <div className="bg-white rounded h-100 px-11 pt-10">
        <h3 className="text-center">Settings</h3>
        <ParentSetting setopenAdminSettings={setOpenAdminSettings} setApiCall={setApiCall} />
        {openAdminSettings && (
          <>
            <h6 className="text-start mt-4 text-grey">Admin's Email Preferences</h6>
            <ul className="list-unstyled row">{renderSwitches(emailKeys, email)}</ul>
            <h6 className="text-start mt-4 text-grey">Admin's Notification Preferences</h6>
            <ul className="list-unstyled row">{renderSwitches(notificationKeys, notification, "notification_")}</ul>
          </>
        )}
        <div className="mb-3">
          {emailAuthLink.is_already_authorized === "yes" ? (
            <h4 style={{ color: "#5be15b" }}>Mail already authorized!</h4>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => {
                window.open(emailAuthLink?.data, "_blank", "height=500,width=500");
                close();
              }}
            >
              Authenticate Mail
            </button>
          )}
        </div>

        <div className="mb-3">
          {sharePointData.is_already_authorized === "yes" ? (
            <h4 style={{ color: "#5be15b" }}>SharePoint already authorized!</h4>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={async () => {
                try {
                  const res = await RefreshPointData();
                  if (res?.messsage === "Success") {
                    toast.success("Authorized successfully", {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 1000,
                    });
                    setApiCall(true);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              Authenticate SharePoint
            </button>
          )}
        </div>

        <Link
          to="#"
          onClick={() => {
            setShowChangePass(true);
            close();
          }}
          className="btn btn-primary d-flex align-items-center mb-8"
        >
          <RiLockPasswordFill className="mr-2" /> Change Password
        </Link>
      </div>
    </Modal>
  );
}

export default AdminSetting;
