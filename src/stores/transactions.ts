import { LocalStorageTransactionAdapter } from '@/adapters/LocalStorageTransactionAdapter';
import type { Transaction } from '@/core/entities/transation';
import { Dispatcher } from '@/events/dispatcher';

export const TransactionsStore = {
	transactions: [] as Transaction[],
	init(): void {
		this.transactions = LocalStorageTransactionAdapter.getAll();
	},
	addTransaction(newTransaction: Transaction): void {
		LocalStorageTransactionAdapter.addNewTransaction(newTransaction);

		this.transactions = [newTransaction, ...this.transactions];

		Dispatcher.emit('new-transaction', newTransaction);
	},
	removeTransactionById(transactionId: string): void {
		LocalStorageTransactionAdapter.deleteById(transactionId);

		this.transactions = this.transactions.filter(
			(transaction) => transaction.id !== transactionId
		);

		Dispatcher.emit('update-transactions');
	}
};
