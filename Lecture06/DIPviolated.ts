class MySQLDatabase {
	// Low-level module
	public saveToSQL(data: string) {
		console.log("data saved to SQL database");
	}
}

class MyMongoDB {
	// Low-level module
	public saveToMongo(data: string) {
		console.log("data saved to Mongo  database");
	}
}

class UserService {
	// High-Level module (tightly coupled)
	private sqlDB = new MySQLDatabase();
	private mongoDB = new MyMongoDB();

	public storeUserToSQL(user: string) {
		this.sqlDB.saveToSQL(user);
	}
	public storeUserToMongo(user: string) {
		this.mongoDB.saveToMongo(user);
	}
}
(function main() {
	const service = new UserService();
	service.storeUserToMongo("user");
	service.storeUserToSQL("user");
})();


