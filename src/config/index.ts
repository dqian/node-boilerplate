import * as dotEnvSafe from 'dotenv-safe'
import * as path from 'path'

const envPath = `.env.${process.env.NODE_ENV}`

dotEnvSafe.config({
  allowEmptyValues: true,
  example: path.resolve(__dirname, '../../.env.example'),
  path: path.resolve(process.cwd(), envPath),
})

interface IConfig {
  readonly AUTH: {
    readonly TOKEN_SECRET: string
    readonly TOKEN_EXPIRATION_TIME: string
  }
  readonly DB: {
    readonly AUDIT_SCHEMA: string
    readonly HOST: string
    readonly MAIN_SCHEMA: string
    readonly NAME: string
    readonly PASSWORD: string
    readonly PORT: number
    readonly USER: string
  }
  readonly LOGDNA: {
    readonly KEY: string
    readonly HOSTNAME: string
    readonly APPNAME: string
  }
  readonly NODE_ENV: string
  readonly SERVER_PORT: number
}

const {
  AUTH_TOKEN_EXPIRATION_TIME,
  AUTH_TOKEN_SECRET,
  DB_HOST,
  DB_AUDIT_SCHEMA,
  DB_MAIN_SCHEMA,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_USER,
  LOGDNA_KEY,
  LOGDNA_HOSTNAME,
  LOGDNA_APPNAME,
  NODE_ENV,
  SERVER_PORT,
} = process.env

const config: IConfig = {
  AUTH: {
    TOKEN_EXPIRATION_TIME: AUTH_TOKEN_EXPIRATION_TIME,
    TOKEN_SECRET: AUTH_TOKEN_SECRET,
  },
  DB: {
    AUDIT_SCHEMA: DB_AUDIT_SCHEMA,
    HOST: DB_HOST,
    MAIN_SCHEMA: DB_MAIN_SCHEMA,
    NAME: DB_NAME,
    PASSWORD: DB_PASSWORD,
    PORT: parseInt(DB_PORT, 10),
    USER: DB_USER,
  },
  LOGDNA: {
    KEY: LOGDNA_KEY,
    HOSTNAME: LOGDNA_HOSTNAME,
    APPNAME: LOGDNA_APPNAME,
  },
  NODE_ENV,
  SERVER_PORT: parseInt(SERVER_PORT, 10),
}

export default config
