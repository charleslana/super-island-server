import CharacterClassEnum from '../enum/CharacterClassEnum';
import ICharacter from '../interface/ICharacter';
import IItem from '../interface/IItem';
import IShop from '../interface/IShop';
import IUser from '../interface/IUser';
import RoleEnum from '../enum/RoleEnum';
import { CharacterModel } from '../database/models/CharacterModel';
import { ItemModel } from '../database/models/ItemModel';
import { Optional } from 'sequelize';
import { ShopModel } from '../database/models/ShopModel';
import { UserCharacterModel } from '../database/models/UserCharacterModel';
import { UserItemModel } from '../database/models/UserItemModel';
import { UserModel } from '../database/models/UserModel';

export default class ConfigService {
  public static async execute(): Promise<void> {
    const users = await UserModel.findAll();
    if (users.length === 0) {
      await this.createUsers();
      await this.createCharacters();
      await this.createItems();
      await this.createShops();
      await this.createUserCharacters();
      await this.createUserItems();
    }
  }

  private static async createUsers(): Promise<void> {
    const userAdmin = {
      email: 'test@test.com',
      name: 'test',
      password: '$2b$10$m7Y3AU05JH66ZeXdLmVTr.ZMw2fB/VFT.Mshbis4tOPyRm/Ef6Xuq',
      role: RoleEnum.Admin,
      gem: 2000,
    } as IUser as Optional<unknown, never>;
    const user = {
      email: 'test2@test.com',
      name: 'test2',
      password: '$2b$10$m7Y3AU05JH66ZeXdLmVTr.ZMw2fB/VFT.Mshbis4tOPyRm/Ef6Xuq',
    } as IUser as Optional<unknown, never>;
    const userBanned = {
      email: 'test3@test.com',
      password: '$2b$10$m7Y3AU05JH66ZeXdLmVTr.ZMw2fB/VFT.Mshbis4tOPyRm/Ef6Xuq',
      role: RoleEnum.Banned,
    } as IUser as Optional<unknown, never>;
    await UserModel.bulkCreate([userAdmin, user, userBanned]);
  }

  private static async createCharacters(): Promise<void> {
    const firstCharacter = {
      name: 'Monkey D. Luffy',
      image: '1',
      characterClass: CharacterClassEnum.Fighter,
      hp: 100,
      rageHit: 10,
      rageDefense: 5,
      agility: 1,
      rarity: 'B',
      organization: 'PIRATE',
    } as ICharacter as Optional<unknown, never>;
    const secondCharacter = {
      name: 'Roronoa Zoro',
      image: '2',
      characterClass: CharacterClassEnum.Swordsman,
      hp: 100,
      rageHit: 10,
      rageDefense: 5,
      agility: 1,
      rarity: 'A',
      organization: 'PIRATE',
    } as ICharacter as Optional<unknown, never>;
    await CharacterModel.bulkCreate([firstCharacter, secondCharacter]);
  }

  private static async createItems(): Promise<void> {
    const firstItem = {
      name: 'Chapéu de palha',
      image: '1',
      type: 'EQUIP',
      rarity: 'B',
    } as IItem as Optional<unknown, never>;
    const secondItem = {
      name: 'Shield Boomerang',
      image: '2',
      type: 'EQUIP',
      rarity: 'A',
    } as IItem as Optional<unknown, never>;
    await ItemModel.bulkCreate([firstItem, secondItem]);
  }

  private static async createShops(): Promise<void> {
    const firstItem = {
      belly: 0,
      gem: 0,
      userLevel: 1,
      itemId: 1,
    } as IShop as Optional<unknown, never>;
    const secondItem = {
      belly: 0,
      gem: 0,
      userLevel: 1,
      itemId: 2,
    } as IShop as Optional<unknown, never>;
    await ShopModel.bulkCreate([firstItem, secondItem]);
  }

  private static async createUserCharacters(): Promise<void> {
    const first = {
      userId: 1,
      characterId: 1,
    } as Optional<unknown, never>;
    const second = {
      userId: 1,
      characterId: 2,
    } as Optional<unknown, never>;
    await UserCharacterModel.bulkCreate([first, second]);
  }

  private static async createUserItems(): Promise<void> {
    const first = {
      userId: 1,
      itemId: 1,
    } as Optional<unknown, never>;
    const second = {
      userId: 1,
      itemId: 2,
    } as Optional<unknown, never>;
    await UserItemModel.bulkCreate([first, second]);
  }
}
