import { CustomReq } from '@models/user.model'
import { Response, NextFunction } from 'express'
import { ParamsDictionary, RequestHandler } from 'express-serve-static-core'
import * as HttpStatus from 'http-status'
import { ParsedQs } from 'qs'

export class RecordAlreadyExistsError extends Error {
  status = HttpStatus.CONFLICT

  publicMessage = 'Record already exists'
}

export class RecordNotFoundError extends Error {
  status = HttpStatus.NOT_FOUND

  publicMessage = 'Resource not found'
}

export class UnauthorizedError extends Error {
  status = HttpStatus.UNAUTHORIZED

  publicMessage = 'Unauthorized'
}

export class APINotImplementedError extends Error {
  status = HttpStatus.NOT_IMPLEMENTED

  publicMessage = 'API not implemented'
}

export class InvalidRequestError extends Error {
  status = HttpStatus.BAD_REQUEST

  publicMessage = 'Invalid request'
}

export class UnhandledError extends Error {
  status = HttpStatus.INTERNAL_SERVER_ERROR

  publicMessage = 'Unhandled error'
}

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
      res.json({
        success: false,
        status: e.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.publicMessage || 'Unhandled error',
        ...(process.env.NODE_ENV === 'development' ? { error: e.message } : {})
      })
      console.error(e)
    }
  }
  return (req, res, next) => handler(req, res, next)
}
