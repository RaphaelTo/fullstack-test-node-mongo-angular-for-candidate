import express, { Router } from 'express';
import dayjs from 'dayjs';

import { signupAction, signinAction } from '@/Controllers/Account';

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

routerAccount
	.post(
		'/signup',
		validatorParamsBodyQueries([validatorSchema]),
		async (req, res) => {
			try {
				const addAccount = await signupAction(req.body);
				res.json(successResponse(201, addAccount));
			} catch (err: any) {
				return res.json(errorResponse(404, err.message));
			}
		},
	)
	.post(
		'/signin',
		validatorParamsBodyQueries([validatorSchema]),
		async (req, res) => {
			try {
				const login = await signinAction(req.body);
				res.cookie(
					'xAccessToken',
					{ token: login },
					{
						secure: process.env.NODE_ENV !== 'development',
						httpOnly: true,
						expires: dayjs().add(10, 'hour').toDate(),
					},
				);
				res.json(successResponse(201, login));
			} catch (err: any) {
				return res.json(errorResponse(404, err.message));
			}
		},
	);

export { routerAccount };
