import logo from "../../media/00logo-main-black - Copy.png";

import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  pagesetup: {
    width: "100%",
    height: "100vh",
  },
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  companyInfo: {
    fontSize: 10,
    padding: ".5rem",
  },
  logo: {
    width: 150,
    height: 80,
    objectFit: "contain",
  },
  title: {
    color: "#4B9CD3",
    fontSize: 18,
    marginBottom: 12,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "space-between",
    textAlign: "left",
  },

  row2: {
    flexDirection: "row",
    marginBottom: 5,
    justifyContent: "flex-end",
  },

  column: {
    // flex: 1,
    width: "50%",
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#E6F3F9",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableCell: {
    flex: 1,
  },
  bankInfo: {
    fontSize: 9,
    color: "#666",
    marginTop: 20,
  },
  taxSummary: {
    marginTop: 20,
    borderTop: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  totals: {
    marginLeft: "auto",
    width: 150,
    marginTop: 18,
  },
  bold: {
    fontFamily: "Times-Bold",
    // fontWeight: "bold",
    paddingBottom: 4,
  },

  fade: {
    opacity: 0.5,
  },

  padding: {
    paddingBottom: 4,
  },
});

// Create Document Component
function PaymentInvoicePdfPreview({ invoiceData }) {
  return (
    <PDFViewer style={styles.pagesetup}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.companyInfo}>
              <Text style={styles.bold}>
                CAN Pathways Immigration & Recruitment
              </Text>
              <Text style={styles.padding}>2515 Hopewell Pl NE #310</Text>
              <Text style={styles.padding}>AB, T1Y 7J7</Text>
              <Text style={styles.padding}>info@canpathways.ca</Text>
              <Text style={styles.padding}>canpathways.ca</Text>
              <Text style={styles.padding}>
                GST/HST Registration No.: 781920731 RT0001
              </Text>
            </View>
            <Image src={logo} style={styles.logo} />
          </View>

          {/* Invoice Title */}
          <Text style={styles.title}>INVOICE</Text>

          {/* Invoice Details */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.bold}>BILL TO</Text>
              <Text>{invoiceData.billTo}</Text>
            </View>

            <View
              style={[styles.column, { flexBasis: "150px", alignSelf: "flex-end" }]}
            >
              <View style={styles.row}>
                <Text style={styles.fade}>INVOICE</Text>
                <Text>#{invoiceData.invoiceNumber}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.fade}>DATE</Text>
                <Text>{invoiceData.date}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.fade}>TERMS</Text>
                <Text>{invoiceData.terms}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.fade}>DUE DATE</Text>
                <Text>{invoiceData.dueDate}</Text>
              </View>
            </View>
          </View>

          {/* Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { width: 120 }]}>DATE</Text>
              <Text
                style={[styles.tableCell, { flexGrow: 1, flexBasis: "100px" }]}
              >
                Description
              </Text>
              <Text style={[styles.tableCell, { width: 50 }]}>TAX</Text>
              <Text style={[styles.tableCell, { width: 80 }]}>QTY</Text>
              <Text style={[styles.tableCell, { width: 80 }]}>RATE</Text>
              <Text style={[styles.tableCell, { width: 100 }]}>AMOUNT</Text>
            </View>

            {/* Table Rows */}
            {invoiceData.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: 100 }]}>
                  {item.date}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { flexGrow: 1, flexBasis: "100px" },
                  ]}
                >
                  {item.description}
                </Text>
                <Text style={[styles.tableCell, { width: 50 }]}>
                  {item.tax}
                </Text>
                <Text style={[styles.tableCell, { width: 80 }]}>
                  {item.qty}
                </Text>
                <Text
                  style={[styles.tableCell, { width: 80 }]}
                >{`$${item.rate.toFixed(2)}`}</Text>
                <Text
                  style={[styles.tableCell, { width: 100 }]}
                >{`$${item.amount.toFixed(2)}`}</Text>
              </View>
            ))}
          </View>

          {/* Bank Info */}

          <View style={styles.row}>
            <View style={styles.bankInfo}>
              <Text>
                E-Transfer for within - Canada Payments at:
                accounts@canpathways.com
              </Text>
              <Text>
                Bank account number: {invoiceData.bankInfo.accountNumber}
              </Text>
              <Text>Transit number: {invoiceData.bankInfo.transitNumber}</Text>
              <Text>
                Institution number: {invoiceData.bankInfo.institution}
              </Text>
              <Text>Bank Address: {invoiceData.bankInfo.bankAddress}</Text>
              <Text>Swift Code: {invoiceData.bankInfo.swiftCode}</Text>
              <Text>Routing number: {invoiceData.bankInfo.routingNumber}</Text>
            </View>
            {/* Totals */}
            <View style={styles.totals}>
              <View style={styles.row}>
                <Text style={styles.fade}>SUBTOTAL</Text>
                <Text>$5,000.00</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.fade}>GST @ 5%</Text>
                <Text>$250.00</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.fade}>TOTAL</Text>
                <Text>$5,250.00</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.fade}>BALANCE DUE</Text>
                <Text>$5,250.00</Text>
              </View>
            </View>
          </View>
          {/* Tax Summary */}
          <View style={styles.taxSummary}>
            <Text style={styles.bold}>TAX SUMMARY</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>RATE</Text>
              <Text style={styles.tableCell}>TAX</Text>
              <Text style={styles.tableCell}>NET</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>GST @ 5%</Text>
              <Text style={styles.tableCell}>250.00</Text>
              <Text style={styles.tableCell}>5,000.00</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default PaymentInvoicePdfPreview;
