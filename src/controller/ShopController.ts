import AppSuccess from '../shared/AppSuccess';
import IShop from '../interface/IShop';
import ShopService from '../service/ShopService';
import { NextFunction, Request, Response } from 'express';

export default class ShopController {
  public static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Create shop ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IShop;
      await ShopService.save(data);
      return new AppSuccess('Item da loja criado com sucesso', 201).toJSON(
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
    console.log('Get all shops');
    try {
      return response.status(200).json(await ShopService.getAll());
    } catch (error) {
      next(error);
    }
  }

  public static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Get shop with id ${request.params.id}`);
    try {
      const { id } = request.params;
      return response.status(200).json(await ShopService.get(+id));
    } catch (error) {
      next(error);
    }
  }

  public static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(`Update shop ${JSON.stringify(request.body)}`);
    try {
      const data = request.body as IShop;
      await ShopService.update(data);
      return new AppSuccess('Item da loja atualizado com sucesso').toJSON(
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
    console.log(`Delete shop with id ${request.params.id}`);
    try {
      const { id } = request.params;
      await ShopService.delete(+id);
      return new AppSuccess('Item da loja excluído com sucesso').toJSON(
        response
      );
    } catch (error) {
      next(error);
    }
  }
}
