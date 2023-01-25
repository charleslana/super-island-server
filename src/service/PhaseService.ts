import AppError from '../shared/AppError';
import ChapterService from './ChapterService';
import IPhase from '../interface/IPhase';
import { Optional } from 'sequelize';
import { PhaseModel } from '../database/models/PhaseModel';

export default class PhaseService {
  public static async save(phase: IPhase): Promise<void> {
    await ChapterService.getChapterById(phase.chapterId);
    const count = await PhaseModel.count({
      where: {
        name: phase.name,
      },
    });
    if (count) {
      throw new AppError('Nome da fase já existe', 400);
    }
    await PhaseModel.create(phase as Optional<unknown, never>);
  }

  public static async getAll(chapterId: number): Promise<IPhase[]> {
    return (await PhaseModel.findAll({
      where: {
        chapterId: chapterId,
      },
    })) as IPhase[];
  }

  public static async get(id: number): Promise<IPhase> {
    return await this.getPhaseById(id);
  }

  public static async update(phase: IPhase): Promise<void> {
    await this.getPhaseById(phase.id);
    await ChapterService.getChapterById(phase.chapterId);
    const exist = (await PhaseModel.findOne({
      where: {
        name: phase.name,
      },
    })) as IPhase;
    if (exist && exist.name === phase.name && exist.id !== phase.id) {
      throw new AppError('Nome da fase já existe', 400);
    }
    await PhaseModel.update(phase as Optional<unknown, never>, {
      where: {
        id: phase.id,
      },
    });
  }

  public static async delete(id: number): Promise<void> {
    await this.getPhaseById(id);
    await PhaseModel.destroy({
      where: {
        id: id,
      },
    });
  }

  public static async getPhaseById(id?: number): Promise<IPhase> {
    const exist = (await PhaseModel.findOne({
      where: {
        id: id,
      },
    })) as IPhase;
    if (!exist) {
      throw new AppError('Fase não encontrada', 404);
    }
    return exist;
  }
}
