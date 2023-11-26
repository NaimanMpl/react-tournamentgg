import express, { Request, Response } from 'express';
import { ReportController } from '../controllers/report.controller';
import { Report } from '../interfaces/report.interface';
import ReportMiddleware from '../middlewares/report.middleware';

const router = express.Router();

router.get('/all', async (req: Request, res: Response) => {

    const controller: ReportController = new ReportController();
    try {
        const reports: Report[] = await controller.getReports();

        res.status(200).json({ reports: reports });
    } catch (error) {
        res.status(500).json({ error: "Le serveur a rencontré un problème.", reports: []});
    }

});

router.delete('/:id', ReportMiddleware.getReport,  async (req: Request, res: Response) => {
    const controller: ReportController = new ReportController();
    const report: Report = req.report;
    try {
        await controller.deleteReport(req.params.id);
        res.status(200).json({ message: `La plainte ${report.id} a été supprimée avec succès.` });
    } catch (error) {
        res.status(500).json({ error: `Le serveur a rencontré un problème.` });
    }
});

router.post('/status', ReportMiddleware.getReport, ReportMiddleware.verifyStatus, async (req: Request, res: Response) => {
    const { status } = req.body
    const controller: ReportController = new ReportController();
    const report: Report = req.report;
    try {
        const updatedStatus = await controller.updateReportStatus(report.id, parseInt(status));
        res.status(200).json({ status: updatedStatus, success: true });
    } catch (error) {
        res.status(500).json({ error: "Le serveur a rencontré un problème. "});
    }
});

export default router;