// import { useState, useEffect } from "react";
// import PaymentInvoicePdf from "./PaymentInvoicePdf";
// import PaymentInvoicePdf2 from "./PaymentInvoicePdf";
// import PDFViewer from "./user_pdf"
import PaymentInvoicePdfPreview from "./PaymentInvoicePdfPreview";
export default function PaymentInvoicePdf() {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

  const sampleInvoiceData = {
    invoiceNumber: "492",
    date: "15/11/2024",
    terms: "Net 30",
    dueDate: "15/11/2024",
    billTo: "Nirali Upendrakumar Brahmbhatt",
    items: [
      {
        date: "15/11/2024",
        description: "Service Charges for Border Package Application",
        tax: "GST",
        qty: 1,
        rate: 5000.0,
        amount: 5000.0,
      },
    ],
    bankInfo: {
      accountNumber: "1002346",
      transitNumber: "09219",
      institution: "003",
      bankAddress: "130 Country Village Rd NE, Calgary, Alberta T3K8B8 Canada",
      swiftCode: "ROYCCAT2",
      routingNumber: "021000021",
    },
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>


        <button onClick={() => window.print()}>Print</button>
      
      <PaymentInvoicePdfPreview invoiceData={sampleInvoiceData} />
    </div>
  );
}
