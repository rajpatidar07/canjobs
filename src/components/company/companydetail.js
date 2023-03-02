import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../common/button";
import Account from "../forms/employer/account";

function CompanyDetailPage() {
  return (
    <div className="col-12 col-xl-3 col-lg-4 col-md-5 col-sm-6">
      <div className="pt-11 pt-lg-0 pl-lg-5">
        <div className="">
          <div className="d-flex align-items-center justify-content-md-between flex-wrap">
            <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold text-left">
              Account Details
            </h4>
            <CustomButton
              className="font-size-3 rounded-3 btn-primary border-0"
              //   onClick={() => setShowAccountDetailsModal(true)}
            >
              Edit
            </CustomButton>
            {/* <Account
              show={showAccountDetailsModal}
              close={() => setShowAccountDetailsModal(false)}
            /> */}
          </div>
          <div className="pt-5 text-left row">
            <div className="col-md-4">
              {" "}
              <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                Name
              </h5>
              <p className="font-size-4 mb-8">Shan Maxio</p>
            </div>
            <div className="col-md-4">
              {" "}
              <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                Account No.
              </h5>
              <p className="font-size-4 mb-8">xxxxxxxxxx25</p>
            </div>
            <div className="col-md-4">
              {" "}
              <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                IFSC code
              </h5>
              <p className="font-size-4 mb-8">CRB4152S</p>
            </div>
            <div className="col-md-4">
              {" "}
              <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                Bank Name
              </h5>
              <p className="font-size-4 mb-8">Canera National Bank</p>
            </div>
            <div className="col-md-4">
              {" "}
              <h5 className="mb-0 font-size-5 font-weight-semibold text-gray">
                Branch Name
              </h5>
              <p className="font-size-4 mb-8">Vijay Nagar, Indore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailPage;
