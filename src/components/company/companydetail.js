import React, { useState, useEffect } from "react";
import CustomButton from "../common/button";
import ContactInfo from "../forms/employer/contactInfo";
import { EmployerDetails } from "../../api/api";
import { Link } from "react-router-dom";
function CompanyDetailPage(props) {
  /*Show modal and data state */
  const [apiCall, setApiCall] = useState(false);
  const [ContactDetails, setContactDetails] = useState(false);
  const [employerData, setEmployerData] = useState("");

  /*Render method to get employer data */
  useEffect(() => {
    const EmployerData = async () => {
      let userData = await EmployerDetails(props.employerId);
      if (userData === undefined || userData.data.company_detail.length === 0) {
        setEmployerData([]);
      } else {
        setEmployerData(userData.data.company_detail[0]);
      }
    };
    if (props.employerId !== "0" || props.employerId !== undefined) {
      EmployerData();
    }
  }, [props.employerId, apiCall]);
  return (
    <div className="col-md-12 col-xl-3 col-lg-4 col-12 col-sm-12 border-right ">
      <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
        <span>Contact Info</span>
        <CustomButton
          className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
          onClick={() => setContactDetails(true)}
        />
        {ContactDetails ? <ContactInfo
          employerId={props.employerId}
          show={ContactDetails}
          apiCall={apiCall}
          setApiCall={setApiCall}
          close={() => setContactDetails(false)}
        /> : null}
      </h4>
      <div className="pt-5 text-left row text-capitalize">
        <div className="col-md-12">
          {employerData.contact_person_name ? <p className="font-size-4 mb-8" title="Contact Person Name">
            <i className="fas fa-user mr-2"></i>
            {employerData.contact_person_name}
          </p> : null}
          {employerData.designation ? <p className="font-size-4 mb-8" title="Designation">
            <i className="fas fa-portrait mr-2"></i> {employerData.designation}
          </p> : null}
          {employerData.email ? <p className="font-size-4 mb-8 text-break" title="Email">
            <i className="fas fa-envelope mr-2"></i>
            <Link className="text-dark" to={`mailto:${employerData.email}`}>
              {employerData.email}
            </Link>
          </p> : null}
          {employerData.contact_no ? <p className="font-size-4 mb-8" title="Contact No">
            <i className="fas fa-phone-alt mr-2"></i>
            <Link className="text-dark" to={`tel:${employerData.contact_no}`}>{employerData.contact_no}</Link>
          </p> : null}
          {employerData.contact_no_other ? (
            <p className="font-size-4 mb-8" title="Contact No">
              <i className="fas fa-phone-alt mr-2"></i>
              <Link className="text-dark" to={`tel:${employerData.contact_no_other}`}>{employerData.contact_no_other}</Link>
            </p>
          ) : null}
          {employerData.address ? <p className="font-size-4 mb-8" title="Address">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {employerData.address}
          </p> : null}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailPage;
