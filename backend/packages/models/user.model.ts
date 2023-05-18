import { KnownRoles, SysFunction, SysMethod } from '@helpers/access'
import AuditTraceModel from '@models/audit-trace.model'
import {
  getModelForClass,
  modelOptions,
  prop,
  Severity
} from '@typegoose/typegoose'
import { Type } from 'class-transformer'
import { Request } from 'express'
import { ParamsDictionary, RequestHandler } from 'express-serve-static-core'
import jwt from 'jsonwebtoken'
import mongoose, { Model } from 'mongoose'
import { ParsedQs } from 'qs'

export type JWTPayload = {
  subject: number
  username: string
  roles: KnownRoles[]
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
  roles: KnownRoles[],
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

export const AuthenticateToken: (roles?: KnownRoles[]) => RequestHandler =
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

@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'users' },
  schemaOptions: { collection: 'users' }
})
export class User {
  constructor(d: Partial<User>) {
    Object.assign(this, d)
  }

  @prop({ unique: true })
  public username?: string

  @prop({ unique: true })
  public userId?: number

  @prop()
  public base64EncodedAuthenticationKey?: string

  @prop()
  public authenticated?: boolean

  @prop({ type: KnownRoles, enum: KnownRoles })
  public roles?: KnownRoles[]

  @Type(() => String)
  @prop({ type: String })
  public permissions?: string[]

  @prop()
  public shouldRenewPassword?: boolean

  @prop()
  public token?: string
}

const UserModel =
  (mongoose.models?.users as Model<User>) ?? getModelForClass(User)

export default UserModel
