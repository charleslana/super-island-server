import AppSuccess from '../shared/AppSuccess';
import UserItemService from '../service/UserItemService';
import { NextFunction, Request, Response } from 'express';

export default class UserItemController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create user item ${JSON.stringify(request.body)}`);
    try {
      const { userId, itemId } = request.body;
      await UserItemService.save(userId, itemId);
      return new AppSuccess('Item do usuário criado com sucesso', 201).toJSON(
        response
      );
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log('Get all user items');
    try {
      return response
        .status(200)
        .json(await UserItemService.getAll(request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get user item with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await UserItemService.get(+id, request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
