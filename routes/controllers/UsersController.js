const express = require('express');
const router = module.exports = express.Router();
var logger = require('../../utils/Logger');
const commonResponseHandler = require('./CommonResponseProcessor');
const usersRequestValidator = require('./validators/UsersRequestValidator');
const usersService = require('../../services/UsersService');
router.use(usersRequestValidator);

/** Register user */
router.post('/',(req,res)=>
{
    var userDetails = req.body; 
    usersService.registerUser(userDetails).then(user=>{
        commonResponseHandler.handleResponse(req,res,undefined,user);
    }).catch(error=>{
        commonResponseHandler.handleResponse(req,res,error);
    });
});


/** Login */
router.post('/login',(req,res)=>
{
    var userDetails = req.body; 
    usersService.login(userDetails).then(result=>{
        var responseBody = {
            accesstoken : result
        }
        commonResponseHandler.handleResponse(req,res,undefined,responseBody);
    }).catch(error=>{
        commonResponseHandler.handleResponse(req,res,error);
    });
});
