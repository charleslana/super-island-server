import AppError from '../shared/AppError';
import IItem from '../interface/IItem';
import sequelize, { Optional } from 'sequelize';
import { ItemModel } from '../database/models/ItemModel';

export default class ItemService {
  public static async save(item: IItem): Promise<void> {
    const count = await ItemModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', item.name)
      ),
    });
    if (count) {
      throw new AppError('Nome do item já existe', 400);
    }
    await ItemModel.create(item as Optional<unknown, never>);
  }

  public static async getAll(): Promise<IItem[]> {
    return (await ItemModel.findAll()) as IItem[];
  }

  public static async get(id: number): Promise<IItem> {
    return await this.getItemById(id);
  }

  public static async update(item: IItem): Promise<void> {
    await this.getItemById(item.id);
    const exist = (await ItemModel.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', item.name)
      ),
    })) as IItem;
    if (
      exist &&
      exist.name?.toLowerCase() === item.name?.toLowerCase() &&
      exist.id !== item.id
    ) {
      throw new AppError('Nome do item já existe', 400);
    }
    await ItemModel.update(item as Optional<unknown, never>, {
      where: {
        id: item.id,
      },
    });
  }

  public static async delete(id: number): Promise<void> {
    await this.getItemById(id);
    await ItemModel.destroy({
      where: {
        id: id,
      },
    });
  }

  public static async getItemById(id?: number): Promise<IItem> {
    const exist = (await ItemModel.findOne({
      where: {
        id: id,
      },
    })) as IItem;
    if (!exist) {
      throw new AppError('Item não encontrado', 404);
    }
    return exist;
  }
}
