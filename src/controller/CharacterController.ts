import CharacterService from '../service/CharacterService';
import ICharacter from '../interface/ICharacter';
import { NextFunction, Request, Response } from 'express';

export default class CharacterController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create character ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ICharacter;
      const app = await CharacterService.save(data);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    _request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log('Get all characters');
    try {
      return response.status(200).json(await CharacterService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get character with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await CharacterService.get(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Update character ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ICharacter;
      const app = await CharacterService.update(data);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Delete character with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const app = await CharacterService.delete(+id);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
