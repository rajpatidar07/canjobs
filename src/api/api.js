import axios from "axios";

const API_URL = 'http://localhost/naukari/';

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
export const EmployeeDetails = async (props) => {
    const formData = new FormData();
    formData.append('email', props.email);
    formData.append('password', props.password);
    const response = await axios.post(`${API_URL}employee_login`, formData);
    return response.data;
};
