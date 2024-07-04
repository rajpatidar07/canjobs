import React from 'react'

export default function HtmlAgreementTwo() {
  let htmlCOntent= `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regional Agreement on Access to Information, Public Participation and Justice in Environmental Matters</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .content { max-width: 800px; margin: auto; padding: 20px; }
        h1, h2 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        table, th, td { border: 1px solid black; }
        th, td { padding: 10px; text-align: left; }
    </style>
</head>
<body>
    <div class="content">
        <h3>Regional Agreement on Access to Information, Public Participation and Justice in Environmental Matters in Latin America and the Caribbean</h3>
        <p><strong>Location:</strong> Escazú, 4 March 2018</p>
        <p><strong>Entry into force:</strong> 22 April 2021</p>
        <p><strong>Registration:</strong> 22 April 2021, No. 56654</p>
        <p><strong>Status:</strong> Signatories: 24, Parties: 16</p>
        
        <h2>Participants</h2>
        <table>
            <tr>
                <th>Country</th>
                <th>Signature Date</th>
                <th>Ratification Date</th>
            </tr>
            <tr>
                <td>Antigua and Barbuda</td>
                <td>27 Sep 2018</td>
                <td>4 Mar 2020</td>
            </tr>
            <tr>
                <td>Argentina</td>
                <td>27 Sep 2018</td>
                <td>22 Jan 2021</td>
            </tr>
            <tr>
                <td>Belize</td>
                <td>24 Sep 2020</td>
                <td>7 Mar 2023</td>
            </tr>
        </table>
    </div>
</body>
</html>
`
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html:htmlCOntent}}/>
    </div>
  )
}
