import React from 'react'

export default function HtmlAgreementSix() {
    let htmlContent =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About the Post-Graduation Work Permit</title>
</head>
<body>
    <header>
        <h3>Work in Canada after you graduate</h3>
        <nav>
            <ul>
                <li><a href="#about-pgwp">About the PGWP</a></li>
                <li><a href="#who-can-apply">Who can apply</a></li>
                <li><a href="#how-to-apply">How to apply</a></li>
                <li><a href="#after-you-apply">After you apply</a></li>
                <li><a href="#path-to-permanent-residence">Path to permanent residence</a></li>
            </ul>
        </nav>
    </header>

    <section id="about-pgwp">
        <h5>About the PGWP</h5>
        <p>You may be eligible for a post-graduation work permit (PGWP) if you graduated from a designated learning institution (DLI) and want to stay in Canada temporarily to work.</p>
        <p>Graduation from a DLI doesn’t automatically make you eligible for a PGWP. Check the DLI list to find out which schools have eligible programs.</p>
        
        <h6>How much of your online studies counts toward a PGWP?</h6>
        <p>All of the time you spent studying online at a PGWP-eligible DLI from outside Canada between March 2020 and August 31, 2022, counts toward the length of a PGWP. This policy changed as of September 1, 2022.</p>
        <p>The following time won’t count toward the length of a PGWP:</p>
        <ul>
            <li>time spent studying outside of Canada after December 31, 2023</li>
            <li>time spent studying before you applied for a study permit</li>
        </ul>
    </section>

    <section id="who-can-apply">
        <h5>Who can apply</h5>
        <p>Details about who can apply for the PGWP.</p>
    </section>

    <section id="how-to-apply">
        <h5>How to apply</h5>
        <p>Instructions on how to apply for the PGWP.</p>
    </section>

    <section id="after-you-apply">
        <h5>After you apply</h5>
        <p>Information on what happens after you apply for the PGWP.</p>
    </section>

    <section id="path-to-permanent-residence">
        <h5>Path to permanent residence</h5>
        <p>Information on how the PGWP can help you on your path to permanent residence.</p>
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
        <div dangerouslySetInnerHTML={{__html:htmlContent}}/>
    </div>
  )
}
