/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'path'
import * as process from 'process'

import { PORT } from '@config/global'
import { APINotImplementedError } from '@helpers/errorHandler'
import { connectDB } from '@helpers/global'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import { NextFunction, Request, Response } from 'express-serve-static-core'
import helmet from 'helmet'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'reflect-metadata'

import apiRouter from './api/index.router'

dotenv.config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) })

console.info('Starting Premierx4free Backend')

const app = express()

// Express plugins
app.use(helmet())
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(
  fileUpload({
    useTempFiles: true
  })
)

// app.use(express.static(staticRoot))

connectDB()
  .then(() => console.info('Connected to MongoDB'))
  .catch((e) => console.error('Error connecting to MongoDB', e))

app.use('/api', apiRouter)
app.use(apiRouter)

// app.get('*', (req, res) => {
//   if (req.get('Content-Type') === 'application/json') throw new APINotImplementedError('API not implemented')
//   try {
//     res.sendFile(path.resolve(staticRoot, 'index.html'))
//   } catch (e) {
//     res.send('Oops! unexpected error')
//   }
// })

app.use((_req, _res, _next) => {
  throw new APINotImplementedError('API not implemented')
})

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.statusCode = 500
  res.json({
    message: err.message,
    stack: err.stack
  })
  console.error(err)
})

app.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`)
})
