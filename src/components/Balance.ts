import type { Transaction } from '@/core/entities/transation';
import { formatCurrency } from '@/helpers';
import { TransactionService } from '@/services/transaction';

const $incomes = document.querySelector(
	'.card[data-type="incomes"] > span'
) as HTMLElement;

const $expenses = document.querySelector(
	'.card[data-type="expenses"] > span'
) as HTMLElement;

const $total = document.querySelector(
	'.card[data-type="total"] > span'
) as HTMLElement;

export const Balance = {
	updateIncomes(transactions: Transaction[]) {
		const incomesInCents = TransactionService.getIncomes(transactions);

		$incomes.textContent = formatCurrency(incomesInCents / 100);
	},
	updateExpenses(transactions: Transaction[]) {
		const expensesInCents = TransactionService.getExpenses(transactions);

		$expenses.textContent = formatCurrency(expensesInCents / 100);
	},
	updateTotal(transactions: Transaction[]) {
		const totalInCents = TransactionService.getTotal(transactions);

		$total.textContent = formatCurrency(totalInCents / 100);
	},
	updateAllBalanceDisplayValues(transactions: Transaction[]) {
		this.updateIncomes(transactions);
		this.updateExpenses(transactions);
		this.updateTotal(transactions);
	}
};
