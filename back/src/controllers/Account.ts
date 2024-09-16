import dayjs from 'dayjs';
import Account from '@/Models/Account';
import { hash, decrypt } from '@/Utils/crypt';
import { createToken } from '@/Utils/jwt';

type userParam = { username: string; password: string };

const signupAction = async (user: userParam) => {
	try {
		const accountExist = await checkAccountExist(user.username);

		if (accountExist) {
			throw new Error('User exist');
		}

		const cryptPassword: string = await hash(user.password);
		const dateNow: dayjs.Dayjs = dayjs();
		const addAccount = new Account({
			username: user.username,
			password: cryptPassword,
			createdDate: dateNow,
			updatedDate: dateNow,
		});

		await addAccount.save();

		return 'User has been created';
	} catch (err) {
		throw err;
	}
};

const signinAction = async (user: userParam) => {
	try {
		const findAccount = await checkAccountExist(user.username);

		if (!findAccount) {
			throw new Error('User not found');
		}

		const checkPassword: boolean | string = await decrypt(
			user.password,
			findAccount.password,
		);

		if (!checkPassword) {
			throw new Error('Error Password');
		}

		const generateToken: string = await createToken({
			id: findAccount.id,
			role: findAccount.userLevel,
		});

		return generateToken;
	} catch (err) {
		throw err;
	}
};

const checkAccountExist = async (username: string) => {
	try {
		const findAccount = await Account.findOne({ username }).exec();

		if (!findAccount) {
			return false;
		}

		return findAccount;
	} catch (err) {
		throw err;
	}
};

export { signupAction, signinAction };
