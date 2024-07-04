import React from 'react'

export default function HtmlAgreementThree() {
    let htmlOntent =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Public policy allowing certain visitors in Canada to apply for an employer-specific work permit</title>
</head>
<body>
    <header>
        <h1>Public policy allowing certain visitors in Canada to apply for an employer-specific work permit</h1>
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
        <h2>Policy objectives</h2>
        <p>This public policy will...</p>
    </section>
    <section id="eligibility-requirements">
        <h2>Eligibility requirements for visitors to apply for an employer-specific work permit</h2>
        <ul>
            <li>The foreign national...</li>
            <li>...</li>
        </ul>
    </section>
    <section id="interim-authorization">
        <h2>Eligibility requirements for interim authorization to work</h2>
        <ul>
            <li>Have valid temporary resident status...</li>
            <li>...</li>
        </ul>
    </section>
    <section id="work-permit-application">
        <h2>Receipt of work permit application</h2>
        <p>All in-Canada work permit applications...</p>
    </section>
    <section id="interim-work-authorization">
        <h2>Foreign national seeking interim work authorization</h2>
        <p>Interim authorization to work is not automatic...</p>
    </section>
    <section id="processing-requests">
        <h2>Processing of public policy requests</h2>
        <h3>Step 1: Receipt of IRCC Web form</h3>
        <p>On receipt of the IRCC Web form...</p>
        <h3>Step 2: Assessment under the public policy</h3>
        <p>There is a 30 business day service standard...</p>
        <h3>Step 3: Work permit application</h3>
        <p>The following are the applicable procedures if the work permit application is...</p>
    </section>
</body>
</html>`
  return (
    
    <div>
        <div dangerouslySetInnerHTML={{__html:htmlOntent}}/>
    </div>
  )
}
