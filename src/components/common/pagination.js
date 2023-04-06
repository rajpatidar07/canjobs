import React from "react";
import { Link } from "react-router-dom";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  //Function to get dynamic page no of the pagination :-
  const pageNumbers = [];
  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push(i);
  }

  //Function to go to next page with pagination :-
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  //Function to go to previous page with pagination :-
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-hover-primary rounded-0 ml-n2">
          {/* To change page perivous page :- */}{" "}
          <li className="page-item rounded-0 flex-all-center">
            <Link
              to={""}
              onClick={prevPage}
              className={
                currentPage === 1
                  ? "page-link rounded-0 border-0 px-3 d-none"
                  : "page-link rounded-0 border-0 px-3 "
              }
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left"></i>
            </Link>
          </li>
          {/* No of pagination:- */}
          {pageNumbers.map((pgNumber) => {
            return (
              <li
                className={currentPage === pgNumber ? "page-item" : ""}
                key={pgNumber}
              >
                {pgNumber === 0 ? (
                  <Link className="d-none"></Link>
                ) : (
                  <Link
                    to={""}
                    onClick={() => setCurrentPage(pgNumber)}
                    className={`page-link border-0 font-size-3 font-weight-semibold px-3 ${
                      currentPage === pgNumber ? "active " : ""
                    } `}
                  >
                    {pgNumber}
                  </Link>
                )}
              </li>
            );
          })}
          {/* To change page next page :- */}
          <li className="page-item rounded-0 flex-all-center">
            <Link
              to={""}
              onClick={nextPage}
              className={
                currentPage === pageNumbers.length
                  ? "page-link rounded-0 border-0 px-3 d-none"
                  : "page-link rounded-0 border-0 px-3"
              }
              aria-label="Next"
            >
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
