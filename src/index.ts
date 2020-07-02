import * as fs from 'fs'
import * as https from 'https'
import * as http from 'http'
import config from '~/config'
import { getConnection } from './packages/database'
import server from './server'

const PORT = config.SERVER_PORT || '3000'

async function onStart(): Promise<any> {
  try {
    await getConnection()
    console.log(`Server up and running on http://localhost:${PORT}`)
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err)
    throw err
  }
}

// const options = {
//   cert: fs.readFileSync(`${__dirname}/../server.cert`, 'utf8'),
//   key: fs.readFileSync(`${__dirname}/../server.key`, 'utf8'),
// };

const currentServer = http.createServer({}, server)
// const currentServer = https.createServer(options, server)

server.get('/', function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
});

currentServer.listen(PORT, onStart)