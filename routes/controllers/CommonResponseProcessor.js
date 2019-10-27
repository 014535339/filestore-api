
/**
 * Common response handler.
 * It mainly handles the common part of response sending to consumer.
 *
 * @author Praveen Kumar Thakur
 */

'use strict';


//Imports

var logger = require('../../utils/Logger');
var Constants = require('../../commons/Constants');
var ErrorCodes = require('../../commons/ErrorCodes');
var FileMgmtError = require('../../commons/FileMgmtError');

/**
 * Handles response. If there is an error, it would send an error response.
 */
exports.handleResponse = function(req, res, error,responseData) {
    var statusCode;
    if(error){
        if(error instanceof FileMgmtError ){
            statusCode = error.statusCode;
            responseData = {
                error:{
                    code : error.errorCode,
                    message : error.message, 
                }
            }
        }else{
            statusCode = 500;
            responseData = {
                error: {
                    code : ErrorCodes.INTERNAL_SERVER_ERROR.errorCode,
                    message : JSON.stringify(error)
                }
            }
        }
    }
    else{
        statusCode = 200;
    }
    if (!res.headersSent) {
        res.setHeader('Content-Type', 'application/json');
        res.status(statusCode).send(responseData);
    }
}