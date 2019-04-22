import app from './src/app';

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`App now listening on port number ${port}!`)
);
