import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import AppSuccess from '../shared/AppSuccess';
import ItemService from './ItemService';
import UserService from './UserService';
import { ItemModel } from '../database/models/ItemModel';
import { UserItemModel } from '../database/models/UserItemModel';

export default class UserItemService {
  public static async save(
    userId: number,
    itemId: number
  ): Promise<AppSuccess> {
    await UserService.getUserById(userId);
    await ItemService.getItemById(itemId);
    await UserItemModel.create({
      userId: userId,
      itemId: itemId,
    });
    return new AppSuccess(
      AppStatusEnum.UserItemCreatedSuccess,
      'Item do usuário criado com sucesso',
      201
    );
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
      throw new AppError(
        AppStatusEnum.UserItemNotFound,
        'Item do usuário não encontrado',
        404
      );
    }
    return exist;
  }
}
