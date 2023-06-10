import '@/assets/css/style.scss';

import { LocalStorageTransactionProvider } from '@/providers/LocalStorageTransactionProvider';
import { getTransactionsStore } from '@/stores/transactions';
import { NewTransactionModal } from '@/components/NewTransactionModal';
import { Balance } from '@/components/Balance';
import { CreateNewTransactionForm } from '@/components/CreateNewTransactionForm';
import { getTransactionsTableComponent } from '@/components/TransactionsTable';
import { Dispatcher } from '@/events/dispatcher';

const $addTransactionButton = document.querySelector('.button.new')!;
const $transactionForm = document.querySelector(
	'[data-form="submit-transaction"]'
)!;

const transactionsStore = getTransactionsStore(LocalStorageTransactionProvider);
const transactionTable = getTransactionsTableComponent(transactionsStore);

window.addEventListener('load', () => {
	NewTransactionModal.init();
	$addTransactionButton.addEventListener('click', NewTransactionModal.open);
	$transactionForm.addEventListener('submit', (e) =>
		CreateNewTransactionForm.submit(e, transactionsStore)
	);

	transactionsStore.init();

	Balance.updateAllBalanceDisplayValues(transactionsStore.transactions);
	transactionTable.renderRows(transactionsStore.transactions);
});

Dispatcher.on('new-transaction', (transaction) => {
	transactionTable.addNewRow(transaction, { prepend: true });
	Balance.updateAllBalanceDisplayValues(transactionsStore.transactions);
});

Dispatcher.on('update-transactions', () => {
	Balance.updateAllBalanceDisplayValues(transactionsStore.transactions);
});
