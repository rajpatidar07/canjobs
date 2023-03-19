import axios from "axios";

const API_URL = 'http://canjobs.000webhostapp.com/';
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
    const response = await axios.get(`${API_URL}getEmployeeDetail`, {
        params: {
            'employee_id': 7
        },
        headers: {
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbXBsb3llZV9pZCI6IjE0IiwiQVBJX1RJTUUiOjE2Nzg5NDQxMjR9.e-zR6fpjIFUyQ2pzUI2dJ5uHglV7b39r6tG-ZxKxUbk',
        }
    })
    return response.data;
    // const headers = new Headers({
    //     'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbXBsb3llZV9pZCI6IjE0IiwiQVBJX1RJTUUiOjE2Nzg5NDQxMjR9.e-zR6fpjIFUyQ2pzUI2dJ5uHglV7b39r6tG-ZxKxUbk',
    //     'Content-Type': 'application/json'
    // });

    // const params = new URLSearchParams({
    //     'employee_id': 7
    // });

    // fetch(`${API_URL}getEmployeeDetail?${params}`, {
    //     method: 'GET',
    //     headers: headers
    // })
    //     .then(response => response.json())
    //     .then(data => setData(data))
    //     .catch(error => console.error(error));

};
