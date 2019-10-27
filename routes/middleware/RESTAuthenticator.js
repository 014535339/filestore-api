const express = require('express');
const router = module.exports = express.Router();
const logger = require('../../utils/Logger');
const FileMgmtError = require('../../commons/FileMgmtError');
const ErrorCodes = require('../../commons/ErrorCodes');
const AuthenticationUtil = require('../../commons/auth/AuthenticationUtil');
const commonResponseHandler = require('../controllers/CommonResponseProcessor');

router.all("/*", function(req, res, next) {
    
    if( (req.method === "POST" && ( req.url === '/users/' || req.url === '/users/login'))){
        
        next();

    }else{
        
        let loginError = new FileMgmtError(ErrorCodes.CUS_INVALID_AUTH_CODE);
        if(!req.headers['authorization']){
            commonResponseHandler.handleResponse(req,res,loginError);
            return;
        }
        let authorization = req.headers['authorization'].split(' ');
        if (authorization.length !== 2 || authorization[0] !== 'Bearer') {
            commonResponseHandler.handleResponse(req,res,loginError);
            return;
        } 
        try{
            req.jwt = AuthenticationUtil.verifyJWTToken(authorization[1]);
        }catch(error){
            commonResponseHandler.handleResponse(req,res,error);
        }
        next();
    };

 });
