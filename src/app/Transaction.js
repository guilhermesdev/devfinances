import { App } from './App';
import transactions from './data';
import Utils from './Utils';

const Transaction = {
	add(transaction) {
		transactions.unshift(transaction);
		App.reload();
	},
	remove(index) {
		transactions.splice(index, 1);
		App.reload();
	},
	getIncomes() {
		const incomesArray = transactions.filter(({ amount }) => amount > 0);
		return this.getAmount(incomesArray);
	},
	getExpenses() {
		const expensesArray = transactions.filter(({ amount }) => amount < 0);
		return this.getAmount(expensesArray);
	},
	getTotal() {
		return this.getAmount(transactions);
	},
	getAmount(amountList) {
		const unformattedAmount = amountList.reduce((acc, { amount }) => {
			return acc + amount;
		}, 0);
		return Utils.formatCurrency(unformattedAmount);
	}
};

export default Transaction;
