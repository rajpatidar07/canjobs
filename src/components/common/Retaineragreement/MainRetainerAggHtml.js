import React, { useEffect, useState } from 'react'
import AgreementOneForm from '../../forms/Agreement/AgreementOneForm'
import { GetAgreement } from '../../../api/api'
import HtmlAgreementOne from './Html/HtmlAgreementOne'
import HtmlAgreementTwo from './Html/HtmlAgreementTwo'
import { Link } from 'react-router-dom'

export default function MainRetainerAggHtml ({ agreementData, user_id, emp_user_type, folderId, userData, setOpenAgreement }) {
    const [openAddFeildsModal, setOpenAddFeildsModal] = useState(false)
    const [apicall, setApicall] = useState(false)
    const [felidData, setFelidData] = useState([])
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
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apicall])
  return (
    <div>
    {/* <ToastContainer /> */}
    <div className='d-flex justify-content-space-between mt-5'>
      <button className='btn btn-secondary ' onClick={() => setOpenAgreement(false)}>Add Back</button>
      <button className='btn btn-primary' onClick={() => setOpenAddFeildsModal(true)}>Add Felids</button>
    </div>
    {agreementData.type==="PNP + express entry/federal PR"
    ?<HtmlAgreementOne userData={userData} felidData={felidData} emp_user_type={emp_user_type}/>
    :agreementData.type==="ATIP"
    ?<HtmlAgreementTwo userData={userData} felidData={felidData} emp_user_type={emp_user_type}/>
    :null}
     <Link className={felidData ? "d-block" : "d-none"} to={`/agreeone`} state={{
        // code: jsxContent/* replaceTags(jsxContent)*/,
         user_id: user_id,
        emp_user_type: emp_user_type,
        folderId: folderId,
        felidData: felidData,
        agreementData: agreementData
      }}

      >
        Generated Pdf</Link>
    {openAddFeildsModal ?
        <AgreementOneForm
          show={openAddFeildsModal}
          close={() => setOpenAddFeildsModal()}
          userData={userData}
          setApicall={setApicall}
          felidData={felidData}
          emp_user_type={emp_user_type}
          agreementData={agreementData} />
        : null}
    </div>
  )
}
