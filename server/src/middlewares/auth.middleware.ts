import { NextFunction, Request, Response } from "express";
import expressLimit, { rateLimit } from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import UserController from "../controllers/user.controller";
import { Report } from "../interfaces/report.interface";
import User, { RegisterationRequest, UserCredentials } from "../interfaces/user.interface";

declare module 'express-serve-static-core' {
    interface Request {
      accessToken: string,
      refreshToken: string,
      user: User
      report: Report
    }
}

class AuthMiddleware {

    public validateEmail = (email: string) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return emailRegex.test(email);
    }

    private validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return password.length >= 8 && passwordRegex.test(password);
    }

    public validateToken = (req: Request, res: Response, next: NextFunction) => {
        let accessToken = req.cookies.accessToken;

        if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
            accessToken = req.headers['authorization'].split(' ')[1];
        }
        
        if (accessToken === undefined) {
            res.status(401).json({ error: "Vous devez être authentifié pour accéder à cette ressource." });
            return;
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
            req.user = decoded as User;
        } catch (err) {
            res.status(401).json({"error": "Token invalide !"});
            return;
        }

        next();
    }

    public handleRegister = (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body as RegisterationRequest;

        if (!userData.login) {
            res.status(400).json({ error: "Veuillez renseigner un login !" });
            return;
        }

        if (!userData.email) {
            res.status(400).json({ error: "Veuillez renseigner une adresse mail !" });
            return;
        }

        if (!userData.password) {
            res.status(400).json({ error: "Veuillez renseigner un mot de passe !" });
            return;
        }

        if (!userData.confirmPassword) {
            res.status(400).json({ error: "Veuillez renseigner un mot de passe de confirmation !" });
            return;
        }

        if (!this.validateEmail(userData.email)) {
            res.status(400).json({ error: "Veuillez renseigner un email valide !" });
            return;
        }

        if (!this.validatePassword(userData.password)) {
            res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial !"});
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            res.status(400).json({ error: "Les 2 mots de passes doivent être identiques !"});
            return;
        }
        
        if (userData.login.length > 50) {
            res.status(400).json({ error: "Le login ne peut dépasser 50 caractères !" });
            return;
        }

        next();
    }

    public handleLogin = async (req: Request, res: Response, next: NextFunction) => {

        const user: UserCredentials = req.body;
        
        if (!user.login || !user.password || user.login.length === 0 || user.password.length === 0) {
            res.status(401).json({ "error" : "Identifiant ou mot de passe incorrect." });
            return;
        }

        const controller: UserController = new UserController();
        const payload = await controller.findUniqueUserByLoginPassword(user.login, user.password);
        
        if (payload === null) {
            res.status(401).json({ error: "Identifiant ou mot de passe incorrect." });
            return;
        }

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });

        req.accessToken = accessToken;
        req.refreshToken = refreshToken;

        next();
    }

    public limitLogin = rateLimit({
        windowMs: 60 * 1000,
        max: 5,
        message: { message: 'Trop de requêtes proviennent de cette adresse IP, veuillez réessayer plus tard.'},
        handler: (req: Request, res: Response, next: NextFunction, options) => {
            res.status(429).send(options.message)
        },
        standardHeaders: true,
        legacyHeaders: false
    });
    
}

export default new AuthMiddleware();