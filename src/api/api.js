import axios from "axios";

const API_URL = "https://apnaorganicstore.in/canjobs/";
// const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");
const employee_id = localStorage.getItem("employee_id");

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
  const response = await axios.put(`${API_URL}employeePersonal_detail`, props);
  return response.data;
};
/*Employee List Api */
export const getallEmployeeData = async () => {
  const response = await axios.get(
    `${API_URL}admin/getallEmployeeView?user_type=admin`
  );
  return response.data.data;
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
    institute_location: props.course,
    passing_year: props.institute_location,
    qualification: props.qualification,
    specialization: props.specialization,
    university_institute: props.university_institute,
  });
  return response.data;
};
/*Detail Employee Skill Api */
export const EmployeeSkillDetails = async (props) => {
  if (props !== undefined) {
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
  }
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
/*Response List Api */
export const GetAllResponse = async (props) => {
  // const response = await axios.get(`${API_URL}getJobResponse?job_id=1&user_type=company`);
  // return response;
};
/*single job data api */
export const GetJobDetail = async (props) => {
  const response = await axios.post(`${API_URL}getJob`, { job_id: props });
  return response;
};

// EMPLOYER'S API
export const GetAllJobs = async () => {
  const response = await axios.get(`${API_URL}view_jobs`);
  return response;
};
export const GetAllJobfilter = async (props) => {
  const response = await axios.get(
    `${API_URL}view_jobs?employee_id${props}&filters_name${props}`
  );
  return response;
};
/*Add Job  Api */
export const AddJob = async (props) => {
  const response = await axios.put(
    `${API_URL}addJobs`,
    props
    // {
    // apply_link: props.apply_link,
    // department: props.department,
    // education: props.education,
    // employement: props.employement,
    // experience_required: props,
    // industry_type: props.industry_type,
    // job_category_id: props.job_category_id,
    // job_description: props.job_description,
    // job_title: props.job_title,
    // job_type: props.job_type,
    // keyskill: props.keyskill,
    // language: props.language,
    // location: props.location,
    // requirement: props.requirement,
    // role_category: props.role_category,
    // salary: props.salary,
    // your_duties: props.your_duties,
    // }
  );
  return response.data;
};
/*Employer List Api */
export const getAllEmployer = async () => {
  const response = await axios.get(`${API_URL}admin/getAllEmployer`);
  return response.data.data;
};
/*Employer Details Api */
export const EmployerDetails = async (props) => {
  // if (props !== undefined) {
  const formData = new FormData();
  formData.append("company_id", props);
  const response = await axios.post(
    `${API_URL}getEmployer`,
    { company_id: props },
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

// ADMIN'S API
/*Job List Api */
export const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}admin/getAllJobs`);
  return response.data.data;
};
/*Admin List Api */
export const getallAdminData = async () => {
  const response = await axios.get(`${API_URL}admin/getAllAdmin`);
  return response.data.data;
};
/*Job Category List Api */
export const getAllJobsCategory = async () => {
  const response = await axios.get(`${API_URL}admin/getAllJobsCategory`);
  return response.data.data;
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
  const response = await axios.put(`${API_URL}admin/addCategory`, props);
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
  if (props !== undefined) {
    const formData = new FormData();
    formData.append("admin_id", props);
    const response = await axios.post(
      `${API_URL}/admin/getAdmin`,
      { admin_id: props },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
};
/*Add Admin Api */
export const AddAdmin = async (props) => {
  const response = await axios.put(`${API_URL}admin/addAdmin`, props);
  return response.data;
};
/*Delete Admin Api */
export const DeleteAdmin = async (props) => {
  const response = await axios.delete(`${API_URL}admin/deleteAdmin/${props}`);
  return response.data;
};
/*Add Followup Api */
export const AddFollowup = async (props) => {
  const response = await axios.post(`${API_URL}admin/addFollowup`, {
    admin_id: props.adminId,
    job_id: props.jobId,
    employee_id: props.employId,
    remark: props.state.remark,
    next_followup_date: props.next_followup_date,
  });
  return response.data;
};
/*Add Followup single data Api */
export const getSingleFollowup = async (props) => {
  const response = await axios.get(
    `${API_URL}admin/getFollowup?job_id=2&employee_id=2`
  );
  return response.data;
};
