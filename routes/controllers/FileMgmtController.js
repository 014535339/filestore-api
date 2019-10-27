const express = require('express');
const router = module.exports = express.Router();
const multer = require('multer');
var fs = require('fs');
var Constants = require('../../commons/Constants');
var logger = require('../../utils/Logger');
const uuid = require('uuid/v4');
const commonResponseHandler = require('./CommonResponseProcessor');
const fileMgmtRequestValidator = require('./validators/FileMgmtRequestValidator');
const fileMgmtService = require('../../services/FileMgmtService');


if (!fs.existsSync(Constants.LOCAL_FILE_STORAGE)){
    fs.mkdirSync(Constants.LOCAL_FILE_STORAGE);
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, Constants.LOCAL_FILE_STORAGE)
    },
    filename: function (req, file, cb) {
      let fileId = req.params['fileId'];
      if(fileId === undefined){
        fileId = uuid();
      }    
      cb(null, fileId);
    }
  });
   
var upload = multer({ storage: storage });

router.use(fileMgmtRequestValidator);

/** Get All files */
router.get('/:userId', (req,res)=>
{
    let userId = req.params.userId;
    fileMgmtService.getAllFiles(userId).then(files=>{
        commonResponseHandler.handleResponse(req,res,undefined,files);
    }).catch(error=>{
        commonResponseHandler.handleResponse(req,res,error);
    });
});

/** Post API to upload new file */
router.post('/:userId',upload.single('fileToUpload'),(req,res)=>{
    
    let userId = req.params.userId;
    let fileDetails = req.file;
    fileDetails['description'] = req.body['description'];
    fileMgmtService.upload(userId, fileDetails).then(fileUploadResponse=>{
        commonResponseHandler.handleResponse(req,res,undefined,fileUploadResponse);
    }).catch(error=>{
        commonResponseHandler.handleResponse(req,res,error);
    });
    
});

/** Put API to update the file*/
router.put('/:userId/:fileId',upload.single('fileToUpload'), (req,res)=>{
    
    let userId = req.params.userId;
    let fileId =req.params.fileId ;
    let fileDetails = req.file;
    fileDetails['description'] = req.body['description'];

    fileMgmtService.upload(userId, fileDetails).then(fileUpdateResponse=>{
        commonResponseHandler.handleResponse(req,res,undefined,fileUpdateResponse);
    }).catch(error=>{
        commonResponseHandler.handleResponse(req,res,error);
    });
});

/** Delete API to update the file*/
router.delete('/:userId/:fileId',(req,res)=>{
    
    let userId = req.params.userId;
    let fileId =req.params.fileId ;
    fileMgmtService.delete(userId, fileId).then(fileDeleteResponse=>{
        commonResponseHandler.handleResponse(req,res,undefined,fileDeleteResponse);
    }).catch(error=>{
        commonResponseHandler.handleResponse(req,res,error);
    });
});