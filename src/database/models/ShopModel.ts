import { database } from '../database';
import { DataTypes } from 'sequelize';
import { ItemModel } from './ItemModel';

export const ShopModel = database.define(
  'tb_shop',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    belly: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    gem: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_level',
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
    timestamps: false,
  }
);

ShopModel.belongsTo(ItemModel, {
  as: 'item',
  foreignKey: 'itemId',
  targetKey: 'id',
});
