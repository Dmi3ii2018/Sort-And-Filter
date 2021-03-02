import React, { useEffect, useCallback, useState, useMemo } from "react";
import "./Table.css";
import { TableRow, FilterIcon, Pagination } from "components";
import cloneDeep from "lodash-es/cloneDeep";

const SortType = {
  UP: 1,
  DOWN: -1,
};
const SortToNextStep = {
  [SortType.UP]: "-1",
  [SortType.DOWN]: "1",
};

const Table = ({ dataSource, columns, isLoading }) => {
  const initialValue = useMemo(() => cloneDeep(dataSource.items), [dataSource]);
  const [data, setData] = useState();
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

  useEffect(() => {
    console.log("data: ", initialValue);
    if (initialValue && initialValue.length) {
      setData(initialValue);
    }
  }, [initialValue]);

  const sortData = (type, columnName) => (a, b) => {
    return a[columnName] > b[columnName] ? type : type * -1;
  };

  const filterData = (evt) => {
    console.log("columnName", evt.target.name);
    console.log("query", evt.target.value);
    if (!evt.target.value) {
      return setData(initialValue);
    }
    const filterData = initialValue.filter((item) => {
      return `${item[evt.target.name]}`.startsWith(
        evt.target.value.toLowerCase()
      );
    });

    return setData(filterData);
  };

  const getElements = useCallback(() => {
    const { type, columnName } = sort;
    if (isLoading) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    }

    if (data && data.length) {
      return data
        .sort(sortData(type, columnName))
        .map((pokemon) => <TableRow key={pokemon.id} pokemon={pokemon} />);
    }
  }, [data, isLoading, sort]);

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
                      filterHandler={filterData}
                    />
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{getElements()}</tbody>
      </table>
      <Pagination total={dataSource.total} />
    </div>
  );
};

export { Table };
