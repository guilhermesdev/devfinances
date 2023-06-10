import type { Transaction } from '@/core/entities/transation';
import type { TransactionsStore } from '@/stores/transactions';
import { formatCurrency } from '@/helpers';

type AddNewRowOptions = { prepend?: boolean };

const $dataTable = document.querySelector('#data-table') as HTMLTableElement;

export type TransactionsTable = {
	createRow(transaction: Transaction): HTMLTableRowElement;
	addNewRow(transaction: Transaction, options?: AddNewRowOptions): void;
	renderRows(transactions: Transaction[]): void;
};

export function getTransactionsTableComponent(
	transactionsStore: TransactionsStore
): TransactionsTable {
	const $tbody = $dataTable.tBodies[0];

	return {
		createRow(transaction: Transaction): HTMLTableRowElement {
			const $row = document.createElement('tr');

			const $description = document.createElement('td');
			$description.setAttribute('data-column', 'description');
			$description.textContent = transaction.description;

			const $amount = document.createElement('td');

			$amount.setAttribute('data-column', 'amount');
			$amount.classList.add(
				transaction.amountInCents > 0 ? 'income' : 'expense'
			);
			$amount.textContent = formatCurrency(transaction.amountInCents / 100);

			const $date = document.createElement('td');

			$date.setAttribute('data-column', 'date');
			$date.textContent = transaction.date;

			const $removeButton = document.createElement('td');
			const $icon = document.createElement('img');

			$icon.setAttribute('src', '/icons/minus.svg');
			$icon.setAttribute('alt', 'Remover transação');
			$icon.addEventListener('click', () => {
				transactionsStore.removeTransactionById(transaction.id);
				$row.remove();
			});

			$removeButton.appendChild($icon);

			$row.appendChild($description);
			$row.appendChild($amount);
			$row.appendChild($date);
			$row.appendChild($removeButton);

			return $row;
		},
		addNewRow(
			transaction: Transaction,
			{ prepend = false }: AddNewRowOptions = {}
		): void {
			const $row = this.createRow(transaction);

			if (prepend) {
				$tbody.prepend($row);
			} else {
				$tbody.appendChild($row);
			}
		},
		renderRows(transactions: Transaction[]): void {
			transactions.forEach((transaction) => this.addNewRow(transaction));
		}
	};
}
