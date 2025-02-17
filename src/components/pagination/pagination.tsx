import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination flex justify-between w-[95%]">
      <div className="flex text-[12px] gap-4">
        <button
          className="border bg-[#fff] p-2 font-medium rounded-lg"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="border bg-[#fff] p-2 font-medium rounded-lg"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <span className="text-[12px] font-medium">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
