import CharacterClassEnum from '../enum/CharacterClassEnum';
import SkillOrderEnum from '../enum/SkillOrderEnum';
import SkillTypeEnum from '../enum/SkillTypeEnum';

export default interface ISkill {
  id?: number;
  name?: string;
  image?: string;
  characterClass?: CharacterClassEnum;
  type?: SkillTypeEnum;
  order?: SkillOrderEnum;
}
