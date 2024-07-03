import React, { useEffect, useState } from 'react'
import AgreementOneForm from '../../forms/Agreement/AgreementOneForm'
import { GetAgreement } from '../../../api/api'
import HtmlAgreementOne from './Html/HtmlAgreementOne'
import HtmlAgreementTwo from './Html/HtmlAgreementTwo'
import { useNavigate } from 'react-router-dom'

export default function MainRetainerAggHtml({ openSignature, agreementData, user_id, emp_user_type, folderId, userData, setOpenAgreement }) {
  const [openAddFeildsModal, setOpenAddFeildsModal] = useState(false)
  const [apicall, setApicall] = useState(false)
  const [felidData, setFelidData] = useState([])
  let navigate = useNavigate()
  // const { user_id, emp_user_type, folderId, userData? } = useLocation().state;
  /*Function to get the Agreement Data */
  const getAgreeFelidData = async () => {
    try {
      let res = await GetAgreement("", user_id, emp_user_type, agreementData.type)
      if (res.data.data) {
        setFelidData(res.data.data[0])
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
      console.log(agreementData.signature_status, "signature_status", agreementData.signature_status === "0", !agreementData.initial)
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
        <button className={openSignature === "yes" ? "d-none" : 'btn btn-secondary'} onClick={() => setOpenAgreement(false)}>Add Back</button>
        <button className='btn btn-primary text-end' onClick={() => setOpenAddFeildsModal(true)}>{openSignature === "yes" ? "Add Signature" : "Add Felids"}</button>
      </div>
      {agreementData.type === "temporary resident visa"
        ? <HtmlAgreementOne userData={userData} felidData={felidData} emp_user_type={emp_user_type} />
        : agreementData.type === "ATIP"
          ? <HtmlAgreementTwo userData={userData} felidData={felidData} emp_user_type={emp_user_type} />
          : null}
      <button className={felidData.agreement_date ? "btn btn-primary" : "d-none"}
        // to={`/agreeone`} state={{
        //   // code: jsxContent/* replaceTags(jsxContent)*/,
        //   user_id: user_id,
        //   emp_user_type: emp_user_type,
        //   folderId: folderId,
        //   felidData: felidData,
        //   agreementData: agreementData
        // }}
        onClick={() => {
          navigate('/agreeone', {
            state: {
              user_id: user_id,
              emp_user_type: emp_user_type,
              folderId: folderId,
              felidData: felidData,
              agreementData: agreementData
            }
          });

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
          agreementData={agreementData}
          openSignature={openSignature} />
        : null}
    </div>
  )
}
