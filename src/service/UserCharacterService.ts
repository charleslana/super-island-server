import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import AppSuccess from '../shared/AppSuccess';
import CharacterService from './CharacterService';
import UserService from './UserService';
import { CharacterModel } from '../database/models/CharacterModel';
import { SkillModel } from '../database/models/SkillModel';
import { UserCharacterModel } from '../database/models/UserCharacterModel';
import { UserSkillModel } from '../database/models/UserSkillModel';

export default class UserCharacterService {
  public static async save(
    userId: number,
    characterId: number
  ): Promise<AppSuccess> {
    await UserService.getUserById(userId);
    await CharacterService.getCharacterById(characterId);
    await this.existUserCharacterByUserId(userId, characterId);
    await UserCharacterModel.create({
      userId: userId,
      characterId: characterId,
    });
    return new AppSuccess(
      AppStatusEnum.UserCharacterCreatedSuccess,
      'Personagem do usuário criado com sucesso',
      201
    );
  }

  public static async getAll(userId: number) {
    return await UserCharacterModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
      ],
    });
  }

  public static async get(id: number, userId: number) {
    const exist = await UserCharacterModel.findOne({
      where: {
        id: id,
        userId: userId,
      },
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
        {
          model: UserSkillModel,
          as: 'skills',
          include: [
            {
              model: SkillModel,
              as: 'skill',
            },
          ],
        },
      ],
    });
    if (!exist) {
      throw new AppError(
        AppStatusEnum.UserCharacterNotFound,
        'Personagem do usuário não encontrado',
        404
      );
    }
    return exist;
  }

  private static async existUserCharacterByUserId(
    userId?: number,
    characterId?: number
  ): Promise<void> {
    const count = await UserCharacterModel.count({
      where: {
        userId: userId,
        characterId: characterId,
      },
    });
    if (count) {
      throw new AppError(
        AppStatusEnum.UserCharacterAlreadyExists,
        'Já existe o personagem na conta do usuário',
        400
      );
    }
  }
}
