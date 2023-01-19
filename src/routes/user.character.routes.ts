import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import UserCharacterController from '../controller/UserCharacterController';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import { validateUserCharacterCreate } from '../middleware/celebrate/user.character.celebrate';

const userCharacterRouter = express.Router();

userCharacterRouter
  .route('/')
  .post(
    validateUserCharacterCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    UserCharacterController.create
  );

userCharacterRouter
  .route('/')
  .get(authenticateMiddleware, UserCharacterController.findAll);

userCharacterRouter
  .route('/:id')
  .get(
    validateSetId(),
    authenticateMiddleware,
    UserCharacterController.findOne
  );

export default userCharacterRouter;
