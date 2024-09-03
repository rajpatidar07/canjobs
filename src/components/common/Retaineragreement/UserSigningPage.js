import React, { useEffect, useState } from 'react'
// import AdobePDFViewer from '../Adobe/adobeFile'
import { GetAgreement/*, getSharePointParticularFolders*/ } from '../../../api/api'
import { useLocation } from 'react-router-dom'
import AgreementOneForm from '../../forms/Agreement/AgreementOneForm'
import Loader from '../loader'
import HtmlAgreementOne from './Html/HtmlAgreementOne'
import HtmlAgreementTwo from './Html/HtmlAgreementTwo'
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
export default function UserSigningPage() {
    const [loader, setLoader] = useState(false)
    // const [pdf, setPdf] = useState(false)
    const [apicall, setApicall] = useState(false)
    const [felidData, setFelidData] = useState([])
    const [clientIndex, setClientIndex] = useState()
    let [openAddFeildsModal, setOpenAddFeildsModal] = useState(false)
    let [showDetailsOption, setShowDetailsOption] = useState(false)
    let location = useLocation()
    let data = new URLSearchParams(location.search)
    let user_id = data.get("id")
    let emp_user_type = data.get("user")
    let folderId = data.get("folderId")
    // let document_id = data.get("documentId")
    let type = data.get("type")
    //http://localhost:3000/signagreement?id=1175&user=employee&folderId=01PMN6UKWBNI553364NFDZFRZKZUYIGV65&documentId=01PMN6UKUQQSVK67PIZRH2FJHBCTIETUEB
    // console.log( user_id,
    //     emp_user_type,
    //     folderId)

    const GetAgreementPdf = async (data) => {
        setLoader(true)
        try {
            // let res = await getSharePointParticularFolders(
            //     user_id,
            //     emp_user_type,
            //     folderId
            // );
            let Agreeres = await GetAgreement("", user_id, emp_user_type, type)
            if (Agreeres.data.data) {
                setFelidData(Agreeres.data.data[0])
                setLoader(false);
            } else {
                setFelidData([])
            }
            // if (res.data.status === 1) {
            //     setLoader(false);
            //     if (res.data.data.find((item) => item.id === document_id)) {
            //         setPdf(res.data.data.find((item) => item.id === document_id))
            //         // console.log(res.data.data.find((item) => item.id === agreementdocument_id))
            //     } else if (res.data.data === "No Documents Found") {
            //         setLoader(false);
            //     } else {
            //         setLoader(false);
            //     }
            // }
        } catch (Err) {
            console.log(Err);
            setLoader(false);
        }
    }
    useEffect(() => {
        // Call the function when the component first renders
        GetAgreementPdf();
        document.body.classList.remove("admin_body");
        // let timer;
        if (apicall) {
            // timer = setTimeout(() => {
            //     // Function to be executed after 20 seconds when apicall is true because document update's take time 
            //     GetAgreementPdf();
            // Reset the state to false
            setApicall(false);
            // }, 20000);
        }

        // Cleanup function to clear the timer if the component unmounts or myState changes
        // return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apicall]);
    /*Function to open sign form modal */
    const addSign = (e, index) => {
        // e.preventDefault()
        setOpenAddFeildsModal(true)
        setClientIndex(index)
        setShowDetailsOption(false)
    }
    const familyJsonArray = felidData?.family_json ? JSON.parse(felidData.family_json) : [];
    return (
        <div className='d-flex p-5' style={{ backgroundColor: "#423f3f" }}>
               
            {loader ?
                <Loader />
                : <div style={{ margin: "auto" }}>
                    {/* <AdobePDFViewer
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
                    /> */}
                    {type === "temporary resident visa"
                        ? <HtmlAgreementOne page={"user"} felidData={felidData} emp_user_type={emp_user_type} addSign={addSign} />
                        : type === "ATIP"
                            ? <HtmlAgreementTwo felidData={felidData} emp_user_type={emp_user_type} />
                            : type === "visitor"
                                ? <HtmlAgreementThree /> :
                                type === "study" ?
                                    <HtmlAGreementFour />
                                    : type === "work permit"
                                        ? <HtmlAgreementFive />
                                        : type === "post graduation work permit"
                                            ? <HtmlAgreementSix />
                                            : type === "prospective workers"
                                                ? <HtmlAgreementSeven />
                                                : type === "express entry"
                                                    ? <HtmlAgreementEight />
                                                    : type === "PNP + express entry/federal PR"
                                                        ? <HTmlAgreementNine />
                                                        : type === "super visa application"
                                                            ? <HtmlAgreementTen />
                                                            : type === "spousal sponsorship"
                                                                ? <HtmlAgreementEleven />
                                                                : type === "citizenship"
                                                                    ? <HtmlAgreementTwelve />
                                                                    : type === "PR card renewal"
                                                                        ? <HtmlAgreementThirteen />
                                                                        : type === "permanent residency travel document"
                                                                            ? <HtmlAgreementFourTeen />
                                                                            : type === "employers"
                                                                                ? <HtmlAgreementFifteenth />
                                                                                : type === "LMIA exempt employers"
                                                                                    ? <HtmlAgreementsixteen />
                                                                                    : null
                    }

                    <div className='d-flex justify-content-center mt-5'>
                        <button className="btn btn-primary text-decoration-none" onClick={(e) => addSign(e, "final")}>
                            Final Submit
                        </button>
                    </div>
                </div>}
                <button className='btn btn-primary text-end m-2' onClick={() => {
                    setOpenAddFeildsModal(true)
                    setShowDetailsOption(true)
                }}>Update Details</button>
            <div className={"d-none col-4 position-sticky bg-white h-100vh"}>
                <div className='p-10'>
                    <h3>Add{felidData.initial ? "" : " Initial and Client"} Signature</h3>
                    <button className={felidData.initial ? "d-none" : "btn btn-primary text-decoration-none"} style={{ fontFamily: "cursive" }}
                        onClick={(e) => addSign(e, "initial")}>
                        Initial
                    </button>
                    {(familyJsonArray || []).map((item, index) => (
                        item.client_signature ? null :
                            <span key={index}>Client Name {index + 1}: <span className="text-capitalize">{item.client_first_name + " " + item.client_last_name + "   "} </span><br />
                                <button className="btn btn-primary text-decoration-none flex-end" disabled={felidData.initial ? false : true} style={{ fontFamily: "cursive" }}
                                    onClick={(e) => addSign(e, index)}>
                                    {" "}Add Signature
                                </button>
                            </span>
                    ))}
                </div>
            </div>
            {/* <div className='col-4 d-none'>
                <button title='Add Flied' className='btn btn-primary'
                    onClick={(e) => addSign(e,"")}> Add Flied's</button>
            </div> */}
            {openAddFeildsModal ?
                <AgreementOneForm
                    show={openAddFeildsModal}
                    setFelidData={setFelidData}
                    close={() => setOpenAddFeildsModal(false)}
                    //   userData={userData}
                    setApicall={setApicall}
                    felidData={felidData}
                    emp_user_type={emp_user_type}
                    user_id={user_id}
                    // openSignature={openSignature}
                    //   ViewPdfclose={close}
                    openSignature={showDetailsOption ? "no" : "yes"}
                    folderId={folderId}
                    index={clientIndex} />
                : null}
        </div>
    )
}
