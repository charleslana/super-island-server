import { ChapterModel } from './ChapterModel';
import { database } from '../database';
import { DataTypes } from 'sequelize';

export const PhaseModel = database.define(
  'tb_phase',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chapterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: ChapterModel,
        key: 'id',
      },
      field: 'chapter_id',
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
