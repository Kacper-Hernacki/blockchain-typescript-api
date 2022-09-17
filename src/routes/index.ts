import express from 'express';
import controller from '../controllers/index';

const router = express.Router();

router.get('/check', controller.serverHealthCheck);

export = router;
