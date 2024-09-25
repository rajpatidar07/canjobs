// import React, { useEffect, useState } from 'react'
// import { Modal } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
// import useValidation from '../../common/useValidation';
// import { toast } from 'react-toastify';
// import { SendEmail } from '../../../api/api';

// export default function SendEmailAgreement({ show, close,
//     user_id,
//     emp_user_type,
//     folderId,
//     felidData,
//     pdf }) {
//     const [emails, setEmails] = useState([]);
//     const [input, setInput] = useState('');
//     const [fileBase, setFileBase] = useState('');
//     const [loading, setLoading] = useState('');
// //     const initialFormState = {
// //         subject: felidData.type,
// //         email: felidData.client_email,
// //         adminemail: emails,
// //         description:`<form style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
// //     <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 400px; width: 100%;">
// //         <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;">Sign Agreement</div>
// //         <div style="font-size: 16px; color: #666; margin-bottom: 15px; text-align: center;">
// //             Please fill in your details to sign the agreement.
// //         </div>
// //         <div style="margin-bottom: 15px;">
// //             <a href=${`http://localhost:3000/signagreement?id=${user_id}&user=${emp_user_type}&folderId=${folderId}&documentId=${felidData.document_id}&type=${felidData.type.replaceAll(" ","%20")}} style="width: 100%; padding: 10px; background-color: #28a745; border: none; border-radius: 5px; color: #fff; font-size: 18px; font-weight: bold; cursor: pointer;" onclick="window.location.href='http://localhost:3000/signagreement?id=${user_id}&user=${emp_user_type}&folderId=${folderId}&documentId=${felidData.document_id}&type=${felidData.type.replaceAll(' ', '%20')}'">
// //                 Sign Agreement
// //             </a>
// //         </div>
// //     </div>
// // </form>`,{/* `Retainer Agreement Document: http://localhost:3000/signagreement?id=${user_id}&user=${emp_user_type}&folderId=${folderId}&documentId=${felidData.document_id}&type=${felidData.type.replaceAll(" ","%20")}`,// ${pdf["@microsoft.graph.downloadUrl"]}`,*/}
// const initialFormState = {
//     subject: felidData.type,
//     email: felidData.client_email,
//     adminemail: emails,
//     description: `<form style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
//         <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 400px; width: 100%;">
//             <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;">Sign Agreement</div>
//             <div style="font-size: 16px; color: #666; margin-bottom: 15px; text-align: center;">
//                 Please fill in your details to sign the agreement.
//             </div>
//             <div style="margin-bottom: 15px;">
//                 <a href=${`http://localhost:3000/signagreement?id=${user_id}&user=${emp_user_type}&folderId=${folderId}&documentId=${felidData.document_id}&type=${felidData.type.replaceAll(" ","%20")}`} style="width: 100%; padding: 10px; background-color: #28a745; border: none; border-radius: 5px; color: #fff; font-size: 18px; font-weight: bold; cursor: pointer;">
//                     Sign Agreement
//                 </a>
//             </div>
//         </div>
//     </form>`
// };
//         };
//     const { state, setState/*, onInputChange, errors, setErrors, validate*/ } =
//         useValidation(initialFormState,/* validators*/);

//     useEffect(() => {
//         convertPdfToBase64()
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])

//     /*On change function to add email */
//     const handleInputChange = (e) => {
//         setInput(e.target.value);
//     };

//     /*Function to add email */
//     const handleAddEmail = (e) => {
//         e.preventDefault();
//         if (input && !emails.includes(input)) {
//             const updatedEmails = [...emails, input];
//             setEmails(updatedEmails);
//             setState({ ...state, adminemail: updatedEmails });
//             setInput('');
//         }
//     };

//     const handleRemoveEmail = (emailToRemove) => {
//         const updatedEmails = emails.filter(email => email !== emailToRemove);
//         setEmails(updatedEmails);
//         setState({ ...state, adminemail: updatedEmails });
//     };
//     // function fileToBase64(file) {
//     //     return new Promise((resolve, reject) => {
//     //         const reader = new FileReader();
//     //         reader.readAsDataURL(file);
//     //         reader.onloadend = () => {
//     //             let base64data = reader.result;
//     //             // Remove metadata from base64 string if needed
//     //             base64data = base64data.replace(/^data:(.*;base64,)?/, '');
//     //             resolve(base64data);
//     //         };
//     //         reader.onerror = reject;
//     //     });
//     // }
//     const fileToBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             const fileReader = new FileReader();
//             fileReader.addEventListener("load", () => {
//                 resolve({ base64: fileReader.result });
//             });
//             fileReader.readAsDataURL(file);
//             fileReader.onerror = (error) => {
//                 reject(error);
//             };
//         });
//     };
//     /*Function to convert url to base64 */
//     const convertPdfToBase64 = async () => {
//         try {
//             const fileNameList = [];
//             // const response = await fetch(pdf["@microsoft.graph.downloadUrl"]);
//             // const blob = await response.blob();
//             // const reader = new FileReader();
//             const response = await fetch(pdf["@microsoft.graph.downloadUrl"]);
//             const blob = await response.blob();

//             // Create a File object
//             const file = new File([blob], felidData.type.replaceAll(" ", "_"), { type: blob.type });
//             let encoded = await fileToBase64(file)
//             const base64Name = encoded.base64;

//             // Construct file object with base64 data
//             const DocFile = `data:/${base64Name.split(";")[0].split("/")[1]};${base64Name.split(";")[1]
//                 }`;
//                 console.log(DocFile)
//             // Use DocRealName as the key for DocFile

//             // reader.onloadend = () => {
//             //     console.log(reader.result.replace("application",""))
//             const fileList = {};
//             const DocRealName = `${file.name}.pdf`;
//             fileList[DocRealName] = DocFile;
//             fileNameList.push(DocRealName);
//             setFileBase(fileList);
//             // };

//             // reader.readAsDataURL(blob);
//         } catch (error) {
//             console.error('Error converting PDF to Base64:', error);
//         }
//     };
//     const onFormSubmit = async () => {
//         console.log(fileBase)
//         try {
//             setLoading(true);
//             let Response = await SendEmail(state, fileBase);
//             setLoading(false);
//             if (Response.message === "email sent successfully") {
//                 toast.success("Email sent successfully", {
//                     position: toast.POSITION.TOP_RIGHT,
//                     autoClose: 1000,
//                 });
//                 setLoading(false);
//                 close()
//                 //   setState(initialFormState);
//                 // setFileBase("");
//                 //   setFileNames([]);
//                 //   setErrors("");
//                 //   setApiCall(true);
//             }
//             if (Response.message === "Failed !") {
//                 toast.error("Something went wrong", {
//                     position: toast.POSITION.TOP_RIGHT,
//                     autoClose: 1000,
//                 });
//                 setLoading(false);
//                 //   setState(initialFormState);
//                 //   setErrors("");
//                 // setFileBase("");
//                 //   setFileNames([]);
//             }
//             if (Response.message === "Fields must not be empty!") {
//                 toast.error("Something went wrong", {
//                     position: toast.POSITION.TOP_RIGHT,
//                     autoClose: 1000,
//                 });
//                 setLoading(false);
//                 //   setState(initialFormState);
//                 //   setErrors("");
//                 // setFileBase("");
//                 //   setFileNames([]);
//             }
//         } catch (err) {
//             console.log(err);
//             setLoading(false);
//             // setFileBase("");
//             // setFileNames([]);
//             // setErrors("");
//             // setState(initialFormState);
//         }
//     }
//     return (
//         <Modal
//             show={show}
//             size="md"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <button
//                 type="button"
//                 className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
//                 data-dismiss="modal"
//                 onClick={() => { close() }}
//             >
//                 <i className="fas fa-times"></i>
//             </button>
//             <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
//                 <form onSubmit={onFormSubmit}>
//                     <h5 className="text-center mb-7 pt-2">Send Mail</h5>
//                     <div className="form-group d-flex mb-3 p-0">
//                         <label
//                             htmlFor="addmail"
//                             className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
//                         >
//                             Add mail<span className="text-danger">*</span> :
//                         </label>
//                         <input
//                             type="email"
//                             value={input}
//                             onChange={handleInputChange}
//                             placeholder="Enter email"
//                             required
//                             id="addmail"
//                             className='text-capitalize w-100'
//                         />
//                         <button type="button" className=' btn-primary px-5  mx-2  rounded-5 text-uppercase' onClick={handleAddEmail}>+</button>
//                     </div>
//                     <div className="form-group">
//                         <ul className="list-unstyled d-flex align-items-center flex-wrap">
//                             <li
//                                 className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
//                             >{felidData.client_email}</li>
//                             {emails.map(email => (

//                                 <li
//                                     className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
//                                     key={email}
//                                 >
//                                     {email}
//                                     <Link
//                                         className="p-0 ms-1"
//                                         onClick={() => handleRemoveEmail(email)}
//                                     >
//                                         <i
//                                             className="px-3 fa fa-times-circle"
//                                             aria-hidden="true"
//                                         ></i>
//                                     </Link>
//                                 </li>
//                             ))}</ul>
//                     </div>
//                     <div className="mb-2 col-12 text-center">
//                         {loading === true ? (
//                             <button
//                                 className="btn btn-primary btn-small w-100 rounded-5 text-uppercase "
//                                 type="button"
//                                 disabled
//                             >
//                                 <span
//                                     className="spinner-border spinner-border-sm "
//                                     role="status"
//                                     aria-hidden="true"
//                                 ></span>
//                                 <span className="sr-only">Loading...</span>
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={(e) => onFormSubmit(e)}
//                                 className="btn btn-primary btn-small rounded-5 text-uppercase w-100"
//                                 type="button"
//                             >
//                                 Submit
//                             </button>
//                         )}
//                     </div>
//                 </form>
//             </div>
//         </Modal>
//     )
// }
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import useValidation from "../../common/useValidation";
import { toast } from "react-toastify";
import { SendEmail } from "../../../api/api";

export default function SendEmailAgreement({
  show,
  close,
  user_id,
  emp_user_type,
  folderId,
  felidData,
  pdf,
}) {
  const [emails, setEmails] = useState([]);
  const [input, setInput] = useState("");
  const [fileBase, setFileBase] = useState("");
  const [loading, setLoading] = useState(false);
  const initialFormState = {
    subject: felidData.type,
    email: felidData.client_email,
    adminemail: emails,
    description: `<form style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 400px; width: 100%;">
                <div style="font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;">Sign Agreement</div>
                <div style="font-size: 16px; color: #666; margin-bottom: 15px; text-align: center;">
                    Please fill in your details to sign the agreement.
                </div>
                <div style="margin-bottom: 15px;display:flex;justify-content:center;">
                    <a href=${`${
                      window.location.origin
                    }/signagreement?id=${user_id}&user=${emp_user_type}&folderId=${folderId}&documentId=${
                      felidData.document_id
                    }&type=${felidData.type.replaceAll(
                      " ",
                      "%20"
                    )}`} style="width: 100%; padding: 10px; background-color: #28a745; border: none; border-radius: 5px; color: #fff; font-size: 18px; font-weight: bold; cursor: pointer;text-align: center;">
                        Sign Agreement
                    </a>
                </div>
            </div>
        </form>`,
  };
  //Aws: https://canpathwaysjobs.com
  //Vercel: https://canjobs.vercel.app
  //local:http://localhost:3000
  const { state, setState } = useValidation(initialFormState);

  useEffect(() => {
    convertPdfToBase64();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddEmail = (e) => {
    e.preventDefault();
    if (input && !emails.includes(input)) {
      const updatedEmails = [...emails, input];
      setEmails(updatedEmails);
      setState({ ...state, adminemail: updatedEmails });
      setInput("");
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    const updatedEmails = emails.filter((email) => email !== emailToRemove);
    setEmails(updatedEmails);
    setState({ ...state, adminemail: updatedEmails });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  const convertPdfToBase64 = async () => {
    try {
      const response = await fetch(pdf["@microsoft.graph.downloadUrl"]);
      const blob = await response.blob();
      const file = new File(
        [blob],
        `${felidData.type.replaceAll(" ", "_")}.pdf`,
        { type: blob.type }
      );
      const base64 = await fileToBase64(file);
      const fileList = {};
      fileList[file.name] = base64;
      setFileBase(fileList);
    } catch (error) {
      console.error("Error converting PDF to Base64:", error);
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await SendEmail(state, fileBase);
      setLoading(false);
      if (response.message === "email sent successfully") {
        toast.success("Email sent successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        close();
      } else {
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while sending the email", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={close}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="bg-white rounded h-100 p-7 overflow-y-hidden">
        <form onSubmit={onFormSubmit}>
          <h5 className="text-center mb-7">Send Mail</h5>
          <div className="form-group d-flex mb-3 p-0">
            <label
              htmlFor="addmail"
              className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
            >
              Add mail<span className="text-danger">*</span> :
            </label>
            <input
              type="email"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter email"
              id="addmail"
              className="form-control w-100"
            />
            <button
              type="button"
              className="btn-primary px-5 mx-2 rounded-5 text-uppercase"
              onClick={handleAddEmail}
            >
              +
            </button>
          </div>
          <div className="form-group">
            <ul className="list-unstyled d-flex align-items-center flex-wrap">
              <li className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center">
                {felidData.client_email}
              </li>
              {emails.map((email) => (
                <li
                  className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                  key={email}
                >
                  {email}
                  <Link
                    className="p-0 ms-1"
                    onClick={() => handleRemoveEmail(email)}
                  >
                    <i
                      className="px-3 fa fa-times-circle"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-2 col-12 text-center">
            {loading ? (
              <button
                className="btn btn-primary btn-small w-100 rounded-5 text-uppercase"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Loading...</span>
              </button>
            ) : (
              <button
                className="btn btn-primary btn-small rounded-5 text-uppercase w-100"
                type="submit"
                disabled={input === "" ? false : true}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
