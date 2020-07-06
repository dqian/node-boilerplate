import { NextFunction, Request, Response } from 'express'
import config from '~/config';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { PassportAction } from '../../auth';
import { User } from '~/packages/database/models/user';
import * as httpStatus from 'http-status'

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    passport.authenticate(
      PassportAction.Login, 
      (err, user: User, info) => {
        if (err) {
          console.log(err);
        }
        if (info != undefined) {
          console.log(info.message);
          res.send(info.message);
        } else {
          req.logIn(user, err => {
            const token = jwt.sign({ id: user.id }, config.AUTH.TOKEN_SECRET);
            res.status(httpStatus.OK).send({
              auth: true,
              token: token,
              message: 'User authenticated.',
            });
          });
        }
      }
    )(req, res, next);
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    PassportAction.Register, 
    (err, user: User, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const token = jwt.sign({ id: user.id }, config.AUTH.TOKEN_SECRET);
          res.status(httpStatus.OK).send({
            auth: true,
            token: token,
            message: 'User registered and authenticated.',
            user: user.info(),
          });
        });
      }
    }
  )(req, res, next);
}
