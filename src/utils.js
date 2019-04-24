export const getNineHoleData = table => {
  const nineHoleData = {};
  let teeName = '';

  table
    .find('tr')
    .not(':first-child')
    .each((i, element) => {
      const rowName = element.children[1].children[0].data.trim();

      if (rowName.includes('Tee')) {
        teeName = rowName;
        nineHoleData[teeName] = {};
        // ...
      } else if (rowName === 'Par') {
        // ...
      } else if (rowName === 'S.I.') {
        // ...
      }
    });

  return nineHoleData;
};
