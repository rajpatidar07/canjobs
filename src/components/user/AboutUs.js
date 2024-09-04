import React from 'react'
import EmployeeFooter from '../common/footer';
import EmployeeHeader from '../common/header';

export default function AboutUs() {
    return (
        <>
            <div className="site-wrapper overflow-hidden ">
                <EmployeeHeader />

                {/* <!-- Main Content Start --> */}
                <div className="position-relative z-index-1 bg-home-banner pt-26 pb-26 dark-mode-texts">
                    <div className="container position-static hero_container">
                        <div className="row position-relative align-items-center justify-content-center position-static w-80">
                            {/* <!-- Hero Form --> */}
                            <div className="col-lg-12 col-12 translateY-25 pt-lg-12 pb-lg-33 pb-md-28 pb-xs-26 pb-29 pt-md-20">
                                <div className="job_search_main_form rounded-70 shadow-7 pr-15 py-7 pl-12">
                                    <div className="text-center">
                                        <h1>ABOUT US</h1>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End Hero Form --> */}{" "}
                        </div>

                    </div>
                </div>

                <div className="bg-default-1 pt-9 pb-13 pb-xl-30 pb-13 position-relative overflow-hidden">
                    <div className="container">
                        <div className="row ">
                            <div className="col-12 col-lg-12 col-xl-12 text-center">
                                <div className="container about-section">
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <h1>About CanPathwaysJobs</h1>
                                            <p>
                                                Welcome to CanPathwaysJobs, your trusted partner in career development and employment opportunities. We are dedicated to connecting job seekers with top employers across various industries, ensuring a seamless and efficient job search experience.
                                            </p>
                                            <p>
                                                At CanPathwaysJobs, we understand the challenges of finding the right job or the perfect candidate. Our platform is designed to simplify this process, offering advanced tools and resources to help you succeed.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 text-center">
                                            <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Our Team" className="img-fluid rounded" />
                                        </div>
                                        <div className="col-md-6">
                                            <h2>Our Story</h2>
                                            <p>
                                                Founded with a vision to transform the job search experience, CanPathwaysJobs was established to create meaningful connections between job seekers and employers. Our journey began with a simple idea: to provide a user-friendly platform that empowers individuals to take control of their careers.
                                            </p>
                                            <p>
                                                Over the years, we have grown into a trusted resource, helping thousands of professionals find their dream jobs and companies to discover top talent. Our commitment to innovation and excellence drives us to continuously improve our platform, ensuring that we meet the evolving needs of the job market.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row mission-vision">
                                        <div className="col-md-6">
                                            <h2>Our Mission</h2>
                                            <p>
                                                Our mission is to empower individuals and businesses by providing a comprehensive platform that bridges the gap between talent and opportunity. We aim to foster a community where job seekers and employers can connect, collaborate, and grow together.
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <h2>Our Vision</h2>
                                            <p>
                                                Our vision is to become the leading job portal, recognized for our commitment to innovation, inclusivity, and excellence. We strive to create a positive impact on the lives of job seekers and employers by offering unmatched service and support.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h2>Our Team</h2>
                                            <p>
                                                Our team is composed of passionate professionals who are dedicated to helping you succeed. With expertise in various industries, our team members bring a wealth of knowledge and experience to the table, ensuring that you receive the best possible service.
                                            </p>
                                        </div>
                                        <div className="col-md-6 text-center">
                                            <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Office" className="img-fluid rounded" />
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-md-12 text-center">
                                            <h2>Why Choose Us?</h2>
                                        </div>
                                        <div className="col-md-4 text-center">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMYPBCvXeUyD3l0S8NjB5mR33_bhHbf-AFNA&s" alt="Easy to Use" className="img-fluid rounded-circle mb-3" />
                                            <h4>Easy to Use</h4>
                                            <p>Our platform is user-friendly and designed to make your job search experience as smooth as possible.</p>
                                        </div>
                                        <div className="col-md-4 text-center">
                                            <img src="https://wipl-d.com/wp-content/uploads/2018/09/Support.jpg" alt="Support" className="img-fluid rounded-circle mb-3" />
                                            <h4>Excellent Support</h4>
                                            <p>Our support team is always ready to assist you with any questions or concerns you may have.</p>
                                        </div>
                                        <div className="col-md-4 text-center">
                                            <img src="https://miro.medium.com/v2/resize:fit:640/format:webp/0*g7rqzQCKsDkU0JnK.png" alt="Networking" className="img-fluid rounded-circle mb-3" />
                                            <h4>Great Networking</h4>
                                            <p>Connect with industry leaders and professionals to expand your network and career opportunities.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Main Content end --> */}
                <EmployeeFooter />
            </div>
        </>
    )
}
