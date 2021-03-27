//all my imports, this file is only for the logger, so it uses winston and daily rotate
var winston = require('winston');
require('winston-daily-rotate-file');

//create a new dailyrotatefile transport for evvery level
//done like this because transports do not autosort by levels when using dailyrotate for some reason 
var error = new winston.transports.DailyRotateFile({
    level: "error",
    format: winston.format.combine(winston.format.timestamp(),winston.format.prettyPrint()),
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '50m',
})
var warn = new winston.transports.DailyRotateFile({
    level: "warn",
    format: winston.format.combine(winston.format.timestamp(),winston.format.prettyPrint()),
    filename: 'logs/warn-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '50m',
})
var info = new winston.transports.DailyRotateFile({
    level: "info",
    format: winston.format.combine(winston.format.timestamp(),winston.format.prettyPrint()),
    filename: 'logs/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '50m',
})
var http = new winston.transports.DailyRotateFile({
    level: "http",
    format: winston.format.combine(winston.format.timestamp(),winston.format.prettyPrint()),
    filename: 'logs/http-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '50m',
})
var verbose = new winston.transports.DailyRotateFile({
    level: "verbose",
    format: winston.format.combine(winston.format.timestamp(),winston.format.prettyPrint()),
    filename: 'logs/verbose-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '50m',
})
var debug = new winston.transports.DailyRotateFile({
    level: "debug",
    format: winston.format.combine(winston.format.timestamp(),winston.format.prettyPrint()),
    filename: 'logs/debug-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '50m',
})
var silly = new winston.transports.DailyRotateFile({
    level: "silly",
    format: winston.format.combine(winston.format.timestamp(),winston.format.prettyPrint()),
    filename: 'logs/silly-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '50m',
})

//upon every transport rotating a file we console.log that the rotatition was successful
error.on('rotate', function(oldFilename: any, newFilename: any) {
    console.log("rotated", oldFilename, "to", newFilename);
  });
warn.on('rotate', function(oldFilename: any, newFilename: any) {
    console.log("rotated", oldFilename, "to", newFilename);
});
info.on('rotate', function(oldFilename: any, newFilename: any) {
    console.log("rotated", oldFilename, "to", newFilename);
});
http.on('rotate', function(oldFilename: any, newFilename: any) {
    console.log("rotated", oldFilename, "to", newFilename);
});
verbose.on('rotate', function(oldFilename: any, newFilename: any) {
    console.log("rotated", oldFilename, "to", newFilename);
});
debug.on('rotate', function(oldFilename: any, newFilename: any) {
    console.log("rotated", oldFilename, "to", newFilename);
});
silly.on('rotate', function(oldFilename: any, newFilename: any) {
    console.log("rotated", oldFilename, "to", newFilename);
});

//creates a logger for every level
export const errorLogger = winston.createLogger({
    transports:[
        error
    ]
});
export const warnLogger = winston.createLogger({
    transports:[
        warn
    ]
});
export const infoLogger = winston.createLogger({
    transports:[
        info
    ]
});
export const httpLogger = winston.createLogger({
    transports:[
        http
    ]
});
export const verboseLogger = winston.createLogger({
    transports:[
        verbose
    ]
});
export const debugLogger = winston.createLogger({
    transports:[
        debug
    ]
});
export const sillyLogger = winston.createLogger({
    transports:[
        silly
    ]
});