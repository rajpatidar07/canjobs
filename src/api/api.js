import axios from "axios";
const API_URL = "https://apnaorganicstore.in/canjobs/";
const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");
const employer_id = localStorage.getItem("company_id");
const admin_id = localStorage.getItem("admin_id");
const user_type = localStorage.getItem("userType");

// EMPLOYEE'S API

export const EmployeeSignUp = async (props) => {
  const formData = new FormData();
  formData.append("email", props.useremail);
  formData.append("password", props.userpassword);
  const response = await axios.post(`${API_URL}employee_signup`, formData);
  return response.data;
};

export const EmployeeLogin = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  const response = await axios.post(`${API_URL}employee_login`, formData);
  return response.data;
};
export const EmployeeDetails = async (props) => {
  // if (props !== undefined) {
  const formData = new FormData();
  formData.append("employee_id", user_id);
  const response = await axios.post(
    `${API_URL}getEmployeeDetail`,
    { employee_id: props },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
  // }
};
export const AddEmployeeDetails = async (props) => {
  const response = await axios.put(`${API_URL}employeePersonal_detail`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response.data;
};
/*Employee List Api */
export const getallEmployeeData = async (
  search,
  experience,
  skill,
  education,
  page,
  limit,
  column,
  sort
) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getallEmployeeView`,
    {
      user_type: user_type,
      filter_experience: experience,
      filter_skill: skill,
      filter_education: education,
      search: search,
      page: page,
      limit: limit,
      column_name: column,
      sort_order: sort,
    }
  );
  return response.data;
};
/*Detail Employee Education Api */
export const EmployeeEducationDetails = async (props) => {
  const formData = new FormData();
  formData.append("employee_id", props);
  const response = await axios.get(
    `${API_URL}getEmployeeEducation?employee_id=${props}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
/*Add Employee Education Api */
export const AddEmployeeEducation = async (props, id) => {
  const response = await axios.put(`${API_URL}employeeEducation_detail`, {
    employee_id: id,
    course: props.course,
    institute_location: props.institute_location,
    passing_year: props.passing_year,
    qualification: props.qualification,
    specialization: props.specialization,
    university_institute: props.university_institute,
    education_id: props.education_id,
  });
  return response.data;
};
/*Detail Employee Skill Api */
export const EmployeeSkillDetails = async (props) => {
  // if (props !== undefined) {
  const formData = new FormData();
  formData.append("employee_id", props);
  const response = await axios.get(
    `${API_URL}getEmployeeSkill?employee_id=${props}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
  // }
};
/*Add Employee Skill Api */
export const AddEmployeement = async (props, id) => {
  const response = await axios.put(`${API_URL}employeeCareer_detail`, {
    employee_id: id,
    company: props.company,
    designation: props.designation,
    company_location: props.company_location,
    industry: props.industry,
    functional_area: props.functional_area,
    work_level: props.work_level,
    start_date: props.start_date,
    end_date: props.end_date,
    currently_work_here: props.currently_work_here,
    career_id: props.career_id,
  });
  return response.data;
};
/*Add Employee Skill Api */
export const AddEmployeeSkill = async (props, id) => {
  const response = await axios.post(`${API_URL}/employeeSkill`, {
    employee_id: id,
    skill: props.skill,
  });
  return response.data;
};
/*Delete Employee Skill Api */
export const DeleteEmployeeSkill = async (props) => {
  const response = await axios.post(`${API_URL}deleteEmployeeSkill`, {
    skill_id: props,
  });
  return response.data;
};
/*Delete Employee Skill Api */
export const DeleteEmployeeEducation = async (props) => {
  const response = await axios.post(`${API_URL}deleteEmployeeEducation`, {
    education_id: props,
  });
  return response.data;
};
/*Delete Employee Career Api */
export const DeleteEmployeeCareer = async (props) => {
  const response = await axios.post(`${API_URL}deleteEmployeeCareer`, {
    career_id: props,
  });
  return response.data;
};

/*single job data api */
export const GetJob = async (props) => {
  const response = await axios.post(`${API_URL}getJob`, { job_id: props });
  return response;
};

/*single job Detail api */
export const GetJobDetail = async (props) => {
  const response = await axios.post(`${API_URL}/${user_type}/jobDetail`, {
    job_id: props,
  });
  return response;
};
// EMPLOYER'S API
/*Employer sign up */
export const EmployerSignUp = async (props) => {
  // console.log(props);
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("contact_no", props.contact_no);
  formData.append("term_and_condition", props.term_and_condition);
  const response = await axios.post(`${API_URL}employer_signup`, formData);
  return response.data;
};
/*Employer Login */
export const EmployerLogin = async (props) => {
  // console.log(props);
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("remember", props.remember);
  const response = await axios.post(`${API_URL}employer_login`, formData);
  return response.data;
};
/*Employer Forgot passsword api */
export const EmployerForgotPassword = async (props) => {
  const response = await axios.post(`${API_URL}company/forgetPassword`, {
    forget_email: props.forget_email,
  });
  return response.data;
};
/*Response List Api */
export const GetAllResponse = async (props) => {
  const response = await axios.post(`${API_URL}getJobResponse`, {
    job_id: props,
    user_type: user_type,
  });
  return response;
};
export const GetAllJobs = async (
  search,
  location,
  category,
  skill,
  job,
  page,
  limit,
  column_name,
  sort_order
) => {
  const response = await axios.post(`${API_URL}getAllJobs`, {
    // employee_id: id,
    filter_category_id: category,
    filter_job_swap: job,
    filter_keyskill: skill,
    filter_location: location,
    page: page,
    search: search,
    limit: limit,
    column_name: column_name,
    sort_order: sort_order,
  });
  return response;
};
/*Add Job  Api */
export const AddJob = async (props) => {
  const response = await axios.put(`${API_URL}addJobs`, props);
  return response.data;
};
/*Employer List Api */
export const getAllEmployer = async (
  industry,
  corporation,
  search,
  page,
  limit,
  column,
  sort
) => {
  const response = await axios.post(`${API_URL}${user_type}/getAllEmployer`, {
    filter_industry: industry,
    filter_corporation: corporation,
    search: search,
    page: page,
    limit: limit,
    column_name: column,
    sort_order: sort,
  });
  return response.data;
};
/*Employer Details Api */
export const EmployerDetails = async (props) => {
  // if (props !== undefined) {
  const formData = new FormData();
  formData.append("company_id", user_type === "company" ? employer_id : props);
  const response = await axios.post(
    `${API_URL}getEmployer`,
    { company_id: user_type === "company" ? employer_id : props },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
  // }
};
/*Add Employer / Company Api */
export const AddCompany = async (props) => {
  // console.log(props);
  const response = await axios.put(`${API_URL}company_detail`, props);
  return response.data;
};
/*Add Employer Contact Api */
export const AddContact = async (props) => {
  const response = await axios.put(`${API_URL}contact_detail`, props);
  return response.data;
};
/*Add Employer KYC Api */
export const AddKyc = async (props, id) => {
  const response = await axios.put(`${API_URL}company_kyc_detail`, {
    company_id: id,
    address: props.address,
    city: props.city,
    country: props.country,
    document: props.document,
    fax_number: props.fax_number,
    gstin: props.gstin,
    name: props.name,
    pan_date: props.pan_date,
    pan_no: props.pan_no,
    pincode: props.pincode,
    state: props.state,
    tan_number: props.tan_number,
  });
  return response.data;
};
/*Delete Employer Api */
export const DeleteEmployer = async (props) => {
  const response = await axios.delete(
    `${API_URL}deleteEmployer/${props}`,
    props
  );
  return response.data;
};
/*Delete Job Api */
export const DeleteJob = async (props) => {
  const response = await axios.delete(`${API_URL}deletejob/${props}`, props);
  return response.data;
};
/*Get Interview list api */
export const getInterview = async () => {
  const response = await axios.post(`${API_URL}${user_type}/getInterview`);
  return response.data.data;
};
/*Add interview login Api */
export const AddInterviewSheduale = async (props, employee_id, job_id) => {
  const response = await axios.post(
    `${API_URL}${user_type}/addUpdateInterview`,
    {
      job_id: job_id,
      employee_id: employee_id,
      interview_date: props.interview_date,
      created_by_admin: admin_id,
    }
  );
  return response.data;
};
/*Add interview login Api */
export const AddLimia = async (props, employee_id, job_id) => {
  const response = await axios.put(`${API_URL}${user_type}/addUpdateLmia`, {
    job_id: job_id,
    employee_id: employee_id,
    lmia_status: props.lmia_status,
    completion_time: props.completion_time,
  });
  return response.data;
};

// ADMIN'S API
/*Admin login Api */
export const AdminLogin = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  const response = await axios.post(`${API_URL}admin_login`, formData);
  return response.data;
};
/*Job List Api */
export const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}${user_type}/getAllJobs`);
  return response.data.data;
};
/*Admin List Api */
export const getallAdminData = async (
  type,
  search,
  page,
  limit,
  column,
  sort
) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getAllAdmin`,
    {
      filter_admin_type: type,
      page: page,
      search: search,
      limit: limit,
      column_name: column,
      sort_order: sort,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
};
/*Admin List Api */
export const getAllFollowUpData = async (
  job,
  company,
  experience,
  search,
  page,
  limit,
  column,
  sort
) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getFollowupView`,
    {
      filter_job_type: job,
      filter_company_name: company,
      filter_experience: experience,
      page: page,
      search: search,
      limit: limit,
      column_name: column,
      sort_order: sort,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  return response.data;
};
/*Job Category List Api */
export const getAllJobsCategory = async (
  type,
  search,
  page,
  limit,
  column_name,
  sort_order
) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getAllJobsCategory`,
    {
      filter_category_type: type,
      search: search,
      page: page,
      limit: limit,
      column_name: column_name,
      sort_order: sort_order,
    }
  );
  return response.data;
};
/*Delete Job Employee Api */
export const DeleteJobEmployee = async (props) => {
  const response = await axios.delete(
    `${API_URL}deleteEmployee/${props}`,
    props
  );
  return response.data;
};
/*Add Job Category Api */
export const AddJobCategory = async (props) => {
  const response = await axios.put(`${API_URL}${user_type}/addCategory`, props);
  return response.data;
};
/*Delete Job Category Api */
export const DeleteJobCategory = async (props) => {
  const response = await axios.delete(
    `${API_URL}deletejobCategory/${props}`,
    props
  );
  return response.data;
};

/* Admin Detail Api */
export const AdminDetails = async (props) => {
  // if (props !== undefined) {
  const formData = new FormData();
  formData.append("admin_id", props);
  const response = await axios.post(
    `${API_URL}/${user_type}/getAdmin`,
    { admin_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
  // }
};
/*Add Admin Api */
export const AddAdmin = async (props) => {
  const response = await axios.put(`${API_URL}${user_type}/addAdmin`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response.data;
};
/*Get Filter Api */
export const GetFilter = async (props) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getFilterList`,
    props,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
};
/*Add Filters Api */
export const AddFIlter = async (props, id) => {
  console.log(props);
  const response = await axios.put(
    `${API_URL}${user_type}/addUpdatefilterList`,
    props,
    // { id: id, json_item: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
}; /*Delete Filter Api */
export const DeleteFilter = async (pId, cId) => {
  console.log(pId, cId);
  const response = await axios.post(
    `${API_URL}${user_type}/deleteFilterListItem`,
    { id: pId, json_item_id: cId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
};

/*Delete Admin Api */
export const DeleteAdmin = async (props) => {
  const response = await axios.post(
    `${API_URL}${user_type}/deleteAdmin`,
    { admin_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
};
/*Add Followup Api */
export const AddFollowup = async (props) => {
  // console.log(props);
  const response = await axios.post(
    `${API_URL}${user_type}/addFollowup`,
    {
      admin_id: admin_id,
      job_id: props.jobId,
      employee_id: props.employId,
      remark: props.state.remark,
      next_date: props.state.next_followup_date,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
};
/*Add Followup single data Api */
export const getSingleFollowup = async (employee_id, job_id) => {
  const response = await axios.get(
    `${API_URL}${user_type}/getFollowup?job_id=${job_id}&employee_id=${employee_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response.data;
};
