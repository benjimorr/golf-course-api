import express from 'express';
import rp from 'request-promise';
import $ from 'cheerio';

const router = express.Router();

/* GET list of golf courses for City + State */
router.get('/', (req, res, next) => {
  const {
    params: { city, state },
  } = req;

  const url = `http://courses.swingbyswing.com/courselist/United%20States/${state}/${city}`;

  rp(url)
    .then(html => {
      console.log($('.course-list a', html));
    })
    .catch(err => {
      console.log(err);
    });

  res.json({});
});

export default router;
