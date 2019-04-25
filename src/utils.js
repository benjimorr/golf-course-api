const returnTableRows = element =>
  element.children
    .filter(el => el.name === 'td')
    .reduce((accm, el, i) => {
      if (i < 9) {
        if (el.children.length) {
          accm.push(el.children[0].data);
        }
      }
      return accm;
    }, []);

export const getNineHoleData = table => {
  const nineHoleData = {};
  let teeName = '';

  table
    .find('tr')
    .not(':first-child')
    .each((i, element) => {
      // Get the current row name and create a key for it in the nineHoleData obj
      const rowName = element.children[1].children[0].data.trim();

      if (rowName.includes('Tee')) {
        teeName = rowName;
        nineHoleData[teeName] = {};

        // Get the TD data from the Tee row
        const tdRows = element.children.filter(el => el.name === 'td');

        // Set the slope and rating for the tee
        nineHoleData[teeName].slope = tdRows[10].children[0].data.trim();
        nineHoleData[teeName].rating = tdRows[11].children[0].data.trim();

        // Get the TD data specific to yardage
        const yardage = tdRows.reduce((accm, el, i) => {
          if (i < 9) {
            accm.push(el.children[0].data);
          }
          return accm;
        }, []);
        // Set the yardage for the tee
        nineHoleData[teeName].yardage = yardage;
      } else if (rowName === 'Par') {
        // Get the TD data specific for par
        const par = returnTableRows(element);
        // Set the par for the tee
        nineHoleData[teeName].par = par;
      } else if (rowName === 'S.I.') {
        // Get the TD data specific for handicap
        const handicap = returnTableRows(element);
        // Set the handicap for the tee
        nineHoleData[teeName].handicap = handicap;
      }
    });

  return nineHoleData;
};
