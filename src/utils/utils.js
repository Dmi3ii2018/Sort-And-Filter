export const sortData = (type, columnName) => (a, b) => {
    return a[columnName] > b[columnName] ? type : type * -1;
  };

export const filterData = (setData, initialValue) => (evt) => {
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