import React, { useEffect } from "react";

const HtmlRenewalApplication = ({
  page,
  felidData,
  userData,
  emp_user_type,
  addSign,
}) => {
  const familyJsonArray = felidData?.family_json || [];

  console.log(userData, "userData");

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
    <div class="content" style="padding: 10px 20px;text-align: justify;">
        <h2 class="font-weight-bold text-blue mb-4 mt-4 text-capitalize text-primary font-size-6">Can Pathways Immigration Consultancy Limited</h2>
        <p class="m-0">2618 Hopewell PI NE #310 Calgary,</p>
        <p class="m-0">AB TlY7J7, Canada</p>
        <p class="m-0">Tel: +1. (403)888 5308 </p>
        <p class="m-0">Email: <a href="mailto:info@canpathwaysjobs.com">info@canpathwaysjobs.com</a></p>
        <p class="m-0"> <a href=www.canpathwaysjobs.com">https://canpathwaysjobs.com</a></p>
    </div>
    <div class="content" style="padding: 10px 20px;text-align: justify;">
        <h2 class="font-weight-bold text-black text-center mb-4 mt-4 text-capitalize text-primary font-size-6">Retainer Agreement</h2>
        <p class="m-0">THIS RETAINER AGREEMENT is made on <span class="border-bottom border-dark">${new Date().toDateString()}</span></p>
        <p class="m-0">Program : <b>: Application for Rural Renewal Stream (Innisfail) and Endorsement Letter</b></p>
        <h3 class="font-weight-bold font-size-6 ">1. Contact Information</h3>
        <h4 class="font-weight-bold font-size-5">Between Client</h4>

        <ul>
            <li>Name Of Client: <span class="border-bottom border-dark" style="min-width: 300px;">${
              felidData?.name ? felidData?.name : userData?.name || ""
            }</span>(hereinafter called the "Client")</li>
            <li>Name of Business: <span class="border-bottom border-dark" style="min-width: 300px;">${
              felidData?.company_name
                ? felidData?.company_name
                : userData?.company_name || ""
            }</span>(hereinafter called the "Client")</li>
            <li>Business Address: <span class="border-bottom border-dark" style="min-width: 300px;">${
              felidData?.address ? felidData?.address : userData?.address || ""
            }</span></li>
            <li>Phone: <span class="border-bottom border-dark" style="min-width: 300px;">${
              felidData?.phone ? felidData?.phone : userData?.phone || ""
            }</span></li>
            <li>Email: <span class="border-bottom border-dark"style="min-width: 300px;">${
              felidData?.email ? felidData?.email : userData?.email || ""
            }</span></li>
</ul>
            <h4 class="mt-4 font-size-5">And</h4>
            <div>
           <h4>Regulated Canadian Immigration Consultant (RCIC):</h4>
           <p><b>Harpreet Kaur</b> ( hereinafter called 'The RCIC')</p>
           <p>2618 Hopewell PI NE #310</p>
              <p>Calgary, AB T1Y7J7, Canada</p>
                <p>Tel: +1. (403)888 5308</p>
                <p>Email: <a href="mailto:info@canpathways.ca"> info@canpathways.ca</a></p>
                <p>Website: <a href="www.canpathways.ca">www.canpathways.ca</a></p>
            </div> 

            <h3 class="font-size-6 ">2. RCIC Responsibilities and Commitments</h3>
            <p>The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of the Client's applications for
Application for Rural Renewal Stream and Endorsement Letter from Rural Community of business location + Recruitment (if applicable) </p>

<p> In consideration of the fees paid and the matter stated above, the RCIC agrees to do the following, with the assistance of the RClC's employees, as required:</p>
<ul>
<li> 	Advise the client as to which documents are required in support of the application;</li>
<li> 	Act in the best interests of the Client within the limits of Canadian law;</li>
<li> 	Guide the Client through the application process and review all documents to ensure consistency and accuracy;</li>
<li> 	Submit the Client's application package to the appropriate offices;</li>
<li> 	Apprise the Client on the progress of his/her application;</li>
<li> 	Handle all correspondencewith Rural Community of business location on the Client's behalfin respect to the application;</li>
<li> 	Liaise between the Canadian government and the Client;</li>
<li> 	Prepare the Client in advance if an Interviewwithan officer of Rural Community of business location is requested.</li>
<li> 	Perform all duties on behalf of the Client competently and professionally.</li>
</ul>

<div class="d-flex justify-content-end gap-4" style="gap: 4rem;">
<h3 class="font-size-6 text-end">Initials :</h3>
<div>
<span class="border-bottom border-dark" style="min-width: 100px;">${
    felidData?.initials || ""
  }</span>
<h4 class="font-size-6 text-end">RCIC</h4></div>
<div>
<span class="border-bottom border-dark" style="min-width: 100px;">${
    felidData?.initials || ""
  }</span>
<h4 class="font-size-6 text-end">Clients</h4></div>
</div>
<div>
 <h3 class="font-weight-bold font-size-6 ">3.	Client Responsibilities and Commitment</h3>
 <p>Upon the request from the RCIC, The Client must:</p>
<ul>
<li> 	Provide all necessary documentation in English, or with an English translation, within the prescribed timeframe.</li>
<li> 	Follow the instructions and advice provided by the RCIC within the prescribed timeframe.</li>
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
<p>The RClC's obligations under the Retainer Agreement are null and void if the Client knowingly provides any inaccurate, misleading, orfalse material information.The Client's financial obligations remain.</p>
 </div>

 <div>
  <h3 class="font-weight-bold font-size-6 ">4.	Billing Method and Payment Terms and Conditions</h3>
  <p>The Clientwill be billed bya flat fee with payment bymilestones. The details of this billing method are as follows:</p>
 <p>The Client agrees to pay to the RClC a Professional Fee of<b>CAD $5500</b>b, for the services rendered to the Client in applying to <b>Rural Community of business location for </b><b>Application for Rural Renewal Stream and Endorsement Letter.</b></p>
<p>The Professional Fee is solely for the services performed by the RCIC and does not include govemment fees or any other fees. Additional charges may be applied if the Client delays in providing necessary information and/or documentationto the RCIC, resulting in the RCIC having to change or modify the application.</p>
<p>The Client agrees to pay for additional courier fees.<p/>
<p>Potential costs will apply for additional or new work requested such as additional documentation, applications; redo Rural Community of business location forms after being completed if Rural Community of business location changes forms before submitting; additional follow-up work created by delayed, incomplete, or no response from the Client; additional 'rush' work created by submitting documents requested by Rural Community of business location with less than 5 days left to the Rural Community of business location deadline given; responses to Rural Community of business location requests or challenges that require more than one hour for any single request; requests for unnecessary meetings and frequent updates on the application.<p/><div class="d-flex justify-content-end gap-4" style="gap: 4rem;">
<h3 class="font-size-6 text-end">Initials :</h3>
<div>
<span class="border-bottom border-dark" style="min-width: 100px;">${
    felidData?.initials || ""
  }</span>
<h4 class="font-size-6 text-end">RCIC</h4></div>
<div>
<span class="border-bottom border-dark" style="min-width: 100px;">${
    felidData?.initials || ""
  }</span>
<h4 class="font-size-6 text-end">Clients</h4></div>
</div> 
<div>
<h3 class="font-weight-bold font-size-6 ">5. Payment Schedule</h3>
<p><b>Total service charges</b> $5500+ 5%GST</p>
<p>*Taxes are payable wherever applicable. The above fee does not include any fees payable to the govemment of Canada. While the above fees are non-refundable — if for any reason agreement is terminated any un-used part of fees with be refunded after deduction of any costs. The client may specify the method of refund.</p>

<p>Additional fees that is involved in this process are as follows.</p>
<p><span class="font-weight-bold pr-2 " style="color: green;">✓</span>Job Advertisement fee for each occupation (2 paid Job Ads)	     <b>CAD 300.00</b></p>
<p><span class="font-weight-bold pr-2 " style="color: green;">✓</span>Recruitment charges per applicant (if applicable)	<b>CAD 1000.00</b></p>
</div>

<div> 
<h3 class="font-weight-bold font-size-6 ">6. Methods of Payment: We DO NOT accept cheques.
</h3>
<p>For Clients Located <b>INSIDE</b> Canada, we receive the following methods:</p>
<ul>
<li> 	In-person Cash Drop-Off — Please contact us to arrange a time to drop off your payment in cash. We will provide you with a receipt.</li>
<li> 	E-transfer — Please send the payment and the answer to the secret question to the following e-mail address: info@canpathwavs.ca</li>
<li> 	Credit CardlPayPal: Instructions will be shared, additional up to 3% charges will be applicable if the client is willing to pay by this method.</li>
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
<li></li>
</ul>
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
  );
};

export default HtmlRenewalApplication;
