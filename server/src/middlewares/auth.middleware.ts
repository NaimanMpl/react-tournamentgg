import { NextFunction, Request, Response } from "express";
import User, { RegisterationRequest } from "../interfaces/user.interface";

class AuthMiddleware {

    private validateEmail = (email: string) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return emailRegex.test(email);
    }

    private validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return password.length >= 8 && passwordRegex.test(password);
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
}

export default new AuthMiddleware();