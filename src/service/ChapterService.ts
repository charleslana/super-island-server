import AppError from '../shared/AppError';
import IChapter from '../interface/IChapter';
import sequelize, { Optional } from 'sequelize';
import { ChapterModel } from '../database/models/ChapterModel';

export default class ChapterService {
  public static async save(chapter: IChapter): Promise<void> {
    const count = await ChapterModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', chapter.name)
      ),
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

  public static async update(chapter: IChapter): Promise<void> {
    await this.getChapterById(chapter.id);
    const exist = (await ChapterModel.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', chapter.name)
      ),
    })) as IChapter;
    if (
      exist &&
      exist.name?.toLowerCase() === chapter.name?.toLowerCase() &&
      exist.id !== chapter.id
    ) {
      throw new AppError('Nome do capítulo já existe', 400);
    }
    await ChapterModel.update(chapter as Optional<unknown, never>, {
      where: {
        id: chapter.id,
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
