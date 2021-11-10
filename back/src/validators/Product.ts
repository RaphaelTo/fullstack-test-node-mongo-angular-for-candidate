import { JSONSchemaType } from 'ajv';
import {
	ProductValidator,
	DeleteProductValidator,
} from '@/Interfaces/validators/Product';

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

const deleteProductValidator: JSONSchemaType<DeleteProductValidator> = {
	type: 'object',
	properties: {
		idProduct: { type: 'string' },
	},
	required: ['idProduct'],
	additionalProperties: false,
};

export { addProductValidator, deleteProductValidator };
