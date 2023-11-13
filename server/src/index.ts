import express, { Express, Request, Response } from 'express';
import { Database } from './models/database.model';
import userRoute from './routes/user.route';

const app: Express = express();

app.use(express.json());

app.use('/user', userRoute);

app.listen(3000, () => {
    console.log('Server running on port 3000');
})