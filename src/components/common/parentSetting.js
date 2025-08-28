import React, { useState } from "react";
import { GetParentSetting, AddChildPermission } from "../../api/api";
import { toast } from "react-toastify";

export default function ParentSetting({ setopenAdminSettings, setApiCall }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [child, setChild] = useState({});

  const emailPermissionMap = {
    email_employee: [
      "employee_signup", "interview_schedule_employee", "forget_password",
      "otp_signup", "payment_invoice_reminder", "rcic_signed_agreement",
      "lmia", "job", "interview", "visa"
    ],
    email_employer: [
      "company_sign_up", "apply_on_job", "add_job_admin",
      "interview_schedule_employer", "lmia_status_update",
      "forget_password", "otp_signup", "rcic_signed_agreement"
    ],
    email_partner: ["new_user_registered", "forget_password"],
    notification_employee: ["lmia", "job", "interview", "visa"],
    notification_employer: ["lmia", "job", "interview", "visa"]

  };

  const toggleValue = (val) => (val === 0 ? 1 : 0);

  const initializePermissions = (keys, activeKey = "") => {
    const defaultPermissions = {};
    keys.forEach(k => {
      defaultPermissions[k] = k === activeKey ? 1 : 0;
    });
    console.log(defaultPermissions)
    return defaultPermissions;
  };

  const handleSelectChange = async (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "admin_setting") {
      setApiCall(true);
      setopenAdminSettings(true);
      setSelectedOption("");
    } else {
      try {
        const response = await GetParentSetting(selectedValue);
        const permissionKeys = emailPermissionMap[selectedValue] || [];

        if (response.status === 1 && response.data?.[0]?.permission) {
          const parsed = JSON.parse(response.data[0].permission);
          setChild(parsed);
        } else {
          // No data, initialize all to 0, set clicked child (first load only) to 1
          const defaultPermissions = initializePermissions(permissionKeys);
          setChild(defaultPermissions);

          // Send initial data to backend
          await AddChildPermission({
            type: selectedValue,
            permission: defaultPermissions
          });
        }
      } catch (err) {
        console.error(err);
        setChild({});
      }
      setopenAdminSettings(false);
    }
  };

  const onChildChange = async (permissionName) => {
    const key = permissionName.replace("child_", "");
    const updatedPermission = {
      ...child,
      [key]: toggleValue(child[key]),
    };
    try {
      const response = await AddChildPermission({
        type: selectedOption,
        permission: updatedPermission,
      });

      if (response.message === "successfully") {
        toast[updatedPermission[key] === 1 ? "success" : "error"](
          `Permission ${updatedPermission[key] === 1 ? "granted" : "denied"} successfully`,
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          }
        );
        setChild(updatedPermission); // Local update
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <select
        className="form-control"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="">Select Type</option>
        <option value="admin_setting">Admin's Settings</option>
        <option value="email_partner">Partner's Email</option>
        <option value="email_employee">Applicant's Email</option>
        <option value="email_employer">Employer's Email</option>
        <option value="notification_employee">Applicant's Notification</option>
        <option value="notification_employer">Employer's Notification</option>
      </select>

      {selectedOption && emailPermissionMap[selectedOption] && (
        <>
          <h6 className="text-start mt-4 text-grey text-capitalize">
            {`${selectedOption.replaceAll("_", " ")} Preferences`}
          </h6>

          <ul className="list-unstyled row">
            {emailPermissionMap[selectedOption]?.map((key) => (
              <li className="mb-3 col-6" key={key}>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`customSwitch_${key}`}
                    checked={child[key] === 1}
                    onChange={() =>
                      onChildChange(
                        selectedOption === "email_partner" && key === "new_user_registered"
                          ? "new_user_registered"
                          : `child_${key}`
                      )
                    }
                  />
                  <label
                    className="custom-control-label text-capitalize"
                    htmlFor={`customSwitch_${key}`}
                  >
                    {key.replaceAll("_", " ")}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
