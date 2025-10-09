import React from 'react';
import { Modal } from 'react-bootstrap';

const EmailSelectionModal = ({
  show,
  onHide,
  userEmail,
  userSecondaryEmail,
  selectedEmail,
  onSelectEmail,
  title 
}) => {
  return (
    <>
      {/* Custom backdrop for child modal */}
      {show && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1065,
          }}
        ></div>
      )}
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        style={{ zIndex: 1070 }}
      >
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={() => onHide()}
      >
        <i className="fas fa-times"></i>
      </button>

      <div className="px-11 py-7 bg-white rounded-3">
        <h2 className="font-size-6 text-center">Payment Invoice</h2>
            <div className="d-flex flex-column">
              <div className="row mb-4 mx-3">
                <label
                  className="col-sm-3 col-form-label text-md-end text-start fw-semibold"
                >
                  Recipient Email:
                </label>
                <div className="col-sm-9">
                  <div id="selectemail" className="d-flex flex-column gap-2 p-3 border rounded bg-light">
                    {/* Primary Email Option */}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="emailChoice"
                        id="primaryEmail"
                        value={userEmail}
                        checked={selectedEmail === userEmail}
                        onChange={() => onSelectEmail(userEmail)}
                      />
                      <label className="form-check-label ms-2" htmlFor="primaryEmail">
                        <strong>Primary:</strong> {userEmail}
                      </label>
                    </div>

                    {/* Secondary Email Option (if available) */}
                    {userSecondaryEmail && (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="emailChoice"
                          id="secondaryEmail"
                          value={userSecondaryEmail}
                          checked={selectedEmail === userSecondaryEmail}
                          onChange={() => onSelectEmail(userSecondaryEmail)}
                        />
                        <label className="form-check-label ms-2" htmlFor="secondaryEmail">
                          <strong>Secondary:</strong> {userSecondaryEmail}
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Modal>
    </>
  );
};

export default EmailSelectionModal;
