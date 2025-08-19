import React, { useState, useEffect } from 'react'
import { AddAdminPermission, GetAdminrSetting } from '../../../api/api'
import { Modal } from 'react-bootstrap'

const defaultPermissions = {
  location: 0,
  lmia_number: 0,
  lmia_status: 0,
  monday_status: 0,
  lmia_creation_date: 0,
  lmia_date_approved: 0,
  lmia_date_expiry: 0,
  job_category: 0,
  salary: 0,
  lmia_submissiom_date: 0,
  lmia_payment_status: 0,
  lmia_payment_by: 0,
  type_of_lmia: 0,
  lmia_notes: 0,
  education: 0,
  keyskill: 0,
  experience_required: 0,
  applied_by_admin: 0,
  profile_complete: 0,
}

const labelMap = {
  location: 'Address',
  lmia_number: 'LMIA Number',
  lmia_status: 'LMIA Status',
  monday_status: 'Monday Status',
  lmia_creation_date: 'LMIA Creation Date',
  lmia_date_approved: 'LMIA Approved Date',
  lmia_date_expiry: 'LMIA Expiry Date',
  job_category: 'Position/Job Category',
  salary: 'LMIA Wages',
  lmia_submissiom_date: 'LMIA Submission Date',
  lmia_payment_status: 'LMIA Payment',
  lmia_payment_by: 'LMIA Payment By',
  type_of_lmia: 'Type of LMIA',
  lmia_notes: 'LMIA Notes',
  education: 'Education',
  keyskill: 'Skills',
  experience_required: 'Experience',
  applied_by_admin: 'Vacancies / Responses',
  profile_complete: 'Profile',
}

export default function LmiafieldsPermission(props) {
  const [permissions, setPermissions] = useState(defaultPermissions)

  /*Close function */
  const close = () => {
    props.close()
    setPermissions(defaultPermissions)
  }

  /*Function to get the permission data */
  const fetchPermissions = async () => {
    try {
      const response = await GetAdminrSetting()
      const lmiaPermissions = JSON.parse(response.data.lmia_column_permission)
      if (Object.keys(lmiaPermissions).length === 0
      ) {
        setPermissions(defaultPermissions)
      } else {
        setPermissions(lmiaPermissions)
      }
    } catch (err) {
      console.error(err)
    }
  }
  /*Function to change the permission from the checkbox*/
  const handleCheckboxChange = async (field) => {
    const updatedPermissions = {
      lmia_column_permission: {
        ...permissions,
        [field]: permissions[field] === 0 ? 1 : 0,
      },
    }
    try {
      const response = await AddAdminPermission(updatedPermissions)
      if (response.message === 'successfully') {
        fetchPermissions()
        props.setApiCall(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={() => close()}
      >
        <i className="fas fa-times"></i>
      </button>
      <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
        <form>
          <h5 className="text-center mb-7 pt-2">Add Permission</h5>
          <div className="row">
            {permissions &&
              Object.keys(permissions).map((field, index) => (
                <div
                  className="text-dark text-decoration-none d-flex justify-content-between col-6"
                  key={index}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={permissions[field] !== 0}
                      onChange={() => handleCheckboxChange(field)}
                    />
                    <span className="px-2 text-capitalize">
                      {labelMap[field] || field}
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </form>
      </div>
    </Modal>
  )
}
