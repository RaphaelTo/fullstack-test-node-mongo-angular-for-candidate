export const successResponse = <T>(httpCode: number, result: T) => {
	return {
		type: 'success',
		httpCode,
		result,
	};
};

export const errorResponse = (httpCode: number, error: string) => {
	return {
		type: 'error',
		httpCode,
		message: error,
	};
};
