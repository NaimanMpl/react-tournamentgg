import { NextFunction, Request, Response } from 'express';
import { ReportController } from '../controllers/report.controller';
import { Report } from '../interfaces/report.interface';

class ReportMiddleware {

    public getReport = async (req: Request, res: Response, next: NextFunction) => {

        const controller: ReportController = new ReportController();
        try {
            const report: Report = await controller.findReport(req.method === 'GET' ? req.params.id : req.body.id);

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

}

export default new ReportMiddleware();