import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from "@react-pdf/renderer"
// import { useLocation } from 'react-router-dom';
const AggrementOne = () => {
  const signature = window.history.state.usr.dataUrl
  console.log(signature)
  return (
    <PDFViewer width="100%" height="900">
      <Document >
        <Page size="A4" style={styles.page}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJqpMcgU4d7gdbObHftFK_NaqFzratFKGRGg&s"
            style={styles.image}
            fixed
          />
          <View style={styles.section}>
            <Text style={styles.header}>Retainer Agreement</Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>RCIC Membership Number:</Text>
              <Text style={styles.textunderline}> R533393</Text>
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Client File Number:</Text>
              <Text style={styles.textunderline}>0223</Text>
            </Text>
            <Text style={styles.text}>
              This Retainer Agreement is made this 22 day of March 2024 between Regulated Canadian Immigration Consultant (RCIC) Harpreet Kaur (the “RCIC”), RCIC Membership Number R533393, phone number 4038885308, email info@canpathways.ca located at 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada and Client (the “Client”).
            </Text>
            <Text style={styles.bold}>Definitions</Text>
            <Text style={styles.text}>
              The terms set out in this Retainer Agreement, have the meaning given to such terms in the Retainer Agreement Regulation and By-law of the Council, as amended from time to time.
            </Text>
            <Text style={styles.bold}>RCIC Responsibilities and Commitments</Text>
            <Text style={styles.text}>
              The Client asked the RCIC, and the RCIC has agreed, to act for the Client in the matter of:
            </Text>
            <Text style={styles.text}>
              a) Consultation and providing document checklists and intake sheet, file opening
            </Text>
            <Text style={styles.text}>
              b) Data gathering, filling out forms
            </Text>
            <Text style={styles.text}>
              c) Information verification, completeness check
            </Text>
            <Text style={styles.text}>
              d) Application submission
            </Text>
            <Text style={styles.text}>
              e) File maintenance and correspondence with client and IRCC
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.bold}>Client Responsibilities and Commitments</Text>
            <Text style={styles.text}>
              3.1 The Client must provide, upon request from the RCIC:
            </Text>
            <Text style={styles.text}>• All necessary documentation</Text>
            <Text style={styles.text}>• All documentation in English or French, or with an English or French translation</Text>
            <Text style={styles.text}>
              3.2 The Client understands that he/she must be accurate and honest in the information he/she provides and that any misrepresentations or omissions may void this Agreement, or seriously affect the outcome of the application or the retention of any immigration status he/she may obtain. The RCIC’s obligations under the Retainer Agreement are null and void if the Client knowingly provides any inaccurate, misleading or false material information. The Client’s financial obligations remain.
            </Text>
            <Text style={styles.text}>
              3.3 Client is informed that RCIC might obtain assistance from other professionals or services.
            </Text>
            <Text style={styles.text}>
              3.4 Client understands that RCIC should not be held responsible for visa outcome as RCIC cannot guarantee the decision of IRCC. If IRCC policy or rules changes before/during or after the application submission and client deemed ineligible, RCIC should not be held responsible for that.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.bold}>Payment Schedule</Text>
            <Text style={styles.text}>
              Billing method: The Client will be billed by [flat fee with payment by milestones].
            </Text>
            <Text style={styles.text}>Fees details Amount (CAD)</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell}>Professional Fees</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text style={styles.tableCell}>Amount</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Discount:</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>$</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Courier charges</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>$</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.bold}>Refund Policy</Text>
            <Text style={styles.text}>
              The Client acknowledges that the granting of a visa or status and the time required for processing this application is at the sole discretion of the government of Canada (or Government Authorities) and not the RCIC. Furthermore, the Client acknowledges that fees are not refundable in the event of an application refusal.
            </Text>

          </View>

          <View style={styles.section}>
            <Text style={styles.bold}>Confidentiality</Text>
            <Text style={styles.text}>
              All information and documentation reviewed by the RCIC, required by IRCC and all other governing bodies, and used for the preparation of the application will not be divulged to any third party, other than agents and employees of the RCIC, without prior consent, except as demanded by the Council or required under law. The RCIC, and all agents and employees of the RCIC, are also bound by the confidentiality requirements of Article 8 of the Code of Professional Ethics.

            </Text>
          </View>
          <View
            fixed
          >
            <Text style={{ color: "red", fontSize: 10, flexWrap: "wrap" }}>Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada | Tel.: 403.888.5308 |
              Email: <Text style={{ color: "blue", textDecoration: "underline" }}>info@canpathways.ca</Text> | Website:www.canpathways.ca
            </Text>
            <Text style={styles.initial}>Initial:
              {signature && <Image style={styles.signatureImage} src={signature} />}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  page: {
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
    marginBottom: 5
  },
  image: {
    width: '30%',
    height: 'auto',
    marginBottom: 10
  },
  initial: {
    textAlign: 'right',
  },
  signatureImage: {
    // marginTop: 30,
    width: 80, // Adjust the width as needed
    height: 80, // Adjust the height as needed
  },
  textunderline: {
    textDecoration: "underline"
  }
});

export default AggrementOne;