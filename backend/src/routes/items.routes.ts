import express from 'express';
import ItemsController from '../controllers/ItemsController';

const routes = express.Router();
const itemsController = new ItemsController();

routes.get('/:id', itemsController.show);
routes.get('/', itemsController.index);
routes.put('/:id', itemsController.update);
routes.delete('/:id', itemsController.delete);

export default routes;