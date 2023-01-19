import AppSuccess from '../shared/AppSuccess';
import UserService from '../service/UserService';
import { NextFunction, Request, Response } from 'express';

export default class UserController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create user with email ${JSON.stringify(request.body.email)}`);
    try {
      const { email, password, name } = request.body;
      await UserService.save({
        email,
        password,
        name,
      });
      return new AppSuccess('Usuário criado com sucesso', 201).toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    _request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log('Get all users');
    try {
      return response.status(200).json(await UserService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get user with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await UserService.get(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async changeName(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Update user name with ${JSON.stringify(request.body)}`);
    try {
      const { name } = request.body;
      await UserService.updateName({
        id: request.user.id,
        name,
      });
      return new AppSuccess('Usuário atualizado com sucesso').toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async login(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Authenticate user with email ${request.body.email}`);
    try {
      const { email, password } = request.body;
      return response
        .status(200)
        .json(await UserService.authenticate(email, password));
    } catch (error) {
      next(error);
    }
  }

  public static async detail(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log('Get user detail');
    try {
      return response.status(200).json(await UserService.get(request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async changePassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log('Change user password');
    try {
      const { currentPassword, newPassword } = request.body;
      await UserService.updatePassword(
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
  }
}
