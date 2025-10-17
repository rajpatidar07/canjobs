import React from "react";
import { IoSendOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ViewAdminBox from "./ViewAdminBox";
import { CiEdit, CiTrash } from "react-icons/ci";

const NoteReply = () => {
  return (
    <>
      <div
        // className={`rounded p-2 mb-2 ${
        //   props?.note_id === res.id ? "bg-light" : "bg-white"
        // }`}
        // key={index}
        // ref={(el) => (NoteRef.current[res.id] = el)}
        className="rounded  mb-2 bg-white pt-2 mt-2 border-top border-2"
      >
        <div className="m-0 d-flex justify-content-between gap-2">
          {/* <b className="font-size-4 font-weight-bold text-dark text-break">
                              {res.subject}
                            </b> */}
          <div>
            <div className="d-flex align-items-center gap-2">
              <div className="circle-24 mr-2 overflow-hidden text-capitalize text-white bg-blue">
                T
              </div>
              <div className="mb-0">
                <div className=" font-size-3 text-capitalize font-weight-bold">
                  {/* {res.assigned_to_name} */} test Rahul
                </div>
                <div className=" font-size-3 text-capitalize font-weight-bold">
                  {/* <ConvertTime _date={res.created_on} format={"LL"} /> */}
                </div>
              </div>
            </div>
            <div>
              {/* {res?.assigned_to_name && ( */}
              <span className="font-size-3">
                Assigned admin:
                {/* {res?.assigned_to_name?.split(",").map((item, index) => ( */}
                <span
                  //   key={index}
                  className="badge-light rounded-pill p-1 m-1"
                >
                  {/* {item} */} Admin Name
                </span>
                {/* ))} */}
              </span>
              {/* )} */}
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="m-0 text-capitalize font-size-4 mb-1 d-flex justify-content-between gap-2  w-100 ">
              <Link
                className="text-gray mb-1 pr-2"
                title="Update notes"
                //   className={
                //     res.task_creator_user_id === assigned_id &&
                //     res.task_creator_user_type === assigned_by_type
                //       ? "text-gray mb-1 pr-2"
                //       : "d-none"
                //   }
                // title="Update notes"
                // onClick={() => {
                //   // Merge current state with res and admin_id
                //   setState(res);
                //   setFilteredEmails([]);
                //   setSelectedAdmin(
                //     res?.assined_to_user_id
                //       ? AdminList.filter((item) =>
                //           res?.assined_to_user_id
                //             .split(",")
                //             .includes(item.admin_id.toString())
                //         )
                //       : []
                //   );
                // }}
              >
                
                <CiEdit />
              </Link>

              <ViewAdminBox />

              <Link
                // className={
                //   res.task_creator_user_id === assigned_id &&
                //   res.task_creator_user_type === assigned_by_type
                //     ? "text-gray mb-1 pl-1"
                //     : "d-none"
                // }
                className="text-gray mb-1 pl-1"
                title="Delete notes"
                onClick={() => {
                  //   ShowDeleteAlert(res);
                }}
              >
                
                <CiTrash color={"red"} />
              </Link>
            </p>

            <i className="font-size-2"></i>
          </div>
        </div>
        <div className="font-size-4 m-0">
          {/* <div
            dangerouslySetInnerHTML={{
              __html: res.subject_description,
            }}
          /> */}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <input
          type="text"
          placeholder="Add reply or add other with @"
          className="bg-light border-0 rounded font-size-3 w-100 text-capitalize text-black outline-0 form-control"
          onChange={(e) => {
            // handleInputChange(e, "reply");
          }}
        />

        <button
          className="bg-transparent border-0 text-muted"
          onClick={() => {
            // setSingleNoteData(res);
          }}
        >
          <IoSendOutline fontSize={25} />
        </button>
      </div>
    </>
  );
};

export default NoteReply;
