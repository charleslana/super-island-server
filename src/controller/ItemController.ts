import AppSuccess from '../shared/AppSuccess';
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
      await ItemService.save(data);
      return new AppSuccess('Item criado com sucesso', 201).toJSON(response);
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
      await ItemService.update(data);
      return new AppSuccess('Item atualizado com sucesso').toJSON(response);
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
      await ItemService.delete(+id);
      return new AppSuccess('Item excluído com sucesso').toJSON(response);
    } catch (error) {
      next(error);
    }
  }
}
