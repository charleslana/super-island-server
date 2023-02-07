import IItem from '../interface/IItem';
import ItemService from '../service/ItemService';
import { NextFunction, Request, Response } from 'express';

export default class ItemController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create item ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IItem;
      const app = await ItemService.save(data);
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
    console.log('Get all items');
    try {
      return response.status(200).json(await ItemService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get item with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await ItemService.get(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Update item ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IItem;
      const app = await ItemService.update(data);
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
    console.log(`Delete item with id ${request.params.id}`);
    try {
      const { id } = request.params;
      const app = await ItemService.delete(+id);
      return app.toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
