import * as http from 'http'
import config from '~/config'
import './packages/api/auth'
import { getConnection } from './packages/database'

import "reflect-metadata"
import server from './server'

const PORT = config.SERVER_PORT || '3000'

async function onStart(): Promise<void> {
  try {
    // initialize database connection
    await getConnection()
    console.log(`Database successfully connected.`)
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err)
    throw err
  }

  console.log(`Server up and running on port ${PORT}.`)
}

const currentServer = http.createServer({}, server)

currentServer.listen(PORT, onStart)