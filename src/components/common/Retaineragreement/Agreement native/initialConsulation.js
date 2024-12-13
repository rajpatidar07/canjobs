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
  Link,
} from "@react-pdf/renderer";
import { TbArrowBadgeRight } from "react-icons/tb";
import moment from "moment";
import { AddSharePointDOcument, AddUpdateAgreement } from "../../../../api/api";
// import { toast } from "react-toastify";

const InitialConsultationAgreement = () => {
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
            <Text style={{ textAlign: "center", fontSize: "12px", marginBottom: 15 }}>Between {"\n"} CAN Pathways Immigration Consultancy Ltd.{"\n"}</Text >
            <Text style={[styles.bold, { textAlign: "center", fontSize: "12px", marginBottom: 15 }]}>Client:</Text>
            <Text style={[styles.textunderline, { textAlign: "center", fontSize: "12px", marginBottom: 15 }]}> {familyJsonArray[0]?.client_first_name || ""}{" "}
              {familyJsonArray[0]?.client_last_name || ""}{" "}</Text>
            {"\n"}{"\n"}
          </Text>

          <Text style={styles.paragraph}>
            This Initial Consultation Agreement ("the <Text style={styles.bold}>Agreement</Text>") is made on the date mentioned below.{"\n"}{"\n"}
          </Text>
          <Text style={styles.paragraph}>
            "The <Text style={styles.bold}>Effective Date:</Text> {formattedDate || ""}"{"\n"}{"\n"}
          </Text>
          <Text style={styles.paragraph}>BY AND BETWEEN{"\n"}{"\n"}</Text>
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
            <Text style={styles.bold}>"Legal Representative/RCIC"{"\n"}{"\n"}</Text>
          </Text>
          <Text>
            AND{"\n"}The <Text style={styles.bold}>"Candidate"</Text> as
            his/her details provided as of this present agreement, collectively
            called the <Text style={styles.bold}>"Client."{"\n"}{"\n"}</Text>
          </Text>
          <Text>
            <Text style={styles.bold}>Name:</Text> <Text style={[styles.textunderline]}>{familyJsonArray[0]?.client_first_name || ""}   {familyJsonArray[0]?.client_last_name || "" || "_______________"}</Text>{"\n"}
            <Text style={styles.bold}>Address:</Text> <Text style={[styles.textunderline]}>{felidData?.client_address || "_______________"}{"\n"}</Text>
            <Text style={styles.bold}>Phone Number:</Text> <Text style={[styles.textunderline]}>{felidData?.client_contact || "_______________"}{"\n"}</Text>
            <Text style={styles.bold}>Email Address:</Text><Text style={[styles.textunderline]}> {felidData?.client_email || "_______________"}</Text>{"\n"}{"\n"}
          </Text>
          <Text style={[styles.bold, styles.textunderline]}>AGREEMENT</Text>{"\n"}
          <Text>
            Harpreet Kaur is a member in good standing of the immigration Consultants of Canada Regulatory Council.{"\n"}
            (ICCRC).As such,its By-laws.Code of Professional Ethics, and Regulations bind her.{"\n"}
            Additionally , the provisions of this agreement are subject to ICCRC regulations, certain aspects of which are predetermined and cannot be modified.
          </Text>
        </View>
        <View>
        </View>
        <View>
          <View style={styles.section}>
            <Text style={[styles.header, styles.textunderline]}>
              SCOPE OF SERVICE
            </Text>
            <Text style={styles.text}>
              1. Client is seeking consultation and professional advice from the
              RCIC with respect to one or more of the following (please tick the
              correct service):
            </Text>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>• Visitor visa / Super-visa application{"\n"}• Study permit application{"\n"}• Work permit application / LMIA Related Inquiries (please specify) _____________{"\n"}• Permanent residence / Citizenship application (please specify)
                _____________{"\n"}• Other (please specify): {felidData?.other_professional_advice_initial_consultation ? <Text style={[styles.textunderline]}>{felidData?.other_professional_advice_initial_consultation}</Text> : "_____________"}{"\n"}Please provide additional relevant information below:{"\n"}
                {felidData?.additional_relevant_information ? <Text style={[styles.textunderline]}>{felidData?.additional_relevant_information}</Text> : "___________________________________________________________________________________________"}
              </Text>
            </View>
          </View>
          <View style={[styles.section, { marginTop: 10 }]}>
            <Text style={styles.text}>
              2. The professional services that the RCIC will offer to the Client
              according to the terms specified are mentioned below:
            </Text>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>
                • Gather additional details regarding the Client's objectives.
                {"\n"}
                • Acquire information about the Client's history, qualifications, as well as personal and financial situation.{"\n"}
                • Offer guidance concerning the prevailing state of Canadian
                immigration regulations and policies as they pertain to the Client's inquiry.{"\n"}
                • Examine the information provided by the Client, evaluating its
                alignment with existing Canadian laws and policies.
                {"\n"}• Identify the most suitable immigration approach for the Client, if applicable, and provide recommendations to the Client.
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>3. <Text style={[styles.textunderline]}>LIMITS OF ENGAGEMENT</Text></Text>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>
                • This Agreement comprises a single consultation with 2-3 follow-up
                inquiries pertaining to the initial consultation focusing on the
                matters mentioned earlier. The RCIC will not offer additional
                information or guidance unless both the Client and the RCIC
                explicitly agree to continue discussing these or other topics.
                {"\n"}
                • This agreement does not impose any obligation on the RCIC to
                represent the Client in applications or legal proceedings.
                {"\n"}
                Should the Client require further guidance or representation for another matter beyond the scope of the topic covered in the initial consultation, a distinct retainer agreement with the RCIC must be signed.
                {"\n"}
                • The scope of work under this agreement will be confined to a maximum of 30 minutes.
                {"\n"}
                • We do not provide in-depth career advice or detailed job search assistance during this session. This level of service is exclusively available to appointed clients.
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>4. <Text style={[styles.textunderline]}>CONSULTATION APPROACH</Text></Text>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>
                • The RCIC will offer consultation services to the Client through in-person meetings, phone conversations, or Zoom sessions (video or voice calls).
                {"\n"}
                • The duration of the consultation will extend as required for the RCIC to fulfill the services outlined in this agreement. However, the consultation shall not exceed 30 minutes in duration.
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>5. <Text style={[styles.textunderline]}>PAYMENT OF FEE</Text></Text>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>
                • For the consultation service, the Client is responsible for an
                upfront consultation fee of CAD$200.{"\n"}
                • If the Client promptly engages the services of the RCIC by
                executing a Retainer Agreement and submitting an initial deposit
                fee, the cost of the Initial Consultation will be applied as a
                credit toward the overall fee specified in the Retainer Agreement.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.header}>6. <Text style={[styles.textunderline]}>REFuND POLICY</Text></Text>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>
                • The Client retains the right to receive a refund for any fees that have not been utilized in accordance with this agreement.{"\n"}
                • Fees will be considered earned by the RCIC immediately upon the
                initiation of professional advice delivery. Fees that have been
                earned pursuant to this agreement are not eligible for a refund.{"\n"}
                • Fees will be considered earned by the RCIC immediately upon the initiation of professional advice delivery. Fees that have been earned pursuant to this agreement are not eligible for a refund.
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>7. <Text style={[styles.textunderline]}>OTHER CONDITIONS</Text></Text>

            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>
                <Text>
                  <Text style={[styles.bold, styles.textunderline]}><TbArrowBadgeRight /> CLIENT RESPONSIBILITIES</Text>: The Client is obligated to provide the RCIC with accurate factual information and documentation necessary for the consultation process. Honesty and precision are essential. The Client must disclose all pertinent information, even if it is negative or adverse. Any failure to fully disclose relevant details may impact the advice provided by the RCIC, potentially voiding this Agreement or significantly influencing the Client's application outcome or status retention.
                  {"\n"} {"\n"}
                </Text >
                <Text>
                  <Text style={[styles.bold, styles.textunderline]}><TbArrowBadgeRight /> ADVICE APPLICABLE TO PRESENT DATE</Text>: The consultation given by the RCIC to the Client is founded on the Canadian immigration law and policy as of the date of appointment, where applicable. The RCIC bears no responsibility for any alterations in government legislation or policy that might affect subsequent application processing by the Client.
                  {"\n"} {"\n"}</Text>
                <Text>
                  <Text style={[styles.bold, styles.textunderline]}><TbArrowBadgeRight /> NO GUARANTEE OF OUTCOME</Text>: The RCIC does not guarantee the ability to aid the Client in achieving their business, education, employment, or immigration objectives. The RCIC shall render consulting services to the Client at a standard appropriate for an ICCRC member.
                  {"\n"} {"\n"}</Text >
                <Text>
                  <Text style={[styles.bold, styles.textunderline]}><TbArrowBadgeRight /> CONFIDENTIALITY</Text>: The RCIC is obliged to maintain the Client's confidence and information. This professional commitment exists to foster candid and comprehensive communication between the Client and the RCIC. All information and documentation submitted by the Client and reviewed by the RCIC will remain confidential and will not be shared with any third party, apart from RCIC's agents and employees, unless explicit consent is given or as required by law.
                  {"\n"} {"\n"}</Text >
                <Text>
                  <Text style={[styles.bold, styles.textunderline]}><TbArrowBadgeRight /> DISPUTE RESOLUTION</Text>: In the event of a dispute, both the Client and RCIC must strive to resolve the matter amicably. If a resolution cannot be achieved, the Client must submit the complaint in writing to the RCIC and allow a grace period of 5 business days for the RCIC's response. If the dispute persists, the Client can follow the complaint and discipline procedure delineated by ICCRC on their website:<Link src="http://www.iccrc-crcic.ca/public/complaintsDiscipline.cfm">ICCRC Complaints and Discipline
                  </Link>.ICCRC's Contact Information is as follows:
                  {"\n"}Immigration Consultants of Canada Regulatory Council (ICCRC)
                  {"\n"}5500 North Service Rd., Suite 1002, Burlington, ON, L7L 6W6
                  {"\n"}Toll free: 1-877-836-7543{"\n"}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.header}>8. <Text style={[styles.textunderline]}>APPLICABLE LAW</Text></Text>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.text}>
                The laws in effect in the Province of Alberta, Canada shall govern the terms and conditions of this agreement.
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.header, styles.textunderline]}>
              SIGNED BY THE CLIENT AND THE RCIC IN ACCEPTANCE OF AGREEMENT
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}>
              {/* Client Signature */}
              <View style={{ width: "50%", padding: 10 }}>
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
              {/* RCIC Signature */}
              <View style={{ width: "50%", padding: 10 }}>
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

            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}>
              {/* Client Signature Date*/}
              <View style={{ width: "50%", padding: 10 }}>
                <Text style={[styles.textunderline, { marginTop: 10 }]}>
                  {(!familyJsonArray[0]?.date_signature_client || familyJsonArray[0]?.date_signature_client ===
                    "0000-00-00 00:00:00")
                    ? "________________"
                    : moment(familyJsonArray[0]?.date_signature_client).format("DD-MM-YYYY")}
                </Text>
                <Text>Date</Text>
              </View>
              {/* RCIC Signature Date*/}
              <View style={{ width: "50%", padding: 10 }}>
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

export default InitialConsultationAgreement;
