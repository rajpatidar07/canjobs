import React from "react";
function JobBox() {
    return (
        <div className="col-xxl-12 col-xl-12 col-lg-12 mb-8 job_box " data-aos="fade-right" data-aos-duration="800" data-aos-once="true">
            {/* <!-- Single Featured Job --> */}
            <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                <div className="row job_header m-0">
                    <div className="media align-items-center company_box col-md-6 p-0">
                        <a className="text_box text-left" href="http://localhost:3000/">
                            <img className="company_logo" src="https://findlogovector.com/wp-content/uploads/2018/12/huggies-brand-logo-vector.png" alt="" />
                        </a>
                        <a className="text_box text-left w-100" href="http://localhost:3000/">
                            <p href="http://localhost:3000/" className="font-size-3 text-default-color line-height-2 m-0">Apple INC</p>
                            <h3 className="mb-0 font-size-6 heading-dark-color">UI/UX Designer</h3>
                        </a>
                    </div>
                    <div className="col-md-6 p-0">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap mr-n8 justify-content-md-end">
                            <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                <span className="mr-4" ><img src="image/svg/icon-loaction-pin-black.svg" alt="" /></span>
                                <span className="font-weight-semibold">Berlyn, UK</span>
                            </li>
                            <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                <span className="mr-4" ><img src="image/svg/icon-suitecase.svg" alt="" /></span>
                                <span className="font-weight-semibold">Full-time</span>
                            </li>
                            <li className="mt-2 mr-8 font-size-small text-black-2 d-flex">
                                <span className="mr-4" ><img src="image/svg/icon-clock.svg" alt="" /></span>
                                <span className="font-weight-semibold">9d ago</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-md-12 text-left">
                        <p>Gubagoo is a fast growing provider of messaging and commerce solutions for automotive dealers changing the future of how people find, buy and service their vehicles.</p>
                    </div>
                    <div className="col-md-8">
                        <ul className="d-flex list-unstyled mr-n3 flex-wrap">
                            <li>
                                <a className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2" href="http://localhost:3000/">Visual Design</a>
                            </li>
                            <li>
                                <a className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2" href="http://localhost:3000/">Wireframing</a>
                            </li>
                            <li>
                                <a className="bg-regent-opacity-15 min-width-px-96 mr-3 text-center rounded-3 px-6 py-1 font-size-3 text-black-2 mt-2" href="http://localhost:3000/">Scrum</a>
                            </li>
                        </ul>
                    </div>

                    <div className="media justify-content-md-end col-md-4">

                        <a class="btn btn-secondary text-uppercase font-size-3" href="javacript:" data-toggle="modal" data-target="#signup">Apply</a>
                    </div>
                </div>
            </div>
            {/* <!-- End Single Featured Job --> */}
        </div >
    );
}
export default JobBox;