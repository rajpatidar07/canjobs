import React, { useState, useEffect } from "react";
import CustomButton from "../common/button";
import ContactInfo from "../forms/employer/contactInfo";
import { EmployerDetails } from "../../api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PiPencilDuotone } from "react-icons/pi";
function CompanyDetailPage(props) {
  /*Show modal and data state */
  const [apiCall, setApiCall] = useState(false);
  const [ContactDetails, setContactDetails] = useState(false);
  const [employerData, setEmployerData] = useState("");

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
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    };
    if (props.employerId !== "0" || props.employerId !== undefined) {
      EmployerData();
    }
  }, [props.employerId, apiCall]);
  return (
    <div className="company_info">
      <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
        <span>{props.page === "company_profile"? null :"Contact Info"}</span>
        <CustomButton
          className=" font-size-3 rounded-3 btn-primary border-0"
          onClick={() => setContactDetails(true)}
        >
          <PiPencilDuotone />
        </CustomButton>
        {ContactDetails ? (
          <ContactInfo
            employerId={props.employerId}
            show={ContactDetails}
            apiCall={apiCall}
            setApiCall={setApiCall}
            close={() => setContactDetails(false)}
          />
        ) : null}
      </h4>
      <div className="pt-5 text-left row m-0">
        {employerData.contact_person_name ? (
          <div className="font-size-4 mr-7 mb-2" title="Contact Person Name">
            <i className="fas fa-user mr-2"></i>
            {employerData.contact_person_name}
          </div>
        ) : null}
        {employerData.designation ? (
          <div className="font-size-4 mr-7 mb-2" title="Designation">
            <i className="fas fa-portrait mr-2"></i> {employerData.designation}
          </div>
        ) : null}
        {employerData.email ? (
          <div className="font-size-4 mr-7 mb-2" title="Email">
            <i className="fas fa-envelope mr-2"></i>
            <Link className="text-dark" to={`mailto:${employerData.email}`}>
              {employerData.email}
            </Link>
          </div>
        ) : null}
        {employerData.contact_no ? (
          <div className="font-size-4 mr-7 mb-2" title="Contact No">
            <i className="fas fa-phone-alt mr-2"></i>
            <Link className="text-dark" to={`tel:${employerData.contact_no}`}>
              {employerData.contact_no}
            </Link>
          </div>
        ) : null}
        {employerData.contact_no_other ? (
          <div className="font-size-4 mr-7 mb-2" title="Contact No">
            <i className="fas fa-phone-alt mr-2"></i>
            <Link
              className="text-dark"
              to={`tel:${employerData.contact_no_other}`}
            >
              {employerData.contact_no_other}
            </Link>
          </div>
        ) : null}
        {employerData.address ? (
          <div className="font-size-4 mr-7 mb-2" title="Address">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {employerData.address}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CompanyDetailPage;
