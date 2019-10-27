var logger = require('../utils/Logger');
var FileMgmtError = require('../commons/FileMgmtError');
var ErrorCodes = require('../commons/ErrorCodes');
var Constants = require('../commons/Constants');
const config = require('../config/config.json');

var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1',
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
});



function FileMgmtService()
{
        /** Get All files for a user */
    this.getAllFiles = function(userId)
    {

        return new Promise((resolve, reject) => {
        const fileMetaDataParams = {
            Bucket: Constants.AWS_S3_BUCKET_NAME,
            Key: Constants.AWS_S3_FILE_METADATA
        };
        // Create S3 service object
        s3 = new AWS.S3({apiVersion: '2006-03-01'});
        s3.getObject(fileMetaDataParams, (err, data) => {
            if (err){
                reject(err);
            }else{

                var fileMetaData = JSON.parse(data.Body.toString('utf-8'));
                var userMetaData = fileMetaData[userId] === undefined?{}:fileMetaData[userId];
                var files = [];
                for (var key in userMetaData) {
                    // check if the property/key is defined in the object itself, not in parent
                    if (userMetaData.hasOwnProperty(key)) {
                        var fileDetail = userMetaData[key];
                        var  fileDetailTO = {};
                        fileDetailTO['fileId'] = fileDetail['fileName'];
                        fileDetailTO['description'] = fileDetail['description'];
                        files.push(fileDetailTO);
                    }
                }
                resolve(files);
            }
        });
    });
 
    };

    /** upload file */
    this.upload = function(userId, fileDetails)
    {
        // call S3 to retrieve upload file to specified bucket
        var uploadParams = {Bucket: Constants.AWS_S3_BUCKET_NAME, Key: '', Body: ''};
        // Configure the file stream and obtain the upload parameters
        var fs = require('fs');
        var fileStream = fs.createReadStream(fileDetails.path);
        fileStream.on('error', function(err) {
            console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        var path = require('path');
        uploadParams.Key = userId+"/"+path.basename(fileDetails.filename);

        // call S3 to retrieve upload file to specified bucket
        return new Promise((resolve, reject) => {
            // Create S3 service object
            s3 = new AWS.S3({apiVersion: '2006-03-01'});

            s3.upload(uploadParams, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    reject(err);
                }else if (data) {
                    const fileMetaDataParams = {
                        Bucket: Constants.AWS_S3_BUCKET_NAME,
                        Key: Constants.AWS_S3_FILE_METADATA
                    };
                    s3.getObject(fileMetaDataParams, (err, data) => {
                        if (err){
                            reject(err);
                        }else{

                            var fileMetaData = JSON.parse(data.Body.toString('utf-8'));
                            var userMetaData = fileMetaData[userId] === undefined?{}:fileMetaData[userId];
                            var fileData = userMetaData[fileDetails.filename] === undefined?{}: userMetaData[fileDetails.filename];
                            fileData['fileName'] = fileDetails.filename;
                            fileData['description'] = fileDetails.description;
                            fileData['originalName'] = fileDetails.originalname;
                            fileData['size'] = fileDetails.size;
                            
                            userMetaData[fileDetails.filename] = fileData;
                            fileMetaData[userId] = userMetaData;
                            fileMetaDataParams['Body'] = JSON.stringify(fileMetaData);
                            fileMetaDataParams['Content-type'] = "application/json";
                             s3.upload(fileMetaDataParams, function (err, data) {
                                if (err) {
                                    console.log("Error", err);
                                    reject(err);
                                }else{
                                    resolve(data); 
                                }
                            });
                        }
                    });
                }
            });
        });        
    };


    /** delete file */
    this.delete = function(userId, fileId)
    {
        
        // call S3 to retrieve upload file to specified bucket
        var deleteParams = {Bucket: Constants.AWS_S3_BUCKET_NAME, Key: ''};
        deleteParams.Key = userId+"/"+fileId;

        // call S3 to retrieve upload file to specified bucket
        return new Promise((resolve, reject) => {
            // Create S3 service object
            s3 = new AWS.S3({apiVersion: '2006-03-01'});

            s3.deleteObject(deleteParams, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    reject(err);
                }else if (data) {
                    const fileMetaDataParams = {
                        Bucket: Constants.AWS_S3_BUCKET_NAME,
                        Key: Constants.AWS_S3_FILE_METADATA
                    };
                    s3.getObject(fileMetaDataParams, (err, data) => {
                        if (err){
                            reject(err);
                        }else{

                            var fileMetaData = JSON.parse(data.Body.toString('utf-8'));
                            var userMetaData = fileMetaData[userId] === undefined?{}:fileMetaData[userId];
                            var fileData = userMetaData[fileId];
                            if(fileData != undefined){
                                delete userMetaData[fileId];
                            }
                            var  fileDetailTO = {};
                            fileDetailTO['fileId'] = fileData['fileName'];
                            fileDetailTO['description'] = fileData['description'];

                            fileMetaDataParams['Body'] = JSON.stringify(fileMetaData);
                            fileMetaDataParams['Content-type'] = "application/json";
                                s3.upload(fileMetaDataParams, function (err, data) {
                                if (err) {
                                    console.log("Error", err);
                                    reject(err);
                                }else{
                                    resolve(fileDetailTO); 
                                }
                            });
                        }
                    });
                }
            });
        });
    };
   

     /** delete file */
     this.download = function(userId, fileId)
     {
         
         // call S3 to retrieve upload file to specified bucket
         var downloadParams = {Bucket: Constants.AWS_S3_BUCKET_NAME, Key: ''};
         downloadParams.Key = userId+"/"+fileId;
 
         // call S3 to retrieve upload file to specified bucket
         return new Promise((resolve, reject) => {
             // Create S3 service object
             s3 = new AWS.S3({apiVersion: '2006-03-01'});
 
             s3.getObject(downloadParams, function (err, data) {
                 if (err) {
                     console.log("Error", err);
                     reject(err);
                 }else if (data) {
                     
                    const fileMetaDataParams = {
                         Bucket: Constants.AWS_S3_BUCKET_NAME,
                         Key: Constants.AWS_S3_FILE_METADATA
                     };
                     s3.getObject(fileMetaDataParams, (err, data) => {
                         if (err){
                             reject(err);
                         }else{
 
                             var fileMetaData = JSON.parse(data.Body.toString('utf-8'));
                             var userMetaData = fileMetaData[userId] === undefined?{}:fileMetaData[userId];
                             var fileData = userMetaData[fileId];
                             if(fileData != undefined){
                                 delete userMetaData[fileId];
                             }
                             var  fileDetailTO = {};
                             fileDetailTO['fileId'] = fileData['fileName'];
                             fileDetailTO['description'] = fileData['description'];
 
                             fileMetaDataParams['Body'] = JSON.stringify(fileMetaData);
                             fileMetaDataParams['Content-type'] = "application/json";
                                 s3.upload(fileMetaDataParams, function (err, data) {
                                 if (err) {
                                     console.log("Error", err);
                                     reject(err);
                                 }else{
                                     resolve(fileDetailTO); 
                                 }
                             });
                         }
                     });
                 }
             });
         });
     };
}

module.exports=new FileMgmtService();