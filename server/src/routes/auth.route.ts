import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthMiddleware from '../middlewares/auth.middleware';

dotenv.config();

const router = express.Router();

router.get('/refresh', (req: Request, res: Response) => {

    if (!req.cookies.refreshToken) {
        res.status(401).json({ error: "Token invalide." });
        return;
    }

    try {
        const refreshToken = req.cookies.refreshToken;
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        const accessToken = jwt.sign(decoded, process.env.JWT_SECRET_KEY);

        res.cookie('accessToken', accessToken, { httpOnly: true });

        res.status(200).json({ accessToken: accessToken });
    } catch (error) {
        console.log(error)
        res.status(403).json({ error: "Token expiré." });
    }
});

router.post('/login', AuthMiddleware.limitLogin, AuthMiddleware.handleLogin, (req: Request, res: Response) => {
    const accessToken = req.accessToken;
    const refreshToken = req.refreshToken;

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return res.status(200).json({ accessToken });
});

router.post('/logout', (req: Request, res: Response) => {

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.status(301).redirect('/');
});

export default router;