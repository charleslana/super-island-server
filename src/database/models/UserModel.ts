import RoleEnum from '../../enum/RoleEnum';
import { database } from '../database';
import { DataTypes } from 'sequelize';

export const UserModel = database.define(
  'tb_user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(RoleEnum)),
      allowNull: false,
      defaultValue: RoleEnum.User,
    },
    experience: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    belly: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 5000,
    },
    gold: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    stamina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
