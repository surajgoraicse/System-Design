// violating Single Responsibilty Principle
// Product class representing any item of any ecommerce
class Product {
	public name: string;
	public price: number;

	constructor(name: string, price: number) {
		this.name = name;
		this.price = price;
	}
}

// shopping cart class
/*
 * It violatest Single Responsibility Principle as it is handling multiple responsibility.
 * It can be solved using Composition
 */
class ShoppingCart {
	private products: Product[] = [];

	public addProduct(product: Product): void {
		this.products.push(product);
	}

	public calculateTotal(): number {
		let total = 0;
		this.products.forEach((product) => {
			total += product.price;
		});
		return total;
	}
	public printInvoice(): void {
		console.log("Invoice Printed");
	}

	public saveToDB(): void {
		console.log("Successfully Saved To DB");
	}
}

(function main() {
	const cart = new ShoppingCart();

	cart.addProduct(new Product("Laptop", 5000));
	cart.addProduct(new Product("keyboard", 4000));

	cart.printInvoice();
	cart.saveToDB();
	const total = cart.calculateTotal();
	console.log(total);
})();
