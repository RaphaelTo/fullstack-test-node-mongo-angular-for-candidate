import mongoose from 'mongoose';
import { Account } from '@/Interfaces/models/Account';

const accountSchema = new mongoose.Schema<Account>(
	{
		username: {
			required: true,
			type: String,
		},
		password: {
			required: true,
			type: String,
		},
		userLevel: {
			type: [String],
			default: ['ROLE_USER'],
		},
		createdDate: {
			type: Date,
			required: true,
		},
		updatedDate: {
			type: Date,
			required: true,
		},
	},
	{ toJSON: { virtuals: true } },
);

accountSchema.virtual('products', {
	ref: 'Product',
	localField: '_id',
	foreignField: 'idAccount',
});

const accountModel = mongoose.model('Account', accountSchema);

export default accountModel;
