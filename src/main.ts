import '@/assets/css/style.scss';

import { NewTransactionModal } from '@/components/NewTransactionModal';
import { TransactionsStore } from '@/stores/transactions';
import Balance from '@/modules/Balance';
import Form from '@/components/Form';
import TransactionsTable from '@/components/TransactionsTable';
import { Dispatcher } from '@/events';

const $addTransactionButton = document.querySelector('.button.new')!;
const $transactionForm = document.querySelector(
	'[data-form="submit-transaction"]'
)!;

window.addEventListener('load', () => {
	NewTransactionModal.init();
	$addTransactionButton.addEventListener('click', NewTransactionModal.open);
	$transactionForm.addEventListener('submit', Form.submit);

	TransactionsStore.init();
	Balance.updateAll();
	TransactionsTable.renderRows();
});

Dispatcher.on('update-transactions', () => {
	Balance.updateAll();
	TransactionsTable.clearRows();
	TransactionsTable.renderRows();
});
