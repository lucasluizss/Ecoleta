import express from 'express';
import itemsRoutes from './items.routes';
import pointsRoutes from './points.routes';

const routes = express.Router();

routes.use('/items', itemsRoutes);
routes.use('/points', pointsRoutes);

export default routes;
