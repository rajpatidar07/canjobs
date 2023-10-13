// src/PreviewEmail.js
import React, { useState, useEffect } from "react";
import { ReadEmail } from "../../api/api";
import Loader from "../common/loader";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "../admin/sidebar";
import AdminHeader from "../admin/header";
import { useNavigate, Link } from "react-router-dom";
const PreviewEmail = () => {
  const id = localStorage.getItem("email_id");
  let navigate = useNavigate();
  let [apiCall, setApiCall] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  /* data and id states */
  const [emailData, setemailData] = useState([]);
  const [decodedData, setDecodedData] = useState("");
  /* Function to get Employee visa data*/
  const EmailData = async () => {
    setIsLoading(true);
    try {
      const Res = await ReadEmail("61");
      // // console.log(Res.data)
      if (Res.data.length === 0) {
        setemailData([]);
        setIsLoading(false);
      } else {
        setemailData(Res.data);
        // setTotalData(Res.data.total_rows);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  /*Render function to get the employee data*/
  useEffect(() => {
    EmailData();
    if (apiCall === true) {
      setApiCall(false);
    }
    const decodeQuotedPrintable = (input) => {
      return input.replace(/=([0-9A-F]{2})/g, (match, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      );
    };

    const decodedText = decodeQuotedPrintable(emailData);
    setDecodedData(decodedText);
  }, [apiCall]);

  console.log(emailData);
  return (
    /*---- Employee Profile Details Page ----*/
    <div className="site-wrapper overflow-hidden bg-default-2">
      {/* <!-- Header Area --> */}

      <AdminHeader
        heading={
          <Link
            className="d-flex align-items-center "
            onClick={() => navigate(-1)}
          >
            <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
            <span className="text-uppercase font-size-3 font-weight-bold text-gray">
              <h3 className="font-size-6 mb-0 text-capitalize">
                Email preview
              </h3>
            </span>
          </Link>
        }
      />
      {/* <!-- navbar- --> */}
      <AdminSidebar heading={"Email preview"} />

      <div
        className={"dashboard-main-container mt-12 mt-lg-12"}
        id="dashboard-body"
      >
        <ToastContainer />
        <div className="container-fluid">
          {isLoading ? (
            <div className="table-responsive main_table_div">
              <Loader />
            </div>
          ) : (
            <div className="row text-left mt-5 pt-0">
              <div className="preview-email">
                <div className="header">
                  <img src="/image/00logo-main-black.png" alt="Your Logo" />
                </div>
                <div className="content">{emailData}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewEmail;
