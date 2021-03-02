import React from "react";

const TableRow = React.memo(function TableRow({ pokemon }) {
  const { img, name, stats: {attack, defense, hp, speed} } = pokemon;
  return (
      <tr>
        <td>
          <img width="50" height="50" src={img} alt={`pokemon ${name}`} />
        </td>
        <td className="pokemon-name">{name}</td>
        <td>{attack}</td>
        <td>{defense}</td>
        <td>{hp}</td>
        <td>{speed}</td>
      </tr>
  );
})

export { TableRow };
