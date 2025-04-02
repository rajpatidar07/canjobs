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

const ThreeColumnRerainerAgreement = () => {
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

export default ThreeColumnRerainerAgreement;
