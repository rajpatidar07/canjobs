import React, { useState } from "react";
import useValidation from "../../common/useValidation";
import { AddFIlter } from "../../../api//api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
function AddFilter(props) {
  let [loading, setLoading] = useState(false);
  let [cancelBtn, setCancelBtn] = useState(false);
let filterName =
   props.id === 1
    ? "Skill Type"
    : props.id === 4
    ? "Industry Type"
    : props.id === 5
    ? "Education Type"
    : props.id === 6
    ? "Corporation Type"
    : props.id === 7
    ? "Language Type"
    : props.id === 2
    ? "Category Type"
    : props.id === 3
    ? "Applicantscategories Type"
    : props.id === 8
    ? "Interested Type"
    : props.id === 9
    ? "Degree Type"
    : props.id === 10
    ? "Salary Type"
    : props.id === 11
    ? "LmiaStatus Type"
    : props.id === 12
    ? "LimaSubStagesOnboarding Type"
    : props.id === 13
    ? "LimaSubStagesAdvertisements Type"
    : props.id === 14
    ? "LimaSubStagesDocumentation Type"
    : props.id === 15
    ? "LimaSubStagesCandidatePlacement Type"
    : props.id === 16
    ? "LimaSubStagesSubmission Type"
    : props.id === 17
    ? "LimaSubStagesDecision Type"
    : props.id === 18
    ? "VisaStatus Type"
    : props.id === 19
    ? "VisaSubStagesOnboard Type"
    : props.id === 20
    ? "VisaSubStagesDocumentation Type"
    : props.id === 21
    ? "VisaSubStagesFilePreparation Type"
    : props.id === 22
    ? "VisaSubStagesFileReview Type"
    : props.id === 23
    ? "VisaSubStagesFileDecision Type"
    : props.id === 24
    ? "CanadianCandidateWorkStatus Type"
    : props.id === 25
    ? "EmployeeDocument Type"
    : props.id === 26
    ? "EmployerDocument Type"
    : props.id === 27
    ? "Country Type"
    : props.id === 28
    ? "State Type"
    : props.id === 29
    ? "City Type"
    : ""

  // FILTER UPDATE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    id: "",
    json_item: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    json_item: [
      (value) =>
        value === "" || value.trim() === ""
          ? "Filter type is required"
          : value.length < 2
            ? "Filter type should have 2 or more letters"
            : !/^[A-Za-z0-9 ]*$/.test(value)
              ? "Cannot use special character "
              : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, setErrors, errors, validate } =
    useValidation(initialFormState, validators);

  // FILTER UPDATE SUBMIT BUTTON
  const onAddFIlterClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const responseData = await AddFIlter(state, props.id);
        if (responseData.message === "item already exist !") {
          setErrors({ ...errors, json_item: ["Filter already exist !"] });
          props.setApiCall(true);
          setState(initialFormState);
          setLoading(false);
        }
        if (responseData.message === "filter item added successfully") {
          toast.success("Filter added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          setState(initialFormState);
          setLoading(false);
          setErrors("");
          setCancelBtn(false)
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setCancelBtn(false)
      }
    } else {
      setLoading(false);
      setCancelBtn(false)
    }
  };
  // END FILTER UPDATE VALIDATION
  /*Search function for filter */
  const handleSearch = () => {
    setLoading(true);
    setCancelBtn(true)
    const searchResults = SearchFilterFun(state.json_item);
    props.setFilterData({ ...props.filterData, [props.filterType]: searchResults });
    setLoading(false);
    setState(initialFormState)
  };
  const SearchFilterFun = (searchTerm) => {
    if (!Array.isArray(props.filterData[props.filterType])) {
      console.error("FilterData is not an array.");
      return [];
    }

    // Implement your search logic here
    // This could be a filter operation on your list data
    // For demonstration purposes, let's assume listData is an array of objects
    // const filteredResults = props.filterData[props.filterType].filter((item) =>
    //   item.value.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filteredResults = props.filterData[props.filterType].filter((item) =>
  item.value.toLowerCase().includes(searchTerm.toLowerCase()) &&
  searchTerm.length >= 3
);

    return filteredResults;
  };

  return (
    <div className="p-0 m-0">
      <form >
        <div className="form  p-0">
          <div className="input-group mb-3">
            <input
              className={
                errors.json_item ? "form-control border border-danger" : "form-control"
              }
              value={state.json_item}
              onChange={onInputChange}
              id="json_item"
              name="json_item"
              type={"text"}
              placeholder={filterName}
            // maxLength={60}
            />
            {loading ? (
              <button className="btn action_btn btn-primary" type="button" disabled>
                <div className="spinner-border spinner-border-sm" role="status"></div>
              </button>
            ) : (
              <>
                <button
                  className="btn  action_btn btn-primary px-2"
                  type="submit"
                  id="button-addon2"
                  title={`Add ${filterName}`}
                  onClick={onAddFIlterClick}
                >
                  <FiPlus />
                </button>
                <button
                  className="btn  action_btn btn-secondary d-none"
                  type="button"
                  id="button-addon3"
                  title={cancelBtn
                    ? "Cancel" : "Search"}
                  onClick={cancelBtn
                    ? () => {
                      setCancelBtn(false)
                      props.setApiCall(true)
                      setState(initialFormState)
                    } : () => handleSearch()}
                >
                  {cancelBtn
                    ? "Cancel" : "Search"}
                </button>
              </>
            )}
          </div>
          {/*----ERROR MESSAGE FOR EMAIL----*/}
          {errors.json_item && (
            <span key={errors.json_item} className="text-danger font-size-3">
              {errors.json_item}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddFilter;
