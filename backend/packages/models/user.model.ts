import { Roles, SysFunction, SysMethod } from '@helpers/access'
import AuditTraceModel from '@models/audit-trace.model'
import { AutoIncrementSimple } from '@typegoose/auto-increment'
import {
  getModelForClass,
  modelOptions,
  plugin,
  pre,
  prop, Ref,
  Severity
} from '@typegoose/typegoose'
import * as bcrypt from 'bcryptjs'
import { Request } from 'express'
import { ParamsDictionary, RequestHandler } from 'express-serve-static-core'
import jwt from 'jsonwebtoken'
import mongoose, { Model } from 'mongoose'
import { ParsedQs } from 'qs'
import {AgentProfile} from "@models/agent-profile.model";

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

export const checkPermissions = (
  user: JWTPayload | undefined,
  roles: Roles[],
  autoThrow: boolean = true
) => {
  if (!user?.roles?.find((r) => roles.indexOf(r ?? -1) > -1))
    if (autoThrow) throw new Error("Don't have permission to access")
    else return false
  return true
}

export const AuditTrace: (
  action: SysFunction,
  method: SysMethod
) => RequestHandler =
  (action, method) => async (req: CustomReq, _res, next) => {
    await AuditTraceModel.create({
      action,
      method,
      by: req.user?.username,
      remarks: `URL - ${req.url} | Body - ${JSON.stringify(
        req.body
      )} | Params - ${JSON.stringify(req.params)} | Query - ${JSON.stringify(
        req.query
      )}`
    })
    next()
  }

export const AuthenticateToken: (roles?: Roles[]) => RequestHandler =
  (roles) => (req: CustomReq, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
      res.sendStatus(401)
      return
    }

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          res.sendStatus(403)
          return
        }
        req.user = user as JWTPayload
        if (roles && roles.length > 0) checkPermissions(req.user, roles)
        next()
      }
    )
  }

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
@plugin(AutoIncrementSimple, [{ field: 'userId' }])
@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'users' },
  schemaOptions: { collection: 'users' }
})
export class User {
  constructor(d: Partial<User>) {
    Object.assign(this, d)
  }

  @prop({ unique: true })
  public email!: string

  @prop({ unique: true })
  public userId!: number

  @prop()
  public jwtToken?: string

  @prop({ type: () => [String] })
  public roles?: Roles[]

  @prop({ unique: true })
  public password!: string

  @prop({ ref: () => AgentProfile })
  public agentProfile?: Ref<AgentProfile>

  @prop()
  public token?: string

  /**
   * Compare password
   * @param password - password to compare
   * @returns Promise<boolean> - true if password is correct
   */
  public comparePassword: (password: string) => Promise<boolean> =
    async function (this: User, password: string) {
      return bcrypt.compare(password, this.password)
    }

    public static findByEmail = async (email: string) => {
      return UserModel.find().where('email').equals(email).exec()
    }
}

const UserModel =
  (mongoose.models?.users as Model<User>) ?? getModelForClass(User)

export default UserModel
