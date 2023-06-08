import type { Transaction } from '@/core/entities/transation';
import { TransactionsStore } from '@/stores/transactions';
import { formatCurrency } from '@/helpers';

const $dataTable = document.querySelector('#data-table') as HTMLTableElement;

const TransactionsTable = {
	$tbody: $dataTable.tBodies[0],
	createRow(transaction: Transaction): HTMLTableRowElement {
		const $row = document.createElement('tr');
		const $description = document.createElement('td');
		$description.setAttribute('data-column', 'description');
		$description.innerText = transaction.description;

		const $amount = document.createElement('td');

		$amount.setAttribute('data-column', 'amount');
		$amount.classList.add(transaction.amount > 0 ? 'income' : 'expense');
		$amount.innerText = formatCurrency(transaction.amount);

		const $date = document.createElement('td');

		$date.setAttribute('data-column', 'date');
		$date.innerText = transaction.date;

		const $removeButton = document.createElement('td');
		const $icon = document.createElement('img');

		$icon.setAttribute('src', '/icons/minus.svg');
		$icon.setAttribute('alt', 'Remover transação');
		$icon.addEventListener('click', () =>
			TransactionsStore.removeTransactionById(transaction.id)
		);

		$removeButton.appendChild($icon);

		$row.appendChild($description);
		$row.appendChild($amount);
		$row.appendChild($date);
		$row.appendChild($removeButton);

		return $row;
	},
	renderRows() {
		TransactionsStore.transactions.forEach((transaction) => {
			const $row = this.createRow(transaction);
			this.$tbody.appendChild($row);
		});
	},
	clearRows() {
		this.$tbody.innerHTML = '';
	}
};

export default TransactionsTable;
