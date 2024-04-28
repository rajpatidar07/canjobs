import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useSessionCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    const employee_id = localStorage.getItem("employee_id");

    if (
      !token ||
      !userType ||
      !employee_id ||
      userType !== "user" // Assuming admin is the only user type that requires session check
    ) {
      navigate("/candidate_login");
    }
  }, [navigate]);

  return; // You can return any value here if needed
}

export default useSessionCheck;
