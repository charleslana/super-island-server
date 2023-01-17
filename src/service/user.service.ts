import AppError from '../shared/AppError';
import IAuthenticate from '../interface/IAuthenticate';
import IPassword from '../interface/IPassword';
import IUser from '../interface/IUser';
import jwt from 'jsonwebtoken';
import RoleEnum from '../enum/RoleEnum';
import Utils from '../utils/Utils';
import { Optional } from 'sequelize';
import { UserModel } from '../database/models/UserModel';

export const save = async (user: IUser): Promise<void> => {
  const count = await UserModel.count({
    where: {
      email: user.email,
    },
  });
  if (count) {
    throw new AppError('E-mail do usuário já está cadastrado', 400);
  }
  user.password = Utils.encrypt(user.password as string);
  await UserModel.create(user as Optional<unknown, never>);
};

export const getAll = async (): Promise<IUser[]> => {
  return (await UserModel.findAll({
    attributes: { exclude: ['password'] },
  })) as IUser[];
};

export const get = async (id: number): Promise<IUser> => {
  return await getUserById(id);
};

export const updateName = async (user: IUser): Promise<void> => {
  await getUserById(user.id);
  const exist = (await UserModel.findOne({
    where: {
      name: user.name,
    },
  })) as IUser;
  if (exist && exist.name === user.name && exist.id !== user.id) {
    throw new AppError('Nome do usuário já está cadastrado', 400);
  }
  await UserModel.update(
    {
      name: user.name,
    },
    {
      where: {
        id: user.id,
      },
    }
  );
};

export const authenticate = async (
  email: string,
  password: string
): Promise<IAuthenticate> => {
  const user = (await UserModel.findOne({
    where: {
      email: email,
    },
  })) as IUser;
  if (!user) {
    throw new AppError('Login ou senha inválidas', 404);
  }
  if (!Utils.decrypt(password, user.password as string)) {
    throw new AppError('Login ou senha inválidas', 404);
  }
  if (user.role === RoleEnum.Banned) {
    throw new AppError('A conta está banida', 401);
  }
  const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string, {
    expiresIn: '1d',
  });
  return {
    accessToken: token,
    role: user.role as RoleEnum,
    email: user.email as string,
  };
};

export const getUserById = async (id?: number): Promise<IUser> => {
  const exist = (await UserModel.findOne({
    where: {
      id: id,
    },
    attributes: { exclude: ['password'] },
  })) as IUser;
  if (!exist) {
    throw new AppError('Usuário não encontrado', 404);
  }
  return exist;
};

export const updatePassword = async (
  password: IPassword,
  id: number
): Promise<void> => {
  const user = (await UserModel.findOne({
    where: {
      id: id,
    },
  })) as IUser;
  if (!Utils.decrypt(password.currentPassword, user.password as string)) {
    throw new AppError('Senha atual inválida', 400);
  }
  await UserModel.update(
    {
      password: Utils.encrypt(password.newPassword),
    },
    {
      where: {
        id: user.id,
      },
    }
  );
};
