import { JSONSchemaType } from 'ajv';

type objectValidator<T> = {
	type: 'params' | 'body' | 'query';
	schema: JSONSchemaType<T>;
};

export { objectValidator };
