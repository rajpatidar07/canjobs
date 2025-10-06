import React, { useEffect, useState } from "react";
import { getActivityLog } from "../../api/api";
import ConvertTime from "./Common function/ConvertTime";
import Loader from "./loader";

// import Pagination from "./pagination";
export default function UserTimline({ userId, userType, TimeLineId }) {
  // const [page, setpage] = useState(1);
  // const [perpage, setperpage] = useState(10);
  // const [pageNo, setpageNo] = useState(localStorage.getItem("PageNo") || 1);
  const [timeData, setTimeData] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [totalRows, setTotalRows] = useState([]);

  let TimeLineData = async () => {
    setLoader(true)
    try {
      let res = await getActivityLog(1, "", "", "", "", "", userId, userType);
      setTimeData(res.data.data);
      console.log(res)
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      localStorage.setItem("navigation_url", "");
      setLoader(false)
      // setTotalRows(res.data);
    } catch (err) {
      console.log(err);
      setLoader(false)
    }
  };
  // const page = Math.ceil(timeData / perpage);
  useEffect(() => {
    TimeLineData();
    // eslint-disable-next-line
  }, []);
  // console.log(timeData);

  return (
    <>
      {loader ? (
        <div className="table-responsive main_table_div">
          <Loader />
        </div>) : <div className="timeline_box">
        {timeData.length > 0 ? (
          <ol className="timeline">
            {(timeData || []).map((item) => {
              return (
                <li className="timeline-item" key={item.id} style={{ minHeight: TimeLineId === item.id ? '80px' : 'auto', backgroundColor: TimeLineId === item.id ? '#f0f8ff' : 'transparent', padding: TimeLineId === item.id ? '10px' : '5px', borderRadius: '5px' }}>
                  <span className="timeline-item-icon | faded-icon"></span>
                  <div className={` ${TimeLineId === item.id ? "px-3" : ""} timeline-item-description`}>
                    <div className="timeline_activity">
                      <div className="timeline_date">
                        <b className="text-primary font-size-3 text-capitalize">
                          {item.created_by}
                        </b>
                        <i className="font-size-2">
                          <ConvertTime _date={item.created_at} format={"lll"} />
                          {/* {moment(item.created_at).format("lll")} */}
                        </i>
                      </div>
                      <div className="timeline_date text-muted font-size-3 text-capitalize">
                        {item.msg?.includes('<a href=') ? (
                          <span dangerouslySetInnerHTML={{ __html: item.msg }} />
                        ) : (
                          item.msg
                        )}
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
      </div>}
    </>
  );
}
