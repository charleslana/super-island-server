import IPhase from '../interface/IPhase';
import PhaseService from '../service/PhaseService';
import { NextFunction, Request, Response } from 'express';

export default class PhaseController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create phase ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IPhase;
      const app = await PhaseService.save(data);
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
    console.log('Get all chapter phases');
    try {
      const { id } = request.params;
      return response.status(200).json(await PhaseService.getAll(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get phase with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await PhaseService.get(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Update phase ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IPhase;
      const app = await PhaseService.update(data);
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
    console.log(`Delete phase with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const app = await PhaseService.delete(+id);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
