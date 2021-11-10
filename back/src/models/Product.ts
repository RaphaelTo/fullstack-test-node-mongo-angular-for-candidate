import mongoose from 'mongoose';
import { Product } from '@/Interfaces/Product';

const productSchema = new mongoose.Schema<Product>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	stock: {
		type: Boolean,
		default: true,
	},
	createdDate: {
		type: Date,
		required: true,
	},
	updatedDate: {
		type: Date,
		required: true,
	},
	idAccount: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account',
	},
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
