interface ProductValidator {
	name: string;
	description: string;
	price: number;
	stock: boolean;
}

interface DeleteProductValidator {
	idProduct: string;
}

export { ProductValidator, DeleteProductValidator };
