import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function CommonBackButton(props) {
    let navigate = useNavigate()
    return (
        <div><Link
            className="d-flex align-items-center"
            style={{
                position: "absolute",
                top: 5,
                left: 15,
                zIndex: 1000,
                backgroundColor: "#992b32",
                minWidth: 300,
            }}
            onClick={() => {

                navigate(-1);

            }}
        >
            <i className="icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
            <span className="text-uppercase font-size-3 font-weight-bold text-white">
                <h3 className="font-size-6 mb-0 text-capitalize text-white">
                    {props.page}
                </h3>
            </span>
        </Link></div>)
}
