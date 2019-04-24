import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import courseRouter from './routes/courses';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/courses', courseRouter);

export default app;
