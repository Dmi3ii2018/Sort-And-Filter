import React, { useEffect, useCallback, useState, useMemo } from "react";
import { TableRow, FilterIcon, Pagination, PageSize, Spin } from "components";
import cloneDeep from "lodash-es/cloneDeep";
import { sortData, filterData } from "utils/utils";
import "./Table.css";

const SortType = {
  UP: 1,
  DOWN: -1,
};
const SortToNextStep = {
  [SortType.UP]: "-1",
  [SortType.DOWN]: "1",
};

const Table = ({
  dataSource,
  columns,
  isLoading,
  onPageSizeChange,
  onPageChange,
  pageSize = 10,
  currentPage = 1
}) => {
  const initialValue = useMemo(() => {
    if (dataSource && dataSource.items.length) {
      return cloneDeep(dataSource.items);
    }
  }, [dataSource]);
  const [data, setData] = useState();
  const [curPageSize, setPageSize] = useState(pageSize);
  const [sort, setSort] = useState({
    columnName: null,
    type: 0,
  });

  const onSortChange = (evt) => {
    const name = evt.target.id;
    const { type } = sort;
    setSort({
      columnName: name,
      type: type ? SortToNextStep[type] : SortType.UP,
    });
  };

  const onSizeChange = (val) => {
    setPageSize(val);
    onPageSizeChange(val);
  };

  useEffect(() => {
    if (initialValue && initialValue.length) {
      setData(initialValue);
    }
  }, [initialValue]);

  const getElements = useCallback(() => {
    const { type, columnName } = sort;
    if (isLoading) {
      return (
        <tr>
          <td colSpan={columns.length}>
            <Spin />
          </td>
        </tr>
      );
    }

    if (data && data.length) {
      return data
        .sort(sortData(type, columnName))
        .map((pokemon) => <TableRow key={pokemon.id} pokemon={pokemon} />);
    }
  }, [data, sort, isLoading, columns.length]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {columns.map(({ title, dataIndex, key, filter, sort }) => {
              return (
                <th
                  key={key}
                  id={dataIndex}
                  onClick={sort ? onSortChange : null}
                >
                  {title}{" "}
                  {filter && (
                    <FilterIcon
                      colName={dataIndex}
                      filterHandler={filterData(data, setData, initialValue)}
                    />
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{getElements()}</tbody>
      </table>
      <Pagination
      currentPage={currentPage}
        pageSize={curPageSize}
        onPageChange={onPageChange}
        total={dataSource ? dataSource.total : 0}
      >
        <PageSize>{onSizeChange}</PageSize>
      </Pagination>
    </div>
  );
};

export { Table };
