import React, { useState } from "react";
import axios from "axios";
// import PDFDocument from "jsPDF";
function ResumeGenerator() {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    education: "",
    workExperience: "",
    skills: "",
  });

  //   const generateResume = () => {
  //     const doc = new PDFDocument();
  //     doc.text(`Name: ${employeeData.name}`);
  //     doc.text(`Email: ${employeeData.email}`);
  //     doc.text(`Education: ${employeeData.education}`);
  //     doc.text(`Work Experience: ${employeeData.workExperience}`);
  //     doc.text(`Skills: ${employeeData.skills}`);
  //     doc.pipe(
  //       axios.post("https://api.example.com/upload", {
  //         data: doc,
  //         headers: {
  //           "Content-Type": "application/pdf",
  //         },
  //       })
  //     );
  //     doc.end();
  //   };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={employeeData.name}
        onChange={(e) =>
          setEmployeeData({ ...employeeData, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Email"
        value={employeeData.email}
        onChange={(e) =>
          setEmployeeData({ ...employeeData, email: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Education"
        value={employeeData.education}
        onChange={(e) =>
          setEmployeeData({ ...employeeData, education: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Work Experience"
        value={employeeData.workExperience}
        onChange={(e) =>
          setEmployeeData({ ...employeeData, workExperience: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Skills"
        value={employeeData.skills}
        onChange={(e) =>
          setEmployeeData({ ...employeeData, skills: e.target.value })
        }
      />
      {/* <button onClick={generateResume}>Generate Resume</button> */}
    </div>
  );
}
export default ResumeGenerator;
