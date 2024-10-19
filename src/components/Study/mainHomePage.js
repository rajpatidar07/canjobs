import React from "react";
import StudyHeader from "./StudyComman/studyHeader";
import { Link } from "react-router-dom";

export default function MainHomePage() {
  return (
    <div className="site-wrapper overflow-hidden ">
      <StudyHeader />
      <div
        className="container-fluid  p-3  mt-18 mt-lg-11"
        style={{ height: "95vh", width: "100vw", overflowX: "hidden" }}
      >
        <div className="row ">
          <div className="col-md-6 mx-5 mx-md-0 pl-md-7 p-3 mb-4">
            <Link
              to="/study_home"
              className="card text-white "
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "87vh",
                borderRadius: "8px",
                border: "none",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <h2
                  className="card-title text-white text-center capitalize  mb-4"
                  style={{
                    fontSize: "2.5rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Best Immigration Consultancy in Calgary{" "}
                </h2>
                <p
                  className="card-text text-center text-white"
                  style={{ fontSize: "1.1rem", maxWidth: "80%" }}
                >
                  Our streamlined registration process takes just a few minutes.
                  Get started with your new account today!
                </p>
                <button
                  type="button"
                  className="btn btn-primary line-height-reset text-uppercase main_search_button_home"
                >
                  Start Now
                </button>
              </div>
            </Link>
          </div>
          <div className="col-md-6  pr-md-7  p-3 mb-4">
            <Link
              to="/"
              className="card text-white "
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "87vh",
                borderRadius: "8px",
                border: "none",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <h2
                  className="card-title text-white text-center capitalize  mb-4"
                  style={{
                    fontSize: "2.5rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  Jobs for You | Talent for Employers
                </h2>
                <p
                  className="card-text text-center text-white"
                  style={{ fontSize: "1.1rem", maxWidth: "80%" }}
                >
                  Our streamlined registration process takes just a few minutes.
                  Get started with your new account today!
                </p>
                <button
                  type="button"
                  className="btn btn-primary line-height-reset text-uppercase main_search_button_home"
                >
                  Start Now
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
