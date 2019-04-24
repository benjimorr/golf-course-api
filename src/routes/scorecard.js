import express from 'express';
import rp from 'request-promise';
import cheerio from 'cheerio';
import { getNineHoleData } from '../utils';

const router = express.Router();

/* GET a scorecard for a given golf course */
router.get('/', (req, res, next) => {
  const {
    query: { link },
  } = req;

  rp(`http://courses.swingbyswing.com${link}`)
    .then(html => {
      const $ = cheerio.load(html);
      const scoreCardSection = $('.profile-bottom-content .right-content');
      const courseName = scoreCardSection.find('h1').text();

      const frontNine = getNineHoleData(
        scoreCardSection
          .find('.hole-set-scorecard-container')
          .first()
          .find('tbody')
      );

      const backNine = getNineHoleData(
        scoreCardSection
          .find('.hole-set-scorecard-container')
          .last()
          .find('tbody')
      );

      res.json({ courseName, frontNine, backNine });
    })
    .catch(err => {
      res.json({ error: err.message });
    });
});

export default router;
