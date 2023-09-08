import { animate, stagger, spring } from 'motion';

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
			$row.setAttribute('data-row', '');

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
			$icon.addEventListener('click', async () => {
				transactionsStore.removeTransactionById(transaction.id);

				const animation = animate(
					$row,
					{
						scale: [1, 0.8],
						opacity: [1, 0],
						display: 'none'
					},
					{
						duration: 0.01,
						easing: spring()
					}
				);

				await animation.finished;

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

				animate(
					$row,
					{ scale: [0.95, 1], opacity: [0, 1] },
					{ duration: 0.3, easing: spring() }
				);
			} else {
				$tbody.appendChild($row);
			}
		},
		renderRows(transactions: Transaction[]): void {
			transactions.forEach((transaction) => this.addNewRow(transaction));

			animate(
				'[data-row]',
				{ scale: [0.95, 1.01, 1], opacity: [0, 1] },
				{ duration: 0.15, delay: stagger(0.1), easing: spring() }
			);
		}
	};
}
