import characterRouter from './character.routes';
import skillRouter from './skill.routes';
import userCharacterRouter from './user.character.routes';
import userRouter from './user.routes';
import userSkillRouter from './user.skill.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/character', characterRouter);
routes.use('/user-character', userCharacterRouter);
routes.use('/skill', skillRouter);
routes.use('/user-skill', userSkillRouter);

export default routes;
