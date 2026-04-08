# Email-Related Code — Frontend & Backend Reference

## Frontend (canjobs — React)

### 1. API layer — `src/api/api.js`

All email API functions and their backend endpoints:

```javascript
// -------- SEND EMAIL (SMTP via backend) --------
export const SendEmail = async (data, FileList, url) => {
  const formData = new FormData();
  const appendIfValid = (key, value) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  };
  appendIfValid("to", data.email);
  appendIfValid("subject", data.subject);
  appendIfValid("body", data.description);
  appendIfValid("cc_email", data.adminemail);
  appendIfValid("attachments_url", url);
  appendIfValid("agreement_id", data.agreement_id);
  appendIfValid("resend", data.resend);
  appendIfValid("bcc_email", data.bccemail);
  appendIfValid("signature", data.signature);
  appendIfValid("sender_id", data.sender_id);
  if (Array.isArray(FileList) && FileList.length > 0) {
    FileList.forEach((file, i) => {
      if (file) formData.append(`attachments[${i}]`, file);
    });
  }
  const response = await axios.post(`${API_URL}sendEmailTest`, formData, {
    headers: { "Content-Type": "multipart/form-data", Authorization: Token },
  });
  return response.data;
};

// -------- TEST EMAIL TEMPLATE --------
export const TestEmail = async (props) => {
  const response = await axios.post(
    `${API_URL}/common/emailTemplateTest`,
    { email_id: props.email_id, email_template_id: props.email_template_id },
    { headers: { "Content-Type": "application/json", Authorization: Token } }
  );
  return response.data;
};

// -------- OUTLOOK AUTH (OAuth URL for "Authenticate Mail") --------
export const GeEmailAuthenticationData = async () => {
  const response = await axios.get(`${API_URL}common/outlookAuthUrl`, {}, {
    headers: { "Content-Type": "application/json", Authorization: Token },
  });
  return response.data;
};

// -------- READ INBOX (Microsoft Graph Sent folder in this codebase) --------
export const ReadEmail = async (page, limit, search, email) => {
  const response = await axios.post(
    `${API_URL}common/readOutlookEmail`,
    { page, count: limit, filter_by_email_id: email, search },
    { headers: { "Content-Type": "application/json", Authorization: Token } }
  );
  return response.data;
};

// -------- READ SENT EMAIL --------
export const ReadSentEmail = async (page, limit, search, email) => {
  const response = await axios.post(
    `${API_URL}common/readSentOutlookEmail`,
    { page, count: limit, filter_by_email_id: email, search },
    { headers: { "Content-Type": "application/json", Authorization: Token } }
  );
  return response.data;
};

// -------- READ ALL (inbox + sent) --------
export const ReadAllEmail = async (page, limit, search, email) => {
  const response = await axios.post(
    `${API_URL}common/getSentAndInboxMails`,
    { count: limit, search },
    { headers: { "Content-Type": "application/json", Authorization: Token } }
  );
  return response.data;
};

// -------- REPLY TO OUTLOOK EMAIL --------
export const ReplyToMail = async (msgId, type, msg, attachments) => {
  const formData = new FormData();
  formData.append("msg_id", msgId);
  formData.append("inbox_type", type);
  formData.append("replyMsg", msg);
  formData.append("sender_id", admin_id);
  if (attachments?.length) attachments.forEach((file, i) => formData.append(`attachments[${i}]`, file));
  const response = await axios.post(`${API_URL}common/replyToOutlookEmail`, formData, {
    headers: { "Content-Type": "multipart/form-data", Authorization: Token },
  });
  return response.data;
};

// -------- FORWARD EMAIL --------
export const forwardMail = async (data, FileList, url) => {
  const response = await axios.post(`${API_URL}forwardMail`, data, {
    headers: { "Content-Type": "application/json", Authorization: Token },
  });
  return response.data;
};

// -------- OUTLOOK DRAFT: SAVE --------
export const SaveDraftOutlookEmail = async (data, FileList, url) => {
  const formData = new FormData();
  const appendIfValid = (key, value) => {
    if (value !== undefined && value !== null && value !== "") formData.append(key, value);
  };
  appendIfValid("to", data.to);
  appendIfValid("subject", data.subject);
  appendIfValid("body", data.body);
  appendIfValid("cc_email", data.cc_email);
  appendIfValid("bcc_email", data.bcc_email);
  appendIfValid("message_id", data.message_id);
  appendIfValid("sender_id", data.sender_id);
  if (Array.isArray(FileList) && FileList.length > 0) {
    FileList.forEach((file, i) => { if (file) formData.append(`attachments[${i}]`, file); });
  }
  const response = await axios.post(`${API_URL}common/saveDraftOutlookEmail`, formData, {
    headers: { "Content-Type": "multipart/form-data", Authorization: Token },
  });
  return response.data;
};

// -------- OUTLOOK DRAFT: GET LIST --------
export const GetDraftOutlookEmail = async (email) => {
  const response = await axios.post(
    `${API_URL}common/readOutlookDraftEmail`,
    { filter_by_email_id: email },
    { headers: { "Content-Type": "application/json", Authorization: Token } }
  );
  return response.data;
};

// -------- OUTLOOK DRAFT: DELETE --------
export const DeleteDraftOutlookEmail = async (id) => {
  const response = await axios.post(
    `${API_URL}common/deleteOutlookDraftEmail`,
    { message_id: id },
    { headers: { "Content-Type": "application/json", Authorization: Token } }
  );
  return response.data;
};

// -------- OUTLOOK: GET ATTACHMENTS (email or draft) --------
export const GetPreviewAttchmentEmail = async (emailType, id) => {
  const response = await axios.post(
    `${API_URL}common/readOutlookEmailAttachment`,
    { msg_id: id, inbox_type: emailType },
    { headers: { "Content-Type": "application/json", Authorization: Token } }
  );
  return response.data;
};
```

---

### 2. Send mail form — `src/components/forms/user/sendMailForm.js`

- **Imports:** `AddAdmin`, `SendEmail`, `SaveDraftOutlookEmail`, `GetDraftOutlookEmail`, `DeleteDraftOutlookEmail`, `GetPreviewAttchmentEmail` from `api/api`.
- **Send:** `onSendMailClick()` → validates, optionally updates admin signature, then `SendEmail(payload, fileBase)` (POST `sendEmailTest`). On success, can delete loaded draft and refresh list.
- **Drafts:** `fetchDrafts()` uses `GetDraftOutlookEmail(email)`; load draft fills form and can load attachments via `GetPreviewAttchmentEmail("DRAFT", draft.id)`; save/update uses `SaveDraftOutlookEmail`; delete uses `DeleteDraftOutlookEmail(draftId)`.
- **State:** subject, description (body), email (to), adminemail (CC), bccemail (BCC), signature, attachments (fileBase/fileNames).

---

### 3. Email inbox/sent page — `src/components/email/mainemailPage.js`

- **Imports:** `ReadEmail`, `ReadAllEmail`, `ReadSentEmail` from `api/api`.
- **Data:** `EmailData()` calls:
  - `ReadAllEmail(...)` when `emailType === "ALL"`,
  - `ReadSentEmail(...)` when `emailType === "SENT"`,
  - `ReadEmail(...)` otherwise (inbox).
- Uses `currentPage` (nextLink), `recordsPerPage`, `search`, `emailType`, `apiCall` in `useEffect` to refetch.

---

### 4. Test email (template) — `src/components/forms/admin/testMail.js`

- **Import:** `TestEmail` from `api/api`.
- **Submit:** `onTestMailClick()` → `TestEmail(state)` with `email_id` and `email_template_id` (POST `common/emailTemplateTest`).

---

### 5. Admin settings — “Authenticate Mail” — `src/components/admin/Modal/adminSetting.js`

- **Import:** `GeEmailAuthenticationData` from `api/api`.
- **Usage:** `GeEmailAuthData()` calls `GeEmailAuthenticationData()` (GET `common/outlookAuthUrl`). If `is_already_authorized !== 'yes'`, shows button that opens `emailAuthLink?.data` in a popup (OAuth).

---

### 6. Other frontend files (email-related)

| File | Purpose |
|------|--------|
| `src/components/email/emailList.js` | Renders list of emails from MainEmailPage |
| `src/components/email/emailPreview.js` | Preview single email |
| `src/components/email/ReplyEmailForm.js` | Reply form → `ReplyToMail` |
| `src/components/email/ForwardEmailForm.js` | Forward form → `forwardMail` |
| `src/components/forms/Agreement/SendEmailAgreement.js` | Send agreement email (uses `SendEmail` with agreement_id) |
| `src/components/admin/email.js` | Email template admin UI |
| `src/components/forms/admin/manageemail.js` | Manage email templates |
| `src/components/common/EmailSelectionModal.js` | Email selection modal |
| `src/components/json/emailPermisionJson.js` | Email permission config |

---

## Backend (canjobsAWS — CodeIgniter/PHP)

### 1. Routes — `application/config/routes.php`

```php
// Outlook / Graph
$route['common/outlookAuthUrl'] = 'api/Common_controller/outlookAuthUrl';
$route['common/accessOutlookAuth'] = 'api/Common_controller/accessOutlookAuth';
$route['common/refreshAccessOutlookAuth'] = 'api/Common_controller/refreshAccessOutlookAuth';
$route['common/readOutlookEmail'] = 'api/Common_controller/readOutlookEmail';
$route['common/readSentOutlookEmail'] = 'api/Common_controller/readSentOutlookEmail';
$route['common/readOutlookEmailAttachment'] = 'api/Common_controller/readOutlookEmailAttachment';
$route['common/readOutlookDraftEmail'] = 'api/Common_controller/readOutlookDraftEmail';
$route['common/saveDraftOutlookEmail'] = 'api/Common_controller/saveDraftOutlookEmail';
$route['common/deleteOutlookDraftEmail'] = 'api/Common_controller/deleteOutlookDraftEmail';
$route['common/replyToOutlookEmail'] = 'api/Common_controller/replyToOutlookEmail';
$route['common/getSentAndInboxMails'] = 'api/Common_controller/getSentAndInboxMails';

// Send / templates
$route['sendEmailTest'] = 'api/Email_controller/sendEmailTest';
$route['common/emailTemplateTest'] = 'api/Email_controller/emailTemplateTest';
$route['forwardMail'] = 'api/Email_controller/forwardMail';
```

---

### 2. Sending email (SMTP) — `application/models/Common_model.php`

```php
public function sendMail($to, $subject, $body, $cc_email=[], $attachments=[], $bcc_email=[], $signature = "", $attachments_via_server=[]) {
    $query = $this->db->get_where('service_credential', array('protocol' => 'smtp'));
    $result = $query->row_array();
    if ($result) {
        $this->load->library('phpmailer_lib');
        $mail = $this->phpmailer_lib->load();
        $mail->isSMTP();
        $mail->Host = $result['host'];
        $mail->Port = $result['port'];
        $mail->SMTPSecure = $result['encryptoion'];
        $mail->SMTPAuth = true;
        $mail->Username = $result['username'];
        $mail->Password = $result['password'];
        $mail->Subject = $subject;
        $mail->setFrom($result['username']);
        $mail->isHTML(true);
        $mail->Body = $body;
        $mail->addAddress($to);
        // CC, BCC, attachments (array or string), attachments_via_server...
        return $mail->send();
    }
    return "credential error";
}
```

- Credentials: table `service_credential`, `protocol = 'smtp'` (host, port, encryptoion, username, password).

---

### 3. PHPMailer library — `application/libraries/Phpmailer_lib.php`

```php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class PHPMailer_Lib {
    public function load() {
        require_once APPPATH.'third_party/phpmailer/src/Exception.php';
        require_once APPPATH.'third_party/phpmailer/src/PHPMailer.php';
        require_once APPPATH.'third_party/phpmailer/src/SMTP.php';
        return new PHPMailer(true);
    }
}
```

---

### 4. Send-email endpoint — `application/controllers/api/Email_controller.php`

**emailTemplateTest_post** (test template to one email):

- Input: `email_id`, `email_template_id` (JSON).
- Loads template via `common_model->getEmailTemplate`, then `common_model->sendMail($to, $subject, $body)`.

**sendEmailTest_post** (main compose/send):

- Input (POST/form): `to`, `subject`, `body`, `cc_email`, `bcc_email`, `signature`, `sender_id`, optional `agreement_id`, `resend`, and `attachments[]`.
- Agreement: if `agreement_id` present, stores/updates row in `agreement_mail`; on resend, restores payload from DB.
- Body: replaces inline base64 images with uploaded files under `uploads/email_images/`, then appends admin signature (from `admin` by `sender_id`) with base64 images saved to same dir.
- Attachments: uploads to `uploads/email_attachments/`, builds `$documents_url` (document_url + doc_name).
- Calls `$this->common_model->sendMail($to, $subject, $body, $cc_email, $documents_url, $bcc_email, $signature)`.
- Response: `["status"=>1,"message"=>"email sent successfully"]` or failure.

---

### 5. Outlook OAuth & Graph — `application/controllers/api/Common_controller.php`

**outlookAuthUrl_get**

- Loads credentials: `admin_model->getServiceCredential(['type'=>'outlook'])` (client_id, client_secret, tenantId).
- Builds Microsoft OAuth URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize` with scope `https://graph.microsoft.com/Mail.Read Mail.ReadWrite offline_access`.
- Redirect URI: `https://api.canpathwaysjobs.com/canjobs/common/accessOutlookAuth`.
- Checks stored token via `common_model->readEmailToken()`; if valid token exists returns `is_already_authorized'=>'yes'`, else returns `data=>$login` (auth URL).

**accessOutlookAuth_get**

- Callback after user signs in; exchanges `code` for token (or refresh_token), saves via `common_model->addReadEmailToken`, redirects to close window.

**readOutlookEmail_post**

- Reads token, builds Graph URL for Sent folder: `https://graph.microsoft.com/v1.0/me/mailFolders('SentItems')/messages` (with search/filter, count, top, page).
- Requests with Bearer token, returns JSON to frontend.

**readSentOutlookEmail_post**

- Same idea for inbox: `https://graph.microsoft.com/v1.0/me/messages` with filter/search and pagination.

**readOutlookDraftEmail_post**

- `https://graph.microsoft.com/v1.0/me/mailFolders('Drafts')/messages` with optional filter and pagination.

**deleteOutlookDraftEmail_post**

- `DELETE https://graph.microsoft.com/v1.0/me/messages/{message_id}` with Bearer token.

**readOutlookEmailAttachment_post**

- `GET https://graph.microsoft.com/v1.0/me/messages/{msg_id}/attachments` (or under mailFolders for SENT/DRAFT) with Bearer token.

**saveDraftOutlookEmail_post**

- POST body: to, subject, body, cc_email, bcc_email, message_id (for update), sender_id; optional files in `attachments[]`.
- Replaces base64 images in body with uploaded image URLs.
- If `message_id`: PATCH `https://graph.microsoft.com/v1.0/me/messages/{message_id}`; else POST `https://graph.microsoft.com/v1.0/me/messages` to create draft.
- Then POSTs each file to `https://graph.microsoft.com/v1.0/me/messages/{draftId}/attachments` as `fileAttachment` with contentBytes.
- Returns status, message, draft_id.

---

## Summary

| Feature | Frontend | Backend |
|--------|----------|---------|
| Send email (compose) | `SendEmail()` → POST `sendEmailTest` | `Email_controller::sendEmailTest_post` → `Common_model::sendMail()` (SMTP) |
| Test template | `TestEmail()` → POST `common/emailTemplateTest` | `Email_controller::emailTemplateTest_post` → `sendMail()` |
| Outlook auth | `GeEmailAuthenticationData()` → GET `common/outlookAuthUrl` | `Common_controller::outlookAuthUrl_get` (OAuth URL) |
| Read inbox/sent | `ReadEmail`, `ReadSentEmail`, `ReadAllEmail` | `readOutlookEmail_post`, `readSentOutlookEmail_post`, `getSentAndInboxMails` (Graph) |
| Drafts | `GetDraftOutlookEmail`, `SaveDraftOutlookEmail`, `DeleteDraftOutlookEmail` | `readOutlookDraftEmail_post`, `saveDraftOutlookEmail_post`, `deleteOutlookDraftEmail_post` (Graph) |
| Reply / forward | `ReplyToMail`, `forwardMail` | `replyToOutlookEmail_post`, `Email_controller::forwardMail` |
| Attachments (read) | `GetPreviewAttchmentEmail` | `readOutlookEmailAttachment_post` (Graph) |

- **Sending:** SMTP only, via PHPMailer and `service_credential` where `protocol = 'smtp'`.
- **Inbox/Sent/Drafts/Reply/Attachments:** Microsoft Graph (Outlook), using token from OAuth flow and credentials where type = `outlook`.
