import React, { useEffect } from 'react'
import moment from 'moment/moment';
export default function EmployerRetainerAgreement({ page,
    felidData,
    userData,
    emp_user_type,
    addSign,
}) {
    const familyJsonArray = felidData?.family_json || [];

    console.log(felidData, "userData", familyJsonArray, page);

    const jsxContent = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Retainer Agreement</title>
    <meta name="author" content="Admin" />
    <style>
        .container {
            margin: 20px;
            line-height: 1.6;
        }
        .header {
            font-weight: bold;
            padding: 10px 20px;
            text-align: justify;
        }
        .highlight {
            font-weight: bold;
            text-decoration: underline;
        }
        .client-info {
            padding: 5px;
        }
        .para_gap {
            border-bottom: 1px solid grey;
            display: inline-block;
        }
        td {
            border: 1px solid #333;
            padding: 5px;
        }
        .d-flex {
            display: flex;
            justify-content: end;
            gap: 4rem;
        }
    </style>
</head>

   <body style="margin: 0 auto; max-width: 1024px;color:"black;">
    <div class="header">
        <img src="https://canpathwaysjobs.com/image/00logo-main-black.png" alt="Canpathways logo" style="max-width: 200px;" />
    </div>
    <div class="content" style="padding: 10px 20px; text-align: justify;">
        <h2 class="text-center">Retainer Agreement</h2>
        <div class="container">
            <p><strong>RCIC Membership Number:</strong> <span class="highlight">R533393</span> &nbsp;&nbsp;
                <strong>Client File Number:</strong> <span class="highlight">383</span></p>

            <p>
                This Retainer Agreement is made this <strong>19</strong> day of <strong>August 2024</strong> between
                Regulated Canadian Immigration Consultant (RCIC) Harpreet Kaur (the “RCIC”), RCIC Membership Number
                <span class="highlight">R533393</span>, phone number <strong>4038885308</strong>, email
                <strong>info@canpathways.ca</strong>, located at <strong>2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7,
                    Canada</strong> and Client
                <span class="highlight">
                    ${familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name
            ? `<span class="para_gap">${familyJsonArray[0]?.client_first_name} ${familyJsonArray[0]?.client_last_name || ""}</span>`
            : emp_user_type === "employee"
                ? `<span class="para_gap">${userData?.name}</span>` || ""
                : "_____________________"}
                </span>
                (the “Client”), located at
                <span class="client-info">
                    ${felidData?.client_address
            ? `<span class="para_gap">${felidData?.client_address}</span>`
            : emp_user_type === "employer"
                ? userData?.address || ""
                : `<span class="">${userData?.current_location || ""}, ${userData?.currently_located_country || "________________"}</span>`}
                    , email ${felidData?.client_email || userData?.email || "_________________"}, contact number
                    <span class="client-info">${felidData?.client_contact || userData?.contact_no || "_________________"}</span>.
                </span>
            </p>

            <p>WHEREAS the RCIC and the Client wish to enter into a written agreement  which contains the agreed upon terms
            and conditions upon which the RCIC will provide his/her services to the Client.
            </p>
            <p>AND WHEREAS the RCIC is a member College of Immigration and Citizenship Consultants
            (the"Council"), the regulator in Canada for immigration consultants;
            </p>
            <p>
            IN CONSIDERATION ofthe mutual covenants contained in this Agreement, the parties agree as follows:
            </p>
            <ol>
            <li>
            <h6><b>Definitions</b></h6>
            <p>The terms set out in this Retainer Agreement, have the meaning given to such terms in the Retainer Agreement
            Regulation and By-law of the Council, as amended from time to time.
            </p></li>
           <li>
            <h6><strong>RCIC Responsibilities and Commitments</strong></h6>
            <p>The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of <br>
            <span style="min-width:500px" class="highlight">${felidData?.matter || ""}</span>
</p>
<small>In consideration of the fees paid and the matter stated above, the RCIC agrees to do the following:
</small>
            <ul type="a">
                <li>[Summary of preliminary advice given to the client ${felidData?.summary
            ? `<span class="para_gap">${felidData?.summary || ""
            }</span>`
            : "If any_____________________________"
        }]</li>
                <li>[Consultation on providing document checklists and intake sheet, file opening]</li>
                [Consultation and providing document checklists and intake sheet, file opening]
                <li>[Data gathering, filling out forms]</li
                <li>[Information verification, completeness check]</li
                <li>[Application submission]</li
                <li>[File maintenance and correspondence with client and IRCC]</li
            </ul>
            <p>
            The RCIC shall provide the Client with a finalized, signed copy of this Retainer Agreement. RCIC is not responsible
                for any documentation or information provided by client to IRCC in any of the previous applications therefore shall
                not be held responsible/liable for it.RCIC will be providing services in English Language.<br><br>
                RCIC will return any original document that the client provides as soon as the purpose for which the documents were
                taken is complete.(RCICs are required to provide a copy of the Code to the client.) 3 Code s.24(3)(c) 4 Code s.24(3)(d)
                5 Code s.24(3)(e) 6 Code s.24(3)(u)<br><br>
                The RCIC is obligated to provide professional, ethical, and competent services as per the Code of Professional
                Conduct of the College. A copy of the Code has been provided to the client(s).<br>
                <a href="https://laws.justice.gc.ca/eng/regulations/SOR-2022-128/index.html">https://laws.justice.gc.ca/eng/regulations/SOR-2022-128/index.html</a>
                </p>
             </li>
             <li>
             <h6><b>Client Responsibilities and Commitments</b></h6>
             <p>
             3.1 The Client must provide, upon request from the RCIC:
                <ul>
                <li>All necessary documentation</li
                <li>All documentation in English or French, or with an English or French translation.</li
                </ul>
                </p>
                <p>3.2 The Client understands that he/she must be accurate and honest in the information he/she provides
                and that any misrepresentations or omissions may void this Agreement, or seriously affect the outcome
                of the application or the retention of any immigration status he/she may obtain. The RCIC's
                obligations under the Retainer Agreement are null and void if the Client knowingly provides any
                inaccurate, misleading or false material information. The Client's financial obligations remain.</p>
                <p>3.3 Client is informed that RCIC might obtain assistance from other professionals or services.
</p>
                <p>3.4 Client understands that RCIC should not be held responsible for visa outcome as RCIC cannot
guarantee the decision of IRCC. If IRCC policy or rules changes before/during or after the application
submission and client deemed ineligible, RCIC should not be held responsible for that.</p>
                <p>3.5 In the event Immigration, Refugees and Citizenship Canada (IRCC) or Employment and Social
Development Canada (ESDC) or Provincial Government Administrator or processing Visa Office
should contact the Client directly, the Client is instructed to notify the RCIC immediately.</p>
                <p>3.6 The Client is to immediately advise the RCIC of any change in the marital, family, or civil status or change of physical address or contact information for any person included in the application.</p>
                <p>3.7 In the event of a Joint Retainer Agreement, the Clients agree that the RCIC must share information
among all clients, as required. Furthermore, if a conflict develops that cannot be resolved, the RCIC
cannot continue to act for both or all of the Clients and may have to withdraw completely from
representation.
</p>
                <p>3.8 ll necessary information and documentation in English or French, or with an English or French translation, if
in any other language, with a certified English translation, according to the timeline recommended by RCIC. In
the event documents are not provided or client fails to contact the RCIC in spite of request made by RCIC on
email provided by client in the retainer agreement, before the due date mentioned (which is within 30 days
from the retainer signed, or earlier also depending upon the requirements of the case) the RCIC can close the
file after notifying the client in advance about the non-responsiveness. An administrative fee of CAD$ 300.00
plus taxes should be paid by client to close the file. All pending fees are due and are to be paid by client and if
there is any unused money with RCIC, it should be refunded to client if applicable.
</p>
                <p>3.9 Client has been explained by RCIC and is aware of high chances of applicationrefusal due to weak case and
other reasons as explained. Client still agrees to go ahead with the application.</p>
                <p>3.10 The client also allows the RCIC to use of digital signatures for the purpose of this application on his/her behalf
</p>
                <p>3.11 Mode of communication should be email provided by client in this retainer only, for all the
correspondence between RCIC and client and RCIC shouldbe given minimum 7 working daysto
revert to any queries from client. RCIC is not responsible for communication/consequences if
client does not receive email sent by RCIC and did not communicate with RCIC in given timeline
or within 15 days of sent email.</p>
                <p>3.12 Once client provide all the documents required as per checklist, RCIC should be given minimum 3
weeks' time from the time all documents are reviewed by RCIC and deemed complete, to submit
the file to IRCC.
</p>
                <p>
                Payment Schedule<br>
Billing method: The Client will be billed by [flat fee with payment by milestones]. Payment Terms and Conditions</p>
<p>
Invoice Frequency: The RCIC must provide an Invoice to the Client
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
                <td style="border: 1px solid black; text-align: center" >${felidData?.professional_fees || ""
        }</td>
              </tr>
           <tr>          <td style="text-align: center; border: 1px solid black">Disbursment</td>  
           <td style="border: 1px solid black ; text-align: center">${felidData?.disbursment || ""
        }</td>
               </tr>
             
              <tr>
                <td style="border: 1px solid black; text-align: center">Discount</td>
                <td style="border: 1px solid black; text-align: center">${felidData?.government_fees || ""
        }</td>
              </tr>
              <tr>
                <td style="border: 1px solid black; text-align: center">Government fees</td>
                <td style="border: 1px solid black; text-align: center">${felidData?.government_fees || ""
        }</td>
              </tr>
              <tr>
                <td style="text-align: center; border: 1px solid black">
                  Administrative fee [as required]
                </td>
                <td style="border: 1px solid black">${felidData?.administrative_fee || ""
        }</td>
              </tr>
              <tr>
                <td style="text-align: center; border: 1px solid black">
                  Applicable Taxes: ${felidData?.gst || "0"}%
                </td>
                <td style="border: 1px solid black">${felidData?.application_fees || ""
        }</td>
              </tr>
              <tr>
                <td style="text-align: center; border: 1px solid black">
                  Balance (Paid at time of filing):
                </td>
                <td style="border: 1px solid black">${felidData?.balance || ""
        }</td>
              </tr>
              <tr>
                <td style="text-align: center; border: 1px solid black;color:red">
                  <b>Total Cost</b>
                </td>
                <td style="border: 1px solid black">${felidData?.total_cost || ""
        }</td>
              </tr>
            </tbody>
          </table>
                <p></p>
                <p></p>
             </li>
             </ol>
        </div>
    </div>

    <div class="d-flex">
        <h3>Initials:</h3>
        <div>
            <div style="width: 100px; height: 50px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
                ${felidData?.initial
            ? `<span class="text-capitalize">${felidData?.initial?.split(" ")?.map(word => word[0]).join(" ")}</span>`
            : `<span style="width: 100px; height: 50px; display: inline-block;"></span>`}
            </div>
        </div>
    </div>
</body>
</html> `;

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
    )
}
