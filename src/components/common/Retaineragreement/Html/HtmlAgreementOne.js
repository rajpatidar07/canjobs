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
  const familyJsonArray = felidData?.family_json ? JSON.parse(felidData.family_json) : [];
  const jsxContent = (
    `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Retainer Agreement - Client 1 column - Copy (3) (1).docx</title>
    <meta name="author" content="Admin" />
    <style type="text/css">
      .para_gap {
        min-width: 200px;
        border-bottom: 1px solid grey;
        display: inline-block;
        margin-right: 15px;
      }
      td {
        border: 1px solid #333;
        padding: 5px;
      }
    </style>
  </head>
  <body style="margin: 0 auto; max-width: 1024px">
    <div class="header" style="padding: 10px 20px;text-align: justify;">
      <img
        src="https://canpathwaysjobs.com/image/00logo-main-black.png"
        alt=""
        style="max-width: 200px"
      />
    </div>
    <div class="main_div" style="padding: 10px 20px">
      <h1 style="text-align: center">RETAINER AGREEMENT</h1>
      <div style="display: flex; justify-content: space-between">
        <b>RCIC Membership Number<span> : R533393 </span></b>
        <b>Client File Number: <span>${felidData?.client_file_no || ""}</span></b>
      </div>
      <p>
        This Retainer Agreement is made this  <span class="para_gap">${(felidData?.client_file_no || "")} </span> day of <span class="para_gap"> ${!felidData.agreement_date || felidData.agreement_date === "0000-00-00 00:00:00" ? "" : (felidData && (felidData.agreement_date ? moment(new Date(felidData?.agreement_date)).format("Do") : " ")) || ""}</span> <span class="para_gap">${!felidData.agreement_date || felidData.agreement_date === "0000-00-00 00:00:00" ? "" : (felidData && (felidData.agreement_date ? moment(new Date(felidData?.agreement_date)).format("MMMM") : " ")) || ""} </span><span class="para_gap"> ${!felidData.agreement_date || felidData.agreement_date === "0000-00-00 00:00:00" ? "" : (felidData && (felidData.agreement_date ? moment(new Date(felidData?.agreement_date)).format("YYYY") : " ")) || ""}</span>
        between Regulated Canadian Immigration Consultant (RCIC) Harpreet Kaur
        (the “RCIC”), RCIC Membership Number <span>R533393</span>, phone number
        <span>4038885308</span>
        , email <a href="mailto:info@canpathways.ca" class="a" target="_blank">info@canpathways.ca located at 2618 </a>
        <span>Hopewell Pl NE #310 Calgary, AB T1Y 7J7,</span> <span>Canada</span> and Client  <span class="para_gap text-capitalize">${(felidData && (familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name) ? ((familyJsonArray[0]?.client_first_name + " " + (familyJsonArray[0]?.client_last_name || ""))) : (emp_user_type === "employee" ? ((userData?.name || "") || "") : ((userData?.company_name || "") || "")))}</span>(the “Client”)<span class="p">, located at  <span class="para_gap"> ${felidData && felidData.client_address ? (felidData.client_address) : emp_user_type === "employer" ? (userData?.address || "") : (((userData?.current_location || "") || "") + " " + ((userData?.currently_located_country || "") || ""))}</span> </span> , email  <span class="para_gap">${felidData && felidData.client_email ? felidData.client_email : (userData?.email || "")}</span>, contact number  <span class="para_gap"> ${felidData && felidData.client_contact ? felidData.client_contact : (userData?.contact_no || "")}</span>.
      </p>
      <p>
      ${familyJsonArray.slice(1).length !== 0
      ? `<div><p>Details of Family member and dependents to added in this application</p><div>` : ''}
      <br>
      ${(familyJsonArray.slice(1) || []).map((item, index) => (
        `<span key=${index}> Name ${index + 1}: <span class="para_gap text-capitalize">${item.client_first_name + " " + item.client_last_name} </span> Date of birth : <span class="para_gap">${item.client_date_of_birth ? moment(item.client_date_of_birth).format("DD-MM-YYYY") : ""} </span> </span>`
      ))}
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
          <p style="font-weight: 600">Definitions</p>
          <p>
            The terms set out in this Retainer Agreement, have the meaning given
            to such terms in the Retainer Agreement Regulation and By-law of the
            Council, as amended from time to time.
          </p>
        </li>
        <br />
        <li data-list-text="2." style="font-size: 18px">
          <p style="font-weight: 600">RCIC Responsibilities and Commitments</p>
          <p>
            The Client asked the RCIC, and the RCIC has agreed, to act for the
            Client in the matter of
          </p>
          <p>
             <span class="para_gap">${felidData?.matter || ""} </span>. In consideration of the fees paid and the
            matter stated above, the RCIC agrees to do the following:
          </p>
          <ol id="l2">
            <li data-list-text="a)">
              <p>
                [Summary of preliminary advice given to the client
                 <span class="para_gap">${felidData?.summary || ""}</span>]
              </p>
            </li>
            <li data-list-text="b)">
              <p>
                [Consultation and providing document checklists and intake
                sheet, file opening]
              </p>
            </li>
            <li data-list-text="c)">
              <p>[Data gathering, filling out forms]</p>
            </li>
            <li data-list-text="d)">
              <p>[Information verification, completeness check]</p>
            </li>
            <li data-list-text="e)">
              <p>[Application submission]</p>
            </li>
            <li data-list-text="f)">
              <p>[File maintenance and correspondence with client and IRCC]</p>
            </li>
          </ol>
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
          <p style="font-weight: 600">
            Client Responsibilities and Commitments
          </p>
          <ol id="l3">
            <li data-list-text="3.1">
              <p>The Client must provide, upon request from the RCIC:</p>
              <span id="l4">
                <div data-list-text="">
                  <p> All necessary documentation</p>
                </div>
                <div data-list-text="">
                  <p>
                     All documentation in English or French, or with an English
                    or French translation
                  </p>
                </div>
              </span>
            </li>
            <li data-list-text="3.2">
              <p>
                The Client understands that he/she must be accurate and honest
                in the information he/she provides and that any
                misrepresentations or omissions may void this Agreement, or
                seriously affect the outcome of the application or the retention
                of any immigration status he/she may obtain. The RCIC’s
                obligations under the Retainer Agreement are null and void if
                the Client knowingly provides any inaccurate, misleading or
                false material information. The Client’s financial obligations
                remain.
              </p>
            </li>
            <li data-list-text="3.3">
              <p>
                Client is informed that RCIC might obtain assistance from other
                professionals or services.
              </p>
            </li>
            <li data-list-text="3.4">
              <p>
                Client understands that RCIC should not be held responsible for
                visa outcome as RCIC cannot guarantee the decision of IRCC. If
                IRCC policy or rules changes before/during or after the
                application submission and client deemed ineligible, RCIC should
                not be held responsible for that.
              </p>
            </li>
            <li data-list-text="3.5">
              <p>
                In the event Immigration, Refugees and Citizenship Canada (IRCC)
                or Employment and Social Development Canada (ESDC) or Provincial
                Government Administrator or processing Visa Office should
                contact the Client directly, the Client is instructed to notify
                the RCIC immediately.
              </p>
            </li>
            <li data-list-text="3.6">
              <p>
                The Client is to immediately advise the RCIC of any change in
                the marital, family, or civil status or change of physical
                address or contact information for any person included in the
                application.
              </p>
            </li>
            <li data-list-text="3.7">
              <p>
                In the event of a Joint Retainer Agreement, the Clients agree
                that the RCIC must share information among all clients, as
                required. Furthermore, if a conflict develops that cannot be
                resolved, the RCIC cannot continue to act for both or all of the
                Clients and may have to withdraw completely from representation.
              </p>
            </li>
            <li data-list-text="3.8">
              <p>
                All necessary information and documentation in English or
                French, or with an English or French translation, if in any
                other language, with a certified English translation, according
                to the timeline recommended by RCIC. In the event documents are
                not provided or client fails to contact the RCIC in spite of
                request made by RCIC on email provided by client in the retainer
                agreement, before the due date mentioned ( which is within 30
                days from the retainer signed, or earlier also depending upon
                the requirements of the case ) the RCIC can close the file after
                notifying the client in advance about the non-responsiveness. An
                administrative fee of CAD$ 300.00 plus taxes should be paid by
                client to close the file. All pending fees are due and are to be
                paid by client and if there is any unused money with RCIC, it
                should be refunded to client if applicable.
              </p>
            </li>
            <li data-list-text="3.9">
              <p>
                Client has been explained by RCIC and is aware of high chances
                of application refusal due to weak case and other reasons as
                explained. Client still agrees to go ahead with the application.
              </p>
            </li>
            <li data-list-text="3.10">
              <p>
                The client also allows the RCIC to use of digital signatures for
                the purpose of this application on his/her behalf
              </p>
            </li>
            <li data-list-text="3.11">
              <p>
                Mode of communication should be email provided by client in this
                retainer only, for all the correspondence between RCIC and
                client and RCIC should be given minimum 7 working days to revert
                to any queries from client. RCIC is not responsible for
                communication/ consequences if client does not receive email
                sent by RCIC and did not communicate with RCIC in given timeline
                or within 15 days of sent email.
              </p>
            </li>
            <li data-list-text="3.12">
              <p>
                Once client provide all the documents required as per checklist,
                RCIC should be given minimum 3 weeks’ time from the time all
                documents are reviewed by RCIC and deemed complete, to submit
                the file to IRCC.
              </p>
            </li>
          </ol>
        </li>
        <br />
        <li data-list-text="4." style="font-size: 18px">
          <p style="font-weight: 600">Payment Schedule</p>

          <p>
            Billing method: The Client will be billed by [flat fee with payment
            by milestones]. Payment Terms and Conditions
          </p>

          <table style="border-collapse: collapse; width: 100%">
            <thead>
              <tr>
                <th
                  scope="col"
                  style="text-align: center; border: 1px solid black"
                >
                  Fees details
                </th>
                <th
                  scope="col"
                  style="text-align: left; border: 1px solid black"
                >
                  Amount (CAD)
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
                <td style="border: 1px solid black"></td>
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
                <td style="text-align: center; border: 1px solid black">
                  Total Cost
                </td>
                <td style="border: 1px solid black">${felidData?.total_cost || ""}</td>
              </tr>
            </tbody>
          </table>

          <p>
            Invoice Frequency: The RCIC must provide an Invoice to the Client
          </p>
          <p>
            Note: The courier charges and Government fees based on current rates
            and may change anytime on or before submission.
          </p>

          <table style="border-collapse: collapse" cellspacing="0">
            <tr>
              <td>
                <p>RCIC Service Milestone</p>
              </td>
              <td>
                <p>Estimated</p>
                <p>date of Completion</p>
              </td>
              <td>
                <p>Professional Fees (Non-Refundable)</p>
              </td>
              <td>
                <p>Applicable Retainer Fee for</p>
                <p>this stage (Non- Refundable)</p>
              </td>
              <td>
                <p>Applicable Government Processing Fee</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  Step 1Completes upon signing the retainer and sharing the
                  checklists and intake sheet with client. Data gathering and
                  Creating Express Entry Profile
                </p>
              </td>
              <td>
                <p><br /></p>
              </td>
              <td>
                <p>Non-refundable</p>
              </td>
              <td>${felidData?.applicable_retainer_fee_stape_1 || ""}</td>
              <td>${felidData?.applicable_government_processing_fee_stape_1 || ""}</td>
            </tr>
            <tr>
              <td>
                <p>
                  Step 2 Application preparation, filling out the forms,
                  information verification and completeness check, preparing the
                  application package
                </p>
                <p>Payment is due before final submission of application.</p>
                <p>Provide proof of submission to the client</p>
              </td>
              <td></td>
              <td>
                <p>Non-refundable</p>
                <p>
                  All payments made are non- refundable and total service
                  charges to be collected regardless, whether the client/ s
                  withdraw from the file at this stage. The government fee and
                  courier charges must be paid apart from professional fees
                  payment
                </p>
                <p>scheduled at this stage</p>
              </td>
              <td>${felidData?.applicable_retainer_fee_stape_2 || ""}</td>
              <td>${felidData?.applicable_government_processing_fee_stape_2 || ""}</td>
            </tr>
          </table>
          <p>
            Total Amount: (Non-Refundable) (Paid at signing of contract and
            sharing of checklist): ${felidData?.total_amount_signing_of_contract || ""} $<br> Balance (Non-Refundable) (Paid at time of
            filing): ${felidData?.balance_paid_at_time_of_filing || ""} $
          </p>
          <p>Note:</p>
          <spanl id="l5">
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
          </spanl>
        </li>
        <br />
        <li data-list-text="5." style="font-size: 18px">
          <p>
            Methods of Payment: We DO NOT accept cheques.
          </p>
          <p>
            For Clients Located INSIDE Canada, we receive the following payment
            options:
          </p>

          <spanl id="l6">
            <li data-list-text="o">
                In-person Cash Drop-Off
                <span class="p"
                  >– Please contact us to arrange a time to drop off your
                  payment in cash. We will provide you with a receipt.</span
                >
            </li>
            <li data-list-text="o">
                E-transfer
                <a
                  href="mailto:accounts@canpathways.com"
                  class="a"
                  target="_blank"
                  >– Please send the payment and the answer to the secret
                  question to the following e-mail address: </a
                ><a
                  href="mailto:accounts@canpathways.com"
                  class="s15"
                  target="_blank"
                  >accounts@canpathways.com</a
                >
            </li>
            <li data-list-text="o">
                Credit Card/PayPal:
                <span class="p"
                  >Instructions will be shared, additional up to </span
                >3%
                <span class="p"
                  >charges will be applicable if the client is willing to pay by
                  this method.</span
                >
              <p>
                For Clients Located OUTSIDE Canada, we receive the following
                payment options:
              </p>
              <spanl id="l7">
                <li data-list-text="o">
                    Wire Transfer<span class="p"
                      >- Bank details will be provided once the contract is
                      being signed. (*Banks usually charge a processing fee for
                      wire transfer, so please add </span
                    >CAD $50
                    <span class="p"
                      >fee on top of your payment EVERY TIME you make a wire
                      transfer;</span
                    >
                </li>
                <li data-list-text="o">
                    Paypal:
                    <span class="p"
                      >Instructions will be shared, additional up to </span
                    >5%
                    <span class="p"
                      >charges will be applicable if the client is willing to
                      pay by this method.</span
                    >
                </li>
              </spanl>
            </li>
          </ul>
        </li>
        <br />
        <li data-list-text="6." style="font-size: 18px">
          <p style="font-weight: 600">Interest</p>
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
          <p style="font-weight: 600">Refund Policy</p>
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
          <spanl id="l8">
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
          </spanl>

          <p>
            If application is refused because of an error or omission on the
            part of the RCIC or the professional staff, Unused and/or unearned
            fees will be refunded in accordance with the
            <span>Client File Management Regulation</span>, the
            <span>Client Account Regulation</span> and the
            <span>Retainer Agreement Regulation</span> and in the following manner:
          </p>
          <p>Cheque</p>

          <p>[describe the manner of refund, including method and time frame]</p>
          <p>
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
          <p style="font-weight: 600">Invoicing</p>
          <p>The RCIC will provide invoices, which include:</p>
          <spanl id="l9">
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
          </spanl>
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
          <p style="font-weight: 600">
            Dispute Resolution Related to the Code of Professional Ethics
          </p>
          <p>
            In the event of a dispute related to the Professional Services
            provided by the RCIC, the Client and RCIC are to make every
            reasonable effort to resolve the matter between the two parties. In
            the event a resolution cannot be reached, the Client is to present
            the complaint in writing to the RCIC and allow the RCIC
          </p>
          <p>
            <span>30</span> days to respond to the Client. In the event the dispute is
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
            Immigration Consultants of Canada Regulatory Council (ICCRC) 5500
            North Service Rd., Suite 1002
          </p>
          <p>Burlington, ON, L7L 6W6 Toll-free: 1-877-836-7543</p>
        </li>
        <br />
        <li data-list-text="10." style="font-size: 18px">
          <p style="font-weight: 600">Confidentiality</p>
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
          </p>
          <p>
            The client must file a written authorization with the RCIC, naming
            the person if client wishes another person or family member to be
            able to access information on a file.
          </p>
        </li>
        <br />
        <li data-list-text="11." style="font-size: 18px">
          <p style="font-weight: 600">Unplanned RCIC Absence</p>
          <p>
            In the event the Client is unable to contact the RCIC and has reason
            to believe the RCIC may be dead, incapacitated, or otherwise unable
            to fulfill his/her duties, the Client should contact ICCRC.
          </p>
        </li>
        <br />
        <li data-list-text="12." style="font-size: 18px">
          <p style="font-weight: 600">Force Majeure</p>
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
          <p style="font-weight: 600">Change Policy</p>

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
          <p style="font-weight: 600">Termination</p>
          <ol id="l10">
            <li data-list-text="14.1">
              <p>
                This Agreement is considered terminated upon completion of tasks
                identified under section 2 of this agreement.
              </p>
            </li>
            <li data-list-text="14.2">
              <p>
                This Agreement is considered terminated if material changes
                occur to the Client’s application or eligibility, which make it
                impossible to proceed with services detailed in section 2 of
                this Agreement.
              </p>
            </li>
          </ol>
        </li>
        <br />
        <li data-list-text="15." style="font-size: 18px">
          <p style="font-weight: 600">
            Discharge or Withdrawal of Representation
          </p>
          <ol id="l11">
            <li data-list-text="15.1">
              <p>
                The Client may discharge representation and terminate this
                Agreement, upon writing, at which time any outstanding or
                unearned fees or Disbursements will be refunded by the RCIC to
                the Client and/or any outstanding fees or Disbursements will be
                paid by the Client to the RCIC.
              </p>
            </li>
            <li data-list-text="15.2">
              <p>
                Pursuant to Article 11 of the
                <span>Code of Professional Ethics</span>, the RCIC may withdraw
                representation and terminate this Agreement, upon writing,
                provided withdrawal does not cause prejudice to the Client, at
                which time any outstanding or unearned fees or Disbursements
                will be refunded by the RCIC to the Client and/or any
                outstanding fees or Disbursements will be paid by the Client to
                the RCIC.
              </p>
            </li>
            <li data-list-text="15.3">
              <p>
                At the time of withdrawal or discharge, the RCIC must provide
                the Client with an invoice detailing all services that have been
                rendered or accounting for the time that has been spent on the
                Client’s file.
              </p>
            </li>
          </ol>
        </li>
        <br />
        <li data-list-text="16." style="font-size: 18px">
          <p style="font-weight: 600">Governing Law</p>

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
          <p style="font-weight: 600">Amendments to the Service Agreement</p>
          <p>
            This service agreement may only be altered or amended when such
            changes are made in writing with the consent of both parties, signed
            and dated by the RCIC and the client
          </p>
        </li>
        <br />
        <li data-list-text="18." style="font-size: 18px">
          <p style="font-weight: 600">Miscellaneous</p>
          <ol id="l12">
            <li data-list-text="18.1">
              <p>
                The Client expressly authorizes the RCIC to act on his/her
                behalf to the extent of the specific functions which the RCIC
                was retained to perform, as per Section 2 hereof.
              </p>
            </li>
            <li data-list-text="18.2">
              <p>
                This Agreement constitutes the entire agreement between the
                parties with respect to the subject matter hereof and supersedes
                all prior agreements, understandings, warranties,
                representations, negotiations and discussions, whether oral or
                written, of the parties except as specifically set forth herein.
              </p>
            </li>
            <li data-list-text="18.3">
              <p>
                This Agreement shall be binding upon the parties hereto and
                their respective heirs, administrators, successors and permitted
                assigns.
              </p>
            </li>
            <li data-list-text="18.4">
              <p>
                The Costs enumerated in this Agreement are to be paid by the
                Client.
              </p>
            </li>
            <li data-list-text="18.5">
              <p>
                This Agreement may only be altered or amended when such changes
                are made in writing and executed by the parties hereto. All
                changes and/or edits must be initialed and dated by both the
                Member and the Client. Any substantial changes to this Agreement
                may require that the parties enter into a new Retainer
                Agreement.
              </p>
            </li>
            <li data-list-text="18.6">
              <p>
                The Client may, after a Retainer Agreement is signed, appoint a
                Designate to act on their behalf when dealing with the RCIC. A
                Designate must not be compensated by the Client or the RCIC for
                acting in the capacity of a Designate.
              </p>
            </li>
            <li data-list-text="18.7">
              <p>
                The provisions of this Agreement shall be deemed severable. If
                any provision of this Agreement shall be held unenforceable by
                any court of competent jurisdiction, such provision shall be
                severed from this Agreement, and the remaining provisions shall
                remain in full force and effect.
              </p>
            </li>
            <li data-list-text="18.8">
              <p>
                The headings utilized in this Agreement are for convenience only
                and are not to be construed in any way as additions to or
                limitations of the covenants and agreements contained in this
                Agreement.
              </p>
            </li>
            <li data-list-text="18.9">
              <p>
                Each of the parties hereto must do and execute or cause to be
                done or executed all such further and other
              </p>
              <p>
                things, acts, deeds, documents and assurances as may be
                necessary or reasonably required to carry out the intent and
                purpose of this Agreement fully and effectively.
              </p>
            </li>
            <li data-list-text="18.10">
              <p>
                The Client acknowledges that he/she has had sufficient time to
                review this Agreement and has been given an opportunity to
                obtain independent legal advice and translation prior to the
                execution and delivery of this Agreement.
              </p>
            </li>
            <li data-list-text="18.11">
              <p>
                In the event the Client did not seek independent legal advice
                prior to signing this Agreement, he/she did so voluntarily
                without any undue pressure and agrees that the failure to obtain
                independent legal advice must not be used as a defense to the
                enforcement of obligations created by this Agreement.
              </p>
            </li>
            <li data-list-text="18.12">
              <p>
                Furthermore, the Client acknowledges that he/she has received a
                copy of this Agreement and agrees to be bound by its terms.
              </p>
            </li>
            <li data-list-text="18.13">
              <p>
                The Client acknowledges that RCIC is not responsible if
                application was submitted on time as per IRCC before midnight
                UTC but submission confirmation from IRCC received next day in
                UTC. RCIC must not be held accountable for any further
                implication including but not limited to missing deadline,
                status expiry due to this IRCC online system error.
              </p>
            </li>
            <li data-list-text="18.14">
              <p>
                The client is aware that IRCC processing time and approvals are
                not in RCIC’s control and timeline frames provided to the client
                is according to IRCC’s website.
              </p>
            </li>
            <li data-list-text="18.15">
              <p>
                The Client acknowledges that he/she has requested that the
                Agreement be written in the English language and that English is
                the binding language.
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
          <p style="font-weight: 600">Contact Information</p>
        </li>
      </ol>
      <p>Client Name</p>
      <p>
        Given Name :  <span class="para_gap">${(felidData && familyJsonArray[0]?.client_first_name ? familyJsonArray[0]?.client_first_name : (emp_user_type === "employee" ? (userData?.name || "") : (userData?.company_name || ""))?.split(" ")[0])} </span>Family Name :
         <span class="para_gap">${(familyJsonArray[0]?.client_last_name ? familyJsonArray[0]?.client_last_name : " ") ?? (emp_user_type === "employee" ? (userData?.name || "") : (userData?.company_name || ""))?.split(" ")[1]} </span>
        Address :  <span class="para_gap">${felidData && felidData.client_address ? felidData.client_address : emp_user_type === "employer" ? (userData?.address || "") : ((userData?.current_location || "") + " " + (userData?.currently_located_country || ""))} </span> Telephone Number :  <span class="para_gap">${felidData && felidData.client_contact ? felidData.client_contact : (userData?.contact_no || "")}
        </span
        >Cellphone Number :
         <span class="para_gap">${(felidData.client_cellphone ? felidData?.client_cellphone : " ") || ""}</span>
        Fax Number :
         <span class="para_gap">${(felidData.client_fax ? felidData?.client_fax : " ") || ""}</span>E-mail Address :  <span class="para_gap">${felidData && felidData.client_email ? (felidData?.client_email || "") : (userData?.email || "")}</span>
      </p>
      <p>RCIC</p>
      <p>
        Given Name: <span> Harpreet </span>   Family Name :<span> Kaur </span>
        Address:<span>2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7</span> Telephone
        Number<span> 403-888-5308</span>
      </p>
      <p>Fax Number</p>
      <p>
        E-mail Address: <a
          href="mailto:info@canpathways.ca"
          class="s19"
          target="_blank"
        >
          info@canpathways.ca
        </a>
      </p>
      <p>
        IN WITNESS THERE OF this Agreement has been duly executed by the parties
        hereto on the date first above written.
      </p>
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
     <p class="para_gap" style="margin: 0"></p>
                  <small class="row ">
                    <span class="col text-capitalize" >
                      ${familyJsonArray[0]?.client_first_name + " " + familyJsonArray[0]?.client_last_name + " "}${familyJsonArray[0]?.date_signature_client}</span>
                  </small>
                      </div>`
      : page === "admin" ? "" : ` <button class="btn btn-outline-secondary border-0  " 
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
            <p class="para_gap" style="margin: 0">
                <span style="max-width: 200px;">${familyJsonArray[0]?.date_signature_client ? familyJsonArray[0]?.date_signature_client : ''}</span>
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
    <p class="para_gap" style="margin: 0"></p>
                  <small class="row ">
                    <span class="col text-capitalize" >
                      ${item.client_first_name + " " + item.client_last_name + " "}${item.date_signature_client}</span>
                  </small>
                      </div>`
        : page === "admin" ? "" : ` <button class="btn btn-outline-secondary border-0  " 
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
            <p class="para_gap" style="margin: 0">
                <span style="max-width: 200px;">${item.date_signature_client ? item.date_signature_client : ''}</span>
            </p>
            <p style="margin: 0 0 30px 0">Date</p>
        </div>`
    ))}

    <!-- RCIC Signature -->
    <div style="width: 50%">
        <p class="para_gap" style="margin: 0">
            <div class="d-flex flex-column">
                       <img
                src="${felidData.rcic_signature ? felidData.rcic_signature : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlsaOgypoEH0TMazy7VqfXMPmVbgD47iezKA&s'}"
                alt="RCIC"
                style="max-width: 200px; float: right;"
                class="${felidData.rcic_signature ? 'd-block' : 'd-none'}"
            />
                  <small class="row ">
                    <span class="col text-capitalize" >
                      Harpreet kaur ${felidData.date_signature_rcic === "0000-00-00 00:00:00" ? '' : felidData.date_signature_rcic}</span>

                  </small>
                      </div>
        </p>
        <p style="margin: 0 0 30px 0">Signature of RCIC</p>
    </div>
    <div style="width: 50%">
        <p class="para_gap" style="margin: 0">
            <span style="max-width: 200px;">Harpreet Kaur</span>
        </p>
        <p style="margin: 0 0 30px 0">Name of RCIC</p>
    </div>
    <div style="width: 50%">
        <p class="para_gap" style="margin: 0">
            <span class=${felidData.date_signature_rcic === "0000-00-00 00:00:00" ? "d-none" : ""} style="max-width: 200px;">${felidData.date_signature_rcic ? felidData.date_signature_rcic : ''}</span>
        </p>
        <p style="margin: 0 0 30px 0">Date</p>
    </div>
</div>

      <h3 style="text-align: center">AUTHORIZATION</h3>
      <p>
        I  <span class="para_gap text-capitalize">${(felidData && (familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name) ? ((familyJsonArray[0]?.client_first_name + " " + (familyJsonArray[0]?.client_last_name || ""))) : (emp_user_type === "employee" ? ((userData?.name || "") || "") : ((userData?.company_name || "") || "")))}</span>( here in after referred to as the “client”),
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
            I understand that
            <span style="color: #010101"
              >The RCIC’s obligations under the Engagement are null and void if
              the Client knowingly provides any inaccurate, misleading or false
              material information. The Client’s financial obligations
              remain</span
            >
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
          <p class="para_gap text-capitalize" style="margin: 0">${(felidData && (familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name) ? ((familyJsonArray[0]?.client_first_name + " " + (familyJsonArray[0]?.client_last_name || ""))) : (emp_user_type === "employee" ? ((userData?.name || "") || "") : ((userData?.company_name || "") || "")))}</p>
          <p style="margin: 0 0 30px 0">Client’s full name</p>
        </div>
        <div style="width: 33.33%; text-align: center">
          <p class="para_gap" style="margin: 0">
           <img
          src=${familyJsonArray[0]?.client_signature ? familyJsonArray[0]?.client_signature : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlsaOgypoEH0TMazy7VqfXMPmVbgD47iezKA&s"}
          alt=${(felidData && (familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name) ? ((familyJsonArray[0]?.client_first_name + " " + (familyJsonArray[0]?.client_last_name || ""))) : (emp_user_type === "employee" ? ((userData?.name || "") || "") : ((userData?.company_name || "") || "")))}
          style="max-width: 200px; float: right"
          class=${familyJsonArray[0]?.client_signature ? "d-block" : "d-none"}
        />
          </p>
          <p style="margin: 0 0 30px 0">Signatures</p>
        </div>
        <div style="width: 33.33%; text-align: center">
          <p class="para_gap" style="margin: 0">${(!familyJsonArray[0]?.date_signature_client || familyJsonArray[0]?.date_signature_client === "0000-00-00 00:00:00") ? "" : moment(familyJsonArray[0]?.date_signature_client).format("DD-MM-YYYY")}</p>
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
        height: "100vh",
        overflow: "auto",
      }}>
      <div dangerouslySetInnerHTML={{ __html: jsxContent }} />
    </div>
  );
};


export default HtmlAgreementOne;
