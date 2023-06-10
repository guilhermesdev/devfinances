import type { Transaction } from '@/core/entities/transation';
import { Dispatcher } from '@/events/dispatcher';
import { TransactionRepository } from '@/core/repositories/transaction';

export type TransactionsStore = {
	transactions: Transaction[];
	init(): void;
	addTransaction(newTransaction: Transaction): void;
	removeTransactionById(transactionId: string): void;
};

export function getTransactionsStore(
	transactionsProvider: TransactionRepository
): TransactionsStore {
	return {
		transactions: [] as Transaction[],
		init(): void {
			this.transactions = transactionsProvider.getAll();
		},
		addTransaction(newTransaction: Transaction): void {
			transactionsProvider.addNewTransaction(newTransaction);

			this.transactions = [newTransaction, ...this.transactions];

			Dispatcher.emit('new-transaction', newTransaction);
		},
		removeTransactionById(transactionId: string): void {
			transactionsProvider.deleteById(transactionId);

			this.transactions = this.transactions.filter(
				(transaction) => transaction.id !== transactionId
			);

			Dispatcher.emit('update-transactions');
		}
	};
}
