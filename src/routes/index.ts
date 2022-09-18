import express from 'express';
import controller from '../controllers/index';

const router = express.Router();

router.get('/check', controller.serverHealthCheck);
router.get('/blocks', controller.blocksStatus);
router.post('/mine', controller.mineBlock);

export = router;
