import React, { useEffect, useState } from "react";
import SendMailForm from "../forms/user/sendMailForm";
import { GetAgent, getallAdminData } from "../../api/api";
import Loader from "../common/loader";
import { Link } from "react-router-dom";

export default function ContactPage(props) {
  const user_type = localStorage.getItem("userType");
  let [loading, setLoading] = useState(false)
  let [adminData, setAdminData] = useState()
  let [agentData, setAgentData] = useState()

  /*Function to get the admin admin data */
  const getData = async () => {
    try {
      setLoading(true)
      let adminRes = await getallAdminData()
      if (props.admin_id && (props.admin_id !== "0")) {
        // Safely find admin data with proper null checks
        const admin = adminRes?.data?.find((item) => item.admin_id === props.admin_id)
        setAdminData(admin || null)
      } else {
        const admin = adminRes?.data?.filter((item) => item.admin_type === "super-admin")
        setAdminData(admin || null)
      }

      if (props.agent_id) {
        let agentRes = await GetAgent(props.agent_id)
        // Safely get agent data with proper null checks
        const agent = agentRes?.data?.data?.[0]
        setAgentData(agent || null)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching contact data:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="activity_container profile_id_card">
      {loading ?
        <Loader />
        : <div className="row m-0">
          {props.admin_id && props.admin_id !== "0" ?
            <div className="p-10 col-6">
              <div className="card mx-auto">
                <div className="row no-gutters">
                  <div className="col-md-4 ">
                    <img
                      src={adminData?.profile_image ? adminData?.profile_image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                      className=" mx-2 mb-2 mt-2"
                      alt="Profile"
                      width={"95%"}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title mb-2">Assigned Admin</h5>
                      <h5 className="card-title mb-2">
                        {adminData?.name || "N/A"}
                        {adminData?.admin_type && <small> ({adminData.admin_type})</small>}
                      </h5>
                      <p className="card-text d-none">
                        <b>Address</b>: { }
                      </p>
                      <p className="card-text">
                        <b>Phone</b>: <Link className="text-decoration-none text-dark" to={`tel:${adminData?.contact_no}`}>{adminData?.contact_no || "N/A"}</Link>
                      </p>
                      <p className="card-text">
                        <b>Email</b>:<Link className="text-decoration-none text-dark" to={`mailto:${adminData?.email}`}> {adminData?.email || "N/A"}</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : (adminData || []).map((item) =>
              <div className="p-10 col-6">
                <div className="card mx-auto">
                  <div className="row no-gutters">
                    <div className="col-md-4 ">
                      <img
                        src={item?.profile_image ? item?.profile_image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                        className=" mx-2 mb-2 mt-2"
                        alt="Profile"
                        width={"95%"}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title mb-2">Assigned Admin</h5>
                        <h5 className="card-title mb-2">
                          {item?.name || "N/A"}
                          {item?.admin_type && <small> ({item.admin_type})</small>}
                        </h5>
                        <p className="card-text d-none">
                          <b>Address</b>: { }
                        </p>
                        <p className="card-text">
                          <b>Phone</b>: <Link className="text-decoration-none text-dark" to={`tel:${item?.contact_no}`}>{item?.contact_no || "N/A"}</Link>
                        </p>
                        <p className="card-text">
                          <b>Email</b>:<Link className="text-decoration-none text-dark" to={`mailto:${item?.email}`}> {item?.email || "N/A"}</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          <div className={props.agent_id ? "p-10 col-6 border-left border-right" : "d-none"}>
            <div className="card mx-auto">
              <div className="row no-gutters">
                <div className="col-md-4 ">
                  <img
                    src={agentData?.profile_image ? agentData?.profile_image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                    className=" mx-2 mb-2 mt-2"
                    alt="Profile"
                    width={"95%"}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title mb-2">Referred Partner</h5>
                    <h5 className="card-title mb-2">
                      {agentData?.name || "N/A"}
                      <small> (Partner)</small>
                    </h5>
                    <p className="card-text d-none">
                      <b>Address</b>: { }
                    </p>
                    <p className="card-text">
                      <b>Phone</b>:<Link className="text-decoration-none text-dark" to={`tel:${agentData?.contact_no}`}>{agentData?.contact_no || "N/A"}</Link>
                    </p>
                    <p className="card-text">
                      <b>Email</b>: <Link className="text-decoration-none text-dark" to={`mailto:${agentData?.email}`}>{agentData?.email || "N/A"}</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {user_type === "agent" || user_type === "" ? null : (
            <div className="p-10 col d-none">
              <h5>Send Email to Us</h5>
              <SendMailForm email={props.email} />
              {/* <form>
            <div className="row pt-7">
              <div className="form-group col-12 p-0">
                <label
                  htmlFor="subject"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Subject: <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <input
                    maxLength={20}
                    name="subject"
                    value={state.subject || ""}
                    onChange={onInputChange}
                    type="text"
                    className={
                      errors.subject
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    placeholder="subject"
                    id="subject"
                  />
                </div>
                ----ERROR MESSAGE FOR name----
                {errors.subject && (
                  <span
                    key={errors.subject}
                    className="text-danger font-size-3"
                  >
                    {errors.subject}
                  </span>
                )}
              </div>
              <div className="form-group col-12 p-0">
                <label
                  htmlFor="description"
                  className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
                >
                  Description: <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <div
                    className={
                      errors.description
                        ? "border border-danger rounded overflow-hidden"
                        : "border rounded overflow-hidden"
                    }
                  >
                    <textarea
                      name="description"
                      value={state.description}
                      onChange={onInputChange}
                      rows={8}
                      style={{ height: "140px" }}
                      className={
                        errors.description
                          ? "form-control border border-danger"
                          : "form-control"
                      }
                      id="description"
                      placeholder="Add Note here"
                    ></textarea>
                  </div>
                  ----ERROR MESSAGE FOR DESRIPTION----
                  {errors.description && (
                    <span
                      key={errors.description}
                      className="text-danger font-size-3"
                    >
                      {errors.description}
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group col-12 text-center">
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
                    onClick={(e) => onContactusClick(e)}
                    className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                    type="button"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form> */}
            </div>
          )}
        </div>}
    </div >
  );
}
