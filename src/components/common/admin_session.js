import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useSessionCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    const admin_id = localStorage.getItem("admin_id");
    const admin_type = localStorage.getItem("admin_type");

    if (
      !token ||
      !userType ||
      !admin_id ||
      !admin_type ||
      userType !== "admin" // Assuming admin is the only user type that requires session check
    ) {
      navigate("/adminlogin");
    }
  }, [navigate]);

  return; // You can return any value here if needed
}

export default useSessionCheck;
