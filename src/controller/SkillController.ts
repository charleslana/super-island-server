import ISkill from '../interface/ISkill';
import SkillService from '../service/SkillService';
import { NextFunction, Request, Response } from 'express';

export default class SkillController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create skill ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ISkill;
      const app = await SkillService.save(data);
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
    console.log('Get all skills');
    try {
      return response.status(200).json(await SkillService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get skill with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await SkillService.get(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Update skill ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as ISkill;
      const app = await SkillService.update(data);
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
    console.log(`Delete skill with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const app = await SkillService.delete(+id);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
