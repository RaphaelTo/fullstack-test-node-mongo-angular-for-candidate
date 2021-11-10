import { JSONSchemaType } from 'ajv';
import { ProductValidator } from '@/Interfaces/validators/Product';

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

export { addProductValidator };
