import express from 'express';
import rp from 'request-promise';
import cheerio from 'cheerio';

const router = express.Router();

/* GET list of golf courses for City + State */
router.get('/', (req, res, next) => {
  const {
    query: { city, state },
  } = req;

  rp(`${process.env.BASE_URL}/courselist/United%20States/${state}/${city}`)
    .then(html => {
      const $ = cheerio.load(html);
      const courses = $('.course-list h4[class="m-b-0"]')
        .map((i, element) => {
          const courseLink = element.parent.attribs.href;
          const courseId = courseLink.split('/').pop();
          const courseName = element.children[0].data;
          const courseCity = element.next.next.data;
          return { courseId, courseLink, courseName, courseCity };
        })
        .get();
      res.json({ courseCount: courses.length, courses });
    })
    .catch(err => {
      res.json({ error: err.message });
    });
});

export default router;
