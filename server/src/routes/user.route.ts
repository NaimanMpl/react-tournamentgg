import express, { Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import { RegisterationRequest, UserCredentials } from '../interfaces/user.interface';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', AuthMiddleware.handleRegister, async (req: Request, res: Response) => {
    const user = req.body as RegisterationRequest;
    const controller: UserController = new UserController();
    await controller.createUser({id: 0, ...user});
    return res.status(200).json({ login: user.login, email: user.email, success: true });
});

router.post('/login', AuthMiddleware.handleLogin, async (req: Request, res: Response) => {

    const token = req.token;

    res.cookie('token', token);

    return res.status(301).redirect('/');
});

export default router;