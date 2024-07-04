import React from 'react'

export default function HtmlAgreementFive() {
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Work permit: About the process - Canada.ca</title>
</head>
<body>
    <header>
        <h3>Work permit: About the process</h3>
        <p>From Immigration, Refugees and Citizenship Canada</p>
    </header>
    <main>
        <section id="process">
            <h5>About the process</h5>
            <p>Most foreign nationals need a work permit to work in Canada.</p>
            <p>There are 2 types of work permits.</p>
            
            <h6>Employer-specific work permit</h6>
            <p>An employer-specific work permit lets you work in Canada according to the conditions on your work permit, such as:</p>
            <ul>
                <li>the name of the specific employer you can work for</li>
                <li>how long you can work</li>
                <li>the location where you can work (if applicable)</li>
            </ul>
            <p>Before you apply for an employer-specific work permit, your employer must give you:</p>
            <ul>
                <li>a copy of your employment contract</li>
                <li>a copy of a labour market impact assessment (LMIA) or an offer of employment number (for LMIA-exempt workers)</li>
            </ul>
            
            <h6>Open work permit</h6>
            <p>An open work permit lets you work for any employer in Canada, except for one that:</p>
            <ul>
                <li>is listed as ineligible on the list of employers who have failed to comply with the conditions</li>
                <li>regularly offers striptease, erotic dance, escort services or erotic massages</li>
            </ul>
            <p>You can only get an open work permit in specific situations.</p>
        </section>
        
        <section id="family">
            <h5>If you want to bring your family with you</h5>
            <p>Your spouse or common-law partner and dependent children may be able to work, study or live with you while you work in Canada.</p>
        </section>
        
        <section id="eligibility">
            <h5>Who can apply for an open work permit?</h5>
            <p>You may be eligible for an open work permit if you:</p>
            <ul>
                <li>are an international student who graduated from a designated learning institution and are eligible for the Post-Graduation Work Permit Program</li>
                <li>are a student who’s no longer able to meet the costs of your studies (destitute student)</li>
                <li>have an employer-specific work permit and are being abused or at risk of being abused in relation to your job in Canada</li>
                <li>applied for permanent residence in Canada</li>
                <li>are a dependent family member of someone who applied for permanent residence</li>
                <li>are the spouse, common-law partner or dependent child of a low- or high-skilled worker</li>
                <li>are the spouse or common-law partner of an international student</li>
                <li>are the spouse or common-law partner of an applicant of the Atlantic Immigration Pilot Program</li>
                <li>are a refugee, refugee claimant, protected person or their family member</li>
                <li>are under an unenforceable removal order</li>
                <li>are a temporary resident permit holder</li>
                <li>are a young worker participating in special programs</li>
            </ul>
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
    </main>
</body>
</html>
`
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    )
}
