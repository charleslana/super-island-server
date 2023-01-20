import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import ItemController from '../controller/ItemController';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateItemCreate,
  validateItemUpdate,
} from '../middleware/celebrate/item.celebrate';

const itemRouter = express.Router();

itemRouter
  .route('/')
  .post(
    validateItemCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    ItemController.create
  );

itemRouter.route('/').get(authenticateMiddleware, ItemController.findAll);

itemRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, ItemController.findOne);

itemRouter
  .route('/')
  .put(
    validateItemUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    ItemController.update
  );

itemRouter
  .route('/:id')
  .delete(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    ItemController.delete
  );

export default itemRouter;
