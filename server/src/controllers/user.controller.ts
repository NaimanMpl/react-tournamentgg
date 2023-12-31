import bcrypt from 'bcrypt';
import { Pool, QueryResult } from "pg";
import { UserAlreadyExistsError } from '../errors/user.error';
import { Report } from '../interfaces/report.interface';
import User, { UserCredentials } from "../interfaces/user.interface";
import { Database } from "../models/database.model";

export default class UserController {

    public createUser = async (user: User) => {
        const database: Database = new Database();
        database.connect();

        const pool: Pool = database.getConnection();
        const query = "INSERT INTO participant(login, password, email) VALUES ($1, $2, $3)";
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);

        try {
            await pool.query(query, [ user.login, hashedPassword, user.email.toLowerCase()]);
        } catch (error) {
            console.log(error)
            if (error.code !== "23505") throw error;

            if (error.constraint === "participant_login_key") {
                throw new UserAlreadyExistsError(`Un utilisateur avec le nom d'utilisatuer ${user.login} existe déjà !`);
            }
            
            throw new UserAlreadyExistsError(`Un utilisateur avec l'adresse email ${user.email} existe déjà !`);
        }
    }

    public findUniqueUserByLoginPassword = async (login: string, password: string): Promise<User> => {
        const database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "SELECT * FROM participant JOIN joueur ON joueur.id_joueur=participant.id_participant WHERE login=$1";
        try {
            const result: QueryResult = await pool.query(query, [ login ]);
            if (result.rowCount == 0) {
                return null;
            }
            const user = result.rows[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return null;
            }
            return new Promise(resolve => {
                resolve({ 
                    id: user.id_participant,
                    login: user.login, 
                    email: user.email,
                    wins: user.points,
                    looses: user.looses,
                    password: null,
                    points: user.points,
                    admin: user.admin,
                });
            });
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    public findUserByEmail = async (email: string) => {
        const database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = `SELECT id_participant, email, login FROM participant WHERE email=$1`;
        try {
            const result: QueryResult = await pool.query(query, [ email.toLowerCase() ]);

            const users = [];

            for (const user of result.rows) {
                users.push({
                    id: user.id_participant,
                    email: user.email,
                    login: user.login
                });
            }

            return new Promise(resolve => { resolve(users); });
        } catch (err) {
            return new Promise(resolve => { resolve([]); });
        }
    }

    public findUserByLogin = async (login: string) => {
        const database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = `SELECT id_participant, email, login FROM participant WHERE login=$1`;
        try {
            const result: QueryResult = await pool.query(query, [ login ]);

            const users = [];

            for (const user of result.rows) {
                users.push({
                    id: user.id_participant,
                    email: user.email,
                    login: user.login
                });
            }

            return new Promise(resolve => { resolve(users); });
        } catch (err) {
            console.log(err);
            return new Promise(resolve => { resolve([]); });
        }
    }

    public findUserById = async (id: string): Promise<User> => {
        try {
            const database: Database = new Database();
            database.connect();
            const pool: Pool = database.getConnection();
            const query = "SELECT * FROM participant WHERE id_participant=$1";
            const result: QueryResult = await pool.query(query, [ id ]);

            if (result.rowCount === 0) return null;

            const user = {
                id: result.rows[0].id_participant,
                login: result.rows[0].login,
                email: result.rows[0].email,
                profilePicture: result.rows[0].profile_picture,
                admin: result.rows[0].admin
            } as User;

            return new Promise(resolve => resolve(user));
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public getEventsOfUser = async (userId: string): Promise<string[]> => {
        const db: Database = new Database();
        db.connect();
        const pool: Pool = db.getConnection();
        const query = "SELECT id_evenement FROM participation_SE WHERE id_participant=$1";
        const result: QueryResult = await pool.query(query, [ userId ]);

        const eventsIds: string[] = [];

        for (const row of result.rows) {
            eventsIds.push(row.id_evenement);
        }

        return new Promise(resolve => resolve(eventsIds));
    }

    public getAllUsers = async (): Promise<User[]> => {
        const database: Database = new Database();
        try {
            database.connect();
            const pool: Pool = database.getConnection();
            const query = "SELECT * FROM participant JOIN joueur ON participant.id_participant=joueur.id_joueur";
            const result: QueryResult = await pool.query(query);

            const users: User[] = [];

            for (const row of result.rows) {
                users.push({
                    id: row.id_joueur,
                    email: row.email,
                    login: row.login,
                    looses: row.looses,
                    wins: row.wins,
                    admin: row.admin,
                    points: row.points,
                    profilePicture: row.profile_picture === null ? null : row.profile_picture.toString('base64')
                });
            }

            return new Promise(resolve => resolve(users));
        } catch (error) {
            return new Promise(resolve => resolve([]));
        }
    }

    public getReportsOfUser = async (userId: string): Promise<Report[]> => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "SELECT * FROM plainte JOIN participant ON plainte.id_joueur=participant.id_participant WHERE id_joueur=$1";
        const result: QueryResult = await pool.query(query, [ userId ]);

        const reports: Report[] = [];

        for (const row of result.rows) {
            reports.push({
                id: row.id_plainte,
                date: new Date(row.date_plainte),
                description: row.description_plainte,
                reason: row.raison,
                status: row.status,
                matchId: row.id_match,
                userId: row.id_joueur,
                userLogin: row.login,
                userEmail: row.email,
                userProfilePicture: row.profile_picture === null ? null : row.profile_picture.toString('base64')
            });
        }
        
        return new Promise(resolve => resolve(reports));
    }

    public getProfilePicture = async (userId: string): Promise<string> => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "SELECT profile_picture FROM participant WHERE id_participant=$1";
        const result: QueryResult = await pool.query(query, [ userId ]);

        const profilePicture = result.rows[0].profile_picture;

        if (profilePicture === null) {
            return new Promise(resolve => resolve(null));
        }

        return new Promise(resolve => resolve(profilePicture.toString('base64')))
    }

    public deleteUser = async (userId: string) => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "DELETE FROM user WHERE id_partci"
    }

    public updateProfilePicture = async (userId: string, profilePicture: Buffer) => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "UPDATE participant SET profile_picture=$1 WHERE id_participant=$2";
        await pool.query(query, [ profilePicture, userId ]);
    }

    public updateAccountStatus = async (id: string, status: number): Promise<string> => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = 'UPDATE participant SET admin=$1 WHERE id_participant=$2';
        
        await pool.query(query, [ status === 2 ? true : false, id ]);

        return new Promise(resolve => resolve(status === 2 ? 'Administrateur' : 'Joueur'));
    }
};