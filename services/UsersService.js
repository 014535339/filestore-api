
const logger = require('../utils/Logger');
const FileMgmtError = require('../commons/FileMgmtError');
const ErrorCodes = require('../commons/ErrorCodes');
const User = require('../models/User');
const AuthenticationUtil = require('../commons/auth/AuthenticationUtil');
const config = require('../config/config.json');

global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var poolData = {
    UserPoolId : config.cognitoUserPoolId,
    ClientId : config.cognitoClientId
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function UserService(){

    function obfuscateSensitiveFields(user){

    };

    /** Get All Attributes */
    this.registerUser = function(userDetails)
    {
        //userDetails.password = AuthenticationUtil.generateEncryptedPassword(userDetails.password);
        var attributeList = [];
 
        var dataEmail = {
            Name : 'email',
            Value : userDetails.username
        };

        var dataFirstName = {
            Name : 'given_name',
            Value : userDetails.firstname
        };

        var dataLastName = {
            Name : 'family_name',
            Value : userDetails.lastname
        };

        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributeFirstName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFirstName);
        var attributeLastName = new AmazonCognitoIdentity.CognitoUserAttribute(dataLastName);        
        
        attributeList.push(attributeEmail);
        attributeList.push(attributeFirstName);
        attributeList.push(attributeLastName);        
        

        return new Promise((resolve, reject) => {
            userPool.signUp(userDetails.username, userDetails.password, attributeList, null, (err, result) => {
              if (err) {
                console.log(err.message);
                reject(err);
              }
              cognitoUser = result.user;
              resolve(cognitoUser);
            });
          });        
    };

    /** Get All Attributes */
    this.login = function(userDetails)
    {
        var authenticationData = {
            Username : userDetails.username,
            Password : userDetails.password
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        var userData = {
            Username : userDetails.username,
            Pool : userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {                           
                    var userdetails = {
                        firstname : result.idToken.payload.given_name,
                        lastname : result.idToken.payload.family_name,
                        userid : result.idToken.payload.sub                        
                    }
                var token =    AuthenticationUtil.generateJWTToken(userdetails);
                resolve(token);                
                },
                onFailure: function(err) {
                    reject(err);
                    throw new FileMgmtError(ErrorCodes.CUS_ERROR_LOGIN);
                }
            });
        });      
    }

    /** Get User by user email  */

    this.getUserById = function(email){
        
        return User.findOne({ where: {email: email} }).then(customer=>{
            if(!customer){
                throw new FileMgmtError(ErrorCodes.CUS_NOT_EXIST);
            }else{
                return customer;
            }
        }).catch(error=>{
            logger.error('Error in retireving customer: '+error);
            if(error instanceof FileMgmtError){
                throw error;
            }else{
                throw new FileMgmtError(ErrorCodes.CUS_ERROR_RETRIEVING_CUSTOMER);
            }
        })
    };
    
}

module.exports= new UserService();