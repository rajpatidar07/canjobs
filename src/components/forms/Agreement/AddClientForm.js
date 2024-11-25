import React, { useState } from "react";
import { Modal } from "react-bootstrap";
// import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { AddUpdateAgreement } from "../../../api/api";
import { toast } from "react-toastify";
// import moment from 'moment';
import ClietFamilyFeilds from "../../common/Retaineragreement/clietFamilyFeilds";
const AddClientForm = ({
  folderId,
  user_id,
  openSignature,
  emp_user_type,
  show,
  close,
  userData,
  setApicall,
  felidData,
}) => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState(
    felidData.family_json || [
      {
        client_first_name:
          (emp_user_type === "employee" ? userData?.name : "")?.split(" ")[0] ||
          "",
        client_last_name:
          (emp_user_type === "employee" ? userData?.name : "")?.split(" ")[1] ||
          "",
        client_signature: "",
        date_signature_client: "",
        client_date_of_birth: "",
        id: Date.now(),
      },
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
    setLoading(true);

    let data = {
      id: felidData.id,
      type: felidData.type,
      receiver_type: felidData.receiver_type,
      family_json: clients,
    };
    try {
      let res = await AddUpdateAgreement(data);
      if (res.data.message === "Agreement updated successfully.") {
        toast.success("Family updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setApicall(true);
        setLoading(false);
        close();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const IsFamilyFelidsEmpty = JSON.stringify(newClient) === JSON.stringify({
    "client_first_name": "",
    "client_last_name": "",
    "client_signature": "",
    "date_signature_client": "",
    "client_date_of_birth": ""
  });

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
            <h5 className="text-center mb-7">Family List</h5>
            <ClietFamilyFeilds
              handleInputChange={handleInputChange}
              newClient={newClient}
              removeClient={removeClient}
              editClient={editClient}
              clients={clients}
              addClient={addClient}
            />
            <div className="text-center mb-5">
              <button
                type="submit"
                className="btn btn-primary btn-small w-25 mt-5 rounded-5 text-uppercase p-8"
                disabled={loading || !IsFamilyFelidsEmpty}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddClientForm;
