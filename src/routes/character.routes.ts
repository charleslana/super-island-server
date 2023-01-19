import authenticateMiddleware from '../middleware/authenticate.middleware';
import CharacterController from '../controller/CharacterController';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateCharacterCreate,
  validateCharacterUpdate,
} from '../middleware/celebrate/character.celebrate';

const characterRouter = express.Router();

characterRouter
  .route('/')
  .post(
    validateCharacterCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    CharacterController.create
  );

characterRouter
  .route('/')
  .get(authenticateMiddleware, CharacterController.findAll);

characterRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, CharacterController.findOne);

characterRouter
  .route('/')
  .put(
    validateCharacterUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    CharacterController.update
  );

characterRouter
  .route('/:id')
  .delete(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    CharacterController.delete
  );

export default characterRouter;
