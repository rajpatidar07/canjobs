import React, { useEffect, useState } from 'react'
import { LuEye } from 'react-icons/lu'
import { getViewersDataApi } from '../../api/api';
export default function ViewAdminBox(props) {
    const [hoveredMessage, setHoveredMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [viewersList, setViewersList] = useState([]);

    let getViewersData = async () => {
        if (hoveredMessage) {
            try {
                let res = await getViewersDataApi(hoveredMessage, props.type)
                let ViewersData =
                    props.adminList.filter((item) =>
                        res.data.data.some((dataItem) => item.admin_id === dataItem.user_id && item.admin_type === dataItem.user_type)
                    )
                setViewersList(ViewersData)
                setIsLoading(false)
            } catch (err) {
                console.log(err)
                setViewersList([])
                setIsLoading(false)
            }
        }
    }
    useEffect(() => {
        getViewersData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hoveredMessage, props.type])

    return (
        <div className="position-relative d-inline-block" onMouseLeave={() => setHoveredMessage(null)}>
            <LuEye className="cursor-pointer" onMouseEnter={() => setHoveredMessage(props?.data?.id)} />
            {hoveredMessage === props?.data?.id && (
                <div
                    className="position-absolute bg-white border rounded p-2 shadow d-flex gap-2"
                    style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
                >
                    {isLoading ?
                        <div className="spinner-border text-grey" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        : viewersList.length === 0 ?
                            <div className='text-center'><p>No views</p></div>
                            :
                            (viewersList || []).map((user, index) => (
                                <div key={index} className="position-relative">
                                    <img
                                        src={user.profile_image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                                        alt={user.name || user.email}
                                        title={user.name || user.email}
                                        className="rounded-circle border"
                                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                </div>
            )}
        </div>)
}
