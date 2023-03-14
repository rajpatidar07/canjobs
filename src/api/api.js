import axios from "axios";

const API_URL = 'http://localhost/naukari/';
const token = localStorage.getItem("token");
const user_id = localStorage.getItem("user_id");

export const EmployeeSignUp = async (props) => {
    const formData = new FormData();
    formData.append('email', props.useremail);
    formData.append('password', props.userpassword);
    const response = await axios.post(`${API_URL}employee_signup`, formData);
    return response.data;
};
export const EmployeeLogin = async (props) => {
    const formData = new FormData();
    formData.append('email', props.email);
    formData.append('password', props.password);
    const response = await axios.post(`${API_URL}employee_login`, formData);
    return response.data;
};
export const EmployeeDetails = async () => {
    const config = {
        id: 13,
        headers: { 'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbXBsb3llZV9pZCI6IjEzIiwiQVBJX1RJTUUiOjE2Nzg3OTMyOTV9.yDNPFrthFl7Ohe7-dylHNvaiNUA49cCrrFh7cTIQ2H0" }
    };
    const formData = new FormData();
    const response = await axios.get(`${API_URL}getEmployeeDetail`, 13, headers = {
        'Authorization': 'Bearer <access_token>'
    });
    return response.data;
};
