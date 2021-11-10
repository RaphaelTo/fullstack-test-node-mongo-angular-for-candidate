import mongoose from 'mongoose';
import dayjs from 'dayjs';
import Product from '@/Models/Product';

import { ProductValidator } from '@/Interfaces/validators/Product';
import { updateParamProduct } from '@/Types/controllers/product';

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

export { getProductById, addProduct, deleteProduct, updateProduct };
