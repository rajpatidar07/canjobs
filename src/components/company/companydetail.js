import React, { useState } from "react";
import CustomButton from "../common/button";
import ContactInfo from "../forms/employer/contactInfo";

function CompanyDetailPage() {
  const [ContactDetails, setContactDetails] = useState(false);

  return (
    <div className="col-md-12 col-xl-3 col-lg-4 col-12 col-sm-12 border-right">
      <h4 className="text-black-2 mb-5 font-size-5 d-flex align-items-center justify-content-space-between">
        <span>Contact Info</span>
        <CustomButton
          className="fas fa-pen font-size-3 rounded-3 btn-primary border-0"
          onClick={() => setContactDetails(true)}
        />
        <ContactInfo
          show={ContactDetails}
          close={() => setContactDetails(false)}
        />
      </h4>
      <div className="pt-5 text-left row">
        <div className="col-md-12">
          <p className="font-size-4 mb-8" title="Contact Person Name">
            <i className="fas fa-user mr-2"></i> Rajaram Patidar
          </p>
          <p className="font-size-4 mb-8" title="Designation">
            <i className="fas fa-portrait mr-2"></i> Manager
          </p>
          <p className="font-size-4 mb-8" title="Email">
            <i className="fas fa-envelope mr-2"></i> raj.we2code@gmail.com
          </p>
          <p className="font-size-4 mb-8" title="Contact No">
            <i className="fas fa-phone-alt mr-2"></i> 012345789
          </p>
          <p className="font-size-4 mb-8" title="Contact No">
            <i className="fas fa-phone-alt mr-2"></i> 012345789
          </p>
          <p className="font-size-4 mb-8" title="Address">
            <i className="fas fa-map-marker-alt mr-2"></i> 45, Universal Tower
            Scheme 54, PU4, Indore, MP (452001)
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailPage;
