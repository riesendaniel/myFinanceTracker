const compare = (a, b, key, order) => {
  const orderValue = b[key].localeCompare(a[key]);
  return order === 'desc' ? orderValue : -orderValue;
};

const stableSort = (array, key, order) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const orderValue = compare(a[0], b[0], key, order);
    if (orderValue !== 0) return orderValue;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export default stableSort;
