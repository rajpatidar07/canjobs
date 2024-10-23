import React, { useEffect, useState } from 'react';
import filterjson from '../../json/filterjson';
import Pagination from '../../common/pagination';

function ProgramListSection() {
    // State variables
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [college, setCollege] = useState('');
    const [programFilter, setProgramFilter] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [duration, setDuration] = useState('');
    const [intakeMonth, setIntakeMonth] = useState('');
    const [iletsCriteria, setIletsCriteria] = useState('');
    const [gpaCriteria, setGpaCriteria] = useState('');
    const [educationCriteria, setEducationCriteria] = useState('');
    const [mathRequirement, setMathRequirement] = useState('');
    const [englishRequirement, setEnglishRequirement] = useState('');
    const [programs, setPrograms] = useState([]);
    const [perPage] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [uniqueStates, setUniqueStates] = useState([]);
    const [uniqueCities, setUniqueCities] = useState([]);
    const [uniqueColleges, setUniqueColleges] = useState([]);

    // Effect to fetch programs and filters on component mount and when dependencies change
    useEffect(() => {
        getData();
        document.body.classList.remove("admin_body");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, city, college, programFilter, discipline, subCategory, duration, intakeMonth, iletsCriteria, gpaCriteria, educationCriteria, mathRequirement, englishRequirement, pageNo]);

    // Fetch JSON function
    async function fetchJSON(url, method, formData) {
        try {
            const response = await fetch(url, {
                method: method,
                keepalive: true,
                body: formData // Remove headers, let the browser handle them
            });
            return await response.json();
        } catch (error) {
            console.log(error);
            return null; // Return null on error
        }
    }

    // Function to fetch filter data from the API
    const getData = async () => {
        const formData = new FormData();
        // Append each field to the FormData object
        formData.append('state', state);
        formData.append('city', city);
        formData.append('college_name', college);
        formData.append('programs', programFilter);
        formData.append('program_discipline_category', discipline);
        formData.append('program_sub_category', subCategory);
        formData.append('course_duration', duration);
        formData.append('intake_month', intakeMonth);
        formData.append('ilets_entry_criteria', iletsCriteria);
        formData.append('gpa_entry_criteria', gpaCriteria);
        formData.append('education_entry_criteria', educationCriteria);
        formData.append('math_requirement', mathRequirement);
        formData.append('english_requirement', englishRequirement);
        formData.append('perPage', perPage);
        formData.append('pageNo', pageNo);

        // Fetch unique states, cities, and colleges
        const uniqueData = await fetchJSON('https://canpathways.ca/myapi/program/filter.php', "GET");
        if (uniqueData) {
            setUniqueStates([...new Set(uniqueData.map((item) => item.state))]);
            setUniqueCities([...new Set(uniqueData.map((item) => item.city))]);
            setUniqueColleges([...new Set(uniqueData.map((item) => item.college_name))]);
        }

        // Fetch programs based on filters and pagination
        const programData = await fetchJSON('https://canpathways.ca/myapi/program/programs.php', "POST", formData);
        if (programData && programData.data) {
            setPrograms(programData.data);
            setTotalData(programData.total_data); // Make sure total_data is returned from the API
        } else {
            setPrograms([]);
            setTotalData(0); // Reset total pages if no data is found
        }
    };
    /*Pagination Calculation */
    const nPages = Math.ceil(totalData / perPage);

    // Change handlers for filters
    const changeCity = (event) => {
        setCity(event.target.value);
        setCollege(''); // Reset college selection when city changes
    };

    const changeCollege = (event) => {
        setCollege(event.target.value);
    };

    return (
        <>
            <style>
                {`
                    .program_list_div {
                        max-height: 1000px;
                        overflow: auto;
                    }

                    .criteria_label {
                        font-size: 12px;
                    }

                    .criteria_value {
                        font-size: 16px;
                        font-weight: 600;
                    }

                    .criteria_box, .fee_box {
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        padding: 10px;
                        margin: 0px;
                    }

                    span.badge.btn-outline-info {
                        border: 1px solid #0dcaf0;
                        color: #333;
                    }

                    .college_name {
                        text-transform: uppercase;
                        color: #ff9a9a;
                    }

                    h4.card-title {
                        color: blue;
                    }

                    .program_box {
                        box-shadow: 0 0 4px #ccc;
                    }

                    .input_label {
                        font-size: 12px;
                    }

                    .select2-container--default .select2-results > .select2-results__options,
                    span.selection {
                        font-size: 14px;
                    }

                    .select2-container--default .select2-selection--single .select2-selection__rendered {
                        line-height: 26px;
                    }

                    span.location {
                        font-size: 13px;
                        font-style: italic;
                    }

                    span.location i {
                        color: #ff9a9a;
                    }

                    .form-control {
                        border: 1px solid #aaa;
                    }

                    .heading_col_9 {
                        width: calc(100% - 130px);
                    }

                    .pagination {
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                    }

                    a.pagination-link {
                        background: white;
                        padding: 4px 8px;
                        border: 1px solid #e73a46;
                        text-decoration: none;
                        cursor: pointer;
                    }

                    a.pagination-link.current {
                        color: white;
                        background: #e73a46;
                        padding: 5px 9px;
                        border: 1px solid white;
                    }

                    .pagination .per_page_select {
                        padding: 3px;
                        border: 1px solid #e73a46;
                        color: #e73a46;
                        background: white;
                    }
                        .text-bg-primary{
                        color: #fff !important;
                         background-color: RGBA(13, 110, 253, var(--bs-bg-opacity, 1)) !important;
    }
                `}
            </style>
            <div className="section p-2 program_list_section mt-10"
            // style={{
            //     maxHeight: "1024px",
            //     overflow: "hidden"
            // }}
            >
                <div className="container-fluid content_row">
                    <div className="card">
                        <div className="row main_row m-0 overflow-hidden">
                            <div className="col-md-3 filter_sidebar p-3">
                                <h4 class="mb-3 text-dark">Program Filter</h4>
                                {/* State Filter */}
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">State/Province</label>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={e => setState(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {uniqueStates.map((item, index) => (
                                            <option key={index} value={item} >{item}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* City Filter */}
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">City</label>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={changeCity}
                                    >
                                        <option value="">Select</option>
                                        {uniqueCities.map((item, index) => (
                                            <option key={index} value={item} >{item}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* College Filter */}
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">College Name</label>
                                    <select
                                        className="form-control form-control-sm"
                                        onChange={changeCollege}
                                    >
                                        <option value="">Select</option>
                                        {uniqueColleges.map((item, index) => (
                                            <option key={index} value={item} >{item}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Program Search */}
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">Programs</label>
                                    <input
                                        placeholder="Search program"
                                        className="form-control form-control-sm"
                                        onKeyUp={(e) => setProgramFilter(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">Program Discipline Category</label>
                                    <select
                                        id="disciplineFilter"
                                        className="form-control selectpicker"
                                        data-live-search="true"
                                        onChange={e => setDiscipline(e.target.value)}
                                    >
                                        <option value="">Filter program discipline category</option>
                                        {(filterjson.program_discipline_category || []).map((item, index) =>

                                            <option value={item} key={index}>{item}</option>
                                        )}

                                    </select>
                                </div>

                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">Program Sub Category</label>
                                    <select
                                        id="subcatFilter"
                                        className="form-control selectpicker"
                                        data-live-search="true"
                                        onChange={e => setSubCategory(e.target.value)}                                >
                                        <option value="">Filter program sub category</option>
                                        {(filterjson.program_discipline_sub_category || []).map((item, index) =>

                                            <option value={item} key={index}>{item}</option>
                                        )}

                                    </select>
                                </div>
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">Course Duration (Year)</label>
                                    <select id="durationFilter" className="form-control selectpicker" data-live-search="true" onChange={e => setDuration(e.target.value)}>
                                        <option value="">Filter course duration</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                    </select>
                                </div>
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">Intake Month Season</label>
                                    <select id="monthFilter" className="form-control selectpicker" data-live-search="true" onChange={e => setIntakeMonth(e.target.value)}>
                                        <option value="">Filter intake month</option>
                                        {(filterjson.programs_intake_month || []).map((item, index) =>

                                            <option value={item} key={index}>{item}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">Ilets Entry Criteria</label>
                                    <select id="iletsFilter" className="form-control selectpicker" data-live-search="true" onChange={e => setIletsCriteria(e.target.value)}>
                                        <option value="">Filter Ilets entry criteria</option>
                                        {(filterjson.programs_ilets_entry_criteria || []).map((item, index) =>

                                            <option value={item} key={index}>{item}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">GPA Entry criteria(%)</label>
                                    <select id="gpaFilter" className="form-control selectpicker" data-live-search="true" onChange={e => setGpaCriteria(e.target.value)}>
                                        <option value="">Filter GPA entry criteria</option>
                                        {(filterjson.programs_gpa_entry_criteria || []).map((item, index) =>

                                            <option value={item} key={index}>{item}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">Education Entry Criteria</label>
                                    <select id="educationFilter" className="form-control selectpicker" data-live-search="true" onChange={e => setEducationCriteria(e.target.value)}>
                                        <option value="">Filter education entry criteria</option>
                                        {(filterjson.programs_education_entry_criteria || []).map((item, index) =>

                                            <option value={item} key={index}>{item}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">Math Requirement</label>
                                    <select id="mathFilter" className="form-control selectpicker" data-live-search="true" onChange={e => setMathRequirement(e.target.value)}>
                                        <option value="">Filter math requirement</option>
                                        {(filterjson.programs_math_requirement || []).map((item, index) =>

                                            <option value={item} key={index}>{item}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="form-group mb-2 mt-5">
                                    <label className="input_label">English Requirement</label>
                                    <select id="englishFilter" className="form-control selectpicker" data-live-search="true" onChange={e => setEnglishRequirement(e.target.value)}>
                                        <option value="">Filter english requirement</option>
                                        {(filterjson.programs_english_requirement || []).map((item, index) =>

                                            <option value={item} key={index}>{item}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            {/* Program List Display */}
                            <div className="col-md-9 program_list_div bg-light p-3">
                                <h4 class="mb-3 text-dark">Program Finder</h4>
                                <div id="programList">
                                    <div className="pagination">
                                        {programs.length > 0 ? programs.map((program, index) => (
                                            <div className="program_box mb-3 bg-white rounded px-3 pt-3">
                                                <div className="row">
                                                    <div className="heading_col_9 px-5">
                                                        <h6 className="fw-normal m-0">
                                                            <span className="fw-bold college_name">{program.college_name}</span>
                                                            <span className="location mx-lg-14  ms-4">
                                                                <i className="fa fa-map-marker mr-4" ></i>
                                                                <span className='text-dark '> {program.city}, {program.state}
                                                                </span>
                                                            </span>
                                                        </h6>
                                                        <h4 className="card-title">
                                                            {program.programs}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <p className="card-title">{program.program_discipline_category}</p>
                                                <div>
                                                    {program.program_sub_category.split(',').map((subCat, idx) => (
                                                        <span key={idx} className="badge text-bg-primary fw-normal m-1">{subCat}</span>
                                                    ))}
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-3 mb-2">
                                                        <p className="criteria_label m-0">Course Duration (Year)</p>
                                                        <p className="criteria_value m-0">{program.course_duration} year</p>
                                                    </div>
                                                    <div className="col-md-9 mb-2">
                                                        <p className="criteria_label m-0">Course Intake Season</p>
                                                        <p className="criteria_value m-0">
                                                            {program.course_intake_season.split(',').map((month, idx) => (
                                                                <span key={idx} className="badge fw-normal me-1 mt-1 btn-outline-info">{month}</span>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 mb-3">
                                                        <h6 className="card-title mb-0 mt-3">Fee:</h6>
                                                        <div className="row flex-wrap mt-1 fee_box">
                                                            <div className="col-12 mb-3">
                                                                <p className="criteria_label m-0">Application Fee (CAD $)</p>
                                                                <p className="criteria_value m-0">${program.application_fee_cad}</p>
                                                            </div>
                                                            <div className="col-12 mb-3">
                                                                <p className="criteria_label m-0">Program Details Fee (CAD / Year) (approx.)</p>
                                                                <p className="criteria_value m-0">{program.program_details_fee}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row flex-wrap mt-1 fee_box d-none">
                                                            <div className="col-md-8 mb-3">
                                                                <h6 className="card-title mb-0 mt-3">Scholarships:</h6>
                                                                <div className="row flex-wrap mt-1 fee_box">
                                                                    <div className="col-12 mb-3">
                                                                        <p className="criteria_label m-0">Available Scholarships</p>
                                                                        <p className="criteria_value m-0">{program.scholarship_name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 mb-3">
                                                        <h6 className="card-title mb-0 mt-3">Eligibility Criteria:</h6>
                                                        <div className="row flex-wrap mt-1 criteria_box">
                                                            <div className="col-3 mb-3">
                                                                <p className="criteria_label m-0">ILETS Entry</p>
                                                                <p className="criteria_value m-0">6.5</p>
                                                            </div>
                                                            <div className="col-3 mb-3">
                                                                <p className="criteria_label m-0">GPA Entry</p>
                                                                <p className="criteria_value m-0">70</p>
                                                            </div>
                                                            <div className="col-6 mb-3">
                                                                <p className="criteria_label m-0">GPA Entry</p>
                                                                <p className="criteria_value m-0">Grade 12 / High School</p>
                                                            </div>
                                                            <div className="col-6 mb-3">
                                                                <p className="criteria_label m-0">Math Requirement</p>
                                                                <p className="criteria_value m-0">N/A</p>
                                                            </div>
                                                            <div className="col-6 mb-3">
                                                                <p className="criteria_label m-0">English Requirement</p>
                                                                <p className="criteria_value m-0">N/A</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <h4>No Programs Found</h4>
                                        )}
                                    </div>
                                </div>
                            </div>
                                    <div className="pt-2 mx-auto">
                                        <Pagination
                                            nPages={nPages}
                                            currentPage={pageNo}
                                            setCurrentPage={setPageNo}
                                            total={totalData}
                                            count={programs.length}
                                        />
                                    </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ProgramListSection;
