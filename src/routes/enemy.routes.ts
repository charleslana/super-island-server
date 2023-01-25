import authenticateMiddleware from '../middleware/authenticate.middleware';
import EnemyController from '../controller/EnemyController';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateEnemyCreate,
  validateEnemyUpdate,
} from '../middleware/celebrate/enemy.celebrate';

const enemyRouter = express.Router();

enemyRouter
  .route('/')
  .post(
    validateEnemyCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    EnemyController.create
  );

enemyRouter
  .route('/phase/:id')
  .get(validateSetId(), authenticateMiddleware, EnemyController.findAll);

enemyRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, EnemyController.findOne);

enemyRouter
  .route('/')
  .put(
    validateEnemyUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    EnemyController.update
  );

enemyRouter
  .route('/:id')
  .delete(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    EnemyController.delete
  );

export default enemyRouter;
