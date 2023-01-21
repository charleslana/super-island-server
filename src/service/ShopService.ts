import AppError from '../shared/AppError';
import IShop from '../interface/IShop';
import ItemService from './ItemService';
import { ItemModel } from '../database/models/ItemModel';
import { Optional } from 'sequelize';
import { ShopModel } from '../database/models/ShopModel';

export default class ShopService {
  public static async save(shop: IShop): Promise<void> {
    await ItemService.getItemById(shop.itemId);
    await ShopModel.create(shop as Optional<unknown, never>);
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

  public static async update(shop: IShop): Promise<void> {
    await this.getShopById(shop.id);
    await ItemService.getItemById(shop.itemId);
    await ShopModel.update(shop as Optional<unknown, never>, {
      where: {
        id: shop.id,
      },
    });
  }

  public static async delete(id: number): Promise<void> {
    await this.getShopById(id);
    await ShopModel.destroy({
      where: {
        id: id,
      },
    });
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
      throw new AppError('Item da loja não encontrado', 404);
    }
    return exist;
  }
}
