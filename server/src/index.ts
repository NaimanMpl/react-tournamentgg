import express, { Express, Request, Response } from 'express';
import { Database } from './models/database.model';
import eventRoute from './routes/event.route';
import userRoute from './routes/user.route';

const app: Express = express();

app.use(express.json());

app.use('/user', userRoute);
app.use('/event', eventRoute);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})