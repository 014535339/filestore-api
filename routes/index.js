
const express = require('express');
const app = module.exports = express();
const Constants = require('../commons/Constants');
const logger = require('../utils/Logger');

/**
 * Returns the version.
 * 
 */
app.get(Constants.FILEMGMT_SYSTEM_VERSION_CONTEXT, function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send({version: +Constants.FILEMGMT_SYSTEM_VERSION});
});

// app.all('/*',require('./middleware/RESTAuthenticator'));
app.use('/users',require('./controllers/UsersController'));
app.use('/filemgmt',require('./controllers/FileMgmtController'));

// the catch all route
app.use((req, res) => {
  logger.info("No route found for URL: "+req.url+" . Returning HTTP 404.");
  var statusCode = 404;
  res.status(statusCode).send();
});
