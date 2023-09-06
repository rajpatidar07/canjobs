import React,{/*useEffect,*/useState} from "react";
import useValidation from "./useValidation";
export default function ContactPage() {
    const [loading,/* setLoading*/] = useState(false)
    
 
    /*Render function to get the Response*/
    // useEffect(() => {
    // }, []);
  
    // INITIAL STATE ASSIGNMENT
    const initialFormState = {

      subject: "",
      description: "",
    };

   let  validators= {}
    // CUSTOM VALIDATIONS IMPORT
    const { state/*, setState*/, onInputChange, errors,/* setErrors, validate */} =
      useValidation(initialFormState, validators);

      const onContactusClick= () => {
        console.log("on click")
    }
  return (
    <div className="p-10 activity_container">
      <div className="row">
        <div className="col">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This card has a regular title and short paragraphy of text below
                it.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This card has a regular title and short paragraphy of text below
                it.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <form className=" p-10">
            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="subject"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Subject: <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  maxLength={20}
                  name="subject"
                  value={state.subject || ""}
                  onChange={onInputChange}
                  type="text"
                  className={
                    errors.subject
                      ? "form-control border border-danger"
                      : "form-control"
                  }
                  placeholder="subject"
                  id="subject"
                />
              </div>
              {/*----ERROR MESSAGE FOR name----*/}
              {errors.subject && (
                <span key={errors.subject} className="text-danger font-size-3">
                  {errors.subject}
                </span>
              )}
            </div>
            <div className="form-group col px-0 pr-3">
              <label
                htmlFor="remark"
                className="font-size-3 text-black-2 font-weight-semibold line-height-reset mb-0"
              >
                Description: <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <div
                  className={
                    errors.remark
                      ? "border border-danger rounded overflow-hidden"
                      : "border rounded overflow-hidden"
                  }
                >
                  <textarea
                    name="remark"
                    value={state.remark}
                    onChange={onInputChange}
                    rows={8}
                    style={{ height: "140px" }}
                    className={
                      errors.remark
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="remark"
                    placeholder="Add Note here"
                  ></textarea>
                </div>
                {/*----ERROR MESSAGE FOR DESRIPTION----*/}
                {errors.remark && (
                  <span key={errors.remark} className="text-danger font-size-3">
                    {errors.remark}
                  </span>
                )}
              </div>
            </div>
            <div className="form-group text-center">
              {loading === true ? (
                <button
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
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
                  onClick={(e) => onContactusClick(e)}
                  className="btn btn-primary btn-small w-25 rounded-5 text-uppercase"
                  type="button"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
