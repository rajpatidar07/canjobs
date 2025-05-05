import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider, Image, PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';
import { AddSharePointDOcument, AddUpdateAgreement } from '../../../../api/api';
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
  section: {
    marginBottom: 10,
    marginTop: 10,
  },
  underline: {
    textDecoration: "underline"
  },
  mb8: {
    marginBottom: 8,
  },
  mb5: {
    marginBottom: 5,
  },
  mb3: {
    marginBottom: 3,
  },
  mb4: {
    marginBottom: 4,
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
  container: { display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 30 },
  box: { width: "45%" },
  required: { color: "red" },
  signatureBox: { width: "100%", height: 50, border: "1px solid #ccc", display: "flex", alignItems: "center", justifyContent: "center" },
  text: { fontSize: 12 },
  dateLine: { minWidth: 80, borderBottom: "1px solid black", display: "inline-block" },
  textBold: {
    fontFamily: "Times-Bold",
  },
  title: {
    fontSize: 14,
    fontFamily: "Times-Bold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    marginBottom: 5,
  },
});

const MoreThanOneApplicantAgreementPdf = () => {
  const [blobData, setBlobData] = useState();
  const data = localStorage.getItem("agreementStateData");
  const {
    felidData,
    user_id,
    emp_user_type,
    folderId: folderID /*, code*/,
  } = JSON.parse(data) || {};
  const familyJsonArray = felidData?.family_json || []
  useEffect(() => {
    const convertBlob = async () => {
      try {
        if (!blobData) {
          console.error("Invalid blob data");
          return;
        }
        const arrayBuffer = await blobData.arrayBuffer();
        const newBlob = new Blob([arrayBuffer], { type: "application/pdf" });
        if (!newBlob) {
          console.error("Failed to create new blob");
          return;
        }
        const file = new File(
          [newBlob],
          `${felidData?.type.replace(" ", "_")}.pdf`,
          { type: "application/pdf" }
        ); try {
          let res = await AddSharePointDOcument(
            user_id,
            emp_user_type,
            folderID,
            "",
            [file]
          );
          if (res.data.message === "Document Upload") {
            try {
              let data = {
                id: felidData?.id,
                type: felidData?.type,
                document_id: res.data.data[0][0].document_id,
              };
              let addDocId = await AddUpdateAgreement(data);
              console.log(addDocId);
            } catch (err) {
              console.log(err)
            }
          }
        } catch (error) {
          console.log("Error saving doc to sharepoint", error);
        }
      } catch (error) {
        console.error("Error converting blob to file:", error);
      }
    };
    convertBlob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blobData]);
  let components = (
    <View>
      <View style={{ padding: 10 }}>
        {/* Company Information */}
        <View style={{}}>
          <Text
            style={[
              { fontSize: 12, color: "blue", marginBottom: 10, marginTop: 10, textTransform: "capitalize" },
              styles.textBold
            ]}
          >
            Can Pathways Immigration Consultancy Limited
          </Text>
          <Text style={styles.mb5}>2618 Hopewell Pl NE #310, Calgary, AB T1Y 7J7</Text>
          <Text style={styles.mb5}>Tel: +1 (403) 888-5308</Text>
          <Text style={styles.mb5}>
            Email: <Text style={styles.link}>info@canpathwaysjobs.com</Text>
          </Text>
          <Text style={[styles.mb5, styles.link]}>https://canpathwaysjobs.com</Text>
        </View>

        {/* Retainer Agreement */}
        <View style={{}}>

          {/* signature */}
          <View style={styles.container}>
            {/* Left Signature Box (RCIC) */}
            <View style={styles.box}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Signature</Text>
              <View style={styles.signatureBox}>
                {felidData?.rcic_signature ? (
                  <Image src={felidData.rcic_signature} style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    textTransform: "capitalize",
                  }} />
                ) : (
                  <View
                    style={{
                      display: "inline-block",
                      width: "100%",
                      height: 50,
                      border: "1px solid #ccc",
                    }}
                  />
                )}
              </View>
              <Text style={[styles.text, styles.textBold]}>Harpreet Kaur (RCIC)</Text>
              <Text style={styles.text}>RCIC # R533393</Text>
              <Text style={styles.text}>CAN Pathways Immigration Consultancy Ltd.</Text>
              <Text style={styles.text}><Text style={styles.textBold}>Date:</Text> {felidData?.date_signature_rcic !== "0000-00-00 00:00:00" && felidData?.date_signature_rcic ? moment(felidData.date_signature_rcic).format("DD/MM/YYYY") : "______________"}</Text>
              <Text style={styles.text}><Text style={styles.textBold}>Signed at:</Text> <Text style={styles.underline}>Calgary, Alberta, Canada</Text></Text>
            </View>

            {/* Right Signature Box (Client) */}
            <View style={styles.box}>
              <Text style={styles.label}><Text style={styles.required}>*</Text> Signature</Text>
              <View style={styles.signatureBox}>
                {familyJsonArray[0]?.client_signature ? (
                  <Image src={familyJsonArray[0].client_signature} style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    textTransform: "capitalize",
                  }} />
                ) : (
                  <View
                    style={{
                      display: "inline-block",
                      width: "100%",
                      height: 50,
                      border: "1px solid #ccc",
                    }}
                  />)}
              </View>
              <Text style={[styles.text, styles.textBold]}>(THE CLIENT)</Text>
              <Text style={styles.text}>Director/ Owner</Text>
              <Text style={styles.text}><Text style={styles.textBold}>Date:</Text> {familyJsonArray[0]?.date_signature_client ? moment(familyJsonArray[0].date_signature_client).format("DD/MM/YYYY") : "______________"}</Text>
              <Text style={styles.text}><Text style={styles.textBold}>Signed at:</Text>_______________________ <Text style={styles.dateLine}></Text></Text>
            </View>
          </View>
        </View>
      </View >
    </View >
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
                <Text style={{ textAlign: "right", paddingTop: 18 }}>Initials :</Text>
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
                    <Text style={{ textAlign: "right", paddingTop: 18 }}>Initials :</Text>
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

export default MoreThanOneApplicantAgreementPdf;
