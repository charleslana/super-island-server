import characterRouter from './character.routes';
import userRouter from './user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/character', characterRouter);

export default routes;
