import jwt from 'jsonwebtoken';

const createToken = async (payload: object): Promise<string> => {
	try {
		const secret: string = process.env.SECRET_TOKEN!;
		const createToken = await jwt.sign(payload, secret, { algorithm: 'HS256' });
		return createToken;
	} catch (err) {
		throw err;
	}
};

export { createToken };
