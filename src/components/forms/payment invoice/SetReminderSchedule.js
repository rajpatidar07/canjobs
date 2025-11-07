import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CiBellOn } from "react-icons/ci"; // modern icon

export default function SetReminderSchedule(props) {
  const [schedule, setSchedule] = useState("");
  const [reminderInterval, setReminderInterval] = useState(null);

  const handleClose = () => {
    props.close()
    setReminderInterval(null)
    setSchedule("")
  }

  const handleSave = () => {
    if (!schedule) {
      alert("Please select a schedule type!");
      return;
    }

    // Clear any existing interval before starting new one
    if (reminderInterval) clearInterval(reminderInterval);

    let intervalTime;
    switch (schedule) {
      case "daily":
        intervalTime = 24 * 60 * 60 * 1000; // 24 hours
        break;
      case "weekly":
        intervalTime = 7 * 24 * 60 * 60 * 1000; // 7 days
        break;
      case "quarterly":
        intervalTime = 90 * 24 * 60 * 60 * 1000; // 3 months approx
        break;
      case "yearly":
        intervalTime = 365 * 24 * 60 * 60 * 1000; // 1 year
        break;
      default:
        intervalTime = 0;
    }

    // Simulated automatic reminder using setInterval
    const intervalId = setInterval(() => {
      console.log(`🔔 Reminder sent automatically (${schedule})!`);
      alert(`🔔 Reminder sent automatically (${schedule})!`);
    }, intervalTime);

    setReminderInterval(intervalId);
    handleClose();
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (reminderInterval) clearInterval(reminderInterval);
    };
  }, [reminderInterval]);
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      size="md"
      centered
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      contentClassName="border-0 rounded-4 shadow-lg bg-white"
      dialogClassName="rounded-4"
    >
      {/* Floating Close Button */}
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={() => handleClose()}>
        <i className="fas fa-times"></i>
      </button>

      <Modal.Header
        className="border-0 pb-0"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <Modal.Title
          className="d-flex align-items-center gap-2 fw-semibold"
          style={{ fontSize: "18px", color: "#333" }}
        >
          <CiBellOn size={22} />
          Set Automatic Reminder
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-2 px-4 pb-4">
        <div className="mb-3 text-secondary" style={{ fontSize: "14px" }}>
          Choose how often you'd like to receive automatic reminders. You can
          change this anytime.
        </div>
        <Form>
          <Form.Group className="mb-4">
            <Form.Label
              style={{ fontWeight: 600, fontSize: "15px", color: "#333" }}
            >
              Reminder Frequency
            </Form.Label>
            <Form.Control
              as="select"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="shadow-sm"
              style={{
                borderColor: "#ced4da",
                padding: "10px",
                fontSize: "15px",
                borderRadius: "8px",
              }}
            >
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </Form.Control>
          </Form.Group>

          {schedule && (
            <div
              className="p-3 text-center rounded"
              style={{
                background: "#f8f9fa",
                border: "1px solid #dee2e6",
                fontSize: "14px",
                color: "#495057",
              }}
            >
              ⏰ User will receive automatic reminders <b>{schedule}</b>.
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer
        className="border-0 pt-0 px-4 pb-4"
        style={{ backgroundColor: "#fff" }}
      >
        <Button
          variant="light"
          onClick={handleClose}
          className="px-4"
          style={{
            border: "1px solid #dee2e6",
            borderRadius: "8px",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          className="px-4"
          style={{
            borderRadius: "8px",
          }}
        >
          Save Schedule
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
