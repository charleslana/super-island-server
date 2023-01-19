import AppSuccess from '../shared/AppSuccess';
import UserCharacterService from '../service/UserCharacterService';
import { NextFunction, Request, Response } from 'express';

export default class UserCharacterController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create user character ${JSON.stringify(request.body)}`);
    try {
      const { userId, characterId } = request.body;
      await UserCharacterService.save(userId, characterId);
      return new AppSuccess(
        'Personagem do usuário criado com sucesso',
        201
      ).toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log('Get all user characters');
    try {
      return response
        .status(200)
        .json(await UserCharacterService.getAll(request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get user character with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await UserCharacterService.get(+id, request.user.id));
    } catch (error) {
      next(error);
    }
  }
}
