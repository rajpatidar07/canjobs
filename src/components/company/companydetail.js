import React, { useState } from "react";
import CustomButton from "../common/button";
import ContactInfo from "../forms/employer/contactInfo";

function CompanyDetailPage() {
  const [ContactDetails, setContactDetails] = useState(false);

  return (
    <div className="col-md-4 col-xl-3 col-lg-4 col-12 border-right">
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
          <p className="font-size-4 mb-8" title="Contact Person Name"><img className="mr-2" src="image/icons/envelope.svg" alt="" /> Rajaram Patidar</p>
          <p className="font-size-4 mb-8" title="Designation"><img className="mr-2" src="image/icons/address-book.svg" alt="" /> Manager</p>
          <p className="font-size-4 mb-8" title="Email"><img className="mr-2" src="image/icons/envelope.svg" alt="" /> raj.we2code@gmail.com</p>
          <p className="font-size-4 mb-8" title="Contact No"><img className="mr-2" src="image/icons/mobile-button.svg" alt="" /> 012345789</p>
          <p className="font-size-4 mb-8" title="Contact No"><img className="mr-2" src="image/icons/mobile-button.svg" alt="" /> 012345789</p>
          <p className="font-size-4 mb-8" title="Address"><img className="mr-2" src="image/icons/marker.svg" alt="" /> 45, Universal Tower Scheme 54, PU4, Indore, MP (452001)</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailPage;
