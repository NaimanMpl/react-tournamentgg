import { Pool, QueryResult } from "pg";
import { Report, ReportModel } from "../interfaces/report.interface";
import { Database } from "../models/database.model";

export class ReportController {

    public getReports = async (): Promise<Report[]> => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "SELECT * FROM plainte JOIN participant ON plainte.id_joueur=participant.id_participant";
        const result: QueryResult = await pool.query(query);

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

    public findReport = async (id: string): Promise<Report> => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "SELECT * FROM plainte JOIN participant ON plainte.id_joueur=participant.id_participant WHERE id_plainte=$1";
        const result: QueryResult = await pool.query(query, [ id ]);

        if (result.rowCount === 0) {
            return new Promise(resolve => resolve(null));
        }

        const reportData = result.rows[0];

        return new Promise(resolve => resolve({
            id: reportData.id_plainte,
            date: new Date(reportData.date_plainte),
            description: reportData.description_plainte,
            reason: reportData.raison,
            status: reportData.status,
            matchId: reportData.id_match,
            userId: reportData.id_joueur,
            userLogin: reportData.login,
            userEmail: reportData.email,
            userProfilePicture: reportData.profile_picture === null ? null : reportData.profile_picture.toString('base64')
        }));
    }

    public deleteReport = async (id: string) => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = "DELETE FROM plainte WHERE id_plainte=$1";
        await pool.query(query, [ id ]);
    }


    public updateReportStatus = async (id: string, status: number): Promise<string> => {
        let statusText: string = "";
        switch (status) {
            case 1:
                statusText = "En cours";
                break;
            case 2:
                statusText = "Traité";
                break;
            case 3:
                statusText = "Refusé";
                break;
            default:
                throw Error('Statu de mis à jour inconnu.');
        }

        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = 'UPDATE plainte SET status=$1 WHERE id_plainte=$2';
        
        await pool.query(query, [ statusText, id ]);

        return new Promise(resolve => resolve(statusText));
    }

    public createReport = async (model: ReportModel) => {
        const database: Database = new Database();
        database.connect();
        const pool: Pool = database.getConnection();
        const query = 'INSERT INTO plainte(raison, date_plainte, description_plainte, id_match, status, id_joueur) VALUES($1, $2, $3, $4, $5, $6)';

        await pool.query(query, [ model.reason, model.date, model.description, model.match, 'En cours', model.player]);

    }
}