import React, { useEffect, useState } from 'react'
import AgreementOneForm from '../../forms/Agreement/AgreementOneForm'
import { GetAgreement } from '../../../api/api'
import HtmlAgreementOne from './Html/HtmlAgreementOne'
import HtmlAgreementTwo from './Html/HtmlAgreementTwo'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import HtmlAgreementThree from './Html/HtmlAgreementThree'
export default function MainRetainerAggHtml({ callMainPageAPi, close, openSignature, agreementData, user_id, emp_user_type, folderId, userData, setOpenAgreement }) {
  const [openAddFeildsModal, setOpenAddFeildsModal] = useState(false)
  const [apicall, setApicall] = useState(false)
  const [felidData, setFelidData] = useState([])
  /*Function to get the Agreement Data */
  const getAgreeFelidData = async () => {
    try {
      let res = await GetAgreement("", user_id, emp_user_type, agreementData.type)
      if (res.data.data) {
        setFelidData(res.data.data[0])
        /*FUnction to generate pdf after adding signature */
        if (openSignature === "yes" && (res.data.data[0].initial)) {
          const stateData = {
            user_id: user_id,
            emp_user_type: emp_user_type,
            folderId: folderId,
            felidData: res.data.data[0],
          };
          const newPageUrl = `/agreeone`
          localStorage.setItem('agreementStateData', JSON.stringify(stateData));
          callMainPageAPi(true)
          close()
          // Open the new page in a new tab
          window.open(newPageUrl, '_blank')
        }
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
      setApicall(false)
      setOpenAddFeildsModal(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apicall])
  useEffect(() => {
    if (openSignature === "yes") {
      if ((agreementData.signature_status === "0" && !agreementData.initial) || (felidData.signature_status === "0" && !felidData.initial)) {
        setOpenAddFeildsModal(true)
      } else {
        setOpenAddFeildsModal(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='mb-12'>
      {/* <ToastContainer /> */}
      <div className={`d-flex ${openSignature === "yes" ? "justify-content-end px-2" : "justify-content-space-between"} mt-5`}>
        <Link className={openSignature === "yes" ? "d-none" : ''} onClick={() => setOpenAgreement(false)} style={{ cursor: "pointer" }}><IoArrowBackCircleOutline className='icon icon-small-left bg-white circle-30 mr-5 font-size-7 text-black font-weight-bold shadow-8' /></Link>
        <button className='btn btn-primary text-end' onClick={() => setOpenAddFeildsModal(true)}>{openSignature === "yes" ? "Add Signature" : "Add Felids"}</button>
      </div>
      {agreementData.type === "temporary resident visa"
        ? <HtmlAgreementOne userData={userData} felidData={felidData} emp_user_type={emp_user_type} />
        : agreementData.type === "ATIP"
          ? <HtmlAgreementTwo userData={userData} felidData={felidData} emp_user_type={emp_user_type} />
          : agreementData.type === "visitor"
            ? <HtmlAgreementThree /> :
            null}
      <button className={felidData.agreement_date ? "btn btn-primary" : "d-none"}
        onClick={() => {
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
        }}
      >
        Generated Pdf</button>
      {openAddFeildsModal ?
        <AgreementOneForm
          show={openAddFeildsModal}
          close={() => setOpenAddFeildsModal()}
          userData={userData}
          setApicall={setApicall}
          felidData={felidData}
          emp_user_type={emp_user_type}
          user_id={user_id}
          openSignature={openSignature}
          ViewPdfclose={close}
          folderId={folderId} />
        : null}
    </div>
  )
}
