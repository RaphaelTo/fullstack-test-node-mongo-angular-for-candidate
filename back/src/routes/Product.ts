import express, { Router } from 'express';

import {
	getAllProduct,
	getProductById,
	addProduct,
	deleteProduct,
	updateProduct,
} from '@/Controllers/Product';

import {
	addProductValidator,
	idProductValidator,
	updateProductValidator,
	findProductQueryValidator,
} from '@/Validators/Product';
import {
	ProductValidator,
	IdProductValidator,
	UpdateProductValidator,
	FindFilterProductValidator,
} from '@/Interfaces/validators/Product';
import { objectValidator } from '@/Types/middlewares/validator';

import { validatorParamsBodyQueries } from '@/Middlewares/validator';

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

const validatorFindFilterProductSchema: objectValidator<FindFilterProductValidator> =
	{
		type: 'query',
		schema: findProductQueryValidator,
	};

routerProduct
	.get(
		'/product',
		validatorParamsBodyQueries([validatorFindFilterProductSchema]),
		async (req, res) => {
			try {
				const allProduct = await getAllProduct(req.decoded.id, req.query);

				res.status(200).json(successResponse(200, allProduct));
			} catch (err: any) {
				res.status(404).json(errorResponse(404, err.message));
			}
		},
	)
	.get(
		'/product/:idProduct',
		validatorParamsBodyQueries([validatorIdProductProductSchema]),
		async (req, res) => {
			try {
				const getProduct = await getProductById(
					req.params.idProduct,
					req.decoded.id,
				);

				res.status(200).json(successResponse(200, getProduct));
			} catch (err: any) {
				res.status(404).json(errorResponse(404, err.message));
			}
		},
	)
	.post(
		'/product',
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
