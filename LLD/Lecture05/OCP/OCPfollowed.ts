// Responsible for DB Storage of the Cart
interface DBStorage {
	save(): void;
}

class StoreInPostgres implements DBStorage {
	private cart: ShoppingCart;
	constructor(cart: ShoppingCart) {
		this.cart = cart;
	}
	public save(): void {
		console.log("Product Saved To Postgres DB");
	}
}
class StoreInCasendra implements DBStorage {
	private cart: ShoppingCart;
	constructor(cart: ShoppingCart) {
		this.cart = cart;
	}
	public save(): void {
		console.log("Product Saved To Casendra DB");
	}
}
class StoreInMongo implements DBStorage {
	private cart: ShoppingCart;
	constructor(cart: ShoppingCart) {
		this.cart = cart;
	}
	public save(): void {
		console.log("Product Saved To Mongo DB");
	}
}

// Product class representing any item of any ecommerce
class Product {
	public name: string;
	public price: number;

	constructor(name: string, price: number) {
		this.name = name;
		this.price = price;
	}
}

// Shopping Cart class only responsible for Cart related business logic
class ShoppingCart {
	private products: Product[] = [];
	public getProduct(): Product[] {
		return this.products;
	}
	public addProduct(product: Product) {
		this.products.push(product);
	}
	public printTotal() {
		let total = 0;
		this.products.forEach((product) => {
			total += product.price;
		});
		console.log("Total = ", total);
	}
}

// main function : client
(function main() {
	const cart = new ShoppingCart();
	cart.addProduct(new Product("Laptop", 50000));
	cart.addProduct(new Product("Keyboard", 4000));

	const postgresDB = new StoreInPostgres(cart);
	const mongoDB = new StoreInMongo(cart);
	const casendraDB = new StoreInCasendra(cart);

	postgresDB.save();
	mongoDB.save();
	casendraDB.save();
})();
