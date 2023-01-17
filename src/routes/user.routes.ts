import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateUserCreate,
  validateUserNameUpdate,
  validateLogin,
  validateUserPassword,
} from '../middleware/celebrate/user.celebrate';
import {
  changeName,
  changePassword,
  create,
  detail,
  findAll,
  findOne,
  login,
} from '../controller/user.controller';

const userRouter = express.Router();

userRouter.route('/').post(validateUserCreate(), create);

userRouter
  .route('/')
  .get(authenticateMiddleware, roleMiddleware([RoleEnum.Admin]), findAll);

userRouter
  .route('/:id')
  .get(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    findOne
  );

userRouter
  .route('/change-name')
  .put(
    validateUserNameUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin, RoleEnum.User]),
    changeName
  );

userRouter
  .route('/profile/detail')
  .get(
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin, RoleEnum.User]),
    detail
  );

userRouter.route('/login').post(validateLogin(), login);

userRouter
  .route('/change-password')
  .put(validateUserPassword(), authenticateMiddleware, changePassword);

export default userRouter;
