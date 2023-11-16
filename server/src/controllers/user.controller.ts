import bcrypt from 'bcrypt';
import { Pool, QueryResult } from "pg";
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
            console.error(error);
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
};