import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider, Image, PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Times-Roman',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
    marginTop: 10,
  },
  textBold: {
    fontWeight: "bold"
  },
  mb5: {
    marginBottom: 5,
  },
  mb2: {
    marginBottom: 2,
  },
  mb3: {
    marginBottom: 3,
  },
  link: {
    color: 'red',
  },
  signatureLine: {
    borderBottom: '1px solid black',
    width: '50%',
    marginVertical: 5,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#E4E4E4',
  },
});

const RenewalApplicantionsPdf = () => {
  const [blobData, setBlobData] = useState();
  const data = localStorage.getItem("agreementStateData");
  const {
    felidData,
    user_id,
    emp_user_type,
    folderId: folderID /*, code*/,
  } = JSON.parse(data) || {};
  // console.log(felidData?.family_json, "<=========== Testing data =======>", data)
  const familyJsonArray = felidData?.family_json || []
  let components = (
    <View>
      <View>
        {/* Company Information */}
        <View style={{ padding: 10 }}>
          <Text
            style={[
              { fontSize: 12, color: "blue", marginBottom: 10, marginTop: 10, textTransform: "capitalize" },
              styles.textBold
            ]}
          >
            Can Pathways Immigration Consultancy Limited
          </Text>
          <Text style={styles.mb2}>2618 Hopewell PI NE #310 Calgary,</Text>
          <Text style={styles.mb2}>AB T1Y7J7, Canada</Text>
          <Text style={styles.mb2}>Tel: +1 (403) 888-5308</Text>
          <Text style={styles.mb2}>
            Email: <Text style={styles.link}>info@canpathwaysjobs.com</Text>
          </Text>
          <Text style={[styles.mb2, styles.link]}>https://canpathwaysjobs.com</Text>
        </View>

        {/* Retainer Agreement */}
        <View style={{ padding: 10 }}>
          <Text style={[styles.textBold, styles.title, { textAlign: "center" }]}>
            Retainer Agreement
          </Text>
          <Text style={[styles.mb3]}>
            THIS RETAINER AGREEMENT is made on{" "}
            {felidData?.agreement_date ? (
              <Text style={{ borderBottomWidth: 1, borderBottomColor: "black" }}>
                {moment(felidData?.agreement_date).format("llll")}
              </Text>
            ) : (
              "_______________________"
            )}
          </Text>
          <Text>
            Program:{" "}
            <Text style={[styles.textBold, styles.mb3]}>
              Application for Rural Renewal Stream (Innisfail) and Endorsement Letter
            </Text>
          </Text>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={[styles.bold, styles.subtitle]}>1. Contact Information</Text>
            <Text style={[styles.textBold, { marginVertical: 5 }]}>Between Client</Text>
            <Text>
              • Name Of Client:{" "}
              {familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name ? (
                <Text style={{ borderBottomWidth: 1, borderBottomColor: "black", textTransform: "capitalize" }}>
                  {familyJsonArray[0]?.client_first_name} {familyJsonArray[0]?.client_last_name || ""}
                </Text>
              ) : (
                "_____________________"
              )}{" "}
              (hereinafter called the "Client")
            </Text>
            <Text>
              • Business Address:{" "}
              <Text style={{ borderBottomWidth: 1, borderBottomColor: "black" }}>
                {felidData?.client_address || "____________________"}
              </Text>
            </Text>
            <Text>
              • Phone:{" "}
              {felidData?.client_contact ? (
                <Text style={{ borderBottomWidth: 1, borderBottomColor: "black" }}>{felidData?.client_contact}</Text>
              ) : (
                "____________________________"
              )}
            </Text>
            <Text>
              • Email:{" "}
              <Text style={{ borderBottomWidth: 1, borderBottomColor: "black" }}>
                {felidData?.client_email || "____________________________"}
              </Text>
            </Text>

            {/* RCIC Information */}
            <Text style={[styles.mb2, { marginTop: 10 }]}>And</Text>
            <Text style={[styles.textBold, { fontSize: 12 }, styles.mb2]}>
              Regulated Canadian Immigration Consultant (RCIC):
            </Text>
            <Text style={styles.mb2}>
              <Text style={styles.textBold}>Harpreet Kaur</Text> (hereinafter called "The RCIC")
            </Text>
            <Text style={styles.mb5}>2618 Hopewell PI NE #310</Text>
            <Text style={styles.mb5}>Calgary, AB T1Y7J7, Canada</Text>
            <Text style={styles.mb5}>Tel: +1 (403) 888-5308</Text>
            <Text style={styles.mb5}>
              Email: <Text style={styles.link}>info@canpathways.ca</Text>
            </Text>
            <Text style={styles.mb5}>
              Website: <Text style={styles.link}>www.canpathways.ca</Text>
            </Text>
          </View>

          {/* RCIC Responsibilities */}
          <View style={styles.section}>
            <Text style={[styles.bold, styles.subtitle, styles.mb3]}>
              2. RCIC Responsibilities and Commitments
            </Text>
            <Text style={styles.mb3}>
              The Client has asked the RCIC, and the RCIC has agreed, to act on behalf of the Client in matters related to their
              application for the Rural Renewal Stream and Endorsement Letter from the Rural Community of business location.
            </Text>
            <Text style={styles.mb3}>
              The RCIC agrees to perform the following duties, with assistance from the RCIC’s employees, as required:
            </Text>
            <View>
              {[
                "Advise the client on required documents for the application.",
                "Act in the best interests of the Client within the limits of Canadian law.",
                "Guide the Client through the application process and review all documents for accuracy.",
                "Submit the Client’s application package to the appropriate offices.",
                "Provide updates on application progress.",
                "Handle all correspondence with the Rural Community on behalf of the Client.",
                "Liaise between the Canadian government and the Client.",
                "Prepare the Client for an interview if requested.",
                "Perform all duties professionally and competently."
              ].map((item, index) => (
                <Text key={index} style={styles.mb3}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>

          {/* Client Responsibilities */}
          <View style={styles.section}>
            <Text style={[styles.bold, styles.subtitle]}>3. Client Responsibilities and Commitment</Text>
            <Text>The Client agrees to:</Text>
            <View>
              {[
                "Provide all necessary documents in English or with an English translation.",
                "Follow instructions and advice from the RCIC within the prescribed timeframe.",
                "Immediately notify the RCIC if contacted directly by the Service Canada office.",
                "Be accurate and honest in all provided information.",
                "Use email as the primary method of contacting the RCIC (response time: 2-3 business days).",
                "Acknowledge that the RCIC is not responsible for government decisions on their application.",
                "Understand that failure to comply with these responsibilities may result in termination of representation without a refund."
              ].map((item, index) => (
                <Text key={index} style={styles.mb3}>
                  • {item}
                </Text>
              ))}
            </View>
            <Text>
              The RCIC's obligations under this agreement become void if the Client knowingly provides inaccurate, misleading, or false
              information. The Client remains financially responsible.
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
  return (
    <BlobProvider
      document={
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <Image
                fixed
                style={{ width: 100, height: 40 }}
                src={
                  "https://canpathwaysjobs.com/image/00logo-main-black.png"
                }
              />
              {components}

              <View
                fixed
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 20,
                }}
              >
                <Text style={{ textAlign: "right" }}>Initials :</Text>
                <View>
                  <View
                    style={{
                      width: "100%",
                      height: 20,
                      border: "1px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {felidData?.initial ? (
                      <Text
                        style={{
                          display: "inline-block",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          textTransform: "capitalize",
                        }}
                      >
                        {felidData.initial
                          .split(" ")
                          .filter((word) => word)
                          .map((word) => word[0])
                          .join(" ")}
                      </Text>
                    ) : (
                      <View
                        style={{
                          display: "inline-block",
                          width: 100,
                          height: 20,
                          border: "1px solid #ccc",
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      }
    >
      {({ blob, url, loading, error }) => {
        setBlobData(blob);
        // Do whatever you need with blob here
        return (
          <PDFViewer width="100%" height="850">
            <Document>
              <Page size="A4" style={styles.page}>
                <View>
                  <Image
                    fixed
                    style={{ width: 100, height: 40 }}
                    src={
                      "https://canpathwaysjobs.com/image/00logo-main-black.png"
                    } />
                  {components}
                  <View
                    fixed
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      gap: 20,
                    }}
                  >
                    <Text style={{ textAlign: "right" }}>Initials :</Text>
                    <View>
                      <View
                        style={{
                          width: "100%",
                          height: 50,
                          border: "1px solid #ccc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {felidData?.initial ? (
                          <Text
                            style={{
                              display: "inline-block",
                              maxWidth: "100%",
                              maxHeight: "100%",
                              textTransform: "capitalize",
                            }}
                          >
                            {felidData.initial
                              .split(" ")
                              .filter((word) => word)
                              .map((word) => word[0])
                              .join(" ")}
                          </Text>
                        ) : (
                          <View
                            style={{
                              display: "inline-block",
                              width: 100,
                              height: 50,
                              border: "1px solid #ccc",
                            }}
                          />
                        )}
                      </View>

                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        );
      }}
    </BlobProvider >
  );
};

export default RenewalApplicantionsPdf;
