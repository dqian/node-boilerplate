import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'
import logger from '~/packages/api/helpers/logging'
import config from '~/config'

interface IErrorResponse {
  code: number
  message: string
}

export const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  let response: IErrorResponse = {
    code: httpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error',
  }

  if (config.NODE_ENV === 'local') {
    console.error(`${response.code} ${response.message}`, { url: req.originalUrl })
    console.error(err);
  } else {
    logger.error(`${response.code} ${response.message}`, { url: req.originalUrl })
    logger.error(err);
  }
  
  return res
    .status(response.code)
    .json(response)
    .end()
}
