import path from 'path'

import { Roles } from '@helpers/access'
import ErrorHandler, { CustomRequestHandler, InvalidRequestError } from '@helpers/errorHandler'
import { generateFileName } from '@helpers/global'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'
import { UploadedFile } from 'express-fileupload'

const uploadRouter = express.Router()

const uploadHandler: CustomRequestHandler<{}, any, any> = async (req, res) => {
  if (!req.files?.document) throw new InvalidRequestError('No files found')
  const files = (req.files?.document as UploadedFile[])?.[0]
    ? (req.files.document as UploadedFile[])
    : [req.files.document as UploadedFile]
  const uploaded = await Promise.all(
    files.map(async (file) => {
      const fileName = generateFileName(file.name)
      await file.mv(path.resolve(__dirname, `../../../uploads/temp`, fileName))
      return fileName
    })
  )
  res.json(uploaded)
}

uploadRouter.use('/', AuthenticateToken([Roles.Admin, Roles.Agent]), ErrorHandler(uploadHandler))

export default uploadRouter
