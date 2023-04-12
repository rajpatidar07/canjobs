import React, { useEffect } from "react";
import EmployeeHeader from "../common/header";
import EmployeeFooter from "../common/footer";
import JobBox from "../common/jobbox";
import SearchForm from "../common/search_form";
import Filterbox from "../common/filterbox";
import filterjson from "../json/filterjson";
// import { GetAllJobs } from "../../api/api";

// eslint-disable-next-line no-use-before-define
function EmployeeHomePage() {
  //   const [JobDetail, setJobDetail] = useState([]);

  //   const UserData = async () => {
  //     const jobData = await GetAllJobs();
  //     setJobDetail(jobData);
  //   };
  useEffect(() => {
    // UserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("user_id")]);

  //console.log(("JobDetail===" + JSON.stringify(JobDetail))
  return (
    <div className="site-wrapper overflow-hidden ">
      <EmployeeHeader />
      {/* <!-- Hero Area --> */}
      <div className="position-relative z-index-1 bg-home-banner pt-26 pb-26 dark-mode-texts">
        <div className="container position-static hero_container">
          <div className="row position-relative align-items-center justify-content-center position-static w-80">
            {/* <!-- Hero Form --> */}
            <div className="col-lg-12 col-12 translateY-25 pt-lg-12 pb-lg-33 pb-md-28 pb-xs-26 pb-29 pt-md-20">
              <SearchForm />
            </div>
            {/* <!-- End Hero Form --> */}
          </div>
          <div className="row m-0 job_filter_block">
            <Filterbox
              filterheading=" Jobs by Location"
              filterjson={filterjson.location}
            />
            <Filterbox
              filterheading=" Jobs by Category"
              filterjson={filterjson.category}
            />
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
                Featured Jobs
              </h2>
              <p className="px-xs-3 px-md-12 px-lg-8 px-xl-8 px-xxl-6 font-size-5 mb-0">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews to start.
              </p>
            </div>
          </div>
          {/* <!-- Section Title End --> */}
          <div className="row justify-content-center">
            <JobBox swap={true} />
            <JobBox />
            <JobBox swap={true} />
            <JobBox swap={true} />
            <JobBox />
            <JobBox />
          </div>
        </div>
      </section>
      {/* <!-- featuredJobOne Area --> */}

      {/* <!-- Category Area --> */}
      <div
        className="pt-11 pt-lg-26 pb-lg-16"
        data-aos="fade-left"
        data-aos-duration="800"
        data-aos-delay="400"
        data-aos-once="true"
      >
        <div className="container">
          {/* <!-- Section Top --> */}
          <div className="row align-items-center pb-14">
            {/* <!-- Section Title --> */}
            <div className="col-12 col-lg-6">
              <div className="text-center text-lg-left mb-13 mb-lg-0">
                <h2 className="font-size-9 font-weight-bold">
                  Explore by category
                </h2>
              </div>
            </div>
            {/* <!-- Section Button --> */}
            {/* <div className="col-12 col-lg-6">
                            <div className="text-center text-lg-right">
                                <a className="btn btn-outline-green text-uppercase" href="http://localhost:3000/">Explore All</a>
                            </div>
                        </div> */}
            {/* <!-- Section Button End --> */}
          </div>
          {/* <!-- End Section Top --> */}
          <div className="row justify-content-center">
            {/* <!-- Single Category --> */}
            <div className="category_box col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="http://localhost:3000/"
                className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
              >
                <div className="text-blue bg-blue-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-briefcase"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="text-left category_text_box">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    Business Development
                  </h5>
                  <p className="font-size-4 font-weight-bold text-secondary">
                    <span>415</span> Vacancy
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="category_box col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="http://localhost:3000/"
                className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
              >
                <div className="text-spray bg-spray-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-headset"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="text-left category_text_box">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    Customer Service
                  </h5>
                  <p className="font-size-4 font-weight-bold text-secondary">
                    <span>235</span> Vacancy
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="category_box col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="http://localhost:3000/"
                className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
              >
                <div className="text-coral bg-coral-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-layer-group"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="text-left category_text_box">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    Development
                  </h5>
                  <p className="font-size-4 font-weight-bold text-secondary">
                    <span>624</span> Vacancy
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="category_box col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="http://localhost:3000/"
                className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
              >
                <div className="text-red bg-red-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-pen-nib"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="text-left category_text_box">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    Design
                  </h5>
                  <p className="font-size-4 font-weight-bold text-secondary">
                    <span>174</span> Vacancy
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="category_box col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="http://localhost:3000/"
                className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
              >
                <div className="text-orange bg-orange-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-rocket"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="text-left category_text_box">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    Marketing &amp; Management
                  </h5>
                  <p className="font-size-4 font-weight-bold text-secondary">
                    <span>268</span> Vacancy
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="category_box col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="http://localhost:3000/"
                className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
              >
                <div className="text-yellow bg-yellow-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-location-arrow"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="text-left category_text_box">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    Sales &amp; Communication
                  </h5>
                  <p className="font-size-4 font-weight-bold text-secondary">
                    <span>156</span> Vacancy
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="category_box col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="http://localhost:3000/"
                className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
              >
                <div className="text-turquoise bg-turquoise-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="icon icon-sidebar-2"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="text-left category_text_box">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    Project Management
                  </h5>
                  <p className="font-size-4 font-weight-bold text-secondary">
                    <span>162</span> Vacancy
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="category_box col-12 col-xl-3 col-lg-4 col-sm-6 col-xs-8">
              <a
                href="http://localhost:3000/"
                className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
              >
                <div className="text-green bg-green-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                  <i className="fa fa-user"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="text-left category_text_box">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                    Human Resource{" "}
                  </h5>
                  <p className="font-size-4 font-weight-bold text-secondary">
                    <span>84</span> Vacancy
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
          </div>
        </div>
      </div>
      {/* <!-- End Category Area --> */}

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
              <div className="card bg-transparent border-0 text-left">
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
              <div className="card bg-transparent border-0 text-left">
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
              <div className="card bg-transparent border-0 text-left">
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

      <EmployeeFooter />
    </div>
  );
}
export default EmployeeHomePage;
