import React, { useState } from 'react'
import { AddEmployeeDetails } from "../../../api/api"
import { toast } from "react-toastify"
import { Modal } from 'react-bootstrap';
// import filterjson from '../../json/filterjson';
// import Select from "react-select"
export default function ApplicantCategory(props) {
    const [category, setcategory] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(props.data)
    /*Function to set data to the search Category  */
    // const onCategorySelectChange = (option) => {
    //     setcategory(option.value);
    // };
    /*function to change applicants category */
    const OnCategoryClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        let data = {
            employee_id: props.data.employee_id,
            category: category,
        };
        try {
            let response = await AddEmployeeDetails(data);
            if (response.message === "Employee data updated successfully") {
                toast.success("Employee Category updated successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
                });
                setLoading(false);
                props.close()
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };
    return (
        <Modal
            show={props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <button
                type="button"
                className="circle-32 btn-reset bg-white pos-abs-tr mt-md-n6 mr-lg-n6 focus-reset z-index-supper "
                data-dismiss="modal"
                onClick={props.close}
            >
                <i className="fas fa-times"></i>
            </button>
            {/* <div className="modal-dialog max-width-px-540 position-relative"> */}
            <div className="bg-white rounded h-100 p-7">
                <form onSubmit={OnCategoryClick}>
                    <h5 className="text-center mb-7">Change Applicants Category</h5>
                    <div className={`form-group col-md-12`}>
                        <label
                            htmlFor="category"
                            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                        >
                            Category:
                        </label>
                        <select
                            name="category"
                            value={category || props.data.category}
                            onChange={(e) => setcategory(e.target.value)}
                            className={
                                // errors.category
                                //     ? "form-control border border-danger"
                                //     :
                                "form-control"
                            }
                            id="category"
                        >
                            <option value={""}>User category</option>
                            <option value={"1"}>PNP</option>
                            <option value={"2"}>Visitors visa</option>
                            <option value={"3"}>Working Visa</option>
                            <option value={"4"}>Express Entry</option>
                            <option value={"5"}>Business Visa</option>
                        </select>
                        {/* <Select
                            options={"" || filterjson.Applicantscategories}
                            name="category"
                            value={filterjson.Applicantscategories.find(
                                (item) => item.value === category) ?
                                filterjson.Applicantscategories.find(
                                    (item) => item.value === category).label : ""}
                            id="category"
                            onChange={onCategorySelectChange}
                            className={
                                // errors.category
                                //   ? "form-control border border-danger px-0 pt-4 "
                                //   :
                                "form-control px-0 pt-4 border-0"
                            }
                        /> */}
                        {/* ----ERROR MESSAGE FOR category---- */}
                        {/* {errors.category && (
                      <span
                        key={errors.category}
                        className="text-danger font-size-3"
                      >
                        {errors.category}
                      </span>
                    )} */}
                    </div>
                    <div className="form-group text-center d-flex justify-content-center">
                        {loading === true ? (
                            <button
                                className="btn-primary px-5  mx-2  rounded-5 text-uppercase"
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
                        ) : (
                            <button
                                className=" btn-primary px-5  mx-2  rounded-5 text-uppercase"
                                type="submit"
                            >
                                submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </Modal>
    )
}
