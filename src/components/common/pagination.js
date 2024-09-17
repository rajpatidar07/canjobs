import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Pagination({ nPages, currentPage, setCurrentPage, total, count }) {
  // Create state to manage visible page numbers
  const [visiblePageNumbers, setVisiblePageNumbers] = React.useState([]);
  useEffect(() => {

    // Calculate the start and end index for visible page numbers
    const pageSize = 10;
    const start = Math.max(1, currentPage - Math.floor(pageSize / 2));
    const end = Math.min(nPages, start + pageSize - 1);

    // Update visible page numbers
    const newVisiblePageNumbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    setVisiblePageNumbers(newVisiblePageNumbers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, nPages]);
  return (
    <div>
      {nPages > 1 ? (
        <>
          <nav aria-label="Page navigation example">
            <ul className="pagination pagination-hover-primary rounded-0 ml-n2  ">
              <li className="page-item px-1">
                <Link
                  onClick={() => {
                    setCurrentPage(parseInt(currentPage) - 1)
                    localStorage.setItem("PageNo", "")
                  }}
                  className={
                    parseInt(currentPage) === 1
                      ? "disabled-link page-link  font-size-3 py-2 font-weight-semibold px-3"
                      : "page-link  font-size-3 py-2 font-weight-semibold px-3"
                  }
                  title="Previous"
                >
                  <i className="fas fa-chevron-left"></i>
                </Link>
              </li>
              {visiblePageNumbers.map((pgNumber) => (
                <Link
                  onClick={() => {
                    setCurrentPage(pgNumber);
                    localStorage.setItem("PageNo", pgNumber);  // Store the current page number
                  }}
                  className={`page-link  font-size-3 py-2 font-weight-semibold px-3 ${parseInt(currentPage) === pgNumber ? "active " : ""}`}
                >
                  {pgNumber}
                </Link>

              ))}
              <li className="page-item px-1">
                <Link
                  onClick={() => {
                    setCurrentPage(parseInt(currentPage) + 1)
                    localStorage.setItem("PageNo", "")
                  }}
                  className={
                    currentPage === nPages
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
          <div className="d-flex justify-content-center">
            <small>
              {count === "1" || count === 1
                ? count + " record "
                : count + " records "}
              of {total} total records
            </small>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Pagination;
