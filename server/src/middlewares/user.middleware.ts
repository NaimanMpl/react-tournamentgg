import { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user.controller";
import User from "../interfaces/user.interface";

class UserMiddleware {

    public authUser = async (req: Request, res: Response, next: NextFunction) => {
        const userController = new UserController();
        const user: User = await userController.findUserById(req.params.id);

        if (user === null) {
            res.status(404).json({ error: `Aucun utilisateur avec l'identifiant ${req.params.id} n'existe.`});
            return;
        }

        req.user = user;
        next();
    }

    public getUser = async (req: Request, res: Response, next: NextFunction) => {
        const userController = new UserController();
        const user: User = await userController.findUserById(req.method === 'GET' ? req.params.id : req.body.id);

        if (user === null) {
            res.status(400).json({ error: "Aucun utilisateur avec cet identifiant existe ! "});
            return;
        }

        req.user = user;
        next();
        
    }

    public getUserByLogin = async (req: Request, res: Response, next: NextFunction) => {
        const userController = new UserController();
        const user = await userController.findUserByLogin(req.method === 'GET' ? req.params.login : req.body.login) as Array<Object>;
        console.log(user);
        if (user.length === 0) {
            res.status(400).json({ error: "Aucun utilisateur avec cet identifiant existe ! "});
            return;
        }

        req.user = user[0] as User;
        next();
        
    }

    public verifyImage = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.image) {
            res.status(400).json({ error: "Veuillez renseigner une photo de profil ! "});
            return;
        }
        next();
    }

}

export default new UserMiddleware();