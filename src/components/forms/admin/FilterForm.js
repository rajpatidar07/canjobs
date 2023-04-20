import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AddFIlter } from "../../../api//api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddFilter(props) {
  console.log(props);
  // let [adminDetails, setAdmindetails] = useState([]);

  // USER ADMIN PROFILE UPDATE VALIDATION

  // INITIAL STATE ASSIGNMENT
  const initialFormState = {
    id: "",
    json_item: "",
  };
  // VALIDATION CONDITIONS
  const validators = {
    json_item: [
      (value) =>
        value === "" || value.trim() === "" ? "Filter type is required" : null,
    ],
  };
  // CUSTOM VALIDATIONS IMPORT
  const { state, setState, setErrors, onInputChange, errors, validate } =
    useValidation(initialFormState, validators);

  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onAddFIlterClick = async (event) => {
    // setState({ ...state, id: props.id });
    event.preventDefault();
    if (validate()) {
      // setState({ ...state, id: props.id });
      const responseData = await AddFIlter(state, props.id);
      if (responseData.message === "filter item added successfully") {
        toast.success("Filter added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        props.setApiCall();
        setState(initialFormState);
      }
    }
  };
  // END USER ADMIN PROFILE UPDATE VALIDATION
  return (
    <div className="p-0 m-0">
      <form onSubmit={onAddFIlterClick}>
        <div className="form-group p-0">
          <div class="input-group mb-3">
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
            <button
              className="btn btn-primary "
              type="submit"
              id="button-addon2"
              style={{ height: "3rem", minWidth: "40px" }}
            >
              +{" "}
            </button>
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
