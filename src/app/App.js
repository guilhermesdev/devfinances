import Balance from './Balance.js';
import transactions from './data.js';
import TransactionsTable from './TransactionsTable.js';
import Storage from './Storage.js';

const App = {
  init(){
    Balance.updateAll();
    TransactionsTable.renderRows();
    Storage.set(transactions);
  },
  reload(){
    TransactionsTable.clearRows();
    this.init();
  }
}

export default App;