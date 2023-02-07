import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import AppSuccess from '../shared/AppSuccess';
import IShop from '../interface/IShop';
import ItemService from './ItemService';
import { ItemModel } from '../database/models/ItemModel';
import { Optional } from 'sequelize';
import { ShopModel } from '../database/models/ShopModel';

export default class ShopService {
  public static async save(shop: IShop): Promise<AppSuccess> {
    await ItemService.getItemById(shop.itemId);
    await ShopModel.create(shop as Optional<unknown, never>);
    return new AppSuccess(
      AppStatusEnum.ShopCreatedSuccess,
      'Item da loja criado com sucesso',
      201
    );
  }

  public static async getAll(): Promise<IShop[]> {
    return (await ShopModel.findAll({
      include: [
        {
          model: ItemModel,
          as: 'item',
        },
      ],
    })) as IShop[];
  }

  public static async get(id: number): Promise<IShop> {
    return await this.getShopById(id);
  }

  public static async update(shop: IShop): Promise<AppSuccess> {
    await this.getShopById(shop.id);
    await ItemService.getItemById(shop.itemId);
    await ShopModel.update(shop as Optional<unknown, never>, {
      where: {
        id: shop.id,
      },
    });
    return new AppSuccess(
      AppStatusEnum.ShopUpdatedSuccess,
      'Item da loja atualizado com sucesso'
    );
  }

  public static async delete(id: number): Promise<AppSuccess> {
    await this.getShopById(id);
    await ShopModel.destroy({
      where: {
        id: id,
      },
    });
    return new AppSuccess(
      AppStatusEnum.ShopDeletedSuccess,
      'Item da loja excluído com sucesso'
    );
  }

  private static async getShopById(id?: number): Promise<IShop> {
    const exist = (await ShopModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: ItemModel,
          as: 'item',
        },
      ],
    })) as IShop;
    if (!exist) {
      throw new AppError(
        AppStatusEnum.ShopNotFound,
        'Item da loja não encontrado',
        404
      );
    }
    return exist;
  }
}
