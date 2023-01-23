import CharacterClassEnum from '../enum/CharacterClassEnum';
import IChapter from '../interface/IChapter';
import ICharacter from '../interface/ICharacter';
import IItem from '../interface/IItem';
import IShop from '../interface/IShop';
import IUser from '../interface/IUser';
import RoleEnum from '../enum/RoleEnum';
import { ChapterModel } from '../database/models/ChapterModel';
import { CharacterModel } from '../database/models/CharacterModel';
import { ItemModel } from '../database/models/ItemModel';
import { Optional } from 'sequelize';
import { ShopModel } from '../database/models/ShopModel';
import { UserCharacterModel } from '../database/models/UserCharacterModel';
import { UserItemModel } from '../database/models/UserItemModel';
import { UserModel } from '../database/models/UserModel';

export default class ConfigService {
  public static async execute(): Promise<void> {
    await this.createUsers();
    await this.createCharacters();
    await this.createItems();
    await this.createShops();
    await this.createUserCharacters();
    await this.createUserItems();
    await this.createChapters();
  }

  private static async createUsers(): Promise<void> {
    const getAll = await UserModel.findAll();
    if (getAll.length === 0) {
      const userAdmin = {
        email: 'test@test.com',
        name: 'test',
        password:
          '$2b$10$m7Y3AU05JH66ZeXdLmVTr.ZMw2fB/VFT.Mshbis4tOPyRm/Ef6Xuq',
        role: RoleEnum.Admin,
        gem: 2000,
      } as IUser as Optional<unknown, never>;
      const user = {
        email: 'test2@test.com',
        name: 'test2',
        password:
          '$2b$10$m7Y3AU05JH66ZeXdLmVTr.ZMw2fB/VFT.Mshbis4tOPyRm/Ef6Xuq',
      } as IUser as Optional<unknown, never>;
      const userBanned = {
        email: 'test3@test.com',
        password:
          '$2b$10$m7Y3AU05JH66ZeXdLmVTr.ZMw2fB/VFT.Mshbis4tOPyRm/Ef6Xuq',
        role: RoleEnum.Banned,
      } as IUser as Optional<unknown, never>;
      await UserModel.bulkCreate([userAdmin, user, userBanned]);
    }
  }

  private static async createCharacters(): Promise<void> {
    const getAll = await CharacterModel.findAll();
    if (getAll.length === 0) {
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
  }

  private static async createItems(): Promise<void> {
    const getAll = await ItemModel.findAll();
    if (getAll.length === 0) {
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
  }

  private static async createShops(): Promise<void> {
    const getAll = await ShopModel.findAll();
    if (getAll.length === 0) {
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
  }

  private static async createUserCharacters(): Promise<void> {
    const getAll = await UserCharacterModel.findAll();
    if (getAll.length === 0) {
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
  }

  private static async createUserItems(): Promise<void> {
    const getAll = await UserItemModel.findAll();
    if (getAll.length === 0) {
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

  private static async createChapters(): Promise<void> {
    const getAll = await ChapterModel.findAll();
    if (getAll.length === 0) {
      const first = {
        name: 'Romance Dawn',
        image: '1',
        level: 1,
      } as IChapter as Optional<unknown, never>;
      const second = {
        name: `Alvida's Hideout`,
        image: '2',
        level: 5,
      } as IChapter as Optional<unknown, never>;
      const third = {
        name: `Shells Town`,
        image: '3',
        level: 10,
      } as IChapter as Optional<unknown, never>;
      const fourth = {
        name: `Orange Town`,
        image: '4',
        level: 20,
      } as IChapter as Optional<unknown, never>;
      const fifth = {
        name: `Syrup Village`,
        image: '5',
        level: 30,
      } as IChapter as Optional<unknown, never>;
      const sixth = {
        name: `Baratie`,
        image: '6',
        level: 40,
      } as IChapter as Optional<unknown, never>;
      await ChapterModel.bulkCreate([
        first,
        second,
        third,
        fourth,
        fifth,
        sixth,
      ]);
    }
  }
}
