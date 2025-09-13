interface NonWithdrawableAccount {
	deposit(amount: number): void;
}
interface WithdrawableAccount extends NonWithdrawableAccount {
	withdraw(amount: number): void;
}

class SavingAccount implements WithdrawableAccount {
	deposit(amount: number): void {
		console.log(`Amount Deposited Successfully: ${amount}`);
	}
	withdraw(amount: number): void {
		console.log(`Amount Withdrawn Successfully: ${amount}`);
	}
}
class CurrentAccount implements WithdrawableAccount {
	deposit(amount: number): void {
		console.log(`Amount Deposited Successfully: ${amount}`);
	}
	withdraw(amount: number): void {
		console.log(`Amount Withdrawn Successfully: ${amount}`);
	}
}
class FixedAccount implements NonWithdrawableAccount {
	deposit(amount: number): void {
		console.log(`Amount Deposited Successfully: ${amount}`);
	}
}

// TODO: The client knows that there are two types of accounts : withdrawable and non-withdrawable.
class Client {
	private withdrawableAccounts: WithdrawableAccount[];
	private nonWithdrawableAccounts: NonWithdrawableAccount[];

	constructor(
		withdrawableAccounts: WithdrawableAccount[],
		nonWithdrawableAccounts: NonWithdrawableAccount[]
	) {
		this.nonWithdrawableAccounts = nonWithdrawableAccounts;
		this.withdrawableAccounts = withdrawableAccounts;
	}

	public executeTransaction() {
		this.withdrawableAccounts.forEach((account) => {
			account.deposit(1000);
			account.withdraw(1000);
		});
		this.nonWithdrawableAccounts.forEach((account) => {
			account.deposit(1000);
		});
	}
}

(function main() {
	const saving = new SavingAccount();
	const current = new CurrentAccount();
	const fixed = new FixedAccount();

	const client = new Client([saving, current], [fixed]);
  client.executeTransaction()
})();
