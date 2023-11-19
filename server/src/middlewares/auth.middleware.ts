import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UserController from "../controllers/user.controller";
import User, { RegisterationRequest, UserCredentials } from "../interfaces/user.interface";

declare module 'express-serve-static-core' {
    interface Request {
      token: string
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

    private validateToken = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization'];
        if (token == null) {
            return res.status(401).json({ error: "Vous devez être authentifié pour accéder à cette ressource." });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.params.user = decoded.toString();
        } catch (err) {
            return res.status(401).json({"error": "Token invalide !"});
        }
        next();
    }

    public handleRegister = (req: Request, res: Response, next: NextFunction) => {
        const userData = req.body as RegisterationRequest;

        if (!userData.login) {
            return res.status(400).json({ error: "Veuillez renseigner un login !" });
        }

        if (!userData.email) {
            return res.status(400).json({ error: "Veuillez renseigner une adresse mail !" });
        }

        if (!userData.password) {
            return res.status(400).json({ error: "Veuillez renseigner un mot de passe !" });
        }

        if (!userData.confirmPassword) {
            return res.status(400).json({ error: "Veuillez renseigner un mot de passe de confirmation !" });
        }

        if (!this.validateEmail(userData.email)) {
            return res.status(400).json({ error: "Veuillez renseigner un email valide !" });
        }

        if (!this.validatePassword(userData.password)) {
            return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial !"});
        }

        if (userData.password !== userData.confirmPassword) {
            return res.status(400).json({ error: "Les 2 mots de passes doivent être identiques !"});
        }
        
        if (userData.login.length > 50) {
            return res.status(400).json({ error: "Le login ne peut dépasser 50 caractères !" });
        }

        next();
    }

    public handleLogin = async (req: Request, res: Response, next: NextFunction) => {

        const user: UserCredentials = req.body;
        
        if (!user.login || !user.password || user.login.length === 0 || user.password.length === 0) {
            return res.status(401).json({ "error" : "Identifiant ou mot de passe incorrect." });
        }

        const controller: UserController = new UserController();
        const payload = await controller.findUniqueUserByLoginPassword(user.login, user.password);
        
        if (payload === null) {
            return res.status(401).json({ error: "Identifiant ou mot de passe incorrect." });
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

        req.token = token;

        next();

    }
    
}

export default new AuthMiddleware();