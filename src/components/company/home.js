import React from "react";
import EmployeeFooter from "../common/footer";
import EmployeeHeader from "../common/header";
import EmployeeBox from "./employeeBox";
import SearchForm from "../common/search_form";
function EmployerHome() {
  return (
    <div>
      <EmployeeHeader />
      <div className="position-relative z-index-1 bg-home-banner pt-26 pb-26 dark-mode-texts">
        {/* <div className="pos-abs-tr h-100">
                    <img src="image/patterns/globe-pattern.png" alt="" className="h-100" />
                </div> */}
        <div className="container position-static hero_container">
          <div className="row position-relative align-items-center justify-content-center position-static w-80">
            {/* <!-- Hero Form --> */}
            <div className="col-lg-12 col-12 translateY-25 pt-lg-12 pb-lg-33 pb-md-28 pb-xs-26 pb-29 pt-md-20">
              <SearchForm />
            </div>
            {/* <!-- End Hero Form --> */}
          </div>
          <div className="row m-0 job_filter_block">
            <div className="card job_filter_card">
              <div className="card-body row m-0">
                <h4 className="card-title text-dark text-left mb-7 w-100">
                  Employee by Location
                </h4>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Canada
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  USA
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  India
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  UK
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Mexico
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Canada
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  USA
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  India
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  UK
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Mexico
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Canada
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  USA
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  India
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  UK
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Mexico
                </button>
              </div>
            </div>
            <div className="card job_filter_card">
              <div className="card-body row m-0">
                <h4 className="card-title text-dark text-left mb-7 w-100">
                  Employee by Category
                </h4>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Canada
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  USA
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  India
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  UK
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Mexico
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Canada
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  USA
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  India
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  UK
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Mexico
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Canada
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  USA
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  India
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  UK
                </button>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm job_filter_btn mb-4 mr-4"
                >
                  Mexico
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Hero Area --> */}
      {/* <!-- featuredJobOne Area --> */}
      <section className="bg-athens pt-12 pt-lg-32 pb-7 pb-lg-25">
        <div className="container">
          {/* <!-- Section Title --> */}
          <div className="row justify-content-center mb-lg-16 mb-11">
            <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-10 text-center">
              <h2 className="mb-6 mb-lg-7 text-black-2 font-size-10">
                Featured Employee
              </h2>
              <p className="px-xs-3 px-md-12 px-lg-8 px-xl-8 px-xxl-6 font-size-5 mb-0">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews to start.
              </p>
            </div>
          </div>
          {/* <!-- Section Title End --> */}
          <div className="row justify-content-center">
            <EmployeeBox swap={true} />
            <EmployeeBox />
            <EmployeeBox />
            <EmployeeBox />
            <EmployeeBox />
            <EmployeeBox />
          </div>
        </div>
      </section>
      {/* <!-- featuredJobOne Area --> */}

      {/* <!-- category Area --> */}
      <div className="pb-13 pb-lg-25 bg-gradient-2">
        {/* <!-- Company Area Start --> */}
        <div className="pt-29 pt-lg-30 pb-10 pb-lg-22">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title mb-9 text-center">
                  <h5 className="font-size-5 font-weight-normal text-gray">
                    Get hired in top companies
                  </h5>
                </div>
              </div>
            </div>
            {/* <!-- Brand Logos --> */}
            <div className="row align-items-center justify-content-center justify-content-lg-between gr-opacity-5">
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-1.png" alt="" />
              </div>
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="300"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-2.png" alt="" />
              </div>
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-3.png" alt="" />
              </div>
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="700"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-4.png" alt="" />
              </div>
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="900"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-5.png" alt="" />
              </div>
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="1200"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-6.png" alt="" />
              </div>
            </div>
            <div className="row align-items-center justify-content-center justify-content-lg-between gr-opacity-5">
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-3.png" alt="" />
              </div>
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="700"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-4.png" alt="" />
              </div>
              {/* <!-- Single Brand --> */}
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-1.png" alt="" />
              </div>
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="300"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-2.png" alt="" />
              </div>

              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="900"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-5.png" alt="" />
              </div>
              {/* <!-- Single Brand --> */}
              <div
                className="single-brand-logo mx-5 my-6"
                data-aos="fade-in"
                data-aos-duration="800"
                data-aos-delay="1200"
                data-aos-once="true"
              >
                <img src="image/l1/png/brand-light-logo-6.png" alt="" />
              </div>
            </div>
            {/* <!-- End Brand Logos --> */}
          </div>
        </div>
        {/* <!-- Company Area End --> */}
        <div className="">
          <div className="container">
            <hr className="pt-13 pt-lg-20" />
            {/* <!-- Section Top --> */}
            <div className="row align-items-center justify-content-center">
              {/* <!-- Section Title --> */}
              <div className="col-12 col-xl-6 col-lg-7 col-md-9">
                <div className="text-center mb-12 mb-lg-17">
                  <h2 className="font-size-10 font-weight-bold mb-8">
                    Explore by category
                  </h2>
                  <p className="font-size-5 px-5 px-lg-7 px-xl-9 px-xxl-15 mb-6">
                    Leverage agile frameworks to provide a robust synopsis for
                    high level overviews to start.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- End Section Top --> */}
            <div
              className="row justify-content-center"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-once="true"
            >
              {/* <!-- Single Category --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
                <a
                  href="http://localhost:3000/"
                  className="bg-white border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-2 mb-9 d-block w-100 text-center"
                >
                  <div className="text-white bg-blue square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                    <i className="fa fa-briefcase"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                      Business Development
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray">
                      <span>415</span> Vacancy
                    </p>
                  </div>
                </a>
              </div>
              {/* <!-- End Single Category --> */}
              {/* <!-- Single Category --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
                <a
                  href="http://localhost:3000/"
                  className="bg-white border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-2 mb-9 d-block w-100 text-center"
                >
                  <div className="text-white bg-spray square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                    <i className="fa fa-headset"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                      Customer Service
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray">
                      <span>415</span> Vacancy
                    </p>
                  </div>
                </a>
              </div>
              {/* <!-- End Single Category --> */}
              {/* <!-- Single Category --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
                <a
                  href="http://localhost:3000/"
                  className="bg-white border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-2 mb-9 d-block w-100 text-center"
                >
                  <div className="text-white bg-coral square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                    <i className="fa fa-layer-group"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                      Development
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray">
                      <span>415</span> Vacancy
                    </p>
                  </div>
                </a>
              </div>
              {/* <!-- End Single Category --> */}
              {/* <!-- Single Category --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
                <a
                  href="http://localhost:3000/"
                  className="bg-white border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-2 mb-9 d-block w-100 text-center"
                >
                  <div className="text-white bg-red square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                    <i className="fa fa-pen-nib"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                      Design
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray">
                      <span>415</span> Vacancy
                    </p>
                  </div>
                </a>
              </div>
              {/* <!-- End Single Category --> */}
              {/* <!-- Single Category --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
                <a
                  href="http://localhost:3000/"
                  className="bg-white border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-2 mb-9 d-block w-100 text-center"
                >
                  <div className="text-white bg-orange square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                    <i className="fa fa-rocket"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                      Marketing &amp; Management
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray">
                      <span>415</span> Vacancy
                    </p>
                  </div>
                </a>
              </div>
              {/* <!-- End Single Category --> */}
              {/* <!-- Single Category --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
                <a
                  href="http://localhost:3000/"
                  className="bg-white border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-2 mb-9 d-block w-100 text-center"
                >
                  <div className="text-white bg-yellow square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                    <i className="fa fa-location-arrow"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                      Sales &amp; Communication
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray">
                      <span>415</span> Vacancy
                    </p>
                  </div>
                </a>
              </div>
              {/* <!-- End Single Category --> */}
              {/* <!-- Single Category --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
                <a
                  href="http://localhost:3000/"
                  className="bg-white border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-2 mb-9 d-block w-100 text-center"
                >
                  <div className="text-white bg-turquoise square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                    <i className="icon icon-sidebar-2"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                      Project Management
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray">
                      <span>415</span> Vacancy
                    </p>
                  </div>
                </a>
              </div>
              {/* <!-- End Single Category --> */}
              {/* <!-- Single Category --> */}
              <div className="col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
                <a
                  href="http://localhost:3000/"
                  className="bg-white border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-2 mb-9 d-block w-100 text-center"
                >
                  <div className="text-white bg-green square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                    <i className="fa fa-user"></i>
                  </div>
                  {/* <!-- Category Content --> */}
                  <div className="">
                    <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                      Human Resource{" "}
                    </h5>
                    <p className="font-size-4 font-weight-normal text-gray">
                      <span>415</span> Vacancy
                    </p>
                  </div>
                </a>
              </div>
              {/* <!-- End Single Category --> */}
            </div>
            <div className="row">
              <div className="col-12">
                <div className="text-center pt-5 pt-lg-13">
                  <a
                    className="btn btn-outline-black-2 btn-lg text-uppercase"
                    href="http://localhost:3000/"
                  >
                    Explore All
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- category Area --> */}

      {/* <!-- Blog area function start --> */}
      <div className="pt-11 pt-lg-24 pb-11 pb-lg-24">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-xl-7 col-lg-8 col-md-10"
              data-aos="fade-in"
              data-aos-duration="1000"
              data-aos-once="true"
            >
              {/* <!-- section-title start --> */}
              <div className="section-title text-center pb-lg-15 pb-8 px-xxl-10">
                <h2 className="mb-9 font-size-10">Quick career tips</h2>
                <p className="text-default-color font-size-5">
                  Collaboratively administrate empowered markets via
                  plug-and-play networks. Dynamically procrastinate{" "}
                </p>
              </div>
              {/* <!-- section-title end --> */}
            </div>
          </div>
          <div className="row justify-content-center">
            {/* <!-- single blog start --> */}
            <div
              className="col-xl-4 col-md-6 mb-xl-0 mb-13"
              data-aos="fade-right"
              data-aos-duration="500"
              data-aos-once="true"
            >
              {/* <!-- card start --> */}
              <div className="card bg-transparent border-0">
                {/* <!-- card img start --> */}
                <img
                  src="image/l2/png/blog-img1.png"
                  className="card-img-top"
                  alt="..."
                />
                {/* <!-- card img end --> */}
                {/* <!-- card-body start --> */}
                <div className="card-body pt-11 px-0 pb-0">
                  <a
                    href="http://localhost:3000/"
                    className="badge badge-dodger text-uppercase font-size-3 font-weight-bold px-4 py-1"
                  >
                    CV Writing
                  </a>
                  <h4>
                    <a
                      className="card-title font-size-7 mt-8 mb-6 heading-default-color"
                      href="http://localhost:3000/"
                    >
                      How to make a perfect CV that attracts the attention{" "}
                    </a>
                  </h4>
                  <p className="card-text mb-9 font-size-4">
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base.
                  </p>
                  {/* <!-- media start --> */}
                  <div className="media mb-5 pr-9">
                    {/* <!-- media img start --> */}
                    <a href="http://localhost:3000/">
                      <img
                        src="image/l2/png/blog-user-img1.png"
                        className="align-self-center circle-54 mr-3 mt-2"
                        alt=""
                      />
                    </a>
                    {/* <!-- media img start --> */}
                    {/* <!-- media body start --> */}
                    <div className="media-body pl-4 pt-2">
                      <h6 className="mb-0">
                        <a
                          className="mb-0 font-size-4 font-weight-semibold heading-default-color line-height-reset"
                          href="http://localhost:3000/"
                        >
                          Anna Frank
                        </a>
                      </h6>
                      <p className="mb-0">
                        <a
                          className="font-size-3 text-default-color"
                          href="http://localhost:3000/"
                        >
                          Creative Director
                        </a>
                      </p>
                    </div>
                    {/* <!-- media body start --> */}
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- card-body end --> */}
              </div>
              {/* <!-- card end --> */}
            </div>
            {/* <!-- single blog end --> */}
            {/* <!-- single blog start --> */}
            <div
              className="col-xl-4 col-md-6 mb-xl-0 mb-13"
              data-aos="fade-up"
              data-aos-duration="700"
              data-aos-once="true"
            >
              {/* <!-- card start --> */}
              <div className="card bg-transparent border-0">
                {/* <!-- card img start --> */}
                <a href="http://localhost:3000/">
                  <img
                    src="image/l2/png/blog-img2.png"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                {/* <!-- card img end --> */}
                {/* <!-- card-body start --> */}
                <div className="card-body pt-11 px-0 pb-0">
                  <a
                    href="http://localhost:3000/"
                    className="badge badge-dodger text-uppercase font-size-3 font-weight-bold px-4 py-1"
                  >
                    Marketing
                  </a>
                  <h4>
                    <a
                      className="card-title font-size-7 mt-8 mb-6 heading-default-color"
                      href="http://localhost:3000/"
                    >
                      Out bound marketing to get the job you want within 72 days
                    </a>
                  </h4>
                  <p className="card-text mb-9 font-size-4">
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C users
                    after installed base.
                  </p>
                  {/* <!-- media start --> */}
                  <div className="media mb-5 pr-9">
                    {/* <!-- media img start --> */}
                    <a href="http://localhost:3000/">
                      <img
                        src="image/l2/png/blog-user-img2.png"
                        className="align-self-center circle-54 mr-3 mt-2"
                        alt=""
                      />
                    </a>
                    {/* <!-- media img start --> */}
                    {/* <!-- media body start --> */}
                    <div className="media-body pl-4 pt-2">
                      <h6 className="mb-0">
                        <a
                          className="font-size-4 font-weight-semibold heading-default-color line-height-reset"
                          href="http://localhost:3000/"
                        >
                          David Herison
                        </a>
                      </h6>
                      <p className="mb-0">
                        <a
                          className="font-size-3 text-default-color"
                          href="http://localhost:3000/"
                        >
                          UX Designer
                        </a>
                      </p>
                    </div>
                    {/* <!-- media body start --> */}
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- card-body end --> */}
              </div>
              {/* <!-- card end --> */}
            </div>
            {/* <!-- single blog end --> */}
            {/* <!-- single blog start --> */}
            <div
              className="col-xl-4 col-md-6"
              data-aos="fade-left"
              data-aos-duration="500"
              data-aos-once="true"
            >
              {/* <!-- card start --> */}
              <div className="card bg-transparent border-0">
                {/* <!-- card img start --> */}
                <a href="http://localhost:3000/">
                  <img
                    src="image/l2/png/blog-img3.png"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                {/* <!-- card img end --> */}
                {/* <!-- card-body start --> */}
                <div className="card-body pt-11 px-0 pb-0">
                  <a
                    href="http://localhost:3000/"
                    className="badge badge-dodger text-uppercase font-size-3 font-weight-bold px-4 py-1"
                  >
                    Social media
                  </a>
                  <h4>
                    <a
                      className="card-title font-size-7 mt-8 mb-6 heading-default-color"
                      href="http://localhost:3000/"
                    >
                      Your social media accounts will be your new CV
                    </a>
                  </h4>
                  <p className="card-text mb-9 font-size-4">
                    Leverage agile frameworks to provide a robust synopsis for
                    high level overviews. Iterative approaches to corporate
                    strategy foster,
                  </p>
                  {/* <!-- media start --> */}
                  <div className="media mb-5 pr-9 align-items-center">
                    {/* <!-- media img start --> */}
                    <img
                      src="image/l2/png/blog-user-img3.png"
                      className="align-self-center circle-54 mr-3"
                      alt=""
                    />
                    {/* <!-- media img start --> */}
                    {/* <!-- media body start --> */}
                    <div className="media-body pl-4 pt-2">
                      <h6 className="mb-0">
                        <a
                          className="mb-0 font-size-4 font-weight-semibold heading-default-color line-height-reset"
                          href="http://localhost:3000/"
                        >
                          Benjamin Linkon
                        </a>
                      </h6>
                      <p className="mb-0">
                        <a
                          className="font-size-3 text-default-color line-height-reset"
                          href="http://localhost:3000/"
                        >
                          JavaScript Developer
                        </a>
                      </p>
                    </div>
                    {/* <!-- media body start --> */}
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- card-body end --> */}
              </div>
              {/* <!-- card end --> */}
            </div>
            {/* <!-- single blog end --> */}
          </div>
        </div>
      </div>
      {/* <!-- Blog area function end --> */}
      {/* <!-- ContentTwo Area --> */}
      <section className="bg-green position-relative">
        <div className="w-lg-50 ml-lg-auto">
          {/* <!-- gallery start --> */}
          <div
            className="gallery"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="300"
            data-aos-once="true"
          >
            {/* <!-- this content will absolute from right and top --> */}
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img1.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img2.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img3.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img4.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img5.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img6.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img7.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img8.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img9.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img10.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img11.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img12.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img13.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img14.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img15.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img16.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img17.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img18.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img19.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img20.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img21.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img22.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img23.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/l2/jpg/gallery-img24.jpg" alt="" />
            </div>
            <div className="single-item">
              <img src="image/user1.jpg" alt="" />
            </div>
          </div>
          {/* <!-- gallery end --> */}
        </div>
        <div className="container pos-lg-abs-c pt-11 pb-13 py-lg-0">
          <div className="row">
            <div
              className="col-xxl-5 col-lg-6 col-md-8 mx-auto mx-lg-0"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-once="true"
            >
              {/* <!-- content-2 start --> */}
              <div className="content-2 pr-lg-5 pr-xl-18 pr-xxl-10 text-center text-lg-left">
                {/* <!-- content-2 section title start --> */}
                <p className="text-white font-size-4 font-weight-semibold mb-8">
                  Looking for an expert for your company?
                </p>
                <h2 className="font-size-9 text-white mb-8">
                  Get applications from the world best talents.
                </h2>
                <p className="text-white font-size-5 mb-12">
                  Capitalize on low hanging fruit to identify a ballpark value
                  added activity to beta test. Override the digital divide with
                  additional clickthroughs from DevOps.
                </p>
                {/* <!-- content-2 section title end --> */}
                {/* <!-- content-2 btn start --> */}
                <a
                  className="btn btn-white btn-h-60 text-black-2 w-180 rounded-5 text-uppercase mx-auto mx-lg-0"
                  href="http://localhost:3000/"
                >
                  Post a Job
                </a>
                {/* <!-- content-2 btn end --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ContentTwo Area --> */}
      <EmployeeFooter />
    </div>
  );
}

export default EmployerHome;
