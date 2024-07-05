import React, { useEffect, useState } from 'react'
import AgreementOneForm from '../../forms/Agreement/AgreementOneForm'
import { AddUpdateAgreement, GetAgreement } from '../../../api/api'
import HtmlAgreementOne from './Html/HtmlAgreementOne'
import HtmlAgreementTwo from './Html/HtmlAgreementTwo'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import HtmlAgreementThree from './Html/HtmlAgreementThree'
import HtmlAGreementFour from './Html/HtmlAGreementFour'
import HtmlAgreementFive from './Html/HtmlAgreementFive'
import HtmlAgreementSix from './Html/HtmlAgreementSix'
import HtmlAgreementSeven from './Html/HtmlAgreementSeven'
import HtmlAgreementEight from './Html/HtmlAgreementEight'
import HTmlAgreementNine from './Html/HTmlAgreementNine'
import HtmlAgreementTen from './Html/HtmlAgreementTen'
import HtmlAgreementEleven from './Html/HtmlAgreementEleven'
import HtmlAgreementTwelve from './Html/HtmlAgreementTwelve'
import HtmlAgreementThirteen from './Html/HtmlAgreementThirteen'
import HtmlAgreementFourTeen from './Html/HtmlAgreementFourTeen'
import HtmlAgreementFifteenth from './Html/HtmlAgreementFifteenth'
import HtmlAgreementsixteen from './Html/HtmlAgreementsixteen'
export default function MainRetainerAggHtml({ setApicall, close, openSignature, agreementData, user_id, emp_user_type, folderId, userData, setOpenAgreement }) {
  const [openAddFeildsModal, setOpenAddFeildsModal] = useState(false)
  const [apicall, setapicall] = useState(false)
  const [felidData, setFelidData] = useState([])
  /*Function to get the Agreement Data */
  const getAgreeFelidData = async () => {
    try {
      let res = await GetAgreement("", user_id, emp_user_type, agreementData.type)
      if (res.data.data) {
        setFelidData(res.data.data[0])
        /*FUnction to generate pdf after adding signature */
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
        setFelidData([])
      }
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(userData?)
  useEffect(() => {
    getAgreeFelidData()
    if (apicall === true) {
      setapicall(false)
      setOpenAddFeildsModal(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apicall])
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
  return (
    <div className='mb-12'>
      {/* <ToastContainer /> */}
      <div className={`d-flex ${openSignature === "yes" ? "justify-content-end px-2" : "justify-content-space-between"} mt-5`}>
        <Link className={openSignature === "yes" ? "d-none" : ''} onClick={() => {
          setOpenAgreement(false)
          setApicall(true)
        }} style={{ cursor: "pointer" }}><IoArrowBackCircleOutline className='icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8' /></Link>
        <div>
          <button className='btn btn-primary text-end m-2' onClick={() => setOpenAddFeildsModal(true)}>{openSignature === "yes" ? "Add Signature" : "Add Felids"}</button>
          <button className={felidData.agreement_date ? "btn btn-primary m-2" : "d-none"}
            onClick={async () => {
              if (openSignature === "yes") {

              } {
                if (agreementData.pdf_genrated_status === "0") {
                  let data = {
                    ...agreementData,
                    pdf_genrated_status: "1"
                  }
                  try {
                    await AddUpdateAgreement(data)
                    setApicall(true)
                  } catch (error) {
                    console.log(error)
                  }
                }
                const stateData = {
                  user_id: user_id,
                  emp_user_type: emp_user_type,
                  folderId: folderId,
                  felidData: felidData,
                };
                // Serialize the state data to pass as query parameters
                const newPageUrl = `/agreeone`
                localStorage.setItem('agreementStateData', JSON.stringify(stateData));
                // Open the new page in a new tab
                window.open(newPageUrl, '_blank')
              }
            }}
          >
            Generated Pdf</button>
        </div>
      </div>
      {agreementData.type === "temporary resident visa"
        ? <HtmlAgreementOne userData={userData} felidData={felidData} emp_user_type={emp_user_type} />
        : agreementData.type === "ATIP"
          ? <HtmlAgreementTwo userData={userData} felidData={felidData} emp_user_type={emp_user_type} />
          : agreementData.type === "visitor"
            ? <HtmlAgreementThree /> :
            agreementData.type === "study" ?
              <HtmlAGreementFour />
              : agreementData.type === "work permit"
                ? <HtmlAgreementFive />
                : agreementData.type === "post graduation work permit"
                  ? <HtmlAgreementSix />
                  : agreementData.type === "prospective workers"
                    ? <HtmlAgreementSeven />
                    : agreementData.type === "express entry"
                      ? <HtmlAgreementEight />
                      : agreementData.type === "PNP + express entry/federal PR"
                        ? <HTmlAgreementNine />
                        : agreementData.type === "super visa application"
                          ? <HtmlAgreementTen />
                          : agreementData.type === "spousal sponsorship"
                            ? <HtmlAgreementEleven />
                            :  agreementData.type ==="citizenship"
                            ?<HtmlAgreementTwelve/>
                            : agreementData.type ==="PR card renewal"
                            ?<HtmlAgreementThirteen/>
                            : agreementData.type === "permanent residency travel document"
                            ?<HtmlAgreementFourTeen/>
                          : agreementData.type === "employers"
                           ?<HtmlAgreementFifteenth/>
                           :agreementData.type === "LMIA exempt employers"
                           ?<HtmlAgreementsixteen/>
                           :null
      }
      <button className={felidData.agreement_date ? "btn btn-primary" : "d-none"}
        onClick={async () => {
          if (openSignature === "yes") {

          } {
            if (agreementData.pdf_genrated_status === "0") {
              let data = {
                ...agreementData,
                pdf_genrated_status: "1"
              }
              try {
                await AddUpdateAgreement(data)
                setApicall(true)
              } catch (error) {
                console.log(error)
              }
            }
            const stateData = {
              user_id: user_id,
              emp_user_type: emp_user_type,
              folderId: folderId,
              felidData: felidData,
            };
            // Serialize the state data to pass as query parameters
            const newPageUrl = `/agreeone`
            localStorage.setItem('agreementStateData', JSON.stringify(stateData));
            // Open the new page in a new tab
            window.open(newPageUrl, '_blank')
          }
        }}
      >
        Generated Pdf</button>
      {openAddFeildsModal ?
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
          folderId={folderId} />
        : null}
    </div>
  )
}
