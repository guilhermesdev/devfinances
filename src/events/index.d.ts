import type { Transaction } from '@/core/entities/transation';

export type DispatcherEvents = {
	'new-transaction': Transaction;
	'add-transaction': Transaction[];
	'update-transactions': void;
};
