import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as FilterImg } from "assets/funnel.svg";
import { Transition } from "react-transition-group";

const duration = 300;


const transitionStyles = {
  entering: { width: "100%" },
  entered: { width: "100%"},
  exiting: { width: 0 },
  exited: { width: 0, padding: 0 },
};

const inputDefaulStyle = {
    transition: `width ${duration}ms ease-in-out`,
    width: 0,
    height: `20px`
}

const inputStyle = {
  entering: { width: "50%" },
  entered: { width: "50%", padding: "0 5px" },
  exiting: { width: 0 },
  exited: { width: 0, padding: 0 },
}

const FilterIcon = () => {
  const [isFilterVisible, setFilter] = useState(false);
  const inputEl = useRef();
  const filterEl = useRef();

  useEffect(() => {
    if (isFilterVisible) {
      inputEl.current.focus();
    }
  }, [isFilterVisible]);

  const onFilterClose = (evt) => {
    evt.preventDefault();
    setFilter(false);
    
  };

  const onFilterClick = (evt) => {
        setFilter(true);
  };

  return (
    <div className={isFilterVisible ? "active-filter" : "filter"}>
      <FilterImg ref={filterEl} onClick={onFilterClick} />
      <Transition timeout={500} transitionName="filter" in={isFilterVisible}>
        {(state) => (
          <form
            style={{
              ...transitionStyles[state],
            }}
            onSubmit={onFilterClose}
            className="filter-form"
          >
            <input style={{
              ...inputDefaulStyle,
              ...inputStyle[state],
            }} ref={inputEl}
            onBlur={onFilterClose}
            />
          </form>
        )}
      </Transition>
    </div>
  );
};

export { FilterIcon };
