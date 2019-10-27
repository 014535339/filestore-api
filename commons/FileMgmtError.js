/**
 * @author Praveen Kumar Thakur
 */
const ErrorCodes = require('./ErrorCodes');


function FileMgmtError(errorCodeType, message) {
    
    if(errorCodeType){
        this.errorCode = errorCodeType.errorCode;
        this.statusCode = errorCodeType.statusCode;
    }else{
        this.errorCode = ErrorCodes.InternalServerError.errorCode;
        this.statusCode = ErrorCodes.InternalServerError.statusCode;
    }
    if (message) {
        this.message = message;
    } 
    else {
        this.message = errorCodeType.message;
    } 
};

require('util').inherits(FileMgmtError, Error);

module.exports = FileMgmtError;
