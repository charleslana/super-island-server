import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import ShopController from '../controller/ShopController';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateShopCreate,
  validateShopUpdate,
} from '../middleware/celebrate/shop.celebrate';

const shopRouter = express.Router();

shopRouter
  .route('/')
  .post(
    validateShopCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    ShopController.create
  );

shopRouter.route('/').get(authenticateMiddleware, ShopController.findAll);

shopRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, ShopController.findOne);

shopRouter
  .route('/')
  .put(
    validateShopUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    ShopController.update
  );

shopRouter
  .route('/:id')
  .delete(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    ShopController.delete
  );

export default shopRouter;
