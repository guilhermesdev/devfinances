import Balance from './Balance';
import transactions from './data';
import TransactionsTable from './TransactionsTable';
import Storage from './Storage';

export const App = {
	init() {
		Balance.updateAll();
		TransactionsTable.renderRows();
		Storage.set(transactions);
	},
	reload() {
		TransactionsTable.clearRows();
		this.init();
	}
} as const;
