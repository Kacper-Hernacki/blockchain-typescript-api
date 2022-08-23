import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import routes from './routes';

const NAMESPACE = 'Server';

//create a new app
const app = express();

//use cors middleware
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT']
    })
);

//logging the request
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`);

    res.on(`finish`, () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

// parse the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rules of API
app.use((req, res, next) => {
    // remove in production
    res.header('Access-Control-Allow-Origin', '*');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// Routes
app.use('/api', routes);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
