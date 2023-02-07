import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import AppSuccess from '../shared/AppSuccess';
import CharacterService from './CharacterService';
import IEnemy from '../interface/IEnemy';
import PhaseService from './PhaseService';
import { CharacterModel } from '../database/models/CharacterModel';
import { EnemyModel } from '../database/models/EnemyModel';
import { Optional } from 'sequelize';
import { PhaseModel } from '../database/models/PhaseModel';

export default class EnemyService {
  public static async save(enemy: IEnemy): Promise<AppSuccess> {
    await PhaseService.getPhaseById(enemy.phaseId);
    await CharacterService.getCharacterById(enemy.characterId);
    await EnemyModel.create(enemy as Optional<unknown, never>);
    return new AppSuccess(
      AppStatusEnum.EnemyCreatedSuccess,
      'Inimigo criado com sucesso',
      201
    );
  }

  public static async getAll(phaseId: number): Promise<IEnemy[]> {
    return (await EnemyModel.findAll({
      where: {
        phaseId: phaseId,
      },
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
        {
          model: PhaseModel,
          as: 'phase',
        },
      ],
    })) as IEnemy[];
  }

  public static async get(id: number): Promise<IEnemy> {
    return await this.getEnemyById(id);
  }

  public static async update(enemy: IEnemy): Promise<AppSuccess> {
    await this.getEnemyById(enemy.id);
    await PhaseService.getPhaseById(enemy.phaseId);
    await CharacterService.getCharacterById(enemy.characterId);
    await EnemyModel.update(enemy as Optional<unknown, never>, {
      where: {
        id: enemy.id,
      },
    });
    return new AppSuccess(
      AppStatusEnum.EnemyUpdatedSuccess,
      'Inimigo atualizado com sucesso'
    );
  }

  public static async delete(id: number): Promise<AppSuccess> {
    await this.getEnemyById(id);
    await EnemyModel.destroy({
      where: {
        id: id,
      },
    });
    return new AppSuccess(
      AppStatusEnum.EnemyDeletedSuccess,
      'Inimigo excluído com sucesso'
    );
  }

  private static async getEnemyById(id?: number): Promise<IEnemy> {
    const exist = (await EnemyModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: CharacterModel,
          as: 'character',
        },
        {
          model: PhaseModel,
          as: 'phase',
        },
      ],
    })) as IEnemy;
    if (!exist) {
      throw new AppError(
        AppStatusEnum.EnemyNotFound,
        'Inimigo não encontrado',
        404
      );
    }
    return exist;
  }
}
