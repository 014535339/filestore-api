/**
 * @author Praveen Kumar Thakur
 */

var constants = {

    /**
     * Express Application related constants
     */
    APPLICATION_PORT : process.env.APPLICATION_PORT || 8080,

    FILEMGMT_SYSTEM_VERSION : '1.0',
    FILEMGMT_SYSTEM_BASE_CONTEXT : "/api/v1",
    FILEMGMT_SYSTEM_VERSION_CONTEXT : "/version",
    
    LOCAL_FILE_STORAGE: "fileStorage",
    /**
     * Log related constants
     */
    LOGLEVEL: process.env.LOG_LEVEL || "debug",
    LOGSDIR: "logs",
    LOGFILEPREFIX: "filemgmt-system",
    LOGFILESIZE: 10000000,
    NUMBEROFLOGFILES: 10,
    REQUESTENTITYSIZE: "100mb",
    ACCESSLOGFILESIZE : 10000000,
    
    /**
     * DB related properties
     */

    /**
     * AWS Resources
     */
    AWS_S3_BUCKET_NAME:"fsmgmt-bucket",
    AWS_S3_FILE_METADATA:"fileMetaData.json"

};

module.exports = constants;