import React from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai"
export default function DocSaveForm({ handleBulkFileChange, saveBtn, loadingBtn, SaveBulkDocument }) {
    return (
        <div>
            <form>
                <div className="">
                    <label className="btn btn-light ">
                        <AiOutlineCloudUpload className="font-size-3 mr-2" />
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                handleBulkFileChange(e);
                            }}
                            multiple
                        />
                        Upload New Documents
                    </label>
                </div>
                {saveBtn === true ?
                    <div className="doc_upload_col">
                        {loadingBtn ?
                            <button
                                className="btn btn-primary px-12"
                                type="button"
                                disabled
                            >
                                <span
                                    className="spinner-border spinner-border-sm "
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                <span className="sr-only">Loading...</span>
                            </button>
                            : <button
                                className="btn btn-primary doc_btn"
                                onClick={SaveBulkDocument}
                            >
                                Save Documents
                            </button>}
                    </div> : null}
            </form>
        </div>
    )
}
