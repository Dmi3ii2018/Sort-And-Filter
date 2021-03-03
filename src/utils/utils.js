export const sortData = (type, columnName) => (a, b) => {
  return a[columnName] > b[columnName] ? type : type * -1;
};

const colValues = {};

export const filterData = (data, setData, initialValue) => (evt) => {
  console.log("columnName", evt.target.name);
  console.log("query", evt.target.value);
  colValues[evt.target.name] = evt.target.value;

  if (Object.values(colValues).every((it) => Boolean(it) === false)) {
    return setData(initialValue);
  }

  let filterData = evt.target.value ? [...data] : [...initialValue]

  for (let key in colValues) {
    if (colValues[key]) {
      filterData = filterData.filter((item) => {
        return `${item[key]}`.startsWith(
          colValues[key].toLowerCase()
        );
      });
    }
  }

  return setData(filterData);
};
