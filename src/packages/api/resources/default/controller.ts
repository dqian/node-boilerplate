import { Request, Response } from 'express'
import * as httpStatus from 'http-status'
import { getConnection } from 'typeorm'
import { User } from '~/packages/database/models/user'
import logger from '~/packages/api/helpers/logging'

export const health = async (req: Request, res: Response): Promise<Response> => {
  const UsersTable = getConnection().getRepository(User)
  const numUsers = await UsersTable.createQueryBuilder().getCount()
  
  logger.log({
    level: 'info', 
    message: 'Health check', 
    data: `numUsers: ${numUsers}`,
  })

  return res.status(httpStatus.OK).json({ 
    status: 'OK',
    version: 0.1,
    c: numUsers
  })
}
