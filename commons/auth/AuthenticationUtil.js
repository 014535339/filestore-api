
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const logger = require('../../utils/Logger');
const FileMgmtError = require('../FileMgmtError');
const ErrorCodes = require('../../commons/ErrorCodes');

function AuthenticationUtil(){

    const JWT_SECRET = 'myS33creeeT';
    const expiresIn = '1h';
    this.generateEncryptedPassword = function(password){

        let salt = crypto.randomBytes(4).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
        encryptedPassword =  salt + "$" + hash;
        logger.info('generated password: '+encryptedPassword);
        return encryptedPassword;
    };

    this.verifyPasswordMatch = function(passwordToMatch, encyptedPassword){
        let encryptedPasswordFields = encyptedPassword.split('$');
        let salt = encryptedPasswordFields[0];
        let hash = crypto.createHmac('sha512', salt).update(passwordToMatch).digest("base64");
        if (hash === encryptedPasswordFields[1]) 
            return true;
        else
            return false;
    };

    this.generateJWTToken = function(userdetails){
        let token = jwt.sign(userdetails, JWT_SECRET,{ expiresIn: expiresIn });
        return token;
    };

    this.verifyJWTToken = function(token){
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            logger.error('Error verifying JWT token: '+err);
            throw new FileMgmtError(ErrorCodes.CUS_INVALID_AUTH_CODE);
        }
    }
}

module.exports= new AuthenticationUtil();