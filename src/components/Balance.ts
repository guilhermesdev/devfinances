import { animate } from 'motion';

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

		updateCurrencyValue($incomes, incomesInCents);
	},
	updateExpenses(transactions: Transaction[]) {
		const expensesInCents = TransactionService.getExpenses(transactions);

		updateCurrencyValue($expenses, expensesInCents);
	},
	updateTotal(transactions: Transaction[]) {
		const totalInCents = TransactionService.getTotal(transactions);

		updateCurrencyValue($total, totalInCents);
	},
	updateAllBalanceDisplayValues(transactions: Transaction[]) {
		this.updateIncomes(transactions);
		this.updateExpenses(transactions);
		this.updateTotal(transactions);
	}
};

function updateCurrencyValue($element: HTMLElement, newValue: number): void {
	const currentValueOnScreen =
		+$element.textContent!.replace(/[^\d\-]/g, '') || 0;

	if (currentValueOnScreen === newValue) return;

	let currentValue = currentValueOnScreen;

	animate(
		(progress) => {
			const currency = currentValue + progress * (newValue - currentValue);

			$element.textContent = formatCurrency(currency / 100);

			currentValue = currency;
		},
		{ duration: 0.5, easing: 'ease-out' }
	);
}
