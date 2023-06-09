import type { Transaction } from '@/core/entities/transation';

export type TransactionRepository = {
	getAll(): Transaction[];
	getById(transactionId: string): Transaction | null;
	addNewTransaction(transaction: Transaction): void;
	deleteById(transactionId: string): void;
};
