import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import {
  EmployeeSkillDetails,
  AddEmployeeSkill,
  DeleteEmployeeSkill,
} from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import SAlert from "../../common/sweetAlert";

function Skills(props) {
  let [skillData, SetSkillData] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteID] = useState();
  const [deleteName, setDeleteName] = useState("");
  const close = props.close;

  // USER SKILLS VALIDATION

  // INITIAL STATE ASSIGNMENT
  // const initialFormState = {
  //   skill: "",
  // };
  // VALIDATION CONDITIONS
  const validators = {
    skill: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Skills is required"
          : /[^A-Za-z 0-9]/g.test(value)
          ? "Cannot use special character "
          : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate } = useValidation(
    skillData,
    validators
  );
  // API CALL
  const SkillData = async () => {
    let SkillDetails = await EmployeeSkillDetails(props.employeeSkillData);
    console.log(SkillDetails.data);
    SetSkillData(SkillDetails.data);
    // setState(props.employeeSkillData);
  };
  useEffect(() => {
    SkillData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, deleteAlert]);
  // console.log(state);

  // USER SKILLS SUBMIT BUTTON
  const onUserSkillsClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      let responseData = await AddEmployeeSkill(state, props.employeeSkillData);
      if (responseData.message === "Employee data updated successfully") {
        toast.success("Skill Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
    }
  };
  // END USER PERSONAL DETAIL VALIDATION
  /*To Show the delete alert box */
  const ShowDeleteAlert = (e) => {
    setDeleteID(e.skill_id);
    setDeleteName(e.skill);
    setDeleteAlert(true);
  };
  /*To cancel the delete alert box */
  const CancelDelete = () => {
    setDeleteAlert(false);
  };
  /*To call Api to delete category */
  async function deleteSkill(e) {
    const responseData = await DeleteEmployeeSkill(e);
    if (responseData.message === "skill has been deleted") {
      toast.error("Skill deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setDeleteAlert(false);
    }
  }
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
                htmlFor="skill"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Skill / Software Name <span className="text-danger">*</span> :
              </label>
              <input
                maxLength={30}
                type="text"
                placeholder="Skill / Software Name"
                className={
                  errors.skill
                    ? "form-control border border-danger"
                    : "form-control"
                }
                id="skill"
                name="skill"
                value={state.skill}
                onChange={onInputChange}
              />
              {/*----ERROR MESSAGE FOR SKILLS----*/}
              {errors.skill && (
                <span key={errors.skill} className="text-danger font-size-3">
                  {errors.skill}
                </span>
              )}
            </div>
            <div className="">
              <ul className="list-unstyled d-flex align-items-center flex-wrap">
                {(skillData || []).map((skill) => (
                  <li
                    className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                    key={skill.skill_id}
                  >
                    {skill.skill}
                    <Link onClick={() => ShowDeleteAlert(skill)}>
                      <i class="px-3 fa fa-times-circle" aria-hidden="true"></i>
                    </Link>
                  </li>
                ))}
              </ul>
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
        <SAlert
          show={deleteAlert}
          title={deleteName}
          text="Are you Sure you want to delete !"
          onConfirm={() => deleteSkill(deleteId)}
          showCancelButton={true}
          onCancel={CancelDelete}
        />
      </Modal>
    </>
  );
}

export default Skills;
