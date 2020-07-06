import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'

export const health = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  return res.status(200).json({ status: 'OK' })
}
