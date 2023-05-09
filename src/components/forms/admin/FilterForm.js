import React, { useState } from "react";
import useValidation from "../../common/useValidation";
import { AddFIlter } from "../../../api//api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddFilter(props) {
  let [loading, setLoading] = useState(false);
  // // console.log(props);
  // let [adminDetails, setAdmindetails] = useState([]);

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
        value === "" || value.trim() === "" ? "Filter type is required" 
        : /[-]?\d+(\.\d+)?/.test(value)
        ? "Filter type can not have a number."
        : value.length < 2
        ? "Filter type should have 2 or more letters"
        : /[^a-zA-Z0-9]/g.test(value)
        ? "Cannot use special character "
        : "",
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, onInputChange, errors, validate } = useValidation(
    initialFormState,
    validators
  );

  // FILTER UPDATE SUBMIT BUTTON
  const onAddFIlterClick = async (event) => {
    // setState({ ...state, id: props.id });
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      // setState({ ...state, id: props.id });
      const responseData = await AddFIlter(state, props.id);
      if (responseData.message === "filter item added successfully") {
        toast.success("Filter added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        props.setApiCall(true);
        setState(initialFormState);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  // END FILTER UPDATE VALIDATION
  return (
    <div className="p-0 m-0">
      <form onSubmit={onAddFIlterClick}>
        <div className="form  p-0">
          <div className="input-group mb-3">
            <input
              className={
                errors.json_item
                  ? "form-control border border-danger"
                  : "form-control"
              }
              value={state.json_item}
              onChange={onInputChange}
              id="json_item"
              name="json_item"
              type={"text"}
              placeholder="Type"
            />
            {loading === true ? (
              <button
                className="btn action_btn btn-primaryy"
                type="button"
                disabled
                // style={{ height: "3rem", minWidth: "40px" }}
              >
                <div class="spinner-border spinner-border-sm" role="status">
                </div>
              </button>
            ) : (
              <button
                className="btn  action_btn btn-primary "
                type="submit"
                id="button-addon2"
                // style={{ height: "3rem", minWidth: "40px" }}
                title="Add Filter"
              >
                +
              </button>
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
