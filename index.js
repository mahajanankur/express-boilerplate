const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const { ExpressLoggerFactory } = require("motifer");
const helmet = require("helmet");
const cors = require("cors");
const fs = require("fs");
const https = require('https');
//Controllers
const welcomeController = require("./src/controllers/welcome.controller");
// Exception Advice
const { sendExceptionResponse } = require("./src/utils/exceptionHandler");
// Auth interceptor
const { authorize } = require("./src/middleware/authInterceptor");
//Custom properties
const { port, profile } = config.get("server");

//Configure the server
const server = express();

server.use(helmet());

// Configure Motifer for logs.
let options = {
    "rotate": true,
    "filename": "boilerplate-%DATE%.log",
    "datePattern": "YYYY-MM-DD",
    "archived": true,
    "maxSize": "20m",
    "maxFiles": "14d",
}

const Logger = new ExpressLoggerFactory("boilerplate", "debug", server, options);
const logger = Logger.getLogger(__filename);

//Configure the JSON body parser for request.
server.use(bodyParser.json());
server.use(cors());

const nodeExpressServer = () => {
    let environment = profile ? profile : "development";
    logger.info(`Environment for node server is: ${environment}`);
    if (environment === "production") {
        let options = {
            key: fs.readFileSync(__dirname + '/src/static/ssl/app.key'),
            cert: fs.readFileSync(__dirname + '/src/static/ssl/bundle.crt')
        };
        https.createServer(options, server).listen(port, () => {
            logger.info(`Production node server is running on port: ${port}`);
        });
    } else {
        server.listen(port, () => {
            logger.info(`Node server is running on port: ${port}`);
        });
    }

}
// the node server startup.
nodeExpressServer();

//Register the controllers as routers.
server.use("/api/welcome", authorize("admin"), welcomeController);

//Exception Advice - Mention all routes above this.
server.use(sendExceptionResponse);