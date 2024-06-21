import React from 'react';
import { StyleSheet } from '@react-pdf/renderer';
import { Link, useNavigate } from 'react-router-dom';

const HtmlAgreementOne = () => {
  let navigate = useNavigate();
  // Function to replace tags
  const replaceTags = (html) => {
    // Replace opening and closing div and ul tags with View tags
    html = html.replaceAll('<div', '<View').replaceAll('</div>', '</View>');
    html = html.replaceAll('<ul', '<View').replaceAll('</ul>', '</View>');
    html = html.replaceAll('<p', '<Text').replaceAll('</p>', '</Text>');
    html = html.replaceAll('<Link', '<Text').replaceAll('</Link>', '</Text>');
    html = html.replaceAll('<li', '<Text').replaceAll('</li>', '</Text>');
    html = html.replaceAll('<img', '<Image')

    return html;
  };
  const handleGeneratePdf = () => {
    let newCOde = replaceTags(jsxContent)
    if (newCOde) {
      console.log(newCOde)
      navigate("/agreeone", { state: { newCOde } });
    }
  };

  // JSX structure with potential tag replacements
  const jsxContent = (
    ` <div style=${styles.page} id='Agreeone'>
    <img Fixed style=${styles.image} src="https://storage.googleapis.com/mmstudio-images/gallery/AGUBlh69w0N2AXPYQJJy0zx0x363/1712771136849-0.png"/>
      <div className="header" style=${styles.header}>
        <p>Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada | Tel.: 403.888.5308 |</p>
        <p>Email: info@canpathways.ca | Website: www.canpathways.ca</p>
      </div>
      <div className="retainer-agreement" style=${styles.section}>
        <h1>RETAINER AGREEMENT</h1>
        <p>RCIC Membership Number: R533393 Client File Number: 0223</p>
        <p>
          This Retainer Agreement is made this 22 day of March 2024 between Regulated Canadian Immigration
          Consultant (RCIC) Harpreet Kaur (the “RCIC”), RCIC Membership Number R533393, phone number
          4038885308, email info@canpathways.ca located at 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7,
          Canada and Client (the “Client”), located at , email , contact number .
        </p>
        <p>
          WHEREAS the RCIC and the Client wish to enter into a written agreement which contains the agreed upon
          terms and conditions upon which the RCIC will provide his/her services to the Client.
        </p>
        <p>
          AND WHEREAS the RCIC is a member College of Immigration and Citizenship Consultants
          (the “Council”), the regulator in Canada for immigration consultants;
        </p>
        <p>
          IN CONSIDERATION of the mutual covenants contained in this Agreement, the parties agree as follows:
        </p>
        <h2>1. Definitions</h2>
        <p>
          The terms set out in this Retainer Agreement, have the meaning given to such terms in the Retainer
          Agreement Regulation and By-law of the Council, as amended from time to time.
        </p>
        <h2>2. RCIC Responsibilities and Commitments</h2>
        <p>
          The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of.
        </p>
        <p>
          In consideration of the fees paid and the matter stated above, the RCIC agrees to do the following:
        </p>
        <ul>
          <li>Consultation and providing document checklists and intake sheet, file opening</li>
          <li>Data gathering, filling out forms</li>
          <li>Information verification, completeness check</li>
          <li>Application submission</li>
          <li>File maintenance and correspondence with client and IRCC</li>
        </ul>
        <p>
          The RCIC shall provide the Client with a finalized, signed copy of this Retainer Agreement. RCIC is not responsible
          for any documentation or information provided by client to IRCC in any of the previous applications therefore shall
          not be held responsible/liable for it. RCIC will be providing services in English Language.
        </p>
        <p>
          RCIC will return any original document that the client provides as soon as the purpose for which the documents were
          taken is complete.
        </p>
        <p>
          The RCIC is obligated to provide professional, ethical, and competent services as per the Code of Professional
          Conduct of the College. A copy of the Code has been provided to the client(s).
        </p>
        <Link >Code of Professional Conduct</Link>
      </div>
      <div className="footer" style=${styles.header}>
        <p>Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada | Tel.: 403.888.5308 |</p>
        <p style=${{ color: "blue", textDecoration: "underline" }}>Email: info@canpathways.ca | Website: www.canpathways.ca</p>
      </div>
      <div className="initial" style=${styles.initial}>
        <p>Initial:</p>
      </div>
    </div>`
  );

  return (
    <div>

      <div dangerouslySetInnerHTML={{ __html: jsxContent }} />
      <Link to={`/agreeone`} state={replaceTags(jsxContent)} >
        {/* onClick={() => handleGeneratePdf()} */}
        Generated Pdf</Link>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    margin: "20px",
    padding: 30,
    fontFamily: 'Times-Roman',
    fontSize: 12,
    lineHeight: 1.5
  },
  section: {
    marginBottom: 10
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  text: {
    marginBottom: 5,
    padding: 2
  },
  image: {
    width: '30%',
    height: 'auto',
    marginBottom: 10
  },
  initial: {
    marginTop: 10,
    textAlign: 'right',

  },
  signatureImage: {
    textDecoration: "underline",
    marginHorizontal: 480,
    marginVertical: -100,
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  textunderline: {
    textDecoration: "underline"
  },
});

export default HtmlAgreementOne;
