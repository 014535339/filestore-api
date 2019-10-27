
/**
 * filemgmt system implementation
 *
 * @author Praveen Kumar Thakur
 */

'use strict';

//Globals
var Version = "1.0";

//Imports
const logger = require('./utils/Logger');
const Constants = require('./commons/Constants');
const fs = require('fs');
var path = require('path');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const config = require('./config/config.json');

var server;

    //HTTPS end point
// var certKey = fs.readFileSync(path.join(__dirname, config.certificateKeyFile), 'utf8');
// var cert = fs.readFileSync(path.join(__dirname, config.certificateFile), 'utf8');
var options = {};
// if (config.clientCertificateFile) {
//     var caCertBundle = fs.readFileSync(path.join(__dirname, config.caCertificateFile), 'utf8');
//     var certChain = cert.concat(caCertBundle);
//     clientCert = fs.readFileSync(path.join(__dirname, config.clientCertificateFile), 'utf8');
//     options = {
//         key: certKey,
//         cert: certChain,
//         ca: clientCert, 
//         requestCert: true,
//         rejectUnauthorized: false
//     };
// }
// else {
//     options = {
//         key: certKey,
//         cert: cert
//     };
// }

if (!fs.existsSync(Constants.LOGSDIR)) {
    fs.mkdirSync(Constants.LOGSDIR);
}

logger.info("creating express project");
var app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
 
app.use(bodyParser.json({
    limit: Constants.REQUESTENTITYSIZE
})); // Use higher limits
app.use(bodyParser.urlencoded({
    limit: Constants.REQUESTENTITYSIZE,
    extended: true
}));

// set the base uri
app.set('baseUrl', Constants.FILEMGMT_SYSTEM_BASE_CONTEXT);

 logger.info("setting routes");

 const routes = require('./routes');
 // Setup routes
 app.use(Constants.FILEMGMT_SYSTEM_BASE_CONTEXT, routes);
 
 
logger.info("setting verion API");

logger.info("starting server");
server = http.createServer(options, app).listen(Constants.APPLICATION_PORT, function(err) {
    if (err) {
        logger.error("filemgmt system: Startup error: %s", err);
    }
    else {
        var port = server.address().port;
        logger.info("filemgmt-system: filemgmt-system REST End Point available at http://%s:%s/", 'localhost', port);
    }
});

logger.info("Application instantiation complete");
console.log("Application instantiation complete");

module.exports = server;