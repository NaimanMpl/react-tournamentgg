import bcrypt from 'bcrypt';
import { Pool } from "pg";
import User from "../interfaces/user.interface";
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
};