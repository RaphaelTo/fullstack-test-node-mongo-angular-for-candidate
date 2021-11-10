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

export { ProductValidator, IdProductValidator, UpdateProductValidator };
