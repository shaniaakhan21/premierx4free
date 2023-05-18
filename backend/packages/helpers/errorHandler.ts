import { CustomReq } from '@models/user.model'
import { Response, NextFunction } from 'express'
import { ParamsDictionary, RequestHandler } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

export interface CustomRequestHandler<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2)
  (
    req: CustomReq<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ): Promise<any>
}

export default function ErrorHandler(fn: CustomRequestHandler): RequestHandler {
  const handler: RequestHandler = async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (e: any) {
      next(e)
    }
  }
  return (req, res, next) => handler(req, res, next)
}
