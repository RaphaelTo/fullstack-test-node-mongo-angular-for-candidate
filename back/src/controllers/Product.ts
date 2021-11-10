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

export { addProduct };
