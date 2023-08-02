import React from 'react'
import { Modal } from 'react-bootstrap'
import DocumrentContainer from '../../common/documrentContainer'

export default function DocumentModal(props) {
  return (
<Modal show={props.show}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                  <button
                type="button"
                className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
                data-dismiss="modal"
                onClick={props.close}>
                <i className="fas fa-times"></i>
            </button>
    <DocumrentContainer employee_id={props.employee_id}/>
</Modal>  )
}
