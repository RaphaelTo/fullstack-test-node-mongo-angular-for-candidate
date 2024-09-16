import mongoose from 'mongoose';
import dayjs from 'dayjs';
import Product from '@/Models/Product';

import { ProductValidator } from '@/Interfaces/validators/Product';
import {
	updateParamProduct,
	paramsId,
	filterParam,
} from '@/Types/controllers/product';

const getAllProduct = async (
	idAccount: string,
	paramFilter: filterParam,
): Promise<object[]> => {
	try {
		const filter = {};

		if (paramFilter.hasOwnProperty('stock')) {
			Object.assign(filter, {
				stock: paramFilter.stock,
			});
		}

		if (paramFilter.hasOwnProperty('name')) {
			Object.assign(filter, {
				name: paramFilter.name,
			});
		}

		if (
			paramFilter.hasOwnProperty('minDate') &&
			paramFilter.hasOwnProperty('maxDate')
		) {
			Object.assign(filter, {
				createdDate: { $gte: paramFilter.minDate, $lte: paramFilter.maxDate },
			});
		}

		if (
			paramFilter.hasOwnProperty('minPrice') &&
			paramFilter.hasOwnProperty('maxPrice')
		) {
			Object.assign(filter, {
				price: { $gte: paramFilter.minPrice, $lte: paramFilter.maxPrice },
			});
		}

		const getAllProduct = await Product.find({
			idAccount,
			...filter,
		}).exec();

		if (!getAllProduct.length) {
			throw new Error('0 product found');
		}

		return getAllProduct;
	} catch (err) {
		throw err;
	}
};

const getProductById = async (idProduct: string, idAccount: string) => {
	try {
		const getProduct = await checkProductExist({ idProduct, idAccount });

		if (!getProduct) {
			throw new Error('product not found');
		}

		return getProduct;
	} catch (err) {
		throw err;
	}
};

const addProduct = async (
	productParam: ProductValidator,
	idAccount: string,
) => {
	try {
		const dateNow: dayjs.Dayjs = dayjs();
		const product = new Product({
			...productParam,
			idAccount,
			createdDate: dateNow,
			updatedDate: dateNow,
		});
		await product.save();

		return 'Product has been added';
	} catch (err) {
		throw err;
	}
};

const deleteProduct = async (idProduct: any, idAccount: any) => {
	try {
		const checkProduct = await checkProductExist({ idProduct, idAccount });

		if (!checkProduct) {
			throw new Error("Product doesn't exist");
		}

		await Product.deleteOne({ idProduct, idAccount });

		return 'Product has been deleted';
	} catch (err) {
		throw err;
	}
};

const updateProduct = async (
	paramId: {
		idProduct: any;
		idAccount: any;
	},
	productToUpdate: updateParamProduct,
) => {
	try {
		const { idProduct, idAccount } = paramId;
		const dateNow: dayjs.Dayjs = dayjs();
		const checkProduct = await checkProductExist({ idProduct, idAccount });

		if (!checkProduct) {
			throw new Error("Product doesn't exist");
		}

		await Product.updateOne(
			{ idProduct, idAccount },
			{ ...productToUpdate, updatedDate: dateNow },
		);

		return 'Product has been updated';
	} catch (err) {
		throw err;
	}
};

const checkProductExist = async (params: {
	idProduct: any;
	idAccount: any;
}) => {
	try {
		const findProduct = await Product.findOne({
			_id: params.idProduct,
			idAccount: params.idAccount,
		}).exec();

		if (!findProduct) {
			return false;
		}

		return findProduct;
	} catch (err) {
		throw err;
	}
};

export {
	getAllProduct,
	getProductById,
	addProduct,
	deleteProduct,
	updateProduct,
};
