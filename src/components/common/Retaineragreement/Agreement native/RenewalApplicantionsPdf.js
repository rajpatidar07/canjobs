import React, { useState } from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider,Image ,PDFViewer} from '@react-pdf/renderer';
const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: 'Helvetica',
    },
    header: {
      textAlign: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    section: {
      marginBottom: 10,
    },
    text: {
      marginBottom: 5,
    },
    link: {
      color: 'blue',
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
        <View >
                <View style={styles.header}>
        <Image src="https://canpathwaysjobs.com/logo.png" style={{ width: 100, height: 40 }} />
        <Text style={styles.title}>Can Pathways Immigration Consultancy Limited</Text>
        <Text>2618 Hopewell Pl NE #310, Calgary, AB T1Y7, Canada</Text>
        <Text>Tel: +1 (403) 898 5308</Text>
        <Text>Email: info@canpathways.ca</Text>
        {/* <Link src="https://canpathwaysjobs.com" style={styles.link}>https://canpathwaysjobs.com</Link> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Retainer Agreement</Text>
        <Text>This RETAINER AGREEMENT is made on Tue, Mar 25, 2025, 12:00 AM</Text>
        <Text>Program: Application for Rural Renewal Stream (Innisfail) and Endorsement Letter</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>1. Contact Information</Text>
        <Text>Between Client</Text>
        <Text>- Name of Client: Das Sdfdsfsdf</Text>
        <Text>- Name of Business: ___________</Text>
        <Text>- Business Address: antigua and barbuda</Text>
        <Text>- Phone: 8520147693</Text>
        <Text>- Email: sdf@gmail.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>And</Text>
        <Text style={{ fontWeight: 'bold' }}>Regulated Canadian Immigration Consultant (RCIC):</Text>
        <Text>Harpreet Kaur (hereinafter called "The RCIC")</Text>
        <Text>2618 Hopewell Pl NE #310, Calgary, AB T1Y7, Canada</Text>
        <Text>Tel: +1 (403) 898 5308</Text>
        <Text>Email: info@canpathways.ca</Text>
        {/* <Link src="https://www.canpathways.ca" style={styles.link}>https://www.canpathways.ca</Link> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>2. RCIC Responsibilities and Commitments</Text>
        <Text>The Client asked the RCIC, and the RCIC has agreed, to act for the Client...</Text>
        <Text>- Advise the client as to which documents are required</Text>
        <Text>- Act in the best interests of the Client within the limits of Canadian law</Text>
      </View>

      <View style={styles.footer}>
        <Text>Final Submit</Text>
      </View>
        </View>)
    return (
        <BlobProvider
            document={
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View>
                            <Image
                                fixed
                                style={styles.image}
                                src={"https://canpathwaysjobs.com/image/00logo-main-black.png"}
                            />
                            <View style={styles.section}>{components}</View>
                            <View
                                className="footer"
                                fixed
                                style={{ color: "red", textAlign: "center", marginTop: 25 }}
                            >
                                <Text>
                                    Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7, Canada |
                                    Tel.: 403.888.5308 |
                                </Text>
                                <Text style={{ color: "blue", textDecoration: "underline" }}>
                                    Email: info@canpathways.ca | Website: www.canpathways.ca
                                </Text>
                            </View>
                            <View className="initial" fixed style={styles.initial}>
                                <Text>Initial:<Text style={[styles.textunderline, { textTransform: 'uppercase' }]}>{felidData?.initial ? felidData?.initial?.split(' ')               // Split the string by spaces
                                    ?.filter(word => word)      // Filter out empty strings (caused by multiple spaces)
                                    ?.map(word => word[0])      // Map each word to its first letter
                                    ?.join(' ') : "        "}</Text></Text>
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
                                        style={styles.image}
                                        src={
                                            "https://canpathwaysjobs.com/image/00logo-main-black.png"
                                        }
                                    />
                                    {components}

                                    <View
                                        className="footer"
                                        fixed
                                        style={{ color: "red", textAlign: "center", marginTop: 25 }}
                                    >
                                        <Text>
                                            Office: 2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7,
                                            Canada | Tel.: 403.888.5308 |
                                        </Text>
                                        <Text
                                            style={{ color: "blue", textDecoration: "underline" }}
                                        >
                                            Email: info@canpathways.ca | Website: www.canpathways.ca
                                        </Text>
                                    </View>
                                    <View className="initial" fixed style={styles.initial}>
                                        <Text>Initial:<Text style={[styles.textunderline, { textTransform: 'uppercase' }]}>{felidData?.initial ? felidData?.initial?.split(' ')               // Split the string by spaces
                                            ?.filter(word => word)      // Filter out empty strings (caused by multiple spaces)
                                            ?.map(word => word[0])      // Map each word to its first letter
                                            ?.join(' ') : "        "}</Text></Text>
                                    </View>
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                );
            }}
        </BlobProvider>
    );
};

export default RenewalApplicantionsPdf;
