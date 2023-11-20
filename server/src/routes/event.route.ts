import express, { Request, Response } from 'express';
import { Pool, QueryResult } from 'pg';
import { EventController } from '../controllers/event.controller';
import EventMiddleware from '../middlewares/event.middleware';
import { Database } from '../models/database.model';
import { Event } from '../models/event.model';

const router = express.Router();

router.get('/all', async (req: Request, res: Response) => {
    try {
        const controller: EventController = new EventController();
        const events = await controller.getAllEvents();

        res.status(200).json({events: events});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Le serveur a rencontré un problème." });
    }
});

router.get('/:id', EventMiddleware.getEvent, (req: Request, res: Response) =>  {
    const event: Event = req.event;

    res.status(200).json(event.toArray());
});

router.get('/:id/register/:userId', EventMiddleware.getEvent, async (req: Request, res: Response) => {
    const event: Event = req.event;

    try {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "INSERT INTO participation_SE(id_participant, id_evenement) VALUES ($1, $2)";
        
        await pool.query(query, [req.params.userId, event.getId() ]);

        res.status(200).json({ message: "Le joueur a été inscrit avec succès !" });
    } catch (error) {
        switch (error.code) {
            case '23503':
                res.status(400).json({ error: `Le joueur ${req.params.userId} n'existe pas !` });
                break;
            case '23505':
                res.status(400).json({ error: `Le joueur ${req.params.userId} est déjà inscrit !` });
                break;
            default:
                res.status(500).json({ error: "Le serveur a rencontré un problème." });
                break;
        }
    }
});

export default router;