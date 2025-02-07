import React, { useState, useEffect } from "react";
import { getallAdminData, GetAdminToken } from "../../api/api";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
export default function GenerateToken(props) {
  /*States */
  let [allAdmin, setAllAdmin] = useState([]);
  let [AdminId, setAdminId] = useState("");
  let [AdminType, setAdminType] = useState("");
  const [state, setState] = useState([]);
  let [Unauthorized, setUnauthorized] = useState("")

  /*Function to get admin list */
  const AdminData = async () => {
    try {
      const userData = await getallAdminData();
      if (userData.data.length === 0) {
        setAllAdmin([]);
      } else {
        const filteredData = userData.data.filter(item => item.admin_type === "manager");
        setAllAdmin(filteredData);
      }
    } catch (err) {
      console.log(err)
    }
  };

  /* Functionality to close the modal */
  const close = () => {
    setState([]);
    setAdminId("");
    setUnauthorized("")
    props.close();
  };
  /*Render function to get admin list */
  useEffect(() => {
    AdminData();
  }, [props]);

  // GENERATE ADMIN TOKEN UPDATE SUBMIT BUTTON
  const onSelectChange = (option) => {
    setAdminId(option.value.admin_id);
    setAdminType(option.value.admin_type)
  };
  /*Render function to set data in search select box */
  useEffect(() => {
    const options = allAdmin.map((option) => ({
      value: option,
      label: option.name + " - " + option.admin_type,
    }));
    setState(options);
  }, [allAdmin]);

  /*Function to generate Token of other admin to view as him */
  const onTokenGenerateClick = async (event) => {
    event.preventDefault();
    try {
      const responseData = await GetAdminToken(AdminId);
      if (responseData.message === "successful") {
        localStorage.setItem("view_as_token_admin_type", AdminType);
        localStorage.setItem("view_as_token", responseData.token);
        toast.success("Token Generated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        close();
        window.reload();
      }
      if (responseData.message === "Unauthorized admin") {
        setUnauthorized("Unauthorized admin")
      }
    } catch (err) {
      console.log(err)
    }
  };
  /*Function to reset the token */
  const onRest = () => {
    localStorage.setItem("view_as_token", "");
    localStorage.setItem("view_as_token_admin_type", "");
    toast.success("Token Reset successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
    close();
    window.reload();
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
        <div className="bg-white rounded h-100 px-11 pt-15">
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
                className="text-capitalize mx-1"
              />
              <small className="text-danger">{Unauthorized}</small>
            </div>
            {/* END FORM FIELDS  */}
            <div className="form-group text-center">
              <button
                className="btn  btn-secondary btn-small w-25 rounded-5 text-uppercase"
                type="submit"
              >
                View as
              </button>
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
    </>
  );
}
