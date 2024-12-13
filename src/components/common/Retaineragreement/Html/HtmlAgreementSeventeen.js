// import moment from "moment";
import moment from "moment";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
const HtmlAgreementSeventeen = ({
    page,
    felidData,
    userData,
    emp_user_type,
    addSign,
}) => {
    const familyJsonArray = felidData?.family_json || []; //? JSON.parse(felidData?.family_json) : [];
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
  <body style="margin: 0 auto; max-width: 1024px;color:"black;">
<div class="header" style="padding: 10px 20px;text-align: justify;">
      <img
        src="https://canpathwaysjobs.com/image/00logo-main-black.png"
        alt="Canpathways logo"
        style="max-width: 200px"
      />
    </div>
<div class="main_div" style="padding: 10px">
      <h3 style="text-align: center">INITIAL CONSULTATION AGREEMENT</h3>
    <p style="text-align: center">BETWEEN
    <br> CAN Pathways Immigration Consultancy Ltd.<br>and Client: <u>${felidData &&
            (familyJsonArray[0]?.client_first_name ||
                familyJsonArray[0]?.client_last_name)
            ? familyJsonArray[0]?.client_first_name +
            " " +
            (familyJsonArray[0]?.client_last_name || "")
            : emp_user_type === "employee"
                ? userData?.name || "" || ""
                : "" || ""
        }</u></p>


<div class="section">
    <p>
        This Initial Consultation AGREEMENT ("the Agreement") is made on the date mentioned below.<br>
        "The Effective Date": ${felidData?.agreement_date &&
            felidData?.agreement_date !== "0000-00-00 00:00:00" &&
            felidData?.agreement_date !== "0000-00-00"
            ? ` <span class="para_gap">${moment(
                new Date(felidData?.agreement_date)
            ).format("DD MMMM YYYY")}`
            : "____________"
        }
    </p>
    <div>
    BY AND BETWEEN<br>
    <p><strong>Harpreet Kaur</strong> (the "RCIC")Located at: <strong>CAN Pathways Immigration Consultancy Ltd.</strong>Address: <strong>Unit #310, 2618 Hopewell Pl. NE, Calgary, AB, T1Y 717, Canada </strong> Here in after referred to as: <strong>"Legal Representative/RCIC"</strong><br>AND<br>The <strong>"Candidate"</strong> as his/her details provided as of this present agreement, collectively called the <strong>"Client."</strong><br> <span class="px-8"><strong>Name</strong>: <span><u>${felidData &&
            (familyJsonArray[0]?.client_first_name ||
                familyJsonArray[0]?.client_last_name)
            ? familyJsonArray[0]?.client_first_name +
            " " +
            (familyJsonArray[0]?.client_last_name || "")
            : emp_user_type === "employee"
                ? userData?.name || "" || ""
                : "" || ""
        }</u></span><br> <strong>Address</strong>: <span><u>${felidData && felidData?.client_address
            ? felidData?.client_address
            : emp_user_type === "employer"
                ? userData?.address || ""
                : (userData?.current_location || "") +
                " " +
                (userData?.currently_located_country || "")
        }  </u></span><br> <strong>Phone Number</strong>: <span><u>${felidData && felidData?.client_contact
            ? felidData?.client_contact
            : userData?.contact_no || ""
        }</u></span><br><strong>Email Address</strong>: <span><u>${felidData && felidData?.client_email
            ? felidData?.client_email || ""
            : userData?.email || ""
        }</u></span>
    <span></p>
    <div>
    <h6><u>AGREEMENT</u></h6>
    <p>
      Harpreet Kaur is a member in good standing of the 
      <strong>Immigration Consultants of Canada Regulatory Council</strong>.<br>
      (ICCRC).As such,its By-laws.Code of Professional Ethics, and Regulations bind her.
    </p>
    <p>
    Additionally , the provisions of this agreement are subject to ICCRC regulations, certain aspects of which are predetermined and cannot be modified.
    </p>
</div>
</div>

<div class="section">
    <h6><u>SCOPE OF SERVICE</u></h6>
    <ol>
        <li>
            <p>
                Client is seeking consultation and professional advice from the RCIC with respect to one or more of the following (please tick the correct service):
            </p>
            <ul>
                <li>Visitor visa /Super-visa application</li>
                <li>Study permit application</li>
                <li>Work permit application/LMIA Related Inquiries (please specify)_____________</li>
                <li>Permanent residence/Citizenship application (please specify)_____________</li>
                <li>Other (please specify): <u>${felidData?.other_professional_advice_initial_consultation || "        "}</u><br>
                Please provide additional relevant information below: <br>
                <u> ${felidData?.additional_relevant_information || "                                                                                         "}</u></li>
            </ul>
        </li>
        <li>
            <p>
                The professional services that the RCIC (Regulated Canadian Immigration Consultant) will offer to the Client according to the terms specified are mentioned below:
            </p>
            <ul>
                <li>Gather additional details regarding the Client's objectives.</li>
                <li>Acquire information about the Client's history, qualifications, as well as personal and financial situation.</li>
                <li>Offer guidance concerning the prevailing state of Canadian immigration regulations and policies as they pertain to the Client's inquiry.</li>
                <li>Examine the information provided by the Client, evaluating its alignment with existing Canadian laws and policies.</li>
                <li>Identify the most suitable immigration approach for the Client, if applicable, and provide recommendations to the Client.</li>
            </ul>
        </li>
        <li>
        <h6><u>LIMITS OF ENGAGEMENT</u></h6>
        <ul>
            <li><p>
                This Agreement comprises a single consultation with 2-3 follow-up inquiries pertaining to the initial consultation focusing on the matters mentioned earlier. The RCIC will not offer additional information or guidance unless both the Client and the RCIC explicitly agree to continue discussing these or other topics. In other cases, a separate written agreement will be put forward to cover those matters.
            </p>
            </li>
            <li><p>
                This agreement does not impose any obligation on the RCIC to represent the Client in applications or legal proceedings.
            </p>
            </li>
            <li><p>
                Should the Client require further guidance or representation for another matter beyond the scope of the topic covered in the initial consultation, a distinct retainer agreement with the RCIC must be signed.
            </p>
            </li>
            <li><p>
                The scope of work under this agreement will be confined to a maximum of 30 minutes.
            </p>
            </li>
            <li><p>
                We do not provide in-depth career advice or detailed job search assistance during this session. This level of service is exclusively available to appointed clients.
            </p>
            </li>
            </ul>
        </li>
<li >
    <h6><u>CONSULTATION APPROACH</u></h6>
    <ul>
        <li>
            <p>
                The RCIC will offer consultation services to the Client through in-person meetings, phone conversations, or Zoom sessions (video or voice calls).
            </p>
        </li>
        <li>
            <p>
                The duration of the consultation will extend as required for the RCIC to fulfill the services outlined in this agreement. However, the consultation shall not exceed 30 minutes in duration.
            </p>
        </li>
    </ul>
</li>
<li>
    <h6><u>PAYMENT OF FEE</u></h6>
    <ul>
    <li>
    <p>
        For the consultation service, the Client is responsible for an upfront consultation fee of CAD$200.
    </p>
    </li>
    <li>
    <p>
        If the Client promptly engages the services of the RCIC by executing a Retainer Agreement and submitting an initial deposit fee, the cost of the Initial Consultation will be applied as a credit toward the overall fee specified in the Retainer Agreement. As a result, the Initial Consultation charge will be waived.
    </p>
    </li>
    </ul>
</li>
<li>
    <h6><u>REFuND POLICY</u></h6>
    <ul>
        <li>The Client retains the right to receive a refund for any fees that have not been utilized in accordance with this agreement.</li>
        <li>The Client holds the option to reschedule their appointment or opt for a consultation on an alternate date, following payment of the fee.</li>
        <li>Fees will be considered earned by the RCIC immediately upon the initiation of professional advice delivery. Fees that have been earned pursuant to this agreement are not eligible for a refund.</li>
    </ul>
</li>
<li>
    <h6><u>OTHER CONDITIONS</u></h6>
    <p><span class="bold"><u>CLIENT RESPONSIBILITIES</u></span>:
        The Client is obligated to provide the RCIC with accurate factual information and documentation necessary for the consultation process. Honesty and precision are essential. The Client must disclose all pertinent information, even if it is negative or adverse. Any failure to fully disclose relevant details may impact the advice provided by the RCIC, potentially voiding this Agreement or significantly influencing the Client's application outcome or status retention.
    </p>
    <p><span class="bold"><u>ADVICE APPLICABLE TO PRESENT DATE</u></span>:The consultation given by the RCIC to the Client is founded on the Canadian immigration law and policy as of the date of appointment, where applicable. The RCIC bears no responsibility for any alterations in government legislation or policy that might affect subsequent application processing by the Client.
    </p>
    <p><span class="bold"><u>NO GUARANTEE OF OUTCOME</u></span>:The RCIC does not guarantee the ability to aid the Client in achieving their business, education, employment, or immigration objectives. The RCIC shall render consulting services to the Client at a standard appropriate for an ICCRC member.
    </p>
    <p><span class="bold"><u>CONFIDENTIALITY</u></span>:The RCIC is obliged to maintain the Client's confidence and information. This professional commitment exists to foster candid and comprehensive communication between the Client and the RCIC. All information and documentation submitted by the Client and reviewed by the RCIC will remain confidential and will not be shared with any third party, apart from RCIC's agents and employees, unless explicit consent is given or as required by law.
    </p>
    <p>
    <span class="bold">DISPUTE RESOLUTION</u></span>
        In the event of a dispute, both the Client and RCIC must strive to resolve the matter amicably. If a resolution cannot be achieved, the Client must submit the complaint in writing to the RCIC and allow a grace period of 5 business days for the RCIC's response. If the dispute persists, the Client can follow the complaint and discipline procedure delineated by ICCRC on their website: <a href="http://www.iccrc-crcic.ca/public/complaintsDiscipline.cfm">ICCRC Complaints and Discipline</a>.
    </p>
    <p>
        ICCRC's Contact Information is as follows:<br>
        Immigration Consultants of Canada Regulatory Council (ICCRC)<br>
        5500 North Service Rd., Suite 1002, Burlington, ON, L7L 6W6<br>
        Toll free: 1-877-836-7543
    </p>
</li>

<li>
    <h6><u>APPLICABLE LAW</u></h6>
    <p>
        The laws in effect in the Province of Alberta, Canada shall govern the terms and conditions of this agreement.
    </p>
</li>
</ol>
</div>      
<div>
    <p class="text-center"><u>SIGNED BY THE CLIENT AND THE RCIC IN ACCEPTANCE OF AGREEMENT</u></p>
    <div style="display: flex; flex-wrap: wrap;">

  <!-- Client Signature -->
  <div style="width: 50%;">
    <div class="d-flex flex-column">

      <p style="margin: 0;"> ${familyJsonArray[0]?.client_signature
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
                    : "" || ""
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
                    : "" || ""
            } ${moment(familyJsonArray[0]?.date_signature_client).format("DD-MM-YYYY")}</span>
                  </small>
                      </div>`
            : page === "admin"
                ? "___________________________"
                : ` <button class="btn btn-outline-secondary border-0  " 
                  style="font-family:cursive;" 
                  id="add-signature-button-0">
            Add Signature
          </button>`
        }</p>
    </div>
    <p style="margin: 0 0 30px 0;">Signature of Client</p>
  </div>
   <div style="width: 50%;">
    <div class="d-flex flex-column">
 <div class="d-flex flex-column">
 ${felidData?.rcic_signature ? `<img src="${felidData?.rcic_signature}" alt="RCIC Signature" style="max-width: 200px;">` : ""}
   <p style="margin: 0;">______________________________</p>
      <small class="row">
        <span class="col text-capitalize">Harpreet Kaur ${!familyJsonArray[0]?.date_signature_rcic ||
            familyJsonArray[0]?.date_signature_rcic === "0000-00-00 00:00:00" ||
            familyJsonArray[0]?.date_signature_rcic === "0000-00-00"
            ? ""
            : moment(familyJsonArray[0]?.date_signature_rcic).format("DD-MM-YYYY")
        }</span>
      </small>
                      </div>
      
    </div>
    <p style="margin: 0 0 30px 0;">Signature of RCIC</p>
  </div>
  <div style="width: 50%;">
    <p  style="max-width: 200px;">${!familyJsonArray[0]?.date_signature_client ||
            familyJsonArray[0]?.date_signature_client === "0000-00-00 00:00:00" ||
            familyJsonArray[0]?.date_signature_client === "0000-00-00"
            ? "_____________________"
            : `<span  class="para_gap" style="max-width: 200px;">${moment(familyJsonArray[0]?.date_signature_client).format("DD-MM-YYYY")}</span>`
        }</p>
    <p style="margin: 0 0 30px 0;">Date</p>
  </div>
  <!-- RCIC Signature -->
 
  <div style="width: 50%;">
    <p style="margin: 0;"> ${felidData?.date_signature_rcic === "0000-00-00 00:00:00" ||
            felidData?.date_signature_rcic === "0000-00-00" ||
            !felidData?.date_signature_rcic
            ? "_____________________"
            : `<span  class="para_gap" style="max-width: 200px;">${moment(felidData?.date_signature_rcic).format("DD-MM-YYYY")}</span>`
        }</p>
    <p style="margin: 0 0 30px 0;">Date</p>
  </div>
</div>

</div>
<div  style="
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: flex-end;
        ">
       <p class="para_gap text-uppercase"
    } style="margin: 0">${felidData?.initial
            ? felidData?.initial?.split(' ')               // Split the string by spaces
                ?.filter(word => word)      // Filter out empty strings (caused by multiple spaces)
                ?.map(word => word[0])      // Map each word to its first letter
                ?.join(' ')
            : page === "admin"
                ? ""
                : ``
        }</p>
          <p style="margin: 0 0 30px 0">Initial</p>
        </div>
         <div class="header" style="padding: 10px 20px; text-align: center; color: #ed1c24;">
            Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada | Tel.: 403.888.5308 <br>Email: info@canpathways.ca | Website: www.canpathways.ca
        </div>
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
export default HtmlAgreementSeventeen;
