import express, { Router } from 'express';

import { signupAction } from '@/Controllers/Account';

import { objectValidator } from '@/Types/middlewares/validator';
import { AccountValidator } from '@/Interfaces/validators/Account';

import { validatorParamsBodyQueries } from '@/Middlewares/validator';
import { signupValidator } from '@/Validators/Account';
import { errorResponse, successResponse } from '@/Utils/responses';

const routerAccount: Router = express.Router();

const validatorSchema: objectValidator<AccountValidator> = {
	type: 'body',
	schema: signupValidator,
};

routerAccount.post(
	'/signup',
	(req, res, next) =>
		validatorParamsBodyQueries(req, res, next)([validatorSchema]),
	async (req, res) => {
		try {
			const addAccount = await signupAction(req.body);
			res.json(successResponse(201, addAccount));
		} catch (err: any) {
			return res.json(errorResponse(404, err.message));
		}
	},
);

export { routerAccount };
