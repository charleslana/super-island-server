import AppError from '../shared/AppError';
import ItemService from './ItemService';
import UserService from './UserService';
import { ItemModel } from '../database/models/ItemModel';
import { UserItemModel } from '../database/models/UserItemModel';

export default class UserItemService {
  public static async save(userId: number, itemId: number): Promise<void> {
    await UserService.getUserById(userId);
    await ItemService.getItemById(itemId);
    await UserItemModel.create({
      userId: userId,
      itemId: itemId,
    });
  }

  public static async getAll(userId: number) {
    return await UserItemModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: ItemModel,
          as: 'item',
        },
      ],
    });
  }

  public static async get(id: number, userId: number) {
    const exist = await UserItemModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
      include: [
        {
          model: ItemModel,
          as: 'item',
        },
      ],
    });
    if (!exist) {
      throw new AppError('Item do usuário não encontrado', 404);
    }
    return exist;
  }
}
