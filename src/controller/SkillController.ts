import AppSuccess from '../shared/AppSuccess';
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
      await SkillService.save(data);
      return new AppSuccess('Habilidade criada com sucesso', 201).toJSON(
        response
      );
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
      await SkillService.update(data);
      return new AppSuccess('Habilidade atualizada com sucesso').toJSON(
        response
      );
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
      await SkillService.delete(+id);
      return new AppSuccess('Habilidade excluída com sucesso').toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
