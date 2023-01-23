import AppSuccess from '../shared/AppSuccess';
import ChapterService from '../service/ChapterService';
import IChapter from '../interface/IChapter';
import { NextFunction, Request, Response } from 'express';

export default class ChapterController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create chapter ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IChapter;
      await ChapterService.save(data);
      return new AppSuccess('Capítulo criado com sucesso', 201).toJSON(
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
    console.log('Get all chapters');
    try {
      return response.status(200).json(await ChapterService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get chapter with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await ChapterService.get(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Update chapter ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IChapter;
      await ChapterService.update(data);
      return new AppSuccess('Capítulo atualizado com sucesso').toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  public static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Delete chapter with id ${request.params.id}`);
    try {
      const { id } = request.params;
      await ChapterService.delete(+id);
      return new AppSuccess('Capítulo excluído com sucesso').toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
