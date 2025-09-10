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
        let total = 0
        this.products.forEach((product) => {
            total +=product.price
        })
        console.log("Total = ", total);
        
    }
}

// Responsible for Printing Invoice of the Cart
class CartInvoice {
	private cart: ShoppingCart;

	constructor(cart: ShoppingCart) {
		this.cart = cart;
	}

	public printInvoice() {
		this.cart.getProduct().forEach((product) => {
			console.log(
				` Product : ${product.name} and Price : ${product.price} `
			);
		});
		console.log("Invoice Printed Successfully");
	}
}

// Responsible for DB Storage of the Cart
class DBStorage {
	private cart: ShoppingCart;

	constructor(cart: ShoppingCart) {
		this.cart = cart;
	}

	public storeInDB() {
		console.log("Cart Stored in DB Successfully");
	}
}

// main function : client
(function main() {
	const cart = new ShoppingCart();
	cart.addProduct(new Product("Laptop", 50000));
	cart.addProduct(new Product("Keyboard", 4000));
    
    const invoice = new CartInvoice(cart)
    const storage = new DBStorage(cart) 
    invoice.printInvoice()
    storage.storeInDB()
    
    // add few more products 
	cart.addProduct(new Product("mouse", 1000));
	cart.addProduct(new Product("chair", 10000));
    invoice.printInvoice() // prints latest data
    cart.printTotal()
})();
