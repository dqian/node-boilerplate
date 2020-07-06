import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'
import { UsersTable } from '~/packages/database/tables'

export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const users = await UsersTable
      .createQueryBuilder('user')
      .getMany()

    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({ hello: 'world' })
}
