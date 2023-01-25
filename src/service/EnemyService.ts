import AppError from '../shared/AppError';
import CharacterService from './CharacterService';
import IEnemy from '../interface/IEnemy';
import PhaseService from './PhaseService';
import { CharacterModel } from '../database/models/CharacterModel';
import { EnemyModel } from '../database/models/EnemyModel';
import { Optional } from 'sequelize';

export default class EnemyService {
  public static async save(enemy: IEnemy): Promise<void> {
    await PhaseService.getPhaseById(enemy.phaseId);
    await CharacterService.getCharacterById(enemy.characterId);
    await EnemyModel.create(enemy as Optional<unknown, never>);
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
      ],
    })) as IEnemy[];
  }

  public static async get(id: number): Promise<IEnemy> {
    return await this.getEnemyById(id);
  }

  public static async update(enemy: IEnemy): Promise<void> {
    await this.getEnemyById(enemy.id);
    await PhaseService.getPhaseById(enemy.phaseId);
    await CharacterService.getCharacterById(enemy.characterId);
    await EnemyModel.update(enemy as Optional<unknown, never>, {
      where: {
        id: enemy.id,
      },
    });
  }

  public static async delete(id: number): Promise<void> {
    await this.getEnemyById(id);
    await EnemyModel.destroy({
      where: {
        id: id,
      },
    });
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
      ],
    })) as IEnemy;
    if (!exist) {
      throw new AppError('Inimigo não encontrado', 404);
    }
    return exist;
  }
}
