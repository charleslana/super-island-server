import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import AppSuccess from '../shared/AppSuccess';
import SkillService from './SkillService';
import UserCharacterService from './UserCharacterService';
import { SkillModel } from '../database/models/SkillModel';
import { UserSkillModel } from '../database/models/UserSkillModel';

export default class UserSkillService {
  public static async save(
    userCharacterId: number,
    skillId: number,
    userId: number
  ): Promise<AppSuccess> {
    await UserCharacterService.get(userCharacterId, userId);
    await SkillService.getSkillById(skillId);
    await this.existUserSkillByUserCharacterId(userCharacterId, skillId);
    await UserSkillModel.create({
      userCharacterId: userCharacterId,
      skillId: skillId,
    });
    return new AppSuccess(
      AppStatusEnum.UserSkillCreatedSuccess,
      'Habilidade do personagem do usuário criada com sucesso',
      201
    );
  }

  public static async getAll(userCharacterId: number, userId: number) {
    await UserCharacterService.get(userCharacterId, userId);
    return await UserSkillModel.findAll({
      where: {
        userCharacterId: userCharacterId,
      },
      include: [
        {
          model: SkillModel,
          as: 'skill',
        },
      ],
    });
  }

  public static async get(userCharacterId: number, id: number, userId: number) {
    await UserCharacterService.get(userCharacterId, userId);
    const exist = await UserSkillModel.findOne({
      where: {
        id: id,
        userCharacterId: userCharacterId,
      },
      include: [
        {
          model: SkillModel,
          as: 'skill',
        },
      ],
    });
    if (!exist) {
      throw new AppError(
        AppStatusEnum.UserSkillNotFound,
        'Habilidade do personagem do usuário não encontrada',
        404
      );
    }
    return exist;
  }

  private static async existUserSkillByUserCharacterId(
    userCharacterId: number,
    skillId: number
  ) {
    const count = await UserSkillModel.count({
      where: {
        userCharacterId: userCharacterId,
        skillId: skillId,
      },
    });
    if (count) {
      throw new AppError(
        AppStatusEnum.UserSkillAlreadyExists,
        'Já existe a habilidade no personagem do usuário',
        400
      );
    }
  }
}
