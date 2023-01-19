import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateCharacterCreate,
  validateCharacterUpdate,
} from '../middleware/celebrate/character.celebrate';
import {
  create,
  change,
  erase,
  findAll,
  findOne,
} from '../controller/character.controller';

const characterRouter = express.Router();

characterRouter
  .route('/')
  .post(
    validateCharacterCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    create
  );

characterRouter.route('/').get(authenticateMiddleware, findAll);

characterRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, findOne);

characterRouter
  .route('/')
  .put(
    validateCharacterUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    change
  );

characterRouter
  .route('/:id')
  .delete(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    erase
  );

export default characterRouter;
