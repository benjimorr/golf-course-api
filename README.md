# Golf Course API

This is a repository for an API that fetches scorecard data for golf courses. You can search for golf courses by U.S. city/town and then request the scorecard for a particular course.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You'll need the following to run this app locally:

1. [Git](https://git-scm.com/)

- For instructions on installing Git, [go here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

2. [Node.js](https://nodejs.org/en/)

- You can install Node.js on the [homepage](https://nodejs.org/en/)

### Installing

Run the following commands in your terminal to install & use the Golf Course API on `localhost:8080`:

1. `git clone https://github.com/benjimorr/golf-course-api.git`
2. `cd golf-course-api`
3. `npm install`
4. `npm run dev`

Use an app such as [Postman](https://www.getpostman.com/downloads/) to send HTTP requests to `localhost:8080`. See the possible endpoints below.

### API Endpoints

There are two endpoints to this API: `/courses`, and `/scorecard`.

#### `/courses`

Takes a U.S. city and state as query parameters and returns a list of golf courses in and around that city.

**Query Parameters**:

- `city` - String - the name of a city or town
- `state` - String - the two-letter state abbreviation

**Example Request**:

`GET localhost:8080/courses?city=Austin&state=TX`

**Example Response**:

```json
{
    "courseCount": 25,
    "courses": [
        {
            "courseId": "11432",
            "courseLink": "/courses/United-States/TX/Austin/Balcones-Country-Club---Spicewood-Course-/11432",
            "courseName": "Balcones Country Club  (Spicewood Course)",
            "courseCity": "Austin, TX"
        },
        {
            "courseId": "11460",
            "courseLink": "/courses/United-States/TX/Austin/Lost-Creek-Country-Club/11460",
            "courseName": "Lost Creek Country Club",
            "courseCity": "Austin, TX"
        },
        {
            "courseId": "12310",
            "courseLink": "/courses/United-States/TX/Austin/Falconhead-Golf-Club/12310",
            "courseName": "Falconhead Golf Club",
            "courseCity": "Austin, TX"
        },
        ...
    ]
}
```

#### `/scorecard`

Takes a `courseLink` that's obtained from the `/courses` endpoint and returns the scorecard data for that golf course.

**Query Parameters**:

- `link` - String - the relative link to the golf course

**Example Request**:

`GET localhost:8080/scorecard?link=/courses/United-States/TX/Austin/Balcones-Country-Club---Spicewood-Course-/11432`

**Example Response**:

```json
{
  "courseName": "Balcones Country Club  (Spicewood Course)",
  "address": " 11210 Spicewood Club Drive, Austin, TX, United States",
  "frontNine": {
    "Pro Tee": {
      "slope": "120",
      "rating": "71.8",
      "yardage": [
        "426",
        "190",
        "397",
        "474",
        "393",
        "412",
        "405",
        "157",
        "488"
      ],
      "par": ["4", "3", "4", "5", "4", "4", "4", "3", "5"],
      "handicap": ["11", "15", "1", "9", "3", "7", "13", "17", "5"]
    },
    ...
  },
  "backNine": {
    "Pro Tee": {
      "slope": "120",
      "rating": "71.8",
      "yardage": [
        "334",
        "568",
        "203",
        "377",
        "476",
        "177",
        "355",
        "353",
        "390"
      ],
      "par": ["4", "5", "3", "4", "5", "3", "4", "4", "4"],
      "handicap": ["18", "2", "6", "8", "10", "12", "4", "16", "14"]
    },
    ...
  }
}
```

## Deployment

If you wish to deploy this application, you can follow these steps to host it on Heroku:

1. Install the Heroku CLI [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
2. Create an app on Heroku

```bash
heroku login
heroku apps:create golf-course-api
```

3. Set npm production config to false to allow babel to work properly

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false
```

4. Check your git remotes to ensure heroku is there

```bash
git remote -v

// The output should look like this
heroku https://git.heroku.com/golf-course-api.git (fetch)
heroku https://git.heroku.com/golf-course-api.git (push)
```

5. Deploy the app

```bash
git push heroku master
```

## Built With

- [Express 4.16](https://expressjs.com/en/4x/api.html)
- [Cheerio 1.0](https://cheerio.js.org/)
- [Request Promise 4.2](https://github.com/request/request-promise#readme)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
