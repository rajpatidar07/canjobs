import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Pagination(props) {
  // Create state to manage visible page numbers
  const [visiblePageNumbers, setVisiblePageNumbers] = React.useState([]);
  useEffect(() => {

    // Calculate the start and end index for visible page numbers
    const pageSize = 10;
    const start = Math.max(1, props.currentPage - Math.floor(pageSize / 2));
    const end = Math.min(props.nPages, start + pageSize - 1);

    // Update visible page numbers
    const newVisiblePageNumbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    setVisiblePageNumbers(newVisiblePageNumbers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentPage, props.nPages]);
  return (
    <div>
      {(
        <>
          <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example ">
              <ul  className={props.nPages > 1 ? "pagination pagination-hover-primary rounded-0 ml-n2 " : "d-none"}>
                <li className="page-item px-1">
                  <Link
                    onClick={() => {
                      props.setCurrentPage(parseInt(props.currentPage) - 1)
                      localStorage.setItem("PageNo", "")
                    }}
                    className={
                      parseInt(props.urrentPage) === 1
                        ? "disabled-link page-link  font-size-3 py-2 font-weight-semibold px-3"
                        : "page-link  font-size-3 py-2 font-weight-semibold px-3"
                    }
                    title="Previous"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </Link>
                </li>
                {visiblePageNumbers.map((pgNumber, index) => (
                  <Link
                    key={index}
                    onClick={() => {
                      props.setCurrentPage(pgNumber);
                      localStorage.setItem("PageNo", pgNumber);  // Store the current page number
                    }}
                    className={`page-link  font-size-3 py-2 font-weight-semibold px-3 ${parseInt(props.currentPage) === pgNumber ? "active " : ""}`}
                  >
                    {pgNumber}
                  </Link>

                ))}
                <li className="page-item px-1">
                  <Link
                    onClick={() => {
                      props.setCurrentPage(parseInt(props.currentPage) + 1)
                      localStorage.setItem("PageNo", "")
                    }}
                    className={
                      props.currentPage === props.nPages
                        ? "disabled-link page-link  font-size-3 py-2 font-weight-semibold px-3"
                        : "page-link  font-size-3 py-2 font-weight-semibold px-3"
                    }
                    title="Next"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </Link>
                </li>
              </ul>
            </nav>
            {((props.nPages > 1 || props.total > 10) && (props.page === "task" || props.page === "document")) && (
              <button
                className="page-link font-size-3 py-2 font-weight-semibold px-3 rounded"
                style={{ height: "max-content" }}
                onClick={() => {
                  props.setCurrentPage(1);
                  props.setRecordsPerPage(
                    props.recordsPerPage === props.total ? 10 : props.total
                  );
                }}
              >
                {props.recordsPerPage === props.total ? "View Less" : "View All"}
              </button>
            )}
          </div>
          <div className={props.nPages > 1 ? " d-flex justify-content-center" : "d-none"}>
            <small>
              {props.count === "1" || props.count === 1
                ? props.count + " record "
                : props.count + " records "}
              of {props.total} total records
            </small>
          </div>

        </>
      )}
    </div>
  );
}

export default Pagination;
