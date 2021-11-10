import mongoose from 'mongoose';

interface ProductValidator {
	name: string;
	description: string;
	price: number;
	stock: boolean;
	createdDate: Date;
	updatedDate: Date;
	idAccount: mongoose.Schema.Types.ObjectId;
}

export { ProductValidator };
