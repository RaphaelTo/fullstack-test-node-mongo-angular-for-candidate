import mongoose from 'mongoose';
import { Account } from '@/Interfaces/Account';

const AccountSchema = new mongoose.Schema<Account>({
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
});

const AccountModel = mongoose.model('Account', AccountSchema);

export default AccountModel;
