import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./loginModal";
import SingUp from "./singUpModal";

function EmployeeFooter() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSingUp, setShowSingUp] = useState(false);
  return (
    <footer className="footer bg-ebony-clay dark-mode-texts">
      <div className="container">
        {/* <!-- Cta section --> */}
        <div className="pt-11 pt-lg-20 pb-13 pb-lg-20 border-bottom border-width-1 border-default-color-2">
          <div className="row justify-content-center ">
            <div
              className="col-xl-7 col-lg-12"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-once="true"
            >
              {/* <!-- cta-content start --> */}
              <div className="pb-xl-0 pb-9 text-xl-left text-center">
                <h2 className="text-white font-size-8 mb-4">
                  Most comprehensive job portal
                </h2>
                <p className="text-hit-gray font-size-5 mb-0">
                  We must explain to you how all this mistaken idea of
                  denouncing
                </p>
              </div>
              {/* <!-- cta-content end --> */}
            </div>
            <div
              className="col-xl-5 col-lg-12"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-once="true"
            >
              {/* <!-- cta-btns start --> */}
              <div className="btns d-flex justify-content-xl-end justify-content-center align-items-xl-center flex-wrap h-100  mx-n4">
                {/* <!-- Modal for Login--> */}
                <Link
                  className="btn btn-outline-gallery btn-xl mx-4 mt-6 text-uppercase"
                  to={""}
                  onClick={() => setShowLogin(true)}
                >
                  Log in
                </Link>
                <Login show={showLogin} close={() => setShowLogin(false)} />
                {/* <!-- Modal for SingUp--> */}
                <button
                  className="btn btn-green btn-h-60 btn-xl mx-4 mt-6 text-uppercase"
                  to={""}
                  onClick={() => setShowSingUp(true)}
                >
                  Sign up
                </button>
                <SingUp show={showSingUp} close={() => setShowSingUp(false)} />
              </div>
              {/* <!-- cta-btns end --> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container  pt-12 pt-lg-19 pb-10 pb-lg-19">
        <div className="row text-left">
          <div className="col-lg-4 col-sm-6 mb-lg-0 mb-9">
            {/* <!-- footer logo start --> */}
            <img
              src="image/logo-main-white.png"
              alt=""
              className="footer-logo mb-14"
            />
            {/* <!-- footer logo End --> */}
            {/* <!-- media start --> */}
            <div className="media mb-11">
              <img
                src="image/l1/png/message.png"
                className="align-self-center mr-3"
                alt=""
              />
              <div className="media-body pl-5">
                <p className="mb-0 font-size-4 text-white">Contact us at</p>
                <a
                  className="mb-0 font-size-4 font-weight-bold"
                  href="mailto:support@uxtheme.net"
                >
                  support@uxtheme.net
                </a>
              </div>
            </div>
            {/* <!-- media start --> */}
            {/* <!-- widget social icon start --> */}
            <div className="social-icons">
              <ul className="pl-0 list-unstyled d-flex align-items-end ">
                <li className="d-flex flex-column justify-content-center px-3 mr-3 font-size-4 heading-default-color">
                  Follow us on:
                </li>
                <li className="d-flex flex-column justify-content-center px-3 mr-3">
                  <a
                    href="http://localhost:3000/"
                    className="hover-color-primary heading-default-color"
                  >
                    <i className="fab fa-facebook-f font-size-3 pt-2"></i>
                  </a>
                </li>
                <li className="d-flex flex-column justify-content-center px-3 mr-3">
                  <a
                    href="http://localhost:3000/"
                    className="hover-color-primary heading-default-color"
                  >
                    <i className="fab fa-twitter font-size-3 pt-2"></i>
                  </a>
                </li>
                <li className="d-flex flex-column justify-content-center px-3 mr-3">
                  <a
                    href="http://localhost:3000/"
                    className="hover-color-primary heading-default-color"
                  >
                    <i className="fab fa-linkedin-in font-size-3 pt-2"></i>
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- widget social icon end --> */}
          </div>
          <div className="col-lg-8 col-md-6">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                <div className="footer-widget widget2 mb-md-0 mb-13">
                  {/* <!-- footer widget title start --> */}
                  <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                    Company
                  </p>
                  {/* <!-- footer widget title end --> */}
                  {/* <!-- widget social menu start --> */}
                  <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        About us
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Contact us
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Careers
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Press
                      </a>
                    </li>
                  </ul>
                  {/* <!-- widget social menu end --> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                <div className="footer-widget widget3 mb-sm-0 mb-13">
                  {/* <!-- footer widget title start --> */}
                  <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                    Product
                  </p>
                  {/* <!-- footer widget title end --> */}
                  {/* <!-- widget social menu start --> */}
                  <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Features{" "}
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Pricing
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        News
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Help desk
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Support
                      </a>
                    </li>
                  </ul>
                  {/* <!-- widget social menu end --> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                <div className="footer-widget widget4 mb-sm-0 mb-13">
                  {/* <!-- footer widget title start --> */}
                  <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                    Services
                  </p>
                  {/* <!-- footer widget title end --> */}
                  {/* <!-- widget social menu start --> */}
                  <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Digital Marketing
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        SEO for Business
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Avasta Dash
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        UI Design
                      </a>
                    </li>
                  </ul>
                  {/* <!-- widget social menu end --> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                <div className="footer-widget widget4">
                  {/* <!-- footer widget title start --> */}
                  <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                    Legal
                  </p>
                  {/* <!-- footer widget title end --> */}
                  <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li className="mb-6">
                      <a
                        className="heading-default-color font-size-4 font-weight-normal"
                        href="http://localhost:3000/"
                      >
                        Return Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default EmployeeFooter;
