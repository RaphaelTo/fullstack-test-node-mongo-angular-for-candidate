import dayjs from 'dayjs';
import Product from '@/Models/Product';

import { ProductValidator } from '@/Interfaces/validators/Product';

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

const deleteProduct = async (idProduct: string, idAccount: string) => {
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

const checkProductExist = async (params: {
	idProduct: string;
	idAccount: string;
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

export { addProduct, deleteProduct };
