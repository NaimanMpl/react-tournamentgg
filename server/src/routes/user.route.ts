import express, { Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import { RegisterationRequest } from '../interfaces/user.interface';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', AuthMiddleware.handleRegister, async (req: Request, res: Response) => {
    const user = req.body as RegisterationRequest;
    const controller: UserController = new UserController();
    await controller.createUser({id: 0, ...user});
    return res.status(200).json({ login: user.login, email: user.email, success: true });
});

export default router;