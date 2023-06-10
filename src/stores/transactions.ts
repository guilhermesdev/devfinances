import { LocalStorageTransactionProvider } from '@/providers/LocalStorageTransactionProvider';
import type { Transaction } from '@/core/entities/transation';
import { Dispatcher } from '@/events/dispatcher';

export const TransactionsStore = {
	transactions: [] as Transaction[],
	init(): void {
		this.transactions = LocalStorageTransactionProvider.getAll();
	},
	addTransaction(newTransaction: Transaction): void {
		LocalStorageTransactionProvider.addNewTransaction(newTransaction);

		this.transactions = [newTransaction, ...this.transactions];

		Dispatcher.emit('new-transaction', newTransaction);
	},
	removeTransactionById(transactionId: string): void {
		LocalStorageTransactionProvider.deleteById(transactionId);

		this.transactions = this.transactions.filter(
			(transaction) => transaction.id !== transactionId
		);

		Dispatcher.emit('update-transactions');
	}
};
