import React, { useEffect, useState /*useEffect*/ } from "react";
import { Link /*useNavigate*/ } from "react-router-dom";
import ChangePassword from "../common/changepassword";
import { toast } from "react-toastify";
import GenerateToken from "./generateToken";
import { getAllAdminNotification } from "../../api/api";

const AdminHeader = (props) => {
  /*States */
  const [showChangePass, setShowChangePass] = useState(false);
  const [showGeneratToken, setShowGenerateToken] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [notification, setNotiication] = useState("");
  let Admin = localStorage.getItem("admin")

  /*Function to Call Notification Api */
  const Notiication = async () =>{
   let Response = await getAllAdminNotification()
   setNotiication(Response.Data.data)
   
  }
  /*Render Mewthod to get Notification */
  useEffect(() =>{
    Notiication()
  },[])
  return (
    <header className="site-header admin_header site-header--menu-right bg-default position-fixed py-2 site-header--absolute rounded-8">
      <div className="container-fluid-fluid px-7">
        <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
          {/* <!-- Page Heading--> */}

          <h3 className="font-size-6 mb-0">{props.heading}</h3>
          <div className="collapse navbar-collapse" id="mobile-menu"></div>
          {/* <div className="form-group w-50 d-flex">
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
            />{" "}
            <button
              className="btn btn-secondary rounded-5 text-uppercase mx-5"
              type="submit"
              onClick={onTokenGenerateClick}
            >
              Generate Token
            </button>
            <button
              className="btn btn-primary rounded-5 text-uppercase mx-5"
              onClick={onRest}
            >
              Reset
            </button>
          </div> */}
          <div  className="dropdown show-gr-dropdown py-5">
              <Link
                to={""}
                role="button"
                id="dropdownMenuNotification"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="px-3 ml-7 font-size-7 notification-block flex-y-center position-relative"
              >
                <i className="fas fa-bell heading-default-color"></i>
                <span className="font-size-3 count font-weight-semibold text-white bg-primary circle-24 border border-width-3 border border-white">
                  {notification.length}
                </span>
              </Link>
                    <ul className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
                  aria-labelledby="dropdownMenuNotification">
                      {(notification || []).map((data,i) =>
                      i >= 10 ? null :
                      <li
                        key={data.id}
                        to={""}
                        className="dropdown-item py-2 font-size-3 text-wrap font-weight-semibold line-height-1p2 text-capitalize"
                      >
                      {i + 1}. {data.message}
                      </li>)}
                    </ul>
            </div>
          <div className="header-btn-devider ml-auto ml-lg-5 pl-2 d-none d-xs-flex align-items-center">
            
            <div>
              <div className="dropdown show-gr-dropdown py-5">
                <Link
                  to={""}
                  className="proile media ml-7 flex-y-center pt-3"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onMouseOut={() => setDropDown(false)}
                >
                  <div> <h6>Hii ! {Admin}</h6></div>
                  <i className="fas fa-chevron-down heading-default-color px-3 mb-2"></i>
                </Link>
                <div
                  className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
                  aria-labelledby="dropdownMenuLink"
                >
                <Link
                  to={"/adminprofile"}
                  className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-capitalize"
                >
                  Edit Profile
                </Link>
                 

                  <Link
                    to={""}
                    onClick={() => setShowGenerateToken(true)}
                    className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-capitalize"
                  >
                    View as
                  </Link>
                  {dropDown ? (
                    <ul className="list-unstyled">
                      <li></li>
                    </ul>
                  ) : null}
                  <Link
                    to={""}
                    onClick={() => setShowChangePass(true)}
                    className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-capitalize"
                  >
                    Setting
                  </Link>
                  {/*<--Logout Functionality-->*/}
                  <Link
                    to={"/adminlogin"}
                    onClick={() => {
                      localStorage.clear(); // clear the local storage
                      toast.error("Log Out Successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000,
                      });
                    }}
                    className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-capitalize"
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/*<-- Change password Modal -->*/}
     {showChangePass ? <ChangePassword
        show={showChangePass}
        close={() => setShowChangePass(false)}
      /> : null}
      {/*<-- Generate Token Modal -->*/}
      {showGeneratToken ? <GenerateToken
        show={showGeneratToken}
        close={() => setShowGenerateToken(false)}
      /> : null}
    </header>
  );
};
export default AdminHeader;
