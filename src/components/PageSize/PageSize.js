import React from "react";
import "./PageSize.css";

const PageSize = ({children}) => {
    const onSizeChange = (evt) => {
        children(evt.target.value)
    }
  return (
    <div>
      <label className="select" htmlFor="slct">
        <select defaultValue="Page Size" onChange={onSizeChange} id="slct" required="required">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        <svg>
          <use xlinkHref="#select-arrow-down"></use>
        </svg>
      </label>
      <svg className="sprites">
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1"></polyline>
        </symbol>
      </svg>
    </div>
  );
};

export { PageSize };
