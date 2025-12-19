import Spreadsheet, { createFormulaParser } from "react-spreadsheet";
import { useState } from "react";
import { FaArrowRight, FaArrowDownLong } from "react-icons/fa6";
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import { AddSharePointDOcument } from "../../../api/api";
import * as XLSX from "xlsx";
const customCreateFormulaParser = (data) =>
  createFormulaParser(data, { SUM: undefined });

const CreateExcelSheet = (props) => {
  const [isDocPrivate, setIsDocPrivate] = useState(1)
  let userType = localStorage.getItem("userType")
  const [data, setData] = useState([
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],

  ]);
  let [loading, setLoading] = useState(false)
  let handleExcelSheetClose = () => {
    setData([
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],
      [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" },],

    ])
    props.close()
    setLoading(false)
  }
  // Function to add a new row
  const addRow = () => {
    setData([...data, Array(data[0].length).fill({ value: "" })]);
  };

  // Function to add a new column
  const addColumn = () => {
    setData(data.map((row) => [...row, { value: "" }]));
    setLoading(false)
  };
  const createCSVFile = async (e) => {
    e.preventDefault();
    // Convert spreadsheet data to CSV format
    // const csvRows = data.map(row => row.map(cell => cell.value).join(","));
    // const csvString = csvRows.join("\n");

    // Convert CSV string to XLSX file in memory
    const worksheet = XLSX.utils.aoa_to_sheet(data.map(row => row.map(cell => cell.value)));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const xlsxBlob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    const xlsxFile = new File([xlsxBlob], `Sheet${new Date().getTime()}.xlsx`, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
    // console.log(xlsxFile)
    // Upload the XLSX file using the existing exportToExcelFile function
    await exportToExcelFile(e, xlsxFile);
  };
  /*Function to Add excel to the api */
  const exportToExcelFile = async (e, file) => {
    e.preventDefault()

    // Create a download link and trigger the download
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = "note.txt"; // Save as a .txt file
    // link.click();
    if (file.name === "undefined" || file.name === undefined) {
      toast.error("File name is undefined")
    } else {
      try {
        setLoading(true)
        const res = await AddSharePointDOcument(
          props.user_id,
          props.emp_user_type,
          props.folderID,
          props.docTypeName,
          [file],
          userType === "admin" ? isDocPrivate : 0
        );

        if (res.data.message === "Document Upload") {
          toast.success('Excel added successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          props.setApiCall(true);
          setLoading(false)
          handleExcelSheetClose()
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  };
  return (
    <Modal
      show={props.show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    // onBackdropClick={() => handleExcelSheetClose()}
    >
      <button
        type="button"
        className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper"
        data-dismiss="modal"
        onClick={() => handleExcelSheetClose()}
      >
        <i className="fas fa-times"></i>
      </button>
      {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
      <div className="bg-white rounded shadow p-4 d-flex flex-column h-100">
        {/* Toolbar */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h4 className="m-0">Create Excel Sheet</h4>
          <div className="btn-group" role="group">
            <button className="btn btn-outline-primary d-flex align-items-center" onClick={addRow}>
              <span className="me-1">Add Row</span>
              <FaArrowDownLong />
            </button>
            <button className="btn btn-outline-success d-flex align-items-center" onClick={addColumn}>
              <span className="me-1">Add Column</span>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Spreadsheet container */}
        <div
          className="flex-grow-1 border rounded overflow-auto"
          style={{ minHeight: '400px', maxHeight: '600px' }}
        >
          <Spreadsheet
            data={data}
            onChange={setData}
            createFormulaParser={customCreateFormulaParser}
          />
        </div>
        {userType === "admin" && (
          <label>
            <input
              type="checkbox"
              checked={isDocPrivate === 1}
              onChange={() => setIsDocPrivate(isDocPrivate === 1 ? 0 : 1)}
            /> Private
          </label>
        )}
        {/* Save Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4 py-2"
            onClick={createCSVFile}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

    </Modal>
  );
};

export default CreateExcelSheet;
