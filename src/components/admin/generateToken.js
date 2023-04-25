import React, { useState, useEffect } from "react";
import { getallAdminData, GetAdminToken } from "../../api/api";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
export default function GenerateToken(props) {
  let [allAdmin, setAllAdmin] = useState([]);
  let [AdminId, setAdminId] = useState("");
  const [state, setState] = useState([]);
  let navigate = useNavigate("");
  const AdminData = async () => {
    const userData = await getallAdminData();
    setAllAdmin(userData.data);
  };
  /* Functionality to close the modal */
  const close = () => {
    setState([]);
    setAdminId("");
    props.close();
  };
  useEffect(() => {
    AdminData();
  }, [props]);

  // USER ADMIN PROFILE UPDATE SUBMIT BUTTON
  const onSelectChange = (option) => {
    setAdminId(option.value);
  };
  useEffect(() => {
    const options = allAdmin.map((option) => ({
      value: option.admin_id,
      label: option.name + " - " + option.admin_type,
    }));
    setState(options);
  }, [allAdmin]);

  const onTokenGenerateClick = async (event) => {
    event.preventDefault();
    // setLoading(true);
    const responseData = await GetAdminToken(AdminId);
    if (responseData.message === "successful") {
      localStorage.setItem("token", responseData.token);
      toast.success("Token Generated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      close();
      navigate("/dashboard");
    }
  };
  const onRest = () => {
    localStorage.setItem("view_as_token", "");
    toast.success("Token Reset successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
    close();
    navigate("/dashboard");
  };
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
        <div className="bg-white rounded h-100 px-11 pt-15">
          {/* CHANGE PASSWORD FORM */}
          <form onSubmit={onTokenGenerateClick}>
            {/* FORM FIELDS */}
            <div className="form-group w-100 ">
              <label
                htmlFor="view_layout"
                className="font-size-4 text-black-2  line-height-reset"
              >
                View as Layout :
              </label>
              <Select
                options={state}
                onChange={onSelectChange}
                id="view_layout"
                className="mx-1"
              />
            </div>
            {/* END FORM FIELDS  */}
            <div className="form-group text-center">
              <button
                className="btn  btn-secondary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
                Generate Token
              </button>{" "}
              <button
                className="btn btn-primary rounded-5 text-uppercase mx-5"
                onClick={onRest}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {/* END CHANGE PASSWORD FORM */}
    </>
  );
}
