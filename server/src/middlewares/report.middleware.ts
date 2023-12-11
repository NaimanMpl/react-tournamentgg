import { NextFunction, Request, Response } from 'express';
import { ReportController } from '../controllers/report.controller';
import { Report, ReportModel } from '../interfaces/report.interface';

class ReportMiddleware {

    public getReport = async (req: Request, res: Response, next: NextFunction) => {

        const controller: ReportController = new ReportController();
        try {
            const report: Report = await controller.findReport(req.method === 'GET' || req.method === 'DELETE' ? req.params.id : req.body.id);

            if (report === null) {
                res.status(400).json({ error: "Aucune plainte n'a été trouvée avec cet identifiant" });
                return;
            }

            req.report = report;
            next();

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Le serveur a rencontré un problème." });
        }

    }

    public verifyStatus = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const status: number = parseInt(req.body.status);
    
            if (![1, 2, 3].includes(status)) {
                return res.status(400).json({ error: 'Le format du statut est inconnu ! '});
            }

            next();
        } catch (error) {
            res.status(400).json({ error: 'Le format du statut est inconnu ! '});
        }
    }

    public verifyModel = async (req: Request, res: Response, next: NextFunction) => {
        const reportModel = req.body as ReportModel;

        if (!reportModel.reason) {
            res.status(400).json({ error: "Veuillez renseigner une raison !" });
            return;
        }

        if (!reportModel.date) {
            res.status(400).json({ error: "Veuillez renseigner une date !" });
            return;
        }

        if (!reportModel.description) {
            res.status(400).json({ error: "Veuillez renseigner une description !" });
            return;
        }

        if (!reportModel.match) {
            res.status(400).json({ error: "Veuillez renseigner un match !" });
            return;
        } 
    
        if (!reportModel.player) {
            res.status(400).json({ error: "Veuillez renseigner un joueur !" });
            return;
        }

        next();
    }

}

export default new ReportMiddleware();