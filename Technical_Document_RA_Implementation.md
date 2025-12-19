# Technical Document: Implementation of Retainer Agreement (RA) System

## 1. Introduction

This document outlines the technical implementation of the Retainer Agreement (RA) workflow within the Canjobs application. It details the full lifecycle from agreement generation by the admin to the external electronic signature by the client, utilizing a React frontend organized in `src\components\common\Retaineragreement` and a Node.js backend.

## 2. Directory & File Structure

The RA module is structured into three distinct sub-directories under `src\components\common\Retaineragreement`.

### A. `Html` (Core UI & Logic)

This folder contains the main pages and logic for rendering the agreement interfaces.

* **`RetainerAgrementMainPage.js`**: The parent wrapper component that orchestrates the entire RA module.
* **`RetauberAgreementList.js`**: Displays the list of all created agreements and triggers the "Add Agreement" modal.
* **`MainRetainerAggHtml.js`**: Responsible for rendering the dynamic HTML structure of the agreement before PDF conversion.
* **`UserSigningPage.js`**: The dedicated external portal page where the client (candidate) lands after clicking the email link to sign the document.
* **`SignaturePadComponent.js`**: The reusable UI component that captures the digital signature from the user.
* **`viewPdf.js`**: Handles the previewing of the generated PDF documents.
* **`Commanforsignatureandpdf.js`** & **`CommonRetainerAgreementDate.js`**: Shared utilities for formatting dates and signature blocks across different views.

### B. `Agreement native` (Agreement Templates)

This folder contains the specific logic and templates for the different agreement categories.

* **`WorkPermitPdf.js`**: Template for Work Permit agreements.
* **`AlbertaPnpPdf.js`**: Template for Alberta PNP agreements.
* **`EmployerRetainerAgreementPdf.js`**: Template for Employer-specific agreements.
* **`RecruitmentAgreement.js`**: Template for Recruitment services.
* **`DynamicRA.js`**: Handles custom or dynamic agreement types.
* *(Other specific templates: `MoreThanOneApplicantAgreementPdf.js`, `RenewalApplicationsPdf.js`, `ThreeColumnRerainerAgreement.js`, `WorkPermitApplicantTwoStagePdf.js`)*.

### C. `CommonThings` (Helper Functions)

Contains utility functions for API interactions and signature processing.

* **`AddDocIdToAgreementApiFun.js`**: Helper for linking document IDs to agreement records.
* **`ClientSignatureFunctionHtml.js`**: Logic for injecting the client's signature into the HTML/PDF.
* **`RCICSignatureFunction.js`**: Logic for handling the RCIC (Immigration Consultant) signature.
* **`InitialFunction.js`**: Initialization logic for agreement states.

---

## 3. RA Workflow & Code Execution

This flow maps the user actions seen in the video to the specific files in your directory structure.

### Step 1: Agreement Generation

* **User Action:** Admin clicks "Add Agreement" on the profile.
* **Frontend File:** `RetauberAgreementList.js` triggers the modal.
* **Template Selection:** Based on the category selected (e.g., Work Permit), the system calls the corresponding file from the **`Agreement native`** folder (e.g., `WorkPermitPdf.js`).

### Step 2: Customization & Saving

* **User Action:** Admin inputs fees and client details.
* **Frontend File:** `MainRetainerAggHtml.js` updates the visual state.
* **Backend API:** Calls `AddUpdateAgreement` (located in `src/api/api.js`) to save the data.

### Step 3: PDF Generation

* **User Action:** Admin clicks "Generate PDF".
* **Frontend File:** `viewPdf.js` renders the file.
* **Helper Logic:** `Commanforsignatureandpdf.js` ensures the layout is correct for PDF conversion.

### Step 4: Email Dispatch

* **User Action:** Admin sends the agreement via email.
* **Backend API:** The `SendEmail` function (in `src/api/api.js`) is triggered with the document attachment.

```javascript
// src/api/api.js
export const SendEmail = async (data, FileList, url) => {
  const formData = new FormData();
  // ... formData appending logic
  const response = await axios.post(`${API_URL}sendEmailTest`, formData, {
    headers: { "Content-Type": "multipart/form-data", Authorization: Token },
  });
  return response.data;
};

```

### Step 5: External Client Signing

* **User Action:** Client opens the link from their email.
* **Frontend File:** The link routes to **`UserSigningPage.js`** (located in `Html` folder).
* **Signing:** The client signs using the **`SignaturePadComponent.js`**.
* **Processing:** `ClientSignatureFunctionHtml.js` processes the signature data before saving.

---

## 4. Backend API Integration (src/api/api.js)

The following endpoints in `src/api/api.js` are critical for this workflow:

1. **`GetAgreement`**: Fetches the agreement data for `UserSigningPage.js` so the client can see what they are signing.
2. **`AddUpdateAgreement`**: Called by `UserSigningPage.js` when the client clicks "Save Agreement" to store the signature.
3. **`AddSharePointDOcument`**: Uploads the final signed PDF to the SharePoint path defined in the logic.

## 5. Payment & Invoice (Invoices & Payments)

This section describes how payment invoices are created, stored, sent, and reconciled in Canjobs. The payment/invoice workflow is integrated with the RA workflow (invoices can be generated from the same admin UI and attached to agreements), but it is implemented via dedicated components and API functions under the `payment invoice` feature area.

### Overview

- Admins can create invoice records (one or more line items) and optionally upload a payment invoice PDF.
- Invoices are stored as records in the backend and associated documents (PDFs) are uploaded to SharePoint via the existing SharePoint helpers.
- Invoices can be emailed to the client, and payment reminders can be scheduled.
- When payment is received, admins record the payment (Receive Payment) which updates invoice status and creates an audit trail.

### Frontend components

- `src/components/common/payment invoice/PaymentPage.js` — main page for adding, uploading, listing, filtering, and downloading invoices.
- `src/components/common/payment invoice/PaymentInvoiceTable.js` — table view for invoice records (list, filter, view, download, delete).
- `src/components/forms/payment invoice/PaymentInvoiceForm.js` — modal/form used to create or edit an invoice (line items, dates, tax, totals).
- `src/components/forms/payment invoice/UploadPaymentInvoice.js` — UI to upload an external invoice PDF and attach to a record.
- `src/components/forms/admin/ReceiveAmountModal.js` — modal for recording received payments (amount, method, date, reference).
- `src/components/forms/payment invoice/PaymentReminder.js` and `SetReminderSchedule.js` — reminder scheduling UI.

### Backend APIs (in `src/api/api.js`)

- `AddUpdatePaymentInvoiceRecordApi` — create or update an invoice record (used by `PaymentInvoiceForm`).
- `getAllInvioceRecord` / `getAllInvioce` — list/fetch invoices with filters/pagination.
- `DeletePaymentIvoiceRecord` / `DeletePaymentInvoiceApi` — delete an invoice record (admin only / soft-delete as applicable).
- `GetLastPaymentInvoiceApi` — fetch latest invoice number (for auto-incrementing invoice_no).
- SharePoint helpers: `GetSharePointData`, `getSharePointParticularFolders`, `AddSharePointDOcument` — upload/lookup invoice PDF files.
- `SendEmail` — used to send invoice emails with attachments.

### Data model (typical fields)

- `invoice_no` — unique invoice number (string).
- `user_id`, `user_type` — the client (candidate or employer) the invoice belongs to.
- `items` — array of line items: [{ description, qty, unit_price, tax, amount }].
- `sub_total`, `tax`, `total` — computed totals.
- `invoice_date`, `due_date` — dates.
- `payment_method`, `payment_status` — e.g., Pending, Partial, Paid.
- `document_id` / `doc_folder_id` — ID of uploaded invoice PDF in SharePoint.
- `created_by`, `updated_by`, `created_at`, `updated_at` — audit fields.

### PDF generation & storage

- Invoice PDFs can be generated from the invoice data or uploaded via `UploadPaymentInvoice` and are stored using the SharePoint helpers already used by the RA module. Use `getSharePointParticularFolders` to fetch and `AddSharePointDOcument` to upload.

### Email & reminders

- Use the existing `SendEmail` helper to email invoices (attach the PDF document or include a link to SharePoint). Payment reminders are scheduled with `PaymentReminder`/`SetReminderSchedule` UI and processed by backend jobs or scheduled tasks where configured.

### Receive Payment (reconciliation)

- When a payment is received, admins use the `ReceiveAmountModal` to record payment details (amount, method, transaction reference). The frontend calls `AddUpdatePaymentInvoiceRecordApi` to update the invoice record and change `payment_status`.

### Security & audit

- Invoices include `created_by`/`updated_by` and timestamps. Once an invoice has been sent to the client, editing should be restricted (the UI currently shows an edit option until it's sent; follow the existing logic in `PaymentInvoiceTable`/`PaymentPage`).

### Example payload (create/update invoice)

{
  "invoice_no": "INV-2025-0001",
  "user_id": 123,
  "user_type": "employee",
  "items": [ { "description": "Service fee", "qty": 1, "unit_price": 1000, "tax": 0, "amount": 1000 } ],
  "sub_total": 1000,
  "tax": 0,
  "total": 1000,
  "invoice_date": "2025-12-19",
  "due_date": "2026-01-02",
  "payment_status": "Pending",
  "document_id": "<sharepoint-file-id>"
}

### Developer notes

- To change the invoice PDF template or fields, update `PaymentInvoiceForm` and the upload/generation logic in `PaymentPage`/`PaymentInvoiceTable`.
- To add tax calculations or validation, modify the form helpers and ensure backend endpoints validate totals server-side.
- To change storage (e.g., move from SharePoint to S3), replace the SharePoint helpers with a new storage adapter and update calls across `PaymentPage` and `PaymentInvoiceTable`.

## Email Flow (Profile Email Tab)

This section documents the email functionality available on the Employer/Candidate profile pages under the `Email` tab. The tab exposes three main views: `Inbox`, `Sent`, and `Compose`. The `Compose` view supports adding drafts, attaching files, and adding the admin signature before sending.

### UI behavior

- `Inbox`: Lists received messages for the profile/email address. Use `ReadEmail`/`ReadInboxEmail` (see API) to fetch individual messages.
- `Sent`: Lists emails sent from this profile. The frontend uses `ReadSentEmail` to fetch sent messages and displays attachments and status.
- `Compose`: A rich compose form (see `src/components/forms/user/sendMailForm.js`) where admins can:
  - Add recipients (`to`, `cc`, `bcc`).
  - Add a subject and rich description (HTML editor).
  - Attach files (multiple attachments supported; validated by type and size in the component).
  - Insert an admin signature (image and/or signature text). When a signature is added/updated the frontend calls `AddAdmin` to persist the signature for future use.
  - Save the current email as a draft (calls `SaveDraftOutlookEmail`) or load existing drafts (`GetDraftOutlookEmail`). Drafts can be deleted with `DeleteDraftOutlookEmail`.

### Files & Components

- `src/components/forms/user/sendMailForm.js` — composable email form used in profile pages; handles attachments, signatures, send, and draft flows.
- `src/components/email/mainemailPage.js` — main container for email views (Inbox / Sent / Compose).
- `src/components/email/emailList.js` — UI list for emails and toggling compose view.

### Backend APIs (exported from `src/api/api.js`)

- `AddAdmin` — used to save/update the admin signature (image + signature text). Called by the compose form before sending when a signature is present.
- `SendEmail` — send email endpoint. Supports multipart form data including attachments and optional `signature`, `agreement_id`, `sender_id`, `cc_email`, `bcc_email`.
- `SaveDraftOutlookEmail` — saves/updates a draft; accepts `message_id` for updates and supports attachments.
- `GetDraftOutlookEmail` — fetch drafts for a given email/address.
- `DeleteDraftOutlookEmail` — delete a saved draft by `message_id`.
- `GetPreviewAttchmentEmail` — fetch preview/download URL for attachments tied to sent/draft messages.
- `ReadSentEmail` / `ReadInboxEmail` — read sent/inbox messages (pagination/filtering helpers exist in `api.js`).

### Important integration notes

- Signature persistence: `sendMailForm.js` persists admin signature by calling `AddAdmin` with `{ admin_id, signature, signature_image }` before invoking `SendEmail`. This ensures the signature is available for future emails.
- Drafts vs Send: Drafts are saved via `SaveDraftOutlookEmail`. Note that some components pass attachments differently between `SaveDraftOutlookEmail` and `SendEmail`; review `sendMailForm.js` where attachments are handled and ensure the backend supports attachments for drafts if required.
- Attachments preview: When loading a draft with attachments the compose form calls `GetPreviewAttchmentEmail("DRAFT", draft.id)` to fetch each file for preview/download.
- Agreement emails: For RA/Invoice flows that include attaching generated PDFs, `SendEmail` accepts an `agreement_id` or `attachments` array — `SendEmailAgreement.js` and `PaymentPage.js` show example usage.


## 6. Summary of Key Files for Developers

- To edit the **List View**: Modify `src\components\common\Retaineragreement\Html\RetauberAgreementList.js`.
- To edit the **Work Permit Template**: Modify `src\components\common\Retaineragreement\Agreement native\WorkPermitPdf.js`.
- To edit the **Client Signing Portal**: Modify `src\components\common\Retaineragreement\Html\UserSigningPage.js`.

