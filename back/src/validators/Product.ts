import { JSONSchemaType } from 'ajv';
import {
	ProductValidator,
	IdProductValidator,
	UpdateProductValidator,
	FindFilterProductValidator,
} from '@/Interfaces/validators/Product';

const findProductQueryValidator: JSONSchemaType<FindFilterProductValidator> = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		minPrice: { type: 'number' },
		maxPrice: { type: 'number' },
		minDate: { type: 'string' },
		maxDate: { type: 'string' },
		stock: { type: 'boolean' },
	},
	required: [],
	additionalProperties: false,
};

const addProductValidator: JSONSchemaType<ProductValidator> = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		description: { type: 'string' },
		price: { type: 'number' },
		stock: { type: 'boolean' },
	},
	required: ['name', 'description', 'price'],
	additionalProperties: false,
};

const idProductValidator: JSONSchemaType<IdProductValidator> = {
	type: 'object',
	properties: {
		idProduct: { type: 'string' },
	},
	required: ['idProduct'],
	additionalProperties: false,
};

const updateProductValidator: JSONSchemaType<UpdateProductValidator> = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		description: { type: 'string' },
		price: { type: 'number' },
		stock: { type: 'boolean' },
	},
	required: [],
	additionalProperties: false,
};

export {
	addProductValidator,
	idProductValidator,
	updateProductValidator,
	findProductQueryValidator,
};
