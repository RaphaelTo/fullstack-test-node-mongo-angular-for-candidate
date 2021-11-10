import Ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';

import { errorResponse } from '@/Utils/responses';

type filterValidator = {
	type: 'params' | 'body' | 'query';
	validate: boolean;
};

const validatorParamsBodyQueries =
	(schemasValidator: Array<any>) =>
	(req: Request, res: Response, next: NextFunction) => {
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
			return res
				.status(404)
				.json(errorResponse(404, 'Error body/params/query'));
		}

		next();
	};

export { validatorParamsBodyQueries };
