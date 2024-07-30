import React, { useState } from "react";
import { GetParentSetting, AddChildPermission } from "../../api/api";
import { toast } from "react-toastify";
export default function ParentSetting() {
  const [selectedOption, setSelectedOption] = useState("");
  const [child, setChild] = useState({
    lmia: 0,
    job: 0,
    interview: 0,
    visa: 0,
    employee_signup: 0,
  });

  /*Function to get the child type to made chanages to there permissio */
  const handleSelectChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    try {
      let Response = await GetParentSetting(selectedValue);
      if (Response.status === 1) {
        const permissions = JSON.parse(Response.data[0].permission);
        setChild(permissions);
      }
    } catch (err) {
      console.log(err);
      setChild([]);
    }
  };
  /*Funcion to select the permission opions */
  const onChildChange = async (permissionName) => {
    const Data = {
      type: selectedOption,
      permission: selectedOption === "email_partner"
        ? {
          new_user_registered: permissionName === "new_user_registered" ? (child.new_user_registered === 0 ? 1 : 0) : child.new_user_registered,
        }
        : {
          job:
            permissionName === "child_job"
              ? child.job === 0
                ? 1
                : 0
              : child.job,
          lmia:
            permissionName === "child_lmia"
              ? child.lmia === 0
                ? 1
                : 0
              : child.lmia,
          interview:
            permissionName === "child_interview"
              ? child.interview === 0
                ? 1
                : 0
              : child.interview,
          visa:
            permissionName === "child_visa"
              ? child.visa === 0
                ? 1
                : 0
              : child.visa,
          employee_signup:
            permissionName === "child_register"
              ? child.employee_signup === 0
                ? 1
                : 0
              : child.employee_signup,
        },
    };
    try {
      let Response = await AddChildPermission(Data);
      if (
        Response.message === "successfully" &&
        (permissionName === "child_lmia"
          ? Data.permission.lmia === 1
          : permissionName === "child_visa"
            ? Data.permission.visa === 1
            : permissionName === "child_interview"
              ? Data.permission.interview === 1
              : permissionName === "child_register"
                ? Data.permission.employee_signup === 1
                : permissionName === "new_user_registered"
                  ? Data.permission.new_user_registered === 1
                  : Data.permission.job === 1)
      ) {
        toast.success("Permission granted successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        const event = { target: { value: selectedOption } };
        await handleSelectChange(event);
      }
      if (
        Response.message === "successfully" &&
        (permissionName === "child_lmia"
          ? Data.permission.lmia === 0
          : permissionName === "child_visa"
            ? Data.permission.visa === 0
            : permissionName === "child_interview"
              ? Data.permission.interview === 0
              : permissionName === "child_register"
                ? Data.permission.employee_signup === 0
                : permissionName === "new_user_registered"
                  ? Data.permission.new_user_registered === 0
                  : Data.permission.job === 0)
      ) {
        toast.error("Permission Denay successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        const event = { target: { value: selectedOption } };
        await handleSelectChange(event);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <select
        className="form-control"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value={""}>Select Type</option>
        <option value={"email_partner"}>Partners's email</option>
        <option value={"email_employee"}>Applicant's email</option>
        <option value={"email_employer"}>Client's email</option>
        <option value={"notification_employee"}>Applicant's notifcation</option>
        <option value={"notification_employer"}>Client's notifcation</option>
      </select>
      {selectedOption && (
        <>
          <h6 className="text-start mt-4 text-grey text-capitalize">{`${selectedOption.replaceAll(
            "_",
            " "
          )} Preferences`}</h6>

          <ul className="list-unstyled row">
            <li className={selectedOption === "email_partner" ? "d-none" : "mb-3 col-6"}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitchchild1"
                  checked={child.lmia === 0 ? false : true}
                  onChange={() => onChildChange("child_lmia")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitchchild1"
                >
                  Lmia
                </label>
              </div>
            </li>
            <li className={selectedOption === "email_partner" ? "d-none" : "mb-3 col-6"}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitchchchild2"
                  checked={child.visa === 0 ? false : true}
                  onChange={() => onChildChange("child_visa")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitchchchild2"
                >
                  Visa
                </label>
              </div>
            </li>
            <li className={selectedOption === "email_partner" ? "d-none" : "mb-3 col-6"}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitchchchild3"
                  checked={child.interview === 0 ? false : true}
                  onChange={() => onChildChange("child_interview")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitchchchild3"
                >
                  Interview
                </label>
              </div>
            </li>
            <li className={selectedOption === "email_partner" ? "d-none" : "mb-3 col-6"}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitchchchild4"
                  checked={child.job === 0 ? false : true}
                  onChange={() => onChildChange("child_job")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitchchchild4"
                >
                  Job
                </label>
              </div>
            </li>
            <li className={selectedOption === "email_employee" ? "mb-3 col-6" : "d-none"}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitchchchild5"
                  checked={child.employee_signup === 0 ? false : true}
                  onChange={() => onChildChange("child_register")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitchchchild5"
                >
                  Welcome Mail
                </label>
              </div>
            </li>
            <li className={selectedOption === "email_partner" ? "mb-3 col-6" : "d-none"}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitchchchild6"
                  checked={child.new_user_registered === 0 ? false : true}
                  onChange={() => onChildChange("new_user_registered")}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitchchchild6"
                >
                  Applicant's Registration mail
                </label>
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
