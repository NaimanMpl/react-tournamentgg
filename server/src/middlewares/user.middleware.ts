import { NextFunction, Request, Response } from "express";
import UserController from "../controllers/user.controller";
import User from "../interfaces/user.interface";

class UserMiddleware {

    public authUser = async (req: Request, res: Response, next: NextFunction) => {
        const userController = new UserController();
        const user: User = await userController.findUserById(parseInt(req.params.id));

        if (user === null) {
            res.status(404).json({ error: `Aucun utilisateur avec l'identifiant ${req.params.id} n'existe.`});
            return;
        }

        req.user = user;
        next();
    }

}

export default new UserMiddleware();