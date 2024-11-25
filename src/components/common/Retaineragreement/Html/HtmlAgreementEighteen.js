import moment from "moment";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
const HtmlAgreementEighteen = ({
    page,
    felidData,
    userData,
    emp_user_type,
    addSign,
}) => {
    const familyJsonArray = felidData?.family_json || []; //? JSON.parse(felidData?.family_json) : [];
    const jsxContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Retainer Agreement</title>
        <meta name="author" content="Admin">
        <style>
            body {
                font-family: 'Century', serif;
                 margin: 0 auto;
                color: black;
            }
            .header {
                padding: 10px 20px;
                text-align: center;
            }
            .main_div {
                padding: 10px;
            }
            h1, h2, h3, h5 {
                text-align: center;
            }
            .para_gap {
                border-bottom: 1px solid grey;
                display: inline-block;
                min-width: 150px;
            }
            td {
                border: 1px solid #333;
                padding: 5px;
            }
            .signature-section {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            .signature {
                width: 50%;
            }
            .client-info, .rcic-info {
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
            }
            .client-info p, .rcic-info p {
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <img src="https://canpathwaysjobs.com/image/00logo-main-black.png" alt="Canpathways logo" style="max-width: 200px;">
        </div>
        <div class="main_div">
            <h2>RETAINER AGREEMENT</h2>
            <h4 style="text-align: center">Between Harpreet Kaur</h4>
            <h4 style="text-align: center">CAN Pathways Immigration Consultancy Ltd.</h4>
            <h4 style="text-align: center">
                <strong>Client:</strong> <span class="para_gap">${felidData &&
            (familyJsonArray[0]?.client_first_name ||
                familyJsonArray[0]?.client_last_name)
            ? familyJsonArray[0]?.client_first_name +
            " " +
            (familyJsonArray[0]?.client_last_name || "")
            : emp_user_type === "employee"
                ? userData?.name || "" || ""
                : "" || ""
        }</span>
            </h4>
            <p>This Agreement ("the <b>Agreement</b>") is made on the date mentioned below.</p>
            <p>"The <b>Effective Date:</b>
    ${felidData?.agreement_date &&
            felidData?.agreement_date !== "0000-00-00 00:00:00" &&
            felidData?.agreement_date !== "0000-00-00"
            ? ` <span class="para_gap">${moment(
                new Date(felidData?.agreement_date)
            ).format("DD MMMM YYYY")}`
            : "____________"
        }"</p>
            <p>BY AND BETWEEN</p>
            <p>This <b>RECRUITMENT AGREEMENT</b> entered by and between <br>
                <b>CAN Pathways Immigration Consultancy Ltd.</b> (the "Agency")   with address at Unit #310, 2618 Hopewell PI. NE Calgary, AB. T1Y 717, Canada, represented by Registered Canadian Immigration Consultant referred to as (RCIC) Harpreet Kaur, herein "<b>Legal Representative / Agent / Recruiter</b>".</p>
            <p>AND</p>
            <p>The <b>"Candidate"</b>, as his/her details appear in Appendix I of this present agreement, collectively called the "Client".</p>
            <p><b>WHEREAS</b> the Recruiter and the Client wish to enter into a written agreement which contains the agreed-upon terms and conditions upon which the Recruiter will provide his/her services to the Client. Harpreet Kaur is a licensed recruiter and is authorized to engage in sourcing, selection, and recruitment activities, potentially related to employment or staffing.</p>
            <p><b>AND WHEREAS</b> the recruiter is a member of the College of Immigration and Citizenship Consultants (the "Council") (RCIC), the regulator in Canada for immigration consultants;</p>
            <p>IN CONSIDERATION of the mutual promises and covenants herein contained and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties hereto willing to be legally bound agree as follows:</p>
    
            <ol>
                <li>
                    The Candidate agrees to engage the services of <b>CAN Pathways Immigration Consultants Ltd.</b> to assist in finding a suitable employer. The candidate agrees to utilize the services of the Agency for tasks such as candidate sourcing, resume screening, interview coordination, reference checks, and assistance with contract negotiations.
                </li>
                <li>
                    The Candidate, seeking employment or job placement, agrees to sign the retainer specifically for the recruitment services being offered. This indicates that the Candidate acknowledges the separate nature of these services and understands that they are unrelated to any immigration or citizenship matters they may be pursuing with the Recruit er.
                </li>
                <li>
                    The Candidate has duly provided consent for the acquisition of recruitment services and has not incurred any charges whatsoever in relation to the provision of said services.
                </li>
                <li>
                    The Recruiter has provided a thorough explanation and understanding regarding the distinction between recruitment services and immigration services, including their respective scope of practice. It has been made clear that the candidate is under no obligation to avail both services simultaneously from CAN Pathways Immigration Consultancy Ltd.
                </li>
                <li>
                    The Candidate has made an informed decision and voluntary agreement to engage CAN Pathways Immigration Consultancy Ltd. for the purpose of recruitment services.
                </li>
                <li>
                The employer has willingly agreed to remunerate the established standard service charge associated with the recruitment services, encompassing the successful placement of the candidate within the organization
                </li>
                <li>
                    The Candidate agrees to provide, upon request from the recruiter:
                    <ul>
                        <li>All necessary documentation</li>
                        <li>All documentation in English or French, or with an English or French translation.</li>
                    </ul>
                </li>
                <li>
                    The Client understands that he/she must be accurate and honest in the information he/she provides and that any misrepresentations or omissions may void this Agreement, or seriously affect the outcome of the application or the retention of any immigration status he/she may obtain. The Recruiter's obligations under the retainer Agreement are null and void if the Client knowingly provides any inaccurate, misleading, or false material information.
                </li>
                <li>
                    This agreement does not provide a guarantee of securing employment.
                </li>
                <li>
                    <h6>Confidentiality:</h6>
                    <p>All information and documentation reviewed by The Recruiter, required by the employer, and used for the placement and recruitment services, will not be divulged to any third party, other than agents or employees of the Recruiter, without prior consent, except as demanded by the Council or required under law. The Recruiter, and all agents and employees of The Recruiter, are also bound by the Confidentiality requirement of Article 8 of The Code of Professional Ethics. The Client agrees to the use of electronic communication and storage of confidential information. The Recruiter will use his/her best efforts to maintain a high degree of security for electronic communication and information storage.</p>
                </li>
                <li>
                    <h6>Change Policy:</h6>
                    <p>The Client acknowledges that if the Recruiter is asked to act on the Client's behalf on matters other than those outlined above in the scope of this Agreement, or because of a matter other than those outlined above in the scope of this Agreement, or because of a material change in the Client's circumstances, or because of material facts not disclosed at the outset of the application, the Agreement can be modified accordingly. This Agreement may only be altered or amended when such changes are made in writing and executed by the parties hereto. All changes and/or edits must be initialed and dated by both the Member and the Client. Any substantial changes to this agreement may require that the parties enter into a new Retainer Agreement.</p>
                </li>
                <li>
                    <h6>Termination</h6>
                    <p>This Agreement is considered terminated upon completion of tasks identified under this agreement.<br> This Agreement is considered terminated if material changes occur to the Client's application or eligibility, which make it impossible to proceed with services detailed in this Agreement.</p>
                </li>
                <li>
                    <h6>Discharge or Withdrawal of Representation</h6>
                    <p>The Client may discharge representation and terminate this Agreement, upon writing, at which time any outstanding or unearned fees or disbursements will be refunded by the RCIC to the Employer and/or any outstanding fees or disbursements will be paid by the Employer to the Recruiter.<br><br> Pursuant to Article 11 of the Code of Professional Ethics, the Recruiter may withdraw representation and terminate this Agreement, upon writing, provided withdrawal does not cause prejudice to the Client, at which time any outstanding or unearned fees or disbursements will be refunded by the Recruiter to the Employer and/or any outstanding fees or disbursements will be paid by the Employer to the RCIC.</p>
                </li>
                <li>
                    <h6>Governing Law</h6>
                    <p>This Agreement shall be governed by the laws in effect in the Province/Territory of Alberta, and the federal laws of Canada applicable therein and except for disputes pursuant to Section 9 hereof, any dispute with respect to the terms of this Agreement shall be decided by a court of competent jurisdiction within the Province/Territory of Alberta.</p>
                </li>
                <li>
                    <h6>Miscellaneous</h6>
                    <div>
                       
                    <p>15.1 The Client expressly authorizes the Recruiter to act on his/her behalf to the extent of the specific functions which the Recruiter was retained to perform, as per Section 2 hereof.
                        </p>
                        <p>15.2 This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, warranties, representations, negotiations, and discussions, whether oral or written, of the parties except as specifically set forth herein.
                        </p>
                        <p>15.3 This Agreement shall be binding upon the parties hereto and their respective heirs, administrators, successors, and permitted assigns.
                        </p>
                        <p>15.4 The costs enumerated in this Agreement are to be paid by the Employer.
                        </p>
                        <p>15.5 This Agreement may only be altered or amended when such changes are made in writing and executed by the parties hereto. All changes and/or edits must be initialed and dated by both the Member and the Client. Any substantial changes to this Agreement may require that the parties enter into a new Retainer Agreement.
                        </p>
                        <p>15.6 The Client may, after a Retainer Agreement is signed, appoint a Designate to act on their behalf when dealing with the Recruiter. A Designate must not be compensated by the Client or the Recruiter for acting in the capacity of a Designate.
                        </p>
                        <p>15.7 The provisions of this Agreement shall be deemed severable. If any provision of this Agreement shall be held unenforceable by any court of competent jurisdiction, such provision shall be severed from this Agreement, and the remaining provisions shall remain in full force and effect.
                        </p>
                        <p>15.8 The headings utilized in this Agreement are for convenience only and are not to be construed in any way as additions to or limitations of the covenants and agreements contained in this Agreement.
                        </p>
                        <p>15.9 Each of the parties hereto must do and execute or cause to be done or executed all such further and other things, acts, deeds, documents, and assurances as may be necessary or reasonably required to carry out the intent and purpose of this Agreement fully and effectively.
                        </p>
                        <p>15.10 The Client acknowledges that he/she has had sufficient time to review this Agreement and has been given an opportunity to obtain independent legal advice and translation prior to the execution and delivery of this Agreement.
                        </p> 
                    </div>
                </li>
                <li>
                <h6>Contact Information</h6>
                <div class="row">
            <p class="col-12"><u>Client</u></p><br><br>
        <p class="col-6 text-capitalize">
        Given Name :  
        <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${felidData && familyJsonArray[0]?.client_first_name
            ? familyJsonArray[0]?.client_first_name
            : (emp_user_type === "employee" ? userData?.name || "" : "")?.split(
                " "
            )[0]
        } 
        </span>
        </p>
        <p class="col-6 text-capitalize">
        Family Name :  
         <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${(familyJsonArray[0]?.client_last_name
            ? familyJsonArray[0]?.client_last_name
            : " ") ??
        (emp_user_type === "employee" ? userData?.name || "" : "")?.split(
            " "
        )[1]
        } 
         </span>
         </p>
        <p class="col-6 text-capitalize">
        Address :  <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${felidData && felidData?.client_address
            ? felidData?.client_address
            : emp_user_type === "employer"
                ? userData?.address || ""
                : (userData?.current_location || "") +
                " " +
                (userData?.currently_located_country || "")
        } 
        </span>
        </p> 
        <p class="col-6">
        Telephone Number :  <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${felidData && felidData?.client_telephone
            ? felidData?.client_telephone
            : userData?.contact_no || ""
        }
        </span>
        </p>
        <p class="col-6">
        Cellphone Number :  
         <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${(felidData?.client_cellphone ? felidData?.client_cellphone : " ") ||
        ""
        }
         </span>
         </p>
        <p class="col-6">
        Fax Number :  
         <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${(felidData?.client_fax ? felidData?.client_fax : " ") || ""
        }</span>
         </p>
         <p class="col-6">
         E-mail Address :  <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${felidData && felidData?.client_email
            ? felidData?.client_email || ""
            : userData?.email || ""
        }
         </span>
         </p>
                <p class="col-12"><u>Recruiter</u></p><br><br>
                <p class="col-6 text-capitalize">Given Name: <span class="para_gap">Harpreet</span></p>
                <p class="col-6 text-capitalize">Family Name: <span class="para_gap">Kaur</span></p>
                <p class="col-6 text-capitalize">Address: <span class="para_gap">2618 Hopewell</span></p>
                <p class="col-6 text-capitalize">Telephone Number: <span class="para_gap">403-888-5308</span></p>
                <p class="col-6 text-capitalize">Fax: <span class="para_gap">                    </span></p>
                <p class="col-6 text-capitalize">E-mail: <span class="para_gap"><a href="mailto:info@canpathways.ca">info@canpathways.ca</a></span></p>
         <p class="container-fluid"><b>IN WITNESS THEREOF this Agreement has been duly executed by the parties hereto on the date first above written</b></p>
                <div class="col-6">
                <p><span class="para_gap">${familyJsonArray[0]?.client_signature
            ? `
                <div class="d-flex flex-column">
                                <img
              src="${familyJsonArray[0]?.client_signature}"
              alt="${felidData &&
                (familyJsonArray[0]?.client_first_name ||
                    familyJsonArray[0]?.client_last_name)
                ? familyJsonArray[0]?.client_first_name +
                " " +
                (familyJsonArray[0]?.client_last_name || "")
                : emp_user_type === "employee"
                    ? userData?.name || "" || ""
                    : "" || ""}"
              style="max-width: 200px; float: right;"
              class="${familyJsonArray[0]?.client_signature ? "d-block" : "d-none"}"
            />
             <p style="margin: 0">______________________________</p>
                          <small class="row ">
                            <span class="col text-capitalize" >
                              ${felidData &&
                (familyJsonArray[0]?.client_first_name ||
                    familyJsonArray[0]?.client_last_name)
                ? familyJsonArray[0]?.client_first_name +
                " " +
                (familyJsonArray[0]?.client_last_name || "")
                : emp_user_type === "employee"
                    ? userData?.name || "" || ""
                    : "" || ""}${familyJsonArray[0]?.date_signature_client}</span>
                          </small>
                              </div>`
            : page === "admin"
                ? "                "
                : ` <button class="btn btn-outline-secondary border-0  " 
                          style="font-family:cursive;" 
                          id="add-signature-button-0">
                    Add Signature
                  </button>`
        }</span><br>
                <span>${familyJsonArray[0]?.client_first_name} ${familyJsonArray[0]?.client_last_name}</span>
                </p>
                <p>Signature of Client</p>
                </div>
                <div class="col-6">
                <p><span class="para_gap">${felidData?.rcic_signature ? `<img src="${felidData.rcic_signature}" alt="RCIC Signature" style="max-width: 200px;">` : "                        "}</span><br>
                <span>Harpreet Kaur</span></p>
                <p>Signature of RCIC</p>
                </li>
            </ol>
            </div>
      </div>
      <h3 style="text-align: center">AUTHORIZATION</h3>
            <p>I <span class="para_gap">${felidData &&
            (familyJsonArray[0]?.client_first_name ||
                familyJsonArray[0]?.client_last_name)
            ? familyJsonArray[0]?.client_first_name +
            " " +
            (familyJsonArray[0]?.client_last_name || "")
            : emp_user_type === "employee"
                ? userData?.name || "" || ""
                : "" || ""}</span> hereinafter referred to as the "client"), hereby authorize and appoint Harpreet kaur (hereinafter referred to as the "Recruiter" with an ICCRC# RS33393), of CAN Pathways Immigration Consultancy Ltd. (hereinafter referred to as the "firm"), to represent me in the recruitment process.<br><br>
            The Recruiter and the firm are authorized to assign any of its staff members, associates, affiliates, lawyers or the agents to process any matters in whole or part related to above-mentioned subject as they deem appropriate.<br><br>
            The Recruiter and the firm are authorized to collect Information and communicate with The Employer related to my profile. In case of Online application and documentation.  I authorized Recruiter Harpreet Kaur to electronically sign and submit the application on my behalf.<br><br>
            I also give permission to the Recruiter and the firm to post photos on social media ensuring that my private information is redacted. In doing so, they my each receive or pay each other any pecuniary remuneration/benefits that may be acquired directly or indirectly including those from a third party for the purpose of obtaining a favorable and expeditious results.</p>
            <p>The RCIC and the firm are authorized to act on my behalf.</p>
            <p>I also agree to provide all necessary documentation as required.</p>
    
            <h5>Declaration</h5>
            <ol>
                <li>I confirm that neither I nor any other representatives included in my application have presented or will present at any future date, false and misleading information to either the Recruiter, the firm or to the government of Canada</li>
                <li>I understand that The Recruiter's obligations under the Engagement are null and void if the Client knowingly provides any inaccurate, misleading or false material information.</li>
                <li>I agree that if my application is refused hecause I neglected to provide the required documents or information within the notified time frame or fail to show up at the time of interview, selection or training period the Recruiter, the firm or the Employer will not be held responsible</li>
            </ol>
            <p>I have read and understood all the terms and steps in the retainer letter above and I agree to all the terms mentioned And for so daing, this document shall constitute good and sufficient authority and declaration</p>
        </div>
    <div class="row">
        <div class="col-4">
                <p><span class="para_gap">${felidData &&
            (familyJsonArray[0]?.client_first_name ||
                familyJsonArray[0]?.client_last_name)
            ? familyJsonArray[0]?.client_first_name +
            " " +
            (familyJsonArray[0]?.client_last_name || "")
            : emp_user_type === "employee"
                ? userData?.name || "" || ""
                : "" || ""}</span>
                </p>
                <p>Name of Client</p>
                </div>
                    <div class="col-4">
                <p> ${familyJsonArray[0]?.client_signature
            ? `
        <div class="d-flex flex-column">
                        <img
      src="${familyJsonArray[0]?.client_signature}"
      alt="${familyJsonArray[0]?.client_first_name} ${familyJsonArray[0]?.client_last_name
            }"
      style="max-width: 200px; float: right;"
      class="${familyJsonArray[0]?.client_signature ? "d-block" : "d-none"}"
    />
     <p style="margin: 0">______________________________</p>
                  <small class="row ">
                    <span class="col text-capitalize" >
                      ${felidData &&
                (familyJsonArray[0]?.client_first_name ||
                    familyJsonArray[0]?.client_last_name)
                ? familyJsonArray[0]?.client_first_name +
                " " +
                (familyJsonArray[0]?.client_last_name || "")
                : emp_user_type === "employee"
                    ? userData?.name || "" || ""
                    : "" || ""}${moment(familyJsonArray[0]?.date_signature_client).format("DD-MM-YYYY")}</span>
                  </small>
                      </div>`
            : "___________________________"
        }
                </p><p>Signature of Client</p>
                </div>
             <div  class="col-4">
            <p>
               ${familyJsonArray[0]?.date_signature_client === "0000-00-00 00:00:00" ||
            familyJsonArray[0]?.date_signature_client === "0000-00-00" ||
            !familyJsonArray[0]?.date_signature_client
            ? "_____________________"
            : `<span  class="para_gap" style="max-width: 200px;">${!familyJsonArray[0]?.date_signature_client ||
                familyJsonArray[0]?.date_signature_client === "0000-00-00 00:00:00" ||
                familyJsonArray[0]?.date_signature_client === "0000-00-00"
                ? "_______________"
                : moment(familyJsonArray[0]?.date_signature_client).format("DD-MM-YYYY")
            }</span>`
        }
            </p>
            <p >Date</p>
                </div>
                <div class="col-4">
                <p><span class="para_gap">Harpreet Kaur</span>
                </p>
                <p>Name of RCIC</p>
                </div>
                    <div class="col-4">
                <p><span>${felidData?.rcic_signature ? `<img src="${felidData?.rcic_signature}" alt="RCIC Signature" style="max-width: 200px;">` : "______________________"}</span>
                </p><p>Signature of RCIC</p>
                </div>
             <div  class="col-4">
            <p>
               ${felidData?.date_signature_rcic === "0000-00-00 00:00:00" ||
            felidData?.date_signature_rcic === "0000-00-00" ||
            !felidData?.date_signature_rcic
            ? "_____________________"
            : `<span  class="para_gap" style="max-width: 200px;">${moment(felidData?.date_signature_rcic).format("DD-MM-YYYY")}</span>`
        }
            </p>
            <p >Date</p>
                </div>
        <div class="header" style="padding: 10px 20px; text-align: center; color: #ed1c24;">
            Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada | Tel.: 403.888.5308 <br>Email: info@canpathways.ca | Website: www.canpathways.ca
        </div>
    </body>
    </html>`;
    useEffect(
        (e) => {
            // Attach event listeners after HTML is injected
            familyJsonArray.forEach((_, index) => {
                const button = document.getElementById(`add-signature-button-${index}`);
                if (button) {
                    button.addEventListener("click", () => addSign(e, index));
                }
            });

            // Clean up event listeners
            return () => {
                familyJsonArray.forEach((_, index) => {
                    const button = document.getElementById(
                        `add-signature-button-${index}`
                    );
                    if (button) {
                        button.removeEventListener("click", () => addSign(e, index));
                    }
                });
            };
        },
        // eslint-disable-next-line
        [familyJsonArray]
    );
    return (
        <div
            className="agreement_content"
            style={{
                maxWidth: "1024px",
                margin: "0 auto",
                background: "#fff",
                padding: "30px",
                height: "calc(100vh - 100px)",
                overflow: "auto",
            }}
        >
            <div dangerouslySetInnerHTML={{ __html: jsxContent }} />
        </div>
    );
};
export default HtmlAgreementEighteen;