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
export const EmployeeDetails = async () => {
  const formData = new FormData();
  formData.append("employee_id", "7");
  const response = await axios.post(
    `https://apnaorganicstore.in/canjobs/getEmployeeDetail`,
    { employee_id: "7" },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const AddEmployeeDetails = async (props) => {
  const response = await axios.put(
    `http://localhost/naukari/employeePersonal_detail`,
    props
  );
  return response.data;
};

// EMPLOYEE'S API
export const GetAllJobs = async () => {
  const response = await axios.get(`${API_URL}view_jobs`);
  return response;
};

// ADMIN'S API
export const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}admin/getAllJobs`);
  return response.data.data;
};
export const getAllEmployer = async () => {
  const response = await axios.get(`${API_URL}admin/getAllEmployer`);
  return response.data.data;
};
/*Job Category List Api */
export const getAllJobsCategory = async () => {
  const response = await axios.get(`${API_URL}admin/getAllJobsCategory`);
  return response.data.data;
};
/*Employee List Api */
export const getallEmployeeData = async () => {
  const response = await axios.get(
    `${API_URL}admin/getallEmployeeView?user_type=admin`
  );
  return response.data.data;
};
