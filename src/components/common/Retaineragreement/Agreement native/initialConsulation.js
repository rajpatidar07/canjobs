import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  header: {
    padding: "10px 20px",
    textAlign: "justify",
  },
  logo: {
    maxWidth: 200,
  },
  mainDiv: {
    padding: "10px",
  },
  section: {
    marginBottom: 10,
  },
  centerText: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  underline: {
    textDecoration: "underline",
  },
  smallText: {
    fontSize: 10,
  },
  signatureBlock: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  signature: {
    width: "48%",
    marginBottom: 10,
  },
  signatureImage: {
    maxWidth: 200,
  },
  dateBlock: {
    width: "48%",
    marginBottom: 10,
  },
});

const InitialConsultationAgreement = () => (
  <Document>
    <Page size="A4" style={{ padding: 20 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          src="https://canpathwaysjobs.com/image/00logo-main-black.png"
          alt="Canpathways logo"
          style={styles.logo}
        />
      </View>

      {/* Main Content */}
      <View style={styles.mainDiv}>
        <Text style={[styles.centerText, { fontSize: 18, marginBottom: 10 }]}>
          INITIAL CONSULTATION AGREEMENT
        </Text>
        <Text style={[styles.centerText, { marginBottom: 10 }]}>
          BETWEEN{"\n"}CAN Pathways Immigration Consultancy Ltd.{"\n"}and Client:
        </Text>

        {/* Agreement Details */}
        <View style={styles.section}>
          <Text>
            This Initial Consultation AGREEMENT ("the Agreement") is made on
            the date mentioned below.
          </Text>
          <Text>"The Effective Date": D3 September 2024</Text>
        </View>

        <View style={styles.section}>
          <Text>BY AND BETWEEN</Text>
          <Text>
            <Text style={styles.bold}>Harpreet Kaur</Text> (the "RCIC") Located
            at:{" "}
            <Text style={styles.bold}>
              CAN Pathways Immigration Consultancy Ltd.
            </Text>{" "}
            Address:{" "}
            <Text style={styles.bold}>
              Unit #310, 2618 Hopewell Pl. NE, Calgary, AB, T1Y 717, Canada
            </Text>{" "}
            Hereinafter referred to as:{" "}
            <Text style={styles.bold}>"Legal Representative/RCIC"</Text>
          </Text>
          <Text>
            AND{"\n"}The <Text style={styles.bold}>"Candidate"</Text> as
            his/her details provided as of this present agreement, collectively
            called the <Text style={styles.bold}>"Client."</Text>
          </Text>
          <Text>
            <Text style={styles.bold}>Name:</Text> _______________
          </Text>
          <Text>
            <Text style={styles.bold}>Address:</Text> _______________
          </Text>
          <Text>
            <Text style={styles.bold}>Phone Number:</Text> _______________
          </Text>
          <Text>
            <Text style={styles.bold}>Email Address:</Text> _______________
          </Text>
        </View>

        {/* Scope of Service */}
        <View style={styles.section}>
          <Text style={[styles.bold, styles.underline]}>SCOPE OF SERVICE</Text>
          <Text>
            1. Client is seeking consultation and professional advice from the
            RCIC with respect to one or more of the following (please tick the
            correct service):
          </Text>
          <Text>• Visitor visa /Super-visa application</Text>
          <Text>• Study permit application</Text>
          <Text>
            • Work permit application/LMIA Related Inquiries (please specify)
            _____________
          </Text>
          <Text>
            • Permanent residence/Citizenship application (please specify)
            _____________
          </Text>
          <Text>
            • Other (please specify): _____________{"\n"}
            Please provide additional relevant information below:{" "}
          </Text>
          <Text>___________________________________________________________________________________________</Text>
        </View>

        {/* Further Sections (Repeat Similar Format for Other Sections) */}
        {/* Include AGREEEMENT, LIMITS OF ENGAGEMENT, CONSULTATION APPROACH, PAYMENT OF FEE, etc. */}

        {/* Signature Section */}
        <View style={styles.signatureBlock}>
          {/* Client Signature */}
          <View style={styles.signature}>
            <Image src="" style={styles.signatureImage} />
            <Text>______________________________</Text>
            <Text style={styles.smallText}>John Doe 2024-11-18</Text>
            <Text>Signature of Client</Text>
          </View>

          {/* RCIC Signature */}
          <View style={styles.signature}>
            <Image src="" style={styles.signatureImage} />
            <Text>______________________________</Text>
            <Text style={styles.smallText}>Harpreet Kaur 2024-11-18</Text>
            <Text>Signature of RCIC</Text>
          </View>

          {/* Date Section */}
          <View style={styles.dateBlock}>
            <Text>2024-11-18</Text>
            <Text>Date</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default InitialConsultationAgreement;
