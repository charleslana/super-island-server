import characterRouter from './character.routes';
import itemRouter from './item.routes';
import skillRouter from './skill.routes';
import userCharacterRouter from './user.character.routes';
import userItemRouter from './user.item.routes';
import userRouter from './user.routes';
import userSkillRouter from './user.skill.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/character', characterRouter);
routes.use('/user-character', userCharacterRouter);
routes.use('/skill', skillRouter);
routes.use('/user-skill', userSkillRouter);
routes.use('/item', itemRouter);
routes.use('/user-item', userItemRouter);

export default routes;
