import jwt from 'jsonwebtoken';
import util from 'util';

const createToken = async (payload: object): Promise<string> => {
	try {
		const secret: string = process.env.SECRET_TOKEN!;
		const createToken: string = await jwt.sign(payload, secret, {
			algorithm: 'HS256',
			expiresIn: '10h',
		});
		return createToken;
	} catch (err) {
		throw err;
	}
};

const verifyToken = async (token: string, secret: string): Promise<object> => {
	try {
		const promisifyVerify = util.promisify<string, string>(jwt.verify);

		const checkToken = await promisifyVerify(token, secret);
		return checkToken;
	} catch (err) {
		throw err;
	}
};

export { createToken, verifyToken };
