import moment from "moment"
import { useEffect } from "react";
// import { Link } from "react-router-dom";
const HtmlAgreementOne = ({ page, felidData, userData, emp_user_type, addSign }) => {
  // Function to replace tags
  // const replaceTags = (html) => {
  //   // Replace opening and closing div and ul tags with View tags
  //   html = html.replaceAll("<img", "<Image")
  //   html = html.replaceAll('<div', '<View').replaceAll('</div>', '</View>');
  //   html = html.replaceAll('<span', '<View').replaceAll('</ul>', '</View>');
  //   html = html.replaceAll('<p', '<Text').replaceAll('</p>', '</Text>');
  //   html = html.replaceAll('<Link', '<Text').replaceAll('</Link>', '</Text>');
  //   html = html.replaceAll('<li', '<Text').replaceAll('</li>', '</Text>');

  //   return html;
  // };
  // JSX structure with potential tag replacements
  const familyJsonArray = felidData?.family_json || [] //? JSON.parse(felidData.family_json) : [];
  const jsxContent = (
    `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Retainer Agreement - Client 1 column - Copy (3) (1).docx</title>
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
      <h1 style="text-align: center">RETAINER AGREEMENT</h1>
      <div style="display: flex; justify-content: space-between">
        <b>RCIC Membership Number<span class="para_gap"> : R533393 </span></b>
        <b>Client File Number: <span class="${felidData?.client_file_no ? "para_gap" : ""}">${felidData?.client_file_no || "_________"}</span></b>
      </div>
     <p>
  This Retainer Agreement is made this
  <span class="${felidData?.client_file_no ? "para_gap" : ""}">
    ${felidData?.client_file_no || "_________"}
  </span>
  day of
 
    ${felidData.agreement_date && felidData.agreement_date !== "0000-00-00 00:00:00"
      ? `<span class="para_gap">${moment(new Date(felidData.agreement_date)).format("Do")}</span>`
      : ""}
    ${felidData.agreement_date && felidData.agreement_date !== "0000-00-00 00:00:00"
      ? ` <span class="para_gap">${moment(new Date(felidData.agreement_date)).format("MMMM")}</span>`
      : ""}
 
    ${felidData.agreement_date && felidData.agreement_date !== "0000-00-00 00:00:00"
      ? ` <span class="para_gap">${moment(new Date(felidData.agreement_date)).format("YYYY")}`
      : "____________"}
  </span>
  between Regulated Canadian Immigration Consultant (RCIC) Harpreet Kaur (the
  “RCIC”), RCIC Membership Number
  <span>R533393</span>, phone number
  <span>4038885308</span>, email
  <a href="mailto:info@canpathways.ca" class="contact_email" target="_blank">
    info@canpathways.ca
  </a>, located at 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7,
  <span>Canada</span> and Client ${familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name
      ? ` <span class="para_gap text-capitalize">${familyJsonArray[0]?.client_first_name} ${familyJsonArray[0]?.client_last_name || ""}</span>`
      : emp_user_type === "employee"
        ? ` <span class="para_gap text-capitalize">${userData?.name}</span>` || ""
        : "_____________________"}

  (the “Client”),
  located at
 
    ${felidData?.client_address
      ? ` <span class="para_gap">${felidData.client_address}</span>`
      : emp_user_type === "employer"
        ? userData?.address || "________________"
        : `<span class="para_gap">${userData?.current_location || "________"} ${userData?.currently_located_country || "____________"}</span>`}
  </span>
  , email
  <span class="${felidData?.client_email || userData?.email ? "para_gap" : ""}">
    ${felidData?.client_email || userData?.email || "_______________"}
  </span>
  , contact number
  <span class="${felidData?.client_contact || userData?.contact_no ? "para_gap" : ""}">
    ${felidData?.client_contact || userData?.contact_no || "____________________"}
  </span>.
</p>
 <p>
      ${familyJsonArray && familyJsonArray.slice(1).length !== 0
      ? `<div><p>Details of Family member and dependents to added in this application</p><div>` : ''}
      <div class="row w-100">
      ${((familyJsonArray && familyJsonArray.slice(1)) || []).map((item, index) => (
        `<span class="col-10 row" key=${index}> 
        <span class="col-6">Name ${index + 1}: 
        <span class="para_gap text-capitalize">${item.client_first_name + " " + item.client_last_name} </span>
        </span>
        <span class="col-6">
         Date of birth : ${item.client_date_of_birth ? ` <span class="para_gap"> ${moment(item.client_date_of_birth).format("DD-MM-YYYY")}  </span>` : "___________"} </span>
         </span>`
      ))}
      </div>
      </p>
      </div>
      </div>
      <p>
        WHEREAS the RCIC and the Client wish to enter into a written agreement
        which contains the agreed upon terms and conditions upon which the RCIC
        will provide his/her services to the Client.
      </p>
      <p>
        AND WHEREAS the RCIC is a member College of Immigration and Citizenship
        Consultants (the“Council”), the regulator in Canada for immigration
        consultants;
      </p>
      <p>
        IN CONSIDERATION of the mutual covenants contained in this Agreement,
        the parties agree as follows:
      </p>
      <ol id="l1">
        <br />
        <li data-list-text="1." style="font-size: 18px">
          <h5 style="font-weight: 600">Definitions</h5>
          <p>
            The terms set out in this Retainer Agreement, have the meaning given
            to such terms in the Retainer Agreement Regulation and By-law of the
            Council, as amended from time to time.
          </p>
        </li>
        <br />
        <li data-list-text="2." style="font-size: 18px">
          <h5 style="font-weight: 600">RCIC Responsibilities and Commitments</h5>
          <p>
            The Client asked the RCIC, and the RCIC has agreed, to act for the
            Client in the matter of
          
          ${felidData?.matter ? `<span class="para_gap">${felidData?.matter} </span>` : "_______________________________________________________________________________"}.
          </p> 
          <p>In consideration of the fees paid and the
            matter stated above, the RCIC agrees to do the following:
          </p>
          <p>
          <ol id="l2">
            <li data-list-text="a)">
                [Summary of preliminary advice given to the client
                 ${felidData?.summary ? `<span class="para_gap">${felidData?.summary || ""}</span>` : "_____________________________"}]
            </li>
            <li data-list-text="b)">
                [Consultation and providing document checklists and intake
                sheet, file opening]
            </li>
            <li data-list-text="c)">
              [Data gathering, filling out forms]
            </li>
            <li data-list-text="d)">
              [Information verification, completeness check]
            </li>
            <li data-list-text="e)">
              [Application submission]
            </li>
            <li data-list-text="f)">
              [File maintenance and correspondence with client and IRCC]
            </li>
          </ol>
          </p>
          <p>
            The RCIC shall provide the Client with a finalized, signed copy of
            this Retainer Agreement. RCIC is not responsible for any
            documentation or information provided by client to IRCC in any of
            the previous applications therefore shall not be held
            responsible/liable for it.RCIC will be providing services in English
            Language.
          </p>
          <p>
            RCIC will return any original document that the client provides as
            soon as the purpose for which the documents were taken is
            complete.(RCICs are required to provide a copy of the Code to the
            client.) 3 Code s.24(3)(c) 4 Code s.24(3)(d) 5 Code s.24(3)(e) 6
            Code s.24(3)(u)
          </p>
          <p>
            The RCIC is obligated to provide professional, ethical, and
            competent services as per the Code of Professional Conduct of the
            College. A copy of the Code has been provided to the client(s).
            https://laws.justice.gc.ca/eng/regulations/SOR-2022-128/index.html
          </p>
        </li>
        <br />
        <li data-list-text="3." style="font-size: 18px">
          <h5 style="font-weight: 600">
            Client Responsibilities and Commitments
          </h5>
         <ol id="l3" style="list-style-type:none; padding-left: 0;">
  <li data-list-text="3.1">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.1</span>
      <span style="margin-left:40px;">The Client must provide, upon request from the RCIC:</span>
      <ul id="l4" style="list-style-type:disc; padding-left: 60px;">
        <li>All necessary documentation</li>
        <li>All documentation in English or French, or with an English or French translation</li>
      </ul>
    </p>
  </li>
  <li data-list-text="3.2">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.2</span>
      <span style="margin-left:40px;">The Client understands that he/she must be accurate and honest in the information he/she provides and that any misrepresentations or omissions may void this Agreement, or seriously affect the outcome of the application or the retention of any immigration status he/she may obtain. The RCIC’s obligations under the Retainer Agreement are null and void if the Client knowingly provides any inaccurate, misleading, or false material information. The Client’s financial obligations remain.</span>
    </p>
  </li>
  <li data-list-text="3.3">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.3</span>
      <span style="margin-left:40px;">Client is informed that RCIC might obtain assistance from other professionals or services.</span>
    </p>
  </li>
  <li data-list-text="3.4">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.4</span>
      <span style="margin-left:40px;">Client understands that RCIC should not be held responsible for visa outcome as RCIC cannot guarantee the decision of IRCC. If IRCC policy or rules change before/during or after the application submission and the client is deemed ineligible, RCIC should not be held responsible for that.</span>
    </p>
  </li>
  <li data-list-text="3.5">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.5</span>
      <span style="margin-left:40px;">In the event Immigration, Refugees and Citizenship Canada (IRCC) or Employment and Social Development Canada (ESDC) or Provincial Government Administrator or processing Visa Office should contact the Client directly, the Client is instructed to notify the RCIC immediately.</span>
    </p>
  </li>
  <li data-list-text="3.6">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.6</span>
      <span style="margin-left:40px;">The Client is to immediately advise the RCIC of any change in the marital, family, or civil status or change of physical address or contact information for any person included in the application.</span>
    </p>
  </li>
  <li data-list-text="3.7">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.7</span>
      <span style="margin-left:40px;">In the event of a Joint Retainer Agreement, the Clients agree that the RCIC must share information among all clients, as required. Furthermore, if a conflict develops that cannot be resolved, the RCIC cannot continue to act for both or all of the Clients and may have to withdraw completely from representation.</span>
    </p>
  </li>
  <li data-list-text="3.8">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.8</span>
      <span style="margin-left:40px;">All necessary information and documentation in English or French, or with an English or French translation, if in any other language, with a certified English translation, according to the timeline recommended by RCIC. In the event documents are not provided or the client fails to contact the RCIC in spite of the request made by RCIC on the email provided by the client in the retainer agreement, before the due date mentioned (which is within 30 days from the retainer signed, or earlier also depending upon the requirements of the case) the RCIC can close the file after notifying the client in advance about the non-responsiveness. An administrative fee of CAD$ 300.00 plus taxes should be paid by the client to close the file. All pending fees are due and are to be paid by the client and if there is any unused money with RCIC, it should be refunded to the client if applicable.</span>
    </p>
  </li>
  <li data-list-text="3.9">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.9</span>
      <span style="margin-left:40px;">The Client has been explained by RCIC and is aware of the high chances of application refusal due to a weak case and other reasons as explained. The Client still agrees to go ahead with the application.</span>
    </p>
  </li>
  <li data-list-text="3.10">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.10</span>
      <span style="margin-left:40px;">The Client also allows the RCIC to use digital signatures for the purpose of this application on his/her behalf.</span>
    </p>
  </li>
  <li data-list-text="3.11">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.11</span>
      <span style="margin-left:40px;">Mode of communication should be the email provided by the client in this retainer only, for all the correspondence between RCIC and the client, and RCIC should be given a minimum of 7 working days to revert to any queries from the client. RCIC is not responsible for communication/consequences if the client does not receive an email sent by RCIC and did not communicate with RCIC in the given timeline or within 15 days of the sent email.</span>
    </p>
  </li>
  <li data-list-text="3.12">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">3.12</span>
      <span style="margin-left:40px;">Once the client provides all the documents required as per the checklist, RCIC should be given a minimum of 3 weeks from the time all documents are reviewed by RCIC and deemed complete, to submit the file to IRCC.</span>
    </p>
  </li>
</ol>

        </li>
        <br />
        <li data-list-text="4." style="font-size: 18px">
          <h5 style="font-weight: 600">Payment Schedule</h5>

          <p style="font-weight: 400">
           <b> Billing method: The Client will be billed by [flat fee with payment by milestones].</b><br>
           <b> Payment Terms and Conditions</b>
          </p>

          <table style="border-collapse: collapse; width: 100%">
            <thead>
              <tr>
                <th
                  scope="col"
                  style="text-align: center; border: 1px solid black;color:#0c5fa6 "
                >
                 <b> Fees details</b>
                </th>
                <th
                  scope="col"
                  style="text-align: center; border: 1px solid black;color:#0c5fa6"
                >
                  <b>Amount (CAD)</b>
                </th>
              </tr>
            </thead>

            <tbody>
            <tr>
                <td style="text-align: center; border: 1px solid black">
                  Professional Fees
                </td>
                <td style="border: 1px solid black">${felidData?.professional_fees || ""}</td>
              </tr>
              <tr>
                <td
                  rowspan="3"
                  style="text-align: center; border: 1px solid black"
                >
                  Discount:<br> Courier charges<br> Government fees
                </td>
                <td style="border: 1px solid black">${felidData?.courier_charges || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid black">${felidData?.government_fees || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid black;height:42px"></td>
              </tr>
              <tr>
                <td style="text-align: center; border: 1px solid black">
                  Administrative fee [as required]
                </td>
                <td style="border: 1px solid black">${felidData?.administrative_fee || ""}</td>
              </tr>
              <tr>
                <td style="text-align: center; border: 1px solid black">
                  Applicable Taxes: ${felidData?.gst || "0"}%
                </td>
                <td style="border: 1px solid black">${felidData?.applicable_taxes || ""}</td>
              </tr>
              <tr>
                <td style="text-align: center; border: 1px solid black">
                  Balance (Paid at time of filing):
                </td>
                <td style="border: 1px solid black">${felidData?.balance || ""}</td>
              </tr>
              <tr>
                <td style="text-align: center; border: 1px solid black;color:red">
                  <b>Total Cost</b>
                </td>
                <td style="border: 1px solid black">${felidData?.total_cost || ""}</td>
              </tr>
            </tbody>
          </table>

          <p class="mt-8">
            Invoice Frequency: The RCIC must provide an Invoice to the Client
          </p>
          <p>
            Note: The courier charges and Government fees based on current rates
            and may change anytime on or before submission.
          </p>

          <table style="border-collapse: collapse" cellspacing="0">
            <tr>
              <td class="text-center" style="color:#0c5fa6">
              RCIC Service Milestone
              </td>
              <td class="text-center" style="color:#0c5fa6">
              Estimated date of Completion
              </td>
              <td class="text-center" style="color:#0c5fa6">
              Professional Fees (Non-Refundable)
              </td>
              <td class="text-center" style="color:#0c5fa6">
              Applicable Retainer Fee for
                this stage (Non- Refundable)
              </td>
              <td class="text-center" style="color:#0c5fa6">
                Applicable Government Processing Fee
              </td>
            </tr>
            <tr>
              <td>
                <p>
                <small>
                  Step 1 Completes upon signing the retainer and sharing the
                  checklists and intake sheet with client. Data gathering and
                  Creating Express Entry Profile
                </small>
                </p>
              </td>
              <td>
                <p><br /></p>
              </td>
              <td>
                <p><small>Non-refundable</small></p>
              </td>
              <td>${felidData?.applicable_retainer_fee_stape_1 || ""}</td>
              <td>${felidData?.applicable_government_processing_fee_stape_1 || ""}</td>
            </tr>
            <tr>
              <td>
                <p>
                <small>
                  Step 2 Application preparation, filling out the forms,
                  information verification and completeness check, preparing the
                  application package
                  </small>
                </p>
                <p><small>Payment is due before final submission of application.</small></p>
                <p><small>Provide proof of submission to the client</small></p>
              </td>
              <td></td>
              <td>
                <p><small>Non-refundable<small></p>
                <p>
                <small>
                  All payments made are non- refundable and total service
                  charges to be collected regardless, whether the client/ s
                  withdraw from the file at this stage. The government fee and
                  courier charges must be paid apart from professional fees
                  payment scheduled at this stage
                  </small>
                </p>
              </td>
              <td>${felidData?.applicable_retainer_fee_stape_2 || ""}</td>
              <td>${felidData?.applicable_government_processing_fee_stape_2 || ""}</td>
            </tr>
          </table>
          <p class="mt-8">
           <b> Total Amount: (Non-Refundable) (Paid at signing of contract and
            sharing of checklist): ${felidData?.total_amount_signing_of_contract || ""} $<br> 
            Balance (Non-Refundable) (Paid at time of
            filing): ${felidData?.balance_paid_at_time_of_filing || ""} $
           </b>       
            </p>
          <p>Note:</p>
          <ul id="l5"  style="list-style-type:disc;">
            <li data-list-text="•">
              <p>
                There will be an additional fee, or a new fee arrangement will
                be agreed upon for government’s any further request for
                additional information/documentation of up to $1000.00 such as
                updating the forms, asking for immigration status update,
                documents related to marital status change, procedural fairness
                response or preparing and submitting statutory declarations,
                affidavits etc.
              </p>
            </li>
            <li data-list-text="•">
              <p>
                If a fee has been quoted in this Retainer, then, while the RCIC
                expects that his fee will not exceed the
              </p>
              <p>
                amount quoted, the RCIC reserves the right to charge more in
                appropriate cases, such as immediate and pressing circumstances,
                the requirement for work outside normal business hours, or other
                special demands made by the client.
              </p>
            </li>
            <li data-list-text="•">
              <p>
                The RCIC reserves the right to alter the amount of the final
                account to reflect the remaining balance of the fees owed plus
                any Disbursements and fees for additional services to which the
                parties previously agreed.
              </p>
            </li>
            <li data-list-text="•">
              <p>
                For application delayed or abandoned beyond 90 days, client is
                subjected to $350 fee plus applicable taxes to resume the file.
              </p>
            </li>
            <li data-list-text="•">
              <p>
                Full services charges to be paid by client if client decided to
                withdraw/discharge representation at second/last stage of
                application.
              </p>
            </li>
            <li data-list-text="•">
              <p>
                Fees charges by Canadian government for application processing
                has to be paid by client.
              </p>
            </li>
          </ul>
        </li>
        <br />
        <li data-list-text="5." style="font-size: 18px">
          <h5 style="font-weight:600">
            Methods of Payment: We DO NOT accept cheques.
          </h5>
          <p>
            <b>
              <u>
                For Clients Located INSIDE Canada, we receive the following payment
                options:
              </u>
            </b>
          </p>

          <ul id="l6">
            <li data-list-text="o">
               <b> In-person Cash Drop-Off</b>– Please contact us to arrange a time to drop off your
                  payment in cash. We will provide you with a receipt.
            </li>
            <li data-list-text="o">
               <b> E-transfer</b>– Please send the payment and the answer to the secret
                  question to the following e-mail address: <a
                  href="mailto:accounts@canpathways.com"
                  class="s15"
                  target="_blank"
                  >accounts@canpathways.com</a                >
            </li>
            <li data-list-text="o">
               <b> Credit Card/PayPal: </b>Instructions will be shared, additional up to<b> 3% </b>charges will be applicable if the client is willing to pay by
                  this method.
                </li>
                </ul>
              <p>
               <b>
                 <u>
                  For Clients Located OUTSIDE Canada, we receive the following
                   payment options:
                  </u>
               </b>
              </p>
              <ul id="l7">
                <li data-list-text="o">
                    <b>Wire Transfer</b>- Bank details will be provided once the contract is
                      being signed. (*Banks usually charge a processing fee for
                      wire transfer, so please add <b> CAD $50 </b>fee on top of your payment EVERY TIME you make a wire
                      transfer;
                </li>
                <li data-list-text="o">
                    <b>Paypal:</b>Instructions will be shared, additional up to <b>5 % </b>charges will be applicable if the client is willing to
                      pay by this method.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <br />
        <li data-list-text="6." style="font-size: 18px">
          <h5 style="font-weight: 600">Interest</h5>
          <p>
            Payment is due on all of the consultant’s accounts when rendered. If
            any account is not paid within 30 days, interest will be charged on
            outstanding balance at the rate of 20% per annum from the date of
            the account, until paid.
            <span style="color: #010101"
              >If the account requires recovery/collection action, in order to
              recover any fees, a surcharge equivalent to the
              recovery/collection fee incurred will be applied on the Total Cost
              and is to be paid by the Client.</span
            >
          </p>
        </li>
        <br />
        <li data-list-text="7." style="font-size: 18px">
          <h5 style="font-weight: 600">Refund Policy</h5>
          <p>
            The Client acknowledges that the granting of a visa or status and
            the time required for processing this application is at the sole
            discretion of the government of Canada (or Government Authorities)
            and not the RCIC. Furthermore, the Client acknowledges that fees are
            not refundable in the event of an application refusal.
          </p>
          <p>
            If, however, the RCIC or professional staff do not complete the
            tasks identified under section 2 of this Agreement, the RCIC will
            refund part or all of the professional fees collected. The Client
            agrees that the professional fees paid are for services indicated
            above, and any refund is strictly limited to the amount of
            professional fees paid.
          </p>
          <p>RCIC will not refund any fee paid by the client if</p>
          <ul id="l8"  style="list-style-type:disc">
            <li data-list-text="">
              <p>
                Cancellation by the applicant of the immigration application for
                any reason whatsoever after the signature on the contract
              </p>
            </li>
            <li data-list-text="">
              <p>
                Later modification in government regulations that is out of
                control
              </p>
            </li>
            <li data-list-text="">
              <p>Hiding information or submission of false documents</p>
            </li>
            <li data-list-text="">
              <p>Disregarding RCIC’s instructions</p>
            </li>
            <li data-list-text="">
              <p>Not providing required documents within given time frame</p>
            </li>
          </ul>

          <p>
            If application is refused because of an error or omission on the
            part of the RCIC or the professional staff, Unused and/or unearned
            fees will be refunded in accordance with the
            <u>Client File Management Regulation</u>, the
            <u>Client Account Regulation</u> and the
            <u>Retainer Agreement Regulation</u> and in the following manner:
          <br>
          <u>Cheque</u> ___________________________________________________________________________________<br>[describe the manner of refund, including method and time frame]<br>
            There shall be no refund due if the application is not submitted,
            refused, returned, or cannot proceed due to reasons relating to
            government policy, a change in the selection criteria,
            inadmissibility, if the client fails to adequately support all
            qualifications claimed, or if the client voluntarily withdraws the
            application.
          </p>
        </li>
        <br />
        <li data-list-text="8." style="font-size: 18px">
          <h5 style="font-weight: 600">Invoicing</h5>
          <p>The RCIC will provide invoices, which include:</p>
          <ul id="l9" style="list-style-type:disc">
            <li data-list-text="">
              <p>the name and address of the Client,</p>
            </li>
            <li data-list-text="">
              <p>a list of services rendered,</p>
            </li>
            <li data-list-text="">
              <p>the date(s) the services were rendered, and</p>
            </li>
            <li data-list-text="">
              <p>
                the total fees and applicable taxes payable to the Member for
                the services rendered.
              </p>
            </li>
          </ul>
          <p>
            Invoices must be provided to the Client in accordance with the
            payment terms and conditions, found in section 5 of this Retainer
            Agreement. Additionally, upon the RCIC withdrawing or being
            discharged from representation, the RCIC must provide the Client
            with Statement of Account detailing all services that have been
            rendered or accounting for the time that has been spent on the
            Client’s file.
          </p>
          <p>
            <br />
          </p>
        </li>
        <li data-list-text="9." style="font-size: 18px">
          <h5 style="font-weight: 600">
            Dispute Resolution Related to the Code of Professional Ethics
          </h5>
          <p>
            In the event of a dispute related to the Professional Services
            provided by the RCIC, the Client and RCIC are to make every
            reasonable effort to resolve the matter between the two parties. In
            the event a resolution cannot be reached, the Client is to present
            the complaint in writing to the RCIC and allow the RCIC<br>
            <u>30</u> days to respond to the Client. In the event the dispute is
            still unresolved, the Client may follow the complaint and discipline
            procedure outlined by the Council on their
            <span class="s17">website:</span
            ><a href="http://www.iccrc-crcic.ca/" target="_blank"> </a
            ><a href="http://www.iccrc-crcic.ca/" target="_blank"
              >www.iccrc-crcic.ca.</a
            >
          </p>
          <h6>ICCRC Contact Information:</h6>
          <p>
            Immigration Consultants of Canada Regulatory Council (ICCRC)<br>
            5500 North Service Rd., Suite 1002
          <br>Burlington, ON, L7L 6W6 <br>Toll-free: 1-877-836-7543</p>
        </li>
        <br />
        <li data-list-text="10." style="font-size: 18px">
          <h5 style="font-weight: 600">Confidentiality</h5>
          <p>
            All information and documentation reviewed by the RCIC, required by
            IRCC and all other governing bodies, and used for the preparation of
            the application will not be divulged to any third party, other than
            agents and employees of the RCIC, without prior consent, except as
            demanded by the Council or required under law. The RCIC, and all
            agents and employees of the RCIC, are also bound by the
            confidentiality requirements of Article 8 of the Code of
            Professional Ethics.
          </p>

          <p>
            The Client agrees to the use of electronic communication and storage
            of confidential information. The RCIC will use his/her best efforts
            to maintain a high degree of security for electronic communication
            and information storage.
          <br>
            The client must file a written authorization with the RCIC, naming
            the person if client wishes another person or family member to be
            able to access information on a file.
          </p>
        </li>
        <br />
        <li data-list-text="11." style="font-size: 18px">
          <h5 style="font-weight: 600">Unplanned RCIC Absence</h5>
          <p>
            In the event the Client is unable to contact the RCIC and has reason
            to believe the RCIC may be dead, incapacitated, or otherwise unable
            to fulfill his/her duties, the Client should contact ICCRC.
          </p>
        </li>
        <br />
        <li data-list-text="12." style="font-size: 18px">
          <h5 style="font-weight: 600">Force Majeure</h5>
          <p>
            The RCIC’s failure to perform any term of this Retainer Agreement,
            as a result of conditions beyond his/her control such as, but not
            limited to, governmental restrictions or subsequent legislation,
            war, strikes, or acts of God, shall not be deemed a breach of this
            Agreement.
          </p>
        </li>
        <br />
        <li data-list-text="13." style="font-size: 18px">
          <h5 style="font-weight: 600">Change Policy</h5>

          <p>
            The Client acknowledges that if the RCIC is asked to act on the
            Client’s behalf on matters other than those outlined above in the
            scope of this Agreement, or because of a material change in the
            Client’s circumstances, or because of material facts not disclosed
            at the outset of the application, or because of a change in
            government legislation regarding the processing of immigration or
            citizenship-related applications, the Agreement can be modified
            accordingly.
          </p>

          <p>
            This Agreement may only be altered or amended when such changes are
            made in writing and executed by the parties hereto. All changes
            and/or edits must be initialed and dated by both the Member and the
            Client. Any substantial changes to this agreement may require that
            the parties enter into a new Retainer Agreement.
          </p>
        </li>
        <br />
        <li data-list-text="14." style="font-size: 18px">
          <h5 style="font-weight: 600">Termination</h5>
          <ol id="l10" style="list-style-type:none; padding-left: 0;">
  <li data-list-text="14.1">
     <p style="position:relative;">
      <span style="position:absolute; left:0;">14.1</span>
      <span style="margin-left:40px;">This Agreement is considered terminated upon completion of tasks identified under section 2 of this agreement</span>
    </p>
  </li>
  <li data-list-text="14.2">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">14.2</span>
      <span style="margin-left:40px;">This Agreement is considered terminated if material changes occur to the Client’s application or
eligibility, which make it impossible to proceed with services detailed in section 2 of this
Agreement.</span>
    </p>
  </li>
          </ol>
        </li>
        <br />
        <li data-list-text="15." style="font-size: 18px">
          <h5 style="font-weight: 600">
            Discharge or Withdrawal of Representation
          </h5>
          <ol id="l11"style="list-style-type:none; padding-left: 0;">
  <li data-list-text="15.1">
     <p style="position:relative;">
      <span style="position:absolute; left:0;">15.1</span>
      <span style="margin-left:40px;">The Client may discharge representation and terminate this Agreement, upon writing, at which time
any outstanding or unearned fees or Disbursements will be refunded by the RCIC to the Client and/or any outstanding fees or Disbursements will be paid by the Client to the RCIC.
</span>
    </p>
  </li>
  <li data-list-text="15.2">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">15.2</span>
      <span style="margin-left:40px;">Pursuant to Article 11 of the <u> Code of Professional Ethics </u>, the RCIC may withdraw representation and
terminate this Agreement, upon writing, provided withdrawal does not cause prejudice to the Client, at
which time any outstanding or unearned fees or Disbursements will be refunded by the RCIC to the
Client and/or any outstanding fees or Disbursements will be paid by the Client to the RCIC.</span>
    </p>
  </li>
  <li data-list-text="15.3">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">15.3</span>
      <span style="margin-left:40px;">At the time of withdrawal or discharge, the RCIC must provide the Client with an invoice detailing all
services that have been rendered or accounting for the time that has been spent on the Client’s fil.</span>
    </p>
  </li>
          </ol>
        </li>
        <br />
        <li data-list-text="16." style="font-size: 18px">
          <h5 style="font-weight: 600">Governing Law</h5>

          <p>
            This Agreement shall be governed by the laws in effect in the
            Province/Territory of Alberta, and the federal laws of Canada
            applicable therein and except for disputes pursuant to Section 9
            hereof, any dispute with respect to the terms of this Agreement
            shall be decided by a court of competent jurisdiction within the
            Province/Territory of Alberta
          </p>
        </li>
        <br />
        <li data-list-text="17." style="font-size: 18px">
          <h5 style="font-weight: 600">Amendments to the Service Agreement</h5>
          <p>
            This service agreement may only be altered or amended when such
            changes are made in writing with the consent of both parties, signed
            and dated by the RCIC and the client
          </p>
        </li>
        <br />
        <li data-list-text="18." style="font-size: 18px">
          <h5 style="font-weight: 600">Miscellaneous</h5>
        <ol id="l12" style="list-style-type:none; padding-left: 0;">
  <li data-list-text="18.1">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.1</span>
      <span style="margin-left:40px;">The Client expressly authorizes the RCIC to act on his/her behalf to the extent of the specific functions which the RCIC was retained to perform, as per Section 2 hereof.</span>
    </p>
  </li>
  <li data-list-text="18.2">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.2</span>
      <span style="margin-left:40px;">This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, warranties, representations, negotiations and discussions, whether oral or written, of the parties except as specifically set forth herein.</span>
    </p>
  </li>
  <li data-list-text="18.3">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.3</span>
      <span style="margin-left:40px;">This Agreement shall be binding upon the parties hereto and their respective heirs, administrators, successors, and permitted assigns.</span>
    </p>
  </li>
  <li data-list-text="18.4">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.4</span>
      <span style="margin-left:40px;">The Costs enumerated in this Agreement are to be paid by the Client.</span>
    </p>
  </li>
  <li data-list-text="18.5">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.5</span>
      <span style="margin-left:40px;">This Agreement may only be altered or amended when such changes are made in writing and executed by the parties hereto. All changes and/or edits must be initialed and dated by both the Member and the Client. Any substantial changes to this Agreement may require that the parties enter into a new Retainer Agreement.</span>
    </p>
  </li>
  <li data-list-text="18.6">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.6</span>
      <span style="margin-left:40px;">The Client may, after a Retainer Agreement is signed, appoint a Designate to act on their behalf when dealing with the RCIC. A Designate must not be compensated by the Client or the RCIC for acting in the capacity of a Designate.</span>
    </p>
  </li>
  <li data-list-text="18.7">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.7</span>
      <span style="margin-left:40px;">The provisions of this Agreement shall be deemed severable. If any provision of this Agreement shall be held unenforceable by any court of competent jurisdiction, such provision shall be severed from this Agreement, and the remaining provisions shall remain in full force and effect.</span>
    </p>
  </li>
  <li data-list-text="18.8">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.8</span>
      <span style="margin-left:40px;">The headings utilized in this Agreement are for convenience only and are not to be construed in any way as additions to or limitations of the covenants and agreements contained in this Agreement.</span>
    </p>
  </li>
  <li data-list-text="18.9">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.9</span>
      <span style="margin-left:40px;">Each of the parties hereto must do and execute or cause to be done or executed all such further and other things, acts, deeds, documents, and assurances as may be necessary or reasonably required to carry out the intent and purpose of this Agreement fully and effectively.</span>
    </p>
  </li>
  <li data-list-text="18.10">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.10</span>
      <span style="margin-left:45px;"> The Client acknowledges that he/she has had sufficient time to review this Agreement and has been given an opportunity to obtain independent legal advice and translation prior to the execution and delivery of this Agreement.</span>
    </p>
  </li>
  <li data-list-text="18.11">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.11</span>
      <span style="margin-left:45px;"> In the event the Client did not seek independent legal advice prior to signing this Agreement, he/she did so voluntarily without any undue pressure and agrees that the failure to obtain independent legal advice must not be used as a defense to the enforcement of obligations created by this Agreement.</span>
    </p>
  </li>
  <li data-list-text="18.12">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.12</span>
      <span style="margin-left:45px;"> Furthermore, the Client acknowledges that he/she has received a copy of this Agreement and agrees to be bound by its terms.</span>
    </p>
  </li>
  <li data-list-text="18.13">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.13</span>
      <span style="margin-left:45px;"> The Client acknowledges that RCIC is not responsible if the application was submitted on time as per IRCC before midnight UTC but submission confirmation from IRCC was received the next day in UTC. RCIC must not be held accountable for any further implications including but not limited to missing deadlines or status expiry due to this IRCC online system error.</span>
    </p>
  </li>
  <li data-list-text="18.14">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.14</span>
      <span style="margin-left:45px;"> The client is aware that IRCC processing time and approvals are not in RCIC’s control, and timeline frames provided to the client are according to IRCC’s website.</span>
    </p>
  </li>
  <li data-list-text="18.15">
    <p style="position:relative;">
      <span style="position:absolute; left:0;">18.15</span>
      <span style="margin-left:45px;"> The Client acknowledges that he/she has requested that the Agreement be written in the English language and that English is the binding language.</span>
    </p>
  </li>
</ol>

        </li>
        <br />
        <li data-list-text="19.">
          <p>
            The company and RCIC is not part of the hiring process and is just
            acting as representative for filing the application from the
            applicant side. The company and RCIC will not be responsible for
            authenticity or legitimacy of any documents submitted in support of
            application. The client is sole responsible for providing all the
            supporting documents.
          </p>
        </li>
        <br />
        <li data-list-text="20.">
          <p>
            CLIENT ACKNOWLEDGES THAT ALL THE 9 PAGES HAVE BEEN READ AND INITIALED
            AFTER ACCEPTING ALL THE TERMS AND CONDITIONS OF THIS RETAINER
            AGREEMENT
          </p>
        </li>
        <br />
        <li data-list-text="21." style="font-size: 18px">
          <h5 style="font-weight: 600">Contact Information</h5>
        </li>
      </ol>
      <p>Client Name</p>
      <div class="row">
        <p class="col-6 text-capitalize">
        Given Name :  
        <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${(felidData && familyJsonArray[0]?.client_first_name ? familyJsonArray[0]?.client_first_name : (emp_user_type === "employee" ? (userData?.name || "") : (""))?.split(" ")[0])} 
        </span>
        </p>
        <p class="col-6 text-capitalize">
        Family Name :  
         <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${(familyJsonArray[0]?.client_last_name ? familyJsonArray[0]?.client_last_name : " ") ?? (emp_user_type === "employee" ? (userData?.name || "") : (""))?.split(" ")[1]} 
         </span>
         </p>
        <p class="col-6 text-capitalize">
        Address :  <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${felidData && felidData.client_address ? felidData.client_address : emp_user_type === "employer" ? (userData?.address || "") : ((userData?.current_location || "") + " " + (userData?.currently_located_country || ""))} 
        </span>
        </p> 
        <p class="col-6">
        Telephone Number :  <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${felidData && felidData.client_contact ? felidData.client_contact : (userData?.contact_no || "")}
        </span>
        </p>
        <p class="col-6">
        Cellphone Number :  
         <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${(felidData.client_cellphone ? felidData?.client_cellphone : " ") || ""}
         </span>
         </p>
        <p class="col-6">
        Fax Number :  
         <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${(felidData.client_fax ? felidData?.client_fax : " ") || ""}</span>
         </p>
         <p class="col-6">
         E-mail Address :  <span style=" min-width: 150px;
        border-bottom: 1px solid grey;
        display: inline-block;">${felidData && felidData.client_email ? (felidData?.client_email || "") : (userData?.email || "")}
         </span>
         </p>
      </div>
      <p>RCIC</p>
      <div class="row">
  <p class="col-6 text-capitalize">
    Given Name:
    <span
      style="min-width: 150px; border-bottom: 1px solid grey; display: inline-block;"
    >
      Harpreet
    </span>
  </p>
  <p class="col-6 text-capitalize">
    Family Name:
    <span
      style="min-width: 150px; border-bottom: 1px solid grey; display: inline-block;"
    >
      Kaur
    </span>
  </p>
  <p class="col-6 text-capitalize">
    Address:
    <span
      style="min-width: 150px; border-bottom: 1px solid grey; display: inline-block;"
    >
      2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7
    </span>
  </p>
  <p class="col-6">
    Telephone Number:
    <span
      style="min-width: 150px; border-bottom: 1px solid grey; display: inline-block;"
    >
      403-888-5308
    </span>
  </p>
  <p class="col-6">
    Fax Number:
    <span
      style="min-width: 150px; border-bottom: 1px solid grey; display: inline-block;"
    >
      <!-- Leave blank or insert fax number here -->
    </span>
  </p>
  <p class="col-6">
    E-mail Address:
    <span
      style="min-width: 150px; border-bottom: 1px solid grey; display: inline-block;"
    >
      <a href="mailto:info@canpathways.ca" class="s19" target="_blank">
        info@canpathways.ca
      </a>
    </span>
  </p>
</div>

      <br /><br />
<div style="display: flex; flex-wrap: wrap">
    <!-- Client Signature -->
    <div style="width: 50%">
       ${familyJsonArray[0]?.client_signature ? `
        <div class="d-flex flex-column">
                        <img
      src="${familyJsonArray[0]?.client_signature}"
      alt="${familyJsonArray[0]?.client_first_name} ${familyJsonArray[0]?.client_last_name}"
      style="max-width: 200px; float: right;"
      class="${familyJsonArray[0]?.client_signature ? "d-block" : "d-none"}"
    />
     <p style="margin: 0">______________________________</p>
                  <small class="row ">
                    <span class="col text-capitalize" >
                      ${familyJsonArray[0]?.client_first_name + " " + familyJsonArray[0]?.client_last_name + " "}${familyJsonArray[0]?.date_signature_client}</span>
                  </small>
                      </div>`
      : page === "admin" ? "___________________________" : ` <button class="btn btn-outline-secondary border-0  " 
                  style="font-family:cursive;" 
                  id="add-signature-button-0">
            Add Signature
          </button>`
    }
            <p style="margin: 0 0 30px 0">Signature of Client</p>
        </div>
        <div style="width: 50%">
            <p class="para_gap text-capitalize" style="margin: 0">
                <span style="max-width: 200px;">${familyJsonArray[0]?.client_first_name + " " + familyJsonArray[0]?.client_last_name}</span>
            </p>
            <p style="margin: 0 0 30px 0">Name of Client</p>
        </div>
        <div style="width: 50%">
            <p class="" style="margin: 0">
                 ${familyJsonArray[0]?.date_signature_client === "0000-00-00 00:00:00" || !familyJsonArray[0]?.date_signature_client ? '_____________________'
      : `<span  class="para_gap" style="max-width: 200px;">${familyJsonArray[0]?.date_signature_client}</span>`}
            </p>
            <p style="margin: 0 0 30px 0">Date</p>
        </div>
    ${(familyJsonArray.slice(1) || []).map((item, index) => (
        `<div style="width: 50%">
           
       ${item.client_signature ? `
        <div class="d-flex flex-column">
                        <img
      src="${item.client_signature}"
      alt="${item.client_first_name} ${item.client_last_name}"
      style="max-width: 200px; float: right;"
      class="${item.client_signature ? "d-block" : "d-none"}"
    />
    <p style="margin: 0">______________________________</p>
                  <small class="row ">
                    <span class="col text-capitalize" >
                      ${item.client_first_name + " " + item.client_last_name + " "}${item.date_signature_client}</span>
                  </small>
                      </div>`
          : page === "admin" ? `<p style="margin: 0">______________________________</p>`
            : ` <button class="btn btn-outline-secondary border-0  " 
                  style="font-family:cursive;" 
                  id="add-signature-button-${index + 1}"
                  ${!familyJsonArray[0]?.client_signature ? 'disabled' : ''}>
            Add Signature
          </button>`
        }
            <p style="margin: 0 0 30px 0">Signature of family member</p>
        </div>
        <div style="width: 50%">
            <p class="para_gap text-capitalize" style="margin: 0">
                <span style="max-width: 200px;">${item.client_first_name + " " + item.client_last_name}</span>
            </p>
            <p style="margin: 0 0 30px 0">Name of family member</p>
        </div>
        <div style="width: 50%">
            <p style="margin: 0">
               ${item.date_signature_client === "0000-00-00 00:00:00" || !item.date_signature_client ? '_____________________'
          : `<span  class="para_gap" style="max-width: 200px;">${item.date_signature_client}</span>`}
            </p>
            <p style="margin: 0 0 30px 0">Date</p>
        </div>`
      ))}

    <!-- RCIC Signature -->
    <div style="width: 50%">
        
            <div class="d-flex flex-column">
                       <img
                src="${felidData.rcic_signature ? felidData.rcic_signature : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlsaOgypoEH0TMazy7VqfXMPmVbgD47iezKA&s'}"
                alt="RCIC"
                style="max-width: 200px; float: right;"
                class="${felidData.rcic_signature ? 'd-block' : 'd-none'}"
            />
            <p  style="margin: 0">______________________________</p>
                  <small class="row ">
                    <span class="col text-capitalize" >
                      Harpreet kaur ${felidData.date_signature_rcic === "0000-00-00 00:00:00" ? '' : felidData.date_signature_rcic}</span>

                  </small>
                      </div>
        <p style="margin: 0 0 30px 0">Signature of RCIC</p>
    </div>
    <div style="width: 50%">
        <p class="para_gap" style="margin: 0">
            <span style="max-width: 200px;">Harpreet Kaur</span>
        </p>
        <p style="margin: 0 0 30px 0">Name of RCIC</p>
    </div>
    <div style="width: 50%">
        <p style="margin: 0">
            ${felidData.date_signature_rcic === "0000-00-00 00:00:00" || !felidData.date_signature_rcic ? '_____________________'
      : `<span  class="para_gap" style="max-width: 200px;">${felidData.date_signature_rcic}</span>`}
        </p>
        <p style="margin: 0 0 30px 0">Date</p>
    </div>
</div>

      <h3 style="text-align: center">AUTHORIZATION</h3>
      <p>
        I  <span class="para_gap text-capitalize">${(felidData && (familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name) ? ((familyJsonArray[0]?.client_first_name + " " + (familyJsonArray[0]?.client_last_name || ""))) : (emp_user_type === "employee" ? ((userData?.name || "") || "") : (("") || "")))}</span>( here in after referred to as the “client”),
        hereby authorize and appoint Harpreet kaur (hereinafter referred to as
        the “RCIC” with a CICC# R533393), of CAN Pathways Immigration
        consultancy ltd.,(hereinafter referred to as the “firm”), to represent
        me in my application to IRCC.
      </p>
      <p>
        The RCIC and the firm are authorized to assign any of its staff members,
        associates, affiliates, lawyers or the agents to process any matters in
        whole or part related to above- mentioned subject as they deem
        appropriate.
      </p>
      <p>
        The RCIC and the firm are authorized to collect information and
        communicate with IRCC related to my immigration file. In case of Online
        application, I authorize RCIC Harpreet kaur to electronically sign and
        submit the application on my behalf.
      </p>
      <p>
        I also give permission to the RCIC and the firm to post photos on social
        media ensuring that my private information is redacted.
      </p>
      <p>
        In doing so, they my each receive or pay each other any pecuniary
        remuneration/benefits that may be acquired directly or indirectly
        including those from a third party for the purpose of obtaining a
        favorable and expeditious results.
      </p>
      <p>Declaration</p>
      <ol id="l13">
        <li data-list-text="1.">
          <p>
            I confirm that neither I nor any other family members included in my
            application have presented or will present at any future date, false
            and misleading information to either the consultant, the firm or to
            the government of Canada.
          </p>
        </li>
        <li data-list-text="2.">
          <p>
            I confirm that neither I nor any other family members included in my
            application have presented or will present at any future date,
            fraudulently obtained or forged documents to either the consultant,
            the firm or to the government of Canada.
          </p>
        </li>
        <li data-list-text="3.">
          <p>
            I confirm that it is my responsibility to ensure the co-operation of
            my relatives/employers/educational institutes as needed.
          </p>
        </li>
        <li data-list-text="4.">
          <p>
            In the event the Immigration office responsible should contact the
            Client directly, the Client is instructed to notify the RCIC
            immediately
          </p>
        </li>
        <li data-list-text="5.">
          <p>
            If a refusal of my application is due to medical or criminal issues
            additional services will have to be agreed on in a different
            retainer and new fees negotiated. The steps to resolve any medical
            or criminal inadmissibility will not form part of this agreement.
          </p>
        </li>
        <li data-list-text="6.">
          <p>
            I undertake to inform the consultant, the firm or the Government of
            Canada of any change in marital or civic status or change of my
            physical address and contact information for myself and all persons
            included in my application. If such changes occur and it requires
            additional services not herein referred to, it will be agreed upon
            apart from this commitment.
          </p>
        </li>
        <li data-list-text="7.">
          <p>
            I understand that the RCIC’s obligations under the Engagement are null and void if
              the Client knowingly provides any inaccurate, misleading or false
              material information. The Client’s financial obligations
              remain
          </p>
        </li>
        <li data-list-text="8.">
          <p>
            I understand that the processing times are only an estimate given by
            the Government and that I will not hold the consultant, the firm or
            the Government of Canada responsible for any delays except where it
            is due to negligence from the firm.
          </p>
        </li>
        <li data-list-text="9.">
          <p>
            I agree that if my application is refused because I neglected to
            provide the required documents within the notified time frame the
            consultant, the firm or the Government of Canada will not be held
            responsible.
          </p>
        </li>
      </ol>
      <p>
        I have read and understood all the terms and steps in the retainer
        letter above and I agree to all the terms mentioned And for so doing,
        this document shall constitute good and sufficient authority and
        declaration.
      </p>
      <br /><br />
      <div style="display: flex; flex-wrap: wrap">
        <div style="width: 33.33%; text-align: center">
          <p class="${felidData && (familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name) ? "para_gap" : ""} text-capitalize" style="margin: 0">${(felidData && (familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name) ? ((familyJsonArray[0]?.client_first_name + " " + (familyJsonArray[0]?.client_last_name || ""))) : (emp_user_type === "employee" ? ((userData?.name || "________________") || "") : "_______________"))}</p>
          <p style="margin: 0 0 30px 0">Client’s full name</p>
        </div>
        <div style="width: 33.33%; text-align: center;
   ${familyJsonArray[0]?.client_signature ? "position: relative; bottom: 40px;" : ""}">
          <p class=${familyJsonArray[0]?.client_signature ? "para_gap" : ""} style="margin: 0">
           <img
          src=${familyJsonArray[0]?.client_signature ? familyJsonArray[0]?.client_signature : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlsaOgypoEH0TMazy7VqfXMPmVbgD47iezKA&s"}
          alt=${(felidData && (familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name) ? ((familyJsonArray[0]?.client_first_name + " " + (familyJsonArray[0]?.client_last_name || ""))) : (emp_user_type === "employee" ? ((userData?.name || "") || "") : (("") || "")))}
          style="max-width: 200px; float: right"
          class=${familyJsonArray[0]?.client_signature ? "d-block" : "d-none"}
        />
        ${familyJsonArray[0]?.client_signature ? " " : "__________________"}
          </p>
          <p style="margin: 0 0 30px 0">Signatures</p>
        </div>
        <div style="width: 33.33%; text-align: center">
          <p class=${(!familyJsonArray[0]?.date_signature_client || familyJsonArray[0]?.date_signature_client === "0000-00-00 00:00:00") ? "" : "para_gap"} style="margin: 0">${(!familyJsonArray[0]?.date_signature_client || familyJsonArray[0]?.date_signature_client === "0000-00-00 00:00:00") ? "_______________" : moment(familyJsonArray[0]?.date_signature_client).format("DD-MM-YYYY")}</p>
          <p style="margin: 0 0 30px 0">Date</p>
        </div>
      </div>
    </div>

    <div class="header" style="padding: 10px 20px">
      <div style="text-align: center; color: #ed1c24">
        Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada | Tel.:
        403.888.5308 <br />Email: info@canpathways.ca |
        Website:www.canpathways.ca
      </div>
      <div
        style="
          text-align: right;
          display: flex;
          align-items: baseline;
          justify-content: end;
        "
      >
        Initial:
         <p class="para_gap" style="margin: 0">
       ${familyJsonArray[0]?.client_signature ? `  <img
      src="${familyJsonArray[0]?.client_signature}"
      alt="${familyJsonArray[0]?.client_first_name} ${familyJsonArray[0]?.client_last_name}"
      style="max-width: 200px; float: right;"
      class="${familyJsonArray[0]?.client_signature ? "d-block" : "d-none"}"
    />`: page === "admin" ? "" : ``}
        </p>
      </div>
    </div>
  </body>
  </html>`)
  // useEffect(() => {
  //   // Event handler function
  //   const handleClick = (e) => {
  //     addSign(e, "initial"); // Call the addSign function with desired arguments
  //   };

  //   // Ensure the HTML is injected
  //   const btn = document.getElementById('add-signature-button-initial');

  //   if (btn) {
  //     // Attach event listener
  //     btn.addEventListener('click', handleClick);

  //     // Clean up event listener
  //     return () => {
  //       btn.removeEventListener('click', handleClick);
  //     };
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect((e) => {
    // Attach event listeners after HTML is injected
    familyJsonArray.forEach((_, index) => {
      const button = document.getElementById(`add-signature-button-${index}`);
      if (button) {
        button.addEventListener('click', () => addSign(e, index));
      }
    });

    // Clean up event listeners
    return () => {
      familyJsonArray.forEach((_, index) => {
        const button = document.getElementById(`add-signature-button-${index}`);
        if (button) {
          button.removeEventListener('click', () => addSign(e, index));
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familyJsonArray,]);
  return (
    <div className="row"
      style={{
        maxWidth: "1024px",
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        height: "calc(100vh - 75px)",
        overflow: "auto",
      }}>
      <div dangerouslySetInnerHTML={{ __html: jsxContent }} />
    </div>
  );
};


export default HtmlAgreementOne;
