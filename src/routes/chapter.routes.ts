import authenticateMiddleware from '../middleware/authenticate.middleware';
import ChapterController from '../controller/ChapterController';
import express from 'express';
import RoleEnum from '../enum/RoleEnum';
import roleMiddleware from '../middleware/role.middleware';
import { validateSetId } from '../middleware/celebrate/common.celebrate';
import {
  validateChapterCreate,
  validateChapterUpdate,
} from '../middleware/celebrate/chapter.celebrate';

const chapterRouter = express.Router();

chapterRouter
  .route('/')
  .post(
    validateChapterCreate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    ChapterController.create
  );

chapterRouter.route('/').get(authenticateMiddleware, ChapterController.findAll);

chapterRouter
  .route('/:id')
  .get(validateSetId(), authenticateMiddleware, ChapterController.findOne);

chapterRouter
  .route('/')
  .put(
    validateChapterUpdate(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    ChapterController.update
  );

chapterRouter
  .route('/:id')
  .delete(
    validateSetId(),
    authenticateMiddleware,
    roleMiddleware([RoleEnum.Admin]),
    ChapterController.delete
  );

export default chapterRouter;
