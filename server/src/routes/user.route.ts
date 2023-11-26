import express, { Request, Response } from 'express';
import { EventController } from '../controllers/event.controller';
import UserController from '../controllers/user.controller';
import { UserAlreadyExistsError } from '../errors/user.error';
import { Report } from '../interfaces/report.interface';
import User, { RegisterationRequest, UserCredentials } from '../interfaces/user.interface';
import AuthMiddleware from '../middlewares/auth.middleware';
import EventMiddleware from '../middlewares/event.middleware';
import UserMiddleware from '../middlewares/user.middleware';
import { Event } from '../models/event.model';

const router = express.Router();

router.post('/register', AuthMiddleware.handleRegister, async (req: Request, res: Response) => {
    const user = req.body as RegisterationRequest;
    const controller: UserController = new UserController();
    
    try {
        await controller.createUser({ id: undefined, ...user, wins: 0, looses: 0, points: 0, admin: false });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Le serveur a rencontré un problème, veuillez réessayer plus tard." });
    }
    
    return res.status(200).json({ login: user.login, email: user.email, success: true });
});

router.post('/update/profilepicture', UserMiddleware.getUser, UserMiddleware.verifyImage, async (req: Request, res: Response) => {
    const user = req.user;
    try {
        const imageBuffer = Buffer.from(req.body.image, 'base64');

        const controller: UserController = new UserController();
        controller.updateProfilePicture(user.id, imageBuffer);

        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Erreur lors de la lecture de l'image"});
    }
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

router.get('/', AuthMiddleware.validateToken, async (req: Request, res: Response) => {
    const user: User = req.user;
    const userController = new UserController();
    const eventsIds = await userController.getEventsOfUser(user.id);
    const profilePicture = await userController.getProfilePicture(user.id);

    res.status(200).json({ ...user, events: eventsIds, profilePicture: profilePicture});
});

router.get('/:id/events', UserMiddleware.authUser,  async (req: Request, res: Response) => {
    const user: User = req.user;

    const userController = new UserController();
    const events = await userController.getEventsOfUser(user.id);

    res.status(200).json(events);

});

router.get('/join/:id', AuthMiddleware.validateToken, EventMiddleware.getEvent, async (req: Request, res: Response) => {

    const event: Event = req.event;
    const user: User = req.user;

    const controller: EventController = new EventController();
    try {
        await controller.registerUser(event.getId(), user.id);
        res.status(200).json({ message: "Inscription finalisée avec succès !", success: true});
    } catch (error) {
        switch (error.code) {
            case '23503':
                res.status(404).json({ error: `Le joueur ${user.login} n'existe pas !` });
                break;
            case '23505':
                res.status(400).json({ error: `Le joueur ${user.login} (${user.id}) est déjà inscrit !` });
                break;
            default:
                res.status(500).json({ error: "Le serveur a rencontré un problème." });
                break;
        }
    }
});

router.get('/all', async (req: Request, res: Response) => {
    const controller = new UserController();
    try {
        const users = await controller.getAllUsers();
        res.status(200).json({users: users});
    } catch (error) {
        res.status(500).json({ error: "Le serveur a rencontré un problème.", users: []})
    }
});

router.get('/:id/reports', UserMiddleware.getUser, async (req: Request, res: Response) => {
    const user: User = req.user;
    const controller: UserController = new UserController();

    try {
        const reports: Report[] = await controller.getReportsOfUser(user.id);

        res.status(200).json({reports: reports});
    } catch (error) {
        res.status(500).json({ error: "Le serveur a rencontré un problème.", reports: [] });
    }

});

router.delete('/:id', UserMiddleware.getUser, async (req: Request, res: Response) => {
    const user: User = req.user;
    const controller: UserController = new UserController();

});

export default router;