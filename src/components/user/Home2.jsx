import React, { useEffect, useState } from "react";
// import EmployeeHeader from "../common/header";
// import EmployeeFooter from "../common/footer";
// import SearchForm from "../common/search_form";
import { GetAllDataCount/*, getJson*/ } from "../../api/api";
import { Link } from "react-router-dom";
// import SelectBox from "../common/Common function/SelectBox";

function Home2() {
    const [Count, setCount] = useState([]);
    // const [jobsNo, setJobsNo] = useState(6);
    // const [jobCount, setJobCount] = useState();
    // const [totaljob, setTotalJob] = useState();
    // const [search, setSearch] = useState();
    // const [categoryFilterValue, setCategoryFilterValue] = useState("");
    // const [SkillFilterValue, setSkillFilterValue] = useState("");
    // const [jobSwapFilterValue, setJobSwapFilterValue] = useState("");
    // const [jobLocation, setJobLocation] = useState("");
    // let [Json, setJson] = useState([]);

    // const JsonData = async () => {
    //     try {
    //         let Json = await getJson();
    //         setJson(Json);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     JsonData();
    // }, [categoryFilterValue, SkillFilterValue, jobSwapFilterValue, jobLocation]);

    // let onReset = () => {
    //     setCategoryFilterValue("");
    //     setSkillFilterValue("");
    //     setJobSwapFilterValue("");
    //     setJobLocation("");
    //     setSearch("");
    // };

    const CountData = async () => {
        const res = await GetAllDataCount();
        setCount(res.data);
    };

    useEffect(() => {
        CountData();
    }, []);

    return (
        <div className="site-wrapper overflow-hidden">
            {/* <EmployeeHeader />
       */}
            <div className="brand-logo p-7">
                {/* <Link to={userType ? "/" : "/main_home"}> */}
                {/* <!-- light version logo (logo must be black // eslint-disable-next-line)--> */}
                <img
                    src="image/00logo-main-black.png"
                    alt=""
                    className="light-version-logo default-logo"
                    style={{ maxWidth: "160px" }}
                />
                {/* <!-- Dark version logo (logo must be White)--> */}
                <img
                    src="image/logo-main-white.png"
                    alt=""
                    className="dark-version-logo"
                />
                {/* </Link> */}
            </div>

            {/* Enhanced Hero Section with About Content */}
            <div className="position-relative z-index-1 bg-home-banner pt-26 pb-26 dark-mode-texts">
                <div className="container position-static hero_container">
                    <div className="row position-relative align-items-center justify-content-center position-static">
                        <div className="col-lg-10 col-12 translateY-25 pt-lg-12 pb-lg-33 pb-md-28 pb-xs-26 pb-29 pt-md-20">
                            <div className="text-center text-white">
                                <h1 className="display-3 font-weight-bold mb-4">
                                    Welcome to CanPathwaysJobs
                                </h1>
                                <p className="text-light mb-5 px-lg-10">
                                    Your trusted partner in career development and employment
                                    opportunities. We are dedicated to connecting job seekers with
                                    top employers across various industries, ensuring a seamless
                                    and efficient job search experience.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission, Vision, Values Section */}
            <div className="pt-lg-26 pb-lg-20 pt-15 pb-15 bg-default-1">
                <div className="container">
                    <div className="row justify-content-center mb-15">
                        <div className="col-lg-8 text-center">
                            <h2 className="font-size-10 mb-4">Our Foundation</h2>
                            <p className="font-size-5 text-default-color">
                                Built on strong principles that guide everything we do
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        {/* Mission */}
                        <div className="col-lg-4 col-md-6 mb-10">
                            <div className="bg-white rounded-4 p-8 h-100 shadow-hover transition-all">
                                <div className="text-center mb-6">
                                    <div className="text-center mb-6">
                                    <div
                                        className="bg-green text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                                        style={{ width: "80px", height: "80px" }}
                                    >
                                        <i className="fa fa-eye font-size-8"></i>
                                    </div>
                                </div>
                                </div>
                                <h4 className="font-size-6 font-weight-semibold text-center mb-4">
                                    Our Mission
                                </h4>
                                <p className="font-size-4 text-default-color text-center line-height-1-8">
                                    To empower individuals and businesses by providing a
                                    comprehensive platform that bridges the gap between talent and
                                    opportunity. We foster a community where job seekers and
                                    employers can connect, collaborate, and grow together.
                                </p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="col-lg-4 col-md-6 mb-10">
                            <div className="bg-white rounded-4 p-8 h-100 shadow-hover transition-all">
                                <div className="text-center mb-6">
                                    <div
                                        className="bg-green text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                                        style={{ width: "80px", height: "80px" }}
                                    >
                                        <i className="fa fa-eye font-size-8"></i>
                                    </div>
                                </div>
                                <h4 className="font-size-6 font-weight-semibold text-center mb-4">
                                    Our Vision
                                </h4>
                                <p className="font-size-4 text-default-color text-center line-height-1-8">
                                    To become the leading job portal, recognized for our
                                    commitment to innovation, inclusively, and excellence. We
                                    strive to create a positive impact on the lives of job seekers
                                    and employers worldwide.
                                </p>
                            </div>
                        </div>

                        {/* Values */}
                        <div className="col-lg-4 col-md-12 mb-10">
                            <div className="bg-white rounded-4 p-8 h-100 shadow-hover transition-all">
                                <div className="text-center mb-6">
                                    <div
                                        className="bg-red text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                                        style={{ width: "80px", height: "80px" }}
                                    >
                                        <i className="fa fa-heart font-size-8"></i>
                                    </div>
                                </div>
                                <h4 className="font-size-6 font-weight-semibold text-center mb-4">
                                    Our Values
                                </h4>
                                <p className="font-size-4 text-default-color text-center line-height-1-8">
                                    Innovation drives us forward, integrity guides our actions,
                                    and inclusively ensures everyone has equal opportunities. We
                                    believe in transparency, excellence, and building lasting
                                    relationships.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Story & Team Section */}
            {/* <div className="pt-lg-20 pb-lg-20 pt-15 pb-15">
        <div className="container">
          <div className="row align-items-center mb-15">
            <div className="col-lg-6 mb-8 mb-lg-0">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our Team"
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
            <div className="col-lg-6 pl-lg-10">
              <h2 className="font-size-9 mb-6">Our Story</h2>
              <p className="font-size-4 text-default-color mb-4 line-height-1-8">
                Founded with a vision to transform the job search experience,
                CanPathwaysJobs was established to create meaningful connections
                between job seekers and employers. Our journey began with a
                simple idea: to provide a user-friendly platform that empowers
                individuals to take control of their careers.
              </p>
              <p className="font-size-4 text-default-color line-height-1-8">
                Over the years, we have grown into a trusted resource, helping
                thousands of professionals find their dream jobs and companies
                to discover top talent. Our commitment to innovation and
                excellence drives us to continuously improve our platform.
              </p>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6 order-2 order-lg-1 pl-lg-0 pr-lg-10">
              <h2 className="font-size-9 mb-6">Our Team</h2>
              <p className="font-size-4 text-default-color mb-4 line-height-1-8">
                Our team is composed of passionate professionals who are
                dedicated to helping you succeed. With expertise in various
                industries, our team members bring a wealth of knowledge and
                experience, ensuring that you receive the best possible service.
              </p>
              <p className="font-size-4 text-default-color line-height-1-8">
                We believe in the power of collaboration and continuous
                learning, which enables us to stay ahead of industry trends and
                provide innovative solutions.
              </p>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 mb-8 mb-lg-0">
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Office"
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div> */}

            {/* Why Choose Us Section */}
            <div className="bg-default-1 pt-lg-20 pb-lg-20 pt-15 pb-15">
                <div className="container">
                    <div className="row justify-content-center mb-15">
                        <div className="col-lg-8 text-center">
                            <h2 className="font-size-10 mb-4">Why Choose CanPathwaysJobs?</h2>
                            <p className="font-size-5 text-default-color">
                                We provide exceptional services that set us apart from the
                                competition
                            </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-10">
                            <div className="bg-white rounded-4 p-8 text-center h-100 shadow-hover transition-all">
                                <div className="mb-6">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMYPBCvXeUyD3l0S8NjB5mR33_bhHbf-AFNA&s"
                                        alt="Easy to Use"
                                        className="rounded-circle shadow-sm"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <h4 className="font-size-6 font-weight-semibold mb-4">
                                    Easy to Use
                                </h4>
                                <p className="font-size-4 text-default-color line-height-1-8">
                                    Our platform is user-friendly and designed to make your job
                                    search experience as smooth and efficient as possible.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 mb-10">
                            <div className="bg-white rounded-4 p-8 text-center h-100 shadow-hover transition-all">
                                <div className="mb-6">
                                    <img
                                        src="https://wipl-d.com/wp-content/uploads/2018/09/Support.jpg"
                                        alt="Support"
                                        className="rounded-circle shadow-sm"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <h4 className="font-size-6 font-weight-semibold mb-4">
                                    Excellent Support
                                </h4>
                                <p className="font-size-4 text-default-color line-height-1-8">
                                    Our dedicated support team is always ready to assist you with
                                    any questions or concerns you may have, 24/7.
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12 mb-10">
                            <div className="bg-white rounded-4 p-8 text-center h-100 shadow-hover transition-all">
                                <div className="mb-6">
                                    <img
                                        src="https://miro.medium.com/v2/resize:fit:640/format:webp/0*g7rqzQCKsDkU0JnK.png"
                                        alt="Networking"
                                        className="rounded-circle shadow-sm"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <h4 className="font-size-6 font-weight-semibold mb-4">
                                    Great Networking
                                </h4>
                                <p className="font-size-4 text-default-color line-height-1-8">
                                    Connect with industry leaders and professionals to expand your
                                    network and discover new career opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="pt-11 pt-lg-26 pb-lg-16 px-8"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-delay="400"
                data-aos-once="true"
                
            >
                <div className="row justify-content-center">
                    {/* <!-- Single Category --> */}
                    <div className="category_box col-12 col-xl-4 col-lg-4 ">
                        <a
                            href="/"
                            className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
                        >
                            <div className="text-blue bg-blue-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                                <i className="fa fa-briefcase"></i>
                            </div>

                            <div className="text-left category_text_box">
                                <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                                    Total Job Posted
                                </h5>
                                <p className="font-size-4 font-weight-bold text-secondary">
                                    <span>{Count.posted_jobs}</span>
                                    Vacancy
                                </p>
                            </div>
                        </a>
                    </div>
                    {/* <!-- End Single Category --> */}
                    {/* <!-- Single Category --> */}
                    <div className="category_box col-12 col-xl-4 col-lg-4 ">
                        <a
                            href="/"
                            className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
                        >
                            <div className="text-spray bg-spray-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                                <i className="fa fa-users"></i>
                            </div>

                            <div className="text-left category_text_box">
                                <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                                    Total Registered Applicants
                                </h5>
                                <p className="font-size-4 font-weight-bold text-secondary">
                                    <span>{Count.total_applicants}</span>
                                </p>
                            </div>
                        </a>
                    </div>

                    {/* <!-- Single Category --> */}
                    <div className="category_box col-12 col-xl-4 col-lg-4 ">
                        <a
                            href="/"
                            className="bg-white border border-color-2 rounded-4 pl-9 pt-10 pb-3 pr-7 hover-shadow-1 mb-9 d-block w-100"
                        >
                            <div className="text-red bg-red-opacity-1 square-70 rounded-4 mb-7 font-size-7">
                                <i className="fa fa-building"></i>
                            </div>

                            <div className="text-left category_text_box">
                                <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1">
                                    Total Registered Client's
                                </h5>
                                <p className="font-size-4 font-weight-bold text-secondary">
                                    <span>{Count.total_company}</span>
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-ebony-clay dark-mode-texts">
                <div className="container pt-12 pb-10">
                    <div className="row text-left">
                        {/* Left side: Logo + social icons */}
                        <div className="col-lg-4 col-sm-6 mb-lg-0 mb-9">
                            <img
                                src="image/logo-main-black.png"
                                alt="logo"
                                className="footer-logo mb-6"
                                style={{ maxHeight: "unset", maxWidth: "250px" }}
                            />

                            <div className="social-icons">
                                <ul className="pl-0 list-unstyled d-flex align-items-end">
                                    <li className="d-flex flex-column justify-content-center px-3 mr-3 font-size-4 heading-default-color">
                                        Follow us on:
                                    </li>
                                    <li className="d-flex flex-column justify-content-center px-3 mr-3">
                                        <Link to="" className="hover-color-primary heading-default-color">
                                            <i className="fab fa-facebook-f font-size-3 pt-2"></i>
                                        </Link>
                                    </li>
                                    <li className="d-flex flex-column justify-content-center px-3 mr-3">
                                        <Link to="" className="hover-color-primary heading-default-color">
                                            <i className="fab fa-twitter font-size-3 pt-2"></i>
                                        </Link>
                                    </li>
                                    <li className="d-flex flex-column justify-content-center px-3 mr-3">
                                        <Link to="" className="hover-color-primary heading-default-color">
                                            <i className="fab fa-linkedin-in font-size-3 pt-2"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right side: Legal links */}

                    </div>
                </div>
            </div>



        </div>
    );
}

export default Home2;
