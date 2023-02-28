import React from "react";
import { Modal } from "react-bootstrap";

function CompanyDetails(props) {
  return (
    <>
      <Modal
        show={props.show}
        size="lg"
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
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form>
            <h5 className="text-center pt-2">Company Details</h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Company_Type"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Company Type :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company Type"
                  id="Company_Type"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Industry"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Industry<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Industry"
                  id="Industry"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Contact_Person"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Contact Person<span className="text-danger"> *</span> :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact Person "
                  id="Contact_Person"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Alias"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Alias :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Alias"
                    placeholder="Alias"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Contact_Person_Designation:"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Contact Person's Designation :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact Person's Designation"
                  id="Contact_Person_Designation"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Website_URL"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Website URL :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Website URL"
                  id="Website_URL"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Profile_for_Hot_Vacancies"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Profile for Hot Vacancies :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Profile for Hot Vacancies"
                  id="Profile_for_Hot_Vacancies"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Profile_for_Classifieds"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Profile for Classifieds :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Profile for Classifieds"
                  id="Profile_for_Classifieds"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Phone_Number_1"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Phone Number 1<span className="text-danger"> *</span> :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number 1"
                  id="Phone_Number_1"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Phone_Number_2"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Phone Number 2 :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number 2"
                  id="Phone_Number_2"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Fax_Number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Fax Number :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Fax Number"
                  id="Fax_Number"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="TAN_Number"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  TAN Number :
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="TAN Number"
                  id="TAN_Number"
                />
              </div>
            </div>

            <div className="form-group mb-8">
              <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase">
                Submit
              </button>
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}

export default CompanyDetails;
