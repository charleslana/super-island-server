import { database } from '../database';
import { DataTypes } from 'sequelize';
import { ItemModel } from './ItemModel';
import { UserModel } from './UserModel';

export const UserItemModel = database.define(
  'tb_user_item',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    enhancement: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: UserModel,
        key: 'id',
      },
      field: 'user_id',
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: ItemModel,
        key: 'id',
      },
      field: 'item_id',
    },
  },
  {
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

UserItemModel.belongsTo(ItemModel, {
  as: 'item',
  foreignKey: 'itemId',
  targetKey: 'id',
});
