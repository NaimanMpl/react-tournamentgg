import { NextFunction, Request, Response } from "express";
import { Pool, QueryResult } from "pg";
import { EventController } from "../controllers/event.controller";
import { Database } from "../models/database.model";
import { Event } from "../models/event.model";

declare module 'express-serve-static-core' {
    interface Request {
      event: Event
    }
}

class EventMiddleware {

    public getEvent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const controller: EventController = new EventController();
            const event = await controller.getEvent(req.params.id);

            if (event === null) {
                return res.status(400).json({ error: `L'évènement ${req.params.id} n'existe pas !` })
            }

            req.event = event;

            next();
        } catch (err) {
            return res.status(500).json({ error: "Le serveur a rencontré un problème." });
        }
    }
}

export default new EventMiddleware();