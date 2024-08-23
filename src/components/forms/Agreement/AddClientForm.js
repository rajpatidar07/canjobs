import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const AddClientForm = ({
    folderId,
    user_id,
    openSignature,
    emp_user_type,
    show,
    close,
    userData,
    setApicall,
    felidData
}) => {
    const [clients, setClients] = useState(
        JSON.parse(felidData.family_json) || [
            {
                client_first_name: (emp_user_type === "employee" ? userData?.name : userData?.company_name)?.split(" ")[0] || "",
                client_last_name: (emp_user_type === "employee" ? userData?.name : userData?.company_name)?.split(" ")[1] || "",
                client_signature: "",
                date_signature_client: "",
                client_date_of_birth: "",
                id: Date.now(),
            }
        ]
    );

    const [newClient, setNewClient] = useState({
        client_first_name: "",
        client_last_name: "",
        client_signature: "",
        date_signature_client: "",
        client_date_of_birth: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient({ ...newClient, [name]: value });
    };

    const addClient = () => {
        setClients([...clients, { ...newClient, id: Date.now() }]);
        setNewClient({
            client_first_name: "",
            client_last_name: "",
            client_signature: "",
            date_signature_client: "",
            client_date_of_birth: "",
        });
    };

    const removeClient = (id) => {
        setClients(clients.filter(client => client.id !== id));
    };

    const editClient = (id) => {
        const clientToEdit = clients.find(client => client.id === id);
        setNewClient(clientToEdit);
        setClients(clients.filter(client => client.id !== id));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(newClient);
    };

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <button
                type="button"
                className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
                data-dismiss="modal"
                onClick={close}
            >
                <i className="fas fa-times"></i>
            </button>
            <div className="bg-white rounded h-100 px-11 pt-7 overflow-y-hidden">
                <form onSubmit={onFormSubmit}>
                    <div>
                        <h2 className="text-center">Client List</h2>
                        <table className="table table-striped main_data_table">
                            <thead>
                                <tr>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        First Name
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        Last Name
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        Date of Birth
                                    </th>
                                    <th scope="col" className="border-0 font-size-4 font-weight-normal">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id}>
                                        <td className="text-capitalize">
                                            {client.client_first_name || "N/A"}
                                        </td>
                                        <td className="text-capitalize">
                                            {client.client_last_name || "N/A"}
                                        </td>
                                        <td className="text-capitalize">
                                            {client.client_date_of_birth || "N/A"}
                                        </td>
                                        <td>
                                            <div className="btn-group button_group" role="group">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-info action_btn"
                                                    onClick={() => editClient(client.id)}
                                                >
                                                    <span className="text-gray px-5">
                                                        <FaEdit />
                                                    </span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-info action_btn"
                                                    onClick={() => removeClient(client.id)}
                                                >
                                                    <span className="text-danger px-5">
                                                        <FaTrash />
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="form-group">
                                    <td>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="client_first_name"
                                            value={newClient.client_first_name}
                                            onChange={handleInputChange}
                                            placeholder="First Name"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="client_last_name"
                                            value={newClient.client_last_name}
                                            onChange={handleInputChange}
                                            placeholder="Last Name"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            className="coustam_datepicker form-control mx-5 col"
                                            value={newClient.client_date_of_birth}
                                            onChange={handleInputChange}
                                            onKeyDownCapture={(e) => e.preventDefault()}
                                            id={`client_date_of_birth`}
                                            name="client_date_of_birth"
                                            placeholder="Client's DOB"
                                        />
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={addClient}>
                                            <FaPlus />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddClientForm;
