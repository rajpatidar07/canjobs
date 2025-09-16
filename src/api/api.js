import axios from "axios";
import CryptoJS from "crypto-js";
const API_URL = window.location.origin === "https://canpathwaysjobs.com"
  ? "https://api.canpathwaysjobs.com/canjobs/" : "https://api-dev.canpathwaysjobs.com/"
//Local
// const API_URL ="http://192.168.29.51/canjobs/"
// New AWS backend
// const API_URL = "https://api.canpathwaysjobs.com/canjobs/";
let Token = localStorage.getItem("token");
let driveId = "b!iUiBybFGWEWfqWdSYuUqrWrIPVmZDQxPmwO4Bzj6nJp5ByboftxMSY6hfWPT-m8F";
const view_as_token = localStorage.getItem("view_as_token");
const user_id = localStorage.getItem("employee_id");
const employer_id = localStorage.getItem("company_id");
const admin_id = localStorage.getItem("admin_id");
// const agent_id = localStorage.getItem("agent_id");
const user_type = localStorage.getItem("userType");
let portal = localStorage.getItem("portal")
const admin_type = localStorage.getItem("admin_type");
if (view_as_token) {
  Token = view_as_token;
}
const SECRET_KEY = "MySuperSecretKey123"; // ⚠️ ye same key backend me bhi honi chahiye
const SECRET_IV = "MySuperSecretIV123";

export const encryptPassword = (password) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY.substring(0, 16));
  const iv = CryptoJS.enc.Utf8.parse(SECRET_IV.substring(0, 16));

  const encrypted = CryptoJS.AES.encrypt(password, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.toString(); // base64 string
}
// axios.interceptors.response.use(
//   response => {
//     if (
//       response.data &&
//       response.data.status === false &&
//       response.data.message === "Unauthorised Token"
//     ) {
//       if (user_type === "employee") {
//         window.location.href = "/candidate_login";
//       } else if (user_type === "employer") {
//         window.location.href = "/client_login";
//       } else if (user_type === "admin") {
//         window.location.href = "/adminlogin";
//       } else if (user_type === "agent") {
//         window.location.href = "/partnerlogin";
//       } else {
//         window.location.href = "/";
//       }
//     }
//     return response;
//   },
//   error => {
//     if (error.message === "Network Error" || error.message === "Request failed with status code 401") {
//       console.log(error)
//       if (user_type === "user") {
//         window.location.href = "/candidate_login";
//       } else if (user_type === "company") {
//         window.location.href = "/client_login";
//       } else if (user_type === "admin") {
//         window.location.href = "/adminlogin";
//       } else if (user_type === "agent") {
//         window.location.href = "/partnerlogin";
//       } else {
//         window.location.href = "/";
//       }
//     }
//   }
// );

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

//Api to get the statistics count of all data
export const GetAllDataCount = async () => {
  const response = await axios.get(`${API_URL}common/getSummaryCounts`);
  return response.data;
};

//Api to get the graph data count of all data
export const GetAllChartData = async (id, type, applicantType) => {
  const response = await axios.post(
    `${API_URL}admin/getEmployeeStatusCount`,
    {
      id: id,
      type: type,
      interested_in_id: applicantType,
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

//Api to get the graph data count of all applicants type data
export const GetAllApplicanttypeChartData = async (id, type) => {
  const response = await axios.post(
    `${API_URL}admin/getCategoryCount`,
    {
      id: id,
      type: type,
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

//Api to get the graph data count of all lima status
export const GetAllLimaChartData = async (id, type) => {
  const response = await axios.post(
    `${API_URL}admin/getLmiaStatusCount`,
    {
      id: id,
      type: type,
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

//Api to get the graph data count of all applicants type data  of visa status
export const GetAllVisaChartData = async (id, type) => {
  const response = await axios.post(
    `${API_URL}admin/getVisaStatusCount`,
    {
      id: id,
      type: type,
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

/*Chanage password Api */
export const ChangePasswordApi = async (props) => {
  let encryptPass = encryptPassword(props.password)
  let encryptNewPass = encryptPassword(props.new_password)
  let encryptConfPass = encryptPassword(props.conf_password)
  const response = await axios.put(
    `${API_URL}${user_type}/changePassword`,
    {
      password: encryptPass,
      new_password: encryptNewPass,
      conf_password: encryptConfPass,
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

/*Send Otp to email api */
export const SendOtp = async (props, type) => {
  const response = await axios.post(`${API_URL}common/generateOtp`, {
    email: props.email,
    type: type,
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
export const EmployeeSignUp = async (props, permission) => {
  let newPass = encryptPassword(props.password)
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", newPass);
  formData.append("otp", props.otp);
  formData.append("resume", props.resume);
  formData.append("reffer_by", props.reffer_by);
  formData.append("name", props.name);
  formData.append("interested_in_id", props.interested_in_id);
  // formData.append("contact_no", props.contact_no);
  formData.append("permission", JSON.stringify(permission));
  const response = await axios.post(`${API_URL}employee_signup`, formData);
  return response.data;
};

/*Employee Login */
export const EmployeeLogin = async (props) => {
  let newPass = encryptPassword(props.password)
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", newPass);
  const response = await axios.post(`${API_URL}employee_login`, formData);
  return response.data;
};

/*Api to login in with linked employee*/
export const LinkedInLogin = async (props, type) => {
  if (type === "employeeLogin") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(
      `${API_URL}api/Common_controller/linkedinLogin`,
      formData
    );
    return response.data;
  }
};

/*Api to login in with linked employee*/
export const LinkedSignup = async (props, type) => {
  if (type === "employeeSignup") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(
      `${API_URL}api/Common_controller/linkedinLogin`,
      formData
    );
    return response.data;
  }
};

/*Api to login in with Social linkes in employee login*/
export const SocialLogin = async (token, email, name, picture, type) => {
  const response = await axios.post(
    `${API_URL}user/signupLoginViaSocialMedia`,
    {
      token: token,
      email: email,
      name: name,
      picture: picture,
      type: type,
    }
  );
  return response.data;
};

/*Employee Forgot password api */
export const EmployeeForgotPassword = async (props) => {
  const response = await axios.post(`${API_URL}employee/ForgetPassword`, {
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

/*get Applicant Type and sub types  api */
export const getApplicanTypeApi = async (id, column, sort) => {
  const response = await axios.post(
    `${API_URL}admin/getApplicantType`,
    {
      admin_access_id: id,
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
  // }
};

/*Add Applicant Type and sub types  api */
export const AddApplicanTypeApi = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/addUpdateApplicantType`,
    props,
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

/*Delete Applicant Type and sub types  api */
export const DeleteApplicanTypeApi = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/deleteApplicantType`,
    props,
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

/* Add Employee detail api */
export const AddEmployeeDetails = async (props) => {
  // console.log(props)
  const headers = Token
    ? {
      "Content-Type": "application/json",
      Authorization: Token,
    }
    : {
      "Content-Type": "application/json",
      type: "event",
    };
  // console.log(Token,headers)
  const response = await axios.put(`${API_URL}employeePersonal_detail`, props, {
    headers: headers,
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
  jobSkill,
  status,
  job_id,
  employee_id,
  inserted,
  candian,
  agentId,
  assignedadminId,
  subType,
  localFilterValue,
  webFilterValue,
  conusultaionOpted,
  consultStartDate,
  consultationEndDate
  // subSubtype
  // agent_u_id
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
      job_keyskills: jobSkill,
      filter_status: status,
      job_id: job_id,
      work_permit_canada: candian,
      interested_in_id: portal === "study" ? 13 : inserted,
      agent_id: agentId,
      assigned_by: assignedadminId,
      // category: subType,
      category_id: subType,
      employee_id: employee_id,
      is_local: localFilterValue,
      sub_category: "",
      created_by_admin: webFilterValue,
      consultation_from_date: consultStartDate,
      consultation_to_date: consultationEndDate,
      consultation_opted: conusultaionOpted,
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

/*Add Employee Career Api */
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
export const DeleteEmployeeSkill = async (props, id) => {
  const response = await axios.post(
    `${API_URL}deleteEmployeeSkill`,
    {
      skill_id: props,
      employee_id: id
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

/*Delete Employee Education Api */
export const DeleteEmployeeEducation = async (props, id) => {
  const response = await axios.post(
    `${API_URL}deleteEmployeeEducation`,
    {
      education_id: props,
      employee_id: id
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

/*Delete Employee Career Api */
export const DeleteEmployeeCareer = async (props, id) => {
  const response = await axios.post(
    `${API_URL}deleteEmployeeCareer`,
    {
      career_id: props,
      employee_id: id
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
  // // (props);
  const response = await axios.post(
    `${API_URL}admin/jobDetail`,
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

/*Api to get list of the Document */
export const GetEmployeeDocumentList = async (id, empType, type) => {
  const response = await axios.post(
    `${API_URL}user/getDocumentsUploaded`,
    {
      employee_id: id,
      type: type,
      employee_type: empType,
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

/*Api to get list of the Document drive */
export const GetDocumentDriveList = async (id, empType, type) => {
  const response = await axios.post(
    `${API_URL}admin/getSharpointSiteDriveFolderData`,
    {
      driveId: driveId,
      userId: id,
      userType: empType,
      type: type,
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

/*Api to upload document*/
export const UploadDocument = async (id, type, doc, docId, docName) => {
  const response = await axios.put(
    `${API_URL}user/documentsUpload `,
    {
      employee_id: id,
      type: type,
      document_file: doc,
      is_varify: "0",
      id: docId,
      document_name: docName,
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

/*Api to Upload bulk document */
export const UploadBulkDocument = async (id, data, docId, empType) => {
  const response = await axios.put(
    `${API_URL}user/bulkDocumentsUpload `,
    {
      employee_id: id,
      employee_type: empType,
      id: docId,
      data: data,
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

/*Api to Upload Drive document */
export const UploadDriveDocument = async (
  id,
  data,
  docId,
  empType,
  docType
) => {
  const formData = new FormData();
  formData.append("docType", docType);
  formData.append("userType", empType);
  formData.append("driveId", driveId);
  formData.append("employee_id", id);
  formData.append("id", docId);
  // Loop through the array of files and append each file to formData
  for (let i = 0; i < data.length; i++) {
    formData.append(`file[${i}]`, data[i]);
  }

  const response = await axios.post(
    `${API_URL}admin/sharpointSiteDriveDocumentUpload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Api to document name */
export const ChangeNameDocument = async (
  id,
  name,
  docId,
  empType,
  docRealId
) => {
  const response = await axios.post(
    `${API_URL}admin/updateSharepointDocumentName`,
    {
      driveId: driveId,
      userId: id,
      userType: empType,
      newDocumentName: name,
      documentId: docRealId,
      id: docId,
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

/*Api to verify Applicants document */
export const VarifyDocument = async (id, verify) => {
  const response = await axios.put(
    `${API_URL}user/isVarify `,
    {
      is_varify: verify,
      id: id,
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

/*Api function to delete document */
export const DeleteDocument = async (id, type) => {
  const response = await axios.post(
    `${API_URL}admin/deleteDocument`,
    { id: id, type: type },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Api function to add annotation for the document */
export const ADocAnnotation = async (
  id,
  docId,
  assineduserid,
  email,
  subject,
  comment,
  x,
  y,
  type,
  adminType,
  senderName,
  assignName,
  satus,
  nextFollowupDate,
  AssignUserType,
  DocUrl,
  Senderemail,
  employee_id,
  assigned_by_id,
  docPartentId,
  AdobeAnnotation,
  annotationId,
  DocUserType,
  docName,
  stardivate,
  endDate,
  GroupBy,
  Priority,
  Status
) => {
  // console.log(
  //   "1. task_creator_user_id =>", id,
  //   "2. task_creator_user_type =>", user_type === "admin" ? "admin" : "agent",
  //   "3. doc_id =>", docId,
  //   "4. user_admin_assigned =>", type === "partner" || "partnerChat" ? assigned_by_id : "",
  //   "5. json =>", AdobeAnnotation,
  //   "6. assined_to_user_id =>", assineduserid,
  //   "7. assigned_user_type =>", AssignUserType,
  //   "8. document_url =>", type === "partner" || "partnerChat" ? DocUrl : "",
  //   '9. subject_description =>', comment,
  //   '10. x_axis =>', x,
  //   '11. y_axis =>', y,
  //   '12. type =>', type,
  //   '13. employee_id =>', employee_id,
  //   '14. doc_parent_id =>',docPartentId,
  // '15. DocUserType =>', DocUserType,
  // '16. assign_to =>',email
  // )
  const response = await axios.post(
    `${API_URL}admin/docTaskAdd?document_user_type=${DocUserType}`,
    //Old json {
    //   task_creator_user_id: id,
    //   task_creator_user_name: senderName,
    //   task_creator_user_email: Senderemail,
    //   task_creator_user_type: adminType,
    //   doc_id: docId,
    //   assined_to_user_id: assineduserid,
    //   assigned_to: email,
    //   assigned_to_name: assignName,
    //   assigned_user_type: AssignUserType,
    //   document_url: type === "partner" || "partnerChat" ? DocUrl : "",
    //   next_followup_date: nextFollowupDate,
    //   followup_status: satus,
    //   subject: subject,
    //   subject_description: comment,
    //   x_axis: x,
    //   y_axis: y,
    //   type: type,
    //   employee_id: employee_id,
    // },
    {
      task_creator_user_id: id,
      task_creator_user_type: adminType,
      doc_id: docId,
      user_admin_assigned:
        type === "partner" || "partnerChat" ? assigned_by_id : "",
      json: AdobeAnnotation,
      assined_to_user_id: assineduserid,
      assigned_user_type: AssignUserType,
      document_url: type === "partner" || "partnerChat" ? DocUrl : "",
      subject_description: comment,
      x_axis: x,
      y_axis: y,
      type: type,
      employee_id: employee_id,
      doc_parent_id: docPartentId,
      id: annotationId,
      assigned_to: email,
      assigned_to_name: assignName,
      document_name: docName,
      start_date: stardivate,
      end_date: endDate,
      group_by: GroupBy,
      priority: Priority,
      status: Status,
      subject: subject,
      next_followup_date: nextFollowupDate,
      followup_status: satus,
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

/*Api to get common json to get the json to add task  */
export const GetGetCommanJson = async (type) => {
  const response = await axios.post(`${API_URL}api/common_controller/getCommonJson`, {
    type: type
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to get document comment list  */
export const GetCommentsAndAssign = async (
  id,
  userid,
  status,
  type,
  page,
  limit,
  sort,
  column,
  time,
  assigned_user_type,
  employeeId,
  userType,
  taskId,
  task_creator_user_id,
  task_creator_user_type,
  applicantType,
  search
) => {
  // console.log( "id:", taskId,
  // "userid"+userid,
  // "status"+status,
  //   "type"+type,
  //   "page"+page,
  //   "limit"+limit,
  //   "sort"+sort,
  //   "column"+column,
  //   "time"+time,
  //  "assigned_user_type" +assigned_user_type)
  const response = await axios.post(
    `${API_URL}admin/searchDocTask`,
    {
      page: page,
      limit: limit,
      sort_order: sort,
      column_name: column,
      filter_by_time: time,
      doc_id: id,
      assined_to_user_id: userid,
      status: status,
      type: type,
      assigned_user_type: assigned_user_type,
      employee_id: employeeId,
      employee_type: userType,
      id: taskId || "",
      task_creator_user_id: task_creator_user_id,
      task_creator_user_type: task_creator_user_type,
      search: search
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

/*Api to get document task admin list  */
export const GetAdminsTasks = async (
  id,
  userid,
  status,
  type,
  page,
  limit,
  sort,
  column,
  time,
  assigned_user_type,
  employeeId,
  userType,
) => {
  // console.log( "idi"+id,
  // "userid"+userid,
  // "status"+status,
  //   "type"+type,
  //   "page"+page,
  //   "limit"+limit,
  //   "sort"+sort,
  //   "column"+column,
  //   "time"+time,
  //  "assigned_user_type" +assigned_user_type)
  const response = await axios.post(
    `${API_URL}admin/getDocTaskByAssignedType`,
    {
      page: page,
      limit: limit,
      sort_order: sort,
      column_name: column,
      filter_by_time: time,
      doc_id: id,
      assined_to_user_id: userid,
      status: status,
      type: type,
      assigned_user_type: assigned_user_type,
      employee_id: employeeId,
      employee_type: userType
      // id:"",task_creator_user_id:""
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

/*Api to update Documentcomment assign */
export const UpdateDocuentcommentAssign = async (json, docUserType) => {
  const response = await axios.put(`${API_URL}admin/updateDocTask?document_user_type=${docUserType}`, json, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to delete document comments */
export const DeleteCommentsAndAssign = async (DocId, id, userId,
  userType,
  adminId,
  adminType,) => {
  const response = await axios.post(
    `${API_URL}admin/deleteDocTask`,
    {
      doc_id: DocId,
      id: id,
      user_id: userId,
      user_type: userType,
      admin_id: adminId,
      admin_type: adminType,
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

/*Api to Send Reply for document comments */
export const SendReplyCommit = async (
  data,
  email,
  msg,
  recid,
  adminType,
  SenderName,
  assignName,
  type,
  senderId,
  senderEmail,
  senderType,
  employee_id,
  parent_id,
  DocUserType,
  id,
  docName
) => {
  // console.log(senderEmail, "  id =>", id, "DocUserType", DocUserType, "type:", type, "senderType", senderType)
  //   "doc_id =>", data.doc_id,
  // "task_id =>", data.task_id,
  // "sender_id =>", senderId,
  // "sender_email =>", senderEmail,
  // "sender_name =>", SenderName,
  // "sender_type =>", senderType,
  // "receiver_id =>", recid,
  // "receiver_type =>", adminType,
  // "mention =>", email,
  // "receiver_name =>", assignName,
  // "document_url =>", "",
  // "next_followup_date =>", "",
  // "followup_status =>", "",
  // "subject =>", "",
  // "msg =>", msg,
  // "type =>", type,
  // "employee_id =>", employee_id,
  // "doc_parent_id =>", parent_id,
  //  "data =>", data,
  // data.task_id ? "fff" : "mmmm"
  // )
  const response = await axios.post(
    `${API_URL}admin/sendMsg?document_user_type=${DocUserType}`,
    {
      id: id,
      doc_id: data.doc_id,
      task_id: data.task_id ? data.task_id : data.id,
      sender_id: senderId,
      sender_email: senderEmail,
      sender_name: SenderName,
      sender_type: senderType,
      receiver_id: recid,
      receiver_type: adminType,
      mention: email,
      receiver_name: assignName,
      document_url: "",
      next_followup_date: "",
      followup_status: "",
      subject: "",
      msg: msg,
      type: type,
      employee_id: employee_id,
      document_name: docName,
      doc_parent_id: parent_id// want to make changes to the backend for this variable
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

/*Api to Send Reply for document comments */
export const SendReplyCommitSharepoint = async (
  data,
  msg,
  recid,
  adminType,
  type,
  senderId,
  senderType,
  employee_id
) => {
  // console.log(
  //   "doc_id" + data.doc_id,
  //   "employee_id" + employee_id,
  //   "task_id" + data.id,
  //   "sender_id" + senderId,
  //   "sender_type" + senderType,
  //   "receiver_id" + recid,
  //   "receiver_type" + adminType,
  //   "msg" + msg,
  //   "type" + type
  // );
  const response = await axios.post(
    `${API_URL}admin/sendMsg`,
    {
      doc_id: data.doc_id,
      employee_id: employee_id,
      task_id: data.id,
      sender_id: senderId,
      sender_type: senderType,
      receiver_id: recid,
      receiver_type: adminType,
      msg: msg,
      type: type,
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

/*Api to Get Reply for document comments */
export const GetReplyCommit = async (doc_id, task_id) => {
  const response = await axios.post(
    `${API_URL}/admin/get_messages`,
    {
      doc_id: doc_id,
      task_id: task_id

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

/*Api to delete document comments replyes */
export const DeleteReplyCommentsAndAssign = async (id, userId,
  userType,
  adminId,
  adminType,) => {
  const response = await axios.post(
    `${API_URL}admin/deleteThreadMsg`,
    {
      id: id,
      user_id: userId,
      user_type: userType,
      admin_id: adminId,
      admin_type: adminType,

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

/*Api to Add update visa */
export const AddUpdateVisa = async (employee_id, state, id, type) => {
  // console.log("employee_id:", employee_id,
  //   "id:", id,
  //   "country:", state.country,
  //   "type:", type,
  //   "status: ", state.status,
  //   "visa_decision_date:", state.visa_decision_date)
  const response = await axios.put(
    `${API_URL}addUpdateVisa `,
    {
      employee_id: employee_id,
      id: id,
      country: state.country,
      type: type,
      status: state.status,
      visa_decision_date: state.visa_decision_date
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

/*Api to get Visa List */
export const GetEmployeeVisaList = async (
  search,
  status,
  country,
  interested,
  page,
  limit,
  column,
  sort,
  id,
  type,
  substage
) => {
  const response = await axios.post(
    `${API_URL}getVisa`,
    {
      search: search,
      filter_by_interested_in_id: interested,
      filter_by_visa_country: country,
      filter_by_visa_status: status,
      filter_by_employee_id: id,
      page: page,
      limit: limit,
      column_name: column,
      sort_order: sort,
      type: type,
      substage: substage
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

/*Api to get Visa Sub stage List */
export const GetVisaSubStages = async (misc_id, type, id) => {
  const response = await axios.post(
    `${API_URL}common/getMiscellaneousSubstage`,
    {
      id: id,
      filter_by_misc_id: misc_id,
      filter_by_type: type,
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
/*Api to add update visa sub stage */
export const AddUpdateEmployeeVisaSubStage = async (json) => {
  const response = await axios.put(
    `${API_URL}common/addUpdateMiscellaneousSubstage`,
    json,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Delete Visa api */
export const DeleteVisa = async (id) => {
  const response = await axios.post(
    `${API_URL}deleteVisa`,
    {
      id: id,
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

// EMPLOYER'S API
/*Employer sign up */
export const EmployerSignUp = async (props, permission) => {
  let newPass = encryptPassword(props.password)
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", newPass);
  formData.append("contact_no", props.contact_no);
  formData.append("term_and_condition", props.term_and_condition);
  formData.append("otp", props.otp);
  formData.append("permission", JSON.stringify(permission));
  const response = await axios.post(`${API_URL}employer_signup`, formData);
  return response.data;
};

/*Employer Login */
export const EmployerLogin = async (props) => {
  let newPass = encryptPassword(props.password)
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", newPass);
  formData.append("remember", props.remember);
  const response = await axios.post(`${API_URL}employer_login`, formData);
  return response.data;
};

/*Api to login in with linked employer*/
export const LinkedInLoginEmployer = async (props, type) => {
  if (type === "employerLogin") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(
      `${API_URL}api/Common_controller/linkedinLogin`,
      formData
    );
    return response.data;
  }
};

/*Api to login in with linked  employer*/
export const LinkedInSignupEmployer = async (props, type) => {
  if (type === "employerSignup") {
    const formData = new FormData();
    formData.append("code", props);
    const response = await axios.post(
      `${API_URL}api/Common_controller/linkedinLogin`,
      formData
    );
    return response.data;
  }
};

/*Api to login in with Social linkes in employer login*/
export const SocialCompanyLogin = async (token, email, name, picture, type) => {
  const response = await axios.post(
    `${API_URL}company/signupLoginViaSocialMedia`,
    {
      token: token,
      email: email,
      name: name,
      picture: picture,
      type: type,
    }
  );
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
};

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
  lima,
  status,
  employee_id,
  reserved_status
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
      filter_lmia_status: lima,
      filter_employee_status: status,
      filter_employee_id: employee_id,
      filter_is_reserve: reserved_status,
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

/*Delete Response api */
export const DeletRespone = async (apply_id, employee_id) => {
  const response = await axios.post(
    `${API_URL}deleteApplyJob`,
    {
      apply_id: apply_id,
      employee_id: employee_id,
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
  id,
  selfValue,
  adminValue,
  reserved,
  // employeeSkill,
  cid,
  manager_id,
  featured
) => {
  // console.log(
  //    "column_name =>",column_name,
  //   "sort_order =>",sort_order,
  //   "company =>",company,
  //   "time =>",time,
  //   "id =>",id,
  //   "selfValue =>",selfValue,
  //   "adminValue =>",adminValue,
  //   "reserved =>",reserved,
  //   "cid =>",cid,
  //   "manager_id =>",manager_id,
  //   "featured =>",featured)
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
      job_id: id,
      // filter_company_name: company,
      filter_applied_by_self: selfValue,
      // filter_applied_by_admin: adminValue,// limia ka data check krne ke liye comment kiya he
      // filter_reserved_employee: reserved,// limia ka data check krne ke liye comment kiya he 
      // employee_skills: employeeSkill,
      filter_company_id: cid,
      manager_id: manager_id,
      is_featured: featured
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
  status,
  cid
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
      filter_by_company_id: cid,
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
  // /job_detail(props.state, employee_id, job_id);
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

/*Get lmia list Api */
export const GetEmployeeByLima = async (
  id,
  search,
  status,
  page,
  limit,
  col,
  ord,
  time,
  employee_id
) => {
  const response = await axios.post(
    `${API_URL}company/getLmia`,
    {
      lmia_status: status,
      search: search,
      filter_by_job_id: id,
      page: page,
      limit: limit,
      sort_order: ord,
      column_name: col,
      filter_by_time: time,
      filter_employee_id: employee_id,
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
  // (props);
  const response = await axios.put(
    `${API_URL}admin/addUpdateLmia`,
    {
      job_id: job_id,
      employee_id: employee_id,
      lmia_status: props.lmia_status,
      apply_id: props.apply_id,
      // completion_time: props.completion_time,
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

/*Function to add update lmia additional information for employee lmia*/
export const AddLmiaAdditionalInformationEmployee = async (data) => {
  // (props);
  const response = await axios.put(
    `${API_URL}admin/updateLmiaDetails`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Function to add update lmia additional information for job lmia*/
export const AddLmiaAdditionalInformationJob = async (data) => {
  // (props);
  const response = await axios.put(
    `${API_URL}updateLmiaDetailsJob`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Function get lima substage of empolyee */
export const GetLimaSubStages = async (id) => {
  const response = await axios.post(
    `${API_URL}/getLmiaSubstagesEmployee`,
    {
      lmia_id: id,
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

/*Function get lima substage of empolyee */
export const GetJobLimaSubStages = async (id, status) => {
  const response = await axios.post(
    `${API_URL}/getLmiaSubstagesjob`,
    {
      job_id: id,
      lima_status: status,
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

/*Function to add update lmia sub stage of employee */
export const AddUpdateEmployeeLmiaSubStage = async (props) => {
  const response = await axios.put(
    `${API_URL}addUpdateLmiaSubstagesEmployee`,
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

/*Function to Delete lmia sub stage of employee */
export const deleteLmiaSubstageEmployee = async (id) => {
  const response = await axios.post(
    `${API_URL}/deleteLmiaSubstageEmployee`,
    {
      id: id,
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

/*Function to add update lmia sub stage  of job*/
export const AddUpdateJobLmiaSubStage = async (props) => {
  const response = await axios.put(
    `${API_URL}addUpdateLmiaSubstagesJob`,
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

/*Fuction to delete lmiasub stage */
export const deleteLmiaSubstageJob = async (id) => {
  const response = await axios.post(
    `${API_URL}/deleteLmiaSubstageJob`,
    {
      id: id,
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

/*FUnction to get LMIA status */
export const getLMIAstatus = async (props) => {
  const response = await axios.post(
    `${API_URL}company/getLmia`,
    { lmia_status: props },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get list of the Document */
export const GetEmployerDocumentList = async (id, type) => {
  const response = await axios.post(
    `${API_URL}company/getDocumentsUploaded`,
    {
      company_id: id,
      type: type,
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

/*Api to upload document*/
export const UploadEmployerDocument = async (id, type, doc, docId, docName) => {
  const response = await axios.put(
    `${API_URL}company/documentsUpload `,
    {
      company_id: id,
      type: type,
      document_file: doc,
      is_varify: "0",
      id: docId,
      document_name: docName,
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

/*Api to verify Applicants document */
export const VarifyEmployerDocument = async (id, verify) => {
  const response = await axios.put(
    `${API_URL}company/isVarify `,
    {
      is_varify: verify,
      id: id,
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
  let newPass = encryptPassword(props.password)
  // console.log("newPass :-", newPass)
  const formData = new FormData();
  formData.append("email", props.email);
  formData.append("password", newPass);
  const response = await axios.post(`${API_URL}admin_login`, formData);
  return response.data;
};

/*Admin Forgot password Api */
export const AdminForgotPasswordApi = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/forgetPassword`,
    { forget_email: props.forget_email },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
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
export const getAllMentionNotification = async (
  type,
  loginuserid,
  userType,
  id,
  page,
  limit
) => {
  const response = await axios.post(
    `${API_URL}common/getMentionNotifications`,
    {
      //Old json
      // from_id:
      //   userType === "agent" || type === "mention_partner" ? "" : loginuserid,
      // type: userType === "agent" || type === "mention_partner" ? "" : userType,
      // subject: type,
      // action_id:
      //   userType === "agent" || type === "mention_partner" ? loginuserid : "",
      // mention_id: "",
      // employee_id: "",
      // sender_type:
      //   userType === "agent" || type === "mention_partner" ? userType : "",
      // page: page,
      // limit: limit,
      from_id: loginuserid, //userType === "agent" || type === "mention_partner" ? loginuserid : "",
      from_user_type: userType, //userType === "agent" || type === "mention_partner" ? "" : userType,
      subject: type,
      action_id: "", //userType === "agent" || type === "mention_partner" ? "" : loginuserid,
      mention_id: "",
      employee_id: "",
      page: page,
      limit: limit,
      interested_in_id: portal === "study" ? "study permit" : ""
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
};

/*Admin List Api */
export const getallAdminData = async (
  type,
  search,
  page,
  limit,
  column,
  sort,
  is_active
) => {
  const response = await axios.post(
    `${API_URL}admin/getAllAdmin`,
    {
      filter_admin_type: type,
      page: page,
      search: search,
      limit: limit,
      column_name: column,
      sort_order: sort,
      is_active: is_active
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
  const response = await axios.post(`${API_URL}admin/getFilterList`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response;
};

/*Add Filters Api */
export const AddFIlter = async (props, id) => {
  // console.log(props)
  const response = await axios.put(
    `${API_URL}${user_type}/addUpdatefilterList`,
    { id: id, json_item: props.json_item, item_id: props.item_id },
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

/*Reassign Admin Api before deletion */
export const ReassignAdminApi = async (props) => {
  const response = await axios.post(
    `${API_URL}/admin/deleteAdmin_new`,
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


/*Add Aplicant's Followup Api */
export const AddFollowup = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/addFollowUpEmployee`,
    {
      admin_id: admin_id,
      // job_id: props.jobId,
      employee_id: props.employee_id,
      remark: props.remark,
      next_date: props.next_followup_date,
      subject: props.subject,
      status: props.status,
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
export const getSingleFollowup = async (
  employee_id,
  column_name,
  sort_order,
  page,
  limit,
  status,
  search /*, job_id*/
) => {
  const response = await axios.post(
    `${API_URL}admin/getFollowUpEmployee`,
    {
      /*job_id: job_id,*/ employee_id: employee_id,
      column_name: column_name,
      sort_order: sort_order,
      page: page,
      status: status,
      limit: limit,
      search: search,
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
export const getSingleCompanyFollowup = async (
  company_id,
  column_name,
  sort_order,
  page,
  limit,
  status,
  search
) => {
  const response = await axios.post(
    `${API_URL}admin/getFollowUpEmployer`,
    {
      company_id: company_id,
      column_name: column_name,
      sort_order: sort_order,
      page: page,
      status: status,
      limit: limit,
      search: search,
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

/*Get All Users Followup Data */
export const getAllUsersFollowUpData = async (
  userId,
  userType,
  column,
  sort,
  search,
  page,
  limit,
  status
) => {
  const response = await axios.post(
    `${API_URL}admin/getFollowUp`,
    {
      user_id: userId,
      user_type: userType,
      column_name: column,
      sort_order: sort,
      search: search,
      limit: limit,
      status: status,
      page: page
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

/*Add All user's Followup Api */
export const AddAllUserFollowup = async (props) => {
  const response = await axios.post(`${API_URL}admin/addFollowUp?document_user_type=${props.user_type}`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Add Comapany's Followup Api */
export const AddCompanyFollowup = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/addFollowUpEmployer`,

    // // "admin_id":"2",
    // // "job_id":"1",
    // company_id: props.company_id,
    // remark: props.remark,
    // next_date: props.next_date,
    // subject: props.subject,
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

/*Api to get email Pagination */
export const GetAllEmailPagination = async (email, search) => {
  const response = await axios.post(
    `${API_URL}/common/paginationReadOutlookEmail`,
    {
      filter_by_email_id: email,
      search: "",
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

/*Api to update email template */
export const AddUpdateEmailTemplate = async (props) => {
  const response = await axios.put(
    `${API_URL}common/addUpdateEmailTemplate`,
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
  // (props);
  const response = await axios.post(
    `${API_URL}/common/emailTemplateTest`,
    {
      email_id: props.email_id,
      email_template_id: props.email_template_id,
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

/* Function to get get email authentication*/
export const GeEmailAuthenticationData = async () => {
  const response = await axios.get(
    // `http://192.168.29.92/canjobs_latest/common/openEmail`,
    // `http://192.168.29.92/canjobs_latest/common/openSentEmail`,
    `${API_URL}common/outlookAuthUrl`,
    {
      // type: emailType,
      // email_id: id,
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

/* Function to get share point*/
export const GetSharePointData = async () => {
  const response = await axios.get(
    `${API_URL}admin/sharePointToken`,
    {
      // type: emailType,
      // email_id: id,
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

/* Function to Refresh share point*/
export const RefreshPointData = async () => {
  const response = await axios.get(
    `${API_URL}admin/refreshSharePointToken`,

    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get single  email preveiw */
export const GetPreviewEmail = async (emailType, id) => {
  const response = await axios.post(
    // `http://192.168.29.92/canjobs_latest/common/openEmail`,
    // `http://192.168.29.92/canjobs_latest/common/openSentEmail`,
    `${API_URL}canjobs_latest/common/openSentEmail`,
    {
      type: emailType,
      email_id: id,
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

/*Api to get single  email preveiw Attchment */
export const GetPreviewAttchmentEmail = async (emailType, id) => {
  const response = await axios.post(
    `${API_URL}common/readOutlookEmailAttachment`,
    {
      msg_id: id,
      inbox_type: emailType,
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
/*Api to read email */

export const ReadEmail = async (page, limit, search, email) => {
  // console.log(email)
  const response = await axios.post(
    // `http://192.168.29.92/canjobs_latest/common/readEmail`,
    // `${API_URL}canjobs_latest/common/readEmail`,
    `${API_URL}common/readOutlookEmail`,
    {
      // email_id: id,
      page: page,
      count: limit,
      filter_by_email_id: email,
      search: search,
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

/*Api to read Sent email */
export const ReadSentEmail = async (page, limit, search, email) => {
  // console.log(email, "lll")
  const response = await axios.post(
    // `http://192.168.29.92/canjobs_latest/common/readSentEmail`,
    // `${API_URL}canjobs_latest/common/readSentEmail`,
    `${API_URL}common/readSentOutlookEmail`,

    {
      // email_id: id,
      page: page,
      count: limit,
      filter_by_email_id: email,
      // filter_by_to_email_id: email,
      search: search,
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

/*Api to All Sent email */
export const ReadAllEmail = async (page, limit, search, email) => {
  const response = await axios.post(
    `${API_URL}common/getSentAndInboxMails`,
    {
      // email_id: id,
      // page: page,
      count: limit,
      // filter_by_email_id: email,
      search: search,
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

/*Api to reply email */
export const ReplyToMail = async (msgId, type, msg) => {
  const response = await axios.post(
    `${API_URL}common/replyToOutlookEmail`,
    {
      msg_id: msgId,
      inbox_type: type,
      replyMsg: msg,
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

/*Api to get the job filterd by employee id if it is applied or not */
export const GetEmployeeFilterJob = async (
  id /* skill*/,
  search,
  location,
  category,
  skill,
  job,
  page,
  limit,
  column_name,
  sort_order,
  company
) => {
  const response = await axios.post(
    `${API_URL}admin/getAllJobsViewAdmin`,
    {
      employee_id: id,
      filter_keyskill: skill,
      filter_category_id: category,
      filter_job_swap: job,
      filter_location: location,
      page: page,
      search: search ? search : company,
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
  return response;
};

/*Api to Reserved employee for a job */
export const ReservedEmployeeForJob = async (id, employee_id, status) => {
  // console.log(id, employee_id, status)
  const response = await axios.put(
    `${API_URL}setEmployeeReserve`,
    {
      apply_id: id,
      is_reserve: status,
      employee_id: employee_id,
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

/*Api to Remove Reserved employee for a job */
export const RemoveReservedEmployeeForJob = async (apply_id, employee_id) => {
  const response = await axios.post(
    `${API_URL}removeEmployeeReserve`,
    {
      apply_id: apply_id,
      employee_id: employee_id,
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

/*Api to Send email to the user and company*/
export const SendEmail = async (data, FileList, url) => {
  // console.log(FileList);
  const formData = new FormData();
  formData.append("to", data.email);
  formData.append("subject", data.subject);
  formData.append("body", data.description);
  formData.append("cc_email", data.adminemail);
  formData.append("attachments_url", url);
  formData.append("bcc_email", data.bccemail);
  formData.append("signature", data.signature);
  formData.append("sender_id", data.sender_id);
  for (let i = 0; i < FileList.length; i++) {
    formData.append(`attachments[${i}]`, FileList[i]);
  }
  const response = await axios.post(
    `${API_URL}sendEmailTest`,
    // {
    //   to: data.email,
    //   subject: data.subject,
    //   body: data.description,
    //   cc_email: data.adminemail,
    // }
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to forward  email to the user and company*/
export const forwardMail = async (data, FileList, url) => {
  // console.log(FileList);
  const response = await axios.post(
    `${API_URL}forwardMail`,
    data
    ,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get manager's team list*/
export const GetManagerTeam = async (manager_id) => {
  const response = await axios.post(
    `${API_URL}manager/getTeam`,
    {
      manager_id: manager_id,
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

/*Api to Add executive to the manager*/
export const AddExecutiveTeam = async (manager_id, executive_id) => {
  const response = await axios.put(
    `${API_URL}manager/addUpadateTeam`,
    {
      manager_id: manager_id,
      executive_id: executive_id,
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

/*Api to Remove executive to the manager*/
export const RemoveExecutiveTeam = async (executive_id) => {
  const response = await axios.put(
    `${API_URL}manager/deleteTeamMember`,
    {
      executive_id: executive_id,
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

/*Api to Reasign job to manager*/
export const ReassignJobTOManager = async (manager_id, job_id) => {
  const response = await axios.put(
    `${API_URL}admin/assignJobToManager`,
    {
      manager_id: manager_id,
      job_id: job_id,
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

/*Api to get employee setting */
export const GetEmployeeSetting = async () => {
  const response = await axios.post(
    `${API_URL}employee/getEmployeeSetting`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get employer setting */
export const GetEmployerSetting = async () => {
  const response = await axios.post(
    `${API_URL}employer/getEmployerSetting`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to get Admin setting */
export const GetAdminrSetting = async () => {
  const response = await axios.post(`${API_URL}admin/getAdminSetting`, "", {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to get Parent setting */
export const GetParentSetting = async (data) => {
  const response = await axios.post(
    `${API_URL}setting/getParentSetting`,
    { type: data },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to Add permission to employeE*/
export const AddEmployeePermission = async (data) => {
  const response = await axios.put(
    `${API_URL}employee/updateEmployeeSetting`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to Add permission to employer*/
export const AddEmployerPermission = async (data) => {
  const response = await axios.put(
    `${API_URL}employer/updateEmployerSetting`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Api to Add permission to admin*/
export const AddAdminPermission = async (data) => {
  const response = await axios.put(`${API_URL}admin/updateAdminSetting`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to Add permission by admin to employee and employer*/
export const AddChildPermission = async (data) => {
  const response = await axios.put(
    `${API_URL}setting/updateParentSetting`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

//Agent
/*Api to login agent*/
export const LoginAgent = async (state) => {
  let newPass = encryptPassword(state.password)
  const formData = new FormData();
  formData.append("email", state.email);
  formData.append("password", newPass);
  const response = await axios.post(`${API_URL}agent/login`, formData);
  return response.data;
};

/*Api to Signup agent*/
export const SignupAgent = async (state) => {
  let newPass = encryptPassword(state.password)
  const formData = new FormData();
  formData.append("email", state.email);
  formData.append("password", newPass);
  formData.append("name", state.name);
  formData.append("otp", state.otp);
  const response = await axios.post(`${API_URL}agent/signup`, formData);
  return response.data;
};

/*Api to Forgot password agent*/
export const ForgotAgentPasswordApi = async (props) => {
  const response = await axios.post(`${API_URL}agent/forgetPassword`, {
    forget_email: props.forget_email,
  });
  return response.data;
};

/*Api to Reset password agent*/
export const ResetAgentPasswordApi = async (props) => {
  const response = await axios.put(`${API_URL}agent/resetPassword`, props, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to Add update agent*/
export const AddUpdateAgent = async (data) => {
  const response = await axios.put(`${API_URL}agent/addUpadateAgent`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Api to Get agent*/
export const GetAgent = async (id, search, page, limit, column, Order) => {
  const response = await axios.post(
    `${API_URL}agent/getAgent`,
    {
      page: page,
      search: search,
      limit: limit,
      column_name: column,
      sort_order: Order,
      id: id,
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

/*Api to delete agent */
export const DeleteAgent = async (id) => {
  const response = await axios.post(
    `${API_URL}agent/deleteAgent`,
    {
      id: id,
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

/*Api to get agent json list */
export const GetAgentJson = async () => {
  const response = await axios.post(`${API_URL}filterList/agentList.json    `, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  });
  return response.data;
};

/*Payment Api's */
export const CreateRazorpay = async (price, currency) => {
  const response = await axios.post(
    `${API_URL}payment/creatRazorpayOrder`,
    {
      price: price,
      currency: currency,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};

/*Razor pay payment api */
export const AddRazorpay = async (amount, response, role, id) => {
  await axios.post(
    `${API_URL}payment/addRazorPayReciept`,
    {
      amount: amount,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpay0rderId: response.razorpay_order_id,
      razorpaysighature: response.razorpay_signature,
      user_role: role,
      id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};

/*Stripe payment api */
export const AddStripePalpay = async (amount) => {
  const response = await axios.post(
    `${API_URL}payment/stripe-create-payment-intent`,
    {
      amount: amount,
      currency: "usd",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );

  return response;
};

/*Braintree payment api */
export const AddBrainTressPayment = async (amount, nonce, name) => {
  const response = await axios.post(
    `${API_URL}payment/payWithBraintree`,
    {
      amount: amount,
      nonce: nonce,
      first_name: name.split(" ").shift(),
      last_name: name.split(" ").join(" "),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );

  return response;
};

/*Stripe payment api */
export const GetStripePaymentDetails = async (
  id,
  user_id,
  user,
  mode,
  status
) => {
  const response = await axios.post(
    `${API_URL}payment/get-stripe-payment-detaile`,
    {
      payment_intent_id: id,
      id: user_id,
      payment_mode: mode,
      user_role: user,
      status: status,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );

  return response;
};

/*Add payment to database api */
export const AddPaymentToDataBase = async (
  data,
  user_id,
  amount,
  mode,
  user
) => {
  const response = await axios.post(
    `${API_URL}payment/capturePayment`,
    {
      id: user_id,
      order_id: data.orderID,
      user_role: user,
      payment_id: data.paymentID,
      amount: amount,
      status: "success",
      payment_mode: mode,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};

/*Api to get payment list */
export const GetPaymentList = async (id, user, payType) => {
  const response = await axios.post(
    `${API_URL}payment/getPaymentReciept`,
    {
      user_id: id,
      user_role: user,
      pay_by_admin: payType,
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

/*Api to add cash paymet by admin  */
export const AddCashpayment = async (data) => {
  const response = await axios.put(
    `${API_URL}payment/addPaymentReciept`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/*Global Search API */
export const GlobalSearchResult = async (search, admin_id, admin_type) => {
  // console.log(admin_id, admin_type)
  const response = await axios.post(
    `${API_URL}common/globalSearch`,
    { search },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Global Search other API */
export const GlobalSearchResultOther = async (search, admin_id, admin_type) => {
  // console.log(admin_id, admin_type)
  const response = await axios.post(
    `${API_URL}common/globalSearchOther`,
    { search },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Global Search retaled API */
export const GlobalSearchResultRelated = async (search, admin_id, admin_type) => {
  // console.log(admin_id, admin_type)
  const response = await axios.post(
    `${API_URL}common/globalSearchRelated`,
    { search },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Global Search API */
export const getActivityLog = async (
  page,
  user_id,
  user_type,
  action_id,
  action_type,
  limit,
  stackHolder_id,
  stackHolder_type,
  pagetype,
  sort,
  columnName,
  time,
  applicantType
) => {
  // console.log("Props" + props.user_id + props.user_type);
  const response = await axios.post(
    `${API_URL}getActivityLog`,
    {
      page: page,
      user_id: user_id,
      user_type: user_type,
      action_id: action_id,
      action_type: action_type,
      column_name: columnName || "created_at",
      sort_order: sort ? sort : "DESC",
      limit: limit,
      filter_by_time: time,
      stackHolder_id: stackHolder_id,
      stackHolder_type: stackHolder_type,
      status: pagetype === "interviewHistory" ? "21,36" : "",
      interested_in_id: applicantType,
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

// Api fucntion to get Credential Data
export const GetCredentialData = async (id, type) => {
  // console.log("Props" + props.user_id + props.user_type);
  const response = await axios.post(
    `${API_URL}admin/getServiceCredential`,
    {
      id: id,
      type: type,
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

// Api fucntion to Update Credential Data
export const UpdateCredentialApi = async (props) => {
  const response = await axios.post(
    `${API_URL}admin/addUpdateServiceCredential`,

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

/*Share point apis */
// Api function to get folders or type of document of perticular employee
export const getSharePointFoldersList = async (Id, User, columnName, sort, limit, page) => {
  const response = await axios.post(
    `${API_URL}admin/getSharpointSiteDriveFolderData_new`,
    {
      driveId: driveId,
      userId: Id,
      userType: User,
      // column_name: columnName,
      // sort_order: sort,
      // limit: limit,
      // page: page
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

//Api function to GET emolyee  peticular document folder data
export const getSharePointParticularFolders = async (Id, User, folderId, columnName, sort, limit, page, fileId,) => {
  let create_by_type = user_type === "user" ? "employee" : user_type === "company" ? "employer" : admin_type;
  let create_by_id = user_type === "user" ? user_id : user_type === "company" ? employer_id : admin_id;

  const response = await axios.post(
    `${API_URL}admin/getSharpointSiteDriveFolderToFolderData_new`,
    {
      driveId: driveId,
      userId: Id,
      userType: User,
      folderId: folderId,
      column_name: columnName,
      sort_order: sort,
      limit: limit,
      page: page,
      itemId: fileId,
      created_by: create_by_id,
      created_type: create_by_type,
      is_private: user_type === "admin" ? 1 : 0
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

//Api function to Add document folder or type
export const AddSharePointFolders = async (folder, parentId, isPrivate, userId, userType) => {
  let create_by_type = user_type === "user" ? "employee" : user_type === "company" ? "employer" : admin_type;
  let create_by_id = user_type === "user" ? user_id : user_type === "company" ? employer_id : admin_id;
  console.log(userId, "llll")
  const response = await axios.post(
    `${API_URL}admin/createSharepointFolder_new`,
    {
      driveId: driveId,
      newFolderName: folder,
      parentFolderId: parentId,
      userId: userId,
      userType: userType,
      created_by: create_by_id,
      created_type: create_by_type,
      is_private: isPrivate
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

//Api function to Add sharepoint document
export const AddSharePointDOcument = async (
  id,
  user,
  folderId,
  docType,
  data,
  is_private
) => {
  // console.log(
  //   "employee_id =>",
  //   id,
  //   "userType =>",
  //   user,
  //   "folder_Id =>",
  //   folderId,
  //   "docType =>",
  //   docType,
  //   "file =>",
  //   data
  // );
  let create_by_type = user_type === "user" ? "employee" : user_type === "company" ? "employer" : admin_type;
  let create_by_id = user_type === "user" ? user_id : user_type === "company" ? employer_id : admin_id;
  const formData = new FormData();
  formData.append("docType", docType);
  formData.append("userType", user);
  formData.append("driveId", driveId);
  formData.append("employee_id", id);
  formData.append("folder_Id", folderId);
  formData.append("created_by", create_by_id);
  formData.append("created_type", create_by_type);
  formData.append("is_private", is_private);

  // Loop through the array of files and append each file to formData
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i])
    formData.append(`file[${i}]`, data[i]);
  }
  const allowedPaths = [
    "/initial_consultation",
    "/recruitment_service",
    "/renewal_application",
    "/more_than_one_applicant",
    "/employers_agreement",
    "/work_permit",
    "/alberta_pnp",
    "/three_column",
    "/agreeone",
    "/work_permit_application_2_stage",
    "/dynamic_ra"
  ];
  // console.log(formData)
  if (Token || allowedPaths.includes(window.location.pathname)) {
    const response = await axios.post(
      `${API_URL}admin/sharpointSiteDriveDocumentUpload_new`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: Token,
        },
      }
    );
    return response;
  } else {
    return { error: 'Token is not available' }
  }
};

/*Update private document apis for documents and folder */
export const UpdateDocFolderIsPrivate = async (document_id, is_private) => {
  const response = await axios.post(
    `${API_URL}admin/updateDocument`,
    {
      document_id: document_id,
      is_private: is_private
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

//Api function to get folder or type breadcrumb
export const getFolderBreadcrumb = async (folderid) => {
  const response = await axios.post(
    `${API_URL}admin/getFolderBreadcrumb_new`,
    {
      driveId: driveId,
      folderId: folderid,
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

// Api to convert doc to pdf
export const GetDocConvertToken = async (doc_id) => {
  const response = await axios.get(
    `${API_URL}admin/getSharePointToken`,
  );
  return response;
};

/*Api to convert any file to pdf base64 */
export const GetPdfBaseOfAnyFile = async (data) => {
  const response = await axios.post(`https://api.canpathwaysjobs.com/canjobs/common/changeToPdf
`, data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

// /Api function to edit document name for
export const ChangeDocNameSharpoint = async (
  userId,
  userType,
  docName,
  DocId
) => {
  const response = await axios.post(
    `${API_URL}admin/updateSharepointDocumentName_new`,
    {
      driveId: driveId,
      userId: userId,
      userType: userType,
      newDocumentName: docName,
      documentId: DocId,
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

// /Api function to edit Folder name for sharepoint
export const ChangeFolderNameSharpoint = async (
  userId,
  userType,
  FolderName,
  FolderId
) => {
  const response = await axios.post(
    `${API_URL}admin/updateSharepointFolderName_new`,
    {
      driveId: driveId,
      userId: userId,
      userType: userType,
      newFolderName: FolderName,
      folderId: FolderId,
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

// /Api function to Delete Folder or document for sharepoint
export const DeleteFolderOrDocument = async (FolderId, type, userType, userId) => {
  const response = await axios.post(
    `${API_URL}admin/deleteSharepointDocument_new`,
    {
      driveId: driveId,
      id: FolderId,
      type: type,
      user_id: userId,
      user_type: userType
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

// Api function to Get document url for sharepoint
export const GetSharePointDocUrl = async (Id) => {
  const response = await axios.post(
    `${API_URL}admin/getDocPreviewUrl_new`,
    {
      driveId: driveId,
      doc_id: Id,
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

/*Adobe api */
/*APi to adobe generate token */
export const GetAdobeToken = async (Id) => {
  // console.log(Id)
  const response = await axios.get(
    // `https://pdf-services-ue1.adobe.io/token`,
    `https://ims-na1.adobelogin.com/ims/authorize/v2?client_id=d9e8b7bcb61b42b6a387bfa9cf16a75b
    `
    // {
    //   "client_id": Id,
    // },{
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }
  );
  return response;
};

/*Agreement Apis */
// Api function to Get document url for sharepoint
export const GetAgreement = async (Id, receiver, receiver_type, sort, column, type,) => {
  const response = await axios.post(
    `${API_URL}api/Agreement_api/get_agreement`,
    {
      id: Id,
      receiver: receiver,
      receiver_type: receiver_type,
      type: type,
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
  return response;
};

// Api function to Get document url for sharepoint
export const AddUpdateAgreement = async (data) => {
  const response = await axios.put(
    `${API_URL}api/Agreement_api/addUpdateAgreement`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
};

/*Delete Agreement Api */
export const DeleteAgreement = async (id) => {
  const response = await axios.post(
    `${API_URL}api/Agreement_api/deleteAgreement`,
    { agreement_id: id },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
};

/* Export excel Api */
export const ExportExcelApi = async (table_name, applicantType, status, local, type) => {
  const response = await axios.post(
    `${API_URL}common/getDataForExcel`,
    {
      table_name: table_name,
      interested_in_id: applicantType,//employee table
      filter_status: status,//employee table
      is_local: local,//employee table
      type: type,//task table
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
}

/* Api to apply for program */
export const ApplyProgram = async (data) => {
  const response = await axios.post(
    `${API_URL}addUpdateAppliedPrograms`,
    data
    ,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
}

/* Api to get apply program */
export const GetApplyProgram = async (search, employerId, employee_type, limit, sort, column, page, applied_user_id, applied_user_type, time, program_id) => {
  const response = await axios.post(
    `${API_URL}getAppliedPrograms`,
    {
      search: search,
      column_name: column,
      sort_order: sort,
      limit: limit,
      page: page,
      employee_id: employerId,
      applied_user_id: applied_user_id,
      employee_type: employee_type,
      applied_user_type: applied_user_type,
      program_id: program_id,
      filter_by_time: time,
    }
    ,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response.data;
}

/* Api to Add Update Daily Call Log */
export const AddUpdateDailCallLogApi = async (data) => {
  const response = await axios.post(
    `${API_URL}admin/addUpdateCallLog`,
    data
    ,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/* Api to get Daily Call Log */
export const getDailyCallLogApi = async (serchName, filterbyAdmin, id, searchPhone, page, limit, column, sort) => {
  // console.log(" name:", serchName,
  //   " phone:", searchPhone,
  //   "id:", id, "page:", page,
  //   " limit: ", limit,
  //   'call_ans_by:', filterbyAdmin,
  //   'column_name:', column,
  //   'sort_order:', sort,)
  const response = await axios.post(
    `${API_URL}admin/getCallLog`,
    {
      name: serchName,
      phone: searchPhone,
      id: id, page: page,
      limit: limit,
      call_ans_by: filterbyAdmin,
      column_name: column,
      sort_order: sort,
    }
    ,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/* Api to get Daily Call Log Char*/
export const getDailyCallLogChatApi = async (call_log_id, page, limit) => {
  const response = await axios.post(
    `${API_URL}admin/getCallLogNotes`,
    { call_log_id: call_log_id, page: page, limit: limit }
    ,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/* Api to get Daily Call Log Char*/
export const DeleteCallLogApi = async (data) => {
  const response = await axios.post(
    `${API_URL}admin/deleteCallLog`,
    data
    ,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/*Function to read task ad reply by admin  */
export const ReadTaskOrReplyApi = async (data) => {
  const response = await axios.post(`${API_URL}common/addUpdateTaskThreadRead`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  }
  );
  return response;
}

/*Function to get read task ad reply by admin  */
export const getViewersDataApi = async (id, type) => {
  const response = await axios.post(`${API_URL}common/getTaskThreadRead`,
    { "task_id": id, "type": type }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  }
  );
  return response;
}

/*Api to ad update invoice record*/
export const AddUpdatePaymentInvoiceRecordApi = async (data) => {
  const response = await axios.post(`${API_URL}admin/addUpdateInvoice`,
    data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  }
  );
  return response;
}

/*Api to ad update invoice record*/
export const getAllInvioceRecord = async (data) => {
  const response = await axios.post(`${API_URL}admin/getInvoice`,
    data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  }
  );
  return response;
}

/*Api to delete invoice record*/
export const DeletePaymentIvoiceRecord = async (data) => {
  const response = await axios.post(`${API_URL}admin/deleteInvoice`,
    data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  }
  );
  return response;
}

/*Api to all payment invoice invoice */
export const getAllInvioce = async (data) => {
  const response = await axios.post(`${API_URL}common/getPaymentInvoice`,
    data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  }
  );
  return response;
}

/*Api to ad update invoice */
export const AddUpdatePaymentInvoiceApi = async (data) => {
  const response = await axios.post(`${API_URL}common/addUpdatePaymentInvoice`,
    {
      ...data,
      driveId: driveId
    }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  }
  );
  return response;
}

/*Api to delete payment invoice */
export const DeletePaymentInvoiceApi = async (id) => {
  const response = await axios.post(`${API_URL}common/deletePaymentInvoice`,
    { id: id }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: Token,
    },
  }
  );
  return response;
}

/*Api to get last payment invoice */
export const GetLastPaymentInvoiceApi = async (id) => {
  const response = await axios.get(`${API_URL}common/getLastPaymentInvoice`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/*Api to send invoice reminder */
export const SendPaymentInvoiceReminderApi = async (data) => {
  const response = await axios.post(`${API_URL}common/sendPaymentReminder`, { ...data, driveId: driveId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;

}

/*Api to Get hour log */
export const GetHourLogApi = async (data) => {
  const response = await axios.post(`${API_URL}admin/getDailyHourLog
`, data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/*Api to Add  Hour log */
export const AddUpdateHourLogApi = async (data) => {
  const response = await axios.post(`${API_URL}admin/addUpdateDailyHourLog
`, data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/*Api to Delete  Hour log */
export const DeleteUpdateHourLogApi = async (data) => {
  const response = await axios.post(`${API_URL}admin/deleteDailyHourLog
`, data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/*Api to Delete  Hour log */
export const SendHtmlForPdf = async (html) => {
  const response = await axios.post(`${API_URL}/admin_api/createPdfUsingHtml`, {
    html: html
  },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/*Add Update Consultation */
export const AddUpdateConsultation = async (data) => {
  const formData = new FormData();
  // Append regular fields
  formData.append("applicant_name", data.applicant_name);
  formData.append("driveId", driveId);
  formData.append("id", data.id);
  formData.append("phone", data.phone);
  formData.append("email", data.email);
  formData.append("manager_id", data.manager_id);
  formData.append("manager_type", data.manager_type);
  formData.append("person_admin_id", data.person_admin_id);
  formData.append("person_admin_type", data.person_admin_type);
  formData.append("date", data.date);
  formData.append("ra_sent_signed", data.ra_sent_signed);
  formData.append("payment_status", data.payment_status);
  formData.append("email_secondary", data.email_secondary);
  formData.append("payment_method", data.payment_method);
  formData.append("payment_date", data.payment_date);
  formData.append("mode_of_meeting", data.mode_of_meeting);
  formData.append("notes", data.notes);

  // // Append documents (files)
  // if (Array.isArray(data.documents)) {
  //   data.documents.forEach((doc, index) => {
  //     if (doc.file) {
  //       formData.append(`documents[${index}]`, doc.file, doc.name || `file_${index}`);
  //     }
  //   });
  // }
  if (data.document) {
    for (let i = 0; i < data.document.length; i++) {
      formData.append(`document[${i}]`, data.document[i]);
    }
  }
  const response = await axios.post(`${API_URL}common/addUpdateConsultation`, formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: Token,
      },
    }
  );
  return response;
}

/*Api Function to get consultation data */
export const GetConsultation = async (data) => {
  const response = await axios.post(`${API_URL}common/getConsultation`, data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}

/*Api Function to Delete consultation data */
export const DeleteConsultation = async (data) => {
  const response = await axios.post(`${API_URL}common/deleteConsultation`, data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    }
  );
  return response;
}
