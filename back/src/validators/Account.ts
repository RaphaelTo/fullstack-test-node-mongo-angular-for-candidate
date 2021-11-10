import { JSONSchemaType } from 'ajv';
import { AccountValidator } from '@/Interfaces/validators/Account';

const signupValidator: JSONSchemaType<AccountValidator> = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		password: { type: 'string' },
	},
	required: ['username', 'password'],
	additionalProperties: false,
};

export { signupValidator };
