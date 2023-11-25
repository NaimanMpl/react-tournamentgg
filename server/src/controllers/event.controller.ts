import { Pool, QueryResult } from "pg";
import { Match } from "../interfaces/match.interface";
import User from "../interfaces/user.interface";
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

        const users = await this.getUsers(parseInt(id));
        
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
            ),
            users
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
            const users: User[] = await this.getUsers(row.id_evenement);
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
                ),
                users
            );

            events.push(event.toArray());
        }

        return new Promise(resolve => resolve(events));
    }

    public getUsers = async (eventId: number): Promise<User[]> => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = `
            SELECT participation_SE.id_participant, login, email, points, nombre_victoire AS wins, nombre_defaite AS looses
            FROM participation_SE
            JOIN participant ON participation_SE.id_participant=participant.id_participant
            JOIN joueur ON joueur.id_joueur=participant.id_participant
            WHERE id_evenement=$1
        `;
        const result: QueryResult = await pool.query(query, [ eventId ]);

        const users: User[] = [];

        for (const row of result.rows) {
            users.push({ id: row.id_participant, login: row.login, email: row.email, password: null, wins: row.wins, looses: row.looses, points: row.points });
        }

        return new Promise(resolve => resolve(users));
    }

    public registerUser = async (eventId: number, userId: number) => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "INSERT INTO participation_SE(id_participant, id_evenement) VALUES ($1, $2)";
        
        await pool.query(query, [userId, eventId ]);
    }

    public getMatchs = async (eventId: number): Promise<Match[]> => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = `
            SELECT match.id_match, match.id_jeu, jeu.nom_jeu, format, date, j1.login AS login1, j2.login AS login2, p1.result AS result1, p2.result AS result2 FROM match
            JOIN participe_jm AS p1 ON match.id_match=p1.id_match
            JOIN participe_jm AS p2 ON match.id_match=p2.id_match
            JOIN participant AS j1 ON j1.id_participant=p1.id_joueur
            JOIN participant AS j2 ON j2.id_participant=p2.id_joueur
            JOIN jeu ON match.id_jeu = jeu.id_jeu
            WHERE id_evenement=$1 AND j1.login != j2.login;
        `;

        const result: QueryResult = await pool.query(query, [ eventId ]);

        const matchs: Match[] = [];

        for (let i = 0; i < result.rowCount; i += 2) {
            const row = result.rows[i]
            matchs.push({
                id: row.id_match,
                gameId: row.id_jeu,
                gameTitle: row.nom_jeu,
                format: row.format,
                date: new Date(row.date),
                player1: row.login1,
                player2: row.login2,
                winner: row.result1 === true ? row.login1 : row.login2
            });
        }

        return new Promise(resolve => resolve(matchs));
    }

}