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
import moment from "moment";
import { AddSharePointDOcument, AddUpdateAgreement } from "../../../api/api";
import { toast } from "react-toastify";

const AggrementOne = () => {
  const [blobData, setBlobData] = useState();
  const data = localStorage.getItem("agreementStateData");
  const {
    felidData,
    user_id,
    emp_user_type,
    folderId: folderID /*, code*/,
  } = JSON.parse(data) || {};
  // const latestCode = JSON.stringify(code)
  //   .replace('" <', "<")
  //   .replace('>"', ">")
  //   .replace(/\\n/g, "")
  //   .replace(/>,/g, ">");
  // Function to convert the provided string into React PDF Renderer components
  //   const convertStringToComponent = (str) => {
  //     const htmlParser = new DOMParser();
  //     const doc = htmlParser.parseFromString(str, 'text/html');

  //     const convertNodeToComponent = (node) => {
  //       if (node.nodeType === 3) { // text node
  //         return node.textContent;
  //       }

  //       const { tagName, attributes, childNodes } = node;
  //       const children = Array.from(childNodes).map(convertNodeToComponent);

  //       const style = {};
  //       if (attributes.style) {
  //         attributes.style.value.split(';').forEach((styleRule) => {
  //           const [key, value] = styleRule.split(':');
  //           if (key && value) {
  //             style[key.trim()] = value.trim();
  //           }
  //         });
  //       }
  //       switch (tagName) {
  //         case 'TEXT':
  //           return <Text style={style}>{children}</Text>;
  //         case 'H1':
  //           return <Text style={[styles.header, style]}>{children}</Text>;
  //         case 'H2':
  //           return <Text style={[styles.subHeader, style]}>{children}</Text>;
  //         case 'VIEW':
  //           return <View style={[styles.section, style]}>{children}</View>;
  //         case 'IMG':
  //           return <Image style={[styles.image, style]} src={node.getAttribute('src')} />;
  //         default:
  //           return <Text style={style}>{children}</Text>;
  //       }
  //     };

  //     const components = Array.from(doc.body.childNodes).map(convertNodeToComponent);
  //     return components;
  //   };
  // console.log(latestCode.trim())
  //   const components = convertStringToComponent(latestCode.trim());
  // const convertStringToComponent = (str) => {
  //   const htmlParser = new DOMParser();
  //   const doc = htmlParser.parseFromString(str, 'text/html');
  // console.log(doc)
  //   const convertNodeToComponent = (node) => {
  //     if (node.nodeType === 3) { // text node
  //       return node.textContent;
  //     }

  //     const { tagName, attributes, childNodes } = node;
  //     const children = Array.from(childNodes).map(convertNodeToComponent);

  //     const style = {};
  //     if (attributes.style) {
  //       attributes.style.value.split(';').forEach((styleRule) => {
  //         const [key, value] = styleRule.split(':');
  //         if (key && value) {
  //           style[key.trim()] = value.trim();
  //         }
  //       });
  //     }
  //     switch (tagName) {
  //       case 'TEXT':
  //         return <Text style={style}>{children}</Text>;
  //       case 'H1':
  //         return <Text style={[styles.header, style]}>{children}</Text>;
  //       case 'H2':
  //         return <Text style={[styles.subHeader, style]}>{children}</Text>;
  //       case 'VIEW':
  //         return <View style={[styles.section, style]}>{children}</View>;
  //       case 'IMG':
  //         return <Image style={[styles.image, style]} src={node.getAttribute('src')} />;
  //       default:
  //         return <Text style={style}>{children}</Text>;
  //     }
  //   };

  //   const components = Array.from(doc.body.childNodes).map(convertNodeToComponent);
  //   return components;
  // };

  // const components = convertStringToComponent(htmlString);
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
        // console.log('file =>', file)
        try {
          let res = await AddSharePointDOcument(
            user_id,
            emp_user_type,
            folderID,
            "",
            [file]
          );
          if (res.data.message === "Document Upload") {
            toast.success(`Document Uploaded successfully`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            try {
              let data = {
                id: felidData.id,
                type: felidData.type,
                document_id: res.data.data[0][0].document_id,
              };
              let addDocId = AddUpdateAgreement(data);
              console.log(addDocId);
            } catch (error) {}
          }
          // console.log(res.data)
          if (
            res.data.message === "Failed" &&
            res.data.data === "No Token Found"
          ) {
            toast.success(`Document Uploaded successfully`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
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
    <View style={{ height: "auto" }}>
      <View style={{ padding: "10px 20px" }}>
        <Text
          style={{ textAlign: "center", fontSize: "24px", marginBottom: 15 }}
        >
          RETAINER AGREEMENT
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: 600 }}>
            RCIC Membership Number: R533393{" "}
          </Text>
          <Text style={{ fontWeight: 600 }}>
            Client File Number: : {felidData.client_file_no}
          </Text>
        </View>
        <View>
          <Text>
            This Retainer Agreement is made this {felidData.client_file_no}{" "}
            <Text style={styles.textunderline}>
              {moment(new Date(felidData.agreement_date)).format("Do")}
            </Text>{" "}
            day of{" "}
            <Text style={styles.textunderline}>
              {moment(new Date(felidData.agreement_date)).format("MMMM")}
            </Text>{" "}
            {moment(new Date(felidData.agreement_date)).format("YYYY")} between
            Regulated Canadian Immigration Consultant (RCIC) Harpreet Kaur (the
            “RCIC”), RCIC Membership Number{" "}
            <Text style={styles.textunderline}>R533393</Text>, phone number{" "}
            <Text style={styles.textunderline}> 4038885308</Text>
            <Link
              src="mailto:info@canpathways.ca"
              className="a"
              target="_blank"
            >
              , email{" "}
            </Link>{" "}
            info@canpathways.ca located at
            <Text style={styles.textunderline}>
              {" "}
              Hopewell Pl NE #310 Calgary, AB T1Y 7J7,
            </Text>{" "}
            <Text style={styles.textunderline}> Canada</Text> and Client{" "}
            <Text style={styles.textunderline} className="para_gap">
              {" "}
              {felidData.client_first_name + " " + felidData.client_last_name}
            </Text>{" "}
            (the “Client”)
            <Text className="p">, located at</Text>
            <Text style={styles.textunderline} className="para_gap">
              {" "}
              {felidData.client_address}
            </Text>{" "}
            , email{" "}
            <Text style={styles.textunderline} className="para_gap">
              {" "}
              {felidData.client_email}
            </Text>
            , contact number{" "}
            <Text style={styles.textunderline} className="para_gap">
              {" "}
              {felidData.client_contact}
            </Text>
            .
          </Text>
        </View>
        <View>
          <Text style={{ marginTop: 15 }}>
            WHEREAS the RCIC and the Client wish to enter into a written
            agreement which contains the agreed upon terms and conditions upon
            which the RCIC will provide his/her services to the Client.
          </Text>
        </View>
        <View>
          <Text style={{ marginTop: 15 }}>
            AND WHEREAS the RCIC is a member College of Immigration and
            Citizenship Consultants (the“Council”), the regulator in Canada for
            immigration consultants;
          </Text>
        </View>
        <View>
          <Text style={{ marginTop: 15 }}>
            IN CONSIDERATION of the mutual covenants contained in this
            Agreement, the parties agree as follows:
          </Text>
        </View>
        <View id="l1">
          <View data-list-text="1.">
            <Text style={[styles.definition, { fontWeight: 600 }]}>
              1. Definitions
            </Text>
            <View>
              <Text>
                The terms set out in this Retainer Agreement, have the meaning
                given to such terms in the Retainer Agreement Regulation and
                By-law of the Council, as amended from time to time.
              </Text>
            </View>
          </View>
          <View data-list-text="2.">
            <Text style={[styles.definition, { fontWeight: 600 }]}>
              2. RCIC Responsibilities and Commitments
            </Text>
            <Text>
              The Client asked the RCIC, and the RCIC has agreed, to act for the
              Client in the matter of
            </Text>
            <Text style={styles.textunderline} className="para_gap">
              {felidData.matter}
            </Text>
            <Text>
              . In consideration of the fees paid and the matter stated above,
              the RCIC agrees to do the following:
            </Text>
            <View>
              <Text>
                (a) [Summary of preliminary advice given to the client{" "}
                <Text style={styles.textunderline} className="para_gap">
                  {felidData.summary}
                </Text>
                ]
              </Text>
              <Text>
                (b) [Consultation and providing document checklists and intake
                sheet, file opening]
              </Text>
              <Text>(c) [Data gathering, filling out forms]</Text>
              <Text>(d) [Information verification, completeness check]</Text>
              <Text>(e) [Application submission]</Text>
              <Text>
                (f) [File maintenance and correspondence with client and IRCC]
              </Text>
            </View>
            <Text style={{ marginTop: 15 }}>
              The RCIC shall provide the Client with a finalized, signed copy of
              this Retainer Agreement. RCIC is not responsible for any
              documentation or information provided by client to IRCC in any of
              the previous applications therefore shall not be held
              responsible/liable for it.RCIC will be providing services in
              English Language.
            </Text>
            <Text style={{ marginTop: 15 }}>
              RCIC will return any original document that the client provides as
              soon as the purpose for which the documents were taken is
              complete.(RCICs are required to provide a copy of the Code to the
              client.) 3 Code s.24(3)(c) 4 Code s.24(3)(d) 5 Code s.24(3)(e) 6
              Code s.24(3)(u)
            </Text>
            <Text style={{ marginTop: 15 }}>
              The RCIC is obligated to provide professional, ethical, and
              competent services as per the Code of Professional Conduct of the
              College. A copy of the Code has been provided to the client(s).
              https://laws.justice.gc.ca/eng/regulations/SOR-2022-128/index.html
            </Text>
          </View>
          <View data-list-text="3.">
            <Text style={[styles.definition, { fontWeight: 600 }]}>
              3. Client Responsibilities and Commitments
            </Text>
            <View>
              <Text style={{ marginTop: 5 }}>
                3.1 The Client must provide, upon request from the RCIC:
              </Text>
              <View style={{ marginLeft: 18 }}>
                <Text> • All necessary documentation</Text>
                <Text>
                  • All documentation in English or French, or with an English
                  or French translation
                </Text>
              </View>
              <Text style={{ marginTop: 5 }}>
                3.2 The Client understands that he/she must be accurate and
                honest in the information he/she provides and that any
                misrepresentations or omissions may void this Agreement, or
                seriously affect the outcome of the application or the retention
                of any immigration status he/she may obtain. The RCIC’s
                obligations under the Retainer Agreement are null and void if
                the Client knowingly provides any inaccurate, misleading or
                false material information. The Client’s financial obligations
                remain.
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.3 Client is informed that RCIC might obtain assistance from
                other professionals or services.
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.4 Client understands that RCIC should not be held responsible
                for visa outcome as RCIC cannot guarantee the decision of IRCC.
                If IRCC policy or rules changes before/during or after the
                application submission and client deemed ineligible, RCIC should
                not be held responsible for that.
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.5 In the event Immigration, Refugees and Citizenship Canada
                (IRCC) or Employment and Social Development Canada (ESDC) or
                Provincial Government Administrator or processing Visa Office
                should contact the Client directly, the Client is instructed to
                notify the RCIC immediately.
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.6 The Client is to immediately advise the RCIC of any change
                in the marital, family, or civil status or change of physical
                address or contact information for any person included in the
                application.
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.7 In the event of a Joint Retainer Agreement, the Clients
                agree that the RCIC must share information among all clients, as
                required. Furthermore, if a conflict develops that cannot be
                resolved, the RCIC cannot continue to act for both or all of the
                Clients and may have to withdraw completely from representation.
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.8 All necessary information and documentation in English or
                French, or with an English or French translation, if in any
                other language, with a certified English translation, according
                to the timeline recommended by RCIC. In the event documents are
                not provided or client fails to contact the RCIC in spite of
                request made by RCIC on email provided by client in the retainer
                agreement, before the due date mentioned ( which is within 30
                days from the retainer signed, or earlier also depending upon
                the requirements of the case ) the RCIC can close the file after
                notifying the client in advance about the non-responsiveness. An
                administrative fee of CAD$ 300.00 plus taxes should be paid by
                client to close the file. All pending fees are due and are to be
                paid by client and if there is any unused money with RCIC, it
                should be refunded to client if applicable.
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.9 Client has been explained by RCIC and is aware of high
                chances of application refusal due to weak case and other
                reasons as explained. Client still agrees to go ahead with the
                application.
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.10 The client also allows the RCIC to use of digital
                signatures for the purpose of this application on his/her behalf
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.11 Mode of communication should be email provided by client in
                this retainer only, for all the correspondence between RCIC and
                client and RCIC should be given minimum 7 working days to revert
                to any queries from client. RCIC is not responsible for
                communication/ consequences if client does not receive email
                sent by RCIC and did not communicate with RCIC in given timeline
                or within 15 days of sent email.
              </Text>
              <Text style={{ marginTop: 5 }}>
                3.12 Once client provide all the documents required as per
                checklist, RCIC should be given minimum 3 weeks’ time from the
                time all documents are reviewed by RCIC and deemed complete, to
                submit the file to IRCC.
              </Text>
            </View>
          </View>
          <View data-list-text="4.">
            <Text style={[styles.definition, { fontWeight: 600 }]}>
              4. Payment Schedule
            </Text>
            <View style={{ marginTop: 15 }}>
              Billing method: The Client will be billed by [flat fee with
              payment by milestones]. Payment Terms and Conditions
            </View>
            <View
              style={[styles.table, { textAlign: "center", marginTop: 18 }]}
            >
              <View style={styles.row}>
                <View style={[styles.cell, styles.headerCell]}>
                  <Text style={{ color: "#2ab0d5" }}>Fees details</Text>
                </View>
                <View style={[styles.cell, styles.headerCell]}>
                  <Text style={{ color: "#2ab0d5" }}>Amount (CAD)</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text>Professional Fees</Text>
                </View>
                <View style={styles.cell}>
                  {" "}
                  <Text>{felidData.professional_fees}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <View>
                    <Text>Disbursement:</Text>
                  </View>
                  <View>
                    <Text>Courier charges</Text>
                  </View>
                  <View>
                    <Text>Government fees</Text>
                  </View>
                </View>
                <View style={styles.cell}>
                  <View style={styles.row}>
                    <View
                      style={[
                        {
                          flex: 1,
                          paddingBottom: 8,
                          paddingTop: 4,
                        },
                      ]}
                    >
                      <Text>{felidData.courier_charges}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View
                      style={[
                        {
                          flex: 1,
                          paddingBottom: 8,
                          paddingTop: 8,
                        },
                      ]}
                    >
                      {" "}
                      <Text>{felidData.government_fees}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View
                      style={[
                        {
                          flex: 1,
                          paddingBottom: 8,
                          paddingTop: 8,
                        },
                      ]}
                    >
                      <Text>
                        {parseInt(felidData.courier_charges) +
                          parseInt(felidData.government_fees)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  {" "}
                  <Text>Administrative fee [as required]</Text>
                </View>
                <View style={styles.cell}>
                  {" "}
                  <Text>{felidData.administrative_fee}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text>ApplicableTaxes: {felidData.gst || "0"}%</Text>
                </View>
                <View style={styles.cell}>
                  {" "}
                  <Text>{felidData.applicable_taxes}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text>Balance (Paid at time of filing):</Text>
                </View>
                <View style={styles.cell}>
                  {" "}
                  <Text>{felidData.balance}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ color: "red" }}>Total Cost</Text>
                </View>
                <View style={styles.cell}>
                  {" "}
                  <Text>{felidData.total_cost}</Text>
                </View>
              </View>
            </View>
            <Text style={{ marginTop: 15 }}>
              Invoice Frequency: The RCIC must provide an Invoice to the Client
            </Text>
            <Text style={{ marginTop: 15 }}>
              Note: The courier charges and Government fees based on current
              rates and may change anytime on or before submission.
            </Text>

            <View style={[styles.table, { marginTop: 18 }]}>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ color: "#2ab0d5" }}>
                    RCIC Service Milestone
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: "#2ab0d5" }}>
                    Estimated date of Completion
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: "#2ab0d5" }}>
                    Professional Fees (Non-Refundable)
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: "#2ab0d5" }}>
                    Applicable Retainer Fee for this stage (Non- Refundable)
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={{ color: "#2ab0d5" }}>
                    Applicable Government Processing Fee
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text>
                    Step 1 Completes upon signing the retainer and sharing the
                    checklists and intake sheet with client. Data gathering and
                    Creating Express Entry Profile
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text>
                    <br />
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text>Non-refundable</Text>
                </View>
                <View style={styles.cell}>
                  <Text>{felidData.applicable_retainer_fee_stape_1}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>
                    {felidData.applicable_government_processing_fee_stape_1}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.cell}>
                  <Text style={{ marginTop: 2 }}>
                    Step 2 Application preparation, filling out the forms,
                    information verification and completeness check, preparing
                    the application package Payment is due before final
                    submission of application. Provide proof of submission to
                    the client
                  </Text>
                </View>
                <View style={styles.cell}></View>
                <View style={styles.cell}>
                  <Text>Non-refundable</Text>
                  <Text>
                    All payments made are non- refundable and total service
                    charges to be collected regardless, whether the client/ s
                    withdraw from the file at this stage. The government fee and
                    courier charges must be paid apart from professional fees
                    payment scheduled at this stage
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text>{felidData.applicable_retainer_fee_stape_2}</Text>
                </View>
                <View style={styles.cell}>
                  <Text>
                    {felidData.applicable_government_processing_fee_stape_2}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  TotalAmount (Non-Refundable) (Paid at signing of contract and
                  sharing of checklist)
                </Text>
                :
                <Text style={styles.textunderline}>
                  {felidData.total_amount_signing_of_contract} $
                </Text>
              </View>
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  Balance (Non-Refundable) (Paid at time of filing)
                </Text>
                :
                <Text style={styles.textunderline}>
                  {felidData.balance_paid_at_time_of_filing} $
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 15 }}>Note:</View>
            <View id="l5">
              <View style={{ marginTop: 15 }} data-list-text="•">
                <Text>
                  • There will be an additional fee, or a new fee arrangement
                  will be agreed upon for government’s any further request for
                  additional information/documentation of up to $1000.00 such as
                  updating the forms, asking for immigration status update,
                  documents related to marital status change, procedural
                  fairness response or preparing and submitting statutory
                  declarations, affidavits etc.
                </Text>
              </View>
              <View style={{ marginTop: 15 }} data-list-text="•">
                <Text>
                  • If a fee has been quoted in this Retainer, then, while the
                  RCIC expects that his fee will not exceed the
                </Text>
                <Text>
                  amount quoted, the RCIC reserves the right to charge more in
                  appropriate cases, such as immediate and pressing
                  circumstances, the requirement for work outside normal
                  business hours, or other special demands made by the client.
                </Text>
              </View>
              <View style={{ marginTop: 15 }} data-list-text="•">
                <Text>
                  • The RCIC reserves the right to alter the amount of the final
                  account to reflect the remaining balance of the fees owed plus
                  any Disbursements and fees for additional services to which
                  the parties previously agreed.
                </Text>
              </View>
              <View style={{ marginTop: 15 }} data-list-text="•">
                <Text>
                  • For application delayed or abandoned beyond 90 days, client
                  is subjected to $350 fee plus applicable taxes to resume the
                  file.
                </Text>
              </View>
              <View style={{ marginTop: 15 }} data-list-text="•">
                <Text>
                  • Full services charges to be paid by client if client decided
                  to withdraw/discharge representation at second/last stage of
                  application.
                </Text>
              </View>
              <View style={{ marginTop: 15 }} data-list-text="•">
                <Text>
                  • Fees charges by Canadian government for application
                  processing has to be paid by client.
                </Text>
              </View>
            </View>
          </View>
          <View data-list-text="5.">
            <Text
              style={[styles.definition, { fontWeight: 600, marginTop: 15 }]}
            >
              5. Methods of Payment: We DO NOT accept cheques.
            </Text>
            <Text style={styles.textunderline}>
              For Clients Located INSIDE Canada, we receive the following
              payment options:
            </Text>

            <View id="l6">
              <View style={{ marginTop: 15 }} data-list-text="o">
                <Text>
                  <Text style={{ fontWeight: "bold" }}>
                    o In-person Cash Drop-Off
                  </Text>
                  – Please contact us to arrange a time to drop off your payment
                  in cash. We will provide you with a receipt.
                </Text>
              </View>
              <View data-list-text="o">
                <Text>
                  <Text style={{ fontWeight: "bold" }}> o E-transfer</Text>
                  <Link
                    src="mailto:accounts@canpathways.com"
                    className="a"
                    target="_blank"
                  >
                    – Please send the payment and the answer to the secret
                    question to the following e-mail address:{" "}
                  </Link>
                  <Link
                    src="mailto:accounts@canpathways.com"
                    className="s15"
                    target="_blank"
                  >
                    accounts@canpathways.com
                  </Link>
                </Text>
              </View>
              <View data-list-text="o">
                <Text>
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    o Credit Card/PayPal:
                  </Text>
                  Instructions will be shared, additional up to{" "}
                  <Text style={{ fontWeight: "bold" }}>3%</Text>
                  charges will be applicable if the client is willing to pay by
                  this method.
                </Text>
                <Text style={{ marginTop: 15 }}>
                  <Text style={[styles.textunderline]}>
                    For Clients Located OUTSIDE Canada, we receive the following
                    payment options:
                  </Text>
                </Text>
                <View id="l7">
                  <View style={{ marginTop: 15 }} data-list-text="o">
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {" "}
                        o Wire Transfer
                      </Text>
                      <Text className="p">
                        - Bank details will be provided once the contract is
                        being signed. (*Banks usually charge a processing fee
                        for wire transfer, so please add{" "}
                      </Text>{" "}
                      <Text style={{ fontWeight: "bold" }}>CAD $50</Text>
                      fee on top of your payment EVERY TIME you make a wire
                      transfer;
                    </Text>
                  </View>
                  <View data-list-text="o">
                    <Text style={{ marginTop: 5 }}>
                      <Text style={{ fontWeight: "bold" }}>o Paypal:</Text>
                      Instructions will be shared, additional up to
                      <Text style={{ fontWeight: "bold" }}> 5%</Text>
                      charges will be applicable if the client is willing to pay
                      by this method.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View data-list-text="6.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              6. Interest
            </Text>
            <Text style={{ marginTop: 8 }}>
              Payment is due on all of the consultant’s accounts when rendered.
              If any account is not paid within 30 days, interest will be
              charged on outstanding balance at the rate of 20% per annum from
              the date of the account, until paid.
              <Text
                style={{
                  color: "#010101",
                  marginTop: 10,
                }}
              >
                If the account requires recovery/collection action, in order to
                recover any fees, a surcharge equivalent to the
                recovery/collection fee incurred will be applied on the Total
                Cost and is to be paid by the Client.
              </Text>
            </Text>
          </View>
          <View data-list-text="7.">
            <Text
              style={[{ fontWeight: 600, marginTop: 15 }, styles.definition]}
            >
              7. Refund Policy
            </Text>
            <Text style={{ marginTop: 5 }}>
              The Client acknowledges that the granting of a visa or status and
              the time required for processing this application is at the sole
              discretion of the government of Canada (or Government Authorities)
              and not the RCIC. Furthermore, the Client acknowledges that fees
              are not refundable in the event of an application refusal.
            </Text>
            <Text style={{ marginTop: 5 }}>
              If, however, the RCIC or professional staff do not complete the
              tasks identified under section 2 of this Agreement, the RCIC will
              refund part or all of the professional fees collected. The Client
              agrees that the professional fees paid are for services indicated
              above, and any refund is strictly limited to the amount of
              professional fees paid.
            </Text>
            <Text style={[styles.textunderline, { marginTop: 15 }]}>
              RCIC will not refund any fee paid by the client if
            </Text>
            <View id="l8">
              <View style={{ marginTop: 8 }} data-list-text="">
                <Text>
                   Cancellation by the applicant of the immigration application
                  for any reason whatsoever after the signature on the contract
                </Text>
              </View>
              <View style={{ marginTop: 8 }} data-list-text="">
                <Text>
                   Later modification in government regulations that is out of
                  control
                </Text>
              </View>
              <View style={{ marginTop: 8 }} data-list-text="">
                <Text>
                  {" "}
                   Hiding information or submission of false documents
                </Text>
              </View>
              <View style={{ marginTop: 8 }} data-list-text="">
                <Text>  Disregarding RCIC’s instructions</Text>
              </View>
              <View style={{ marginTop: 8 }} data-list-text="">
                <Text>
                   Not providing required documents within given time frame
                </Text>
              </View>
            </View>

            <Text style={{ marginTop: 15 }}>
              If application is refused because of an error or omission on the
              part of the RCIC or the professional staff, Unused and/or unearned
              fees will be refunded in accordance with the
              <Text style={styles.textunderline}>
                Client File Management Regulation
              </Text>
              , the
              <Text style={styles.textunderline}>
                Client Account Regulation
              </Text>{" "}
              and the
              <Text style={styles.textunderline}>
                Retainer Agreement Regulation
              </Text>{" "}
              and in the following manner:
            </Text>
            <Text>Cheque</Text>
            {/*<Text style={styles.textunderline}></Text>*/}
            <Text>
              [describe the manner of refund, including method and timeframe]
            </Text>
            <Text style={{ marginTop: 5 }}>
              There shall be no refund due if the application is not submitted,
              refused, returned, or cannot proceed due to reasons relating to
              government policy, a change in the selection criteria,
              inadmissibility, if the client fails to adequately support all
              qualifications claimed, or if the client voluntarily withdraws the
              application.
            </Text>
          </View>
          <View data-list-text="8.">
            <Text style={[styles.definition, { fontWeight: 600 }]}>
              8. Invoicing
            </Text>
            <Text>The RCIC will provide invoices, which include:</Text>
            <View id="l9">
              <View style={{ marginTop: 2 }} data-list-text="">
                <Text>• the name and address of the Client,</Text>
              </View>
              <View style={{ marginTop: 2 }} data-list-text="•">
                <Text>• a list of services rendered,</Text>
              </View>
              <View style={{ marginTop: 2 }} data-list-text="•">
                <Text>• the date(s) the services were rendered, and</Text>
              </View>
              <View style={{ marginTop: 2 }} data-list-text="•">
                <Text>
                  • the total fees and applicable taxes payable to the Member
                  for the services rendered.
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              Invoices must be provided to the Client in accordance with the
              payment terms and conditions, found in section 2 of this Retainer
              Agreement. Additionally, upon the RCIC withdrawing or being
              discharged from representation, the RCIC must provide the Client
              with Statement of Account detailing all services that have been
              rendered or accounting for the time that has been spent on the
              Client’s file.
            </View>
          </View>
          <View data-list-text="9.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              9. Dispute Resolution Related to the Code of Professional Ethics
            </Text>
            <Text style={{ marginTop: 5 }}>
              In the event of a dispute related to the Professional Services
              provided by the RCIC, the Client and RCIC are to make every
              reasonable effort to resolve the matter between the two parties.
              In the event a resolution cannot be reached, the Client is to
              present the complaint in writing to the RCIC and allow the RCIC
            </Text>
            <Text style={{ marginTop: 5 }}>
              <Text style={styles.textunderline}>30</Text> days to respond to
              the Client. In the event the dispute is still unresolved, the
              Client may follow the complaint and discipline procedure outlined
              by the Council on their
              <Text className="s17" style={{ marginTop: 2 }}>
                website:
              </Text>
              <Link src="http://www.iccrc-crcic.ca/" target="_blank">
                {" "}
              </Link>
              <Link src="http://www.iccrc-crcic.ca/" target="_blank">
                www.iccrc-crcic.ca.
              </Link>
            </Text>
            <View style={{ marginTop: 8 }}>ICCRC Contact Information:</View>
            <View style={{ marginTop: 2 }}>
              Immigration Consultants of Canada Regulatory Council (ICCRC) 5500
              North Service Rd., Suite 1002
            </View>
            <Text style={{ marginTop: 2 }}>
              Burlington, ON, L7L 6W6 Toll-free: 1-877-836-7543
            </Text>
          </View>
          <View data-list-text="10.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              10. Confidentiality
            </Text>
            <Text style={{ marginTop: 5 }}>
              All information and documentation reviewed by the RCIC, required
              by IRCC and all other governing bodies, and used for the
              preparation of the application will not be divulged to any third
              party, other than agents and employees of the RCIC, without prior
              consent, except as demanded by the Council or required under law.
              The RCIC, and all agents and employees of the RCIC, are also bound
              by the confidentiality requirements of Article 8 of the Code of
              Professional Ethics.
            </Text>

            <Text style={{ marginTop: 15 }}>
              The Client agrees to the use of electronic communication and
              storage of confidential information. The RCIC will use his/her
              best efforts to maintain a high degree of security for electronic
              communication and information storage.
            </Text>
            <Text style={{ marginTop: 5 }}>
              The client must file a written authorization with the RCIC, naming
              the person if client wishes another person or family member to be
              able to access information on a file.
            </Text>
          </View>
          <View data-list-text="11.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              11. Unplanned RCIC Absence
            </Text>
            <Text style={{ marginTop: 2 }}>
              In the event the Client is unable to contact the RCIC and has
              reason to believe the RCIC may be dead, incapacitated, or
              otherwise unable to fulfill his/her duties, the Client should
              contact ICCRC.
            </Text>
          </View>
          <View data-list-text="12.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              12. Force Majeure
            </Text>
            <Text style={{ marginTop: 2 }}>
              The RCIC’s failure to perform any term of this Retainer Agreement,
              as a result of conditions beyond his/her control such as, but not
              limited to, governmental restrictions or subsequent legislation,
              war, strikes, or acts of God, shall not be deemed a breach of this
              Agreement.
            </Text>
          </View>
          <View data-list-text="13.">
            <Text style={[styles.definition]}>13. Change Policy</Text>

            <Text style={{ marginTop: 2 }}>
              The Client acknowledges that if the RCIC is asked to act on the
              Client’s behalf on matters other than those outlined above in the
              scope of this Agreement, or because of a material change in the
              Client’s circumstances, or because of material facts not disclosed
              at the outset of the application, or because of a change in
              government legislation regarding the processing of immigration or
              citizenship-related applications, the Agreement can be modified
              accordingly.
            </Text>

            <Text style={{ marginTop: 2 }}>
              This Agreement may only be altered or amended when such changes
              are made in writing and executed by the parties hereto. All
              changes and/or edits must be initialed and dated by both the
              Member and the Client. Any substantial changes to this agreement
              may require that the parties enter into a new Retainer Agreement.
            </Text>
          </View>
          <View data-list-text="14.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              14. Termination
            </Text>
            <View id="l10">
              <View data-list-text="14.1" style={{ marginTop: 2 }}>
                <Text>
                  14.1 This Agreement is considered terminated upon completion
                  of tasks identified under section 2 of this agreement.
                </Text>
              </View>
              <View data-list-text="14.2" style={{ marginTop: 2 }}>
                <Text>
                  14.2 This Agreement is considered terminated if material
                  changes occur to the Client’s application or eligibility,
                  which make it impossible to proceed with services detailed in
                  section 2 of this Agreement.
                </Text>
              </View>
            </View>
          </View>
          <View data-list-text="15.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              15. Discharge or Withdrawal of Representation
            </Text>
            <View id="l11">
              <View data-list-text="15.1" style={{ marginTop: 2 }}>
                <Text>
                  15.2 The Client may discharge representation and terminate
                  this Agreement, upon writing, at which time any outstanding or
                  unearned fees or Disbursements will be refunded by the RCIC to
                  the Client and/or any outstanding fees or Disbursements will
                  be paid by the Client to the RCIC.
                </Text>
              </View>
              <View data-list-text="15.2" style={{ marginTop: 2 }}>
                <Text>
                  15.2 Pursuant to Article 11 of the
                  <Text style={styles.textunderline}>
                    Code of Professional Ethics
                  </Text>
                  , the RCIC may withdraw representation and terminate this
                  Agreement, upon writing, provided withdrawal does not cause
                  prejudice to the Client, at which time any outstanding or
                  unearned fees or Disbursements will be refunded by the RCIC to
                  the Client and/or any outstanding fees or Disbursements will
                  be paid by the Client to the RCIC.
                </Text>
              </View>
              <View data-list-text="15.3" style={{ marginTop: 2 }}>
                <Text>
                  15.3 At the time of withdrawal or discharge, the RCIC must
                  provide the Client with an invoice detailing all services that
                  have been rendered or accounting for the time that has been
                  spent on the Client’sfile.
                </Text>
              </View>
            </View>
          </View>
          <View data-list-text="16.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              16. Governing Law
            </Text>
            <Text style={{ marginTop: 2 }}>
              This Agreement shall be governed by the laws in effect in the
              Province/Territory of Alberta, and the federal laws of Canada
              applicable therein and except for disputes pursuant to Section 9
              hereof, any dispute with respect to the terms of this Agreement
              shall be decided by a court of competent jurisdiction within the
              Province/Territory of Alberta
            </Text>
          </View>
          <View data-list-text="17.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              17. Amendments to the Service Agreement
            </Text>
            <Text style={{ marginTop: 2 }}>
              This service agreement may only be altered or amended when such
              changes are made in writing with the consent of both parties,
              signed and dated by the RCIC and the client
            </Text>
          </View>
          <View data-list-text="18.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              18. Miscellaneous
            </Text>
            <View id="l12">
              <Text style={{ marginTop: 2 }}>
                18.1 The Client expressly authorizes the RCIC to act on his/her
                behalf to the extent of the specific functions which the RCIC
                was retained to perform, as per Section 2 hereof.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.2 This Agreement constitutes the entire agreement between the
                parties with respect to the subject matter hereof and supersedes
                all prior agreements, understandings, warranties,
                representations, negotiations and discussions, whether oral or
                written, of the parties except as specifically set forth herein.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.3 This Agreement shall be binding upon the parties hereto and
                their respective heirs, administrators, successors and permitted
                assigns.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.4 The Costs enumerated in this Agreement are to be paid by
                the Client.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.5 This Agreement may only be altered or amended when such
                changes are made in writing and executed by the parties hereto.
                All changes and/or edits must be initialed and dated by both the
                Member and the Client. Any substantial changes to this Agreement
                may require that the parties enter into a new Retainer
                Agreement.
              </Text>
              <Text style={{ marginTop: 2 }}>
                15.6 The Client may, after a Retainer Agreement is signed,
                appoint a Designate to act on their behalf when dealing with the
                RCIC. A Designate must not be compensated by the Client or the
                RCIC for acting in the capacity of a Designate.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.7 The provisions of this Agreement shall be deemed severable.
                If any provision of this Agreement shall be held unenforceable
                by any court of competent jurisdiction, such provision shall be
                severed from this Agreement, and the remaining provisions shall
                remain in full force and effect.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.8 The headings utilized in this Agreement are for convenience
                only and are not to be construed in any way as additions to or
                limitations of the covenants and agreements contained in this
                Agreement.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.9 Each of the parties hereto must do and execute or cause to
                be done or executed all such further and other
              </Text>
              <Text style={{ marginTop: 2 }}>
                things, acts, deeds, documents and assurances as may be
                necessary or reasonably required to carry out the intent and
                purpose of this Agreement fully and effectively.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.10 The Client acknowledges that he/she has had sufficient
                time to review this Agreement and has been given an opportunity
                to obtain independent legal advice and translation prior to the
                execution and delivery of this Agreement.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.11 In the event the Client did not seek independent legal
                advice prior to signing this Agreement, he/she did so
                voluntarily without any undue pressure and agrees that the
                failure to obtain independent legal advice must not be used as a
                defense to the enforcement of obligations created by this
                Agreement.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.12 Furthermore, the Client acknowledges that he/she has
                received a copy of this Agreement and agrees to be bound by its
                terms.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.13 The Client acknowledges that RCIC is not responsible if
                application was submitted on time as per IRCC before midnight
                UTC but submission confirmation from IRCC received next day in
                UTC. RCIC must not be held accountable for any further
                implication including but not limited to missing deadline,
                status expiry due to this IRCC online system error.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.14 The client is aware that IRCC processing time and
                approvals are not in RCIC’s control and timeline frames provided
                to the client is according to IRCC’s website.
              </Text>
              <Text style={{ marginTop: 2 }}>
                18.15 The Client acknowledges that he/she has requested that the
                Agreement be written in the English language and that English is
                the binding language.
              </Text>
            </View>
          </View>
          <View
            data-list-text="19."
            style={{
              marginTop: 15,
              fontWeight: "300",
            }}
          >
            <Text>
              19. The company and RCIC is not part of the hiring process and is
              just acting as representative for filing the application from the
              applicant side. The company and RCIC will not be responsible for
              authenticity or legitimacy of any documents submitted in support
              of application. The client is sole responsible for providing all
              the supporting documents.
            </Text>
          </View>
          <View
            data-list-text="20."
            style={{
              marginTop: 15,
              fontWeight: "300",
            }}
          >
            <Text>
              20. CLIENT ACKNOWLEDGES THAT ALL THE 9 PAGES HAVE BEEN READ AND
              INITIALED AFTER ACCEPTING ALL THE TERMS AND CONDITIONS OF THIS
              RETAINER AGREEMENT
            </Text>
          </View>
          <View data-list-text="21.">
            <Text style={[{ fontWeight: 600 }, styles.definition]}>
              21. Contact Information
            </Text>

            <Text>Client Name</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text>
                    Given Name:{" "}
                    <Text style={styles.textunderline} className="para_gap">
                      {felidData.client_first_name || "_______________"}
                    </Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text>
                    Family Name:
                    <Text style={styles.textunderline} className="para_gap">
                      {felidData.client_last_name || "_______________"}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text>
                    {" "}
                    Address:{" "}
                    <Text style={styles.textunderline} className="para_gap">
                      {felidData.client_address || "_______________"}
                    </Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text>
                    {" "}
                    Telephone Number:{" "}
                    <Text style={styles.textunderline} className="para_gap">
                      {felidData.client_telephone || "_______________"}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text>
                    Cellphone Number:
                    <Text style={styles.textunderline} className="para_gap">
                      {felidData.client_cellphone || "_______________"}
                    </Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text>
                    E-mail Address:
                    <Text style={styles.textunderline} className="para_gap">
                      {felidData.client_email || "_______________"}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <Text>RCIC</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <View style={styles.clientForm}>
                <Text style={styles.clientFormChild}>
                  <Text>
                    Given Name
                    <Text style={styles.textunderline}> Harpreet </Text>
                  </Text>
                </Text>
                <Text style={styles.clientFormChild}>
                  <Text>
                    Family Name:{" "}
                    <Text style={styles.textunderline} className="para_gap">
                      Kaur
                    </Text>
                  </Text>
                </Text>
              </View>
              <View style={styles.clientForm}>
                <Text style={styles.clientFormChild}>
                  <Text>
                    Address:{" "}
                    <Text style={styles.textunderline}>
                      2618 Hopewell Pl NE #310 Calgary, AB T1Y 7J7
                    </Text>
                  </Text>
                </Text>
                <Text style={styles.clientFormChild}>
                  <Text>
                    Telephone Number
                    <Text style={styles.textunderline}> 403-888-5308</Text>
                  </Text>
                </Text>
              </View>
              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text>
                    <Text style={styles.cell}>
                      Fax Number
                      <Text style={styles.textunderline} className="para_gap">
                        {felidData.client_fax || "_______________"}
                      </Text>
                    </Text>
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text style={styles.cell}>
                    E-mail Address
                    <Link
                      src="mailto:info@canpathways.ca"
                      className="s19"
                      target="_blank"
                    >
                      info@canpathways.ca
                    </Link>
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ marginTop: 15 }}>
              IN WITNESS THEREOF this Agreement has been duly executed by the
              parties hereto on the date first above written.
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginTop: 15,
              }}
            >
              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text>________________</Text>
                  <Text style={{ margin: "0 0 30px 0" }}>
                    Signature of Client
                  </Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text>________________</Text>
                  <Text style={{ margin: "0 0 30px 0" }}>
                    Signature of RCIC
                  </Text>
                </View>
              </View>
              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text
                    className="para_gap"
                    style={[
                      { margin: 0, marginBottom: 5 },
                      styles.textunderline,
                    ]}
                  >
                    {felidData.client_first_name && felidData.client_last_name
                      ? felidData.client_first_name +
                        " " +
                        felidData.client_last_name
                      : "_______________"}
                  </Text>
                  <Text style={{ margin: "0 0 30px 0" }}>Name of Client</Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text
                    className="para_gap"
                    style={[
                      { margin: 0, marginBottom: 5 },
                      styles.textunderline,
                    ]}
                  >
                    Harpreet Kaur
                  </Text>
                  <Text style={{ margin: "0 0 30px 0" }}>Name of RCIC</Text>
                </View>
              </View>
              <View style={styles.clientForm}>
                <View style={styles.clientFormChild}>
                  <Text
                    className="para_gap"
                    style={{ margin: 0, marginBottom: 5 }}
                  >
                    {!felidData.date_signature_client ||
                    felidData.date_signature_client === "0000-00-00"
                      ? "____________"
                      : felidData.date_signature_client}
                  </Text>
                  <Text style={{ margin: "0 0 30px 0" }}>Date</Text>
                </View>
                <View style={styles.clientFormChild}>
                  <Text
                    className="para_gap"
                    style={{ margin: 0, marginBottom: 5 }}
                  >
                    {!felidData.date_signature_rcic ||
                    felidData.date_signature_rcic === "0000-00-00"
                      ? "____________"
                      : felidData.date_signature_rcic}
                  </Text>
                  <Text style={{ margin: "0 0 30px 0" }}>Date</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={[{ textAlign: "center" }, styles.definition]}>
            AUTHORIZATION
          </Text>
          <Text style={{ marginTop: 5 }}>
            I
            <Text style={styles.textunderline} className="para_gap">
              {felidData.client_first_name && felidData.client_last_name
                ? felidData.client_first_name + " " + felidData.client_last_name
                : "_______________"}
            </Text>
            ( hereinafter referred to as the “client”), hereby authorize and
            appoint Harpreet kaur (hereinafter referred to as the “RCIC” with a
            CICC# R533393), of CAN Pathways Immigration consultancy
            ltd.,(hereinafter referred to as the “firm”), to represent me in my
            application to IRCC.
          </Text>
          <Text style={{ marginTop: 5 }}>
            I
            <Text style={styles.textunderline} className="para_gap">
              {felidData.client_first_name + " " + felidData.client_last_name}
            </Text>
            ( hereinafter referred to as the “client”), hereby authorize and
            appoint Harpreet kaur (hereinafter referred to as the “RCIC” with a
            CICC# R533393), of CAN Pathways Immigration consultancy
            ltd.,(hereinafter referred to as the “firm”), to represent me in my
            application to IRCC.
          </Text>
          <Text style={{ marginTop: 5 }}>
            The RCIC and the firm are authorized to assign any of its staff
            members, associates, affiliates, lawyers or the agents to process
            any matters in whole or part related to above- mentioned subject as
            they deem appropriate.
          </Text>
          <Text style={{ marginTop: 5 }}>
            The RCIC and the firm are authorized to collect information and
            communicate with IRCC related to my immigration file. In case of
            Online application, I authorize RCIC Harpreet kaur to electronically
            sign and submit the application on my behalf.
          </Text>
          <Text style={{ marginTop: 5 }}>
            I also give permission to the RCIC and the firm to post photos on
            social media ensuring that my private information is redacted.
          </Text>
          <Text style={{ marginTop: 5 }}>
            In doing so, they my each receive or pay each other any pecuniary
            remuneration/benefits that may be acquired directly or indirectly
            including those from a third party for the purpose of obtaining a
            favorable and expeditious results.
          </Text>
          <Text style={[{ marginTop: 5 }, styles.definition]}>Declaration</Text>
          <View id="l13">
            <Text style={{ marginTop: 5 }}>
              1. I affirm that neither I nor any other family members included
              in my application have presented or will present at any future
              date, false and misleading information to either the consultant,
              the firm or to the government of Canada.
            </Text>

            <Text style={{ marginTop: 2 }}>
              2. I affirm that neither I nor any other family members included
              in my application have presented or will present at any future
              date, fraudulently obtained or forged documents to either the
              consultant, the firm or to the government of Canada.
            </Text>

            <Text style={{ marginTop: 2 }}>
              3. I affirm that it is my responsibility to ensure the
              co-operation of my relatives/employers/educational institutes as
              needed.
            </Text>

            <Text style={{ marginTop: 2 }}>
              4. In the event the Immigration office responsible should contact
              the Client directly, the Client is instructed to notify the RCIC
              immediately
            </Text>

            <Text style={{ marginTop: 2 }}>
              5. If a refusal of my application is due to medical or criminal
              issues additional services will have to be agreed on in a
              different retainer and new fees negotiated. The steps to resolve
              any medical or criminal inadmissibility will not form part of this
              agreement.
            </Text>

            <Text style={{ marginTop: 2 }}>
              6. I undertake to inform the consultant, the firm or the
              Government of Canada of any change in marital or civic status or
              change of my physical address and contact information for myself
              and all persons included in my application. If such changes occur
              and it requires additional services not herein referred to, it
              will be agreed upon apart from this commitment.
            </Text>

            <Text style={{ marginTop: 2 }}>
              7. I understand that
              <Text style={{ color: "#010101" }}>
                The RCIC’s obligations under the Engagement are null and void if
                the Client knowingly provides any inaccurate, misleading or
                false material information. The Client’s financial obligations
                remain
              </Text>
            </Text>

            <Text style={{ marginTop: 2 }}>
              8. I understand that the processing times are only an estimate
              given by the Government and that I will not hold the consultant,
              the firm or the Government of Canada responsible for any delays
              except where it is due to negligence from the firm.
            </Text>

            <Text style={{ marginTop: 2 }}>
              9. I agree that if my application is refused because I neglected
              to provide the required documents within the notified time frame
              the consultant, the firm or the Government of Canada will not be
              held responsible.
            </Text>
            <Text style={{ marginTop: 2 }}>
              10. I have read and understood all the terms and steps in the
              retainer letter above and I agree to all the terms mentioned And
              for so doing, this document shall constitute good and sufficient
              authority and declaration.
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginTop: 15,
            }}
          >
            <View style={[styles.clientForm, { textAlign: "center" }]}>
              <View style={styles.clientFormChild}>
                <Text className="para_gap" style={{ margin: 0 }}>
                  {felidData.client_first_name && felidData.client_last_name
                    ? felidData.client_first_name +
                      " " +
                      felidData.client_last_name
                    : "_______________"}
                </Text>
                <Text style={{ margin: "0 0 30px 0" }}>Client’s full name</Text>
              </View>
              <View style={styles.clientFormChild}>
                <Text>__________</Text>
                <Text style={{ margin: "0 0 30px 0" }}>Signatures</Text>
              </View>
              <View style={styles.clientFormChild}>
                <Text className="para_gap" style={{ margin: 0 }}>
                  {!felidData.date_signature_client ||
                  felidData.date_signature_client === "0000-00-00"
                    ? "____________"
                    : felidData.date_signature_client}
                </Text>
                <Text style={{ margin: "0 0 30px 0" }}>Date</Text>
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
              {felidData.initial ? (
                <Image
                  fixed
                  style={[
                    styles.textunderline,
                    { width: "20%", left: 450, height: "auto" },
                  ]}
                  src={felidData.initial}
                />
              ) : (
                <Text>__________</Text>
              )}
              <View className="initial" fixed style={styles.initial}>
                <Text>Initial:</Text>
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
                  {felidData.initial ? (
                    <Image
                      fixed
                      style={[
                        styles.textunderline,
                        { width: "20%", left: 450, height: "auto" },
                      ]}
                      src={felidData.initial}
                    />
                  ) : (
                    <Text>__________</Text>
                  )}
                  <View className="initial" fixed style={styles.initial}>
                    <Text>Initial:</Text>
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
});

export default AggrementOne;