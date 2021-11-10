import express, { Router } from 'express';

import { addProduct } from '@/Controllers/Product';

import { addProductValidator } from '@/Validators/Product';
import { ProductValidator } from '@/Interfaces/validators/Product';
import { objectValidator } from '@/Types/middlewares/validator';

import { validatorParamsBodyQueries } from '@/Middlewares/validator';
import { checkSession } from '@/Middlewares/session';

import { errorResponse, successResponse } from '@/Utils/responses';

const routerProduct: Router = express.Router();

const validatorAddProductSchema: objectValidator<ProductValidator> = {
	type: 'body',
	schema: addProductValidator,
};

routerProduct.post(
	'/product',
	checkSession,
	validatorParamsBodyQueries([validatorAddProductSchema]),
	async (req, res) => {
		try {
			const add = addProduct(req.body, req.decoded.id);
			res.json('add Product');
		} catch (err) {
			res.json(errorResponse(404, err.message));
		}
	},
);

export { routerProduct };
