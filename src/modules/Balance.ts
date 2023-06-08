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

const Balance = {
	updateIncomes() {
		$incomes.innerText = TransactionService.getIncomes();
		this.updateTotal();
	},
	updateExpenses() {
		$expenses.innerText = TransactionService.getExpenses();
		this.updateTotal();
	},
	updateTotal() {
		$total.innerText = TransactionService.getTotal();
	},
	updateAll() {
		this.updateIncomes();
		this.updateExpenses();
	}
};

export default Balance;
