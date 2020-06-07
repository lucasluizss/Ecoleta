import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import { PointValidator } from '../validators/request.validator';
import PointsController from '../controllers/PointsController';

const routes = express.Router();
const upload = multer(multerConfig);
const pointsController = new PointsController();

routes.get('/:id', pointsController.show);
routes.get('/', pointsController.index);
routes.put('/', upload.single('image'), PointValidator, pointsController.update);
routes.delete('/:id', pointsController.delete);
routes.post('/', upload.single('image'), PointValidator, pointsController.create);

export default routes;