import { Pool, QueryResult } from "pg";
import { Database } from "../models/database.model";
import { Event } from "../models/event.model";

export class EventController {

    public getEvent = async (id: string): Promise<Event> | null => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query: string = "SELECT * FROM evenement WHERE id_evenement=$1";
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
            new Date(row.date_fin)
        );
        
        return new Promise(resolve => resolve(event));
    }

    public getAllEvents = async () => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query: string = "SELECT * FROM evenement";
        const result: QueryResult = await pool.query(query);

        const events = [];

        for (const row of result.rows) {
            const event = new Event(
                row.id_evenement,
                row.nom_evenement,
                row.description,
                new Date(row.date_debut),
                new Date(row.date_fin)
            );

            events.push(event.toArray());
        }

        return new Promise(resolve => resolve(events));
    }

}