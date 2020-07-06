import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'
import * as passport from 'passport';
import { PassportAction } from '../../auth';
import { User } from '~/packages/database/models/user';

export const info = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  passport.authenticate(PassportAction.JWT, { session: false }, (err, user: User, info) => {
    if (err) {
      console.log(err);
    }
    if (info != undefined) {
      console.log(info.message);
      res.send(info.message);
    } else {
      res.status(httpStatus.OK).send(user.info());
    }
  })(req, res, next);
}
