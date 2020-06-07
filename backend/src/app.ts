import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate';

class App {
	public app: express.Application;

	constructor() {
		this.app = express();

		this.configureMiddlewares();
		this.configureRoutes()
		this.handleErrors();
	}

	private configureMiddlewares() {
		this.app.use(cors());
		this.app.use(express.json());
	}

	private configureRoutes() {
		this.app.use(routes);
		this.app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
	}

	private handleErrors() {
		this.app.use(errors());
	}
}

export default new App().app;
