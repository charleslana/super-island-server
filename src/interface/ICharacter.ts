import CharacterClassEnum from '../enum/CharacterClassEnum';
import OrganizationEnum from '../enum/OrganizationEnum';
import RarityEnum from '../enum/RarityEnum';

export default interface ICharacter {
  id?: number;
  name?: string;
  image?: string;
  characterClass?: CharacterClassEnum;
  hp?: number;
  rageHit?: number;
  rageDefense?: number;
  attack?: number;
  magicAttack?: number;
  defense?: number;
  magicDefense?: number;
  agility?: number;
  critical?: number;
  dodge?: number;
  rarity?: RarityEnum;
  organization?: OrganizationEnum;
}
