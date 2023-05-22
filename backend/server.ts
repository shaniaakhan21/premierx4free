import * as path from 'path'
import * as process from 'process'

import { PORT } from '@config/global'
import { connectDB } from '@helpers/global'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
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

connectDB()
  .then(() => console.info('Connected to MongoDB'))
  .catch((e) => console.error('Error connecting to MongoDB', e))

app.use('/api', apiRouter)

app.get('/*', (_, res) => {
  try {
    res.sendFile(path.join(__dirname, '/../frontend/build', 'index.html'))
  } catch (e) {
    res.send('Oops! unexpected error')
  }
})

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.statusCode = 500
  res.json({
    message: err.message,
    stack: err.stack
  })
})

app.use((_req, res, _next) => {
  res.status(404).json({ error: 'NOT FOUND' })
})

app.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`)
})
