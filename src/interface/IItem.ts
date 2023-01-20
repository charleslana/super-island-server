import CharacterClassEnum from '../enum/CharacterClassEnum';
import ItemTypeEnum from '../enum/ItemTypeEnum';
import RarityEnum from '../enum/RarityEnum';

export default interface IItem {
  id?: number;
  name?: string;
  image?: string;
  characterClass?: CharacterClassEnum;
  attack?: number;
  magicAttack?: number;
  defense?: number;
  magicDefense?: number;
  agility?: number;
  critical?: number;
  dodge?: number;
  rarity?: RarityEnum;
  type?: ItemTypeEnum;
}
