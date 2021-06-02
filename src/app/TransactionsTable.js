import transactions from './data.js';
import Transaction from './Transaction.js';
import Utils from './Utils.js';

const dataTable = document.querySelector('#data-table');

const TransactionsTable = {
  tbody: dataTable.tBodies[0],
  createRow(transaction, index){
    const row = document.createElement('tr');
    const description = document.createElement('td');
    description.setAttribute('data-column', 'description');
    description.innerText = transaction.description;

    const amount = document.createElement('td');
    amount.setAttribute('data-column', 'amount');
    amount.classList.add(transaction.amount > 0 ? 'income' : 'expense');
    amount.innerText = Utils.formatCurrency(transaction.amount);

    const date = document.createElement('td');
    date.setAttribute('data-column', 'date');
    date.innerText = transaction.date;

    const removeButton = document.createElement('td');
    const icon = document.createElement('img');
    icon.setAttribute('src', './assets/minus.svg');
    icon.setAttribute('alt', 'Remover transação');
    icon.addEventListener('click', () => Transaction.remove(index));
    removeButton.appendChild(icon);

    row.appendChild(description);
    row.appendChild(amount);
    row.appendChild(date);
    row.appendChild(removeButton);
    
    return row;
  },
  renderRows(){
    transactions.forEach((transaction, index) => {
        const row = this.createRow(transaction, index);
        this.tbody.appendChild(row);
      });
  },
  clearRows(){
    this.tbody.innerHTML = '';
  }
}

export default TransactionsTable;