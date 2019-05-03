import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import courseRouter from './routes/courses';
import scorecardRouter from './routes/scorecard';

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/courses', courseRouter);
app.use('/scorecard', scorecardRouter);

export default app;
