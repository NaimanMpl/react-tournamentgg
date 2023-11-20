import { Pool, QueryResult } from "pg";
import { Database } from "../models/database.model";
import { Event } from "../models/event.model";
import { Game } from "../models/game.model";

export class EventController {

    public getEvent = async (id: string): Promise<Event> | null => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query: string = `
            SELECT evenement.id_evenement, date_debut, date_fin, evenement.id_jeu, nom_jeu, categorie, description_jeu, date_parution, plateforme, nom_evenement, description, COUNT(evenement.id_evenement) FROM evenement
            JOIN participation_SE ON evenement.id_evenement=$1
            JOIN jeu ON evenement.id_jeu=jeu.id_jeu
            WHERE evenement.id_evenement=$1
            GROUP BY (evenement.id_evenement, jeu.id_jeu);
        `;
        const result: QueryResult = await pool.query(query, [ id ]);

        if (result.rowCount === 0) {
            return null;
        }
        
        const row = result.rows[0];
        const event = new Event(
            row.id_evenement,
            row.nom_evenement,
            row.description,
            new Date(row.date_debut),
            new Date(row.date_fin),
            row.count,
            new Game(
                row.id_jeu,
                row.nom_jeu,
                row.categorie,
                row.description_jeu,
                new Date(row.date_parution),
                row.plateforme
            )
        );

        return event;
    }

    public getAllEvents = async () => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query: string = `
            SELECT evenement.id_evenement, date_debut, date_fin, evenement.id_jeu, nom_jeu, categorie, description_jeu, date_parution, plateforme, nom_evenement, description, COUNT(evenement.id_evenement)
            FROM evenement
            JOIN participation_SE ON evenement.id_evenement=participation_SE.id_evenement
            JOIN jeu ON evenement.id_jeu=jeu.id_jeu
            GROUP BY (evenement.id_evenement, jeu.id_jeu);
        `;
        const result: QueryResult = await pool.query(query);

        const events = [];

        for (const row of result.rows) {
            const event = new Event(
                row.id_evenement,
                row.nom_evenement,
                row.description,
                new Date(row.date_debut),
                new Date(row.date_fin),
                row.count,
                new Game(
                    row.id_jeu,
                    row.nom_jeu,
                    row.categorie,
                    row.description_jeu,
                    new Date(row.date_parution),
                    row.plateforme
                )
            );

            events.push(event.toArray());
        }

        return new Promise(resolve => resolve(events));
    }

}