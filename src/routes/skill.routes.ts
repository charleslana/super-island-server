import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import SkillController from '../controller/SkillController';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateSkillCreate,
  validateSkillUpdate,
} from '../middleware/celebrate/skill.celebrate';

const skillRouter = express.Router();

skillRouter
  .route('/')
  .post(
    validateSkillCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    SkillController.create
  );

skillRouter.route('/').get(authenticateMiddleware, SkillController.findAll);

skillRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, SkillController.findOne);

skillRouter
  .route('/')
  .put(
    validateSkillUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    SkillController.update
  );

skillRouter
  .route('/:id')
  .delete(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    SkillController.delete
  );

export default skillRouter;
