import AppSuccess from '../shared/AppSuccess';
import { NextFunction, Request, Response } from 'express';
import {
  authenticate,
  get,
  getAll,
  save,
  updateName,
  updatePassword,
} from '../service/user.service';

export const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`Create user with email ${JSON.stringify(request.body.email)}`);
  try {
    const { email, password, name } = request.body;
    await save({
      email,
      password,
      name,
    });
    return new AppSuccess('Usuário criado com sucesso', 201).toJSON(response);
  } catch (error) {
    next(error);
  }
};

export const findAll = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('Get all users');
  try {
    return response.status(200).json(await getAll());
  } catch (error) {
    next(error);
  }
};

export const findOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`Get user with id ${request.params.id}`);
  try {
    const { id } = request.params;
    return response.status(200).json(await get(+id));
  } catch (error) {
    next(error);
  }
};

export const changeName = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`Update user name with ${JSON.stringify(request.body)}`);
  try {
    const { name } = request.body;
    await updateName({
      id: request.user.id,
      name,
    });
    return new AppSuccess('Usuário atualizado com sucesso').toJSON(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`Authenticate user with email ${request.body.email}`);
  try {
    const { email, password } = request.body;
    return response.status(200).json(await authenticate(email, password));
  } catch (error) {
    next(error);
  }
};

export const detail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('Get user detail');
  try {
    return response.status(200).json(await get(request.user.id));
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('Change user password');
  try {
    const { currentPassword, newPassword } = request.body;
    await updatePassword(
      {
        currentPassword,
        newPassword,
      },
      request.user.id
    );
    return new AppSuccess('Senha atualizada com sucesso').toJSON(response);
  } catch (error) {
    next(error);
  }
};
