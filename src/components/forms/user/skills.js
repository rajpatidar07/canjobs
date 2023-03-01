import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";

function Skills(props) {
  // USER SKILLS VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    userskills: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    userskills: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Skills is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );
  // USER SKILLS SUBMIT BUTTON
  const onUserSkillsClick = (event) => {
    event.preventDefault();
    if (validate()) {
    }
  };
  // END USER PERSONAL DETAIL VALIDATION
  return (
    <>
      <Modal
        show={props.show}
        size="md"
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
          <form onSubmit={onUserSkillsClick}>
            <h5 className="text-center mb-7">Add It Skills </h5>{" "}
            <div className="form-group ">
              <label
                htmlFor="userskills"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Skill / Software Name <span className="text-danger">*</span> :
              </label>
              <input
                maxLength={30}
                type="text"
                placeholder="Skill / Software Name"
                className={
                  errors.userskills
                    ? "form-control border border-danger"
                    : "form-control"
                }
                id="userskills"
                name="userskills"
                value={state.userskills}
                onChange={onInputChange}
              />
              {/*----ERROR MESSAGE FOR SKILLS----*/}
              {errors.userskills && (
                <span
                  key={errors.userskills}
                  className="text-danger font-size-3"
                >
                  {errors.userskills}
                </span>
              )}
            </div>
            <div className="form-group text-center">
              <button
                className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
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

export default Skills;
