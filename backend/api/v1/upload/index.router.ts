import { Roles } from '@helpers/access'
import ErrorHandler, { CustomRequestHandler } from '@helpers/errorHandler'
import { s3, upload } from '@helpers/s3'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

const uploadRouter = express.Router()

const uploadHandler: CustomRequestHandler<{}, any, any> = async (req, res) => {
  // if (!req.file) throw new InvalidRequestError('No files found')
  res.json(((req.files as unknown as Express.MulterS3.File[]) ?? [req.file]).map((file) => file.location))
}

uploadRouter.use(
  '/list/:prefix?',
  AuthenticateToken([Roles.Admin]),
  ErrorHandler(async (req, res) => {
    res.json(await s3.listObjects({ Bucket: 'nsur', Prefix: req.params.prefix }).promise())
  })
)

uploadRouter.use(
  '/',
  AuthenticateToken([Roles.Admin, Roles.Agent]),
  upload('premierx/temp').any(),
  ErrorHandler(uploadHandler)
)

export default uploadRouter
