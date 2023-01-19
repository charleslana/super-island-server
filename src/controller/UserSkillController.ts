import AppSuccess from '../shared/AppSuccess';
import UserSkillService from '../service/UserSkillService';
import { NextFunction, Request, Response } from 'express';

export default class UserSkillController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create user character skill ${JSON.stringify(request.body)}`);
    try {
      const { userCharacterId, skillId } = request.body;
      await UserSkillService.save(userCharacterId, skillId, request.user.id);
      return new AppSuccess(
        'Habilidade do personagem do usuário criada com sucesso',
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
    console.log('Get all user character skills');
    try {
      const { id } = request.params;
      return response
        .status(200)
        .json(await UserSkillService.getAll(+id, request.user.id));
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get user character skill ${request.params}`);
    try {
      const { id, userCharacterId } = request.params;
      return response
        .status(200)
        .json(
          await UserSkillService.get(+userCharacterId, +id, request.user.id)
        );
    } catch (error) {
      next(error);
    }
  }
}
