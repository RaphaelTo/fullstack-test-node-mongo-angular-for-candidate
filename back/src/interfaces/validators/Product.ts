interface ProductValidator {
	name: string;
	description: string;
	price: number;
	stock: boolean;
}

interface IdProductValidator {
	idProduct: string;
}

interface UpdateProductValidator {
	name: string;
	description: string;
	price: number;
	stock: boolean;
}

interface FindFilterProductValidator {
	name: string;
	minPrice: number;
	maxPrice: number;
	stock: string;
	minDate: string;
	maxDate: string;
}

export {
	ProductValidator,
	IdProductValidator,
	UpdateProductValidator,
	FindFilterProductValidator,
};
