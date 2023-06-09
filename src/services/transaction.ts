import type { Transaction } from '@/core/entities/transation';
import { sum } from '@/helpers';

export const TransactionService = {
	getIncomes(transactions: Transaction[]): number {
		const incomesArray = transactions
			.filter((transaction) => transaction.amountInCents > 0)
			.map((transaction) => transaction.amountInCents);

		return sum(incomesArray);
	},
	getExpenses(transactions: Transaction[]): number {
		const expensesArray = transactions
			.filter((transaction) => transaction.amountInCents < 0)
			.map((transaction) => transaction.amountInCents);

		return sum(expensesArray);
	},
	getTotal(transactions: Transaction[]): number {
		const transactionsAmounts = transactions.map(
			(transaction) => transaction.amountInCents
		);

		return sum(transactionsAmounts);
	}
};
