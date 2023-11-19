import bcrypt from 'bcrypt';
import { Pool, QueryResult } from "pg";
import { UserAlreadyExistsError } from '../errors/user.error';
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
            await pool.query(query, [ user.login, hashedPassword, user.email]);
        } catch (error) {

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
        const query = "SELECT * FROM participant WHERE login=$1";
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
                    password: null
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
            const result: QueryResult = await pool.query(query, [ email ]);

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
};