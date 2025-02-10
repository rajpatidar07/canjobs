import React, { useEffect, useState } from 'react'
import AdminHeader from '../admin/header';
import AdminSidebar from '../admin/sidebar';
import ApplicantsFilter from './applicantsFilter';
import EmployeeTable from './employeeTable';
import { getApplicanTypeApi } from '../../api/api';
import { useLocation } from 'react-router-dom';

export default function CommonApplicatTypePage() {
    /*Filter and search state */
    let user_type = localStorage.getItem("userType")
    let location = useLocation();
    const [experienceFilterValue, setExperienceFilterValue] = useState("");
    const [skillFilterValue, setSkillFilterValue] = useState("");
    const [pageNo, setpageNo] = useState(localStorage.getItem("PageNo") || 1);
    const [educationFilterValue, setEducationFilterValue] = useState("");
    const [agentFilterValue, setAgentFilterValue] = useState("");
    const [adminFilterValue, setAdminFilterValue] = useState("");
    const [interestFilterValue, setinterestFilterValue] = useState("");
    const [categoryFilterValue, setCategoryFilterValue] = useState("");
    const [search, setSearch] = useState("");
    const [searcherror, setSearchError] = useState("");
    let [apiCall, setApiCall] = useState(false);
    const [applicantTypeId, setApplicanttypeId] = useState(location?.state?.applicantType || "");
    const [applicantTypename, setApplicanttypeName] = useState("");

    useEffect(() => {
        // Update only if applicantType is present
        if (location?.state?.applicantType && location?.state?.applicantType !== applicantTypeId) {
            setApplicanttypeId(location.state.applicantType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location?.state?.applicantType]);

    useEffect(() => {
        if (!applicantTypeId) return;

        getApplicanTypeApi()
            .then((res) => {
                const foundItem = (res.data.data || []).find((item) => item.id === applicantTypeId);
                if (foundItem) {
                    setApplicanttypeName(foundItem.title);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, [applicantTypeId]);
    /*Function to search the employee */
    const onSearch = (e) => {
        const inputValue = e.target.value;
        setSearch(inputValue);
        setpageNo(1);
        if (inputValue.length > 0) {
            if (/[-]?\d+(\.\d+)?/.test(inputValue.charAt(0))) {
                setSearchError("Candidate Name cannot start with a number.");
            } else if (!/^[A-Za-z0-9 ]*$/.test(inputValue)) {
                setSearchError("Cannot use special characters.");
            } else {
                setSearchError("");
            }
        } else {
            setSearchError("");
        }
    };

    return (
        <>
            <div className="site-wrapper overflow-hidden bg-default-2">
                {/* <!-- Header Area --> */}
                <AdminHeader heading={applicantTypename} />
                {/* <!-- navbar- --> */}
                <AdminSidebar heading={applicantTypename} />
                <div className="dashboard-main-container mt-16" id="dashboard-body">
                    <div className="container-fluid">
                        <div className="mb-18">
                            <div className="mb-4 align-items-center">
                                <div className="page___heading">
                                    <h3 className="font-size-6 mb-0 Text-capitalize">{applicantTypename}</h3>
                                </div>
                                {/*<-- Search applicant Type -->*/}
                                <div className="row m-0 align-items-center">
                                    {/* Employees filter's */}
                                    <ApplicantsFilter
                                        applicantTypeId={applicantTypeId}
                                        user_type={user_type}
                                        search={search}
                                        onSearch={onSearch}
                                        experienceFilterValue={experienceFilterValue}
                                        setExperienceFilterValue={setExperienceFilterValue}
                                        skillFilterValue={skillFilterValue}
                                        setSkillFilterValue={setSkillFilterValue}
                                        educationFilterValue={educationFilterValue}
                                        setEducationFilterValue={setEducationFilterValue}
                                        setpageNo={setpageNo}
                                        agentFilterValue={agentFilterValue}
                                        setAgentFilterValue={setAgentFilterValue}
                                        adminFilterValue={adminFilterValue}
                                        setAdminFilterValue={setAdminFilterValue}
                                        interestFilterValue={interestFilterValue}
                                        setinterestFilterValue={setinterestFilterValue}
                                        setSearchError={setSearchError}
                                        // skill={props.skill}
                                        pageName={applicantTypeId}
                                        categoryFilterValue={categoryFilterValue}
                                        setCategoryFilterValue={setCategoryFilterValue}
                                    />
                                </div>
                                <small className="text-danger">{searcherror}</small>
                            </div>
                            {/*<-- Employee Table according to applicant Type -->*/}
                            <EmployeeTable
                                search={search}
                                experienceFilterValue={experienceFilterValue}
                                educationFilterValue={educationFilterValue}
                                skillFilterValue={skillFilterValue}
                                agentFilterValue={agentFilterValue}
                                adminFilterValue={adminFilterValue}
                                interestFilterValue={interestFilterValue}
                                apiCall={apiCall}
                                setApiCall={setApiCall}
                                status={"-1"}
                                pageNo={pageNo}
                                setpageNo={setpageNo}
                                ApplicantType={applicantTypeId}
                                categoryFilterValue={categoryFilterValue}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
