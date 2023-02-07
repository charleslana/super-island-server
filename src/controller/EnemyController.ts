import EnemyService from '../service/EnemyService';
import IEnemy from '../interface/IEnemy';
import { NextFunction, Request, Response } from 'express';

export default class EnemyController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create enemy ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IEnemy;
      const app = await EnemyService.save(data);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log('Get all phase enemies');
    try {
      const { id } = request.params;
      return response.status(200).json(await EnemyService.getAll(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get enemy with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await EnemyService.get(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Update enemy ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IEnemy;
      const app = await EnemyService.update(data);
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
    console.log(`Delete enemy with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const app = await EnemyService.delete(+id);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
