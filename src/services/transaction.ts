import type { Transaction } from '@/core/entities/transation';
import { TransactionsStore } from '@/stores/transactions';
import { formatCurrency } from '@/helpers';

export const TransactionService = {
	getIncomes(): string {
		const incomesArray = TransactionsStore.transactions.filter(
			({ amount }) => amount > 0
		);
		return this.getAmount(incomesArray);
	},
	getExpenses(): string {
		const expensesArray = TransactionsStore.transactions.filter(
			({ amount }) => amount < 0
		);

		return this.getAmount(expensesArray);
	},
	getTotal(): string {
		return this.getAmount(TransactionsStore.transactions);
	},
	getAmount(transactions: Transaction[]): string {
		const unformattedAmount = transactions.reduce(
			(acc, { amount }) => acc + amount,
			0
		);

		return formatCurrency(unformattedAmount);
	}
};
