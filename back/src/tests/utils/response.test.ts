import { successResponse, errorResponse } from '../../utils/responses';

describe('Response method', () => {
	it('should return an object with http_code, type, result method for successResponse method', () => {
		const expectedValue = {
			httpCode: 200,
			type: 'success',
			result: 'ha',
		};

		const sucess = successResponse(200, 'ha');

		expect(sucess).toEqual(expectedValue);
	});

	it('should return an object with http_code, type, result method for errorResponse method', () => {
		const expectedValue = {
			httpCode: 404,
			type: 'error',
			message: 'ha',
		};

		const sucess = errorResponse(404, 'ha');

		expect(sucess).toEqual(expectedValue);
	});
});
