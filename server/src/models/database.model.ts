import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

export class Database {

    private host: string;
    private database: string;
    private user: string;
    private password: string;
    private port: number;
    private connection: Pool;

    constructor() {
        this.host = process.env.DB_HOST;
        this.database = process.env.DB_NAME;
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
        this.port = +process.env.DB_PORT;
    }

    connect() {
        const pool = new Pool({
            user: this.user,
            host: this.host,
            database: this.database,
            password: this.password,
            port: this.port
        });
        this.connection = pool;
    }

    getConnection(): Pool {
        return this.connection;
    }
}