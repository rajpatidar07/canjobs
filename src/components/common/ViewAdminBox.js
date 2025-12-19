import React, { useEffect, useRef, useState } from "react";
import { LuEye } from "react-icons/lu";
import { getViewersDataApi } from "../../api/api";
import UserAvatar from "./UserAvtar";
export default function ViewAdminBox(props) {
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewersList, setViewersList] = useState([]);

  const parentRef = useRef();
  const childRef = useRef();

  let getViewersData = async () => {
    if (hoveredMessage) {
      try {
        let res = await getViewersDataApi(hoveredMessage, props.type);
        let ViewersData = props.adminList.filter((item) =>
          res.data.data.some(
            (dataItem) =>
              item.admin_id === dataItem.user_id &&
              item.admin_type === dataItem.user_type
          )
        );
        setViewersList(ViewersData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setViewersList([]);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getViewersData();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredMessage, props.type]);

  let translate;

  //   const viewersList2 = viewersList.filter((item, index) => index <= 1);

  // const viewersList2 = [...viewersList, ...viewersList]
  if (viewersList.length < 2) {
    translate = "translateX(-10%)";
  }


  return (
    <div
      ref={parentRef}
      className="position-relative d-inline-block"
      onMouseLeave={() => setHoveredMessage(null)}
    >
      <LuEye
        className="cursor-pointer"
        onMouseEnter={() => setHoveredMessage(props?.data?.id)}
      />
      {hoveredMessage === props?.data?.id && (
        <div
          ref={childRef}
          className="position-absolute bg-gray border rounded p-2 overflow-auto shadow d-flex gap-2 cc_eye"
          style={{
            top: "100%",
            right: "-100%",
            transform: `${translate}`,
            zIndex: 9999,
          }}
        >
          {isLoading ? (
            <div
              className="spinner-border spinner-border-sm text-white p-2"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : viewersList.length === 0 ? (
            <div className="text-center">
              <p>No views</p>
            </div>
          ) : (
            (viewersList || []).map((user, index) => (
              <>
                <div key={index} className="position-relative mr-1">
                  <UserAvatar
                    profileImage={user.profile_image}
                    name={user.name || user.email}
                    userType={user.admin_type}
                    index={index}
                    userId={user.admin_id}
                  />
                </div>
              </>
            ))
          )}
        </div>
      )}
    </div>
  );
}
