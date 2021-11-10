import Ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';

type filterValidator = {
	type: 'params' | 'body' | 'query';
	validate: boolean;
};

const validatorParamsBodyQueries =
	(req: Request, _res: Response, next: NextFunction) =>
	(schemasValidator: Array<any>) => {
		const ajv: Ajv = new Ajv();
		const arrayValidate: Array<filterValidator> = schemasValidator
			.map(schema => {
				const validate = ajv.compile(schema.schema);
				return {
					type: schema.type,
					validate: validate(req[schema.type]),
				};
			})
			.filter(schemaFilter => schemaFilter.validate === false);

		if (arrayValidate.length) {
			next();
		}

		next();
	};

export { validatorParamsBodyQueries };
