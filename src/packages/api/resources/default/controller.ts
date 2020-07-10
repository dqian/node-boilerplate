import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'
import { getConnection } from 'typeorm';
import { User } from '~/packages/database/models/user';

export const health = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const UsersTable = getConnection().getRepository(User);
  const totalUsers = await UsersTable.createQueryBuilder().getCount();
  
  return res.status(httpStatus.OK).json({ 
    status: 'OK',
    version: 0.1,
    c: totalUsers
  });
}
