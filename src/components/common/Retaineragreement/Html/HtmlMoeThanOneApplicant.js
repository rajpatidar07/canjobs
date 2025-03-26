import React from 'react'

export default function HtmlMoeThanOneApplicant({ page,
    felidData,
    userData,
    emp_user_type,
    addSign, }) {
    const familyJsonArray = felidData?.family_json || [];
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
        src="https://canpathwaysjobs.com/image/00logo-main-black.png"
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
<p>3.11 Mode of communication should be email provided by client in this retainer only, for all the correspondence between RCIC and client and RCIC should be given minimum 7 working days to revert to any queries from client. RCIC is not responsible for communication/consequences if client does not receive email sent by RCIC and did not communicate with RCIC in given timeline or within 15 days of sent email. Office: 2618 Hopewell PI NE #310 Calgary, AB TIY 7J7, Canada Tel: 403.888.5308 |
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


</li>
</ol>
</div>
    </div>
</body>
</html>
`
    console.log(felidData, "userData", familyJsonArray, page);
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
