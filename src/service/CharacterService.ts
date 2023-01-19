import AppError from '../shared/AppError';
import ICharacter from '../interface/ICharacter';
import { CharacterModel } from '../database/models/CharacterModel';
import { Optional } from 'sequelize';

export default class CharacterService {
  public static async save(character: ICharacter): Promise<void> {
    const count = await CharacterModel.count({
      where: {
        name: character.name,
      },
    });
    if (count) {
      throw new AppError('Nome do personagem já existe', 400);
    }
    await CharacterModel.create(character as Optional<unknown, never>);
  }

  public static async getAll(): Promise<ICharacter[]> {
    return (await CharacterModel.findAll()) as ICharacter[];
  }

  public static async get(id: number): Promise<ICharacter> {
    return await this.getCharacterById(id);
  }

  public static async update(character: ICharacter): Promise<void> {
    await this.getCharacterById(character.id);
    const exist = (await CharacterModel.findOne({
      where: {
        name: character.name,
      },
    })) as ICharacter;
    if (exist && exist.name === character.name && exist.id !== character.id) {
      throw new AppError('Nome do personagem já existe', 400);
    }
    await CharacterModel.update(character as Optional<unknown, never>, {
      where: {
        id: character.id,
      },
    });
  }

  public static async delete(id: number): Promise<void> {
    await this.getCharacterById(id);
    await CharacterModel.destroy({
      where: {
        id: id,
      },
    });
  }

  public static async getCharacterById(id?: number): Promise<ICharacter> {
    const exist = (await CharacterModel.findOne({
      where: {
        id: id,
      },
    })) as ICharacter;
    if (!exist) {
      throw new AppError('Personagem não encontrado', 404);
    }
    return exist;
  }
}
