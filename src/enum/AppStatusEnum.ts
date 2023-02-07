enum AppStatusEnum {
  UserCreatedSuccess = 'user.created.success',
  UserUpdatedSuccess = 'user.updated.success',
  UserPasswordUpdatedSuccess = 'user.password.updated.success',
  UserEmailAlreadyExists = 'user.email.already.exists',
  UserNameAlreadyExists = 'user.name.already.exists',
  UserNotFound = 'user.not.found',
  UserPasswordInvalidCurrent = 'user.password.invalid.current',
  UserInvalidCredential = 'user.invalid.credential',
  UserBanned = 'user.banned',

  ChapterCreatedSuccess = 'chapter.created.success',
  ChapterNameAlreadyExists = 'chapter.name.already.exists',
  ChapterUpdatedSuccess = 'chapter.updated.success',
  ChapterDeletedSuccess = 'chapter.deleted.success',
  ChapterNotFound = 'chapter.not.found',

  CharacterCreatedSuccess = 'character.created.success',
  CharacterNameAlreadyExists = 'character.name.already.exists',
  CharacterUpdatedSuccess = 'character.updated.success',
  CharacterDeletedSuccess = 'character.deleted.success',
  CharacterNotFound = 'character.not.found',

  EnemyCreatedSuccess = 'enemy.created.success',
  EnemyUpdatedSuccess = 'enemy.updated.success',
  EnemyDeletedSuccess = 'enemy.deleted.success',
  EnemyNotFound = 'enemy.not.found',

  ItemCreatedSuccess = 'item.created.success',
  ItemNameAlreadyExists = 'item.name.already.exists',
  ItemUpdatedSuccess = 'item.updated.success',
  ItemDeletedSuccess = 'item.deleted.success',
  ItemNotFound = 'item.not.found',

  PhaseCreatedSuccess = 'phase.created.success',
  PhaseNameAlreadyExists = 'phase.name.already.exists',
  PhaseUpdatedSuccess = 'phase.updated.success',
  PhaseDeletedSuccess = 'phase.deleted.success',
  PhaseNotFound = 'phase.not.found',

  ShopCreatedSuccess = 'shop.created.success',
  ShopUpdatedSuccess = 'shop.updated.success',
  ShopDeletedSuccess = 'shop.deleted.success',
  ShopNotFound = 'shop.not.found',

  SkillCreatedSuccess = 'skill.created.success',
  SkillNameAlreadyExists = 'skill.name.already.exists',
  SkillUpdatedSuccess = 'skill.updated.success',
  SkillDeletedSuccess = 'skill.deleted.success',
  SkillNotFound = 'skill.not.found',

  UserCharacterCreatedSuccess = 'user.character.created.success',
  UserCharacterNotFound = 'user.character.not.found',
  UserCharacterAlreadyExists = 'user.character.already.exists',

  UserItemCreatedSuccess = 'user.item.created.success',
  UserItemNotFound = 'user.item.not.found',

  UserSkillCreatedSuccess = 'user.skill.created.success',
  UserSkillNotFound = 'user.skill.not.found',
  UserSkillAlreadyExists = 'user.skill.already.exists',

  AccessDenied = 'access.denied',

  RouteNotFound = 'route.not.found',
}

export default AppStatusEnum;
