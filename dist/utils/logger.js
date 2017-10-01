"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require('winston');
const config = require('../../config').logger;
const tsFormat = () => (new Date()).toLocaleTimeString();
const Logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: config.consoleLevel,
            handleExceptions: true,
            humanReadableUnhandledException: true
        }),
        new (require('winston-daily-rotate-file'))({
            filename: `${config.directory}/-results.log`,
            timestamp: tsFormat,
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: config.fileLevel,
            handleExceptions: true,
            humanReadableUnhandledException: true
        })
    ],
    exitOnError: false
});
exports.default = Logger;
