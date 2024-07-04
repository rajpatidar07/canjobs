import React from 'react'

export default function HtmlAgreementThree() {
    let htmlOntent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Public policy allowing certain visitors in Canada to apply for an employer-specific work permit</title>
</head>
<body>
    <header>
        <h3>Public policy allowing certain visitors in Canada to apply for an employer-specific work permit</h3>
    </header>
    <nav>
        <ul>
            <li><a href="#policy-objectives">Policy objectives</a></li>
            <li><a href="#eligibility-requirements">Eligibility requirements</a></li>
            <li><a href="#interim-authorization">Eligibility requirements for interim authorization to work</a></li>
            <li><a href="#work-permit-application">Receipt of work permit application</a></li>
            <li><a href="#interim-work-authorization">Foreign national seeking interim work authorization</a></li>
            <li><a href="#processing-requests">Processing of public policy requests</a></li>
        </ul>
    </nav>
    <section id="policy-objectives">
        <h5>Policy objectives</h5>
        <p>This public policy will</p>
         <ul>
            <li>permit eligible foreign nationals with valid temporary resident status as visitors to apply for a job offer-supported work permit from inside Canada</li>
            <li>exempt eligible foreign nationals from the requirement that a work permit not be issued if they have not complied with certain temporary residence conditions</li>
            <li>allow eligible former temporary foreign workers to work while a decision on their work permit application is pending</li>
        </ul>
    </section>
    <section id="eligibility-requirements">
        <h5>Eligibility requirements for visitors to apply for an employer-specific work permit</h5>
        <p>The foreign national</p>
        <ol>
            <li>is in Canada with valid temporary resident status as a visitor, including status extensions under subsection 183(5) of the Immigration and Refugee Protection Regulations (IRPR), that is, maintained status, at the time of work permit application submission</li>
            <li>has submitted an employer-specific work permit application using the Application to Change Conditions, Extend my Stay or Remain in Canada as a Worker [IMM 5710]</li>
            <li>has remained in Canada with status since application submission and intends to remain in Canada throughout the period during which their work permit application is being processed</li>
            <li>submitted the application on or before <b>February 28, 2025</b></li>
        </ol>
    </section>
    <section id="interim-authorization">
        <h5>Eligibility requirements for interim authorization to work</h5>
        <p>In addition to meeting the eligibility criteria for the work permit, a former work permit holder who converted to visitor status may also be eligible for interim authorization to work if they meet <b>all the following:</b></p>
        <ul>
            <li>Have valid temporary resident status at the time of work permit application submission</li>
            <li>held a valid work permit in the 12 months preceding the date on which they submitted their application for a work permit under this public policy, even though they are now only a visitor</li>
            <li>intend to work for the employer and occupation specified by the LMIA or LMIA-exempt offer of employment included in their work permit application submitted under the public policy</li>
            <li>have applied to IRCC for the interim authorization to work as per this public policy using the IRCC Web form</li>
            <li>have requested that the authorization to work be applicable until a decision is made on their work permit application</li>
            <li>will remain in Canada throughout the period during which their work permit application is being processed</li>
        </ul>
    </section>
    <section id="work-permit-application">
        <h5>Receipt of work permit application</h5>
        <p>All in-Canada work permit applications...</p>
    </section>
    <section id="interim-work-authorization">
        <h5>Foreign national seeking interim work authorization</h5>
        <p>Interim authorization to work is not automatic...</p>
    </section>
    <section id="processing-requests">
        <h5>Processing of public policy requests</h5>
        <h6>Step 1: Receipt of IRCC Web form</h6>
        <p>On receipt of the IRCC Web form...</p>
        <h6>Step 2: Assessment under the public policy</h6>
        <p>There is a 30 business day service standard...</p>
        <h6>Step 3: Work permit application</h6>
        <p>The following are the applicable procedures if the work permit application is...</p>
    </section>
    <section>
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
       ______________________
      </div>
      </section>
</body>
</html>`
    return (

        <div>
            <div dangerouslySetInnerHTML={{ __html: htmlOntent }} />
        </div>
    )
}
