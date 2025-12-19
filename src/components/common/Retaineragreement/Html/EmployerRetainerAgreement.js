import React, { useEffect } from 'react'
import { InitialFunction } from '../CommonThings/InitialFunction';
import { ClientSignatureFunction } from '../CommonThings/ClientSignatureFunctionHtml';
import { RCICSignatureFunction } from '../CommonThings/RCICSignatureFunction';
import CommonRetainerAgreementDate from "../CommonRetainerAgreementDate"
export default function EmployerRetainerAgreement({ page,
  felidData,
  userData,
  emp_user_type,
  addSign,
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const familyJsonArray = felidData?.family_json || [];

  // console.log(felidData, "userData", familyJsonArray, page);

  const jsxContent = `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Retainer Agreement</title>
        <meta name="author" content="Admin" />
        <style type="text/css">
        body {font-family: Century;
    }
          .para_gap {
            min-width: auto;
            border-bottom: 1px solid grey;
            display: inline-block;
          }
          td {
            border: 1px solid #333;
            padding: 5px;
          }
        </style>
      </head>
       <body style="margin: 0 auto; max-width: 1024px; color: black;">
        <div class="header" style="padding: 10px 20px;text-align: justify;">
          <img
            src="https://canpathwaysjobs.com/image/Retainer_agreement_logo.png"
            alt="Canpathways logo"
            style="max-width: 200px"
          />
        </div>
        <div class="content" style="padding: 10px 20px;text-align: justify;">
            <h2 class="font-weight-bold text-blue mb-4 mt-4 text-capitalize text-primary font-size-6">Can Pathways Immigration Consultancy </h2>
            <p class="m-0">2618 Hopewell Pl NE #310, Calgary, AB T1Y 7J7</p>
            <p class="m-0">Tel: +1. (403)888 5308 </p>
            <p class="m-0">Email: <a href="mailto:info@canpathwaysjobs.com">info@canpathwaysjobs.com</a></p>
            <p class="m-0"> <a href="https://www.canpathwaysjobs.com">https://canpathwaysjobs.com</a></p>
        </div>
        <div class="content" style="padding: 10px 20px;text-align: justify;">
            <h2 class="font-weight-bold text-black text-center mb-4 mt-4 text-capitalize text-primary font-size-6">Retainer Agreement</h2>
            <p class="m-0">THIS RETAINER AGREEMENT is made on <span class="border-bottom border-dark">${felidData?.agreement_date && felidData?.agreement_date !== "0000-00-00" && felidData?.agreement_date !== "0000-00-00 00:00:00" ? CommonRetainerAgreementDate({ _date: felidData?.agreement_date, format: "llll" }) : ""}</span> </p>
            <p class="m-0">Program : <b>Application for Labour Market Impact Assessment (LMIA)+ Recruitment (if applicable)</b></p>
            <h3 class="font-weight-bold font-size-6 ">1. Contact Information</h3>
            <h4 class="font-weight-bold font-size-5">Between Client</h4>
            <ul>
                <li>Name Of Client: <span class="text-dark" style="min-width: 300px;">${familyJsonArray[0]?.client_first_name ||
      familyJsonArray[0]?.client_last_name
      ? ` <span class="border-bottom border-dark text-capitalize">${familyJsonArray[0]?.client_first_name
      } ${familyJsonArray[0]?.client_last_name || ""}</span>`
      : emp_user_type === "employee"
        ? ` <span class="border-bottom border-dark text-capitalize "style="min-width: 300px">${userData?.name}</span>` ||
        ""
        : "_____________________"}(here in after called the "Client")</span></li>
                <li>Name of Business: <span class="text-dark border-bottom border-dark" style="min-width: 300px;">${felidData?.business_name ? felidData?.business_name
      : emp_user_type === "employee"
        ? "                    "
        : userData?.company_name}</span>(here in after called the "Client")</li>
                <li>Business Address: <span class="text-dark text-capitalize" >${felidData?.client_address
      ? ` <span class="border-bottom border-dark" style="min-width: 300px;">${felidData?.client_address}</span>`
      : emp_user_type === "employer"
        ? userData?.address || ""
        : `<span class="border-bottom border-dark" style="min-width: 300px;">${userData?.current_location + userData?.currently_located_country || ""
        }</span>`
    }</span></li>
                <li>Phone: ${(felidData?.client_contact || userData?.contact_no) ? `<span class="border-bottom border-dark" style="min-width: 300px;">${felidData?.client_contact || userData?.contact_no}</span>` : "____________________________"
    }</li>
                <li>Email: <span class="border-bottom border-dark"style="min-width: 300px;">${felidData?.client_email ? felidData?.client_email : userData?.email || ""
    }</span></li>
    </ul>
                <h4 class="mt-4 font-size-5">And</h4>
                <div>
               <h4>Regulated Canadian Immigration Consultant (RCIC):</h4>
               <p><b>Harpreet Kaur</b> ( here in after called 'The RCIC')</p>
               <p>2618 Hopewell PI NE #310</p>
                  <p>Calgary, AB T1Y7J7, Canada</p>
                    <p>Tel: +1. (403)888 5308</p>
                    <p>Email: <a href="mailto:info@canpathways.ca"> info@canpathways.ca</a></p>
                    <p>Website: <a href="www.canpathways.ca">www.canpathways.ca</a></p>
                </div> 
    
                <h3 class="font-size-6 ">2. RCIC Responsibilities and Commitments</h3>
                <p>The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of the Client's applications for <b>Labour Market Impact Assessment Applications</b> from Employment and Social Development Canada (here in after <b>"ESDC"</b>) + <b>Recruitment</b> (if applicable)</p>
    
    <p> In consideration of the fees paid and the matter stated above, the RCIC agrees to do the following, with the assistance of the RClC's employees, as required:</p>
    <ul>
    <li> 	Advise the client as to which documents are required in support of the application;</li>
    <li> 	Act in the best interests of the Client within the limits of Canadian law;</li>
    <li> 	Guide the Client through the application process and review all documents to ensure consistency and accuracy;</li>
    <li> 	Submit the Client's application package to the appropriate offices;</li>
    <li> 	Apprise the Client on the progress of his/her application;</li>
    <li>  Handle all correspondence with <b>ESDC</b> on the Client’s behalf in respect to the application;</li>
    <li> 	Liaise between the Canadian government and the Client;</li>
    <li> 	Prepare the Client in advance if an Interview with an ESDC officer is requested.</li>
    <li> 	Perform all duties on behalf of the Client competently and professionally.</li>
    </ul>
    
    <div>
     <h3 class="font-weight-bold font-size-6 ">3.	Client Responsibilities and Commitment</h3>
     <p>Upon the request from the RCIC, The Client must:</p>
    <ul>
    <li> 	Provide all necessary documentation in English, or with an English translation, within the prescribed timeframe.</li>
    <li> 	Follow the instructions and advice provided by the RCIC within the prescribed timeframe.</li>
    <li>The undersigned, _______________ (Director) in their personal capacity, unconditionally and 
      irrevocably guarantees the full and prompt payment and performance of all debts, obligations, and 
      liabilities of _________________(Company Name) under this Agreement.</li>
      <li>In the event of default, the Creditor may proceed directly against the Guarantor’s personal assets 
without first exhausting remedies against the Company. The Guarantor waives any right to notice, 
demand, set-off, or defense.</li>
<li>This Guarantee is continuing, absolute, and binding, and shall remain in full force regardless of any 
amendment, renewal, extension, or modification of this Agreement. It shall also be binding upon the 
Guarantor and their heirs, executors, administrators, successors, and assigns.</li>
    <li> 	In the event Service Canada office should contact the Client directly, the Client is instructed to notify the RCIC immediately.</li>
    <li> 	The Client understands that they must be accurate and honest in the information they provide and that any inaccuracies may void this Agreement, or seriously affect the outcome of the application or the retention of any status they may obtain.</li>
    <li> 	The Client should use e-mails as the method of contacting the RCIC. The response time is between 2-3 business days.</li>
    <li> 	In the event of a Joint Retainer Agreement, The Client agrees that there will be a single point-of-contact for The Client.</li>
    <li> 	In the event the client is unable to contact the RCIC and has reason to believe the RCIC may be dead, incapacitated, or otherwise unable to fulfill RClC's duties, the client should contact ICCRC.</li>
    <li> 	The Clients agree that the RCIC may share information with all the clients in the event of a Joint Retainer Agreement and if there is a conflict that cannot be resolved RCIC cannot act for both and may have to withdraw completely.</li>
    <li> 	Acknowledges that they have been advised by RCIC that the outcome lies solely with the Government of Canada and that RCIC will not be held responsible for any such decisions.</li>
    <li> 	Acknowledges that he/she is retaining RCIC for immigration services and all fees paid to RCIC are for the same purposes and nothing else.</li>
    <li> 	Comply with the above otherwise can seriously affect the outcome of the results or in delaying or RCIC withdrawing the representation on the client's behalf without refund.</li>
    <li> 	Failure to comply with the above can result in the RCIC withdrawing from the representation of the Client and not giving a refund.</li>
    </ul>
    <p>The RClC's obligations under the Retainer Agreement are null and void if the Client knowingly provides any inaccurate, misleading, or false material information.The Client's financial obligations remain.</p>
     </div>
    
     <div>
      <h3 class="font-weight-bold font-size-6 ">4.	Billing Method and Payment Terms and Conditions</h3>
      <p>The Client will be billed bya flat fee with payment by milestones. The details of this billing method are as follows:</p>
     <p>The Client agrees to pay to the RCIC a Professional Fee of<b> CAD $3000 for each application</b>, for the services rendered to the Client in applying to <b>ESDC for Labour Market Impact Assessments + Recruitment (if applicable).</b></p>
    <p>The Professional Fee is solely for the services performed by the RCIC and does not include government fees or any other fees. Additional charges may be applied if the Client delays in providing necessary information and/or documentation to the RCIC, resulting in the RCIC having to change or modify the application.</p>
    <p>The Client agrees to pay for additional courier fees.</p>
    <p>Potential costs will apply for additional or new work requested such as additional documentation, applications; redo ESDC forms after being completed if ESDC changes forms before submitting; additional follow-up work created by delayed, incomplete, or no response from the Client; additional 'rush' work created by submitting documents requested by ESDC with less than 5 days left to the ESDC deadline given; responses to ESDC requests or challenges that require more than one hour for any single request; requests for unnecessary meetings and frequent updates on the application.</p>
    <div>
    <h3 class="font-weight-bold font-size-6 ">5. Payment Schedule</h3>
    <ul>
    <li><b>Total service charges PER LMIA position</b> $3000+ 5%GST</li>
    <li><b>The first payment will be paid by the Client to the RCIC on the day this Agreement is executed by the Client: CAD $1000 + 5% GST</b></li>
    <li><b>Second and final payment, will be paid by client before submitting final LMIA application to ESDC: CAD $2000+5% GST</b></li>
</ul>
    <p>*Taxes are payable wherever applicable. The above fee does not include any fees payable to the government of Canada. While the above fees are non-refundable — if for any reason agreement is terminated any un-used part of fees with be refunded after deduction of any costs. The client may specify the method of refund.</p>
    
    <p>Additional fees that is involved in this process are as follows.</p>
    <p><span class="font-weight-bold pr-2 ">✓</span>LMIA Government Application fee foreach position <b>CAD 1000.00</b></p>
    <p><span class="font-weight-bold pr-2 ">✓</span>Job Advertisement fee for each occupation (2 paid Job Ads)	     <b>CAD 300.00</b></p>
    <p><span class="font-weight-bold pr-2 ">✓</span>Recruitment charges per applicant (if applicable)	<b>CAD 1000.00</b></p>
    <br>NOTE:<u> ${felidData.note || "All complaint forms must be signed."}</u><br><br>
    </div>
    
    <div> 
    <h3 class="font-weight-bold font-size-6 ">6. Methods of Payment: We DO NOT accept cheques.
    </h3>
    <p>For Clients Located <b>INSIDE</b> Canada, we receive the following methods:</p>
    <ul>
    <li> 	In-person Cash Drop-Off — Please contact us to arrange a time to drop off your payment in cash. We will provide you with a receipt.</li>
    <li> 	E-transfer — Please send the payment and the answer to the secret question to the following e-mail address: info@canpathwavs.ca</li>
    <li> 	Credit Card PayPal: Instructions will be shared, additional up to 3% charges will be applicable if the client is willing to pay by this method.</li>
    </ul>
    
    <p>For Clients Located <b>OUTSIDE</b> Canada, we receive the following methods:</p>
    <ul>
    <li> 	Wire Transfer- Bank details will be provided once the contract is being signed. ('Banks usually charge a processing fee for wire transfer, so please add CAD $50 fee on top of your payment EVERY TIME you make a wire transfer.</li>
    <li>
      Credit Card/PayPal: Instructions will be shared, additional up to 5% charges will be applicable if the client is willing to pay by this method.
    </li>
    </ul>
    </div>
    <div>
    <h3 class="font-weight-bold font-size-6 ">7. Interest</h3>
    <ul>
    <li>Payment is due on all of the consultant's accounts when rendered. If any account is not paid within 30 days, interest will be charged on outstanding balance at the rate of 20% per annum from the date of the account, until paid
    </li>
    <li>
    If the account requires recovery/collection action, in order to recover any fees, a surcharge equivalent to the recovery/collection fee incurred will be applied on the Total Cost and is to be paid by the Client
    </li>
    </ul>
    </div>
    <div>
    <h3 class="font-weight-bold font-size-6 ">8. Refund Policy</h3>
    <p>
    The Client acknowledges that the approval of the LMIA application and the time required for processing this application is at the sole discretion of the government and not the RCIC. Furthermore, the Client acknowledges that fees are not refundable in the event of an application refusal.</p>
    <p>
        If, however, the application is denied because of an error or omission on the part of the RCIC or professional staff, the RCIC will refund part, or all professional fees collected. The Client agrees that the fees paid are for services indicated above, and any refund is strictly limited to the amount of fees paid. if for any reason agreement is terminated any un-used part of fees with be refunded after deduction of any costs. An applicant may specify the method of refund.
    </p>
    </div>
    <div>
    <h3 class="font-weight-bold font-size-6 ">9. Dispute Resolution</h3>
    <p>
        Please be advised that Harpreet Kaur is a member in good standing of the Immigration Consultants of Canada Regulatory Council (ICCRC), and as such, is bound by its By-laws, Code of Professional Ethics, and associated Regulations. In the event of a dispute related to the Code of Professional Ethics, the Client and RCIC are to make every effort to resolve the matter between the two parties. In the event a resolution cannot be reached, the Client is to present the complaint in writing to the RCIC and allow the RCIC 30 days to respond to the Client. In the event the dispute is still unresolved, the Client may follow the complaint and discipline procedure outlined by the Council on their website under the heading "File a Complaint". NOTE: All complaint forms must be signed. <br><br>
        ICCRC Contact Information:<br>
    Immigration Consultants of Canada Regulatory Council (ICCRC)<br>
    5500 North Service Rd., Suite 1002 Burlington, ON, L7L 6W6<br>
    Toll-free: 1-877-836-7543<br>
    </p>
    </div>
    
    <div>
    <h3 class="font-weight-bold font-size-6 ">10. Confidentiality </h3>
    <p>
        All information and documentation reviewed by the RCIC, required by Service Canada and CIC and all other governing bodies, and used for the preparation of the application will not be divulged to any third party, other than agents and employees, without prior consent, except as demanded by law. <br>The Client agrees to let the RCIC publish facts about the case as a case study without mentioning names. The RCIC, and all agents and employees of the RCIC, are also bound by the confidentiality requirements of Article 8.1 and 8.5 of the Code of Professional Ethics.</p>
    <p>
        The Client agrees to the use of electronic communication and storage of confidential information. The RCIC will use his/her best efforts to maintain a high degree of security for electronic communication and information storage.
    </p>
    </div>
    <div>
        <h3 class="font-weight-bold font-size-6 ">11. Force Majeure</h3>
        <p>
            The RCIC's failure to perform any term of this Retainer Agreement, as a result of conditions beyond his/her control such as, but not limited to, governmental restrictions or subsequent legislation, war, strikes, or acts of God, shall not be deemed a breach of this Agreement. 
        </p>
        </div>
        <div>
            <h3 class="font-weight-bold font-size-6 ">12. Change Policy</h3>
            <p>
                The Client acknowledges that if the RCIC is asked to act on the Client's behalf on matters other than those outlined above in this Agreement, or because of a material change in the Client's circumstances, or because of material facts not disclosed at the outset of the application, or because of a change in government legislation regarding the processing of immigration-related applications, the Agreement can be modified accordingly upon mutual agreement.
            </p>
            </div>
            <div>
    <h3 class="font-weight-bold font-size-6 ">13. Termination </h3>
    <p>
        This Agreement is considered terminated upon completion of tasks identified under section 2 of this agreement.</p>
    </p>
    <ul>
    <li>  
    This Agreement is considered terminated if material changes occur to the Client's application or eligibility. which make it impossible to proceed with services detailed in section 2 of this Agreement.
    </li>
    <li>
        According to Article 14 of the Code of Professional Ethics, this Agreement may be terminated, upon writing, by the RCIC, provided withdrawal does not cause prejudice to the Client.
    </li>
    <li>In the event of early termination, before substantive work is done by the RCIC, the Client is entitled to pay an administration fee of 15% of the overall Professional Fee indicated on this agreement. This fee covers file opening, initial client assessment, costs of materials, and time spent on the case. Anything beyond this scope is considered substantive work and the fees collected up to that point will not be refunded.</li>
    <li>In the event of a dispute arising from the translated version of this Agreement, the English version of this Agreement takes precedence.</li>
    <li>This Agreement is subject to the laws in effect in the Province of Alberta, Canada.</li>
    </ul>
    </div>
    <div>
    <h3 class="font-weight-bold font-size-6 ">14. Miscellaneous </h3>
    <ul>
        <li>The Client expressly authorizes the RCIC to act on his/her behalf to the extent of the specific functions which the RCIC was retained to perform, as per Section 2 hereof.</li>
        <li><b>The RCIC and the firm are authorized to collect information and communicate with ESDC related to my LMIA applications. In case of Online applications, I authorize RCIC Harpreet Kaur to electronically sign any required document related to the LMIA file and recruitment (if applicable) and submit the application on my behalf</b></li>
        <li>This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof and supersedes all prior agreements, understandings, warranties, representations, negotiations, and discussions, whether oral or written, except as specifically set forth herein.</li>
        <li>The client authorizes the RCIC to use the company’s logo and publicly available company information 
        solely for immigration-related purposes, including LMIA applications and submissions to ESDC or IRCC. 
        This use is limited to required documentation and will not be used for unrelated purposes without prior 
        written consent.
        </li>
        <li>This Agreement shall be binding upon the parties hereto and their respective heirs, administrators, successors, and permitted assigns.</li>
        <li>This Agreement may only be altered or amended when such changes are made in writing and executed by the parties hereto.</li>
        <li>The provisions of this Agreement shall be deemed severable. If any provision of this Agreement shall be held unenforceable by any court of competent jurisdiction, such provision shall be severed from this Agreement, and the remaining provisions shall remain in full force and effect.</li>
        <li>The headings utilized in this Agreement are for convenience only and are not to be construed in any way as additions to or limitations of the covenants and agreements contained in this Agreement.</li>
        <li>Each of the parties hereto shall do and execute or cause to be done or executed all such further and other things, acts, deeds, documents, and assurances as may be necessary or reasonably required to carry out the intent and purpose of this Agreement fully and effectively.</li>
        <li>The Client acknowledges that he/she has had sufficient time to review this Agreement and has been allowed to obtain independent legal advice and translation before the execution and delivery of this Agreement.</li>
        <li>In the event the Client did not seek independent legal advice before signing this Agreement, he/she did so voluntarily without any undue pressure and agrees that the failure to obtain independent legal advice shall not be used as a defense to the enforcement of obligations created by this Agreement.</li>
        <li>Furthermore, the Client acknowledges that he/she has received a copy of this Agreement and agrees to be bound by its terms.</li>
        <li>The Client acknowledges that he/she has requested that the Agreement be written in the English language.</li>
    </ul>
    </div>
    <div>
    <h3 class="font-weight-bold font-size-6 ">15. Validation </h3>
    <p style="font-size: 14px; line-height: 1.5;">
        The Client acknowledges that they have read this Agreement, understand it, have obtained such independent legal 
        advice as they deem appropriate, have sought translation, and agree to be bound by its terms.
    </p>
    
    <p style="font-size: 14px; line-height: 1.5;">
        The parties hereto have signed on the date and place here in after set forth.
    </p>
    
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
        <!-- Left Signature Box (RCIC) -->
        <div style="width: 45%;">
           ${RCICSignatureFunction({ isPdf: false, felidData })}
            <p style="margin-top: 10px; font-weight: bold;">Harpreet Kaur (RCIC)</p>
            <p style="font-size: 12px;">RCIC # R533393</p>
            <p style="font-size: 12px;">CAN Pathways Immigration Consultancy Ltd.</p>
    
            <p style="font-size: 12px; margin-top: 10px;"><strong>Date:</strong>  ${felidData?.date_signature_rcic !==
      "0000-00-00 00:00:00" && felidData?.date_signature_rcic !==
      "0000-00-00" && felidData?.date_signature_rcic ? `<span class="border-bottom border-dark text-underline" style="min-width: 80px;">${CommonRetainerAgreementDate({ _date: felidData?.date_signature_rcic, format: "DD-MM-YYYY" })}</span>` : "__________"}</p>
            <p style="font-size: 12px; margin-top: -10px;"><strong>Signed at:</strong> <u>Calgary, Alberta, Canada</u></p>
        </div>
    
        <!-- Right Signature Box (Client) -->
        <div style="width: 45%;">
            ${ClientSignatureFunction({ page, familyJsonArray, felidData })} 
            <p style="margin-top: 10px; font-weight: bold;"> ${familyJsonArray[0]?.client_first_name ||
      familyJsonArray[0]?.client_last_name
      ? ` <span class=" text-capitalize">${familyJsonArray[0]?.client_first_name
      } ${familyJsonArray[0]?.client_last_name || ""}</span>`
      : emp_user_type === "employee"
        ? ` <span class=" text-capitalize "style="min-width: 300px">${userData?.name}</span>` ||
        ""
        : ""}</p>
   
            <p style="font-size: 12px; margin-top: 10px;"><strong>Date:</strong> ${familyJsonArray[0]?.date_signature_client ? `<span class="border-bottom border-dark" style="min-width: 80px;">${CommonRetainerAgreementDate({ _date: familyJsonArray[0]?.date_signature_client, format: "DD-MM-YYYY" })}</span>` : "______________"}</p>
        </div>
    </div>
    
    <p class="d-none"style="font-size: 12px; font-weight: bold; color: red; text-align: center; margin-top: 30px;">
        (***THIS AGREEMENT HAS 6 PAGES IN TOTAL, ANY MODIFICATIONS TO THIS AGREEMENT WITHOUT 
        AUTHORIZATION BY BOTH PARTIES COULD LEAD TO LEGAL ACTIONS***)
    </p>
    </div>
    
    </div>
    <div class="d-flex justify-content-end gap-4" style="gap: 4rem;">
    <h3 class="font-size-6 text-end">Initials :</h3>
    <div>
        ${RCICSignatureFunction({ isPdf: false, felidData })}
    <h4 class="font-size-6 text-end ">RCIC</h4></div>
    <div class="">
      <div style="width: 100%; height: 50px; display: flex; align-items: center; justify-content: center;">
             ${felidData?.initial ? InitialFunction({ isPdf: false, felidData: felidData }) : ""}
       </div>    <h4 class="font-size-6 text-end">Clients</h4></div>
    </div> 
    
  <div class="d-flex justify-content-center w-100 mt-5">
<p style="color: #800000; text-align: center; font-family: 'Times New Roman', serif;">
  <strong>Office:</strong> 2618 Hopewell Pl NE #310 Calgary, AB
  T1Y 7J7, Canada |
  <strong>Tel.:</strong> 403.888.5308 |
  <br>
  <strong>Email:</strong>
  <a href="mailto:info@canpathways.ca" style="color: blue; text-decoration: underline;">info@canpathways.ca</a>
  |
  <strong>Website:</strong>
  <a href="https://www.canpathways.ca" target="_blank" style="color: black; text-decoration: none;">
    www.canpathways.ca
  </a>
</p>
</div>
        </body>
                    </html> `;

  useEffect(() => {
    // Define handler function to be used for add and remove event listener
    const handlers = [];

    familyJsonArray.forEach((_, index) => {
      const button = document.getElementById(`add-signature-button-${index}`);
      if (button) {
        const handler = (event) => addSign(event, index);
        handlers.push({ button, handler });
        button.addEventListener("click", handler);
      }
    });

    // Clean up event listeners
    return () => {
      handlers.forEach(({ button, handler }) => {
        button.removeEventListener("click", handler);
      });
    };
  }, [familyJsonArray, addSign]);

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
  )
}
