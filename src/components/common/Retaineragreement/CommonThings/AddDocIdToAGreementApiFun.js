import { AddUpdateAgreement } from '../../../../api/api';

export async function AddDocIdToAGreementApiFun
    ({ felidData,
        user_id,
        emp_user_type,
        folderID, document_id, email_for }) {
    let admin_id = localStorage.getItem("admin_id")
    let admin_type = localStorage.getItem("admin_type")
    let data = {
        id: felidData?.id,
        type: felidData?.type,
        document_id: document_id,
        folderId: folderID,
        rcic_signature: felidData?.rcic_signature,
        client_email: felidData?.client_email,
        receiver: user_id,
        receiver_type: emp_user_type,
        client_first_name: felidData?.client_first_name,
        date_signature_rcic: felidData?.date_signature_rcic,
        signature_status: felidData?.signature_status,
        sender: admin_id,
        sender_type: admin_type,
        email_for: email_for
    };
    let addDocId = await AddUpdateAgreement(data);
    return addDocId
}
