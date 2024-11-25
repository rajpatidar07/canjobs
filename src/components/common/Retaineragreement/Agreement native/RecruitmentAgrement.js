import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
  BlobProvider,
} from "@react-pdf/renderer";
import moment from "moment";
import { AddSharePointDOcument, AddUpdateAgreement } from "../../../../api/api";
// import { toast } from "react-toastify";

const RecruitmentAgrement = () => {
  const [blobData, setBlobData] = useState();
  const data = localStorage.getItem("agreementStateData");
  const {
    felidData,
    user_id,
    emp_user_type,
    folderId: folderID /*, code*/,
  } = JSON.parse(data) || {};
  const familyJsonArray = felidData?.family_json || [] //? JSON.parse(felidData?.family_json) : [];

  /*COnvert blob to file  */
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
        );
        // console.log('file = >', file)
        try {
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
  const parseDate = (date) => {
    if (!date || date === "0000-00-00" || date === "0000-00-00 00:00:00") return null;
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) ? parsedDate : null;
  };

  const agreementDate = parseDate(felidData?.agreement_date);
  const formattedDate = agreementDate
    ? moment(agreementDate).format("DD MMMM YYYY")
    : "____________";
  let components = (
    <View style={{ height: "auto" }}>
      <View style={{ padding: "10px 20px" }}>
        <View style={styles.section}>
          <Text style={{ textAlign: "center", fontSize: "18px", marginBottom: 15 }}>RETAINER AGREEMENT{"\n"}
            <Text style={{ textAlign: "center", fontSize: "12px", marginBottom: 15 }}>Between Harpreet Kaur{"\n"} CAN Pathways Immigration Consultancy Ltd.{"\n"}</Text >
            <Text style={[styles.bold, { textAlign: "center", fontSize: "12px", marginBottom: 15 }]}>Client:</Text>
            <Text style={[styles.textunderline, { textAlign: "center", fontSize: "12px", marginBottom: 15 }]}> {familyJsonArray[0]?.client_first_name || ""}{" "}
              {familyJsonArray[0]?.client_last_name || ""}{" "}</Text>
          </Text>
          <Text style={styles.paragraph}>
            This Agreement ("the <Text style={styles.bold}>Agreement</Text>") is made on the date mentioned below.{"\n"}{"\n"}
            "The <Text style={styles.bold}>Effective Date:</Text> {formattedDate || "____________"
            }"{"\n"}{"\n"}BY AND BETWEEN{"\n"}{"\n"}
            This <Text style={styles.bold}>RECRUITMENT AGREEMENT</Text> entered by and between{"\n"}
            <Text style={styles.bold}>CAN Pathways Immigration Consultancy Ltd.</Text> (the "Agency") with address at
            Unit #310, 2618 Hopewell PI. NE Calgary, AB. T1Y 717, Canada, represented by Registered Canadian Immigration
            Consultant referred to as (RCIC) Harpreet Kaur, herein{" "}
            <Text style={styles.bold}>"Legal Representative / Agent / Recruiter"</Text>.
            {"\n"}{"\n"}AND{"\n"}{"\n"}
            The <Text style={styles.bold}>"Candidate"</Text>, as his/her details appear in Appendix I of this present
            agreement, collectively called the "Client".{"\n"}
            <Text style={styles.bold}>{"\n"}WHEREAS</Text> the Recruiter and the Client wish to enter into a written agreement
            which contains the agreed-upon terms and conditions upon which the Recruiter will provide his/her services to
            the Client. Harpreet Kaur is a licensed recruiter and is authorized to engage in sourcing, selection, and
            recruitment activities, potentially related to employment or staffing.{"\n"}
            <Text style={styles.bold}>{"\n"}AND WHEREAS</Text> the recruiter is a member of the College of Immigration and Citizenship Consultants (the "Council") (RCIC), the regulator in Canada for immigration consultants;{"\n"}
            {"\n"} IN CONSIDERATION of the mutual promises and covenants herein contained and for other good and valuable
            consideration, the receipt and sufficiency of which are hereby acknowledged, the parties hereto willing to be
            legally bound agree as follows:{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}
          </Text>
        </View>
        <View style={styles.section}>
          <View >
            <Text style={styles.text}>
              1. The Candidate agrees to engage the services of{" "}
              <Text style={styles.bold}>CAN Pathways Immigration Consultants Ltd.</Text>{" "}
              to assist in finding a suitable employer. The candidate agrees to utilize
              the services of the Agency for tasks such as candidate sourcing, resume
              screening, interview coordination, reference checks, and assistance with
              contract negotiations.
            </Text>
            <Text style={styles.text}>
              2. The Candidate, seeking employment or job placement, agrees to sign the retainer specifically for the recruitment services being offered. This indicates that the Candidate acknowledges the separate nature of these services and understands that they are unrelated to any immigration or citizenship matters they may be pursuing with the Recruiter.
              {"\n"}{"\n"}
            </Text>
            <Text style={styles.text}>3. The Candidate has duly provided consent for the acquisition of recruitment services and has not incurred any charges whatsoever in relation to the provision of said services.{"\n"}{"\n"}
            </Text>
            <Text style={styles.text}>4. The Recruiter has provided a thorough explanation and understanding regarding the distinction between recruitment services and immigration services, including their respective scope of practice. It has been made clear that the candidate is under no obligation to avail both services simultaneously from CAN Pathways Immigration Consultancy Ltd. {"\n"}{"\n"}</Text>
            <Text style={styles.text}>5. The Candidate has made an informed decision and voluntary agreement to engage CAN Pathways Immigration Consultancy Ltd. for the purpose of recruitment services.{"\n"} </Text>
            <Text style={styles.text}>6. The employer has willingly agreed to remunerate the established standard service charge associated with the recruitment services, encompassing the successful placement of the candidate within the organization {"\n"}{"\n"}</Text>
            <Text style={styles.text}>7.  The Candidate agrees to provide, upon request from the recruiter:{"\n"}
              • All necessary documentation{"\n"}
              • All documentation in English or French, or with an English or French translation.{"\n"}{"\n"}
            </Text>
            <Text style={styles.text}>
              8. The Client understands that he/she must be accurate and honest in the information he/she provides and that any misrepresentations or omissions may void this Agreement, or seriously affect the outcome of the application or the retention of any immigration status he/she may obtain. The Recruiter's obligations under the retainer Agreement are null and void if the Client knowingly provides any inaccurate, misleading, or false material information.{"\n"} </Text>
            <Text style={styles.text}>9. This agreement does not provide a guarantee of securing employment.{"\n"} </Text>
          </View>
          <View >
            <Text style={styles.subHeader}>10. Confidentiality:</Text>
            <Text style={styles.text}>
              All information and documentation reviewed by The Recruiter, required by the employer, and used for the placement and recruitment services, will not be divulged to any third party, other than agents or employees of the Recruiter, without prior consent, except as demanded by the Council
              or required under law.{"\n"}{"\n"}
            </Text>
          </View>
          <View >
            <Text style={styles.subHeader}>11. Change Policy:</Text>
            <Text style={styles.text}>
              The Client acknowledges that if the Recruiter is asked to act on the Client's behalf on matters other than those outlined above in the scope of this Agreement, or because of a matter other than those outlined above in the scope of this Agreement, or because of a material change in the Client's circumstances, or because of material facts not disclosed at the outset of the application, the Agreement can be modified accordingly. This Agreement may only be altered or amended when such changes are made in writing and executed by the parties hereto. All changes and/or edits must be initialed and dated by both the Member and the Client. Any substantial changes to this agreement may require that the parties enter into a new Retainer Agreement.{"\n"}{"\n"}
            </Text>
          </View>
          <View >
            <Text style={styles.subHeader}>12. Termination:</Text>
            <Text style={styles.text}>
              This Agreement is considered terminated upon completion of tasks identified under this agreement.{"\n"}
              This Agreement is considered terminated if material changes occur to the Client's application or eligibility, which make it impossible to proceed with services detailed in this Agreement.{"\n"}{"\n"}
            </Text>
          </View>
          <View >
            <Text style={styles.subHeader}>13. Discharge or Withdrawal of Representation:</Text>
            <Text style={styles.text}>
              The Client may discharge representation and terminate this Agreement, upon writing, at which time any outstanding or unearned fees or disbursements will be refunded by the RCIC to the Employer and/or any outstanding fees or disbursements will be paid by the Employer to the Recruiter.
              {"\n"}
              Pursuant to Article 11 of the Code of Professional Ethics, the Recruiter may withdraw representation and terminate this Agreement, upon writing, provided withdrawal does not cause prejudice to the Client, at which time any outstanding or unearned fees or disbursements will be refunded by the Recruiter to the Employer and/or any outstanding fees or disbursements will be paid by the Employer to the RCIC.
              {"\n"}{"\n"}
            </Text>
          </View>
          <View >
            <Text style={styles.subHeader}>14. Governing Law:</Text>
            <Text style={styles.text}>
              This Agreement shall be governed by the laws in effect in the Province/Territory of Alberta, and the federal laws of Canada applicable therein and except for disputes pursuant to Section 9 hereof, any dispute with respect to the terms of this Agreement shall be decided by a court of competent jurisdiction within the Province/Territory of Alberta.
              {"\n"}{"\n"}{"\n"}{"\n"}
            </Text>
          </View>
          <View >
            <Text style={styles.subHeader}>15. Miscellaneous:</Text>
            <Text style={styles.text}>


              15.1 The Client expressly authorizes the Recruiter to act on his/her behalf to the extent of the specific functions which the Recruiter was retained to perform, as per Section 2 hereof.
              {"\n"}{"\n"}
              15.2 This Agreement constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, warranties, representations, negotiations, and discussions, whether oral or written, of the parties except as specifically set forth herein.
              {"\n"}{"\n"}
              15.3 This Agreement shall be binding upon the parties hereto and their respective heirs, administrators, successors, and permitted assigns.
              {"\n"}{"\n"}
              15.4 The costs enumerated in this Agreement are to be paid by the Employer.
              {"\n"}{"\n"}
              15.5 This Agreement may only be altered or amended when such changes are made in writing and executed by the parties hereto. All changes and/or edits must be initialed and dated by both the Member and the Client. Any substantial changes to this Agreement may require that the parties enter into a new Retainer Agreement.
              {"\n"}{"\n"}
              15.6 The Client may, after a Retainer Agreement is signed, appoint a Designate to act on their behalf when dealing with the Recruiter. A Designate must not be compensated by the Client or the Recruiter for acting in the capacity of a Designate.
              {"\n"}{"\n"}
              15.7 The provisions of this Agreement shall be deemed severable. If any provision of this Agreement shall be held unenforceable by any court of competent jurisdiction, such provision shall be severed from this Agreement, and the remaining provisions shall remain in full force and effect.
              {"\n"}{"\n"}
              15.8 The headings utilized in this Agreement are for convenience only and are not to be construed in any way as additions to or limitations of the covenants and agreements contained in this Agreement.
              {"\n"}{"\n"}
              15.9 Each of the parties hereto must do and execute or cause to be done or executed all such further and other things, acts, deeds, documents, and assurances as may be necessary or reasonably required to carry out the intent and purpose of this Agreement fully and effectively.
              {"\n"}{"\n"}
              15.10 The Client acknowledges that he/she has had sufficient time to review this Agreement and has been given an opportunity to obtain independent legal advice and translation prior to the execution and delivery of this Agreement.
              {"\n"}{"\n"}{"\n"}{"\n"} {"\n"}{"\n"}
            </Text>
          </View>
          <View >
            <View>
              <Text style={styles.subHeader}>16. Contact Information:</Text>
              <Text style={[styles.header, styles.textunderline]}>Client</Text>

              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Given Name: <Text style={styles.textunderline}>{felidData && familyJsonArray[0]?.client_first_name
                      ? familyJsonArray[0]?.client_first_name
                      : "        "
                    } </Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Family Name: <Text style={styles.textunderline}>{felidData && familyJsonArray[0]?.client_last_name
                      ? familyJsonArray[0]?.client_last_name
                      : "        "
                    }</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Address: <Text style={styles.textunderline}>{" " + (felidData?.client_address || "        ")}</Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Telephone Number: <Text style={styles.textunderline}>{" " + (felidData?.client_telephone || "          ")}</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Cellphone Number: <Text style={styles.textunderline}>{" " + (felidData?.client_cellphone || "          ")}</Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Fax Number: <Text style={styles.textunderline}>{" " + (felidData?.client_fax || "           ")}</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    E-mail Address: <Text style={styles.textunderline}>{" " + (felidData?.client_email || "           ")}</Text>
                  </Text>
                </View>
              </View>

              <Text style={[styles.header, styles.textunderline]}>Recruiter</Text>

              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Given Name: <Text style={styles.textunderline}>Harpreet</Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Family Name: <Text style={styles.textunderline}>Kaur</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Address: <Text style={styles.textunderline}>2618 Hopewell</Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Telephone Number: <Text style={styles.textunderline}>403-888-5308</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    Fax: <Text style={styles.textunderline}>_____________</Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text style={styles.text}>
                    E-mail: <Text style={styles.textunderline}>info@canpathways.ca</Text>
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}>
                {/* Client Name */}
                <View style={{ width: "33.33%", padding: 10 }}>
                  <Text style={[styles.textunderline, { textTransform: "capitalize" }]}>
                    {familyJsonArray[0]?.client_first_name || ""}{" "}
                    {familyJsonArray[0]?.client_last_name || "_________________"}
                  </Text>
                  <Text>Name of Client</Text>
                </View>
                {/* Client Signature */}
                <View style={{ width: "33.33%", padding: 10 }}>
                  {familyJsonArray[0]?.client_signature ? (
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <Image
                        source={{ uri: familyJsonArray[0]?.client_signature }}
                        style={{ width: "60%", height: "auto" }}
                      />
                      <Text style={{ fontSize: 8, marginTop: 5, marginBottom: 7 }}>
                        <Text style={{ textTransform: "capitalize" }}>
                          {familyJsonArray[0]?.client_first_name || ""}{" "}
                          {familyJsonArray[0]?.client_last_name || ""}{" "}
                        </Text>
                        <Text> {!familyJsonArray[0]?.date_signature_client ||
                          familyJsonArray[0]?.date_signature_client ===
                          "0000-00-00 00:00:00"
                          ? "____________"
                          : moment(familyJsonArray[0]?.date_signature_client).format("DD-MM-YYYY")}</Text>
                      </Text>
                    </View>
                  ) : (
                    <Text>___________________</Text>
                  )}
                  <Text>Signature of Client</Text>
                </View>
                {/* Client Signature Date*/}
                <View style={{ width: "33.33%", padding: 10 }}>
                  <Text style={[styles.textunderline, { marginTop: 10 }]}>
                    {(!familyJsonArray[0]?.date_signature_client || familyJsonArray[0]?.date_signature_client ===
                      "0000-00-00 00:00:00")
                      ? "________________"
                      : moment(familyJsonArray[0]?.date_signature_client).format("DD-MM-YYYY")}
                  </Text>
                  <Text>Date</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}>
                {/* RCIC Name */}
                <View style={{ width: "33.33%", padding: 10 }}>
                  <Text style={[styles.textunderline, { textTransform: "capitalize" }]}>
                    Harpreet Kaur
                  </Text>
                  <Text>Name of RCIC</Text>
                </View>
                {/* RCIC Signature */}
                <View style={{ width: "33.33%", padding: 10 }}>
                  {felidData?.rcic_signature ? (
                    <View style={{ display: "flex", flexDirection: "column" }}>
                      <Image
                        source={{ uri: felidData?.rcic_signature }}
                        style={{ width: "60%", height: "auto" }}
                      />
                      <Text style={{ fontSize: 8, marginTop: 5, marginBottom: 7 }}>
                        <Text style={{ textTransform: "capitalize" }}>
                          Harpreet Kaur{" "}
                        </Text>
                        <Text> {(!felidData?.date_signature_rcic || felidData?.date_signature_rcic === "0000-00-00" || felidData?.date_signature_rcic === "0000-00-00 00:00:00")
                          ? "________________"
                          : moment(felidData?.date_signature_rcic).format("DD-MM-YYYY")}</Text>
                      </Text>
                    </View>
                  ) : (
                    <Text>___________________</Text>
                  )}
                  <Text>Signature of RCIC</Text>
                </View>
                {/* RCIC Signature Date*/}
                <View style={{ width: "33.33%", padding: 10 }}>
                  <Text style={[styles.textunderline, { marginTop: 10 }]}>
                    {(!felidData?.date_signature_rcic || felidData?.date_signature_rcic === "0000-00-00" || felidData?.date_signature_rcic === "0000-00-00 00:00:00")
                      ? "________________"
                      : moment(felidData?.date_signature_rcic).format("DD-MM-YYYY")}
                  </Text>
                  <Text>Date</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

      </View>
    </View>
  );

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
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.5,
  },
  section: {
    // marginBottom: 10
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 20
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "bold",
  },
  text: {
    marginBottom: 5,
    padding: 2,
  },
  image: {
    width: "140px",
    padding: 5,
    // marginBottom: 10
  },
  initial: {
    // marginTop: 10,
    textAlign: "right",
  },
  textunderline: {
    textDecoration: "underline",
  },
  definition: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  clientForm: {
    display: "flex",
    flexDirection: "row",
  },
  clientFormChild: {
    flex: 1,
    padding: 10,
  },
  miscellaneous: {
    margin: 10,
    fontSize: 16,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    border: "1px solid black",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderRight: "1px solid #333",
  },
  headerCell: {
    backgroundColor: "#f0f0f0",
  },
  bold: {
    fontWeight: "bold"
  }
});

export default RecruitmentAgrement;
