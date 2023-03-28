import axios from "axios";

const API_URL = "https://apnaorganicstore.in/canjobs/";
// const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");

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
  if (props !== undefined) {
    console.log(JSON.stringify(props.employee_id));

    const formData = new FormData();
    formData.append("employee_id", props.employee_id);
    const response = await axios.post(
      `${API_URL}getEmployeeDetail`,
      { employee_id: props.employee_id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
};
export const AddEmployeeDetails = async (props) => {
  console.log(props);
  const response = await axios.put(`${API_URL}employeePersonal_detail`, props);
  console.log(response.data);
  return response.data;
};

// EMPLOYER'S API
export const GetAllJobs = async () => {
  const response = await axios.get(`${API_URL}view_jobs`);
  return response;
};

// ADMIN'S API
/*Job List Api */
export const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}admin/getAllJobs`);
  return response.data.data;
};
/*Employer List Api */
export const getAllEmployer = async () => {
  const response = await axios.get(`${API_URL}admin/getAllEmployer`);
  return response.data.data;
};
/*Job Category List Api */
export const getAllJobsCategory = async () => {
  const response = await axios.get(`${API_URL}admin/getAllJobsCategory`);
  return response.data.data;
};
/*Add Job Category Api */
export const AddJobCategory = async (props) => {
  console.log(props);
  console.log(`${API_URL}admin/addCategory`);
  const response = await axios.put(`${API_URL}admin/addCategory`, props);
  return response.data;
};
/*Delete Job Category Api */
export const DeleteJobCategory = async (props) => {
  console.log(props);
  const response = await axios.delete(
    `${API_URL}deletejobCategory/${props}`,
    props
  );
  return response.data;
};

/*Employee List Api */
export const getallEmployeeData = async () => {
  const response = await axios.get(
    `${API_URL}admin/getallEmployeeView?user_type=admin`
  );
  return response.data.data;
};
