import React from 'react'

export default function HtmlAGreementFour() {
    let htmlCOntent =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Study Permit Conditions - Canada.ca</title>
</head>
<body>
    <header>
        <h4>Study Permit Conditions</h4>
    </header>
    <nav>
        <ul>
            <li><a href="#conditions">Your Study Permit Conditions</a></li>
            <li><a href="#prove">How to Prove You Meet Your Conditions</a></li>
            <li><a href="#exempt">People Exempt from Study Permit Conditions</a></li>
        </ul>
    </nav>
    <section id="conditions">
        <h5>Your Study Permit Conditions</h5>
        <p>As a study permit holder, you must:</p>
        <ul>
            <li>Be enrolled at a designated learning institution (DLI), unless exempt.</li>
            <li>Show you’re actively pursuing your studies by being enrolled full-time or part-time, making progress, and not taking unauthorized leaves longer than 150 days.</li>
            <li>Inform any time you change post-secondary schools.</li>
            <li>End your studies if you no longer meet the requirements of being a student, and leave Canada when your permit expires.</li>
        </ul>
    </section>
    <section id="prove">
        <h5>How to Prove You Meet Your Conditions</h5>
        <p>We might ask you to prove you’re meeting your conditions:</p>
        <ul>
            <li>As part of a random check</li>
            <li>If we have reason to believe you’re not meeting them</li>
        </ul>
        <p>We might ask you for official documents from your school, transcripts, references, and other relevant documents.</p>
    </section>
    <section id="exempt">
        <h5>People Exempt from Study Permit Conditions</h5>
        <p>Some study permit holders are exempt from certain conditions. You don’t need to prove that you’re enrolled at a DLI or that you’re actively pursuing your studies if you meet specific criteria, such as being a refugee claimant or an accredited representative.</p>
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
</html>
`
  return (
    <div>
        <div dangerouslySetInnerHTML={{__html:htmlCOntent}}/>
    </div>
  )
}
