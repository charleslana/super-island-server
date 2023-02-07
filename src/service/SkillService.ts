import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import AppSuccess from '../shared/AppSuccess';
import ISkill from '../interface/ISkill';
import sequelize, { Optional } from 'sequelize';
import { SkillModel } from '../database/models/SkillModel';

export default class SkillService {
  public static async save(skill: ISkill): Promise<AppSuccess> {
    const count = await SkillModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', skill.name)
      ),
    });
    if (count) {
      throw new AppError(
        AppStatusEnum.SkillNameAlreadyExists,
        'Nome da habilidade já existe',
        400
      );
    }
    await SkillModel.create(skill as Optional<unknown, never>);
    return new AppSuccess(
      AppStatusEnum.SkillCreatedSuccess,
      'Habilidade criada com sucesso',
      201
    );
  }

  public static async getAll(): Promise<ISkill[]> {
    return (await SkillModel.findAll()) as ISkill[];
  }

  public static async get(id: number): Promise<ISkill> {
    return await this.getSkillById(id);
  }

  public static async update(skill: ISkill): Promise<AppSuccess> {
    await this.getSkillById(skill.id);
    const exist = (await SkillModel.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', skill.name)
      ),
    })) as ISkill;
    if (
      exist &&
      exist.name?.toLowerCase() === skill.name?.toLowerCase() &&
      exist.id !== skill.id
    ) {
      throw new AppError(
        AppStatusEnum.SkillNameAlreadyExists,
        'Nome da habilidade já existe',
        400
      );
    }
    await SkillModel.update(skill as Optional<unknown, never>, {
      where: {
        id: skill.id,
      },
    });
    return new AppSuccess(
      AppStatusEnum.SkillUpdatedSuccess,
      'Habilidade atualizada com sucesso'
    );
  }

  public static async delete(id: number): Promise<AppSuccess> {
    await this.getSkillById(id);
    await SkillModel.destroy({
      where: {
        id: id,
      },
    });
    return new AppSuccess(
      AppStatusEnum.SkillDeletedSuccess,
      'Habilidade excluída com sucesso'
    );
  }

  public static async getSkillById(id?: number): Promise<ISkill> {
    const exist = (await SkillModel.findOne({
      where: {
        id: id,
      },
    })) as ISkill;
    if (!exist) {
      throw new AppError(
        AppStatusEnum.SkillNotFound,
        'Habilidade não encontrada',
        404
      );
    }
    return exist;
  }
}
