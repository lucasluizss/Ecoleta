import { Request, Response } from 'express';
import knex from '../database/connection';
import Result from '../factories/results.factory';
import ItemFactory from '../factories/item.factory';
import fs from 'fs';
import path from 'path';

const items_tb = 'items';

interface Item {
	title: string;
	image: string;
}

class ItemsController {
	async index(_: Request, response: Response) {
		console.log('buscando todos os items')
		const items = await knex(items_tb).select('*');

		const serializedItems = items.map(ItemFactory.create);

		return response.json(Result.Success(serializedItems));
	}

	async show(request: Request, response: Response) {
		const { id } = request.params;

		const item = await knex(items_tb).where('id', id).first();

		return response.json(Result.Success(item));
	}

	async create(request: Request, response: Response) {
		const { title } = request.body;
		const image = request.file.filename;

		try {
			const item = { title, image };

			await knex(items_tb).insert(item);

			return response.json(Result.Success(item));
		} catch(ex) {
			return response.json(Result.Fail(ex));
		}
	}

	async update(request: Request, response: Response) {
		const { id } = request.params;
		const { title } = request.body;
		const image = request.file.filename;

		try {
			const item = { title, image };

			await knex(items_tb).where('id', id).update(item);

			return response.json(Result.Success(item));
		} catch (ex) {
			return response.json(Result.Fail(ex));
		}
	}

	async delete(request: Request, response: Response) {
		const { id } = request.params;

		try {
			const item = await knex(items_tb).where('id', id).first() as Item;

			const filePath = path.resolve(__dirname, '..', '..', 'uploads', item.image);

			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}

			await knex(items_tb).where('id', id).del();

			return response.json(Result.Success({}));
		} catch(ex) {
			return response.json(Result.Fail(ex));
		}
	}
}

export default ItemsController;
