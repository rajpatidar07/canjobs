import React, { useEffect, useState } from 'react'
import AdobePDFViewer from '../Adobe/adobeFile'
import { GetAgreement, getSharePointParticularFolders } from '../../../api/api'
import { useLocation, useSearchParams } from 'react-router-dom'
import AgreementOneForm from '../../forms/Agreement/AgreementOneForm'
import Newpdf from '../Adobe/newpdf'
export default function UserSigningPage() {
    const [loader, setLoader] = useState(false)
    const [pdf, setPdf] = useState(false)
    const [apicall, setApicall] = useState(false)
    const [felidData, setFelidData] = useState([])
    let [openAddFeildsModal,setOpenAddFeildsModal]=useState(false)
    let location = useLocation()
    let data = new URLSearchParams(location.search)
    let user_id = data.get("id")
    let emp_user_type = data.get("user")
    let folderId = data.get("folderId")
    let document_id = data.get("documentId")
    let type= data.get("type")
    //http://localhost:3000/signagreement?id=1175&user=employee&folderId=01PMN6UKWBNI553364NFDZFRZKZUYIGV65&documentId=01PMN6UKUQQSVK67PIZRH2FJHBCTIETUEB
    console.log( user_id,
        emp_user_type,
        folderId)
        
    const GetAgreementPdf = async (data) => {
        setLoader(true)
        try {
            let res = await getSharePointParticularFolders(
                user_id,
                emp_user_type,
                folderId
            );
            let Agreeres = await GetAgreement("", user_id, emp_user_type, type)
            if (res.data.data) {
              setFelidData(Agreeres.data.data[0])
            } else {
              setFelidData([])
            }
            if (res.data.status === 1) {
                setLoader(false);
                if (res.data.data.find((item) => item.id === document_id)) {
                    setPdf(res.data.data.find((item) => item.id === document_id))
                    // console.log(res.data.data.find((item) => item.id === agreementdocument_id))
                } else if (res.data.data === "No Documents Found") {
                    setLoader(false);
                } else {
                    setLoader(false);
                }
            }
        } catch (Err) {
            console.log(Err);
            setLoader(false);
        }
    }
    useEffect(() => {
        GetAgreementPdf()
        if (apicall === true) {
            setApicall(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apicall])
    return (
        <div className='d-flex p-5'>
            <div className='col-10'>
                <AdobePDFViewer
                    url={pdf["@microsoft.graph.downloadUrl"]}
                    data={pdf}
                    // userId={user_id}
                    commentsList={[]}
                    selectedMentionAdmin={[]}
                    // DocUserType={emp_user_type}
                    adminList={[]}
                    partnerList={[]}
                    setCommentsList={[]}
                    userType={""}
                /></div>
            <div className='col-4'>
              <button title='Add Flied' className='btn btn-primary'
              onClick={()=>setOpenAddFeildsModal(true)}> Add Flied's</button>
            </div>
            {openAddFeildsModal ?
        <Newpdf
          show={openAddFeildsModal}
          close={() => setOpenAddFeildsModal()}
        //   userData={userData}
          setApicall={setApicall}
          felidData={felidData}
          emp_user_type={emp_user_type}
          user_id={user_id}
          // openSignature={openSignature}
        //   ViewPdfclose={close}
          folderId={folderId} />
        : null}
        </div>
    )
}
