import * as httpStatus from 'http-status'

export const info = async (req, res, next): Promise<any> => {
  res.status(httpStatus.OK).send(req.user.info())
}
