import { useState } from "react";

import "./style.scss";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pageNumber, setPageNumber] = useState(currentPage);

  const handleChange = (event) => {
    const newValue = event.target.value.replace(/\D/g, ''); 
    const newNumber = parseInt(newValue.slice(0, String(totalPages).length)); 
    if (newNumber > 0 && newNumber <= totalPages) {
      setPageNumber(newNumber);
    }
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter" && pageNumber > 0 && pageNumber <= maxPages) {
      onPageChange(parseInt(pageNumber)); 
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      onPageChange(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
      onPageChange(pageNumber + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage}>&#11164;</button>
      <input
        type="text"
        inputMode="numeric"
        className="page-input"
        value={pageNumber}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        onBlur={handleSubmit}
        maxLength={String(totalPages).length}
      />
      <button onClick={handleNextPage}>&#11166;</button>
      <p>
        Page {pageNumber} of {totalPages}
      </p>
    </div>
  );
};
