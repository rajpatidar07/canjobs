import Swal from "sweetalert2";
import {
  CallFromRingCentral,
  CallFromRingCentralStatus,
  CallFromRingCentralCancel,
} from "../../../api/api";
import { toast } from "react-toastify";

export const CallFunctionRIngCentral = async (phoneNumber, name, profile_photo) => {
  try {
    const resp = await CallFromRingCentral(phoneNumber);

    if (resp?.data?.status?.callStatus === "InProgress") {
      let callId = resp.data.id;
      let polling = true;
      let seconds = 0;
      let timerInterval;
      let pollInterval;
      let timerStarted = false;

      Swal.fire({
        title: "",
        html: `
          <div id="call-ui" style="text-align:center; font-family: Arial, sans-serif;">
            <p id="call-timer" style="font-size:18px; color:#777;">Calling...</p>
            <h2 style="margin: 5px 0; font-size:24px; color:#222;">${name}</h2>
            <p style="font-size:15px; color:#666;">+91 ${phoneNumber}</p>

            <div style="margin:15px auto;">
              <img src="${profile_photo || "https://via.placeholder.com/100"}"
                alt="Profile"
                style="
                  width:90px;
                  height:90px;
                  border-radius:50%;
                  object-fit:cover;
                  border:3px solid #00bfa5;
                  box-shadow:0 0 8px rgba(0,0,0,0.1);
                ">
            </div>
            <div style="margin-top:25px;">
              <button id="end-call-btn" style="
                background-color:#e74c3c;
                color:white;
                border:none;
                border-radius:50%;
                width:60px;
                height:60px;
                font-size:22px;
                cursor:pointer;
                transition:all 0.3s ease;
              ">
                <i class="fa fa-phone" style="transform:rotate(135deg);"></i>
              </button>
            </div>
          </div>

          <style>
            #end-call-btn:hover {
              background-color:#c0392b;
              transform:scale(1.05);
            }
            .swal2-popup {
              border-radius:20px !important;
              width:240px !important;
              padding:1.2rem 0.5rem !important;
              box-shadow:0 5px 25px rgba(0,0,0,0.15);
            }
          </style>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: async () => {
          const timerEl = document.getElementById("call-timer");
          const endBtn = document.getElementById("end-call-btn");

          // ⏱ Timer Function
          const startTimer = () => {
            if (timerStarted) return;
            timerStarted = true;
            seconds = 0;
            timerInterval = setInterval(() => {
              seconds++;
              const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
              const secs = String(seconds % 60).padStart(2, "0");
              timerEl.textContent = `${mins}:${secs}`;
            }, 1000);
          };

          // 🔁 Poll Call Status
          pollInterval = setInterval(async () => {
            if (!polling) return;
            try {
              const statusResp = await CallFromRingCentralStatus(callId);
              const status = statusResp?.data?.status;
              const callStatus = status?.callStatus;
              const callerStatus = status?.callerStatus;
              const calleeStatus = status?.calleeStatus;

              if (
                callStatus === "Success" &&
                callerStatus === "Success" &&
                calleeStatus === "Success"
              ) {
                startTimer();
              }

              if (
                callStatus === "Success" &&
                callerStatus === "Finished" &&
                calleeStatus === "Finished"
              ) {
                polling = false;
                clearInterval(pollInterval);
                clearInterval(timerInterval);
                await CallFromRingCentralCancel(callId);
                Swal.close();
                toast.success("Call Ended", {
                  position: "top-right",
                  autoClose: 1200,
                });
              }

              if (
                ["Failed", "Cancelled", "CannotReach", "NoAnswer", "Busy", "Invalid"].includes(callStatus)
              ) {
                polling = false;
                clearInterval(pollInterval);
                clearInterval(timerInterval);
                Swal.close();
                toast.info(mapStatusText(callStatus, callerStatus, calleeStatus), {
                  position: "top-right",
                  autoClose: 1500,
                });
              }
            } catch (err) {
              console.error("Polling error:", err);
              polling = false;
              clearInterval(pollInterval);
              clearInterval(timerInterval);
              Swal.close();
              toast.error("⚠️ Connection Error", {
                position: "top-right",
                autoClose: 1500,
              });
            }
          }, 3000);

          // 🚫 End Call Button
          endBtn.addEventListener("click", async () => {
            polling = false;
            clearInterval(pollInterval);
            clearInterval(timerInterval);
            try {
              await CallFromRingCentralCancel(callId);
            } catch (err) {
              console.error("Error ending call:", err);
            }
            Swal.close();
            toast.info("☎️ Call Ended", { position: "top-right", autoClose: 1000 });
          });
        },
        willClose: () => {
          // ✅ Cleanup on close (ensures no stuck intervals)
          polling = false;
          clearInterval(timerInterval);
          clearInterval(pollInterval);
        },
      });
    } else {
      toast.error("❌ Unable to start call.", { position: "top-right", autoClose: 1000 });
    }
  } catch (err) {
    console.error(err);
    Swal.fire("⚠️ Error", "Something went wrong while calling.", "error");
  }
};

// 🧠 Helper
const mapStatusText = (callStatus, callerStatus, calleeStatus) => {
  switch (callStatus) {
    case "CannotReach":
      return "Cannot Reach the Number";
    case "NoAnswer":
      return "📭 No Answer";
    case "Busy":
      return "Line is Busy";
    case "Cancelled":
      return "Call Cancelled";
    case "Failed":
      return "Call Failed";
    case "Invalid":
      return "Invalid Call";
    default:
      return ` ${callStatus || callerStatus || calleeStatus || "Unknown Status"}`;
  }
};
