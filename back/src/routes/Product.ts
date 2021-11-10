import express, { Router } from 'express';

import { addProduct, deleteProduct } from '@/Controllers/Product';

import {
	addProductValidator,
	deleteProductValidator,
} from '@/Validators/Product';
import {
	ProductValidator,
	DeleteProductValidator,
} from '@/Interfaces/validators/Product';
import { objectValidator } from '@/Types/middlewares/validator';

import { validatorParamsBodyQueries } from '@/Middlewares/validator';
import { checkSession } from '@/Middlewares/session';

import { errorResponse, successResponse } from '@/Utils/responses';

const routerProduct: Router = express.Router();

const validatorAddProductSchema: objectValidator<ProductValidator> = {
	type: 'body',
	schema: addProductValidator,
};

const validatorDeleteProductSchema: objectValidator<DeleteProductValidator> = {
	type: 'params',
	schema: deleteProductValidator,
};

routerProduct
	.post(
		'/product',
		checkSession,
		validatorParamsBodyQueries([validatorAddProductSchema]),
		async (req, res) => {
			try {
				const add = await addProduct(req.body, req.decoded.id);

				res.status(201).json(successResponse(201, add));
			} catch (err: any) {
				res.status(404).json(errorResponse(404, err.message));
			}
		},
	)
	.delete(
		'/product/:idProduct',
		checkSession,
		validatorParamsBodyQueries([validatorDeleteProductSchema]),
		async (req, res) => {
			try {
				const dlProduct = await deleteProduct(
					req.params.idProduct,
					req.decoded.id,
				);

				res.status(200).json(successResponse(200, dlProduct));
			} catch (err: any) {
				res.status(404).json(errorResponse(404, err.message));
			}
		},
	);

export { routerProduct };
