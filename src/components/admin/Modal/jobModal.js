import React from 'react'
import { Modal } from 'react-bootstrap'
import Job from '../job'

function JobModal(props) {
    return (
        <Modal
            show={props.show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <button
                type="button"
                className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
                data-dismiss="modal"
                onClick={props.close}
            >
                <i className="fas fa-times"></i>
            </button>
            <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
                <h5 className='text-center mt-5'>Relevant job  </h5>
                    <Job
                        skill={"props.data.skill"}
                        employee_id={props.data.employee_id}
                    />
            </div>

        </Modal>
    )
}

export default JobModal
