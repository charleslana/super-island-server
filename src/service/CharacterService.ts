import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import AppSuccess from '../shared/AppSuccess';
import ICharacter from '../interface/ICharacter';
import sequelize, { Optional } from 'sequelize';
import { CharacterModel } from '../database/models/CharacterModel';

export default class CharacterService {
  public static async save(character: ICharacter): Promise<AppSuccess> {
    const count = await CharacterModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', character.name)
      ),
    });
    if (count) {
      throw new AppError(
        AppStatusEnum.CharacterNameAlreadyExists,
        'Nome do personagem já existe',
        400
      );
    }
    await CharacterModel.create(character as Optional<unknown, never>);
    return new AppSuccess(
      AppStatusEnum.CharacterCreatedSuccess,
      'Personagem criado com sucesso',
      201
    );
  }

  public static async getAll(): Promise<ICharacter[]> {
    return (await CharacterModel.findAll()) as ICharacter[];
  }

  public static async get(id: number): Promise<ICharacter> {
    return await this.getCharacterById(id);
  }

  public static async update(character: ICharacter): Promise<AppSuccess> {
    await this.getCharacterById(character.id);
    const exist = (await CharacterModel.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', character.name)
      ),
    })) as ICharacter;
    if (
      exist &&
      exist.name?.toLowerCase() === character.name?.toLowerCase() &&
      exist.id !== character.id
    ) {
      throw new AppError(
        AppStatusEnum.CharacterNameAlreadyExists,
        'Nome do personagem já existe',
        400
      );
    }
    await CharacterModel.update(character as Optional<unknown, never>, {
      where: {
        id: character.id,
      },
    });
    return new AppSuccess(
      AppStatusEnum.CharacterUpdatedSuccess,
      'Personagem atualizado com sucesso'
    );
  }

  public static async delete(id: number): Promise<AppSuccess> {
    await this.getCharacterById(id);
    await CharacterModel.destroy({
      where: {
        id: id,
      },
    });
    return new AppSuccess(
      AppStatusEnum.CharacterDeletedSuccess,
      'Personagem excluído com sucesso'
    );
  }

  public static async getCharacterById(id?: number): Promise<ICharacter> {
    const exist = (await CharacterModel.findOne({
      where: {
        id: id,
      },
    })) as ICharacter;
    if (!exist) {
      throw new AppError(
        AppStatusEnum.CharacterNotFound,
        'Personagem não encontrado',
        404
      );
    }
    return exist;
  }
}
