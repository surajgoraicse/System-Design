interface Database {
	save(data: string): void;
}

// MySQL implementation
class MySQLDatabase implements Database {
	public save(data: string) {
		console.log("Data saved to mySql");
	}
}

// MongoDB implementation
class MyMongoDatabase implements Database {
	public save(data: string) {
		console.log("Data saved to mongo db");
	}
}

// high level model :
class UserService {
	db: Database;
	constructor(database: Database) {
		this.db = database;
	}
	public storeUser(user: string) {
		this.db.save(user);
	}
}

function main() {
	const mongo = new MyMongoDatabase();
	const sql = new MySQLDatabase();

	const userService1 = new UserService(mongo);
	userService1.storeUser("user");
	const userService2 = new UserService(mongo);
	userService2.storeUser("user");
}
