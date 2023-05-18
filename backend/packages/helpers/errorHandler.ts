import { CustomReq } from '@models/user.model'
import { Response, NextFunction } from 'express'
import { ParamsDictionary, RequestHandler } from 'express-serve-static-core'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as HttpStatus from 'http-status'
import { ParsedQs } from 'qs'

export class RecordAlreadyExistsError extends Error {
  status = HttpStatus.CONFLICT

  message = 'Record already exists'
}

export class RecordNotFoundError extends Error {
  status = HttpStatus.NOT_FOUND

  message = 'Resource not found'
}

export class UnauthorizedError extends Error {
  status = HttpStatus.UNAUTHORIZED

  message = 'Unauthorized'
}

export class APINotImplementedError extends Error {
  status = HttpStatus.NOT_IMPLEMENTED

  message = 'API not implemented'
}

export class InvalidRequestError extends Error {
  status = HttpStatus.BAD_REQUEST

  message = 'Invalid request'
}

export class UnhandledError extends Error {
  status = HttpStatus.INTERNAL_SERVER_ERROR

  message = 'Unhandled error'
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
        message: e.message || 'Unhandled error'
      })
    }
  }
  return (req, res, next) => handler(req, res, next)
}
