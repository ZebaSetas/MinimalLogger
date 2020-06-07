'use strict';

const path = require('path');
const {
  createLogger,
  format,
  transports
} = require('winston');
const chalk = require('chalk');
var dateFormat = require('dateformat');
const fileUtils = require('./utils/fileUtils.js');

const extractLogPath = (globalFilenamePath, optionalLogPath) => {
  try {
    fileUtils.createFile(optionalLogPath)
    return optionalLogPath
  } catch (e) {
    return fileUtils.getFolderPath(globalFilenamePath) + '/Log/'
  }
}

module.exports = class Logger {
  constructor(globalFilename, optionalLogPath) {
    var filenamePath = fileUtils.getFolderAndFilename(globalFilename)
    var logPath = extractLogPath(globalFilename, optionalLogPath)
    var nameServerLog = 'server.log'
    var nameExceptionLog = 'exception.log'
    var filename = path.join(logPath, nameServerLog)
    var fileLogger = createLogger({
      format: format.combine(
        format.simple(), format.timestamp(), format.printf(info =>
          `[${dateFormat(info.timestamp,'yyyy-mm-dd hh:MM:ss')}][${process.pid}][${info.level}][${filenamePath}]${info.message}`
        )),
      transports: [
        new transports.File({
          filename,
          format: format.combine(),
        })
      ],
      exceptionHandlers: [
        new transports.File({
          filename: logPath + nameServerLog
        }), new transports.File({
          filename: logPath + nameExceptionLog
        })
      ]
    })
    var consoleLogger = createLogger({
      format: format.combine(
        format.simple(), format.timestamp(), format.printf(info =>
          `[${dateFormat(info.timestamp,'yyyy-mm-dd hh:MM:ss')}][${process.pid}][${info.level}][${filenamePath}]${info.message}`
        )),
      transports: [
        new transports.Console()
      ]
    })
    var log = (message, initTime, endTime, chalkColor, fileLogger, consoleLogger) => {
      var separator = ' >>> '
      var messageToLog = ''
      if (isNaN(initTime)) messageToLog = separator + message
      else {
        var diference
        if (isNaN(endTime)) {
          var endTime = new Date().getTime()
          diference = endTime - initTime
        } else diference = endTime - initTime
        messageToLog = `[${diference}]${separator}${message}`
      }

      fileLogger(messageToLog)
      consoleLogger(chalkColor(messageToLog))
    }

    this.info = (message, initTime, endTime) =>
      log(message, initTime, endTime, chalk.green, fileLogger.info, consoleLogger.info)

    this.debug = (message, initTimestamp, endTimestamp) =>
      log(message, initTimestamp, endTimestamp, chalk.green, fileLogger.debug, consoleLogger.debug)

    this.warn = (message, initTimestamp, endTimestamp) =>
      log(message, initTimestamp, endTimestamp, chalk.yellow, fileLogger.warn, consoleLogger.warn)

    this.error = (message, initTimestamp, endTimestamp) =>
      log(message, initTimestamp, endTimestamp, chalk.red, fileLogger.error, consoleLogger.error)
  }

}