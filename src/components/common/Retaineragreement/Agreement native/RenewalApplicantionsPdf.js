import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider, Image, PDFViewer } from '@react-pdf/renderer';
import { AddSharePointDOcument, AddUpdateAgreement } from '../../../../api/api';
import {InitialFunction} from '../CommonThings/InitialFunction';
import { ClientSignatureFunction } from '../CommonThings/ClientSignatureFunctionHtml';
import { RCICSignatureFunction } from '../CommonThings/RCICSignatureFunction';
import CommonRetainerAgreementDate from '../CommonRetainerAgreementDate';
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.5,
    color: "#323232"
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
    color: "#000"
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
    color: "#000"
  },
  title: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    color: "#000"
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    marginBottom: 5,
    color: "#000"
  },
  label: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    marginBottom: 5,
    color: "#000"
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
          `${felidData?.type.replaceAll(" ", "_") + `_${felidData?.id}`}.pdf`,
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
          <Text style={[styles.textBold, styles.title, styles.mb5, { textAlign: "center" }]}>
            Retainer Agreement
          </Text>
          <Text style={[styles.mb8]}>
            THIS RETAINER AGREEMENT is made on{" "}
            {felidData?.agreement_date && felidData?.agreement_date !== "0000-00-00" && felidData?.agreement_date !== "0000-00-00 00:00:00" ? (
              <Text style={[{ borderBottomWidth: 1, borderBottomColor: "black" }, styles.underline]}>
                <CommonRetainerAgreementDate _date={felidData?.agreement_date} format={"llll"} />
              </Text>
            ) : (
              "_______________________"
            )}
          </Text>
          <Text>
            Program:{" "}
            <Text style={[styles.textBold, styles.mb8, styles.underline]}>
              Application for Rural Renewal Stream (Innisfail) and Endorsement Letter
            </Text>
          </Text>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={[styles.subtitle]}>1. Contact Information</Text>
            <Text style={[styles.textBold, { marginVertical: 5 }]}>Between Client</Text>
            <Text>
              • Name Of Client:{" "}
              {familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name ? (
                <Text style={[{ borderBottomWidth: 1, borderBottomColor: "black", textTransform: "capitalize" }, styles.underline]}>
                  {familyJsonArray[0]?.client_first_name} {familyJsonArray[0]?.client_last_name || ""}
                </Text>
              ) : (
                "_____________________"
              )}{" "}
              (here in after called the "Client")
            </Text>
            <Text>
              • Business Address:{" "}
              {felidData?.client_address ? <Text style={[{ borderBottomWidth: 1, borderBottomColor: "black", textTransform: "capitalize" }, styles.underline]}>{felidData?.client_address}</Text> : "____________________________"}
            </Text>
            <Text>
              • Phone:{" "}
              {felidData?.client_contact ? (
                <Text style={[{ borderBottomWidth: 1, borderBottomColor: "black" }, styles.underline]}>{felidData?.client_contact}</Text>
              ) : (
                "____________________________"
              )}
            </Text>
            <Text>
              • Email:{" "}

              {felidData?.client_email ? <Text style={[{ borderBottomWidth: 1, borderBottomColor: "black" }, styles.underline]}>{felidData?.client_email}</Text> : "____________________________"}
            </Text>

            {/* RCIC Information */}
            <Text style={[styles.mb5, { marginTop: 10 }]}>And</Text>
            <Text style={[styles.textBold, { fontSize: 12 }, styles.mb5]}>
              Regulated Canadian Immigration Consultant (RCIC):
            </Text>
            <Text style={styles.mb5}>
              <Text style={styles.textBold}>Harpreet Kaur</Text> (here in after called "The RCIC")
            </Text>
            <Text style={styles.mb8}>2618 Hopewell PI NE #310</Text>
            <Text style={styles.mb8}>Calgary, AB T1Y7J7, Canada</Text>
            <Text style={styles.mb8}>Tel: +1 (403) 888-5308</Text>
            <Text style={styles.mb8}>
              Email: <Text style={[styles.link, styles.underline]}>info@canpathways.ca</Text>
            </Text>
            <Text style={styles.mb8}>
              Website: <Text style={[styles.link, styles.underline]}>www.canpathways.ca</Text>
            </Text>
          </View>

          {/* RCIC Responsibilities */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>
              2. RCIC Responsibilities and Commitments
            </Text>
            <Text style={styles.mb8}>
              The Client has asked the RCIC, and the RCIC has agreed, to act on behalf of the Client in matters related to their
              application for the Rural Renewal Stream and Endorsement Letter from the Rural Community of business location.
            </Text>
            <Text style={styles.mb8}>
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
                <Text key={index} style={styles.mb8}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>

          {/* Client Responsibilities */}
          <View style={styles.section}>
            <Text style={[styles.subtitle]}>3. Client Responsibilities and Commitment</Text>
            <Text>The Client agrees to:</Text>
            <View>
              {[
                "Provide all necessary documents in English or with an English translation.",
                "Follow instructions and advice from the RCIC within the prescribed timeframe.",
                "In the event Service Canada office should contact the Client directly, the Client is instructed to notify the RCIC immediately.",
                "The Client understands that they must be accurate and honest in the information they provide and that any inaccuracies may void this Agreement, or seriously affect the outcome of the application or the retention of any status they may obtain.",
                "The Client should use e-mails as the method of contacting the RCIC. The response time is between 2-3 business days.",
                "In the event of a Joint Retainer Agreement, The Client agrees that there will be a single point-of-contact for The Client.",
                "In the event the client is unable to contact the RCIC and has reason to believe the RCIC may be dead, incapacitated, or otherwise unable to fulfill RClC's duties, the client should contact ICCRC.",
                "The Clients agree that the RCIC may share information with all the clients in the event of a Joint Retainer Agreement and if there is a conflict that cannot be resolved RCIC cannot act for both and may have to withdraw completely.",
                "Acknowledges that they have been advised by RCIC that the outcome lies solely with the Government of Canada and that RCIC will not be held responsible for any such decisions.",
                "Acknowledges that he/she is retaining RCIC for immigration services and all fees paid to RCIC are for the same purposes and nothing else.",
                "Comply with the above otherwise can seriously affect the outcome of the results or in delaying or RCIC withdrawing the representation on the client's behalf without refund.",
                "Failure to comply with the above can result in the RCIC withdrawing from the representation of the Client and not giving a refund."
              ].map((item, index) => (
                <Text key={index} style={styles.mb8}>
                  • {item}
                </Text>
              ))}
            </View>
            <Text>
              The RCIC's obligations under this agreement become void if the Client knowingly provides inaccurate, misleading, or false
              information. The Client remains financially responsible.
            </Text>
          </View>
          {/* 4th point */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>4. Billing Method and Payment Terms and Conditions</Text>
            <Text style={[styles.mb8]}>The Client will be billed bya flat fee with payment bymilestones. The details of this billing method are as follows:</Text>
            <Text style={[styles.mb8]}>
              The Client agrees to pay to the RClC a Professional Fee of<Text style={[styles.textBold]}>CAD $5500</Text>b, for the services rendered to the Client in applying to
              <Text style={[styles.mb8]}>Rural Community of business location for Application for Rural Renewal Stream and Endorsement Letter.
              </Text>
            </Text>
            <Text style={[styles.mb8]}>
              The Professional Fee is solely for the services performed by the RCIC and does not include govemment fees or any other fees. Additional charges may be applied if the Client delays in providing necessary information and/or documentationto the RCIC, resulting in the RCIC having to change or modify the application.
            </Text>
            <Text style={[styles.mb8]}>The Client agrees to pay for additional courier fees.</Text>
            <Text style={[styles.mb8]}>Potential costs will apply for additional or new work requested such as additional documentation, applications; redo Rural Community of business location forms after being completed if Rural Community of business location changes forms before submitting; additional follow-up work created by delayed, incomplete, or no response from the Client; additional 'rush' work created by submitting documents requested by Rural Community of business location with less than 5 days left to the Rural Community of business location deadline given; responses to Rural Community of business location requests or challenges that require more than one hour for any single request; requests for unnecessary meetings and frequent updates on the application.</Text>
          </View>
          {/* 5th point */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>5. Payment Schedule</Text>
            <Text style={[styles.mb8]}><Text style={[styles.textBold]}>Total service charges</Text> $5500+ 5%GST</Text>
            <Text style={[styles.mb8]}>
              *Taxes are payable wherever applicable. The above fee does not include any fees payable to the govemment of Canada. While the above fees are non-refundable — if for any reason agreement is terminated any un-used part of fees with be refunded after deduction of any costs. The client may specify the method of refund.
            </Text>
            <Text style={[styles.mb8]}>
              Additional fees that is involved in this process are as follows.
            </Text>
            <Text style={[styles.mb8]}>✓ Job Advertisement fee for each occupation (2 paid Job Ads)<Text style={[styles.textBold]}> CAD 300.00</Text></Text>
            <Text style={[styles.mb8]}>✓ Recruitment charges per applicant (if applicable) <Text style={[styles.textBold]}>CAD 1000.00</Text>.</Text>
          </View>
          {/* 6th section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>6. Methods of Payment: We DO NOT accept cheques. </Text>
            <Text>For Clients Located <Text style={[styles.textBold, styles.mb8]}>INSIDE</Text> Canada, we receive the following methods:</Text>
            <View style={styles.mb8}>
              {[
                "In-person Cash Drop-Off — Please contact us to arrange a time to drop off your payment in cash. We will provide you with a receipt.",
                "E-transfer — Please send the payment and the answer to the secret question to the following e-mail address: info@canpathwavs.ca",
                "Credit CardlPayPal: Instructions will be shared, additional up to 3% charges will be applicable if the client is willing to pay by this method.",
              ].map((item, index) => (
                <Text key={index} style={styles.mb8}>
                  • {item}
                </Text>
              ))}
            </View>
            <Text style={styles.mb8}>
              For Clients Located <Text style={[styles.textBold, styles.mb8]}>OUTSIDE</Text> Canada, we receive the following methods:
            </Text>
            <View>
              {[
                "Wire Transfer- Bank details will be provided once the contract is being signed. ('Banks usually charge a processing fee for wire transfer, so please add CAD $50 fee on top of your payment EVERY TIME you make a wire transfer.",
                "   Credit Card/PayPal: Instructions will be shared, additional up to 5% charges will be applicable if the client is willing to pay by this method."
              ].map((item, index) => (
                <Text key={index} style={styles.mb8}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>
          {/* 7th section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>7. Interest</Text>
            <View>
              {[
                " Payment is due on all of the consultant's accounts when rendered. If any account is not paid within 30 days, interest will be charged on outstanding balance at the rate of 20% per annum from the date of the account, until paid",
                "If the account requires recovery/collection action, in order to recover any fees, a surcharge equivalent to the recovery/collection fee incurred will be applied on the Total Cost and is to be paid by the Client. ",
              ].map((item, index) => (
                <Text key={index} style={styles.mb8}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>
          {/* 8th Section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>8. Refund Policy</Text>
            <Text style={[styles.mb8]}>The Client acknowledges that the approval of the Rural Renewal Stream Application and Endorsement Letter, and the time required for processing this application is at the sole discretion of the government and not the RCIC. Furthermore, the Client acknowledges that fees are not refundable in the event of an application refusal</Text>
            <Text style={[styles.mb8]}>
              If, however, the application is denied because of an error or omission on the part of the RCIC or professional staff, the RCIC will refund part, or all professional fees collected. The Client agrees that the fees paid are for services indicated above, and any refund is strictly limited to the amount of fees paid. if for any reason agreement is terminated any un-used part of fees with be refunded after deduction of any costs. An applicant may specify the method of refund.
            </Text>
          </View>
          {/* 9th section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>9. Dispute Resolution</Text>
            <Text styles={[{ marginBottom: 10 }, styles.mb8]}>
              Please be advised that Harpreet Kaur is a member in good standing of the Immigration Consultants of Canada Regulatory Council (ICCRC), and as such, is bound by its By-laws, Code of Professional Ethics, and associated Regulations. In the event of a dispute related to the Code of Professional Ethics, the Client and RCIC are to make every effort to resolve the matter between the two parties. In the event a resolution cannot be reached, the Client is to present the complaint in writing to the RCIC and allow the RCIC 30 days to respond to the Client. In the event the dispute is still unresolved, the Client may follow the complaint and discipline procedure outlined by the Council on their website under the heading "File a Complaint". NOTE: All complaint forms must be signed.
            </Text>
            <View style={[{ marginBottom: 5, marginTop: 5 }]}>
              <Text styles={[styles.mb8]}>
                ICCRC Contact Information:
              </Text>
              <Text styles={[styles.mb8]}>
                Immigration Consultants of Canada Regulatory Council (ICCRC)
              </Text>
              <Text styles={[styles.mb8]}>
                5500 North Service Rd., Suite 1002 Burlington, ON, L7L 6W6
              </Text>
              <Text styles={[styles.mb8]}>
                Toll-free: 1-877-836-7543
              </Text>
            </View>
          </View>
          {/* 10th section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>10. Confidentiality</Text>
            <Text style={[styles.mb8]}>All information and documentation reviewed by the RCIC, required by Service Canada and CIC and all other governing bodies, and used for the preparation of the application will not be divulged to any third party, other than agents and employees, without prior consent, except as demanded by law. The Client agrees to let the RCIC publish facts about the case as a case study without mentioning names. The RCIC, and all agents and employees of the RCIC, are also bound by the confidentiality requirements of Article 8.1 and 8.5 of the Code of Professional Ethics.
            </Text>
            <Text style={[styles.mb8]}>
              The Client agrees to these of electronic communication and storage of confidential information. The RCIC will use his/her best efforts to maintain a high degree of security for electronic communication and information storage.
            </Text>
          </View>
          {/* 11th section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>11. Force Majeure </Text>
            <Text styles={[styles.mb8]}>
              The RCIC's failure to perform any term of this Retainer Agreement, as a result of conditions beyond his/her control such as, but not limited to, governmental restrictions or subsequent legislation, war, strikes, or acts of God, shall not be deemed a breach of this Agreement.
            </Text>
          </View>
          {/* 12th section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>12. Change Policy</Text>
            <Text style={[styles.mb8]}>The Client acknowledges that if the RCIC is asked to act on the Client's behalf on matters other than those outlined above in this Agreement, or because of a material change in the Client's circumstances, or because of material facts.
            </Text>
            <Text style={[styles.mb8]}>
              The Client acknowledges that if the RCIC is asked to act on the Client's behalf on matters other than those outlined above in this Agreement, or because of a material change in the Client's circumstances, or because of material facts not disclosed at the outset of the application, or because of a change in government legislation regarding the processing of immigration-related applications, the Agreement can be modified accordingly upon mutual agreement.
            </Text>
          </View>
          {/* 13th section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>13. Termination </Text>
            <View>
              {[
                "This Agreement is considered terminated upon completion of tasks identified under section 2 of this agreement.",
                "This Agreement is considered terminated if material changes occur to the Client's application or eligibility. which make it impossible to proceed with services detailed in section 2 of this Agreement.",
                "According to Article 14 of the Code of Professional Ethics, this Agreement may be terminated, upon writing, by the RCIC, provided withdrawal does not cause prejudice to the Client.",
                "In the event of early termination, before substantive work is done by the RCIC, the Client is entitled to pay an administration fee of 15% of the overall Professional Fee indicated on this agreement. This fee covers file opening, initial client assessment, costs of materials, and time spent on the case. Anything beyond this scope is considered substantive work and the fees collected up to that point will not be refunded.",
                "In the event of a dispute arising from the translated version of this Agreement, the English version of this Agreement takes precedence.",
                "This Agreement is subject to the laws in effect in the Province of Alberta, Canada."
                ,
              ].map((item, index) => (
                <Text key={index} style={styles.mb8}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>
          {/* 14th section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>14. Miscellaneous </Text>
            <View>
              {[

                "The Client expressly authorizes the RCIC to act on his/her behalf to the extent of the specific functions which the RCIC was retained to perform, as per Section 2 hereof.",
                "The RCIC and the firm are authorized to collect information and communicate related to my Rural Renewal Stream Application and Endorsement Letter. In case of online applications, I authorize RCIC Harpreet Kaur to electronically sign any required document related to the Application for Rural Renewal Stream and Endorsement Letter (if applicable) and submit the application on my behalf.",
                "This Agreement constitutes the entire agreement between the parties concerning the subject matter here of and supersedes all prior agreements, understandings, warranties, representations, negotiations, and discussions, whether oral or written, except as specifically set forth herein.",
                "This Agreement shall be binding upon the parties hereto and their respective heirs, administrators, successors, and permitted assigns.",
                "This Agreement may only be altered or amended when such changes are made in writing and executed by the parties hereto.",
                "The provisions of this Agreement shall be deemed severable. If any provision of this Agreement shall be held unenforceable by any court of competent jurisdiction, such provision shall be severed from this Agreement, and the remaining provisions shall remain in full force and effect.",
                "The headings utilized in this Agreement are for convenience only and are not to be construed in any way as additions to or limitations of the covenants and agreements contained in this Agreement.",
                "Each of the parties hereto shall do and execute or cause to be done or executed all such further and other things, acts, deeds, documents, and assurances as may be necessary or reasonably required to carry out the intent and purpose of this Agreement fully and effectively.",
                "The Client acknowledges that he/she has had sufficient time to review this Agreement and has been allowed to obtain independent legal advice and translation before the execution and delivery of this Agreement.",
                "In the event the Client did not seek independent legal advice before signing this Agreement, he/she did so voluntarily without any undue pressure and agrees that the failure to obtain independent legal advice shall not be used as a defense to the enforcement of obligations created by this Agreement.",
                "Furthermore, the Client acknowledges that he/she has received a copy of this Agreement and agrees to be bound by its terms.",
                "The Client acknowledges that he/she has requested that the Agreement be written in the English language."
                ,
              ].map((item, index) => (
                <Text key={index} style={styles.mb8}>
                  • {item}
                </Text>
              ))}
            </View>
          </View>
          {/* 15th section */}
          <View style={styles.section}>
            <Text style={[styles.subtitle, styles.mb8]}>15. Validation</Text>
            <Text styles={[styles.mb8]}>
              The Client acknowledges that they have read this Agreement, understand it, have obtained such independent legal advice as they deem appropriate, have sought translation, and agree to be bound by its terms.
            </Text>
            <Text styles={[styles.mb8]}>
              The parties hereto have signed on the date and place here in after set forth.
            </Text>
          </View>
          {/* signature */}
          {/* signature */}
          <View style={styles.container}>
            {/* Left Signature Box (RCIC) */}
            <View style={styles.box}>
              <RCICSignatureFunction isPdf={true} felidData={felidData} />
              <Text style={[styles.text, styles.textBold]}>Harpreet Kaur (RCIC)</Text>
              <Text style={styles.text}>RCIC # R533393</Text>
              <Text style={styles.text}>CAN Pathways Immigration Consultancy Ltd.</Text>
              <Text style={styles.text}><Text style={styles.textBold}>Date:</Text> {felidData?.date_signature_rcic && felidData?.date_signature_rcic !== "0000-00-00 00:00:00" && felidData.date_signature_rcic !== "0000-00-00" ? <Text style={[styles.underline]}><CommonRetainerAgreementDate _date={felidData?.date_signature_rcic} format={"DD-MM-YYYY"} /></Text> : "__________"}</Text>
              <Text style={styles.text}><Text style={styles.textBold}>Signed at:</Text> <Text style={styles.underline}>Calgary, Alberta, Canada</Text></Text>
            </View>

            {/* Right Signature Box (Client) */}
            <View style={styles.box}>
              <ClientSignatureFunction
                felidData={felidData}
                familyJsonArray={familyJsonArray}
                page={"user"}
                isPdf={true}
              />
              <Text style={[styles.text, styles.textBold]}> {familyJsonArray[0]?.client_first_name || familyJsonArray[0]?.client_last_name ? (
                <Text style={[{ textTransform: "capitalize" },]}>
                  {familyJsonArray[0]?.client_first_name} {familyJsonArray[0]?.client_last_name || ""}</Text>) : ""}</Text>
              <Text style={styles.text}><Text style={styles.textBold}>Date:</Text>  {!familyJsonArray[0]?.date_signature_client ||
                familyJsonArray[0]?.date_signature_client === "0000-00-00 00:00:00" ||
                familyJsonArray[0]?.date_signature_client === "0000-00-00"
                ? "__________"
                : <Text style={[styles.underline]}><CommonRetainerAgreementDate _date={familyJsonArray[0]?.date_signature_client} format={"DD-MM-YYYY"} /></Text>}</Text>
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
                  "https://canpathwaysjobs.com/image/Retainer_agreement_logo.png"
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
                  {felidData?.initial ? (
                    <InitialFunction felidData={felidData} isPdf={true} />

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
                      "https://canpathwaysjobs.com/image/Retainer_agreement_logo.png"
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
                      {felidData?.initial ? (
                        <InitialFunction felidData={felidData} isPdf={true} />
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
              </Page>
            </Document>
          </PDFViewer>
        );
      }}
    </BlobProvider >
  );
};

export default RenewalApplicantionsPdf;
