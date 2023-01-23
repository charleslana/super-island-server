import AppError from '../shared/AppError';
import IChapter from '../interface/IChapter';
import { ChapterModel } from '../database/models/ChapterModel';
import { Optional } from 'sequelize';

export default class ChapterService {
  public static async save(chapter: IChapter): Promise<void> {
    const count = await ChapterModel.count({
      where: {
        name: chapter.name,
      },
    });
    if (count) {
      throw new AppError('Nome do capítulo já existe', 400);
    }
    await ChapterModel.create(chapter as Optional<unknown, never>);
  }

  public static async getAll(): Promise<IChapter[]> {
    return (await ChapterModel.findAll()) as IChapter[];
  }

  public static async get(id: number): Promise<IChapter> {
    return await this.getChapterById(id);
  }

  public static async update(item: IChapter): Promise<void> {
    await this.getChapterById(item.id);
    const exist = (await ChapterModel.findOne({
      where: {
        name: item.name,
      },
    })) as IChapter;
    if (exist && exist.name === item.name && exist.id !== item.id) {
      throw new AppError('Nome do capítulo já existe', 400);
    }
    await ChapterModel.update(item as Optional<unknown, never>, {
      where: {
        id: item.id,
      },
    });
  }

  public static async delete(id: number): Promise<void> {
    await this.getChapterById(id);
    await ChapterModel.destroy({
      where: {
        id: id,
      },
    });
  }

  public static async getChapterById(id?: number): Promise<IChapter> {
    const exist = (await ChapterModel.findOne({
      where: {
        id: id,
      },
    })) as IChapter;
    if (!exist) {
      throw new AppError('Capítulo não encontrado', 404);
    }
    return exist;
  }
}
