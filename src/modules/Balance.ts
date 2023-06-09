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
	updateIncomes() {
		const incomesInCents = TransactionService.getIncomes();

		$incomes.textContent = formatCurrency(incomesInCents / 100);
	},
	updateExpenses() {
		const expensesInCents = TransactionService.getExpenses();

		$expenses.textContent = formatCurrency(expensesInCents / 100);
	},
	updateTotal() {
		const totalInCents = TransactionService.getTotal();

		$total.textContent = formatCurrency(totalInCents / 100);
	},
	updateAllBalanceDisplayValues() {
		this.updateIncomes();
		this.updateExpenses();
		this.updateTotal();
	}
};
