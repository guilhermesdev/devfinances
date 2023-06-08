import type { Transaction } from '@/core/entities/transation';
import { Dispatcher } from '@/events';

export const TransactionsStore = {
	transactions: [] as Transaction[],
	init(): void {
		this.transactions = getLocalStorageTransactions();
	},
	addTransaction(newTransaction: Transaction): void {
		this.transactions = [newTransaction, ...this.transactions];

		Dispatcher.emit('update-transactions');
	},
	removeTransactionById(transactionId: string): void {
		this.transactions = this.transactions.filter(
			(transaction) => transaction.id !== transactionId
		);

		Dispatcher.emit('update-transactions');
	}
};

Dispatcher.on('update-transactions', () =>
	setLocalStorageTransactions(TransactionsStore.transactions)
);

const LOCAL_STORAGE_TRANSACTIONS_KEY = '@devfinances:transactions';

function setLocalStorageTransactions(transactions: Transaction[]) {
	const transactionsJSON = JSON.stringify(transactions);

	localStorage.setItem(LOCAL_STORAGE_TRANSACTIONS_KEY, transactionsJSON);
}

function getLocalStorageTransactions(): Transaction[] {
	const transationsJson = localStorage.getItem(LOCAL_STORAGE_TRANSACTIONS_KEY);

	return transationsJson ? JSON.parse(transationsJson) : [];
}
