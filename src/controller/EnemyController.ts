import AppSuccess from '../shared/AppSuccess';
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
      await EnemyService.save(data);
      return new AppSuccess('Inimigo criado com sucesso', 201).toJSON(response);
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
      await EnemyService.update(data);
      return new AppSuccess('Inimigo atualizado com sucesso').toJSON(response);
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
      await EnemyService.delete(+id);
      return new AppSuccess('Inimigo excluído com sucesso').toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
