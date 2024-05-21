import express, { Request, Response } from 'express';
const router = express.Router();
import LOGSERVICE from '../services/logs';

router.post('/new-log', (req: any, res: Response, next: any) => {
  console.log(req.body);
  LOGSERVICE.NewLog(req, res);
});

router.get('/logs', (req: Request, res: Response) => {
  LOGSERVICE.Logs(req, res);
});

router.get('/log-view/:id', (req: Request, res: Response) => {
  LOGSERVICE.LogById(req, res);
});
router.put('/update-log', (req: Request, res: Response) => {
  LOGSERVICE.UpdateLog(req, res);
});
router.get('/del-log/:id', function (req, res) {
  LOGSERVICE.DeleteLog(req, res);
});

export default router;
