import React, { useEffect, useCallback, useState } from "react";
import "./App.css";
import { usePokemonApi } from "./hooks/data-fetch";
import { TableRow, FilterIcon } from "components";
// import {ReactComponent as FilterIcon} from "./assets/funnel.svg"
const SortType = {
  UP: 1,
  DOWN: -1,
};
const SortToNextStep = {
  [SortType.UP]: "-1",
  [SortType.DOWN]: "1",
};

function App() {
  const [data, isLoading, isError] = usePokemonApi();
  const [sort, setSort] = useState({
    columnName: null,
    type: 0,
  });

  const onSortChange = (evt) => {
    console.log(evt.target.id);
    const name = evt.target.id;
    const { type } = sort;
    setSort({
      columnName: name,
      type: type ? SortToNextStep[type] : SortType.UP,
    });
  };

  useEffect(() => {
    console.log("data: ", data);
    console.log("isLoading: ", isLoading);
    console.log("isError: ", isError);
  }, [data, isLoading, isError]);

  const sortData = (type, columnName) => (a, b) => {
    if (columnName !== "name") {
      return a.stats[columnName] > b.stats[columnName] ? type : type * -1;
    }
    return a[columnName] > b[columnName] ? type : type * -1;
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
    if (isError) {
      return (
        <tr>
          <td>{isError}</td>
        </tr>
      );
    }
    if (data) {
      return data.pokemons
        .sort(sortData(type, columnName))
        .map((pokemon) => <TableRow key={pokemon.id} pokemon={pokemon} />);
    }
  }, [data, isLoading, isError, sort]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr onClick={onSortChange}>
            <th></th>
            <th id="name">Name <FilterIcon /></th>
            <th id="attack">Attack <FilterIcon /></th>
            <th id="defense">Defense <FilterIcon /></th>
            <th id="hp">Hp <FilterIcon /></th>
            <th id="speed">Speed <FilterIcon /></th>
          </tr>
        </thead>
        <tbody>{getElements()}</tbody>
      </table>
    </div>
  );
}

export default App;
