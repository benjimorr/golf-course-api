const returnTableRows = element => {
  const rowData = [];
  element.children().each((i, element) => {
    if (element.name === 'td' && i < 11) {
      if (element.children.length) {
        rowData.push(element.children[0].data.trim());
      }
    }
  });
  return rowData;
};

export const getNineHoleData = (tee, table) => {
  const nineHoleData = {};

  nineHoleData.yardage = returnTableRows(
    table.find(`th:contains(${tee})`).parent()
  );

  nineHoleData.par = returnTableRows(
    table
      .find(`th:contains(${tee})`)
      .parent()
      .next()
  );

  nineHoleData.handicap = returnTableRows(
    table
      .find(`th:contains(${tee})`)
      .parent()
      .next()
      .next()
  );

  return nineHoleData;
};

export const getCourseSlope = (tee, table) => {
  const teeName = table.find(`th:contains(${tee})`);
  return teeName
    .parent()
    .children()[11]
    .children[0].data.trim();
};

export const getCourseRating = (tee, table) => {
  const teeName = table.find(`th:contains(${tee})`);
  return teeName
    .parent()
    .children()[12]
    .children[0].data.trim();
};
