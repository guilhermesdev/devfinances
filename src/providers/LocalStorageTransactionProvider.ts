import type { Transaction } from '@/core/entities/transation';
import type { TransactionRepository } from '@/core/repositories/transaction';

export const LocalStorageTransactionProvider: TransactionRepository = {
	getAll() {
		return getLocalStorageTransactions();
	},
	getById(transactionId) {
		return (
			this.getAll().find((transaction) => transaction.id === transactionId) ||
			null
		);
	},
	addNewTransaction(transaction) {
		const transactionsList = this.getAll();

		const newTransactionsList = [transaction, ...transactionsList];

		setLocalStorageTransactions(newTransactionsList);

		return newTransactionsList;
	},
	deleteById(transactionId) {
		const newTransactionsList = this.getAll().filter(
			(transaction) => transaction.id !== transactionId
		);

		setLocalStorageTransactions(newTransactionsList);

		return newTransactionsList;
	}
};

const LOCAL_STORAGE_TRANSACTIONS_KEY = '@devfinances:transactions';

function setLocalStorageTransactions(transactions: Transaction[]) {
	const transactionsJSON = JSON.stringify(transactions);

	localStorage.setItem(LOCAL_STORAGE_TRANSACTIONS_KEY, transactionsJSON);
}

function getLocalStorageTransactions(): Transaction[] {
	const transationsJson = localStorage.getItem(LOCAL_STORAGE_TRANSACTIONS_KEY);

	return transationsJson ? JSON.parse(transationsJson) : [];
}
