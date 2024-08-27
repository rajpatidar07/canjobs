import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { AddUpdateAgreement } from '../../../api/api';
import { toast } from 'react-toastify';
import moment from 'moment';

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
    const [loading, setLoading] = useState(false)
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

    const [editIndex, setEditIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClient({ ...newClient, [name]: value });
    };

    const addClient = () => {
        if (editIndex !== null) {
            const updatedClients = clients.map((client, index) =>
                index === editIndex ? { ...newClient, id: client.id } : client
            );
            setClients(updatedClients);
            setEditIndex(null);
        } else {
            setClients([...clients, { ...newClient, id: Date.now() }]);
        }
        setNewClient({
            client_first_name: "",
            client_last_name: "",
            client_signature: "",
            date_signature_client: "",
            client_date_of_birth: "",
        });
    };

    const removeClient = (indexToDelete) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            setClients(clients.filter((_, index) => index !== indexToDelete));
        }
    };

    const editClient = (index) => {
        const clientToEdit = clients[index];
        setNewClient(clientToEdit);
        setEditIndex(index);
    };

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        let data = {
            id: felidData.id,
            type: felidData.type,
            family_json: clients
        }
        try {
            let res = await AddUpdateAgreement(data)
            if (res.data.message === "Agreement updated successfully.") {
                toast.success("Family updated successfully", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
                setApicall(true)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

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
                        <h2 className="text-center">Family List</h2>
                        <div className='table-responsive main_table_div w-100'>
                            <table className="table table-striped main_data_table">
                                <thead>
                                    <tr>
                                        <th className="border-0 font-size-4 ">
                                            S.no
                                        </th>
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
                                    {clients.map((client, index) => (
                                        <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td className="text-capitalize">
                                                {client.client_first_name || "N/A"}
                                            </td>
                                            <td className="text-capitalize">
                                                {client.client_last_name || "N/A"}
                                            </td>
                                            <td className="text-capitalize">
                                                {client.client_date_of_birth ? moment(client.client_date_of_birth).format("DD-MM-YYYY") : "N/A"}
                                            </td>
                                            <td>
                                                <div className="btn-group button_group" role="group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-info action_btn"
                                                        onClick={() => editClient(index)}
                                                    >
                                                        <span className="text-gray px-5">
                                                            <FaEdit />
                                                        </span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger action_btn"
                                                        onClick={() => removeClient(index)}
                                                    >
                                                        <span className="text-danger px-5">
                                                            <FaTrash />
                                                        </span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={4}>
                                            <div className="form-group row align-items-center mt-2">
                                                <div className="col-md-4 mb-2">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="client_first_name"
                                                        value={newClient.client_first_name}
                                                        onChange={handleInputChange}
                                                        placeholder="First Name"
                                                    />
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="client_last_name"
                                                        value={newClient.client_last_name}
                                                        onChange={handleInputChange}
                                                        placeholder="Last Name"
                                                    />
                                                </div>
                                                <div className="col-md-3 mb-2">
                                                    <input
                                                        type="date"
                                                        className="form-control coustam_datepicker"
                                                        value={newClient.client_date_of_birth}
                                                        onChange={handleInputChange}
                                                        onKeyDownCapture={(e) => e.preventDefault()}
                                                        id={`client_date_of_birth`}
                                                        name="client_date_of_birth"
                                                        placeholder="Client's DOB"
                                                    />
                                                </div>
                                                <div className="col-md-1 mb-2">
                                                    <button type="button" className="btn btn-primary w-100" onClick={addClient}>
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className='text-center mb-5'>
                            <button
                                type="submit"
                                className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase p-8"
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : "Save"}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </Modal>
    );
};

export default AddClientForm;
