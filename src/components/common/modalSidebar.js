import Modal from "react-bootstrap/Modal";

function ModalSidebar({ show, onClose, children }) {
  return (
    <Modal
      show={show}
      onHide={onClose}
      fullscreen={false}
      dialogClassName="custom-modal bg-white h-100 my-0 mr-0"
    >
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          zIndex: "1056",
          width: 30,
          height: 30,
          lineHeight: 1,
          color: "#333",
          fontSize: 30,
        }}
      >
        &times;
      </button>
      <Modal.Body className="bg-white">{children}</Modal.Body>
    </Modal>
  );
}

export default ModalSidebar;
