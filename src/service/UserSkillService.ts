import AppError from '../shared/AppError';
import SkillService from './SkillService';
import UserCharacterService from './UserCharacterService';
import { SkillModel } from '../database/models/SkillModel';
import { UserSkillModel } from '../database/models/UserSkillModel';

export default class UserSkillService {
  public static async save(
    userCharacterId: number,
    skillId: number,
    userId: number
  ): Promise<void> {
    await UserCharacterService.get(userCharacterId, userId);
    await SkillService.getSkillById(skillId);
    await this.existUserSkillByUserCharacterId(userCharacterId, skillId);
    await UserSkillModel.create({
      userCharacterId: userCharacterId,
      skillId: skillId,
    });
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
        'Já existe a habilidade no personagem do usuário',
        400
      );
    }
  }
}
