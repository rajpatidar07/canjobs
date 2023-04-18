import React from "react";
import { Modal } from "react-bootstrap";
import useValidation from "../../common/useValidation";
import { AddFIlter } from "../../../api//api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddFilter(props) {
  // let [adminDetails, setAdmindetails] = useState([]);
  /* Functionality to close the modal */

  const close = () => {
    setState(initialFormState);
    setErrors("");
    props.close();
  };
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
    setState({ ...state, id: props.id });
    event.preventDefault();
    if (validate()) {
      setState({ ...state, id: props.id });
      const responseData = await AddFIlter(state);
      if (responseData.message === "filter item added successfully") {
        toast.success("Filter added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        return close();
      }
    }
  };
  // END USER ADMIN PROFILE UPDATE VALIDATION
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
          className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
          data-dismiss="modal"
          onClick={close}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
          <h5 className="text-center pt-2">Add Filter Type</h5>

          <form onSubmit={onAddFIlterClick}>
            <div className="form-group ">
              <label
                htmlFor="json_item"
                className="font-size-4 text-black-2  line-height-reset"
              >
                Filter Type <span className="text-danger">*</span> :
              </label>
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
              {/*----ERROR MESSAGE FOR EMAIL----*/}
              {errors.json_item && (
                <span
                  key={errors.json_item}
                  className="text-danger font-size-3"
                >
                  {errors.json_item}
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
        </div>
      </Modal>
    </>
  );
}

export default AddFilter;
