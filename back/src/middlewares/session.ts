import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '@/Utils/jwt';
import { errorResponse } from '@/Utils/responses';

type Cookie = { token: string };

const checkSession = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const cookie: Cookie = req.cookies.xAccessToken;
		const secret: string = process.env.SECRET_TOKEN!;

		if (!cookie) {
			res.json(errorResponse(404, "doesn't exist"));
		}

		const checkToken = await verifyToken(cookie.token, secret);
		req.decoded = checkToken;
		next();
	} catch (err: any) {
		res.status(404).json(errorResponse(404, err.message));
	}
};

export { checkSession };
