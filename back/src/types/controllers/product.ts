type updateParamProduct = {
	name?: string;
	description?: string;
	price?: string;
	stock?: string;
};

type paramsId = {
	idAccount: string;
	idProduct?: string;
};

type filterParam = {
	name?: string;
	minPrice?: string;
	maxPrice?: string;
	stock?: string;
	minDate?: string;
	maxDate?: string;
};

export { updateParamProduct, paramsId, filterParam };
