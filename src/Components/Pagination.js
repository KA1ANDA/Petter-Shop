import React, { memo } from "react";

const Pagination = memo(({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxPagesToShow = 5;
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  console.log(currentPage === 1)

  return (
    <nav>
      <ul className="pagination flex gap-[20px] justify-center text-[30px] font-bold">
        <li onClick={() => (currentPage+1 > 1 ? paginate(currentPage - 1) : null)} className={`page-item ${currentPage+1 === 1 && 'hidden'}`}>
          <button 
            disabled={currentPage+1 === 1}
          >
            {"<"}
          </button>
        </li>
        {pageNumbers.slice(startPage - 1, endPage).map(number => (
          <li onClick={() => paginate(number - 1)} className={`page-link ${currentPage === number - 1 ? ' bg-primary text-white ' : ''}  page-item`} key={number} >
            <a>
              {number}
            </a>
          </li>
        ))}
        <li onClick={() => (currentPage < totalPages ? paginate(currentPage + 1) : null)} className={`page-item ${currentPage+1 === totalPages && 'hidden'}`}>
          <button  
            disabled={currentPage + 1 === totalPages}
            
          >
            {">"}
          </button>
        </li>
      </ul>
    </nav>
  );
});

export default Pagination;