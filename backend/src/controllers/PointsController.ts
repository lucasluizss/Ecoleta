import { Request, Response } from 'express';
import knex from '../database/connection';
import Result from '../factories/results.factory';
import PointFactory from '../factories/point.factory';

class PointsController {

	async index(request: Request, response: Response) {
		const { city, uf, items } = request.query;

		try {

			const parsedItems = String(items)
				.trim()
				.split(',')
				.map(Number);

			const points = await knex('points')
				.join('point_items', 'points.id', '=', 'point_items.point_id')
				.whereIn('point_items.item_id', parsedItems)
				.where('city', String(city))
				.where('uf', String(uf))
				.distinct()
				.select('points.*');

			const serializedPoints = points.map(PointFactory.create);

			return response.json(Result.Success(serializedPoints));
		} catch(ex) {
			return response.json(Result.Fail(ex));
		}
	}

	async show(request: Request, response: Response) {
		const { id } = request.params;

		try {
			const point = await knex('points').where('id', id).first();

			if (!point) {
				return response.status(400).json(Result.Fail({}, 'Point not found!'));
			}

			const serializedPoint = PointFactory.create(point);

			const items = await knex('items')
				.join('point_items', 'items.id', '=', 'point_items.id')
				.where('point_items.point_id', id)
				.select('items.title');

			return response.json(Result.Success({ point: serializedPoint, items }));
		} catch(ex) {
			return response.json(Result.Fail(ex));
		}
	}

	async create(request: Request, response: Response) {
		const {
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
			items
		} = request.body;

		try {
			const trx = await knex.transaction();

			const point = {
				image: request.file.filename,
				name,
				email,
				whatsapp,
				latitude,
				longitude,
				city,
				uf
			};

			const insertedIds = await trx('points').insert(point);

			const point_id = insertedIds[0];

			const pointItems = String(items)
				.trim()
				.split(',')
				.map(Number)
				.map((item_id: number) => {
					return {
						item_id,
						point_id
					}
			});

			await trx('point_items').insert(pointItems);

			await trx.commit();

			const serializedPoint = PointFactory.create(point);

			return response.json(Result.Success({ id: point_id, point: serializedPoint }));
		} catch (ex) {
			return response.json(Result.Fail(ex));
		}
	}

}

export default PointsController;