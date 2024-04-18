import * as express from 'express';
import { rtdataController, averagesController } from '../controllers/socket.controller';

const router = express.Router();

router.get('/rtdata', rtdataController.handleRequest);
router.get('/averages', averagesController.handleRequest);

export default router;
