import express from 'express';
import bodyParser from 'body-parser';

//get the port from the user or set the default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app = express();

//using the body parser middleware
app.use(bodyParser.json());

// app server configurations
app.listen(HTTP_PORT, () => {
    console.log(`listening on port ${HTTP_PORT}`);
});
