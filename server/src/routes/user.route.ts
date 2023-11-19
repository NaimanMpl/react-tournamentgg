import express, { Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import { UserAlreadyExistsError } from '../errors/user.error';
import { RegisterationRequest, UserCredentials } from '../interfaces/user.interface';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', AuthMiddleware.handleRegister, async (req: Request, res: Response) => {
    const user = req.body as RegisterationRequest;
    const controller: UserController = new UserController();
    
    try {
        await controller.createUser({ id: 0, ...user });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Le serveur a rencontré un problème, veuillez réessayer plus tard." });
    }
    
    return res.status(200).json({ login: user.login, email: user.email, success: true });
});

router.post('/login', AuthMiddleware.handleLogin, async (req: Request, res: Response) => {

    const token = req.token;

    res.cookie('token', token);

    return res.status(301).redirect('/');
});

router.get('/by-email', async (req: Request, res: Response) => {

    const email = req.query.email as string;

    
    if (!email || !AuthMiddleware.validateEmail(email)) {
        return res.status(200).json({ users: [] });
    }
    
    const controller: UserController = new UserController();
    const users = await controller.findUserByEmail(email);

    return res.status(200).json({ users: users });

});

router.get('/by-login', async (req: Request, res: Response) => {

    const login = req.query.login as string;

    
    if (!login || login.length < 2) {
        return res.status(200).json({ users: [] });
    }
    
    const controller: UserController = new UserController();
    const users = await controller.findUserByLogin(login);

    return res.status(200).json({ users: users });

});

export default router;