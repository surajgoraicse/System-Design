// Responsible for DB Storage of the Cart
// Voilating the Open Close Principle 
class DBStorage {
	private cart: ShoppingCart;

	constructor(cart: ShoppingCart) {
		this.cart = cart;
	}

	public storeInPostgres() {
		console.log("Cart Stored in Postgres Successfully");
	}
	public storeInCasendra() {
		console.log("Cart Stored in Casendra Successfully");
	}
	public storeInMongo() {
		console.log("Cart Stored in Mongo Successfully");
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
        let total = 0
        this.products.forEach((product) => {
            total +=product.price
        })
        console.log("Total = ", total);
        
    }
}




// main function : client
(function main() {
	const cart = new ShoppingCart();
	cart.addProduct(new Product("Laptop", 50000));
	cart.addProduct(new Product("Keyboard", 4000));
    
    const storage = new DBStorage(cart) 
    storage.storeInMongo()
    storage.storeInCasendra()
    storage.storeInPostgres()
    
    
})();
