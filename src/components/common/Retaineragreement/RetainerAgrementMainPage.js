import React from 'react'
import RetauberAgreementList from './RetauberAgreementList'

export default function RetainerAgrementMainPage({
    user_id,
    emp_user_type,
    folderId }) {
    return (
        < div className="activity_container profile_id_card">
            <div className="row m-0">
                <RetauberAgreementList
                    user_id={user_id}
                    emp_user_type={emp_user_type}
                    folderId={folderId}
                />
            </div>
        </div>
    )
}
