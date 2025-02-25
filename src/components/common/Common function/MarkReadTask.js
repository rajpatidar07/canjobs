import { toast } from "react-toastify";
import { ReadTaskOrReplyApi } from "../../../api/api";

export default async function MarkReadTask(data, type) {
    let userType = localStorage.getItem("userType");
    let admin_id = userType === "user" ? localStorage.getItem("employee_id") : userType === "company" ? localStorage.getItem("company_id") : localStorage.getItem("admin_id");
    let AdminType = userType === "user" ? "employee" : userType === "company" ? "employer" : localStorage.getItem("admin_type"); //sender type
    let ViewData = { "user_id": admin_id, "user_type": AdminType, "type": type, "task_id": data.id }
    if (admin_id && AdminType && data && type) {
        await ReadTaskOrReplyApi(ViewData)
    } else {
        toast.error(`Please login to mark ${type === "thread" ? "reply" : type} as read`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
        });
    }

    return true;
}
