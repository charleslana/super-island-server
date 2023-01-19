import AppError from '../shared/AppError';
import ICharacter from '../interface/ICharacter';
import { CharacterModel } from '../database/models/CharacterModel';
import { Optional } from 'sequelize';

export const save = async (character: ICharacter): Promise<void> => {
  const count = await CharacterModel.count({
    where: {
      name: character.name,
    },
  });
  if (count) {
    throw new AppError('Nome do personagem já existe', 400);
  }
  await CharacterModel.create(character as Optional<unknown, never>);
};

export const getAll = async (): Promise<ICharacter[]> => {
  return (await CharacterModel.findAll()) as ICharacter[];
};

export const get = async (id: number): Promise<ICharacter> => {
  return await getCharacterById(id);
};

export const update = async (character: ICharacter): Promise<void> => {
  await getCharacterById(character.id);
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
};

export const exclude = async (id: number): Promise<void> => {
  await getCharacterById(id);
  await CharacterModel.destroy({
    where: {
      id: id,
    },
  });
};

export const getCharacterById = async (id?: number): Promise<ICharacter> => {
  const exist = (await CharacterModel.findOne({
    where: {
      id: id,
    },
  })) as ICharacter;
  if (!exist) {
    throw new AppError('Personagem não encontrado', 404);
  }
  return exist;
};
