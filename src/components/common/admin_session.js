import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useSessionCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    const admin_id = localStorage.getItem("admin_id");
    const admin_type = localStorage.getItem("admin_type");
    const agent_id = localStorage.getItem("agent_id");
    const agent_type = localStorage.getItem("admin_type");

    if (
      !token ||
      !userType ||
      (userType === "admin" && !admin_id && !admin_type) || // For admin users
      (userType === "agent" && !agent_id && !agent_type) // For agent users
    ) {
      // Redirect based on user type
      if (userType === "admin") {
        navigate("/adminlogin");
      } else if (userType === "agent") {
        navigate("/partnerlogin");
      }
    }
  }, [navigate]);

  return; // You can return any value here if needed
}

export default useSessionCheck;
