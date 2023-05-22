import { ClassTransformerRoles } from '@helpers/access'
import { CustomRequestHandler, InvalidRequestError } from '@helpers/errorHandler'
import validateClass from '@helpers/global'
import { successResponse } from '@helpers/response'
import UserModel from '@models/user.model'
import { instanceToPlain } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'
import { Request } from 'express'

class AuthRequest {
  constructor(d: Partial<AuthRequest>) {
    Object.assign(this, d)
  }

  @IsString()
  @IsEmail()
  public email!: string

  @IsString()
  // @MinLength(8, { message: 'Password must be at least 8 characters long' })
  public password!: string
}

const login: CustomRequestHandler = async (req: Request<{}, {}, AuthRequest>, res) => {
  await validateClass(new AuthRequest(req.body))
  const u = await UserModel.findByEmail(req.body.email)
  if (!u) throw new InvalidRequestError('User not found')
  const user = u
  const isMatch = await user.comparePassword(req.body.password)
  if (!isMatch) throw new InvalidRequestError('Invalid password')
  user.jwtToken = await user.generateJWT()

  // Get agent profile if exists
  if (user.agentProfile) await user.populate('agentProfile')

  res.json(
    successResponse(instanceToPlain(user.toJSON(), { groups: [ClassTransformerRoles.Self, ...(user.roles ?? [])] }))
  )
}

export default login
