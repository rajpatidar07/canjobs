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
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
        }
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
            text-align: center;
        }
        .applicant-details {
            margin-top: 20px;
        }
        .applicant {
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
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
