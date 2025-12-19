import React from 'react'

export default function HtmlMoeThanOneApplicant({ page,
    felidData,
    userData,
    emp_user_type,
    addSign, }) {
    // const familyJsonArray = felidData?.family_json || [];
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Retainer Agreement</title>
    <style>
        .header {
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
        }
        .sub-header {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
        }
        .content {
            margin-top: 10px;
        }
        .highlight {
            display: inline-block;
            border-bottom: 1px solid black;
            padding: 0px 2px;
        }
        .applicant-details {
            margin-top: 20px;
        }
        .applicant {
            margin-bottom: 8px;
        }
         table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
            font-size: 14px;
        }
        th {
            text-align: center;
            font-weight: bold;
            color:blue
        }
        .bold {
            font-weight: bold;
        }
        .indent {
            padding-left: 15px;
        }
        .total-cost {
            font-weight: bold;
            color: red;
        }
        .r
    </style>
</head>
 <body style="margin: 0 auto; max-width: 1024px;color:"black;">
    <div class="header" style="padding: 10px 20px;text-align: justify;">
      <img
        src="https://canpathwaysjobs.com/image/Retainer_agreement_logo.png"
        alt="Canpathways logo"
        style="max-width: 200px"
      />
    </div>
    <div class="header">
        <h2>Retainer Agreement</h2>
    </div>
    <div class="sub-header">
        <span>RCIC Membership Number: <span class="highlight" style="min-width: 200px;">R533393</span></span>
        <span>Client File Number: <span class="highlight" style="min-width: 100px;">369</span></span>
    </div>
    <div class="content">
        <p>This Retainer Agreement is made this <span class="highlight" style="min-width: 20px;">02</span> day of <span class="highlight"style="min-width: 100px;">August</span> 2024 between Regulated Canadian Immigration Consultant (RCIC) <strong>Harpreet Kaur</strong> (the "RCIC"), RCIC Membership Number <strong>R533393</strong>, phone number <strong>4038885308</strong>, email <strong>info@canpathways.ca</strong> located at <strong>2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada</strong> and Client <span class="highlight">              </span>, located at <span class="highlight">Address</span>, email <span class="highlight">Email</span>, contact number <span class="highlight">Phone Number</span>.</p>
    </div>
    <div class="applicant-details">
        <h5>Details of Applicants and Dependents to be added in this application:</h5>
        <div class="applicant row">
            <span class="col-6 w-100">Principal Applicant: <span class="highlight"style="min-width: 300px;">Jyoti Moni Singh</span></span>
            <span class="col-6 w-100">Date of Birth: <span class="highlight"style="min-width: 300px;"></span></span>
        </div>
        <div class="applicant row">
            <span class="col-6 w-100">Name of the Spouse: <span class="highlight" style="min-width: 300px;">Sanjeev Kumar</span></span>
            <span class="col-6 w-100">Date of Birth: <span class="highlight"style="min-width: 300px;"></span></span>
        </div>
        <div class="applicant row">
            <span class="col-6 w-100">Name of Dependent Child: <span class="highlight"style="min-width: 250px;"></span></span>
            <span class="col-6 w-100">Date of Birth: <span class="highlight"style="min-width: 300px;"></span></span>
        </div>
        <div class="applicant row">
            <span class="col-6 w-100">Additional Dependent Child Name: <span class="highlight"style="min-width: 200px;"></span></span>
            <span class="col-6 w-100">Date of Birth: <span class="highlight"style="min-width: 300px;"></span></span>
        </div>
    </div>
    <div class="applicant-details">
    <div>
    <p>WHEREAS the RCIC and the Client wish to enter into a written agreement which contains the agreed upon terms and
    conditions upon which the RCIC will provide his/her services to the Client.<br><br>
    AND WHEREAS the RCIC is a member College of Immigration and Citizenship Consultants (the "Council"), the regulator
    in Canada for immigration consultants;<br><br>
    IN CONSIDERATION of the mutual covenants contained in this Agreement, the parties agree as follows:<br><br>
    <p>
<ol>
    <li>Definitions<br><br>
        <p>The terms set out in this Retainer Agreement, have the meaning given to such terms in the Retainer Agreement
            Regulation and By-law of the Council, as amended from time to time.</p><br><br>
    </li>
    <li>RCIC Responsibilities and Commitments<br><br>
        <p>The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of
        <span class="highlight"style="min-width: 900px;">Spousal Open Work Permit Application</span>
        </p>
        <p>In consideration of the fees paid and the matter stated above, the RCIC agrees to do the following:
:<br><br>
<p>
a) [Summary of preliminary advice given to the client<br>
b) [Consultation and providing document checklists and intake sheet, file opening]<br>
c) [Data gathering, filling out forms]<br>
d) [Information verification, completeness check]<br>
e) [Application submission]
<br>
f) [File maintenance and correspondence with client and IRCC]<br>
</p>
<p>The RCIC shall provide the Client with a finalized, signed copy of this Retainer Agreement.<br><br>
RCIC is not responsible for any documentation or information provided by client to IRCC in any of the previous applications therefore shall not be held responsible/liable for it.RCIC will be providing services in English Language.<br></p>
RCIC will return any original document that the client proves as soon as the purpose for which the documents were taken is complete. (RCICs are required to provide a copy of the Code to the client.) 3 Code s.24(3)(c) 4 Code 5.24(3)(d) 5 Code 5.24(3)(e) 6 Code s.24(3)(u)<br><br>
</p>
<p>
The RCIC is obligated to provide professional, ethical, and competent services as per the Code of Professional Conduct of the College. A copy of the Code has been provided to the client(s).<br>
<a href="https://laws.justice.gc.ca/eng/regulations/SOR-2022-128/index.html">https://laws.justice.gc.ca/eng/regulations/SOR-2022-128/index.html</a>
</p>
    </li>
    <li>Client Responsibilities and Commitments<br><br>
    <p>
3.1. The Client must provide, upon request from the RCIC:
<ul>
<li>All necessary documentation</<li>
<li>All documentation in English or French, or with an English or French translation</<li>
</ul>
</p>
<p>
32.  The Client understands that he/she must be accurate and honest in the information he/she provides and that any misrepresentations or omissions may void this Agreement, or seriously affect the outcome of the application or the retention of any immigration status he/she may obtain. The RCIC's obligations under the Retainer Agreement are null and void if the Client knowingly provides any inaccurate, misleading or false material information. The Client's financial obligations remain.
</p>
<p>33.  Client is informed that RCIC might obtain assistance from other professionals or services.</p>
<p>34.  Client understands that RCIC should not be held responsible for visa outcome as RCIC cannot guarantee the decision of IRCC. If IRCC policy or rules changes before during or after the application submission and client deemed ineligible, RCIC should not be held responsible for that.
</p>
<p>35.  In the event Immigration, Refugees and Citizenship Canada (IRCC) or Employment and Social Development Canada (ESDC) or Provincial Government Administrator or processing Visa Office should contact the Client directly, the Client is instructed to notify the RCIC immediately.
</p>
<p>36.  The Client is to immediately advise the RCIC of any change in the marital, family, or civil status or change of physical address or contact information for any person included in the application.
</p>
<p>37.  In the event of a Joint Retainer Agreement, the Clients agree that the RCIC must share information simong all chents, as required. Furthermore, if a conflict develops that cannot be resolved, the RCIC cannot continue to act for both or all of the Clients and may have to withdraw completely from representation
</p>
<p>38.  All necessary information and documentation in English or French, or with an English or French translation, if in any other language, with a certified English translation, according to the tinseline recommended by RCIC In the event documents are not provided or client fals to contact the RCIC in spite of request made by RCIC on email provided by client in the retainer agreement, before the due date mentioned (which is within 30 days from the retainer signed, ard, or carlier also depending upon the requirezneurs of the case) the RCIC can close the file aller notifying the client in advance about the non-responuvaiess. An admitustrative fee of CAD$ 300.00 ples taxes should be paid by client to close the file. All pending fees we due and are to be paid by client and if there is any moaned moticy with RCIC. it should be refunded to chant if applicable
</p>  
<p>
3.9 Client has been explained by RCIC and is aware of high chances of application refusal due to weak case and other reasons as explaindas Client still agrees to go ahead with the application.

<p>3.10 The client also allows the RCIC use of digital signatures for the purpose of this application on his/her behalf</p>
<p>3.11 Mode of communication should be email provided by client in this retainer only, for all the correspondence between RCIC and client and RCIC should be given minimum 7 working days to revert to any queries from client. RCIC is not responsible for communication/consequences if client does not receive email sent by RCIC and did not communicate with RCIC in given timeline or within 15 days of sent email. Office: 2618 Hopewell Pl NE #310, Calgary, AB T1Y 7J7 Tel: 403.888.5308 |
</p>
<p>3.12 Once client provide all the documents required as per checklist, RCIC should be given minimum 3 weeks' time from the time all documents are reviewed by RCIC and deemed complete, to submit the file to IRCC.
</p>
</li>
<li class="mb-5">Payment Terms and Conditions
   
<div class="m-5"> 
<p>Billing method: The Client will be billed by [flat fee with payment by milestones].<br><br>  
Payment Terms and Conditions
</p>  
 <table>
        <tr>
            <th>Fees details</th>
            <th>Amount (CAD)</th>
        </tr>
        <tr>
            <td class="bold">Professional Fees</td>
            <td>$2000 (Service Charges)</td>
        </tr>
        <tr>
            <td class="bold">Disbursement:</td>
            <td class="right-align">$2100.00 (Service Charges for Spousal Open Work Permit) + 5% QST</td>
        </tr>
        <tr>
            <td class="indent">Courier charges</td>
            <td></td>
        </tr>
        <tr>
            <td class="bold">Government fees</td>
            <td class="right-align">$155 + $100 (Application Fees for SOWP) = $255</td>
        </tr>
        <tr>
            <td class="bold">Administrative fee (as required)</td>
            <td></td>
        </tr>
        <tr>
            <td class="bold">Applicable Taxes: 5%</td>
            <td class="right-align">$100 (5% GST on service Charges)</td>
        </tr>
        <tr>
            <td class="bold">Balance (Paid at time of filing):</td>
            <td class="right-align">$2000 (Service Charges) + $100 (5% GST) + $255 (Government Application Fees)</td>
        </tr>
        <tr>
            <td class="total-cost">Total Cost</td>
            <td class="total-cost right-align">$2355</td>
        </tr>
    </table>
    </div>

    <p><strong>Invoice Frequency:</strong> The RCIC must provide an invoice to the Client.</p>
    <p><strong>Note:</strong> The courier charges and Government fees are based on current rates and may change anytime on or before submission.</p>

<div>
 <table>
        <tr>
            <th>RCIC Service Milestone</th>
            <th>Estimated date of Completion</th>
            <th>Professional Fees (Non-Refundable)</th>
            <th>Applicable Retainer Fee for this stage (Non-Refundable)</th>
            <th>Applicable Government Processing Fee
</th>
        </tr>
        <tr>
            <td class="bold">Completes upon signing the retainer and sharing the checklists and intake sheet with client. Data gathering, filling out the forms, information verification and completeness check preparing the application package and payment is due before final submission of application. Provide proof of submission to the client</td>
            <td></td>
            <td>All payments made are non-refundable and total service charges to be collected regardless, whether the client withdraw from the file at this stage The government fee and courier charges must be paid apart from professional fees payment scheduled at this stage</td>
            <td class="text-center">$2100.00 <br>(Service charges 5% GST)</td>
            <td class="text-center">$255.00 <br>(Government Application Fees)</td>
        </tr>
    </table>
    <h6 class="mt-2">Total Amount: (Non-Refundable) $2355 00
</h6>
<div>
<p>Note :</p>
<ul>
<li>There will be an additional fee, or a new fee arrangement will be agreed upon for government's any further request for additional information/documentation of up to $1000.00 such as updating the forms, asking for immigration status update, documents related to marital status change, procedural fairness response or preparing and submitting statutory declarations, affidavits etc.</li>
<li>If a fee has been quoted in this Retainer, then, while the RCIC expects that his fee will not exceed the amount quoted, the RCIC reserves the right to charge more in appropriate cases, such as immediate and pressing circumstances, the requirement for work outside normal business hours, or other special demands made by client.</li>
<li>The RCIC reserves the right to alter the amount of the final account to reflect the remaining balance of the fees owed plus any Disbursements and fees for additional services to which the parties previously agreed.</li>
<li>For application delayed or abandoned beyond 90 days, client is subjected to $350 fee plus applicable taxes to resume the file.</li>
<li>Full services charges to be paid by client if client decided to withdraw/discharge representation at second/last stage of application.</li>
<li>Fees charges by Canadian government for application processing has to be paid by client.</li>
</ul>
</div>
</div>
</li>
<li>Methods of Payment: We DO NOT accept cheques.
<p>
<b class="highlight" >For Clients Located INSIDE Canada, we receive the following methods:</b>
</p>
<ul>
<li><b>In-person Cash Drop-Off</b>-Please contact us to arrange a time to drop off your payment in cash. We will provide you with a receipt.</li>
<li>E-transfer-Please send the payment and the answer to the secret question to the following e-mail address:<a href="accounts@canpathways.com"> accounts@canpathways.com</a>
</li>
<li><b>Credit Card/PayPal</b>: Instructions will be shared, additional up to 3% charges will be applicable if the client is willing to pay by this method.</li>
</ul>
<p>
<b class="highlight" >For Clients Located OUTSIDE Canada, we receive the following method:</b>
</p>
<ul>
<li><b>Wire Transfer</b>- Bank details will be provided once the contract is being signed. (*Banks usually charge a processing fee for wire transfer, so please add CAD $50 fee on top of your payment EVERY TIME you make a wire transfer,</li>
<li><b>al</b> : Instructions will be shared, additional up to 5% charges will be applicable if the client is willing to pay by this method.</li>
</ul
</li>
<li>Interest
<p>
Payment is due on all of the consultant's accounts when rendered. If any account is not paid within 30 days, interest will be charged on outstanding balance at the rate of 20% per annum from the date of the account, until paid. If the account requires recovery/collection action, in order to recover any fees, a surcharge equivalent to the recovery/collection fee incurred will be applied on the Total Cost and is to be paid by the Client
</p>
</li>
<li>Refund policy
<p>The Client acknowledges that the granting of a visa or status and the time required for processing this application is at the sole discretion of the government of Canada (or Government Authorities) and not the RCIC. Furthermore, the Client acknowledges that fees are not refundable in the event of an application refusal.
<br><br>
If, however, the RCIC or professional staff do not complete the tasks identified under section 2 of this Agreement, the RCIC will refund part or all of the professional fees collected. The Client agrees that the professional fees paid are for services indicated above, and any refund is strictly limited to the amount of professional fees paid.
</p>
<p>
RCIC will not refund any fee paid by the client if
<ul>
<li>Cancellation by the applicant of the immigration application for any reason whatsoever after the signature on the contract
</li>
<li>Later modification in government regulations that is out of control
</li>
<li>Hiding information or submission of false documents
</li>
<li>Disregarding RCIC's instructions
<li>
Not providing required documents within given time frame
</li>
</ul>
If application is refused because of an error or omission on the part of the RCIC or the professional staff, Unused and/or unearned fees will be refunded in accordance with the Client File Management Regulation, the Client Account Regulation and the Retainer Agreement Regulation and in the following manner:<br> <span class="highlight" style="min-width:1000px">Cheque</span><br><br>
[describe the manner of refund, including method and timeframe]<br><br>
There shall be no refund due if the application is not submitted, refused, returned, or cannot proceed due to
</p>
</li>
<li>Invoice
<p>The RCIC will provide invoices, which include:
<ul>
<li>the name and address of the Client,
</li>
<li>a list of services rendered,
</li>
<li>the date(s) the services were rendered, and
</li>
<li>the total fees and applicable taxes payable to the Member for the services rendered.</li>
</ul><br>
Invoices must be provided to the Client in accordance with the payment terms and conditions, found in section
<br>
5 of this Retainer Agreement. Additionally, upon the RCIC withdrawing or being discharged from representation, the RCIC must provide the Client with Statement of Account detailing all services that have been rendered or accounting for the time that has been spent on the Client's file.
</p>
</li>
<li>Dispute Resolution Related to the Code of Professional Ethics
<p>
In the event of a dispute related to the Professional Services provided by the RCIC, the Client and RCIC are to make every reasonable effort to resolve the matter between the two parties. In the event a resolution cannot be reached, the Client is to present the complaint in writing to the RCIC and allow the RCIC 30 days to respond to the Client. In the event the dispute is still unresolved, the Client may follow the complaint and discipline procedure outlined by the Council on their website: www.icere-ercic.ca.<br><br>
ICCRC Contact Information:
<br>
Immigration Consultants of Canada Regulatory Council (ICCRC)
<br>
5500 North Service Rd., Suite 1002 Burlington, ON, L7L 6W6
<br>
Toll-free: 1-877-836-7543
</p>
</li>
<li>
Confidentiality
<p>All information and documentation reviewed by the RCIC, required by IRCC and all other governing bodies, and used for the preparation of the application will not be divulged to any third party, other than agents and employees of the RCIC, without prior consent, except as demanded by the Council or required under law. The RCIC, and all agents and employees of the RCIC, are also bound by the confidentiality requirements of Article 8 of the Code of Professional Ethics.
<br><br>
The Client agrees to the use of electronic communication and storage of confidential information. The RCIC will use his/her best efforts to maintain a high degree of security for electronic communication and information storage.
<br>
The client must file a written authorization with the RCIC, naming the person if client wishes another person or family member to be able to access information on a file.
</p>
</li>
<li>
Unplanned RCIC Absence
<p>
In the event the Client is unable to contact the RCIC and has reason to believe the RCIC may be dead, incapacitated, or otherwise unable to fulfill his/her duties, the Client should contact ICCRC</p></li>
<li>Force Majeure
<p>
The RCIC's failure to perform any term of this Retainer Agreement, as a result of conditions beyond his/her control such as, but not limited to, governmental restrictions or subsequent legislation, war, strikes, or acts of God, shall not be deemed a breach of this Agreement. 
</p></li>
<li>Change Policy
<p>
The Client acknowledges that if the RCIC is asked to act on the Client's behalf on matters other than those outlined above in the scope of this Agreement, or because of a material change in the Client's circumstances, or because of material facts not disclosed at the outset of the application, or because of a change in government legislation regarding the processing of immigration or citizenship-related applications, the Agreement can be modified accordingly.
<br><br>    
This Agreement may only be altered or amended when such changes are made in writing and executed by the parties hereto. All changes and/or edits must be initialed and dated by both the Member and the Client. Any substantial changes to this agreement may require that the parties enter into a new Retainer Agreement.
</p></li>
</ol>
</div>
    </div>
</body>
</html>
`
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
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>)
}
