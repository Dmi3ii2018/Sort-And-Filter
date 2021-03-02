import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./Pagination.css";

const PaginationItem = ({ onPageClick, number, isActive }) => (
  <li onClick={onPageClick}>
    <button className={isActive ? "active" : ""}>
      {number}
    </button>
  </li>
);

const Dots = () => (
  <li>
    <span>...</span>
  </li>
);

const Pagination = ({ total, currentPage = 1 }) => {
  const [curPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const pagLength = useMemo(() => Math.ceil(total / pageSize), [
    pageSize,
    total,
  ]);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  const onNextClick = () => {
    if (pagLength !== curPage) {
      setCurrentPage(curPage + 1);
    }
  };

  const onPrevClick = () => {
    if (curPage !== 1) {
      setCurrentPage(curPage - 1);
    }
  };

  const onPageNumberClick = (evt) => {
    setCurrentPage(+evt.target.textContent)
  };

  const renderPagination = useCallback(() => {
    let paginationIndexes;
    if (curPage < 4) {
      paginationIndexes = [1, 2, 3, 4, 5, 0, pagLength];
    }
    if (curPage + 2 >= pagLength) {
      paginationIndexes = [
        1,
        0,
        pagLength - 4,
        pagLength - 3,
        pagLength - 2,
        pagLength - 1,
        pagLength,
      ];
    }
    if (curPage >= 4 && curPage + 2 < pagLength) {
      paginationIndexes = [
        1,
        0,
        curPage - 1,
        curPage,
        curPage + 1,
        0,
        pagLength,
      ];
    }
    return paginationIndexes.map((page) => {
      if (!page) {
        return <Dots />;
      }
      return (
        <PaginationItem
          onPageClick={onPageNumberClick}
          number={page}
          isActive={page === curPage}
        />
      );
    });
  }, [pagLength, curPage]);

  return (
    <div className="pagination__wrapper">
      <ul className="pagination">
        <li>
          <button onClick={onPrevClick} className="prev" title="previous page">
            &#10094;
          </button>
        </li>
        {renderPagination()}
        <li>
          <button onClick={onNextClick} className="next" title="next page">
            &#10095;
          </button>
        </li>
      </ul>
    </div>
  );
};

export { Pagination };
