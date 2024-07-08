import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function SendEmailAgreement({ show, close,
    user_id,
    emp_user_type,
    folderId,
    felidData }) {
        const [emails, setEmails] = useState([felidData.client_email]);
        const [input, setInput] = useState('');
        
        const handleInputChange = (e) => {
            setInput(e.target.value);
        };
        
        console.log(emails)
        const handleAddEmail = (e) => {
        e.preventDefault();
        if (input && !emails.includes(input)) {
            setEmails([...emails, input]);
            setInput('');
        }
    };

    const handleRemoveEmail = (emailToRemove) => {
        setEmails(emails.filter(email => email !== emailToRemove));
    };
    const onFormSubmit = () => {

    }
    console.log(show)
    return (
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <button
                type="button"
                className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
                data-dismiss="modal"
                onClick={() => { close() }}
            >
                <i className="fas fa-times"></i>
            </button>
            <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
                <form onSubmit={onFormSubmit}>
                    <h5 className="text-center mb-7 pt-2">Send Mail</h5>
                    <div className="form-group d-flex mb-3 p-0">
                        <label
                            htmlFor="addmail"
                            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                            Add mail<span className="text-danger">*</span> :
                        </label>
                        <input
                            type="email"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                            required
                            id="addmail"
                            className='text-capitalize w-100'
                        />
                        <button type="button" className=' btn-primary px-5  mx-2  rounded-5 text-uppercase' onClick={handleAddEmail}>+</button>
                    </div>
                    <div className="form-group">
                        <ul className="list-unstyled d-flex align-items-center flex-wrap">
                            {emails.map(email => (

                                <li
                                    className="bg-polar text-black-2 mr-3 px-4 mt-2 mb-2 font-size-3 rounded-3 min-height-32 d-flex align-items-center"
                                    key={email}
                                >
                                    {email}
                                    <Link
                                        className="p-0 ms-1"
                                        onClick={() => handleRemoveEmail(email)}
                                    >
                                        <i
                                            className="px-3 fa fa-times-circle"
                                            aria-hidden="true"
                                        ></i>
                                    </Link>
                                </li>
                            ))}</ul>
                    </div>
                    <div className='d-flex justify-content-center mb-3'>
                        <button type='submit' className='btn btn-primary px-5  mx-2  rounded-5 text-uppercase'>Send</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
