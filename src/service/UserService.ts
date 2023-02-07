import AppError from '../shared/AppError';
import AppStatusEnum from '../enum/AppStatusEnum';
import AppSuccess from '../shared/AppSuccess';
import IAuthenticate from '../interface/IAuthenticate';
import IPassword from '../interface/IPassword';
import IUser from '../interface/IUser';
import jwt from 'jsonwebtoken';
import RoleEnum from '../enum/RoleEnum';
import sequelize, { Optional } from 'sequelize';
import UserCharacterService from './UserCharacterService';
import UserItemService from './UserItemService';
import Utils from '../utils/Utils';
import { UserModel } from '../database/models/UserModel';

export default class UserService {
  public static async save(user: IUser): Promise<AppSuccess> {
    const count = await UserModel.count({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('email')),
        sequelize.fn('lower', user.email)
      ),
    });
    if (count) {
      throw new AppError(
        AppStatusEnum.UserEmailAlreadyExists,
        'E-mail do usuário já está cadastrado',
        400
      );
    }
    user.password = Utils.encrypt(user.password as string);
    const userSaved = await UserModel.create(user as Optional<unknown, never>);
    const lastId = userSaved.getDataValue('id');
    for (let index = 1; index <= 2; index++) {
      await UserCharacterService.save(lastId, index);
      await UserItemService.save(lastId, index);
    }
    return new AppSuccess(
      AppStatusEnum.UserCreatedSuccess,
      'Usuário criado com sucesso',
      201
    );
  }

  public static async getAll(): Promise<IUser[]> {
    return (await UserModel.findAll({
      attributes: { exclude: ['password', 'authToken'] },
    })) as IUser[];
  }

  public static async get(id: number): Promise<IUser> {
    return await this.getUserById(id);
  }

  public static async updateName(user: IUser): Promise<AppSuccess> {
    await this.getUserById(user.id);
    const exist = (await UserModel.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')),
        sequelize.fn('lower', user.name)
      ),
    })) as IUser;
    if (
      exist &&
      exist.name?.toLowerCase() === user.name?.toLowerCase() &&
      exist.id !== user.id
    ) {
      throw new AppError(
        AppStatusEnum.UserNameAlreadyExists,
        'Nome do usuário já está cadastrado',
        400
      );
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
    return new AppSuccess(
      AppStatusEnum.UserUpdatedSuccess,
      'Usuário atualizado com sucesso'
    );
  }

  public static async authenticate(
    email: string,
    password: string
  ): Promise<IAuthenticate> {
    const user = (await UserModel.findOne({
      attributes: ['id', 'email', 'password', 'role', 'authToken'],
      where: {
        email: email,
      },
    })) as IUser;
    if (!user) {
      throw new AppError(
        AppStatusEnum.UserInvalidCredential,
        'Login ou senha inválidas',
        403
      );
    }
    if (!Utils.decrypt(password, user.password as string)) {
      throw new AppError(
        AppStatusEnum.UserInvalidCredential,
        'Login ou senha inválidas',
        403
      );
    }
    if (user.role === RoleEnum.Banned) {
      throw new AppError(AppStatusEnum.UserBanned, 'A conta está banida', 403);
    }
    const authToken = Utils.randomString(100);
    const userUpdated = await UserModel.update(
      {
        authToken: authToken,
      },
      {
        where: {
          id: user.id,
        },
        returning: true,
      }
    );
    user.authToken = userUpdated[1][0].get().authToken;
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string, {
      expiresIn: '1d',
    });
    return {
      accessToken: token,
      role: user.role as RoleEnum,
      email: user.email as string,
    };
  }

  public static async getUserById(id?: number): Promise<IUser> {
    const exist = (await UserModel.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ['password', 'authToken'] },
    })) as IUser;
    if (!exist) {
      throw new AppError(
        AppStatusEnum.UserNotFound,
        'Usuário não encontrado',
        404
      );
    }
    return exist;
  }

  public static async updatePassword(
    password: IPassword,
    id: number
  ): Promise<AppSuccess> {
    const user = (await UserModel.findOne({
      where: {
        id: id,
      },
    })) as IUser;
    if (!Utils.decrypt(password.currentPassword, user.password as string)) {
      throw new AppError(
        AppStatusEnum.UserPasswordInvalidCurrent,
        'Senha atual inválida',
        400
      );
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
    return new AppSuccess(
      AppStatusEnum.UserPasswordUpdatedSuccess,
      'Senha atualizada com sucesso'
    );
  }
}
