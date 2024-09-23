import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
// import { CKEditor } from "ckeditor4-react";
import {
  AddUpdateVisa,
  GetVisaSubStages,
  AddUpdateEmployeeVisaSubStage,
} from "../../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterJson from "../../json/filterjson";
import VisaTimeLine from "../../common/visaTimeLine";
import VisaSubStageSelector from "../../common/visaSubsStage";
export default function VisaStatus(props) {
  const [loading, setLoading] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedSubStage, setSelectedSubStage] = useState(props.employeeData?.substag);
  const [expandedStatus, setExpandedStatus] = useState(
    props.employeeData?.[props.type === "visa" ? "visa_status" : "applicant_process_status"]
  );

  // eslint-disable-next-line
  let isExpanded = false;
  // USER PERSONAL DETAIL VALIDATION
  // INITIAL STATE ASSIGNMENT
  const initialFormStateuser = {
    status: props.employeeData?.[props.type === "visa" ? "visa_status" : "applicant_process_status"],
    country: props.employeeData?.visa_country,
  };
  /*Function to get Visa sub stage */
  const GetVIsaSubSTage = async () => {
    try {
      let Response = await GetVisaSubStages(props.employeeData?.[props.type === "visa" ? "visa_id" : "applicant_process_type_id"], props.type);
      setSelectedStatus(Response.data.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetVIsaSubSTage();
    if (apiCall === true) {
      setApiCall(false);
    }
    // eslint-disable-next-line
  }, [apiCall]);

  /* Functionality to close the modal */
  const close = () => {
    setState(initialFormStateuser);
    setErrors("");
    setLoading(false);
    props.close();
  };

  // VALIDATION CONDITIONS

  const validators = {
    status: [
      (value) => (value === "" || value === null ? `${props.type} is required` : null),
    ],
  };

  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate, setErrors } =
    useValidation(initialFormStateuser, validators);
  // API CALL
  // const UserData = async () => {
  //   const userData = await EmployeeDetails(props.employeeId);
  //   if (userData.data.employee.length === 0) {
  //     setState([]);
  //   } else {
  //     setState(userData.data.employee[0]);
  //   }
  // };
  // useEffect(() => {
  //   if (props.employeeId === "0" || props.employeeId === undefined) {
  //     setState(initialFormStateuser);
  //   } else {
  //     UserData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props]);
  // VISA STATUS ADD / UPDATE BUTTON
  async function onVisaUpdateClick(event) {
    // event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddUpdateVisa(
          props.employeeData?.employee_id,
          state,
          props.employeeData?.[props.type === "visa" ? "visa_id" : "applicant_process_type_id"],
          props.type
        );
        if (responseData.data.message === "visa inserted successfully") {
          toast.success(`${props.type} stage created successfully`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          close();
        }
        if (responseData.data.message === `visa updated successfully`) {
          toast.success(`${props.type} stage status Updated successfully`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setLoading(false);
          close();
        }
        props.setApiCall(true);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      //   setLoading(false);
    }
  }
  /*Function to add update visa sub stages */
  const handleSubStageSelection = async (status, subStage) => {
    const isSelected = selectedStatus.some(
      (item) => item.status === status && item.substage === subStage
    );
    let data;
    /*Condition to check the selected substages */
    if (isSelected) {
      setSelectedStatus(
        selectedStatus.filter(
          (item) => !(item.status === status && item.substage === subStage)
        )
      );
      let RemoveSubStage = selectedStatus.filter(
        (item) => item.status === status && item.substage === subStage
      )[0];
      data = {
        id: RemoveSubStage.id,
        misc_id: RemoveSubStage.misc_id,
        type: props.type,
        status: RemoveSubStage.status,
        substage: "false",
      };
    } else {
      setSelectedStatus([
        ...selectedStatus,
        { status: status, substage: subStage },
      ]);
      /*Employee Visa sub stages */
      data = {
        misc_id: props.employeeData?.[props.type === "visa" ? "visa_id" : "applicant_process_type_id"],
        type: props.type,
        status: status,
        substage: subStage,
      };
    }
    try {
      console.log(data)
      let Response = await AddUpdateEmployeeVisaSubStage(data);
      /*Removed sub stage response */
      if (Response.message === "updated successfully") {
        toast.success(`${props.type} Sub Stage Removed successfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        // props.setApiCall(true);
        // if (state.status !== props.employeeData?.status && status !== state.status) {
        //   setState({ ...state, status: status })
        //   if (typeof onVisaUpdateClick === 'function') {
        //     onVisaUpdateClick("sub");
        //   }
        // }
        setApiCall(true);
        props.setApiCall(true);
      }
      /*Added sub stage response */
      if (Response.message === "created successfully") {
        toast.success(`${props.type} Sub Stage Added successfully`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        // props.setApiCall(true);
        // if (state.status !== props.employeeData?.status && status !== state.status) {
        //   setState({ ...state, status: status })
        //   if (typeof onVisaUpdateClick === 'function') {
        //     onVisaUpdateClick("sub");
        //   }
        // }
        setApiCall(true);
        props.setApiCall(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
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
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
        <div className="bg-white rounded h-100 px-11 pt-7">
          <form>
            <h5 className="text-center pt-2 mb-7 text-capitalize">Update {props.type} status</h5>
            <VisaTimeLine visa={state.status} substage={selectedSubStage} />

            <div className="form-group col mt-5">
              <label
                htmlFor="status"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset text-capitalize"
              >
                {props.type === "visa" ? "Work Permit" : `${props.type} status`}  : <span className="text-danger">*</span>
              </label>
              <select
                name="status"
                value={state.status || ""}
                onChange={(e) => {
                  setState({ ...state, status: e.target.value });
                  setExpandedStatus(e.target.value);
                }}
                multiple={false}
                className={
                  errors.status
                    ? "form-control text-capitalize border border-danger"
                    : "form-control text-capitalize"
                }
                id="status"
              >
                <option value={""} className="text-capitalize">Select {props.type} Status </option>
                {(FilterJson.visa_status || []).map((item, index) => {
                  isExpanded = expandedStatus === item;
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
              {/*----ERROR MESSAGE FOR WORK PERMIT----*/}
              {errors.status && (
                <span key={errors.status} className="text-danger font-size-3">
                  {errors.status}
                </span>
              )}
            </div>
            <div className={props.type === "visa" ? "form-group col" : "d-none"}>
              <label
                htmlFor="country"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Country :
              </label>
              <select
                name="country"
                value={state.country || ""}
                onChange={onInputChange}
                className={"form-control text-capitalize"}
                // disabled={props.employeeData?.visa_country}
                id="country"
              >
                <option value={""}>Select visa Country </option>
                {(FilterJson.location || []).map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            {expandedStatus && (
              <VisaSubStageSelector
                expandedStatus={expandedStatus}
                selectedStatus={selectedStatus}
                FilterJson={FilterJson}
                handleSubStageSelection={handleSubStageSelection}
                setSelectedSubStage={setSelectedSubStage}
                stage={props.employeeData?.[props.type === "visa" ? "visa_status" : "applicant_process_status"]
                }
                id={props.employeeData?.[props.type === "visa" ? "visa_id" : "applicant_process_type_id"]}
                onVisaUpdateClick={onVisaUpdateClick}
              />
            )}
            <div className="form-group text-center">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Loading...</span>
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                  onClick={onVisaUpdateClick}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
}
