import { ConnectionOptions } from 'typeorm'
import config from './src/config'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  database: config.DB.NAME,
  host: config.DB.HOST,
  port: config.DB.PORT,
  username: config.DB.USER,
  password: config.DB.PASSWORD,

  logging: false,
  synchronize: false,

  cli: {
    entitiesDir: 'src/packages/database/models',
    migrationsDir: 'src/packages/database/migrations',
  },
  entities: ['src/packages/database/models/*.ts'],
  migrations: ['src/packages/database/migrations/*.ts'],
}

console.log(connectionOptions);

module.exports = connectionOptions
