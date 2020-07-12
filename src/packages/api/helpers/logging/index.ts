import { TransformableInfo } from 'logform'
import { createLogger, format, LoggerOptions, transports } from 'winston'
import config from '~/config'
import * as LogDNAWinston from 'logdna-winston'

const formatParams = (info: TransformableInfo) => {
  const { timestamp, level, message, ...args } = info
  const ts = timestamp.slice(0, 19).replace('T', ' ')
  const more = Object.keys(args).length ? JSON.stringify(args) : ''
  return `${ts} - ${level}: ${message} ${more}`
}

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams),
)

const productionFormat = format.combine(
  format.timestamp(), 
  format.align(), 
  format.printf(formatParams),
)

const logdnaOptions = {
  key: config.LOGDNA.KEY,
  handleExceptions: true,
  app: config.LOGDNA.APPNAME,
  env: config.NODE_ENV,
}

const loggerTransports = [
  new transports.Console(),
]

let loggerOptions: LoggerOptions
if (config.NODE_ENV === 'production') {
  loggerOptions = {
    format: productionFormat,
    transports: config.LOGDNA.KEY ? [
        ...loggerTransports,
        new LogDNAWinston(logdnaOptions)
      ] : loggerTransports,
  }
} else {
  loggerOptions = {
    format: developmentFormat,
    transports: loggerTransports,
  }
}

export enum LogLevel {
  Info = 'info',
  Debug = 'debug',
  Warn = 'warn',
  Error = 'error',
}

export default createLogger(loggerOptions)