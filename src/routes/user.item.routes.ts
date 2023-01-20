import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import UserItemController from '../controller/UserItemController';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import { validateUserItemCreate } from '../middleware/celebrate/user.item.celebrate';

const userItemRouter = express.Router();

userItemRouter
  .route('/')
  .post(
    validateUserItemCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    UserItemController.create
  );

userItemRouter
  .route('/')
  .get(authenticateMiddleware, UserItemController.findAll);

userItemRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, UserItemController.findOne);

export default userItemRouter;
