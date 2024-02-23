import React, { useEffect, useState } from "react";
import { getActivityLog } from "../../api/api";
import moment from "moment";
import Pagination from "./pagination";
export default function UserTimline() {
  // const [page, setpage] = useState(1);
  const [perpage, setperpage] = useState(10);
  const [pageNo, setpageNo] = useState(1);
  const [timeData, setTimeData] = useState([]);
  const [totalRows, setTotalRows] = useState([]);

  let TimeLineData = async (userId, userEmail, userName) => {
    try {
      let res = await getActivityLog(1, userId);
      setTimeData(res.data.data);
      setTotalRows(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // const page = Math.ceil(timeData / perpage);
  useEffect(() => {
    TimeLineData();
  }, []);
  console.log(timeData);

  return (
    <div className="timeline_box">
      {timeData.length > 0 ? (
        <ol className="timeline">
          {(timeData || []).map((item) => {
            return (
              <li className="timeline-item" key={item.id}>
                <span className="timeline-item-icon | faded-icon"></span>
                <div className="timeline-item-description">
                  <div className="timeline_activity">
                    <div className="timeline_date">
                      <b className="text-primary font-size-3 text-capitalize">
                        {item.created_by}
                      </b>{" "}
                      <i className="font-size-2">
                        {moment(item.created_at).format("lll")}
                      </i>
                    </div>
                    <div className="timeline_date text-muted font-size-3 text-capitalize">
                      {item.msg}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}

          {/* <Pagination
            nPages={Math.ceil(totalRows / perpage)}
            currentPage={pageNo}
            setCurrentPage={setpageNo}
            total={totalRows}
            count={timeData.length}
          /> */}
        </ol>
      ) : (
        "No Timeline Data"
      )}
    </div>
  );
}
