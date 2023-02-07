import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import DecodeType from '../types/decode.type';
import IUser from '../interface/IUser';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../database/models/UserModel';

const handleUnauthorizedError = (next: NextFunction) => {
  const error: AppError = new AppError(
    AppStatusEnum.AccessDenied,
    'Acesso negado',
    401
  );
  next(error);
};

const authenticateMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    const authHeader = request.get('Authorization');
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET as string);
        if (decode) {
          const { user } = decode as DecodeType;
          const userLogged = (await UserModel.findOne({
            where: {
              id: user.id,
              authToken: user.authToken,
            },
          })) as IUser;
          if (!userLogged) {
            return handleUnauthorizedError(next);
          }
          request.user = {
            id: user.id as number,
            role: user.role as unknown as string,
          };
          return next();
        }
        return handleUnauthorizedError(next);
      }
      return handleUnauthorizedError(next);
    }
    return handleUnauthorizedError(next);
  } catch (error) {
    handleUnauthorizedError(next);
  }
};

export default authenticateMiddleware;
