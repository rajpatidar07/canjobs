import React, { useEffect, useState } from 'react';
import filterjson from '../../json/filterjson';

function ProgramListSection() {
    // State variables
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [college, setCollege] = useState('');
    const [programFilter, setProgramFilter] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [duration, setDuration] = useState(''); // New state for course duration
    const [intakeMonth, setIntakeMonth] = useState(''); // New state for intake month
    const [iletsCriteria, setIletsCriteria] = useState(''); // New state for Ilets criteria
    const [gpaCriteria, setGpaCriteria] = useState(''); // New state for GPA criteria
    const [educationCriteria, setEducationCriteria] = useState(''); // New state for education criteria
    const [mathRequirement, setMathRequirement] = useState(''); // New state for math requirement
    const [englishRequirement, setEnglishRequirement] = useState(''); // New state for English requirement
    const [programs, setPrograms] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [perPage] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [uniqueStates, setUniqueStates] = useState([]);
    const [uniqueCities, setUniqueCities] = useState([]);
    const [uniqueColleges, setUniqueColleges] = useState([]);

    // Effect to fetch programs and filters on component mount and when dependencies change
    useEffect(() => {
        getProgramsList();
        getFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, city, college, programFilter, discipline, subCategory, duration, intakeMonth, iletsCriteria, gpaCriteria, educationCriteria, mathRequirement, englishRequirement, pageNo]);

    // Function to fetch programs from the API
    const getProgramsList = async () => {
        try {
            const response = await fetch("https://canpathways.ca/myapi/program/programs.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    state,
                    city,
                    college_name: college,
                    programs: programFilter,
                    program_discipline_category: discipline,
                    program_sub_category: subCategory,
                    course_duration: duration,
                    intake_month: intakeMonth,
                    ilets_entry_criteria: iletsCriteria,
                    gpa_entry_criteria: gpaCriteria,
                    education_entry_criteria: educationCriteria,
                    math_requirement: mathRequirement,
                    english_requirement: englishRequirement,
                    perPage,
                    pageNo
                }),
            });
            console.log(response, "res")
            const data = response.data; // Axios automatically parses the JSON response

            if (data && data.data) {
                setPrograms(data.data);
                setTotalPages(Math.ceil(data.total_data / perPage));
                generatePagination();
            } else {
                setPrograms([]);
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    // Function to generate pagination array
    const generatePagination = () => {
        const paginationArray = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationArray.push(i);
        }
        setPagination(paginationArray);
    };

    // Function to fetch filter data from the API
    const getFilter = async () => {
        try {
            const res = await fetch("https://canpathways.ca/myapi/program/filter.php", {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = res.data; // Axios automatically parses the JSON response
            console.log("filers =>", res)

            if (data) {
                setUniqueStates([...new Set(data.map((item, index) => item.state))]);
                setUniqueCities([...new Set(data.map((item, index) => item.city))]);
                setUniqueColleges([...new Set(data.map((item, index) => item.college_name))]);
            }
        } catch (error) {
            console.error('Error fetching filters:', error);
        }
    };
    // Change handlers for filters
    const changeCity = (event) => {
        setCity(event.target.value);
        setCollege(''); // Reset college selection when city changes
    };

    const changeCollege = (event) => {
        setCollege(event.target.value);
    };

    return (
        <div className="section p-2 program_list_section mt-10">
            <div className="container-fluid content_row">
                <div className="card">
                    <div className="row main_row m-0 overflow-hidden">
                        <div className="col-md-3 filter_sidebar p-3">
                            <h4>Program Filter</h4>
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
                        <div className="col-md-9">
                            <div id="programList">
                                {programs.length > 0 ? programs.map((program, index) => (
                                    <div className="program_box mb-3 bg-white rounded px-3 pt-3" key={index}>
                                        <div className="row">
                                            <div className="heading_col_9">
                                                <h6 className="fw-normal m-0">
                                                    <span className="fw-bold college_name">{program.college_name}</span>
                                                    <span className="location ms-4">
                                                        <i className="fa fa-map-marker me-1" aria-hidden="true"></i>
                                                        {program.city}, {program.state}
                                                    </span>
                                                </h6>
                                                <h4 className="card-title">{program.programs}</h4>
                                            </div>
                                        </div>
                                        <p className="card-title">{program.program_discipline_category}</p>
                                        <div>
                                            {program.program_sub_category.split(',').map((subCat, idx) => (
                                                <span key={idx} className="badge text-bg-primary fw-normal me-1 mb-1">{subCat}</span>
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
                                                        <span key={idx} className="badge text-bg-success me-1">{month}</span>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <p className="criteria_label m-0">Application Fee (CAD $)</p>
                                                <p className="criteria_value m-0">{program.application_fee}</p>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <p className="criteria_label m-0">Tuition Fee (per year) CAD($)</p>
                                                <p className="criteria_value m-0">{program.tuition_fee}</p>
                                            </div>
                                        </div>
                                        <div className="row flex-wrap mt-1 fee_box">
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
                                )) : (
                                    <h4>No Programs Found</h4>
                                )}
                            </div>

                            {/* Pagination */}
                            <nav aria-label="...">
                                <ul className="pagination">
                                    {pagination.map((item, index) => (
                                        <li key={index} className={`page-item ${pageNo === item ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => setPageNo(item, index)}>{item}</button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgramListSection;
