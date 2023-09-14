import React, { useState } from "react";
import { AddExecutiveTeam } from "../../api/api";
import { toast } from "react-toastify";
export default function Executivelist({
  executiveData,
  selected,
  manager_id,
  setExecutiveApiCall,
}) {
  const [selectedStatus, setSelectedStatus] = useState(selected);

  /*Function to asign memeber to the manager */
  const HandleAddexecutive = async (Eid, MId) => {
    const isSelected = executiveData.some((item) => item.admin_id === Eid);
    if (isSelected) {
      try {
        let Response = await AddExecutiveTeam(MId, Eid);
        if (Response.message === "successfully") {
          toast.success("Executive asigned successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setSelectedStatus([...selectedStatus, { admin_id: Eid }]);
          setExecutiveApiCall(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="card-text row">
      {executiveData.length === 0 ? 
      (
        <div className="sub-stage col-md-12">
        <p className="text-center">No Executive Found</p>
        </div>
      ):(
        (executiveData || []).map((data, index) => {
          return (
            <div
              className={`sub-stage text-capitalize col-md-6`}
              onClick={() => HandleAddexecutive(data.admin_id, manager_id)}
              key={index}
            >
              <input
                type="checkbox"
                className="mx-2"
                checked={(selectedStatus || []).some(
                  (item) => item.admin_id === data.admin_id
                )}
                readOnly
              />
              {data.name}
            </div>
          );
        })
      )  }
    </div>
  );
}
