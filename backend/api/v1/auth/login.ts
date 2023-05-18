import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import { Request } from 'express'

type AuthRequest = {
  username: string
  password: string
}

const login: CustomRequestHandler = async (
  req: Request<{}, {}, AuthRequest>,
  res
) => {
  console.log(req.body)

  res.json(successResponse())
}

export default login
