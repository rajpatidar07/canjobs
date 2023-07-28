import axios from "axios";
// const API_URL = "https://192.168.29.92/canjobs/";
const API_URL = "https://apnaorganicstore.in/canjobs/";
let Token = localStorage.getItem("token");
const view_as_token = localStorage.getItem("view_as_token");
const user_id = localStorage.getItem("employee_id");
const employer_id = localStorage.getItem("company_id");
const admin_id = localStorage.getItem("admin_id");
const user_type = localStorage.getItem("userType");

if (view_as_token) {
  Token = view_as_token;
}

// Location Api
/*Country*/
export const GetCountry = async () => {
  const response = await axios.get(`${API_URL}getCountryList`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Chanage password Api */
export const ChangePasswordApi = async (props) => {
  const response = await axios.put(
    `${API_URL}${user_type}/changePassword`,
    props,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Sen Otp to email api */
export const SendOtp = async (props) => {
  const response = await axios.post(`${API_URL}common/generateOtp`, {
    email: props.email,
  });
  return response.data;
};

/*Employee Reset password Api */
export const EmployeeResetPasswordApi = async (props) => {
  const response = await axios.put(`${API_URL}user/resetPassword`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*To get the filter list APi */
export const getJson = async () => {
  const response = await axios.get(`${API_URL}filterList/filterList.json`);
  return response.data;
};

// EMPLOYEE'S API
/*Employee sign */
export const EmployeeSignUp = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("otp", props.otp);
  const response = await axios.post(`${API_URL}employee_signup`, formData);
  return response.data;
};

/*Employee Login */
export const EmployeeLogin = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  const response = await axios.post(`${API_URL}employee_login`, formData);
  return response.data;
};

/*Api to login in with linked employee*/
export const LinkedInLogin = async (props, type) => {
  if (type === "employeeLogin") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(`${API_URL}api/Common_controller/linkedinLogin`, formData);
    return response.data;
  }
};

/*Api to login in with linked employee*/
export const LinkedSignup = async (props, type) => {
  if (type === "employeeSignup") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(`${API_URL}api/Common_controller/linkedinLogin`, formData);
    return response.data;
  }
};

/*Api to login in with Social linkes in employee login*/
export const SocialLogin = async (token, email, name, picture, type) => {
  const response = await axios.post(`${API_URL}user/signupLoginViaSocialMedia`, {
    "token": token,
    "email": email,
    "name": name,
    "picture": picture,
    "type": type
  });
  return response.data;
};

/*Employee Forgot passsword api */
export const EmployeeForgotPassword = async (props) => {
  const response = await axios.post(`${API_URL}employee/forgetPassword`, {
    forget_email: props.forget_email,
  });
  return response.data;
};
/*Employee detail api */
export const EmployeeDetails = async (props) => {
  const formData = new FormData();
  formData.append("employee_id", user_id);
  const response = await axios.post(
    `${API_URL}getEmployeeDetail`,
    { employee_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
  // }
};
/*Employee detail api */
export const EmployeeAppliedJob = async (props) => {
  const response = await axios.post(
    `${API_URL}getJobsByEmployee`,
    { employee_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employee detail api */
export const AddEmployeeDetails = async (props) => {
  const response = await axios.put(`${API_URL}employeePersonal_detail`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
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
  sort,
  time,
  jobSkill
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
      filter_by_time: time,
      job_keyskills: jobSkill
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
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
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employee Education Api */
export const AddEmployeeEducation = async (props, id) => {
  const response = await axios.put(
    `${API_URL}employeeEducation_detail`,
    {
      employee_id: id,
      course: props.course,
      institute_location: props.institute_location,
      passing_year: props.passing_year,
      qualification: props.qualification,
      specialization: props.specialization,
      university_institute: props.university_institute,
      education_id: props.education_id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Detail Employee Skill Api */
export const EmployeeSkillDetails = async (props) => {
  const formData = new FormData();
  formData.append("employee_id", props);
  const response = await axios.get(
    `${API_URL}getEmployeeSkill?employee_id=${props}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employee Skill Api */
export const AddEmployeement = async (props, id) => {
  const response = await axios.put(
    `${API_URL}employeeCareer_detail`,
    {
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
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employee Skill Api */
export const AddEmployeeSkill = async (props, id) => {
  const response = await axios.post(
    `${API_URL}/employeeSkill`,
    {
      employee_id: id,
      skill: props.skill,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Employee Skill Api */
export const DeleteEmployeeSkill = async (props) => {
  const response = await axios.post(
    `${API_URL}deleteEmployeeSkill`,
    { skill_id: props, },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Employee Education Api */
export const DeleteEmployeeEducation = async (props) => {
  const response = await axios.post(
    `${API_URL}deleteEmployeeEducation`,
    { education_id: props, },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Employee Career Api */
export const DeleteEmployeeCareer = async (props) => {
  const response = await axios.post(
    `${API_URL}deleteEmployeeCareer`,
    { career_id: props, },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Employee Profile completion Api*/
export const getProfileCompletionPercent = async () => {
  const response = await axios.get(`${API_URL}/getProfileCompletePercent`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data.data;
};

/*Apply job Api */
export const ApplyJob = async (job_id, employee_id, status, apply_id) => {
  const response = await axios.post(
    `${API_URL}applyJob`,
    {
      apply_id: apply_id,
      job_id: job_id,
      employee_id: employee_id,
      status: status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*single job data api */
export const GetJob = async (props) => {
  const response = await axios.post(
    `${API_URL}getJob`,
    { job_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*single job Detail api */
export const GetJobDetail = async (props) => {
  // console.log(props);
  const response = await axios.post(
    `${API_URL}admin/jobDetail`,
    { job_id: props, },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

// EMPLOYER'S API
/*Employer sign up */
export const EmployerSignUp = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("contact_no", props.contact_no);
  formData.append("term_and_condition", props.term_and_condition);
  formData.append("otp", props.otp);
  const response = await axios.post(`${API_URL}employer_signup`, formData);
  return response.data;
};
/*Employer Login */
export const EmployerLogin = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  formData.append("remember", props.remember);
  const response = await axios.post(`${API_URL}employer_login`, formData);
  return response.data;
};

/*Api to login in with linked employer*/
export const LinkedInLoginEmployer = async (props, type) => {
  if (type === "employerLogin") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(`${API_URL}api/Common_controller/linkedinLogin`, formData);
    return response.data;
  }
};

/*Api to login in with linked  employer*/
export const LinkedInSignupEmployer = async (props, type) => {
  if (type === "employerSignup") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(`${API_URL}api/Common_controller/linkedinLogin`, formData);
    return response.data;
  }
};

/*Api to login in with Social linkes in employer login*/
export const SocialCompanyLogin = async (token, email, name, picture, type) => {
  const response = await axios.post(`${API_URL}company/signupLoginViaSocialMedia`, {
    "token": token,
    "email": email,
    "name": name,
    "picture": picture,
    "type": type
  });
  return response.data;
};

/*Employer Reset password Api */
export const EmployerResetPasswordApi = async (props) => {
  const response = await axios.put(`${API_URL}company/resetPassword`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
}

/*Employer Forgot passsword api */
export const EmployerForgotPassword = async (props) => {
  const response = await axios.post(`${API_URL}company/forgetPassword`, {
    forget_email: props.forget_email,
  });
  return response.data;
};

/*Response List Api */
export const GetAllResponse = async (
  job_id,
  filter_skill,
  filter_experience,
  search,
  page,
  limit,
  column,
  sort,
  time,
  lima
) => {
  const response = await axios.post(
    `${API_URL}getJobResponse`,
    {
      job_id: job_id,
      user_type: user_type,
      page: page,
      limit: limit,
      filter_experience: filter_experience,
      filter_skill: filter_skill,
      column_name: column,
      sort_order: sort,
      search: search,
      filter_by_time: time,
      filter_lmia_status: lima
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Api to get all job data */
export const GetAllJobs = async (
  search,
  location,
  category,
  skill,
  job,
  page,
  limit,
  column_name,
  sort_order,
  company,
  time,
  employeeSkill
) => {
  const response = await axios.post(
    Token ? `${API_URL}getAllJobs` : `${API_URL}common/getJobs`,
    {
      filter_category_id: category,
      filter_job_swap: job,
      filter_keyskill: skill,
      filter_location: location,
      page: page,
      search: search ? search : company,
      limit: limit,
      column_name: column_name,
      sort_order: sort_order,
      filter_by_time: time,
      employee_skills: employeeSkill
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Add Job  Api */
export const AddJob = async (props) => {
  const response = await axios.put(`${API_URL}addJobs`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
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
  sort,
  time
) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getAllEmployer`,
    {
      filter_industry: industry,
      filter_corporation: corporation,
      search: search,
      page: page,
      limit: limit,
      column_name: column,
      sort_order: sort,
      filter_by_time: time,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Employer Details Api */
export const EmployerDetails = async (props) => {
  const formData = new FormData();
  formData.append("company_id", user_type === "company" ? employer_id : props);
  const response = await axios.post(
    `${API_URL}getEmployer`,
    { company_id: user_type === "company" ? employer_id : props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Employer / Company Api */
export const AddCompany = async (props) => {
  const response = await axios.put(`${API_URL}company_detail`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Add Employer Contact Api */
export const AddContact = async (props) => {
  const response = await axios.put(`${API_URL}contact_detail`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Add Employer KYC Api */
export const AddKyc = async (props, id) => {
  const response = await axios.put(
    `${API_URL}company_kyc_detail`,
    {
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
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Employer Api */
export const DeleteEmployer = async (props) => {
  const response = await axios.delete(
    `${API_URL}deleteEmployer/${props}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    },
    props
  );
  return response.data;
};

/*Delete Job Api */
export const DeleteJob = async (props) => {
  const response = await axios.delete(
    `${API_URL}deletejob/${props}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    },
    props
  );
  return response.data;
};

/*Get Interview list api */
export const getInterview = async (
  job_id,
  employee_id,
  search,
  page,
  column,
  limit,
  sort,
  time,
  status
) => {
  const response = await axios.post(
    `${API_URL}admin/getInterview`,
    {
      search: search,
      column_name: column,
      sort_order: sort,
      page: page,
      limit: limit,
      job_id: job_id,
      employee_id: employee_id,
      filter_by_time: time,
      filter_by_status: status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data.data;
};

/*Add interview Shedual Api */
export const AddInterviewSchedule = async (props, employee_id, job_id) => {
  console.log(props.state, employee_id, job_id);
  const response = await axios.post(
    `${API_URL}admin/addUpdateInterview`,
    {
      job_id: job_id,
      employee_id: employee_id,
      interview_date: props.interview_date,
      created_by_admin: admin_id,
      interview_status: props.interview_status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Get limia list Api */
export const GetEmployeeByLima = async (status) => {
  const response = await axios.post(
    `${API_URL}/company/getLmia`,
    {
      lmia_status: status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add LIMA Api */
export const AddLimia = async (props, employee_id, job_id) => {
  const response = await axios.put(
    `${API_URL}admin/addUpdateLmia`,
    {
      job_id: job_id,
      employee_id: employee_id,
      lmia_status: props.lmia_status,
      completion_time: props.completion_time,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Get Interview list api */
export const getFollowupLastData = async (page, column, limit, sort, time) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getAllLastFollowup`,
    {
      column_name: column,
      sort_order: sort,
      page: page,
      limit: limit,
      filter_by_time: time,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

// ADMIN'S API
/*Get Summary Count Api */
export const getSummaryCount = async () => {
  const response = await axios.get(`${API_URL}admin/getSummaryCounts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data.data;
};

/*Admin login Api */
export const AdminLogin = async (props) => {
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", props.password);
  const response = await axios.post(`${API_URL}admin_login`, formData);
  return response.data;
};

/*Admin Reset password Api */
export const AdminResetPasswordApi = async (props) => {
  const response = await axios.put(`${API_URL}admin/resetPassword`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Admin Notification List Api */
export const getAllAdminNotification = async () => {
  const response = await axios.get(`${API_URL}common/getNotifications`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Read Admin Notification Api */
export const ReadNotification = async (props) => {
  const response = await axios.put(
    `${API_URL}common/isReadNotification`,
    { id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
}

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
        Authorization: Token,
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
        Authorization: Token,
      },
    }
  );

  return response.data;
};

/*Job Category List Api */
export const getAllJobsCategory = async (
  level,
  type,
  search,
  page,
  limit,
  column_name,
  sort_order
) => {
  const response = await axios.post(
    `${API_URL}admin/getAllJobsCategory`,
    {
      parent_id: level,
      filter_category_type: type,
      search: search,
      page: page,
      limit: limit,
      column_name: column_name,
      sort_order: sort_order,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Job Employee Api */
export const DeleteJobEmployee = async (props) => {
  const response = await axios.delete(
    `${API_URL}deleteEmployee/${props}`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    },
    props
  );
  return response.data;
};

/*Add Job Category Api */
export const AddJobCategory = async (props) => {
  const response = await axios.put(
    `${API_URL}${user_type}/addCategory`,
    props,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Job Category Api */
export const DeleteJobCategory = async (props) => {
  const response = await axios.delete(
    `${API_URL}deletejobCategory/${props}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    },
    props
  );
  return response.data;
};

/* Admin Detail Api */
export const AdminDetails = async (props) => {
  const formData = new FormData();
  formData.append("admin_id", props);
  const response = await axios.post(
    `${API_URL}/${user_type}/getAdmin`,
    { admin_id: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Admin Api */
export const AddAdmin = async (props) => {
  const response = await axios.put(`${API_URL}${user_type}/addAdmin`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Get Filter Api */
export const GetFilter = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/getFilterList`,
    props,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Add Filters Api */
export const AddFIlter = async (props, id) => {
  const response = await axios.put(
    `${API_URL}${user_type}/addUpdatefilterList`,
    { id: id, json_item: props.json_item },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Filter Api */
export const DeleteFilter = async (pId, cId) => {
  const response = await axios.post(
    `${API_URL}${user_type}/deleteFilterListItem`,
    { id: pId, json_item_id: cId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
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
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Add Followup Api */
export const AddFollowup = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/addFollowup`,
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
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*get Followup single data Api */
export const getSingleFollowup = async (employee_id, job_id) => {
  const response = await axios.post(
    `${API_URL}admin/getFollowup`,
    { job_id: job_id, employee_id: employee_id },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );

  return response.data;
};

/*Get Admin token to view ass other admin */
export const GetAdminToken = async (props) => {
  const response = await axios.post(
    `${API_URL}${user_type}/getToken`,
    {
      admin_id: props,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get email template */
export const GetAllEmailTemplate = async (props) => {
  const response = await axios.post(`${API_URL}/common/getEmailTemplate`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to update email template */
export const AddUpdateEmailTemplate = async (props) => {
  const response = await axios.put(
    `${API_URL}/common/addUpdateEmailTemplate`,
    {
      id: props.id,
      email_type: props.email_type,
      subject: props.subject,
      message: props.message,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};
/*Api to Test email template */
export const TestEmail = async (props) => {
  console.log(props);
  const response = await axios.post(`${API_URL}/common/testEmail`, {
    "email_id": props.email_id,
    "email_template_id": props.email_template_id
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to get the job filterd by employee id if it is applied or not */
export const GetEmployeeFilterJob = async (id, skill) => {
  const response = await axios.post(`${API_URL}admin/getAllJobsViewAdmin`, {
    employee_id: id,
    filter_keyskill: skill
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response;
};
/*Api to get list of the Document */
export const GetEmployeeDocumentList = async (id ,type) => {
  const response = await axios.post(`${API_URL}user/getDocumentsUploaded`, {
    employee_id: id,
    type : type
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response;
};
/*Api to upload document*/
export const UploadDocument = async (id, type, doc, docId, ) => {
  const response = await axios.put(`${API_URL}user/documentsUpload `, {
    employee_id: id,
    type: type,
    document_file: doc,
    is_varify: "0",
    id: docId
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  })
  return response;
};
/*Api to verify Applicants document */
export const VarifyDocument = async (id, verify) => {
  const response = await axios.put(`${API_URL}user/isVarify `, {
    is_varify: verify,
    id: id
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  })
  return response;
};