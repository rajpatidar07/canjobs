import axios from "axios";

const API_URL = 'https://canjobs.000webhostapp.com/naukari/';
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
    // const formData = new FormData();
    // formData.append('employee_id', 13);
    const response = await axios.get(`${API_URL}getEmployeeDetail`, {
        params: {
            "employee_id": 14
        },
        headers: {
            "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbXBsb3llZV9pZCI6IjE0IiwiQVBJX1RJTUUiOjE2Nzg4ODQ0NDV9.8bplgxMD-5go5YdVS2W6hTTBcmlMjP2iK3VlkSsDlMA",
        }
    })
    return response.data;
};
