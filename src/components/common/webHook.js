import { useLocation } from 'react-router-dom';
import { AddEmployeeDetails } from '../../api/api';
import { useEffect, useState, useRef } from 'react';
import Loader from './loader';

const WebhookComponent = () => {
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState("No user data found !");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    console.log(decodeURIComponent(location.search))
    const data = decodeURIComponent(location.search).replace("?","")
    const hasCalledApi = useRef(false); // Track API call

    useEffect(() => {
        let parsedData;
        let UserData;

        if (data && !hasCalledApi.current) { // Check if API call has been made
            try {
                parsedData = JSON.parse(data);
                UserData = {
                    "name": parsedData.customer.full_name,
                    "email": parsedData.customer.email,
                    "contact_no": parsedData.customer.phone,
                    "date_of_birth": "",
                    "gender": "",
                    "marital_status": "",
                    "nationality": "",
                    "current_location": "",
                    "currently_located_country": "",
                    "language": "",
                    "religion": "",
                    "interested_in": "working visa",
                    "experience": "",
                    "work_permit_canada": "",
                    "work_permit_other_country": "",
                    "resume": "",
                    "profile_photo": "",
                    "status": "1",
                    "reffer_by": "",
                    "assigned_by": "",
                    "permission": "{\"notification_permission\":{\"lmia\":1,\"visa\":1,\"interview\":1,\"job\":1},\"email_permission\":{\"lmia\":1,\"visa\":1,\"interview\":1,\"job\":1}}",
                };
                onUserPersonalDetailClick(UserData);
                hasCalledApi.current = true; // Set ref to true after API call
            } catch (error) {
                setErrors(`Failed to fetch data: ${error}`);
            }
        }
    }, [data]);

    async function onUserPersonalDetailClick(UserData) {
        if (UserData) {
            setLoading(true);
            try {
                const responseData = await AddEmployeeDetails(UserData);
                if (responseData.message === "Employee data inserted successfully") {
                    setSuccess("Candidate added successfully");
                } else if (responseData.message === "Employee data updated successfully") {
                    setSuccess("Candidate Updated successfully");
                } else if (responseData.message === "Email already exists") {
                    setErrors("Email already exists");
                }
            } catch (err) {
                console.log(err);
                setErrors("An error occurred while adding the employee details.");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className='d-flex justify-content-center mt-35'>
            <h1 className={`text-center ${success ? "text-shamrock" : errors ? "text-danger" : ""}`}>
                {loading ? <Loader /> : success ? success : errors}</h1>
        </div>
    );
};

export default WebhookComponent;
