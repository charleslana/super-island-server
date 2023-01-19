import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import UserSkillController from '../controller/UserSkillController';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateSetUserCharacterIdAndSkillId,
  validateUserSkillCreate,
} from '../middleware/celebrate/user.skill.celebrate';

const userSkillRouter = express.Router();

userSkillRouter
  .route('/')
  .post(
    validateUserSkillCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    UserSkillController.create
  );

userSkillRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, UserSkillController.findAll);

userSkillRouter
  .route('/:id/user-character/:userCharacterId')
  .get(
    validateSetUserCharacterIdAndSkillId(),
    authenticateMiddleware,
    UserSkillController.findOne
  );

export default userSkillRouter;
