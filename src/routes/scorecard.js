import express from 'express';
import rp from 'request-promise';
import cheerio from 'cheerio';
import { getCourseSlope, getCourseRating, getNineHoleData } from '../utils';

const router = express.Router();

/* GET a scorecard for a given golf course */
router.get('/', (req, res, next) => {
  const {
    query: { link },
  } = req;

  const tees = {};

  rp(`${process.env.BASE_URL}${link}`)
    .then(html => {
      const $ = cheerio.load(html);
      const scoreCardSection = $('.profile-bottom-content .right-content');
      const frontNineScoreCard = scoreCardSection
        .find('.hole-set-scorecard-container')
        .first()
        .find('tbody');
      const backNineScoreCard = scoreCardSection
        .find('.hole-set-scorecard-container')
        .last()
        .find('tbody');

      const courseName = scoreCardSection.find('h1').text();

      // Loop over tee names to add them to the tees obj
      frontNineScoreCard.find('.color-row').each((i, element) => {
        const teeName = element.children[1].children[0].data.trim();
        if (!tees[teeName]) {
          tees[teeName] = {};
        }
      });

      // Loop over tees obj to add slope, rating, and hole data
      Object.keys(tees).map(key => {
        tees[key].slope = getCourseSlope(key, frontNineScoreCard);
        tees[key].rating = getCourseRating(key, frontNineScoreCard);

        // Front nine data
        tees[key].frontNine = getNineHoleData(key, frontNineScoreCard);
        // Back nine data
        tees[key].backNine = getNineHoleData(key, backNineScoreCard);

        // Total yardage
        tees[key].totalYardage =
          +tees[key].frontNine.yardage[9] + +tees[key].backNine.yardage[9];
        // Total par
        tees[key].totalPar =
          +tees[key].frontNine.par[9] + +tees[key].backNine.par[9];
      });

      res.json({ courseName, tees });
    })
    .catch(err => {
      res.json({ error: err.message });
    });
});

export default router;
