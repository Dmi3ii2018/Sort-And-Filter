import React, { useMemo, useCallback, useEffect } from "react";
import { usePagination } from "hooks/usePagination";
import "./Pagination.css";

const PaginationItem = ({ onPageClick, number, isActive }) => (
  <li onClick={onPageClick}>
    <button className={isActive ? "active" : ""}>{number}</button>
  </li>
);

const Dots = () => (
  <li>
    <span>...</span>
  </li>
);

const Pagination = ({
  total,
  currentPage,
  children,
  pageSize,
  onPageChange,
}) => {
  
  const pagLength = useMemo(() => Math.floor(total / pageSize - 1), [
    pageSize,
    total,
  ]);
  const [curPage, setCurrentPage, paginationIndexes] = usePagination(currentPage, pagLength)

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

  const onPageNumberClick = useCallback(
    (evt) => {
      setCurrentPage(+evt.target.textContent);
    },
    [setCurrentPage],
  );

  useEffect(() => {
    onPageChange(curPage);
  }, [curPage, onPageChange])

  const renderPagination = useCallback(() => {
    return paginationIndexes.map((page, i) => {
      if (!page) {
        return <Dots key={`${page}${i}`} />;
      }
      return (
        <PaginationItem
          key={`${page}${i}`}
          onPageClick={onPageNumberClick}
          number={page}
          isActive={page === curPage}
        />
      );
    });
  }, [curPage, onPageNumberClick, paginationIndexes]);

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
      {children}
    </div>
  );
};

export { Pagination };
