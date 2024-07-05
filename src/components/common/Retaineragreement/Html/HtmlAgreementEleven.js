import React from 'react'

export default function HtmlAgreementEleven() {
    let htmlcontent =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About the Post-Graduation Work Permit</title>
</head>
<body>
    <header>
        <h3>Spousal Sponsorship</h3>
        </header>
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
        <div dangerouslySetInnerHTML={{__html:htmlcontent}}/>
    </div>
  )
}
