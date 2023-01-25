import authenticateMiddleware from '../middleware/authenticate.middleware';
import express from 'express';
import PhaseController from '../controller/PhaseController';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validatePhaseCreate,
  validatePhaseUpdate,
} from '../middleware/celebrate/phase.celebrate';

const phaseRouter = express.Router();

phaseRouter
  .route('/')
  .post(
    validatePhaseCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    PhaseController.create
  );

phaseRouter.route('/').get(authenticateMiddleware, PhaseController.findAll);

phaseRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, PhaseController.findOne);

phaseRouter
  .route('/')
  .put(
    validatePhaseUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    PhaseController.update
  );

phaseRouter
  .route('/:id')
  .delete(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    PhaseController.delete
  );

export default phaseRouter;
