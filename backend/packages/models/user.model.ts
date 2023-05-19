import { ClassTransformerRoles, Roles, SysFunction, SysMethod } from '@helpers/access'
import { AgentProfile } from '@models/agent-profile.model'
import AuditTraceModel from '@models/audit-trace.model'
import { AutoIncrementID } from '@typegoose/auto-increment'
import {
  DocumentType,
  getModelForClass,
  modelOptions,
  plugin,
  pre,
  prop,
  Ref,
  ReturnModelType,
  Severity
} from '@typegoose/typegoose'
import * as bcrypt from 'bcryptjs'
import { Exclude, Expose } from 'class-transformer'
import { Request } from 'express'
import { ParamsDictionary, RequestHandler } from 'express-serve-static-core'
import * as HttpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { ParsedQs } from 'qs'

export type JWTPayload = {
  subject: number
  username: string
  roles: Roles[]
}

export type CustomReq<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & {
  user?: JWTPayload
}

export function generateAccessToken(payload: any) {
  return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: '1d'
  })
}

export const checkPermissions = (user: JWTPayload | undefined, roles: Roles[], autoThrow: boolean = true) => {
  if (!user?.roles?.find((r) => roles.indexOf(r ?? -1) > -1))
    if (autoThrow) throw new Error("Don't have permission to access")
    else return false
  return true
}

export const AuditTrace: (action: SysFunction, method: SysMethod) => RequestHandler =
  (action, method) => async (req: CustomReq, _res, next) => {
    await AuditTraceModel.create({
      action,
      method,
      by: req.user?.username,
      remarks: `URL - ${req.url} | Body - ${JSON.stringify(req.body)} | Params - ${JSON.stringify(
        req.params
      )} | Query - ${JSON.stringify(req.query)}`
    })
    next()
  }

export const AuthenticateToken: (roles?: Roles[]) => RequestHandler = (roles) => (req: CustomReq, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    res.sendStatus(HttpStatus.UNAUTHORIZED)
    return
  }

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) {
      res.sendStatus(HttpStatus.FORBIDDEN)
      return
    }
    req.user = user as JWTPayload
    if (roles && roles.length > 0) checkPermissions(req.user, roles)
    next()
  })
}

@Exclude()
@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    await bcrypt.hash(this.password, 10, (err, encryptedPass) => {
      if (err) return next(err)
      this.password = encryptedPass
      return next()
    })
  }
  return next()
})
@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'users' },
  schemaOptions: { collection: 'users' }
})
@plugin(AutoIncrementID, { field: 'userId' })
export class User {
  constructor(d: Partial<User>) {
    Object.assign(this, d)
  }

  @Expose()
  @prop({ unique: true })
  public email!: string

  @Expose()
  @prop({ unique: true })
  public userId!: number

  @Expose({ groups: [ClassTransformerRoles.Self, Roles.Admin] })
  @prop()
  public jwtToken?: string

  @Expose()
  @prop({ type: () => [String] })
  public roles?: Roles[]

  @prop({ unique: true })
  public password!: string

  @Expose()
  @prop({ ref: () => AgentProfile })
  public agentProfile?: Ref<AgentProfile>

  /**
   * Compare password
   * @param password - password to compare
   * @returns Promise<boolean> - true if password is correct
   */
  public async comparePassword(this: DocumentType<User>, password: string) {
    return bcrypt.compare(password, this.password)
  }

  /**
   * Generate JWT token and save to database
   * @returns Promise<string> - JWT token
   */
  public async generateJWT(this: DocumentType<User>) {
    const payload: JWTPayload = {
      subject: this.userId,
      username: this.email,
      roles: this.roles ?? []
    }
    this.jwtToken = generateAccessToken(payload)
    await this.save()
    return this.jwtToken
  }

  public static async findByEmail(this: ReturnModelType<typeof User>, email: string) {
    return this.findOne().where('email').equals(email).exec()
  }
}

const UserModel = (mongoose.models?.users as ReturnModelType<typeof User>) ?? getModelForClass(User)

export default UserModel
