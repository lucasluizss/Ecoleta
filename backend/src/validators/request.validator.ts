import { celebrate, Joi } from 'celebrate';

export const PointValidator = celebrate({
	body: Joi.object().keys({
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		whatsapp: Joi.string().required(),
		latitude: Joi.number().required(),
		longitude: Joi.number().required(),
		city: Joi.string().required(),
		uf: Joi.string().required().max(2),
		items: Joi.string().required()
	})
}, {
	abortEarly: false
});

export const ItemValidator = celebrate({
	body: Joi.object().keys({
		title: Joi.string().required()
	})
}, {
	abortEarly: false
});