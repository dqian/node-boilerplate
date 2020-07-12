import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cors from 'cors'
import * as express from 'express'
import * as helmet from 'helmet'
import * as morgan from 'morgan'
import { handleErrors } from '~/packages/api/middlewares/error'
import router from '~/packages/api/router'
import * as passport from "passport"

const app = express()

app.use(morgan('combined'))
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(router)
app.use(handleErrors)

export default app
