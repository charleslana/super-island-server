import AppSuccess from '../shared/AppSuccess';
import ICharacter from '../interface/ICharacter';
import { NextFunction, Request, Response } from 'express';
import {
  exclude,
  get,
  getAll,
  save,
  update,
} from '../service/character.service';

export const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`Create character ${JSON.stringify(request.body)}`);
  try {
    const data = request.body as ICharacter;
    await save(data);
    return new AppSuccess('Personagem criado com sucesso', 201).toJSON(
      response
    );
  } catch (error) {
    next(error);
  }
};

export const findAll = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('Get all characters');
  try {
    return response.status(200).json(await getAll());
  } catch (error) {
    next(error);
  }
};

export const findOne = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`Get character with id ${request.params.id}`);
  try {
    const { id } = request.params;
    return response.status(200).json(await get(+id));
  } catch (error) {
    next(error);
  }
};

export const change = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`Update character ${JSON.stringify(request.body)}`);
  try {
    const data = request.body as ICharacter;
    await update(data);
    return new AppSuccess('Personagem atualizado com sucesso').toJSON(response);
  } catch (error) {
    next(error);
  }
};

export const erase = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`Delete character with id ${request.params.id}`);
  try {
    const { id } = request.params;
    await exclude(+id);
    return new AppSuccess('Personagem excluído com sucesso').toJSON(response);
  } catch (error) {
    next(error);
  }
};
