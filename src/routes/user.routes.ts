import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import UserController from '../controller/UserController';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateUserCreate,
  validateUserNameUpdate,
  validateLogin,
  validateUserPassword,
} from '../middleware/celebrate/user.celebrate';

const userRouter = express.Router();

userRouter.route('/').post(validateUserCreate(), UserController.create);

userRouter
  .route('/')
  .get(
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    UserController.findAll
  );

userRouter
  .route('/:id')
  .get(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    UserController.findOne
  );

userRouter
  .route('/change-name')
  .put(
    validateUserNameUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin, RoleEnum.User]),
    UserController.changeName
  );

userRouter
  .route('/profile/detail')
  .get(
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin, RoleEnum.User]),
    UserController.detail
  );

userRouter.route('/login').post(validateLogin(), UserController.login);

userRouter
  .route('/change-password')
  .put(
    validateUserPassword(),
    authenticateMiddleware,
    UserController.changePassword
  );

export default userRouter;
