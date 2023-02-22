import React from "react";
import { Modal } from "react-bootstrap";

function Projects(props) {
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
        <div className="bg-white-2 h-100 px-11 pt-7">
          <form>
            <h5 className="text-center pt-2">Project </h5>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Project_Title"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Project Title :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project_Title"
                  id="Project Title"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Client"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Client :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Client"
                  id="Client"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label
                  htmlFor="Project_Status"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Project Status :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Status"
                  id="Project_Status"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Worked_from"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Worked from :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Worked from"
                  id="Worked_from"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Details_of_Project"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Details of Project :
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="Details_of_Project"
                    placeholder="Details of Project"
                  />
                </div>
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Project_Location"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Project Location :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Project Location"
                  id="Project_Location"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Project_Site"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Project Site :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Site"
                  id="Project_Site"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Team_Size"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Team Size :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Team Size"
                  id="Team_Size"
                />
              </div>
            </div>
            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="role"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Role :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Role"
                  id="role"
                />
              </div>
              <div className="form-group col-md-6">
                <label
                  htmlFor="Role_Description"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Role Description :
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Role Description"
                  id="Role_Description"
                />
              </div>
            </div>

            <div className="row">
              {" "}
              <div className="form-group col-md-6">
                <label
                  htmlFor="Skills"
                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                >
                  Skills Used :
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Skills"
                  id="Skills"
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

export default Projects;
