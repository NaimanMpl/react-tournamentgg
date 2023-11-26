import cookieParser from 'cookie-parser';
import express, { Express, Request, Response } from 'express';
import { Database } from './models/database.model';
import authRoute from './routes/auth.route';
import eventRoute from './routes/event.route';
import reportRoute from './routes/report.route';
import userRoute from './routes/user.route';

const app: Express = express();

app.use(cookieParser());
app.use(express.json());

app.use('/user', userRoute);
app.use('/event', eventRoute);
app.use('/auth', authRoute);
app.use('/report', reportRoute);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})