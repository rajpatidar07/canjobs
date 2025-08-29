import React, { useState, useEffect } from "react";
import CustomButton from "../common/button";
import ContactInfo from "../forms/employer/contactInfo";
import { EmployerDetails } from "../../api/api";
import { Link } from "react-router-dom";
import { PiPencilDuotone } from "react-icons/pi";
function CompanyDetailPage(props) {
  /*Show modal and data state */
  const [apiCall, setApiCall] = useState(false);
  const [ContactDetails, setContactDetails] = useState(false);
  const [employerData, setEmployerData] = useState("");
  let user_type = localStorage.getItem("userType");
  /*Render method to get employer data */
  useEffect(() => {
    const EmployerData = async () => {
      try {
        let userData = await EmployerDetails(props.employerId);
        if (
          userData === undefined ||
          userData.data.company_detail.length === 0
        ) {
          setEmployerData([]);
        } else {
          setEmployerData(userData.data.company_detail[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (props.employerId !== "0" || props.employerId !== undefined) {
      EmployerData();
    }
    if (apiCall === true) {
      setApiCall(false);
    }
  }, [props.employerId, apiCall]);
  return (
    <>
    <div className="d-flex justify-content-space-between">
      <h6>Contact Person Details</h6>
      {props.page === "company_profile" ? (
          <CustomButton
            className={
              user_type === "user"
                ? "d-none"
                : " font-size-3 rounded-3 btn-primary border-0"
            }
            onClick={() => setContactDetails(true)}
          >
            <PiPencilDuotone />
          </CustomButton>
        ) : null}
      </div>
      <div
        className={
          props.page === "company_profile"
            ? "company_info d-flex align-items-center justify-content-left flex-wrap"
            : "company_info"
        }
      >
        {(!employerData.contact_person_name &&
          !employerData.designation &&
          !employerData.email &&
          !employerData.contact_no &&
          !employerData.contact_no_other &&
          !employerData.address) ? (
          <div className="text-left row m-0">
            <div className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7">
              No Data Found
            </div>
          </div>
        ) : (
          <div className="text-left row m-0">
            {employerData.contact_person_name ? (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                title="Contact Person Name"
              >
                <i className="fas fa-user mr-2"></i>
                <b> Name:</b> {employerData.contact_person_name}
              </div>
            ) : null}
            {employerData.designation ? (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                title="Designation"
              >
                <i className="fas fa-briefcase mr-2"></i>
                <b>Designation:</b> {employerData.designation}
              </div>
            ) : null}
            {employerData.email && (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7 d-none"
                title="Email"
              >
                <i className="fas fa-envelope mr-2"></i>
                <Link className="text-dark" to={`mailto:${employerData.email}`}>
                  {employerData.email}
                </Link>
              </div>
            )}
            {employerData.contact_no && (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7 d-none"
                title="Contact No"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                <Link
                  className="text-dark"
                  to={`tel:${employerData.contact_no}`}
                >
                  {employerData.contact_no}
                </Link>
              </div>
            )}
            {employerData.contact_no_other && (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7 d-none"
                title="Contact No Other"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                <Link
                  className="text-dark"
                  to={`tel:${employerData.contact_no_other}`}
                >
                  {employerData.contact_no_other}
                </Link>
              </div>
            )}
            {employerData.address ? (
              <div
                className="font-size-3 text-default-color line-height-2 m-0 text-break mr-7"
                title="Address"
              >
                <i className="fas fa-map-marker-alt mr-2"></i>
                <b> Address:</b> {employerData.address}
                {employerData.city && `, ${employerData.city}`}
                {employerData.pin_code && ` - ${employerData.pin_code}`}
                {employerData.state && `, ${employerData.state}`}
                {employerData.country && `, ${employerData.country}`}
              </div>
            ) : null}{" "}

          </div>
        )}
        {props.page === "company_profile" ? (
          <CustomButton
            className={
              user_type === "user"
                ? "d-none"
                : " font-size-3 rounded-3 btn-primary border-0 d-none"
            }
            onClick={() => setContactDetails(true)}
          >
            <PiPencilDuotone />
          </CustomButton>
        ) : null}
      </div>

      {ContactDetails ? (
        <ContactInfo
          employerId={props.employerId}
          show={ContactDetails}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setContactDetails(false)}
        />
      ) : null}
    </>
  );
}

export default CompanyDetailPage;
