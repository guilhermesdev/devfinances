import { TransactionsStore } from '@/stores/transactions';
import { sum } from '@/helpers';

export const TransactionService = {
	getIncomes(): number {
		const incomesArray = TransactionsStore.transactions
			.filter((transaction) => transaction.amountInCents > 0)
			.map((transaction) => transaction.amountInCents);

		return sum(incomesArray);
	},
	getExpenses(): number {
		const expensesArray = TransactionsStore.transactions
			.filter((transaction) => transaction.amountInCents < 0)
			.map((transaction) => transaction.amountInCents);

		return sum(expensesArray);
	},
	getTotal(): number {
		const transactionsAmounts = TransactionsStore.transactions.map(
			(transaction) => transaction.amountInCents
		);

		return sum(transactionsAmounts);
	}
};
