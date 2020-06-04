import { Request, Response } from 'express';
import knex from '../database/connection';
import Result from '../factories/results.factory';
import ItemFactory from '../factories/item.factory';

class ItemsController {
	async index(request: Request, response: Response) {
		const items = await knex('items').select('*');

		const serializedItems = items.map(ItemFactory.create);

		return response.json(Result.Success(serializedItems));
	}

	async show(request: Request, response: Response) {
		const { id } = request.params;

		const item = await knex('items').where('id', id).first();

		return response.json(Result.Success(item));
	}
}

export default ItemsController;
