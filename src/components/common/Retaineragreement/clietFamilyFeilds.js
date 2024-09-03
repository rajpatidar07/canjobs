import moment from 'moment'
import React from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'

function clietFamilyFeilds({ handleInputChange,
    newClient,
    removeClient,
    editClient,
    clients,
    addClient, }) {
    return (
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
                    {clients.slice(1).map((client, index) => (
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
                                        onClick={() => editClient(index + 1)}
                                    >
                                        <span className="text-gray px-5">
                                            <FaEdit />
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger action_btn"
                                        onClick={() => removeClient(index + 1)}
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
                                        min={moment().subtract(84, 'years').format("YYYY-MM-DD")}
                                        max={moment().subtract(1, 'year').endOf('year').format("YYYY-MM-DD")}
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
        </div>)
}

export default clietFamilyFeilds