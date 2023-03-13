import axios from "axios";

const API_URL = 'http://localhost/naukari/';

export const EmployeeSignUp = async () => {
    const formData = new FormData();
    formData.append('email', 'jyotish@example.com');
    formData.append('password', 'avatarFile');
    const response = await axios.post(`${API_URL}employee_signup`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    const data = await response.json();
    return data;
};
export const EmployeeLogin = async () => {
    const formData = new FormData();
    formData.append('email', 'jyotish@example.com');
    formData.append('password', 'avatarFile');
    const response = await axios.post(`${API_URL}employee_signup`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    const data = await response.json();
    return data;
};