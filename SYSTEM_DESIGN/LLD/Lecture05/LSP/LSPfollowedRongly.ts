interface Account {
	deposit(amount: number): void;
	withdraw(amount: number): void;
}

class SavingAccount implements Account {
	deposit(amount: number): void {
		console.log(`Amount Deposited Successfully: ${amount}`);
	}
	withdraw(amount: number): void {
		console.log(`Amount Withdrawn Successfully: ${amount}`);
	}
}
class CurrentAccount implements Account {
	deposit(amount: number): void {
		console.log(`Amount Deposited Successfully: ${amount}`);
	}
	withdraw(amount: number): void {
		console.log(`Amount Withdrawn Successfully: ${amount}`);
	}
}
class FixedAccount implements Account {
	deposit(amount: number): void {
		console.log(`Amount Deposited Successfully: ${amount}`);
	}
	withdraw(amount: number): void {
		throw new Error("Cannot Withdraw from a Fixed Account");
	}
}

// NOTE: making the client aware of the problem, so that it can iterate and execute transation with a condition
class Client {
	private accounts: Account[] = [];
	public addAccount(account: Account): void {
		this.accounts.push(account);
	}
	public executeTransation() {
		this.accounts.forEach((account) => {
			account.deposit(1000);
			if (account instanceof FixedAccount) {
				console.log("cannot withdraw from a fixed account");
			} else {
				account.withdraw(1000);
			}
		});
	}
}

(function main() {
	const saving = new SavingAccount();
	const current = new CurrentAccount();
	const fixed = new FixedAccount();

	const client = new Client();
	client.addAccount(saving);
	client.addAccount(current);
	client.addAccount(fixed);
	client.executeTransation();
})();
