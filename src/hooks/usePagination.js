import { useState, useEffect, useMemo } from "react";

const PAGES_NUMBER_TO_CHANGE_VIEW = 4;
const PAGES_NUMBER_WITH_DOTS = 7;

export const usePagination = (currentPage, pagLength) => {
  const [curPage, setCurrentPage] = useState(currentPage);

  const paginationIndexList = useMemo(() => {
    let paginationIndexes;
    if (pagLength <= PAGES_NUMBER_TO_CHANGE_VIEW) {
      paginationIndexes = new Array(pagLength <= 0 ? 1 : pagLength)
        .fill("")
        .map((it) => it + 1);
    }
    if (
      curPage < PAGES_NUMBER_TO_CHANGE_VIEW &&
      pagLength > PAGES_NUMBER_TO_CHANGE_VIEW
    ) {
      paginationIndexes = [1, 2, 3, 4, 5, 0, pagLength];
    }
    if (curPage + 2 >= pagLength && pagLength > PAGES_NUMBER_WITH_DOTS) {
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
    if (curPage >= PAGES_NUMBER_TO_CHANGE_VIEW && curPage + 2 < pagLength) {
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
    return paginationIndexes;
  }, [curPage, pagLength]);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  return [curPage, setCurrentPage, paginationIndexList];
};
