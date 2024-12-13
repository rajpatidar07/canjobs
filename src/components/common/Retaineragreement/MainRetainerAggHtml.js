import React, { useEffect, useState } from "react";
import AgreementOneForm from "../../forms/Agreement/AgreementOneForm";
import { AddUpdateAgreement, GetAgreement } from "../../../api/api";
import HtmlAgreementOne from "./Html/HtmlAgreementOne";
import HtmlAgreementTwo from "./Html/HtmlAgreementTwo";
import { Link } from "react-router-dom";
import HtmlAgreementThree from "./Html/HtmlAgreementThree";
import HtmlAGreementFour from "./Html/HtmlAGreementFour";
import HtmlAgreementFive from "./Html/HtmlAgreementFive";
import HtmlAgreementSix from "./Html/HtmlAgreementSix";
import HtmlAgreementSeven from "./Html/HtmlAgreementSeven";
// import HtmlAgreementEight from "./Html/HtmlAgreementEight";
// import HTmlAgreementNine from "./Html/HTmlAgreementNine";
import HtmlAgreementTen from "./Html/HtmlAgreementTen";
import HtmlAgreementEleven from "./Html/HtmlAgreementEleven";
import HtmlAgreementTwelve from "./Html/HtmlAgreementTwelve";
import HtmlAgreementThirteen from "./Html/HtmlAgreementThirteen";
import HtmlAgreementFourTeen from "./Html/HtmlAgreementFourTeen";
import HtmlAgreementFifteenth from "./Html/HtmlAgreementFifteenth";
import HtmlAgreementsixteen from "./Html/HtmlAgreementsixteen";
import { IoMdArrowBack } from "react-icons/io";
import HtmlAgreementSeventeen from "./Html/HtmlAgreementSeventeen";
import HtmlAgreementEighteen from "./Html/HtmlAgreementEighteen";
export default function MainRetainerAggHtml({
  setApicall,
  close,
  openSignature,
  agreementData,
  user_id,
  emp_user_type,
  folderId,
  userData,
  setOpenAgreement,
}) {
  const [openAddFeildsModal, setOpenAddFeildsModal] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [felidData, setFelidData] = useState([]);
  /*Function to get the Agreement Data */
  const getAgreeFelidData = async () => {
    try {
      let res = await GetAgreement(
        "",
        user_id,
        emp_user_type,
        agreementData.type
      );
      if (res.data.data) {
        setFelidData(res.data.data[0]);
        /*Function to generate pdf after adding signature */
        // if (openSignature === "yes" && res.data.data[0].initial && res.data.data[0].signature_status  === "1") {
        //   const stateData = {
        //     user_id: user_id,
        //     emp_user_type: emp_user_type,
        //     folderId: folderId,
        //     felidData: res.data.data[0],
        //   };
        //   const newPageUrl = `/agreeone`
        //   localStorage.setItem('agreementStateData', JSON.stringify(stateData));
        //   // Open the new page in a new tab
        //   setApicall(true)
        //   close()
        //   window.open(newPageUrl, '_blank')
        // }
      } else {
        setFelidData([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(userData?)
  useEffect(() => {
    getAgreeFelidData();
    if (apicall === true) {
      setapicall(false);
      setOpenAddFeildsModal(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apicall]);
  // useEffect(() => {
  //   if (openSignature === "yes") {
  //     if ((agreementData.signature_status === "0" && !agreementData.initial) || (felidData.signature_status === "0" && !felidData.initial)) {
  //       setOpenAddFeildsModal(true)
  //     } else {
  //       setOpenAddFeildsModal(false)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  const GeneratePdf = async () => {
    if (openSignature === "yes") {
    }
    {
      if (felidData.pdf_genrated_status === "0") {
        let data = {
          id: felidData.id,
          type: felidData.type,
          pdf_genrated_status: "1",
        };
        console.log(data.family_json);
        try {
          await AddUpdateAgreement(data);
          setApicall(true);
        } catch (err) {
          console.log(err);
        }
      }
      const stateData = {
        user_id: user_id,
        emp_user_type: emp_user_type,
        folderId: folderId,
        felidData: felidData,
      };
      // Serialize the state data to pass as query parameters
      const newPageUrl = agreementData.type === "initial consultation" ? `/initial_consultation ` : agreementData.type === "recruitment services agreement" ? `/recruitment_service` : `/agreeone`;
      localStorage.setItem("agreementStateData", JSON.stringify(stateData));
      // Open the new page in a new tab
      window.open(newPageUrl, "_blank");
    }
  };
  return (
    <div className="row m-0">
      {/*  */}
      <div className={`col-md-2 mt-3`}>
        <div className="back_btn_div position-fixed">
          <Link
            className="rounded back-btn p-5"
            style={{
              position: "absolute",
              top: 5,
              left: 5,
              background: "#fff",
              width: "max-content",
              height: 35,
              fontSize: 24,
              zIndex: 99,
              display: "flex",
              justifyContent: "center",
              boxShadow: "0 0 4px #ccc",
              alignItems: "center",
              textDecoration: "none", // Added to remove underline from Link
            }}
            to=""
            onClick={() => {
              setOpenAgreement(false);
              setApicall(true);
            }}
          >
            <IoMdArrowBack />{" "}
            <span style={{ fontSize: 16 }}>Back to Agreements</span>
          </Link>
        </div>
        <div className="d-flex flex-wrap px-2 justify-content-space-between mt-14">
          <button
            className="btn btn-primary text-end m-2 w-100"
            onClick={() => setOpenAddFeildsModal(true)}
          >
            {openSignature === "yes" ? "Add Signature" : "Add Felids"}
          </button>
          <button
            className={
              felidData.agreement_date ? "btn btn-primary m-2 w-100" : "d-none"
            }
            onClick={() => GeneratePdf()}
          >
            Generated Pdf
          </button>
        </div>
      </div>
      <div className={`col-md-10 mt-0 bg-gray`}>
        {agreementData.type === "temporary resident visa" ? (
          <HtmlAgreementOne
            page={"admin"}
            userData={userData}
            felidData={felidData}
            emp_user_type={emp_user_type}
            addSign={""}
          />
        ) : agreementData.type === "ATIP" ? (
          <HtmlAgreementTwo
            userData={userData}
            felidData={felidData}
            emp_user_type={emp_user_type}
          />
        ) : agreementData.type === "visitor" ? (
          <HtmlAgreementThree />
        ) : agreementData.type === "study" ? (
          <HtmlAGreementFour />
        ) : agreementData.type === "work permit" ? (
          <HtmlAgreementFive />
        ) : agreementData.type === "post graduation work permit" ? (
          <HtmlAgreementSix />
        ) : agreementData.type === "prospective workers" ? (
          <HtmlAgreementSeven />
        ) : agreementData.type === "express entry" ? (
          <HtmlAgreementOne
            page={"admin"}
            userData={userData}
            felidData={felidData}
            emp_user_type={emp_user_type}
            addSign={""}
          />
          // <HtmlAgreementEight
          // page={"admin"}
          //   userData={userData}
          //   felidData={felidData}
          //   emp_user_type={emp_user_type}
          //   addSign={""} />
        ) : agreementData.type === "PNP + express entry/federal PR" ? (
          <HtmlAgreementOne
            page={"admin"}
            userData={userData}
            felidData={felidData}
            emp_user_type={emp_user_type}
            addSign={""}
          />// <HTmlAgreementNine />
        ) : agreementData.type === "super visa application" ? (
          <HtmlAgreementTen />
        ) : agreementData.type === "spousal sponsorship" ? (
          <HtmlAgreementEleven />
        ) : agreementData.type === "citizenship" ? (
          <HtmlAgreementTwelve />
        ) : agreementData.type === "PR card renewal" ? (
          <HtmlAgreementThirteen />
        ) : agreementData.type === "permanent residency travel document" ? (
          <HtmlAgreementFourTeen />
        ) : agreementData.type === "employers" ? (
          <HtmlAgreementFifteenth />
        ) : agreementData.type === "LMIA exempt employers" ? (
          <HtmlAgreementsixteen />
        ) : agreementData.type === "initial consultation" ?
          (
            <HtmlAgreementSeventeen
              page={"admin"}
              userData={userData}
              felidData={felidData}
              emp_user_type={emp_user_type}
              addSign={""} />
          ) : agreementData.type === "recruitment services agreement" ?
            (
              <HtmlAgreementEighteen
                page={"admin"}
                userData={userData}
                felidData={felidData}
                emp_user_type={emp_user_type}
                addSign={""} />
            ) : null}
        {/* <button
          className={
            felidData.agreement_date ? "btn btn-primary my-2" : "d-none"
          }
          onClick={() => GeneratePdf()}
        >
          Generated Pdf
        </button> */}
        {openAddFeildsModal ? (
          <AgreementOneForm
            show={openAddFeildsModal}
            close={() => setOpenAddFeildsModal()}
            userData={userData}
            setApicall={setapicall}
            felidData={felidData}
            emp_user_type={emp_user_type}
            user_id={user_id}
            // openSignature={openSignature}
            ViewPdfclose={close}
            folderId={folderId}
            openSignature={"no"}
            index={null}
          />
        ) : null}
      </div>
    </div>
  );
}
