import express, { Router } from 'express';

import {
	getProductById,
	addProduct,
	deleteProduct,
	updateProduct,
} from '@/Controllers/Product';

import {
	addProductValidator,
	idProductValidator,
	updateProductValidator,
} from '@/Validators/Product';
import {
	ProductValidator,
	IdProductValidator,
	UpdateProductValidator,
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

const validatorIdProductProductSchema: objectValidator<IdProductValidator> = {
	type: 'params',
	schema: idProductValidator,
};

const validatorUpdateProductSchema: objectValidator<UpdateProductValidator> = {
	type: 'body',
	schema: updateProductValidator,
};

routerProduct
	.get(
		'/product/:idProduct',
		checkSession,
		validatorParamsBodyQueries([validatorIdProductProductSchema]),
		async (req, res) => {
			try {
				const getProduct = await getProductById(
					req.params.idProduct,
					req.decoded.id,
				);

				res.status(200).json(successResponse(200, getProduct));
			} catch (err) {
				res.status(404).json(errorResponse(404, err.message));
			}
		},
	)
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
		validatorParamsBodyQueries([validatorIdProductProductSchema]),
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
	)
	.put(
		'/product/:idProduct',
		checkSession,
		validatorParamsBodyQueries([
			validatorUpdateProductSchema,
			validatorIdProductProductSchema,
		]),
		async (req, res) => {
			try {
				const upProduct = await updateProduct(
					{ idProduct: req.params.idProduct, idAccount: req.decoded.id },
					req.body,
				);
				res.status(200).json(successResponse(200, upProduct));
			} catch (err: any) {
				res.status(404).json(errorResponse(404, err.message));
			}
		},
	);

export { routerProduct };
